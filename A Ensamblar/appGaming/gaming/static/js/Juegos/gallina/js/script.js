
var jugando;

$(document).ready(inicio);
$(document).keydown(capturaTeclado);

function inicio(){
	jugando = true;
	miCanvas = $("#mi_canvas")[0];
	contexto = miCanvas.getContext("2d");
	buffer = document.createElement("canvas");
	quica = new Quica();
	calacas = [new Calaca(), new Calaca(),
				   new Calaca(), new Calaca(),
				   new Calaca()];
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
	if(event.which==38 || event.which==87)
		quica.actualizar('arriba');
	if(event.which==40 || event.which==83)
		quica.actualizar('abajo');
	if(event.which==39 || event.which==68)
		quica.actualizar('derecha');
	if(event.which==37 || event.which==65)
		quica.actualizar('izquierda');
	
}

function run(){ 
	buffer.width = miCanvas.width;
	buffer.height = miCanvas.height;
	contextoBuffer = buffer.getContext("2d");
		 
	if(jugando){  
		contextoBuffer.clearRect(0,0,buffer.width,buffer.height);

		quica.dibujar(contextoBuffer);
		for(i=0;i<calacas.length;i++){
			calacas[i].dibujar(contextoBuffer);
			calacas[i].actualizar();
			if(quica.colision(calacas[i].x,calacas[i].y)){
				quica.sprite = 4;
				quica.vida=0;
				$('#pierde')[0].play();
			}
		}
		
		if(quica.vida <= 0)
			jugando = false;

		
		contexto.clearRect(0,0,miCanvas.width,miCanvas.height);
		contexto.drawImage(buffer, 0, 0);
		setTimeout("run()",20);
		
	}else{
		contextoBuffer.clearRect(0,0,buffer.width,buffer.height);
		contextoBuffer.fillStyle = "#ffffff";
		quica.sprite = 3;
		quica.vida = 0;
		quica.dibujar(contextoBuffer);
		contextoBuffer.font = "50px sans-serif";
		contextoBuffer.fillText("GAMEOVER", 300, 440);
		contextoBuffer.fillStyle = "#ff0000";
		contextoBuffer.font = "15px sans-serif";
		contextoBuffer.fillText("try again", 550, 460);
		contexto.clearRect(0,0,miCanvas.width,miCanvas.height);
		contexto.drawImage(buffer, 0, 0);
		enviarScore(quica.puntos,'../juego/registra_score','gallina');

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

