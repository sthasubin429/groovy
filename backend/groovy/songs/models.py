from django.contrib.auth.models import User
from django.db import models
import datetime
# from interaction.models import Like, Comment

# Create your models here.


class Songs(models.Model):
    song_name = models.CharField(max_length=200)
    song_date = models.DateTimeField(auto_now_add=True)
    song_audio = models.FileField(upload_to="songs")
    song_photo = models.ImageField(default='songCover/default.jpg', upload_to="songCover")
    username = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.song_name

    @property
    def getUsername(self):
        return self.username.username



class Playlist(models.Model):
    playlist_name = models.CharField(max_length=200)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    playlist_cover = models.ImageField(default='playlistCover/default.jpg', upload_to="playlistCover")

    def __str__(self):
        return self.playlist_name

    @property
    def getUsername(self):
        return self.created_by.username

    @property
    def getSongCount(self):
        songs = PlaylistDetails.objects.filter(playlist_id=self.id)
        return len(songs)



class PlaylistDetails(models.Model):
    playlist_id = models.ForeignKey(Playlist, on_delete=models.CASCADE)
    playlist_songs = models.ForeignKey(Songs, on_delete=models.CASCADE)
