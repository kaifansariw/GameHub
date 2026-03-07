from django.urls import path
from . import views
from .views import leaderboard, add_visit, add_play, site_visit_counter, site_visit_stats
urlpatterns = [
    path('login/', views.login, name='login'),
    path('register/', views.register, name='register'),
    path('logout/', views.logout, name='logout'),
    path('leaderboard/', leaderboard, name='leaderboard'),
    path('add-visit/', add_visit, name='add_visit'),    
    path('add-play/', add_play, name='add_play'),
    path('site-visit/', site_visit_counter, name='site_visit_counter'),
    path('site-stats/', site_visit_stats, name='site_visit_stats'),
]
