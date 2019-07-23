window.app=new Vue({
    el: '#app',
    data: {
        j:0,
        p: 0,
        a1: 'active',
        a2: '',
        a3: '',
        a4: '',
        b1: '',
        b2: 'active',
        ranked: [],
        panel: 0,
        busqueda: '',
        rankingActivo:'',

        juegosTienda: [
            {
                nombre: 'Juego1',
                imagen: 'https://cdn3.ipadizate.es/2016/04/wallpaper-naturaleza-9-320x568.jpg',
                descripcion: 'Hola a todos',
                url: 'Hola a todos',
                puntaje : 5
            },
            {
                nombre: 'Juego2',
                imagen: 'https://cdn3.ipadizate.es/2016/04/wallpaper-naturaleza-9-320x568.jpg',
                descripcion: 'Hola a todos',
                url: 'Hola a todos',
                puntaje : 10
            },
            {
                nombre: 'Juego3',
                imagen: 'https://cdn3.ipadizate.es/2016/04/wallpaper-naturaleza-9-320x568.jpg',
                descripcion: 'Hola a todos',
                url: 'Hola a todos',
                puntaje : 0
            },
            {
                nombre: 'Juego4',
                imagen: 'https://cdn3.ipadizate.es/2016/04/wallpaper-naturaleza-9-320x568.jpg',
                descripcion: 'Hola a todos',
                url: 'Hola a todos',
                puntaje : 0
            },
            {
                nombre: 'Juego5',
                imagen: 'https://cdn3.ipadizate.es/2016/04/wallpaper-naturaleza-9-320x568.jpg',
                descripcion: 'Hola a todos',
                url: 'Hola a todos',
                puntaje : 0
            }
        ],
        libreria: [
            {
                nombre: 'Juego1',
                imagen: 'https://cdn3.ipadizate.es/2016/04/wallpaper-naturaleza-9-320x568.jpg',
                descripcion: 'Hola a todos',
                url: 'Hola a todos'
            },
            {
                nombre: 'Juego2',
                imagen: 'https://cdn3.ipadizate.es/2016/04/wallpaper-naturaleza-9-320x568.jpg',
                descripcion: 'Hola a todos',
                url: 'Hola a todos'
            }
        ],
        trending: [
            {
                nombre: 'Juego2',
                imagen: 'https://cdn3.ipadizate.es/2016/04/wallpaper-naturaleza-9-320x568.jpg',
                descripcion: 'Hola a todos',
                url: 'Hola a todos'
            }
        ],
        recomendados: [
            {
                nombre: 'Juego3',
                imagen: 'https://cdn3.ipadizate.es/2016/04/wallpaper-naturaleza-9-320x568.jpg',
                descripcion: 'Hola a todos',
                url: 'Hola a todos',
                puntaje : 5
            },
            {
                nombre: 'Juego4',
                imagen: 'https://cdn3.ipadizate.es/2016/04/wallpaper-naturaleza-9-320x568.jpg',
                descripcion: 'Hola a todos',
                url: 'Hola a todos',
                puntaje : 5
            },
            {
                nombre: 'Juego5',
                imagen: 'https://cdn3.ipadizate.es/2016/04/wallpaper-naturaleza-9-320x568.jpg',
                descripcion: 'Hola a todos',
                url: 'Hola a todos',
                puntaje : 5
            }
        ],
    },

    mounted: function(){

        this.puntajes();


    },
    methods: {
        cambiarPestaña(pagina) {

            this.a1 = '';
            this.a2 = '';
            this.a3 = '';
            this.a4 = '';
            switch (pagina) {
                case 0:
                    this.p = 0;
                    this.a1 = 'active';

                    break;
                case 1:
                    this.p = 1;
                    this.a2 = 'active';

                    break;
                case 2:
                    this.p = 2;
                    this.a3 = 'active';
                    break;
                case 3:
                    this.recomendar();
                    this.p = 3;
                    this.a4 = 'active';
                    break;

            }
        },
        cambiarPanel(pagina) {
            this.b1 = '';
            this.b2 = '';

            switch (pagina) {
                case 0:
                    this.b1='active';
                    this.b2='';
                    this.panel = 0;
                    break;
                case 1:
                    this.panel = 1;
                    break;
                case 2:
                    this.panel = 2;
                    break;
                case 3:
                    this.panel = 3;

                    this.puntajes();

                    break;
            }
        },
        buscar(juego) {
            this.busqueda = juego;
            this.p = 4;
            this.a1 = '';
            this.a2 = '';
            this.a3 = '';
            this.a4 = '';
        },
        recomendar(){

            $.ajax({
                type: 'POST',
                url: '../listar_recomendados',
                headers: { "X-CSRFToken": getCookie("csrftoken")},
                success: function (s) {

                    app.recomendados = [];
                    pru = s;
                    if(s.estado==0){

                        for(var i=0;i<s.recomendados.length;i++){

                            var elem = {nombre: s.recomendados[i][0].nombre,imagen:s.recomendados[i][0].nombre,descripcion:s.recomendados[i][0].creador,url:"../juegos/"+s.recomendados[i][0].nombre,puntaje:s.puntaje[i]}

                            app.recomendados.push(elem);
                        }
                    }
                    else{
                        for(var i=0;i<s.recomendados.length;i++){
                            //pru = s.recomendados;
                            var elem = {nombre: s.recomendados[i].nombre,imagen:s.recomendados[i].nombre,descripcion:s.recomendados[i].creador,url:"../juegos/"+s.recomendados[i].nombre,puntaje:s.puntaje[i]}

                            app.recomendados.push(elem);
                        }
                    }

                },
                processData: false,
                contentType: false,
            });
        },
        puntajes(){
            $.ajax({
            type: 'POST',
            url: '../listar_tienda',
            headers: { "X-CSRFToken": getCookie("csrftoken")},
            success: function (s) {
                app.juegosTienda = [];
                app.ranked = [];
                app.nombresJuegos = [];
                for(var i=0;i<s.tienda.length;i++){
                    var elem = {nombre: s.tienda[i].nombre,imagen:s.tienda[i].nombre,descripcion:s.tienda[i].creador,url:"../juegos/"+s.tienda[i].nombre, puntaje: s.puntaje[i]}
                    app.juegosTienda.push(elem);

                    app.nombresJuegos.push(s.tienda[i].nombre);
                    if(s.ranking.length != 0){
                       var elem1 = {nombre: s.ranking[i][0], valor:s.ranking[i][1], nombreJuego:s.ranking[i][2]}
                        app.ranked.push(elem1);
                    }




                }

            },
            processData: false,
            contentType: false,
        });

        },



        botonActivoRanking(nombre){


            this.rankingActivo = nombre;
        },

    }
})
var pru;

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
