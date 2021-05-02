from rest_framework import serializers

from .models import Songs, Playlist, PlaylistDetails


class SongsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Songs
        fields = ('id', 'song_name', 'song_date',
                  'song_audio', 'song_photo', 'username', 'getUsername')


class PlaylistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Playlist
        fields = ('id', 'playlist_name', 'created_by', 'playlist_cover', 'getUsername')


class PlaylistDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlaylistDetails
        fields = ('id', 'playlist_id', 'playlist_songs')
