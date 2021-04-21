from django.db import models

# Create your models here.
from django.contrib.auth.models import User
from songs.models import Songs

class Like(models.Model):
    song = models.ForeignKey(Songs, on_delete=models.CASCADE)
    username = models.ForeignKey(User, on_delete=models.CASCADE)

    @property
    def getUsername(self):
        return self.username.username


class Comment(models.Model):
    song = models.ForeignKey(Songs, on_delete=models.CASCADE)
    username = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.TextField(max_length=1000)
    date = models.DateTimeField(auto_now_add=True)

    @property
    def getUsername(self):
        return self.username.username
    

class Follow(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="following")
    following = models.ForeignKey(User, on_delete=models.CASCADE, related_name="followers")
    date = models.DateTimeField(auto_now_add=True)

    @property
    def getUsername(self):
        return self.user.username

    def getFollowingUsername(self):
        return self.following.username

        