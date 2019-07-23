function Quica(Posx, Posy){
	this.x = Posx;
	this.y = Posy;
	this.img = [$("#abajo")[0],$("#arriba")[0],$("#salto")[0],$("#sentado")[0]];
	this.sprite = 0;
	this.vida = 1;
	this.puntos = 0;
	this.accion = "nada"
	this.seguro = "arriba";
	this.velocidad = 5;
	
	this.dibujar = function(ctx){
		var img = this.img[this.sprite];
		var x = this.x;
		var y = this.y;
		ctx.drawImage(img, x, y);
	}
	
	this.actualizar = function(){
		if(this.accion=="arriba"){
			this.y -= this.velocidad;
		}
		if(this.accion=="abajo"){
			this.y += this.velocidad;
		}
		if(this.accion=="izquierda"){
			this.x -= this.velocidad;
		}
		if(this.accion=="derecha"){
			this.x += this.velocidad;
		}
	}
	
	this.colision = function(x,y){
		var distancia=Math.sqrt( Math.pow( (x-this.x), 2)+Math.pow( (y-this.y),2));
		if(distancia>this.img[this.sprite].width)
		   return false;
		else
		   return true;	
	}
}
