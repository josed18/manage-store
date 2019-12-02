from rest_framework import routers
from django.conf.urls import url, include
from store.views import StoreViewSet

router = routers.DefaultRouter()
router.register(r'', StoreViewSet)

urlpatterns = [
    url(r'', include(router.urls)),
]
