from django.urls import path
from .views import (
    tag_detail,
    tag_list,
    user_list,
    user_detail,
    article_list,
    article_detail,
)

urlpatterns = [
    path("tags", tag_list, name="tag-list"),
    path("tags/<int:pk>", tag_detail, name="tag-detail"),

    path("users", user_list, name="user-list"),
    path("users/<int:pk>", user_detail, name="user-detail"),

    path("articles", article_list, name="article-list"),
    path("articles/<str:slug>", article_detail, name="article-detail"),
]
