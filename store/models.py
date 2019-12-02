from django.db import models


class Store(models.Model):
    name = models.CharField(max_length=50, null=False, blank=False)
    description = models.TextField(null=True, blank=False)
    address = models.CharField(max_length=255, null=True, blank=False)

    def __str__(self):
        return self.name
