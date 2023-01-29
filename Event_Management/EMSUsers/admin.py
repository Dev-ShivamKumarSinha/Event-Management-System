from django.contrib import admin
from .models import RegisteredUser, Event, EventUserMapping

# Register your models here.
admin.site.register(RegisteredUser)
admin.site.register(Event)
admin.site.register(EventUserMapping)