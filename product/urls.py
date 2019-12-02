from rest_framework import routers
from product.views import ProductViewSet, ProductByStore
from django.conf.urls import url, include

router = routers.DefaultRouter()
router.register(r'', ProductViewSet)

urlpatterns = [
    url('', include(router.urls)),
    url(r'^store/(?P<pk>\d+)', ProductByStore.as_view(), name='product_by_store')
]