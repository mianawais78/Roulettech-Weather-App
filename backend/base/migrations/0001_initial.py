# Generated by Django 4.2.15 on 2024-08-23 10:12

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Location',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('temperature', models.FloatField()),
                ('weather_description', models.CharField(max_length=100)),
                ('feels_like', models.FloatField()),
                ('humidity', models.IntegerField()),
                ('wind_speed', models.FloatField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
