from rest_framework import routers
from django.conf.urls import url, include
from sale.views import SaleViewSet, SaleByStore

router = routers.DefaultRouter()
router.register('', SaleViewSet)

urlpatterns = [
    url('', include(router.urls)),
    url(r'^store/(?P<pk>\d+)', SaleByStore.as_view(), name='product_by_store')
]