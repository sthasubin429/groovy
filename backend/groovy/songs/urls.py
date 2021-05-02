from django.urls import path
from .views import ArticlesListView, ArticlesDetailView, ArticlesCreateView, ArticlesUpdateView, ArticlesDeleteView, GetUserSongs,SongSearchView, PlaylistListView, PlaylistDetailView,PlaylistCreateView, PlaylistUpdateView, PlaylistDeleteView,  GetUserPlaylist, PlaylistDetailsListView, PlaylistDetailsCreateView, PlaylistDetailsDeleteView, PlaylistSongDetailsListView

urlpatterns = [
    path('api/', ArticlesListView.as_view()),
    path('api/userSongs/<int:userID>/', GetUserSongs.as_view()),
    path('api/create/', ArticlesCreateView.as_view()),
    path('api/<pk>/', ArticlesDetailView.as_view()),
    path('api/<pk>/update/', ArticlesUpdateView.as_view()),
    path('api/<pk>/delete/', ArticlesDeleteView.as_view()),
    path('api/search/<str:query>/', SongSearchView.as_view()),

    path('playlist/api/', PlaylistListView.as_view()),
    path('playlist/api/create/', PlaylistCreateView.as_view()),
    path('playlist/api/<pk>/', PlaylistDetailView.as_view()),
    path('playlist/api/<pk>/update/', PlaylistUpdateView.as_view()),
    path('playlist/api/<pk>/delete/', PlaylistDeleteView.as_view()),
    path('playlist/api/userPlaylist/<int:userID>/', GetUserPlaylist.as_view()),

    path('playlistDetail/api/create/', PlaylistDetailsCreateView.as_view()),
    path('playlistDetail/api/<int:playlistID>/', PlaylistDetailsListView.as_view()),
    path('playlistDetail/api/songDetails/<int:playlistID>/', PlaylistSongDetailsListView.as_view()),
    path('playlistDetail/api/<pk>/delete/', PlaylistDetailsDeleteView.as_view())

]
