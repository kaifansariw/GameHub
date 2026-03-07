from django.urls import path
from . import views
from .views import leaderboard, add_visit, add_play, save_score, profile_dashboard
urlpatterns = [
    path('login/', views.login, name='login'),
    path('register/', views.register, name='register'),
    path('logout/', views.logout, name='logout'),
    path('leaderboard/', leaderboard, name='leaderboard'),
    path('add-visit/', add_visit, name='add_visit'),    
    path('add-play/', add_play, name='add_play'),
    path('save-score/', save_score, name='save_score'),
    path('profile/', profile_dashboard, name='profile'),
    path('send-feedback/', views.send_feedback, name='send_feedback'),
    path('messages/', views.message_search, name='message_search'),
]


