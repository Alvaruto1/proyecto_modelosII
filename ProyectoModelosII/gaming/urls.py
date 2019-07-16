from django.urls import path

from . import views

app_name = 'gaming'
urlpatterns = [
    path('', views.index, name='index'),

    path('juego/', views.juego, name='juego'),

    path('recomendado/', views.recomendado, name='recomendado'),

    path('contacto/', views.contacto, name='contacto'),

    path('quienessomos/', views.quienessomos, name='quienessomos'),

    path('tienda/', views.tienda, name='tienda'),

]