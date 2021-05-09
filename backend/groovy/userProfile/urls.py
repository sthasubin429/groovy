from django.urls import path, include
from .views import UserProfileListView, UserProfileDetailView, UserProfileCreateView, UserProfileUpdateView, UserProfileDeleteView, ArtistSearchView

urlpatterns = [
    path('api/', UserProfileListView.as_view()),
    path('api/create/', UserProfileCreateView.as_view()),
    path('api/<int:userID>/', UserProfileDetailView.as_view()),
    # path('api/<pk>/', UserProfileDetailView.as_view()),
    path('api/<pk>/update/', UserProfileUpdateView.as_view()),
    path('api/<pk>/delete/', UserProfileDeleteView.as_view()),
    path('api/password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
    path('api/search/<str:query>/', ArtistSearchView.as_view()),
]
