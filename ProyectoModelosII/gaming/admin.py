from django.contrib import admin
from .models import *

admin.site.register(Plataforma)
admin.site.register(Tipo, TipoAdmin)
admin.site.register(Recomendado, RecomendadoAdmin)
admin.site.register(Jugador, JugadorAdmin)
admin.site.register(Puntaje, PuntajeAdmin)
admin.site.register(Juego, JuegoAdmin)
