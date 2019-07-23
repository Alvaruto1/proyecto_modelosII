function aleatorio(piso,techo){
	return Math.floor(Math.random() * (techo - piso + 1)) + piso;
}

function Calaca(Pos){
	this.img = $("#calaca_1")[0];	
	this.x = aleatorio(5,635);
	this.y = aleatorio(5,475);
			
	this.dibujar = function(ctx){
		var img = this.img;
		ctx.drawImage(img,this.x,this.y);
	}
}
