from .models import UserProfile
from .serializers import UserProfileSerializer, UserSerializer
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, DestroyAPIView, UpdateAPIView, RetrieveDestroyAPIView
from django.contrib.auth.models import User
from django.db.models import Q

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


class ArtistSearchView(ListAPIView):
    serializer_class = UserProfileSerializer

    def get_queryset(self):
        self.query = self.kwargs['query']
        self.queries = self.query.split(" ")
        self.queryset = []
        
        for q in self.queries:
            lookup = Q(first_name__icontains = q) | Q(last_name__icontains = q) | Q(user__username__icontains = q)

            users = UserProfile.objects.filter(lookup)

            for user in users:
                self.queryset.append(user)   

            return list(set(self.queryset))