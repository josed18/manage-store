from django.views.generic import TemplateView


class MainView(TemplateView):
    template_name = "public/index.html"


class ProdcutView(TemplateView):
    template_name = "public/products.html"


class SalesView(TemplateView):
    template_name = "public/sales.html"
