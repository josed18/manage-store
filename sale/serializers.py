from rest_framework import serializers
from sale.models import Sale, SaleProduct


class SaleProductSerializer(serializers.ModelSerializer):
    product_name = serializers.SerializerMethodField()

    def get_product_name(self, obj):
        return obj.product.name

    class Meta:
        model = SaleProduct
        fields = ['product_name', 'product', 'sale', 'pay_price', 'quantity', 'pay_line']


class SaleSerializer(serializers.ModelSerializer):
    store_name = serializers.SerializerMethodField()
    product_sales = serializers.SerializerMethodField()

    def get_store_name(self, obj):
        return obj.store.name

    def get_product_sales(self, obj):
        return SaleProductSerializer(obj.sale_products.all(), many=True).data

    class Meta:
        model = Sale
        fields = ['id', 'product_sales', 'customer_name', 'customer_address', 'store_name', 'store', 'total_pay', 'created']
        read_only_fields = ('total_pay', 'created')

