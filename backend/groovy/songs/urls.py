from django.urls import path
from .views import ArticlesListView, ArticlesDetailView, ArticlesCreateView, ArticlesUpdateView, ArticlesDeleteView, PlaylistListView, PlaylistDetailView, PlaylistDetailsListView

urlpatterns = [
    path('api/', ArticlesListView.as_view()),
    path('api/create/', ArticlesCreateView.as_view()),

    path('api/<pk>/', ArticlesDetailView.as_view()),
    path('api/<pk>/update', ArticlesUpdateView.as_view()),
    path('api/<pk>/delete', ArticlesDeleteView.as_view()),


    path('playlist/api/', PlaylistListView.as_view()),
    path('playlist/api/<pk>/', PlaylistDetailView.as_view()),

    path('playlistDetail/api/<int:playlistID>/',
         PlaylistDetailsListView.as_view())

]
