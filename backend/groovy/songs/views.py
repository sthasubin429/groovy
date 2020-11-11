from rest_framework.generics import ListAPIView, RetrieveAPIView

from .models import Songs
from .serializers import SongsSerializer


class ArticlesListView(ListAPIView):
    queryset = Songs.objects.all()
    serializer_class = SongsSerializer


class ArticlesDetailView(RetrieveAPIView):
    queryset = Songs.objects.all()
    serializer_class = SongsSerializer
