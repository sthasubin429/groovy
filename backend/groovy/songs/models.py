from django.db import models
from django.contrib.auth.models import User


# Create your models here.


class Songs(models.Model):
    song_name = models.CharField(max_length=200)
    song_date = models.DateTimeField()
    song_audio = models.FileField(upload_to="songs")
    song_photo = models.ImageField(
        default='songCover/default.jpg', upload_to="songCover")
    username = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.song_name
