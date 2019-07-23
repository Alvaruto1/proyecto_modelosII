var canvas = document.getElementById("canvas");
var contexto = canvas.getContext("2d");
var boton =document.getElementById("inicio");
var vidas = 3;
var puntaje = 0;
var nivel = 1;

document.body.style.backgroundImage  = globals.backgroundA;
canvas.style.backgroundImage  = globals.backgroundC;

boton.addEventListener("click",iniciarJuego);

//Barra jugador

var barra = {
    
    posX : canvas.width/2,
    posY : canvas.height-10,
    ancho : 100,
    alto: 10,
    img: document.createElement("img"),
    derecha: false,
    izquierda: false,
    velocidad:7
    
};

document.addEventListener("keydown", function(){
    
    if(event.keyCode === 37){
        
        barra.izquierda=true;
        
    }
    
    if(event.keyCode === 39){
        
        barra.derecha=true;
        
    }
    
});

document.addEventListener("keyup", function(){
    
    if(event.keyCode === 37){
        
        barra.izquierda=false;
        
    }
    
    if(event.keyCode === 39){
        
        barra.derecha=false;
        
    }
    
});

function moverBarra(){
    
    if(barra.derecha && barra.posX < canvas.width - barra.ancho){
        
         barra.posX += barra.velocidad;
        
    }
    
    if(barra.izquierda && barra.posX >0 ){
        
         barra.posX -= barra.velocidad;
        
    }
    
}

function dibujarBarra(){
    
    contexto.drawImage(barra.img, barra.posX, barra.posY);
    
}

barra.img.src = globals.barra;

//Fin barra jugador


//Bolita

var bolita= {
    
    posX : canvas.width/2,
    posY : canvas.height/1.5,
    radio : 8,
    direccionX : 2, 
    direccionY : 3,
    color: "yellow"
};

function aleatorioDirY(direccionActual){
    
    var DireccionY=((Math.random()*4)*(Math.sign(direccionActual)))+(1*(Math.sign(direccionActual)));
    return DireccionY;
}

function dibujarBolita(){
    
    contexto.fillStyle = bolita.color;
    contexto.beginPath();
    contexto.arc(bolita.posX, bolita.posY, bolita.radio, 0, Math.PI*2);
    contexto.fill();
    
}

function moverBolita(){
    
    bolita.posX += bolita.direccionX;
    bolita.posY += bolita.direccionY;
    
}

//Fin bolita

//Ladrillos

var ladrillos = [];
var infoLadrillos = {
    
    columnas: 5,
    filas: 5,
    ancho: 50,
    alto: 10,
    margen: 3,
    top: 20,
    left: 20,
    img: document.createElement("img")
    
};

infoLadrillos.img.src = globals.ladrillo;

function generarLadrillos(){
    
    for(i=0; i<infoLadrillos.columnas; i++){
        
        ladrillos[i]=[];
        
        for(j=0; j<infoLadrillos.filas;j++){
            
            var ladrilloX = infoLadrillos.left + (i*(infoLadrillos.ancho + infoLadrillos.margen));
            var ladrilloY = infoLadrillos.top + (j*(infoLadrillos.alto + infoLadrillos.margen));
            ladrillos[i][j]={posX: ladrilloX, posY: ladrilloY, status:1};
            
        }
        
    }
    
}
    
generarLadrillos();
    
function dibujarLadrillos(){
    
    for(i=0; i<infoLadrillos.columnas; i++){
        
        for(j=0; j<infoLadrillos.filas;j++){
            
            if(ladrillos[i][j].status === 1){
                
               contexto.drawImage(infoLadrillos.img, ladrillos[i][j].posX , ladrillos[i][j].posY);
                
            }
            
        }
        
    }
    
}
  
function choqueLadrillos(){
    
    for(i=0; i<infoLadrillos.columnas; i++){
        
        for(j=0; j<infoLadrillos.filas;j++){
            
            var temLadrillo=ladrillos[i][j];
            
            if(temLadrillo.status === 1){
                
                if(bolita.posX > temLadrillo.posX && bolita.posX < (temLadrillo.posX + infoLadrillos.ancho) && bolita.posY > temLadrillo.posY && bolita.posY < (temLadrillo.posY + infoLadrillos.alto)){
                    
                    temLadrillo.status=0;
                    bolita.direccionY = -aleatorioDirY(bolita.direccionY);
                    puntaje++;
                    
                    if(puntaje === nivel*(infoLadrillos.columnas * infoLadrillos.filas)){
                        
                        levelUp();
                        
                    }

                }
                
            }
            
        }
        
    }
    
}

//Fin ladrillos

function dibujarInformacion(){
    
    contexto.fillStyle = "red";
    contexto.fillText("vidas restantes: "+ vidas, 5, 10);
    contexto.fillText("Nivel: "+ nivel, canvas.width-50, 10);
    contexto.fillText("Puntaje: "+ puntaje, canvas.width/3, 10);
    contexto.fillText("Velocidad: "+ barra.velocidad, canvas.width * 6/10, 10);
    
}

function dibujarTablero(){
    
    contexto.clearRect(0,0,canvas.width,canvas.height);
    dibujarBolita();
    dibujarBarra();
    dibujarInformacion();
    dibujarLadrillos();
    
}

function actualizar(){
    
    moverBarra();
    moverBolita();
    choqueLadrillos();
}

function choques(){
    
    if(bolita.posX <= bolita.radio || bolita.posX >= canvas.width - bolita.radio){
        
        bolita.direccionX = -bolita.direccionX; 
        
    }
    
    if(bolita.posY <=0){
        
        bolita.direccionY = -bolita.direccionY; 

    }
    
    if(bolita.posY >= canvas.height - bolita.radio){
        
        bolita.direccionY = -bolita.direccionY;
        
        if(!(bolita.posX > barra.posX && bolita.posX < barra.posX + barra.ancho)){
            
            perderVida();
            
        }
        
    }
    
}

function fotogramas(){
    
    actualizar();
    choques();
    dibujarTablero();
    requestAnimationFrame(fotogramas);
    
}

function resetear(){
    
    bolita.posX = canvas.width/2;
    bolita.posY = canvas.height/1.5;
    bolita.direccionY = 3;
    bolita.direccionX = 2;
    barra.posX = canvas.width/2;
    barra.posY = canvas.height-10;
    barra.izquierda = false;
    barra.derecha = false;
    
}

function levelUp(){
    
    alert("Has subido de nivel :D");
    generarLadrillos();
    resetear();
    nivel++;
    barra.velocidad--;
    
}

function iniciarJuego(){

    alert();
    var modelo = document.getElementById("modelo");
    modelo.style.display = "none";
    fotogramas();
    
}

function perderVida(){
    
    if(vidas >0){
        
        alert("Haz perdido una vida");
        resetear();
        vidas--;
        
    } else {
        enviarScore(puntaje,'../juego/registra_score','arknoid');
        alert("Game over, puntuación final es: " + puntaje);

        setTimeout(function(){ finalizarJuego(); }, 3000);

        
    }
    
}

function finalizarJuego(){
    
    //document.location.reload();
    
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