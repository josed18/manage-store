from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_422_UNPROCESSABLE_ENTITY
from sale import serializers as sale_serializers
from sale import models as sale_models
from product import models as product_models
from django.core.exceptions import ObjectDoesNotExist


class SaleViewSet(ModelViewSet):
    serializer_class = sale_serializers.SaleSerializer
    queryset = sale_models.Sale.objects.all()

    def create(self, request, *args, **kwargs):
        products_list = []
        for product_data in request.data.pop('products', []):
            try:
                product = product_models.Product.objects.get(pk=product_data.get('id'), store_id=request.data.get('store'))
            except ObjectDoesNotExist:
                return Response({
                    'message': f"product with id {product_data.get('id')} not exist "
                }, status=HTTP_422_UNPROCESSABLE_ENTITY)
            if product.stock < product_data.get('quantity'):
                return Response({
                    'message': f"there are not enough \"{product.name}\" in the stock"
                }, status=HTTP_422_UNPROCESSABLE_ENTITY)
            products_list.append({'product': product, 'quantity': product_data.get('quantity')})

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        sale = serializer.save()

        sale.add_products(products_list)

        return Response(serializer.data)


class SaleByStore(APIView):
    serializer_class = sale_serializers.SaleSerializer
    queryset = sale_models.Sale.objects.all()

    def get(self, request, pk, *args, **kwargs):
        sales = sale_models.Sale.objects.filter(store_id=pk).all()
        return Response(data=sale_serializers.SaleSerializer(sales, many=True).data)