from django.urls import path
from .views import ArticlesListView, ArticlesDetailView

urlpatterns = [
    path('api/', ArticlesListView.as_view()),
    path('api/<pk>/', ArticlesDetailView.as_view())
]
