function Quica(){
	this.x = 310;
	this.y = 15;
	this.img = $("#imagen")[0];
	this.sprite = 0;
	this.vida = 100;
	this.puntos = 0;
	this.seguro = "arriba";
	
	this.dibujar = function(ctx){
		//var img = this.img[this.sprite];
		var x = this.x;
		var y = this.y;
		ctx.drawImage(this.img, 48,48*(this.sprite),48,48,x,y,48,48);
		ctx.save();
		ctx.fillStyle = "#ffffff";
		ctx.font = "12px sans-serif";
		ctx.fillText("puntos: "+ this.puntos, x, y + 65);
		ctx.fillText("vida: "+ this.vida, x, y);
		ctx.fillText("ultimo seguro: "+ this.seguro, x, y+75);
		
		ctx.restore();
	}
	
	this.actualizar = function(accion){
		if(accion=="arriba" && this.y > 15){
			this.y -= 10;
			this.sprite = 3;
		}
		if(accion=="abajo"  && this.y < 390){
			this.y += 10;
			this.sprite = 0;
		}
		if(accion=="izquierda"){
			this.x -= 10;
			this.sprite = 1;
		}
		if(accion=="derecha"){
			this.x += 10;
			this.sprite = 2;
		}
		this.x = (640 + this.x)%640;
		this.y = (480 + this.y)%480;
		
		if(this.y > 340 && this.seguro == "arriba"){
			this.seguro = "abajo";
			this.puntos++;
		}
		if(this.y < 20 && this.seguro == "abajo"){
			this.seguro = "arriba";
			this.puntos++;
		}
	}
	
	this.colision = function(x,y){
		var distancia=Math.sqrt( Math.pow( (x-this.x), 2)+Math.pow( (y-this.y),2));
		if(distancia>48)
		   return false;
		else
		   return true;	
	}
}
