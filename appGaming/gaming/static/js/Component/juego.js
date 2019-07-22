Vue.component('juego',{
  template:
  `
  <div class="col-sm-4">
    <div class="panel panel-primary" >
      <div class="panel-heading">{{ nombre }}</div>
      <div class="panel-body"><img :src="imagen" class="img-responsive" style="width:100%" alt="Image"></div>
      <div class="panel-footer"><a :href="url">{{ descripcion }}</a></div>
    </div>
  </div>
  `,
  props: ['nombre','imagen','descripcion','url'],
  data(){
    return{
    }
  }
})
