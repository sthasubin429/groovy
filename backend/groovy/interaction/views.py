from django.shortcuts import render


from django.shortcuts import get_object_or_404
from .models import Like, Comment, Follow
from .serializers import LikeSerializer, CommentSerializer, FollowSerializer
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, DestroyAPIView, UpdateAPIView


# Like
class LikesListView(ListAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer


class LikesDetailView(RetrieveAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer



class LikesCreateView(CreateAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer


class LikesUpdateView(UpdateAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer



class LikesDeleteView(DestroyAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer


#Comments
class CommentsListView(ListAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


class CommentsDetailView(RetrieveAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer



class CommentsCreateView(CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


class CommentsUpdateView(UpdateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer



class CommentsDeleteView(DestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


#Follow
class FollowListView(ListAPIView):
    queryset = Follow.objects.all()
    serializer_class = FollowSerializer


class FollowDetailView(RetrieveAPIView):
    queryset = Follow.objects.all()
    serializer_class = FollowSerializer



class FollowCreateView(CreateAPIView):
    queryset = Follow.objects.all()
    serializer_class = FollowSerializer


class FollowUpdateView(UpdateAPIView):
    queryset = Follow.objects.all()
    serializer_class = FollowSerializer



class FollowsDeleteView(DestroyAPIView):
    queryset = Follow.objects.all()
    serializer_class = FollowSerializer