from django.contrib.auth.models import User
from django.db import models


# Create your models here.
class UserProfile(models.Model):
    first_name = models.CharField(default='FirstName', max_length=200)
    last_name = models.CharField(default='LastName', max_length=200)
    profile_picture = models.ImageField(default='profile/default.jpg', upload_to="profile")
    bio = models.TextField(default='Hi')
    user = models.OneToOneField(User, on_delete=models.CASCADE, unique=True)

    def __str__(self):
        return self.first_name

    @property
    def getUsername(self):
        return self.user.username