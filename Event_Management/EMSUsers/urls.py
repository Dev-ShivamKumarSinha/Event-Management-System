from django.urls import path
from . import views

urlpatterns = [
    path('register-User', views.RegisterUser.as_view()),
    path('add-event', views.AddEvent.as_view()),
    path('events', views.AddEvent.as_view()),
    path('login', views.LoginUser.as_view()),
    path('register-event', views.RegisterForEvent.as_view()),
    path('enrolled-users', views.EnrolledUsers.as_view()),
    path('mark-present', views.MarkAttendance.as_view()),
    path('attendees', views.MarkAttendance.as_view()),
    path('admin-login', views.AdminLogin.as_view()),
    path('enrolled-events', views.EnrolledEvents.as_view()),

]

