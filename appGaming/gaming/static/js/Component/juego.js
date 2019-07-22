Vue.component('juego',{
  template:
  `
  <div class="col-sm-4">
    <div class="panel panel-primary" >
      <div class="panel-heading"><a :href="url">{{ nombre }}</a></div>
      <div class="panel-body"><img :src="imagen" class="img-responsive" style="width:100%" alt="Image"></div>
      <div class="panel-footer">Creador: {{ descripcion }}</div>
      <div class="panel-footer">Puntaje: {{ puntaje }}</div>
    </div>
  </div>
  `,
  props: ['nombre','imagen','descripcion','url','puntaje'],
  data(){
    return{
    }
  }
})
