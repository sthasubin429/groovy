from rest_framework import serializers

from .models import Songs


class SongsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Songs
        fields = ('id', 'song_name', 'song_date',
                  'song_audio', 'song_photo', 'username')
