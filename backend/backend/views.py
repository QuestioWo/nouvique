import json
import traceback

from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from backend.models import User
from backend.utils import (
	get_tokens_for_user,
	get_public_user_object,
	STATUS_CODE_4xx,
	STATUS_CODE_2xx
)


ROLE_NAME_TO_CODE = {
	"role1" : 1,
	"role2" : 2
}

class IndexView(APIView) :
	def get(self, request):
		return render(request, 'index.html')

class TestView(APIView):
	def get(self, request):
		data = {"blah" : "foo"}
		return Response(data, status=STATUS_CODE_2xx.SUCCESS.value)

class RegisterView(APIView):
	def post(self, request) :
		try :
			req = json.loads(request.body.decode('utf-8'))

			User.objects.create_user(req['username'], req['email'], req['password'], first_name=req['first_name'], last_name=req['last_name'])
			
			ret_user = User.objects.get(username=req['username'])
			
			tokens = get_tokens_for_user(ret_user)

			return Response({
				"tokens" : tokens,
				"username" : ret_user.username
			}, status=STATUS_CODE_2xx.CREATED.value)
		
		except Exception :
			traceback.print_exc()
			return Response({}, status=STATUS_CODE_4xx.BAD_REQUEST.value)

class LoginView(APIView):
	def post(self, request) :
		try :
			req = json.loads(request.body.decode('utf-8'))

			user = authenticate(username=req['username'], password=req['password'])

			if user :
				tokens = get_tokens_for_user(user)
				return Response({
					"tokens" : tokens,
					"username" : user.username
				}, status=STATUS_CODE_2xx.ACCEPTED.value)

			else :
				return Response({}, status=STATUS_CODE_4xx.BAD_REQUEST.value)

		except Exception :
			traceback.print_exc()
			return Response({}, status=STATUS_CODE_4xx.UNAUTHORIZED.value)

class UserGetView(APIView):
	def get(self, request, username) :
		try :
			user = User.objects.get(username=username)

			return Response(get_public_user_object(user), status=STATUS_CODE_2xx.SUCCESS.value)
		except Exception :
			traceback.print_exc()
			return Response({}, status=STATUS_CODE_4xx.BAD_REQUEST.value)

class UserChangeView(APIView):
	permission_classes = (IsAuthenticated, )

	def put(self, request, username):
		try :
			req = json.loads(request.body.decode('utf-8'))

			user = User.objects.get(username=username)
			user.first_name = req["first_name"]
			user.last_name = req["last_name"]
			user.email = req["email"]

			user.save()
			
			user = User.objects.get(username=username)
			return Response(get_public_user_object(user), status=STATUS_CODE_2xx.ACCEPTED.value)
		
		except Exception :
			traceback.print_exc()
			return Response({}, status=STATUS_CODE_4xx.BAD_REQUEST.value)

	def delete(self, request, username):
		try :
			user = User.objects.get(username=username)
			user.delete()

			return Response({}, status=STATUS_CODE_2xx.NO_CONTENT.value)
		
		except Exception :
			traceback.print_exc()
			return Response({}, status=STATUS_CODE_4xx.BAD_REQUEST.value)

class UserListView(APIView):
	def get(self, request):
		l = User.objects.all()
		users = []
		for u in l:
			users.append(get_public_user_object(u))

		return Response(users, status=STATUS_CODE_2xx.SUCCESS.value)

# class RolesListView(APIView):
# 	def get(self, request):
# 		l = Role.objects.all()
# 		roles = []
# 		for r in l:
# 			roles.append(get_public_role_object(r))

# 		return Response(roles, status=STATUS_CODE_2xx.SUCCESS.value)