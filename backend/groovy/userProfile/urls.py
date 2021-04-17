from django.urls import path
from .views import UserProfileListView, UserProfileDetailView, UserProfileCreateView, UserProfileUpdateView, UserProfileDeleteView

urlpatterns = [
    path('api/', UserProfileListView.as_view()),
    path('api/create/', UserProfileCreateView.as_view()),
    path('api/<int:userID>/', UserProfileDetailView.as_view()),
    # path('api/<pk>/', UserProfileDetailView.as_view()),
    path('api/<pk>/update/', UserProfileUpdateView.as_view()),
    path('api/<pk>/delete/', UserProfileDeleteView.as_view())
]
