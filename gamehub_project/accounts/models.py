from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    visits = models.IntegerField(default=0) 
    plays = models.IntegerField(default=0)
    
    def __str__(self):
        return self.user.username


class SiteVisit(models.Model):
    """Tracks daily site visit counts for the project."""
    date = models.DateField(unique=True, default=timezone.now)
    count = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return f"{self.date}: {self.count} visits"

    @classmethod
    def record_visit(cls):
        """Increment today's visit count and return updated totals."""
        today = timezone.now().date()
        visit, _ = cls.objects.get_or_create(date=today)
        visit.count += 1
        visit.save()
        return visit

    @classmethod
    def get_total_visits(cls):
        """Return aggregate total of all visits."""
        from django.db.models import Sum
        result = cls.objects.aggregate(total=Sum('count'))
        return result['total'] or 0

    @classmethod
    def get_stats(cls):
        """Return daily, weekly, monthly, and total visit stats."""
        from django.db.models import Sum
        today = timezone.now().date()
        week_ago = today - timezone.timedelta(days=7)
        month_ago = today - timezone.timedelta(days=30)

        today_visits = cls.objects.filter(date=today).aggregate(total=Sum('count'))['total'] or 0
        weekly_visits = cls.objects.filter(date__gte=week_ago).aggregate(total=Sum('count'))['total'] or 0
        monthly_visits = cls.objects.filter(date__gte=month_ago).aggregate(total=Sum('count'))['total'] or 0
        total_visits = cls.objects.aggregate(total=Sum('count'))['total'] or 0

        return {
            'today': today_visits,
            'weekly': weekly_visits,
            'monthly': monthly_visits,
            'total': total_visits,
        }

class GameScore(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='scores')
    game_id = models.CharField(max_length=100)
    score = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('user', 'game_id')

    def __str__(self):
        return f"{self.user.username} - {self.game_id}: {self.score}"

class UserMessage(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    content = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.user.username if self.user else 'Anonymous'} at {self.created_at}"

@receiver(post_save, sender=User)

def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_profile(sender, instance, **kwargs):
    instance.profile.save()
