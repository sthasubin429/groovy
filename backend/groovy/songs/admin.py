from django.contrib import admin
from .models import Songs, Playlist, PlaylistDetails


# Register your models here.
admin.site.register(Songs)
admin.site.register(Playlist)
admin.site.register(PlaylistDetails)
