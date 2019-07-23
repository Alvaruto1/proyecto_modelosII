import random
class Recomendado:

    def __init__(self,cantidad,nombre):
        self.cantidad = cantidad
        self.nombre = nombre

    cantidad = 0
    nombre = ''

class Juego:

    def __init__(self,tipo,nombre):
        self.tipo = tipo
        self.nombre = nombre

    tipo = 0
    nombre = ''



def tipoRecomendado(recomendados, recomendado):
    if recomendados == []:
        return recomendado
    else:
        if(recomendados[0].cantidad >= recomendado.cantidad):
            return tipoRecomendado(recomendados[1:], recomendados[0])
        else:
            return tipoRecomendado(recomendados[1:], recomendado)

def juegosListaRecomendados(juegos, juegosRecomendados, tipo):
    if juegos == []:
        return juegosRecomendados
    else:
        if juegos[0].tipo == tipo:
            juegosRecomendados.append(juegos[0])
            return juegosListaRecomendados(juegos[1:], juegosRecomendados, tipo)
        else:
            return juegosListaRecomendados(juegos[1:], juegosRecomendados, tipo)


r1 = Recomendado(11,'primero')
r2 = Recomendado(25,'segundo')
r3 = Recomendado(10,'tercero')
r4 = Recomendado(2,'cuarto')
r5 = Recomendado(9,'quinto')

p1 = Juego(3,'primero')
p2 = Juego(25,'segundo')
p3 = Juego(3,'tercero')
p4 = Juego(2,'cuarto')
p5 = Juego(3,'quinto')



lista = [r1,r2,r3,r4,r5]
for j in lista:
    print(j.nombre)
random.shuffle(lista)
print("-----------")
for j in lista:
    print(j.nombre)
listaJ = [p1,p2,p3,p4,p5]
"""print(tipoRecomendado(lista,lista[0]).nombre)
print("funciona")
for j in juegosListaRecomendados(listaJ,[],3):
    print(j.nombre)"""