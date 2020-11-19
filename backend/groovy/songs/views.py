from rest_framework.generics import ListAPIView, RetrieveAPIView

from .models import Songs, Playlist, PlaylistDetails
from .serializers import SongsSerializer, PlaylistSerializer, PlaylistDetailsSerializer
from django.shortcuts import get_object_or_404


class ArticlesListView(ListAPIView):
    queryset = Songs.objects.all()
    serializer_class = SongsSerializer


class ArticlesDetailView(RetrieveAPIView):
    queryset = Songs.objects.all()
    serializer_class = SongsSerializer


class PlaylistListView(ListAPIView):
    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer


class PlaylistDetailView(RetrieveAPIView):
    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer


class PlaylistDetailsListView(ListAPIView):
    serializer_class = PlaylistDetailsSerializer

    def get_queryset(self):
        self.id = self.kwargs['playlistID']
        return PlaylistDetails.objects.filter(playlist_id=self.id)
