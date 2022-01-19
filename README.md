# Devil App

[Devil_app_Link](http://159.223.147.188:3001/login)

Example endpoint
[Link](http://159.223.147.188:3001/api)
@host=http://159.223.147.188:3001

@aouth=http://{{host}}/api/auth
@login=http://{{host}}/api/login
@cita=http://{{host}}/api/cita

@token = "your_token"
@token2 = "your_token"
#############################################
POST {{aouth}}
Content-Type: application/json

{
  "name": "stevam",
  "password": "PassPass123",
  "email": "stev6@gmail.com"
}

#############################################
POST {{login}}
Content-Type: application/json

{
  "password": "PassPass123",
  "email": "stev@gmail.com"
}
#############################################
GET {{login}}
x-access-token: {{token2}}
#############################################
GET {{cita}}
x-access-token: {{token2}}
#############################################
POST {{cita}}
x-access-token: {{token2}}
Content-Type: application/json

{
  "title": "Citas",
  "start": "2019-09-09T11:00:00",
  "end": "2019-09-09T12:00:00",
  "date": "2019-09-09T13:00:00",
  "hora": "01:00"
}
#############################################
PUT {{cita}}/2
x-access-token: {{token2}}
Content-Type: application/json

{
  "title": "Citas",
  "start": "2019-09-09T11:00:00",
  "end": "2019-09-09T12:00:00",
  "date": "2019-09-09T13:00:00",
  "hora": "01:00"
}
#############################################
DELETE {{cita}}/3
x-access-token: {{token2}}

## Frontend

[Devil_app_Link](http://159.223.147.188:3001/login)

You can create hour, update, delete your hour whith background color red, if hour is background color black are hours other users and you will not be able to modify.

## Links
[Frontend](https://github.com/Stev-189/Devil_app_frontend)
[Backend](https://github.com/Stev-189/Devil_app_backend)
[Devil_App](http://159.223.147.188:3001/login)