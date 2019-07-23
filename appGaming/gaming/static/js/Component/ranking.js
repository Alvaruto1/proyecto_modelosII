Vue.component('ranking',{
  template:
  `
  
    <div class="border">
   
      <span class="col-sm-6">{{ nombre }} </span><span class="col-sm-6">{{ valor }} </span>
     
    </div>

  `,
  props: ['nombre','valor','nombre_juego'],
  data(){
    return{

    }
  }
})
