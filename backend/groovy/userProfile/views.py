from .models import UserProfile
from .serializers import UserProfileSerializer
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, DestroyAPIView, UpdateAPIView


# Create your views here.


# User Profile
class UserProfileListView(ListAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer


class UserProfileDetailView(RetrieveAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer


class UserProfileCreateView(CreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer


class UserProfileUpdateView(UpdateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer


class UserProfileDeleteView(DestroyAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    