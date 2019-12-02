from rest_framework.viewsets import ModelViewSet
from store import serializers as store_serializers
from store import models as store_models


class StoreViewSet(ModelViewSet):
    serializer_class = store_serializers.StoreSerializer
    queryset = store_models.Store.objects.all()
