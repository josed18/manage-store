from django.conf.urls import url, include
from public.views import MainView, ProdcutView, SalesView


urlpatterns = [
    url(r'^products', ProdcutView.as_view(), name='public_products'),
    url(r'^sales', SalesView.as_view(), name='public_sales'),
    url(r'^$', MainView.as_view(), name='public_store'),
]

