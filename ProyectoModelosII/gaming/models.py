from django.db import models
from django.contrib import admin


class Plataforma(models.Model):
    listadoJuegos = models.CharField(max_length=200)


class Tipo(models.Model):
    nombre = models.CharField(max_length=50)
    tipo = models.CharField(max_length=50)


class Recomendado(models.Model):
    tipo = models.ForeignKey(Tipo, on_delete=models.CASCADE)
    cantidad = models.IntegerField(default=0)


class Jugador(models.Model):
    plataforma = models.ForeignKey(Plataforma, on_delete=models.CASCADE)
    tiposRecomendados = models.ForeignKey(Recomendado, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    alias = models.CharField(max_length=50)
    contrasena = models.CharField('password', max_length=50)
    fechaNacimiento = models.DateTimeField('fecha nacimiento')


class Puntaje(models.Model):
    jugador = models.ForeignKey(Jugador, on_delete=models.CASCADE)
    valor = models.IntegerField(default=0)
    fecha = models.DateTimeField('fecha puntaje')


class Juego(models.Model):
    puntaje = models.ForeignKey(Puntaje, on_delete=models.CASCADE)
    tipo = models.ForeignKey(Tipo, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=200)
    creador = models.CharField(max_length=200)
    fechaCreacion = models.DateTimeField('fecha Creacion')


class TipoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'tipo')


class RecomendadoAdmin(admin.ModelAdmin):
    list_display = ('tipo', 'cantidad')


class JugadorAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'apellido', 'alias')


class PuntajeAdmin(admin.ModelAdmin):
    list_display = ('jugador', 'valor', 'fecha')


class JuegoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'tipo', 'puntaje')


