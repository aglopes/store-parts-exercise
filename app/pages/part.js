export default{
  template: `
  <div>
    <div class="part-container" v-if="this.$route.params.part">
      <h2>Name: {{ this.$route.params.part.name }}</h2>
      <h3>Type: {{ this.$route.params.part.type }}</h3>
      <h4>Price: {{ this.$route.params.part.price }}</h4>
      <h2><a href="/">Back to store</a></h2>
    </div>
    <div class="part-container" v-else>
      <h2>Route doesnt have any parms <a href="/">Back to store</a></h2>
    </div>
  </div>
  `,

}
