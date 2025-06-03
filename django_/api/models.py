from django.db import models
from django.utils import timezone
from django.utils.text import slugify


# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=150, unique=True, null=False)
    email = models.EmailField(unique=True, null=False)
    password = models.CharField(max_length=128, null=False)

    def __str__(self):
        return f"""
        ID: {self.id};
        Username: {self.username};
        Email: {self.email};
        Password: {self.password};
        """


class Tag(models.Model):
    name = models.CharField(max_length=64, unique=True)

    def __str__(self):
        return f"""
        ID: {self.id};
        Name: {self.name};
        """


class Article(models.Model):
    slug = models.SlugField(unique=True, null=True, blank=True)
    title = models.CharField(max_length=255, null=False)
    description = models.TextField(null=False)
    body = models.TextField(null=False)
    tagList = models.JSONField(default=list, blank=True)
    createdAt = models.DateTimeField(default=timezone.now)
    updatedAt = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="articles")
    favorited = models.BooleanField(default=False)
    favoritesCount = models.IntegerField(default=0)

    def save(self, *args, **kwargs):
        if not self.slug and self.title:
            base_slug = slugify(self.title)
            slug = base_slug
            counter = 1
            while Article.objects.filter(slug=slug).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)

    def __str__(self):
        return f"""
        ID: {self.id};
        Slug: {self.slug};
        Title: {self.title};
        Description: {self.description};
        Body: {self.body};
        TagList: {self.tagList};
        CreatedAt: {self.createdAt};
        UpdatedAt: {self.updatedAt};
        Favorited: {self.favorited};
        FavoritesCount: {self.favoritesCount};
        """
