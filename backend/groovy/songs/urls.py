from django.urls import path
from .views import ArticlesListView, ArticlesDetailView, PlaylistListView, PlaylistDetailView, PlaylistDetailsListView

urlpatterns = [
    path('api/', ArticlesListView.as_view()),
    path('api/<pk>/', ArticlesDetailView.as_view()),

    path('playlist/api/', PlaylistListView.as_view()),
    path('playlist/api/<pk>/', PlaylistDetailView.as_view()),

    path('playlistDetail/api/<int:playlistID>/',
         PlaylistDetailsListView.as_view())

]
