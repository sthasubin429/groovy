from django.shortcuts import render


from django.shortcuts import get_object_or_404
from .models import Like, Comment, Follow
from .serializers import LikeSerializer, CommentSerializer, FollowSerializer
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, DestroyAPIView, UpdateAPIView

# Like
class LikesListView(ListAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer


class GetSongLikes(ListAPIView):
    # queryset = Like.objects.all()
    serializer_class = LikeSerializer

    def get_queryset(self):
        self.id = self.kwargs['songID']
        return Like.objects.filter(song=self.id)
        

class GetUserLikes(ListAPIView):
    # queryset = Like.objects.all()
    serializer_class = LikeSerializer

    def get_queryset(self):
        self.id = self.kwargs['userID']
        return Like.objects.filter(username=self.id)


class CheckUserSongLike(ListAPIView):
    serializer_class = LikeSerializer

    def get_queryset(self):
        self.song = self.kwargs['songID']
        self.user = self.kwargs['userID']
        return Like.objects.filter(song__exact=self.song).filter(username__exact=self.user)


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


class GetSongComments(ListAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):
        self.id = self.kwargs['songID']
        return Comment.objects.filter(song=self.id)\

            

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


class CheckUserFollow(ListAPIView):
    serializer_class = FollowSerializer

    def get_queryset(self):
        self.user = self.kwargs['userID']
        self.following = self.kwargs['followingID']
        return Follow.objects.filter(user__exact=self.user).filter(following__exact=self.following)


class GetUserFollowers(ListAPIView):
    serializer_class = FollowSerializer

    def get_queryset(self):
        self.user = self.kwargs['userID']
        return Follow.objects.filter(user=self.user)
        

class GetUserFollowing(ListAPIView):
    serializer_class = FollowSerializer

    def get_queryset(self):
        self.user = self.kwargs['userID']
        return Follow.objects.filter(following=self.user)


class FollowCreateView(CreateAPIView):
    queryset = Follow.objects.all()
    serializer_class = FollowSerializer


class FollowUpdateView(UpdateAPIView):
    queryset = Follow.objects.all()
    serializer_class = FollowSerializer


class FollowsDeleteView(DestroyAPIView):
    queryset = Follow.objects.all()
    serializer_class = FollowSerializer