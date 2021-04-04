
from django.shortcuts import get_object_or_404
from .models import Songs, Playlist, PlaylistDetails
from .serializers import SongsSerializer, PlaylistSerializer, PlaylistDetailsSerializer
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, DestroyAPIView, UpdateAPIView


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

