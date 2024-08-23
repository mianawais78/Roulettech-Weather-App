from django.db import models
from django.contrib.auth.models import User
from django.conf import settings

# Create your models here.
class Location(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name='locations',
        default=1  # Set this to the ID of a user you want as default
    )
    name = models.CharField(max_length=100)
    temperature = models.FloatField()
    feels_like = models.FloatField()
    humidity = models.IntegerField()
    weather_description = models.CharField(max_length=100)
    wind_speed = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name