#include <stdio.h>
#include <stdlib.h>
#include <string.h>


typedef struct{
	char * nombre;
	int calInicio, calFin, numeroPaseadores, craInicio,craFin;
	
}localidades;

localidades *trab;

void vaciar(char temp[]);
void copiar(char temp[], int i);

int main(){
	int i,j;
	char temp[50];
	int cont;
	char aux;
	
	FILE*f;
	f = fopen("datos.txt","r");
	
	if(f==NULL){
		printf("No se abrio el archivo");
	}
	
	while(!feof(f)){
		fgets(temp,50,f);
		
		cont++;
	}
	rewind(f);
	
	trab = (localidades*)malloc(cont*sizeof(localidades));
	
	if(trab == NULL){
		printf("no se realizo la accion");
	}
	
	
	for(i = 0; !feof(f); i++){
		vaciar(temp);
		aux= '0';
		fgets(temp,50,f);
		
		if(int j = 0 ;j!='\0'){
			
		}
		
		printf(temp);
	}
	
	return 0;
}
void vaciar(char temp[]){
 	int i = 0;
 	for(i = 0 ; i<50;i++){
 		temp[i]== '\0';
	 }
 }






