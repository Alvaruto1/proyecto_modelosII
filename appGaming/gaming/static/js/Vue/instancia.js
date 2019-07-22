app=new Vue({
    el: '#app',
    data: {
        j:0,
        p: 0,
        a1: 'active',
        a2: '',
        a3: '',
        a4: '',
        panel: 0,
        busqueda: '',
        juegosTienda: [
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
            },
            {
                nombre: 'Juego3',
                imagen: 'https://cdn3.ipadizate.es/2016/04/wallpaper-naturaleza-9-320x568.jpg',
                descripcion: 'Hola a todos',
                url: 'Hola a todos'
            },
            {
                nombre: 'Juego4',
                imagen: 'https://cdn3.ipadizate.es/2016/04/wallpaper-naturaleza-9-320x568.jpg',
                descripcion: 'Hola a todos',
                url: 'Hola a todos'
            },
            {
                nombre: 'Juego5',
                imagen: 'https://cdn3.ipadizate.es/2016/04/wallpaper-naturaleza-9-320x568.jpg',
                descripcion: 'Hola a todos',
                url: 'Hola a todos'
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
                url: 'Hola a todos'
            },
            {
                nombre: 'Juego4',
                imagen: 'https://cdn3.ipadizate.es/2016/04/wallpaper-naturaleza-9-320x568.jpg',
                descripcion: 'Hola a todos',
                url: 'Hola a todos'
            },
            {
                nombre: 'Juego5',
                imagen: 'https://cdn3.ipadizate.es/2016/04/wallpaper-naturaleza-9-320x568.jpg',
                descripcion: 'Hola a todos',
                url: 'Hola a todos'
            }
        ],
    },

    mounted: function(){

        $.ajax({
            type: 'POST',
            url: '../listar_tienda',
            headers: { "X-CSRFToken": getCookie("csrftoken")},
            success: function (s) {
                app.juegosTienda = [];
                for(var i=0;i<s.tienda.length;i++){
                    var elem = {nombre: s.tienda[i].nombre,imagen:s.tienda[i].nombre,descripcion:s.tienda[i].creador,url:'./juegos/'+s.tienda[i].nombre}
                    app.juegosTienda.push(elem);
                }
            },
            processData: false,
            contentType: false,
        });


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
            switch (pagina) {
                case 0:
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
                url: 'listar_recomendados',
                headers: { "X-CSRFToken": getCookie("csrftoken")},
                success: function (s) {

                    app.recomendados = [];
                    if(s.estado==0){
                        for(var i=0;i<s.recomendados.length;i++){
                            pru = s.recomendados;
                            var elem = {nombre: s.recomendados[i][0].nombre,imagen:s.recomendados[i][0].nombre,descripcion:s.recomendados[i][0].creador,url:'./juegos/'+s.recomendados[i][0].nombre}

                            app.recomendados.push(elem);
                        }
                    }
                    else{
                        for(var i=0;i<s.recomendados.length;i++){
                            pru = s.recomendados;
                            var elem = {nombre: s.recomendados[i].nombre,imagen:s.recomendados[i].nombre,descripcion:s.recomendados[i].creador,url:'./juegos/'+s.recomendados[i].nombre}

                            app.recomendados.push(elem);
                        }
                    }

                },
                processData: false,
                contentType: false,
            });
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