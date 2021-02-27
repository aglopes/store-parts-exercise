export default {
    data() {
      return {
        location: '',
        parts: [],
        filteredParts: [],
        search:'',
        types:[],
        currentType:'Choose Type',
        dataLoading: false,
        ordering: "A"
      }
    },
    methods:{
      getAllParts(){
        this.dataLoading = true;
        fetch('http://localhost:8081/store/parts').then((results) => results.json()).then(data => {
          console.log('Success:', data);
          this.parts = data;
        //  this.orderPrice(0);
          this.searchChange();
          this.filteredParts = this.parts;
          this.dataLoading = false;
        }).catch((error) => {
          console.log('Error:', error);
          this.dataLoading = false;
        });
      },
      getPartsType(){
        fetch('http://localhost:8081/store/part-types').then((results) => results.json()).then(data => {
          console.log('Success:', data);
          this.types = data;
        }).catch((error) => {
          console.log('Error:', error);
        });
      },
      getPartsByType(type){
        this.dataLoading = true;
        let url = 'http://localhost:8081/store/parts?type='+type;
        fetch(url).then((results) => results.json()).then(data => {
          console.log('Success:', data);
          this.parts = data;
          //this.orderPrice(0);
          this.searchChange();
          this.dataLoading = false;
        }).catch((error) => {
          console.log('Error:', error);
          this.dataLoading = false;
        });
      },
      showPart(part){
        this.$router.push({ name: 'part', params: { part: part } })
      },
      searchChange(){
        this.filteredParts = this.parts.filter((part) =>
          part.name.toLowerCase().includes(this.search.toLowerCase()) ||
          part.type.toLowerCase().includes(this.search.toLowerCase()) ||
          part.price.toLowerCase().includes(this.search.toLowerCase())
        );
      },
      typeChange(){
        if (this.currentType != 'Choose Type'){
          this.getPartsByType(this.currentType);
        }else{
          this.getAllParts();
        }
      },
      orderPrice(mouse_event){
        let order = 1;
        if (this.ordering == "A"){
          order = 1;
          this.ordering = "D";
        }else{
          order = -1;
          this.ordering = "A";
        }
        this.parts = this.parts.sort((a,b)=>{
          let as = Number(a.price.replace("$",""));
          let bs = Number(b.price.replace("$",""));
          if ( as > bs )
            return order;
          if ( as < bs )
            return -order;
          return 0;
        });
        this.searchChange();
      }
    },
    mounted(){
      this.getPartsType();
      this.getAllParts();
    },
    template:`
    <div>
    <div class="tollbar" v-if="!dataLoading">
      <input type="text" v-model="search" name="search" placeholder="SEARCH" v-on:input="searchChange" :disabled="dataLoading"/>
      <select v-model="currentType" v-on:change="typeChange" v-if="types.length > 0" :disabled="dataLoading">
        <option>Choose Type</option>
        <option v-for="type in types">{{ type }}</option>
      </select>
    </div>
    <div class="loader" v-if="dataLoading">
      <img src="images/loading.gif" />
    </div>
    <div v-if="parts.length > 0 && !dataLoading">
      <table class="parts-table" v-if="filteredParts.length > 0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Price <button v-on:click="orderPrice(1)">{{"order: " + ordering }}</button></th>
          </tr>
        </thead>
        <tbody>
          <tr class="part-item" v-for="part in filteredParts" :key="part.name" v-on:click="showPart(part)">
            <td>{{ part.name }}</td>
            <td>{{ part.type }}</td>
            <td>{{ part.price }}</td>
          </tr>
        </tbody>
      </table>
      <div v-if="filteredParts.length == 0">
        <h4 style="color:red;">{{"Search: [" + search + "] did not return any data..."}}</h4>
      </div>
    </div>
    </div>`
  }
