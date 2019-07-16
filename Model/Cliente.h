/**
 * Project Untitled
 */


#ifndef _CLIENTE_H
#define _CLIENTE_H

#include "Persona.h"


class Cliente: public Persona {
private: 
    String localidad;
    Lista <Perro> perros;
};

#endif //_CLIENTE_H