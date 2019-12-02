from django.db import models
from django.core.validators import MinValueValidator
from decimal import Decimal as D


class SaleProduct(models.Model):
    product = models.ForeignKey('product.Product', on_delete=models.CASCADE, null=False)
    sale = models.ForeignKey('sale.Sale', related_name='sale_products', on_delete=models.CASCADE, null=False)
    pay_price = models.DecimalField(max_digits=12, decimal_places=2, default=D('0.00'))
    pay_line = models.DecimalField(max_digits=20, decimal_places=2, default=D('0.00'))
    quantity = models.IntegerField(validators=[MinValueValidator(1)])


class Sale(models.Model):
    customer_name = models.CharField(max_length=50, null=False, blank=False)
    customer_address = models.CharField(max_length=250, null=False, blank=False)
    total_pay = models.DecimalField(max_digits=20, decimal_places=2, default=D('0.00'))
    store = models.ForeignKey('store.Store', null=False, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)

    def add_products(self, products_list):
        total_pay = 0

        for product_data in products_list:

            product = product_data.get('product')
            quantity = product_data.get('quantity')

            product.stock -= quantity
            product.save()

            product_sale = SaleProduct.objects.create(
                sale=self,
                product=product,
                pay_price=product.price,
                quantity=quantity,
                pay_line=quantity * product.price
            )

            total_pay += product_sale.pay_line

        self.total_pay = total_pay
        self.save()
