import jwt, secrets
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status, exceptions
from django.contrib.auth.models import User
from .models import RegisteredUser, Event, EventUserMapping
from . import serializers
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.authentication import get_authorization_header, BaseAuthentication

# Create your views here.
'''
Register Users
@Params
username : String
phoneno : Integer
password : String
'''
class RegisterUser(APIView):
    def post(self, request, format=None):
        serialized = serializers.RegisteredUserSerializer(data=request.data)
        if serialized.is_valid():
            username = serialized.data.get('username')
            phone_no = serialized.data.get('phoneno', None)
            password = serialized.data.get('password')
            
            user = User(
                    username=username,
                    password=password
                )

            if user:
                user.set_password(password)
                user.save()
                registerUser = RegisteredUser.objects.create(
                    username=username,
                    phoneno=phone_no,
                    password = password
                )
                body = {
                    'id' : user.id,
                    'username' : user.username
                }
            
                jwtToken = {'Success': serializers.RegisteredUserSerializer(registerUser).data,

                'Bearer': jwt.encode(body, "SECRET_KEY")}

                return Response(data=jwtToken, status = status.HTTP_201_CREATED)
            else:
                return Response(data={'Error': "Error Registering User"}, status = status.HTTP_400_BAD_REQUEST)
        else:
            return Response(data={'Error': serialized.errors}, status = status.HTTP_400_BAD_REQUEST)


'''
Creates and List available Events
#GET
/events/
#POST
/add-Event/
@Params

'''
class AddEvent(APIView):
    def get(self, request):
        events = Event.objects.all()
        serialized = serializers.EventSerializer(events, many=True)
        return Response(data=serialized.data)

    def post(self, request):
        serialized = serializers.EventSerializer(data=request.data)
        if serialized.is_valid():
            eventName = serialized.data.get('eventName')
            description = serialized.data.get('description')
            date = serialized.data.get('date')
            time = serialized.data.get('time')

            event = Event.objects.create(
                    eventName=eventName,
                    description=description,
                    date = date,
                    time = time
                )
            if event:
                response = {
                    "event no.": event.eventNo,
                    "event name": event.eventName,
                    "description": event.description,
                    "date": event.date,
                    "time": event.time
                }
                return Response(data=response, status = status.HTTP_201_CREATED)
            else:
                return Response(data={'Error': "Error Registering Event"}, status = status.HTTP_400_BAD_REQUEST)
        else:
            return Response(data={'Error': serialized.errors}, status = status.HTTP_400_BAD_REQUEST)

class RegisterForEvent(APIView):
    def post(self, request):
        obj = AuthenticateToken()
        user, error = obj.authenticateToken(request)
        if error:
            return Response(data=error, status=status.HTTP_401_UNAUTHORIZED)
        else:
            rUser = RegisteredUser.objects.get(username = user.username)
            eventNo = request.data.get('eventNo')
            event = Event.objects.get(eventNo=eventNo)
            if event:
                token = secrets.token_urlsafe(8)
                existingUserEvent = EventUserMapping.objects.filter(user__username=rUser.username).filter(event__eventNo=eventNo)
                if existingUserEvent:
                    return Response(data={"Message":"You have already enrolled for this event"}, status=status.HTTP_429_TOO_MANY_REQUESTS)
                else:
                    userEventmapp = EventUserMapping.objects.create(
                        user=rUser,
                        event=event,
                        attendance=False,
                        token=token
                    )
                    response = {
                        "event no.": event.eventNo,
                        "event name": event.eventName,
                        "description": event.description,
                        "enrolled userId": rUser.userId,
                        "enrolled user": rUser.username,
                        "date": event.date,
                        "time": event.time,
                        "token": token

                    }
                    return Response(data=response, status = status.HTTP_201_CREATED)
            else:
                return Response(data={'Error': "Event Doesn't Exist"}, status = status.HTTP_400_BAD_REQUEST)


class AuthenticateToken(BaseAuthentication):
    def authenticateToken(self, request):
        authToken = get_authorization_header(request).split()
        if not authToken or authToken[0].lower() != b'bearer': 
            return ('', {'Error':"Unauthorized Access !!! Invalid Token"})
        if len(authToken)==1 or len(authToken)>2:
            msg= 'Invalid token header/No credentials provided.'
            raise exceptions.AuthenticationFailed(msg)
        try:
            token = authToken[1]
            if token == 'null':
                msg = 'No Token Found'
                raise exceptions.AuthenticationFailed(msg)
        except UnicodeError:
            msg = 'Invalid token header.'
            raise exceptions.AuthenticationFailed(msg)

        return self.verifyCredentials(token)

    def verifyCredentials(self, token):
        try:
            body = jwt.decode(token, "SECRET_KEY", algorithms='HS256')
            username = body['username']
            userId = body['userId']
            user = User.objects.get(
                username=username,
                id=userId,
                is_active=True
            )
        except:
            return ('', {'Error': "Invalid Token"})
        return (user, '')

class LoginUser(APIView):
    def post(self, request):
        if not request.data.get('username') or not request.data.get('password'):
            return Response(data={'Error': "username/password not found"});
        username = request.data.get('username')
        password = request.data.get('password')

        if username and password:
            if (authenticate(username=username, password=password)) and (username!='admin' and password!='admin@super'):
                user = User.objects.get(username=username)
            else:
                return Response({'Error': "Invalid username/password"}, status = status.HTTP_400_BAD_REQUEST)
            
            if user:
                body = {
                    'userId': user.id,
                    'username': user.username,
                }

                jwtToken = {'Success' : "Sign in Successful!",
                    'Username' : user.username,
                    'Bearer': jwt.encode(body, "SECRET_KEY")}

                return Response(data=jwtToken, status = status.HTTP_201_CREATED)
            else:
                return Response(data={'Error': "Invalid Credentials"}, status = status.HTTP_401_UNAUTHORIZED)

class MarkAttendance(APIView):
    def get(self, request):
        eventId = request.data.get('eventId')
        Attendees = EventUserMapping.objects.filter(event__eventNo=eventId)
        response = []
        for attendee in Attendees:
            response.append({
                'Name':attendee.user.username,
                'Attended':attendee.attendance 
            }
            )
        return Response(data={"success":response})

    def post(self, request):
        obj = AuthenticateToken()
        user, error = obj.authenticateToken(request)
        if error:
            return Response(data=error, status=status.HTTP_401_UNAUTHORIZED)
        else:
            #rUser = RegisteredUser.objects.get(username = user.username)
            try:
                token = request.data.get('token')
                alreadyAttended = EventUserMapping.objects.filter(user__username=user.username).filter(token=token).filter(attendance=True)
                if alreadyAttended:
                    return Response(data={'Message': "You are already Marked Present"}, status=status.HTTP_202_ACCEPTED)
                else:
                    enrolledEvents = EventUserMapping.objects.filter(user__username=user.username).filter(token=token).update(attendance=True)
            except:
                return Response(data={'Error': "Invalid token or Not enrolled for the Event"}, status=status.HTTP_404_NOT_FOUND)
            if enrolledEvents:
                return Response(data={'Success': "Marked Present"}, status = status.HTTP_200_OK)
            else:
                return Response(data={'Error': "Invalid Ticket or Not enrolled for the Event"}, status = status.HTTP_404_NOT_FOUND)


class AdminLogin(APIView):
    def post(self, request):
        if not request.data.get('username') or not request.data.get('password'):
            return Response(data={'Error': "username/password not found"})
        username = request.data.get('username')
        password = request.data.get('password')

        adminUsername = 'admin'
        adminPassword = 'admin@super'
        
        if username==adminUsername and password==adminPassword:
            return Response(data={"success": "Admin login"}, status = status.HTTP_200_OK)
        else:
            return Response(data={'Error': "Invalid Credentials"}, status = status.HTTP_401_UNAUTHORIZED)
    

class EnrolledEvents(APIView):
    def get(self, request):
        obj = AuthenticateToken()
        user, error = obj.authenticateToken(request)
        if error:
            return Response(data=error, status=status.HTTP_401_UNAUTHORIZED)
        else:
            #rUser = RegisteredUser.objects.get(username = user.username)
            try:
                eventNo = request.data.get('eventNo')         
                enrolled = EventUserMapping.objects.filter(user__username=user.username)    
                if enrolled:
                    response = []
                    for i in enrolled:
                        response.append({
                            'eventNo': i.event.eventNo,
                            'eventName': i.event.eventName,
                            'description': i.event.description,
                            'date':i.event.date,
                            'time':i.event.time,
                            'ticket':i.token,
                            'attendance':i.attendance
                        })
                    return Response(data=response, status=status.HTTP_202_ACCEPTED)
            except:
                return Response(data={'Error': "Invalid eventNo or Not enrolled for the Event"}, status=status.HTTP_404_NOT_FOUND)


class EnrolledUsers(APIView):
    def post(self, request):
        eventNo = request.data.get('eventNo')
        EventUserList = EventUserMapping.objects.filter(event__eventNo=eventNo)  
        print(EventUserList)     
        if EventUserList:
            serialized = serializers.EventUserMappingSerializer(EventUserList, many=True)
            response =[]
            for i in EventUserList:
                response.append({
                    'userId': i.user.userId,
                    'username': i.user.username,
                    'phoneno': i.user.phoneno,
                    'attendance':i.attendance
                })
            return Response(data=response, status=status.HTTP_200_OK)
        else:
            return Response(data={"Message" : "No users Enrolled"}, status=status.HTTP_204_NO_CONTENT)