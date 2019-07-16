/**
 * Project Untitled
 */


#ifndef _PERSONA_H
#define _PERSONA_H

#include "Cliente.h"


class Persona: public Cliente {
private: 
    String id;
    String nombre;
    String apellido;
    String tipoId;
    String telefono;
    String celular;
    char sexo;
    String email;
};

#endif //_PERSONA_H