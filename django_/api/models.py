from django.db import models

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
        return self.name