# Generated by Django 3.1.2 on 2021-03-22 13:10

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('songs', '0010_auto_20210322_1852'),
    ]

    operations = [
        migrations.AlterField(
            model_name='songs',
            name='song_date',
            field=models.DateTimeField(default=datetime.datetime(2021, 3, 22, 18, 55, 34, 151179)),
        ),
    ]
