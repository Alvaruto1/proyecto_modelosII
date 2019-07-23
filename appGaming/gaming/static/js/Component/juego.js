Vue.component('juego',{
  template:
  `
  <div class="col-sm-4">
    <div class="panel panel-primary" >
      <div class="panel-heading">{{ nombre }}</div>
      <div class="panel-body"><img :src="imagen" class="img-responsive" style="width:100%" alt="Image"></div>
      <div class="panel-footer">
        <p><b>Creador:</b> {{ descripcion }}</p>
        <p><b>Puntaje:</b> {{ puntaje }}</p>
        <a id="btnJugar" class="btn btn-success " :href="url" role="button" @click="conteoJugar(nombre)">Play</a>
         
      <button type="button" class="btn btn-primary" :value="nombre" data-toggle="modal" data-target=".bd-example-modal-sm" @click="botonActivoRanking(nombre)">Ranking</button>
      
      </div>
    </div>
  </div>
  `,
  props: ['nombre','imagen','descripcion','url','puntaje'],
  methods: {
           botonActivoRanking(nombre){
            window.app.botonActivoRanking(nombre);

        },
      conteoJugar(nombre){
            alert(nombre);
            $.ajax({
            type: 'POST',
            url: '../juegos/'+nombre,
            headers: { "X-CSRFToken": getCookie("csrftoken")},
            success: function (s) {
                alert("algo");

            },
            processData: false,
            contentType: false,
        });



        },

  },

  data(){
    return{

    }
  }
})
