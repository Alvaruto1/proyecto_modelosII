from django.db import models
from django.contrib import admin
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


class Perfil(models.Model):
    usuario = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.CharField(max_length=255, blank=True)
    web = models.URLField(blank=True)

    def __str__(self):
        return self.usuario.username


@receiver(post_save, sender=User)
def crear_usuario_perfil(sender, instance, created, **kwargs):
    if created:
        Perfil.objects.create(usuario=instance)


@receiver(post_save, sender=User)
def guardar_usuario_perfil(sender, instance, **kwargs):
    instance.perfil.save()


class Tipo(models.Model):
    nombre = models.CharField(max_length=50)


class Puntaje(models.Model):
    valor = models.IntegerField(default=0)
    fecha = models.DateTimeField('fecha puntaje')


class Recomendado(models.Model):
    tipo = models.ForeignKey(Tipo, on_delete=models.CASCADE)
    cantidad = models.IntegerField(default=0)


class Juego(models.Model):
    puntaje = models.ForeignKey(Puntaje, on_delete=models.CASCADE)
    tipo = models.ForeignKey(Tipo, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=200)
    creador = models.CharField(max_length=200)
    fechaCreacion = models.DateTimeField('fecha Creacion')

    def listarJuegos(self):
        pass


class Jugador(models.Model):
    juego = models.ManyToManyField(Juego)
    tiposRecomendados = models.ManyToManyField(Recomendado)
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    alias = models.CharField(max_length=50)
    contrasena = models.CharField('password', max_length=50)
    fechaNacimiento = models.DateTimeField('fecha nacimiento')

    def listarJugadores(self):
        pass


class RecomendadoAdmin(admin.ModelAdmin):
    list_display = ('tipo', 'cantidad')


class JugadorAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'apellido', 'alias')


class PuntajeAdmin(admin.ModelAdmin):
    list_display = ('valor', 'fecha')


class JuegoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'tipo', 'puntaje')


