from django.contrib.auth import authenticate, login
from django.views.generic import CreateView, TemplateView
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.template import loader
from django.contrib.auth.views import LoginView, LogoutView
from .models import Jugador
from .models import Perfil
from .forms import SignUpForm


class SignUpView(CreateView):
    model = Perfil
    form_class = SignUpForm

    def form_valid(self, form):
        '''
        En este parte, si el formulario es valido guardamos lo que se obtiene de él y usamos authenticate para que el
        usuario incie sesión luego de haberse registrado y lo redirigimos al index
        '''
        form.save()
        usuario = form.cleaned_data.get('username')
        password = form.cleaned_data.get('password1')
        usuario = authenticate(username=usuario, password=password)
        login(self.request, usuario)
        return redirect('../gaming/')


class BienvenidaView(TemplateView):
   template_name = 'gaming/bienvenida.html'


class SignInView(LoginView):
    template_name = 'gaming/login.html'


class SignOutView(LogoutView):
    pass


#Proyecto
def index(request):
    return render(request, 'gaming/index.html')


def juego(request):
    template = loader.get_template('gaming/juego.html')
    return HttpResponse(template.render())


def recomendado(request):
    template = loader.get_template('gaming/recomendado.html')
    return HttpResponse(template.render())


def contacto(request):
    template = loader.get_template('gaming/contacto.html')
    return HttpResponse(template.render())


def quienessomos(request):
    template = loader.get_template('gaming/quienessomos.html')
    return HttpResponse(template.render())


def tienda(request):
    template = loader.get_template('gaming/tienda.html')
    return HttpResponse(template.render())


