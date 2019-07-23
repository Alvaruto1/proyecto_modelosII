"""appGaming URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from gaming.views import InicioSesionView, RegistroView, principal \
    , SalirSesionView, listarTienda, jugar, registrarScore, listarRecomendados, user

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',principal, name='index'),
    path('listar_tienda',listarTienda, name='listar_tienda'),
    path('listar_recomendados',listarRecomendados, name='listar_recomendados'),
    path('registro/',RegistroView.as_view(),name='registro'),
    path('inicio_sesion/',InicioSesionView.as_view(),name='inicio_sesion'),
    path('salir/',SalirSesionView.as_view(),name='salir'),
    path('juegos/<str:juego>',jugar,name='juegos'),
    path('juego/registra_score',registrarScore,name='registra_score'),
    path('user/',user,name='usuario')

]
