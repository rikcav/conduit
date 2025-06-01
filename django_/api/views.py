from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
import unicodedata

from .models import User, Tag
from .serializers import UserSerializer, TagSerializer


# TAGS
def normalize_string(s):
    # Convert to lowercase, replace spaces with underscores, and remove non-ASCII characters.
    s = s.lower().replace(" ", "_")
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode("ascii")
    return s


@api_view(["GET", "POST"])
def tag_list(request):
    # GET ALL
    if request.method == "GET":
        tags = Tag.objects.all()
        serializer = TagSerializer(tags, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # POST
    data = {
        key: normalize_string(value) if isinstance(value, str) else value
        for key, value in request.data.items()
    }

    serializer = TagSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "DELETE"])
def tag_detail(request, pk):
    # GET ONE
    tag = get_object_or_404(Tag, pk=pk)

    if request.method == "GET":
        serializer = TagSerializer(tag)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # DELETE
    tag.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


# USERS
@api_view(["GET", "POST"])
def user_list(request):
    # GET ALL
    if request.method == "GET":
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # POST
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PUT", "DELETE"])
def user_detail(request, pk):
    # GET ONE
    user = get_object_or_404(User, pk=pk)

    if request.method == "GET":
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    if request.method == "PUT":
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # DELETE
    user.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
