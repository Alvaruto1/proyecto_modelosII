Vue.component('ranking',{
  template:
  `
  <div class="">
  <tr>
    <th scope="row"></th>
      <td>{{ nombre }}</td>
      <td>{{ valor }}</td>
      <td>{{ fecha }}</td>
    </tr> 
  </div>
  `,
  props: ['nombre','valor','fecha','juego'],
  data(){
    return{
    }
  }
})
