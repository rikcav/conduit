from django.shortcuts import get_object_or_404
from django.db import IntegrityError
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
import unicodedata

from .models import User, Tag, Article, Comment
from .serializers import (
    UserSerializer,
    TagSerializer,
    ArticleSerializer,
    CommentSerializer,
)


# TAGS
def normalize_string(s):
    # Convert to lowercase, replace spaces with underscores, and remove non-ASCII characters.
    s = s.lower().replace(" ", "_")
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode("ascii")
    return s


@api_view(["GET"])
def tag_list(request):
    # GET ALL
    if request.method == "GET":
        tags = Tag.objects.all()
        serializer = TagSerializer(tags, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# USERS
@api_view(["GET", "POST"])
def user_list(request):
    # GET ALL
    if request.method == "GET":
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # POST
    if request.method == "POST":
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            try:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except IntegrityError:
                return Response(
                    {"error": "Username or email already exists"},
                    status=status.HTTP_409_CONFLICT,
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT"])
def user_detail(request, pk):
    user = get_object_or_404(User, pk=pk)

    if request.method == "PUT":
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            try:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            except IntegrityError:
                return Response(
                    {"error": "Username or email already exists"},
                    status=status.HTTP_409_CONFLICT,
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "POST"])
def article_list(request):
    # GET ALL
    if request.method == "GET":
        articles = Article.objects.all()
        serializer = ArticleSerializer(articles, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # POST
    data = request.data.copy()
    tags = data.get("tagList", [])

    if isinstance(tags, list):
        normalized_tags = []
        for tag_name in tags:
            normalized_name = normalize_string(tag_name)
            Tag.objects.get_or_create(name=normalized_name)
            normalized_tags.append(normalized_name)
        data["tagList"] = normalized_tags

    serializer = ArticleSerializer(data=data)
    if serializer.is_valid():
        try:
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except IntegrityError:
            return Response(
                {"error": "Article with the same title or slug already exists"},
                status=status.HTTP_409_CONFLICT,
            )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PUT", "DELETE"])
def article_detail(request, slug):
    # GET ONE
    article = get_object_or_404(Article, slug=slug)

    if request.method == "GET":
        serializer = ArticleSerializer(article)
        return Response(serializer.data, status=status.HTTP_200_OK)

    if request.method == "PUT":
        serializer = ArticleSerializer(article, data=request.data, partial=True)
        if serializer.is_valid():
            try:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            except IntegrityError:
                return Response(
                    {"error": "Slug or title already exists"},
                    status=status.HTTP_409_CONFLICT,
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "DELETE":
        article.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["POST", "DELETE"])
def article_favorite(request, slug):
    # POST (FAVORITE)
    article = get_object_or_404(Article, slug=slug)

    if request.method == "POST":
        try:
            article.favorited = True
            article.favoritesCount += 1
            article.save()
            serializer = ArticleSerializer(article)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception:
            return Response(
                {"error": "Could not favorite the article"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    # DELETE (UNFAVORITE)
    if request.method == "DELETE":
        try:
            if article.favoritesCount > 0:
                article.favoritesCount -= 1
                if article.favoritesCount == 0:
                    article.favorited = False
            article.save()
            serializer = ArticleSerializer(article)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception:
            return Response(
                {"error": "Could not unfavorite the article"},
                status=status.HTTP_400_BAD_REQUEST,
            )


@api_view(["GET", "POST"])
def comment_list_create(request, slug):
    article = get_object_or_404(Article, slug=slug)

    # GET ALL COMMENTS FROM ARTICLE
    if request.method == "GET":
        comments = article.comments.all()
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # POST A COMMENT TO THE ARTICLE
    elif request.method == "POST":
        data = request.data.copy()
        data["article"] = article.id
        serializer = CommentSerializer(data=data)

        if serializer.is_valid():
            try:
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except IntegrityError:
                return Response(
                    {"error": "Could not create comment due to a data conflict"},
                    status=status.HTTP_409_CONFLICT,
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
def comment_delete(request, slug, pk):
    article = get_object_or_404(Article, slug=slug)
    comment = get_object_or_404(Comment, pk=pk, article=article)

    try:
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Exception:
        return Response(
            {"error": "Failed to delete comment"},
            status=status.HTTP_400_BAD_REQUEST,
        )
