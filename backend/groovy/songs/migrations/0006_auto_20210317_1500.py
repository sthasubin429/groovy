# Generated by Django 3.1.2 on 2021-03-17 09:15

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('songs', '0005_auto_20210307_1239'),
    ]

    operations = [
        migrations.AlterField(
            model_name='songs',
            name='song_date',
            field=models.DateTimeField(default=datetime.datetime(2021, 3, 17, 15, 0, 57, 808208)),
        ),
    ]