from django.urls import path
from .views import (
    tag_list,
    user_list,
    user_detail,
    article_list,
    article_detail,
    article_favorite,
    comment_list,
    comment_from_article_list,
    comment_detail,
)

urlpatterns = [
    path("tags", tag_list, name="tag-list"),

    path("users", user_list, name="user-list"),
    path("users/<int:pk>", user_detail, name="user-detail"),

    path("articles", article_list, name="article-list"),
    path("articles/<str:slug>", article_detail, name="article-detail"),
    path("articles/<str:slug>/favorite", article_favorite, name="article-favorite"),

    path("comments", comment_list, name="comment-list"),
    path("articles/<str:slug>/comments", comment_from_article_list, name="comment-from-article-list"),
    path("comments/<int:pk>", comment_detail, name="comment-detail"),
]
