from .models import UserProfile
from .serializers import UserProfileSerializer, UserSerializer
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, DestroyAPIView, UpdateAPIView, RetrieveDestroyAPIView
from django.contrib.auth.models import User


# Create your views here.


# User Profile
class UserProfileListView(ListAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer


class UserProfileDetailView(ListAPIView):
    # queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    def get_queryset(self):
        self.id = self.kwargs['userID']
        return UserProfile.objects.filter(user=self.id)


class UserProfileCreateView(CreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer


class UserProfileUpdateView(UpdateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer


class UserProfileDeleteView(RetrieveDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    