from django.db import models
from django.contrib import admin
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.timezone import now







class Tipo(models.Model):
    nombre = models.CharField(max_length=50)





class Recomendado(models.Model):
    tipo = models.ForeignKey(Tipo, on_delete=models.CASCADE)
    cantidad = models.IntegerField(default=0)



class Juego(models.Model):
    tipo = models.ForeignKey(Tipo, on_delete=models.CASCADE, null=True, blank=True)
    nombre = models.CharField(max_length=200,unique=True)
    creador = models.CharField(max_length=200)
    fechaCreacion = models.DateField('fecha Creacion')


class Jugador(models.Model):
    usuario = models.OneToOneField(User, on_delete=models.CASCADE)
    tiposRecomendados = models.ManyToManyField(Recomendado)
    def __str__(self):
        return self.usuario.username



class Puntaje(models.Model):
    valor = models.IntegerField(default=0)
    fecha = models.DateTimeField('fecha puntaje',default=now)
    juego = models.ForeignKey(Juego, on_delete=models.CASCADE, null=True,blank=True)
    jugador = models.ForeignKey(Jugador, on_delete=models.CASCADE, null=True,blank=True)


class TipoAdmin(admin.ModelAdmin):
    fields = ('nombre',)

@receiver(post_save, sender=User)
def crear_usuario_perfil(sender, instance, created, **kwargs):
    if created:
        Jugador.objects.create(usuario=instance)

@receiver(post_save, sender=User)
def guardar_usuario_perfil(sender, instance, **kwargs):
    instance.jugador.save()