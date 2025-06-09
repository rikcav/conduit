from django.urls import path
from .views import (
    tag_list,
    user_list,
    user_detail,
    article_list,
    article_detail,
    article_favorite,
    comment_list_create,
    comment_delete,
)

urlpatterns = [
    path("tags", tag_list, name="tag-list"),

    path("users", user_list, name="user-list"),
    path("users/<int:pk>", user_detail, name="user-detail"),

    path("articles", article_list, name="article-list"),
    path("articles/<str:slug>", article_detail, name="article-detail"),
    path("articles/<str:slug>/favorite", article_favorite, name="article-favorite"),

    path("articles/<str:slug>/comments", comment_list_create),
    path("articles/<str:slug>/comments/<int:pk>", comment_delete),
]
