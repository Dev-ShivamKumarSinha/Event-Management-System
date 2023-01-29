from django.db import models
from django.core.exceptions import ValidationError
from django.core.validators import RegexValidator


def validatePass(value):
    if len(value) < 8:
        raise ValidationError("Password must contains at least 8 characters.")
    else:
        return value

# Create your models here.
class RegisteredUser(models.Model):
    phone_regex = RegexValidator(regex=r'^\+?1?\d{9,10}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
    
    userId = models.AutoField(primary_key=True)
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=16, validators =[validatePass] )
    phoneno = models.IntegerField(validators=[phone_regex])

    def __str__(self):
        return str(self.userId)

class Event(models.Model):
    eventNo = models.AutoField(primary_key=True)
    eventName = models.CharField(max_length=50)
    description = models.CharField(max_length=200)
    date = models.DateField()
    time = models.TimeField()

    def __str__(self):
        return str(self.eventNo)+'-'+str(self.eventName)

class EventUserMapping(models.Model):
    user = models.ForeignKey(RegisteredUser, on_delete=models.CASCADE, null=False)
    event = models.ForeignKey(Event, on_delete=models.CASCADE, null=False)
    attendance = models.BooleanField(default=False)
    token = models.CharField(unique=True, max_length=15)

    def __str__(self):
         return str(self.user)+'-'+str(self.event)
    