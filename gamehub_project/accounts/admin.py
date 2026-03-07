from django.contrib import admin
from .models import Profile, SiteVisit


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'visits', 'plays')
    search_fields = ('user__username',)


@admin.register(SiteVisit)
class SiteVisitAdmin(admin.ModelAdmin):
    list_display = ('date', 'count')
    list_filter = ('date',)
    ordering = ('-date',)
