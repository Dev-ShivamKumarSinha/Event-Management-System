from rest_framework import serializers
from .models import RegisteredUser, Event, EventUserMapping
#from django.contrib.auth.models import User

class RegisteredUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegisteredUser
        fields = ('userId','username', 'password', 'phoneno')

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

class EventUserMappingSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventUserMapping
        fields = '__all__'
    