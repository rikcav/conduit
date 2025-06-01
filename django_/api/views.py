from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Tag
from .serializers import TagSerializer


@api_view(["GET", "POST"])
def tag_list(request):
    """Handle listing all tags and creating new tags.

    Routes:
        GET  /api/tags/     -> List all tags
        POST /api/tags/     -> Create a new tag
    """
    if request.method == "GET":
        tags = Tag.objects.all()
        serializer = TagSerializer(tags, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # POST
    serializer = TagSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "DELETE"])
def tag_detail(request, pk):
    """Handle retrieving or deleting a single tag.

    Routes:
        GET    /api/tags/<pk>/  -> Get one tag by id
        DELETE /api/tags/<pk>/  -> Delete the tag
    """
    tag = get_object_or_404(Tag, pk=pk)

    if request.method == "GET":
        serializer = TagSerializer(tag)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # DELETE
    tag.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
