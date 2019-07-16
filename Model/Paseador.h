/**
 * Project Untitled
 */


#ifndef _PASEADOR_H
#define _PASEADOR_H

#include "Persona.h"


class Paseador: public Persona {
private: 
    String ciudadNacimiento;
    String paisNacimiento;
    tm fechaNacimiento;
    String direccion;
    String barrio;
    RBTree<Dia> dias;
};

#endif //_PASEADOR_H