from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from django.contrib.auth.views import LoginView,LogoutView
from django.http import JsonResponse,HttpResponse
from django.views.decorators.csrf import csrf_exempt

from django.views.generic import CreateView, TemplateView

from .models import Jugador, Juego, Recomendado, Puntaje, Tipo

from .forms import SignUpForm
import random

class RegistroView(CreateView):
    model = Jugador
    form_class = SignUpForm

    def form_valid(self, form):
        '''
        En este parte, si el formulario es valido guardamos lo que se obtiene de él y usamos authenticate para que el usuario incie sesión luego de haberse registrado y lo redirigimos al index
        '''
        form.save()
        usuario = form.cleaned_data.get('username')
        password = form.cleaned_data.get('password1')
        usuario = authenticate(username=usuario, password=password)
        login(self.request, usuario)
        return redirect('/')

class InicioSesionView(LoginView):
    template_name = 'gaming/inicio_sesion.html'




class SalirSesionView(LogoutView):
    pass


def principal(request):
    template_name = 'Principal/gaming++.html'
    jugador = None
    if request.user.is_authenticated:
        jugador = Jugador.objects.get(usuario_id=request.user.pk)
    context = {'jugador':jugador,}
    return render(request, template_name,context)


@csrf_exempt
def listarTienda(request):
    if request.is_ajax():
        tienda = list(Juego.objects.all().values())
        return JsonResponse({'tienda':tienda},content_type='application/json',safe=False)


@csrf_exempt
def listarRecomendados(request):
    if request.user.is_authenticated:
        if request.is_ajax():
            jugador = Jugador.objects.get(usuario_id=request.user.pk)
            recomendados= list(jugador.tiposRecomendados.all().values())

            juegos = list(Juego.objects.all().values())

            if(len(recomendados)==0):
                return JsonResponse({'recomendados':[],'estado':0})
            elif (len(recomendados)==1):
                juegosRecomendados = juegosListaRecomendados(juegos, [], recomendados[0]['tipo_id'])

                return JsonResponse({'recomendados':[juegosRecomendados],'estado':0})

            recomendado = tipoRecomendado(recomendados,recomendados[0])

            juegosRecomendados = juegosListaRecomendados(juegos,[],recomendado['tipo_id'])
            random.shuffle(juegosRecomendados)
            juegosRecomendados = juegosRecomendados[:10]

            return JsonResponse({'recomendados':juegosRecomendados,'estado':1},content_type='application/json',safe=False)


@csrf_exempt
def registrarScore(request):
    if request.user.is_authenticated:
        if request.is_ajax():
            score = request.POST.get('score')
            nombreJuego = request.POST.get('name')

            juego = Juego.objects.get(nombre=nombreJuego)
            jugador = Jugador.objects.get(usuario_id=request.user.pk)
            puntaje = None
            try:
                puntajes = list(Puntaje.objects.filter(juego_id=juego.pk).filter(jugador_id=jugador.pk))

                puntaje = puntajes[0]
                if(puntaje.valor<=int(score)):
                    puntaje.valor = score
            except (Puntaje.DoesNotExist, IndexError):
                puntaje = Puntaje()

                puntaje.jugador = jugador
                puntaje.juego = juego
                puntaje.valor = score

            puntaje.save()
            return HttpResponse("ok")


@csrf_exempt
def jugar(request, juego):
    if request.user.is_authenticated:
        juegoN = Juego.objects.get(nombre=juego)
        jugador = Jugador.objects.get(usuario_id=request.user.pk)
        try:
            recomendados = list(jugador.tiposRecomendados.filter(tipo_id=juegoN.tipo))
            recomendado = recomendados[0]
            cont = recomendado.cantidad
            recomendado.cantidad = cont + 1
            recomendado.save()
        except IndexError:
            recomendado = Recomendado()
            recomendado.tipo = juegoN.tipo
            recomendado.cantidad = 0
            recomendado.save()
            jugador.tiposRecomendados.add(recomendado)

        template_name = 'juegos/'+juego+'.html'
        return render(request,template_name,None)


# programacion funcional
def tipoRecomendado(recomendados, recomendado):
    if recomendados == []:
        return recomendado
    else:
        if(recomendados[0]['cantidad'] >= recomendado['cantidad']):
            return tipoRecomendado(recomendados[1:], recomendados[0])
        else:
            return tipoRecomendado(recomendados[1:], recomendado)


def juegosListaRecomendados(juegos, juegosRecomendados, tipo):
    if juegos == []:
        return juegosRecomendados
    else:
        if juegos[0]['tipo_id'] == tipo:
            juegosRecomendados.append(juegos[0])
            return juegosListaRecomendados(juegos[1:], juegosRecomendados, tipo)
        else:
            return juegosListaRecomendados(juegos[1:], juegosRecomendados, tipo)
