from django.db import models
from django.core.validators import MinValueValidator
from decimal import Decimal as D


class Product(models.Model):
    name = models.CharField(max_length=200, null=False, blank=False)
    description = models.TextField(null=False, blank=False)
    price = models.DecimalField(max_digits=12, decimal_places=2, validators=[MinValueValidator(D('0.01'))])
    stock = models.IntegerField(validators=[MinValueValidator(0)])
    store = models.ForeignKey('store.Store', null=False, on_delete=models.CASCADE)
