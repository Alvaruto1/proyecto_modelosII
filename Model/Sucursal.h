/**
 * Project Untitled
 */


#ifndef _SUCURSAL_H
#define _SUCURSAL_H

class Sucursal {
public: 
    
/**
 * Memoria Principal 2
 */
Lista <Paseadores> getPaseadores();
    
/**
 * Memoria Principal 4
 */
Lista <Clientes> getClientes();
    
/**
 * Memoria Principal 6
 * @param n
 */
Lista <Clientes> clienteMasPerros(int n);
    
/**
 * Memoria Principal 7
 */
Lista <Perros> getPerrosSucursales();
    
/**
 * Memoria Principal 9
 * @param n
 */
void getPerrosCumple(int  n);
private: 
    String idSucursal;
    String nombre;
    String gerente;
    RBTree<Paseador> paseadores;
    RBTree<Cliente> clientes;
};

#endif //_SUCURSAL_H