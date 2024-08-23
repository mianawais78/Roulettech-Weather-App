from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
import requests
from django.http import JsonResponse




from django.contrib.auth.models import User
from base.serializers import UserSerializer, UserSerializerWithToken

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password
from rest_framework import status
from .models import Location
from .serializers import LocationSerializer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

#For weather API

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def fetch_weather(request):
    location_name = request.data.get('location')

    if not location_name:
        return Response({'error': 'Location is required'}, status=status.HTTP_400_BAD_REQUEST)

    API_KEY = '895284fb2d2c50a520ea537456963d9c'
    url = f'http://api.openweathermap.org/data/2.5/weather?q={location_name}&units=imperial&appid={API_KEY}'
    response = requests.get(url)

    if response.status_code != 200:
        return Response({'error': 'Failed to fetch weather data'}, status=response.status_code)

    weather_data = response.json()
    user = request.user  # Get the current user

    # Save the weather data in the database
    location_instance = Location(
        user=user,  # Associate the location with the current user
        name=weather_data['name'],
        temperature=weather_data['main']['temp'],
        weather_description=weather_data['weather'][0]['description'],
        feels_like=weather_data['main']['feels_like'],
        humidity=weather_data['main']['humidity'],
        wind_speed=weather_data['wind']['speed']
    )
    location_instance.save()

    serializer = LocationSerializer(location_instance)
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_location(request, name):
    user = request.user

    locations = Location.objects.filter(name=name, user=user)

    if not locations.exists():
        return JsonResponse({'error': 'Location not found or not authorized'}, status=status.HTTP_404_NOT_FOUND)

    count, _ = locations.delete()
    
    return JsonResponse({'message': f'{count} location(s) deleted successfully'}, status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_saved_locations(request):
    user = request.user
    locations = Location.objects.filter(user=user)  # Filter by user
    serializer = LocationSerializer(locations, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)



@api_view(['POST'])
def registerUser(request):
    
    
    data = request.data
    try:
        user = User.objects.create(
            first_name=data['username'],
            username=data['username'],
            email=data['email'],
            password=make_password(data['password'])
        )

        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'User with this email already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)

    data = request.data
    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']

    if data['password'] != '':
        user.password = make_password(data['password'])

    user.save()

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUser(request, pk):
    user = User.objects.get(id=pk)

    data = request.data

    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']
    user.is_staff = data['isAdmin']

    user.save()

    serializer = UserSerializer(user, many=False)

    return Response(serializer.data)

