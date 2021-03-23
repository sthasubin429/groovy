from django.urls import path
from .views import UserProfileListView

urlpatterns = [
    path('api/', UserProfileListView.as_view()),
]
