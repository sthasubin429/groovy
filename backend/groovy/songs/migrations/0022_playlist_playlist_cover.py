# Generated by Django 3.1.2 on 2021-05-02 09:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('songs', '0021_auto_20210417_1945'),
    ]

    operations = [
        migrations.AddField(
            model_name='playlist',
            name='playlist_cover',
            field=models.ImageField(default='playlistCover/default.jpg', upload_to='playlistCover'),
        ),
    ]