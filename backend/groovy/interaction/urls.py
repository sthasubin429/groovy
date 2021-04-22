from django.urls import path
from .views import LikesListView, LikesDetailView, LikesCreateView, LikesUpdateView, LikesDeleteView, GetSongLikes,CheckUserSongLike,  CommentsListView, CommentsDetailView, CommentsCreateView, CommentsUpdateView, CommentsDeleteView, FollowListView, FollowDetailView, FollowCreateView, FollowUpdateView, FollowsDeleteView 

urlpatterns = [
    path('likes/api/', LikesListView.as_view()),
    path('likes/api/song/<int:songID>/', GetSongLikes.as_view()),
    path('likes/api/checkLike/<int:songID>/<int:userID>/', CheckUserSongLike.as_view()),
    path('likes/api/create/', LikesCreateView.as_view()),
    path('likes/api/<pk>/', LikesDetailView.as_view()),
    path('likes/api/<pk>/update/', LikesUpdateView.as_view()),
    path('likes/api/<pk>/delete/', LikesDeleteView.as_view()),

    path('comments/api/', CommentsListView.as_view()),
    path('comments/api/create/', CommentsCreateView.as_view()),
    path('comments/api/<pk>/', CommentsDetailView.as_view()),
    path('comments/api/<pk>/update/', CommentsUpdateView.as_view()),
    path('comments/api/<pk>/delete/', CommentsDeleteView.as_view()),

    path('follow/api/', FollowListView.as_view()),
    path('follow/api/create/', FollowCreateView.as_view()),
    path('follow/api/<pk>/', FollowDetailView.as_view()),
    path('follow/api/<pk>/update/', FollowUpdateView.as_view()),
    path('follow/api/<pk>/delete/', FollowsDeleteView.as_view()),
]