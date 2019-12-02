from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from product import serializers as product_serializers
from product import models as product_models


class ProductViewSet(ModelViewSet):
    serializer_class = product_serializers.ProductSerializer
    queryset = product_models.Product.objects.all()


class ProductByStore(GenericAPIView):
    serializer_class = product_serializers.ProductSerializer
    queryset = product_models.Product.objects.all()

    def get(self, request, pk, *args, **kwargs):
        products = product_models.Product.objects.filter(store_id=pk).all()
        return Response(data=product_serializers.ProductSerializer(products, many=True).data)