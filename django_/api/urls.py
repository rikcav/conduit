from django.urls import path
from .views import tag_detail

urlpatterns = [
    path("tag/", tag_detail, name="tag_detail"),
]
