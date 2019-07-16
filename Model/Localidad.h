/**
 * Project Untitled
 */


#ifndef _LOCALIDAD_H
#define _LOCALIDAD_H

class Localidad {
public: 
    
/**
 * Memoria Principal 1
 */
Lista<Sucursal> getSucursales();
    
/**
 * Memoria Principal 3
 */
Lista <Paseador> getPaseadores();
    
/**
 * Memoria Principal 5
 */
Lista <Cliente> getClientes();
    
/**
 * Memoria Principal 8
 */
Lista<Perros> getPerros();
private: 
    String nombre;
    int calleInicio;
    int calleFin;
    int numeroPaseadores;
    int craInicio;
    int craFin;
    RBTree <Sucursal> sucursales;
};

#endif //_LOCALIDAD_H