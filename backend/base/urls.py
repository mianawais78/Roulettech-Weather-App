from django.urls import path
from . import views


urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),

    path('register/', views.registerUser, name='register'),

    path('profile/', views.getUserProfile, name="users-profile"),
    path('profile/update/', views.updateUserProfile, name="user-profile-update"),
    # path('', views.getUsers, name="users"),

    # path('<str:pk>/', views.getUserById, name='user'),

    path('update/<str:pk>/', views.updateUser, name='user-update'),
    path('fetch-weather/', views.fetch_weather, name='fetch_weather'),
    path('delete-location/<str:name>/', views.delete_location, name='delete_location'),
     path('locations/', views.get_saved_locations, name='get_saved_locations'),
    # path('delete/<str:pk>/', views.deleteUser, name='user-delete'),
]