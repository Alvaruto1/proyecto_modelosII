var jugando;
var man=0;
var aux = 1;

$(document).ready(inicio);
$(document).keydown(capturaTeclado);

function aleatorio(piso,techo){
	return Math.floor(Math.random() * (techo - piso + 1)) + piso;
}

function inicio(){
	jugando = true;
	miCanvas = $("#mi_canvas")[0];
	contexto = miCanvas.getContext("2d");
	buffer = document.createElement("canvas");
	quica = [new Quica(310, 310)];
	calacas = new Calaca(65);
	run();	



	$('#instrucciones').click(function(){
        $('#popup').fadeIn('slow');
        $('.popup-overlay').fadeIn('slow');
        $('.popup-overlay').height($(window).height());
        return false;
    });
    
    $('#close').click(function(){
        $('#popup').fadeOut('slow');
        $('.popup-overlay').fadeOut('slow');
        return false;
    });
    
    $("#iniciar").click(function(){	
		if(jugando==false)
			inicio();	
	});
}

function capturaTeclado(event){
	if(event.which==38 || event.which==87){
		if(quica[0].accion == "abajo"){
			quica[0].accion = quica[0].accion;
		}
		else{
			quica[0].accion = "arriba";
		}
	}
	if(event.which==40 || event.which==83){
		if(quica[0].accion == "arriba"){
			quica[0].accion = quica[0].accion;
		}
		else{
			quica[0].accion = "abajo";
		}
	}
	if(event.which==39 || event.which==68){
		if(quica[0].accion == "izquierda"){
			quica[0].accion = quica[0].accion;
		}
		else{
			quica[0].accion = "derecha";
		}
	}
	if(event.which==37 || event.which==65){
		if(quica[0].accion == "derecha"){
			quica[0].accion = quica[0].accion;
		}
		else{
			quica[0].accion = "izquierda";
		}
	}	
}

function run(){ 
	buffer.width = miCanvas.width;
	buffer.height = miCanvas.height;
	contextoBuffer = buffer.getContext("2d");
		 
	if(jugando){ 
		$('#pierde')[0].play();
		contextoBuffer.clearRect(0,0,buffer.width,buffer.height);
		calacas.dibujar(contextoBuffer);
		contextoBuffer.fillStyle = "#000000";
		contextoBuffer.font = "15px sans-serif";
		contextoBuffer.fillText("Puntos: "+ quica[0].puntos, 520, 440);
		man++;
		for(i=0;i<quica.length;i++){
			quica[i].dibujar(contextoBuffer);
			quica[i].actualizar();
			if(quica[0].colision(calacas.x,calacas.y)){
				calacas.x = aleatorio(10,620); 
				calacas.y = aleatorio(10,450);
				man = 0
				quica[0].puntos++;
				posX = quica[quica.length - 1].x;
				posY = quica[quica.length - 1].y;
				if(quica[quica.length - 1].accion == "arriba"){
					posY = quica[quica.length - 1].y + 10;
				}
				if(quica[quica.length - 1].accion == "abajo"){
					posY = quica[quica.length - 1].y - 10;
				}
				if(quica[quica.length - 1].accion == "derecha"){
					posX = quica[quica.length - 1].x - 10;
				}
				if(quica[quica.length - 1].accion == "izquierda"){
					posX = quica[quica.length - 1].x + 10;
				}
				quica.push(new Quica(posX, posY));
				quica[quica.length - 1].accion = quica[quica.length - 2].accion;
				
			}
			if(man == 200){
				calacas.x = aleatorio(10,620); 
				calacas.y = aleatorio(10,450);
				man = 0;
			}
			if(i > 0){
				if(quica[i].accion != quica[i - 1].accion ){
					if((quica[i - 1].accion == "arriba" || quica[i - 1].accion == "abajo") && quica[i].x == quica[i - 1].x){
						quica[i].accion = quica[i - 1].accion;
					}
					if((quica[i - 1].accion == "izquierda" || quica[i - 1].accion == "derecha") && quica[i].y == quica[i - 1].y){
						quica[i].accion = quica[i - 1].accion;
					}
				}
				if(i > 1){
					if(quica[0].colision(quica[i].x, quica[i].y)){
						jugando = false;
					}
				}
			}
			else{
				quica[i].accion = quica[i].accion
			}		
		}
		if(quica[0].x <= -10 || quica[0].x >=630 || quica[0].y<= 0 || quica[0].y>=470){
			quica[0].vida--;
		}
		if(quica[0].vida <= 0){
			jugando = false;

		}
		contexto.clearRect(0,0,miCanvas.width,miCanvas.height);
		contexto.drawImage(buffer, 0, 0);
		setTimeout("run()",20);
		
	}
	else{
		contextoBuffer.clearRect(0,0,buffer.width,buffer.height);
		contextoBuffer.fillStyle = "#000000";
		contextoBuffer.font = "50px sans-serif";
		contextoBuffer.fillText("GAME OVER", 180, 200);
		contextoBuffer.fillStyle = "#000000";
		contexto.clearRect(0,0,miCanvas.width,miCanvas.height);
		contexto.drawImage(buffer, 0, 0);
		enviarScore(quica[0].puntos,'../juego/registra_score','snake');


	}
	
}

// envio score, para guardar a usuario
function enviarScore(score1, url, name1){
    console.log(name)
        $.ajax({
            type: 'POST',
            url: url,
            headers: { "X-CSRFToken": getCookie("csrftoken")},
            //data: {"data" : JSON.stringify(arr)},
            data: {"name":name1,"score":score1},
            success: function (s) {
            },

        });
}

function getCookie(c_name)
{
    if (document.cookie.length > 0)
    {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1)
        {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start,c_end));
        }
    }
    return "";
 }


