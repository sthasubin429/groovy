
from django.shortcuts import get_object_or_404
from .models import Songs, Playlist, PlaylistDetails
from .serializers import SongsSerializer, PlaylistSerializer, PlaylistDetailsSerializer
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, DestroyAPIView, UpdateAPIView
from django.db.models import Q


# Songs
class ArticlesListView(ListAPIView):
    queryset = Songs.objects.all()
    serializer_class = SongsSerializer


class ArticlesDetailView(RetrieveAPIView):
    queryset = Songs.objects.all()
    serializer_class = SongsSerializer


class ArticlesCreateView(CreateAPIView):
    queryset = Songs.objects.all()
    serializer_class = SongsSerializer


class ArticlesUpdateView(UpdateAPIView):
    queryset = Songs.objects.all()
    serializer_class = SongsSerializer


class ArticlesDeleteView(DestroyAPIView):
    queryset = Songs.objects.all()
    serializer_class = SongsSerializer


class SongSearchView(ListAPIView):
    serializer_class = SongsSerializer

    def get_queryset(self):
        self.query = self.kwargs['query']
        lookup = Q(song_name__icontains = self.query)      
        return Songs.objects.filter(lookup).distinct()

    

class GetUserSongs(ListAPIView):
    serializer_class = SongsSerializer

    def get_queryset(self):
        self.id = self.kwargs['userID']
        return Songs.objects.filter(username=self.id)

# Playlist
class PlaylistListView(ListAPIView):
    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer


class PlaylistDetailView(RetrieveAPIView):
    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer


class PlaylistCreateView(CreateAPIView):
    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer


class PlaylistUpdateView(UpdateAPIView):
    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer


class PlaylistDeleteView(DestroyAPIView):
    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer


class GetUserPlaylist(ListAPIView):
    serializer_class = PlaylistSerializer

    def get_queryset(self):
        self.id = self.kwargs['userID']
        return Playlist.objects.filter(created_by=self.id)


# Playlist Details
class PlaylistDetailsListView(ListAPIView):
    serializer_class = PlaylistDetailsSerializer

    def get_queryset(self):
        self.id = self.kwargs['playlistID']
        return PlaylistDetails.objects.filter(playlist_id=self.id)


class PlaylistDetailsCreateView(CreateAPIView):
    queryset = PlaylistDetails.objects.all()
    serializer_class = PlaylistDetailsSerializer


class PlaylistDetailsDeleteView(DestroyAPIView):
    queryset = PlaylistDetails.objects.all()
    serializer_class = PlaylistDetailsSerializer


class PlaylistSongDetailsListView(ListAPIView):
    # serializer_class = SongsSerializer
    serializer_class = SongsSerializer

    def get_queryset(self):
        self.id = self.kwargs['playlistID']
        playlist = PlaylistDetails.objects.filter(playlist_id=self.id).values('playlist_songs')
        return Songs.objects.filter(id__in=playlist)

