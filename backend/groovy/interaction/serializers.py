from rest_framework import serializers

from .models import Like, Comment, Follow


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ('id', 'song', 'username', 'getUsername')


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id', 'song', 'username', 'comment', 'date', 'getUsername')


class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follow  
        fields = ('id', 'user', 'following', 'date', 'getUsername', 'getFollowingUsername')