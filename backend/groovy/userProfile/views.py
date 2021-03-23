from .models import UserProfile
from .serializers import UserProfileSerializer
from rest_framework.generics import ListAPIView


# Create your views here.


# User Profile
class UserProfileListView(ListAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

