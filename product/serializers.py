from rest_framework import serializers
from product.models import Product


class ProductSerializer(serializers.ModelSerializer):
    store_name = serializers.SerializerMethodField()

    def get_store_name(self, obj):
        return obj.store.name

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'stock', 'store_name', 'store']