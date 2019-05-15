<template>
    <div>           
      
        <div class="row">
            <div class="col-md-8 col-centered">
                <form>
              <div class="form-group">
              <label for="inputTitle">Report Title</label>
              <input type="text" class="form-control" id="inputTitle" v-model="title">
              </div>
              <div class="form-group">
              <label for="inputPlace">Place Visited</label>
              <input type="text" class="form-control" id="inputPlace" v-model="place">
              </div>
              <div class="form-group">
              <label for="inputAddress">Address</label>
              <input type="text" class="form-control" id="inputAddress" v-model="address">
              </div>
              
              <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputCity">City</label>
                <input type="text" class="form-control" id="inputCity" v-model="city">
              </div>
              <div class="form-group col-md-4">
                <label for="inputState">State</label>
                <select id="inputState" class="form-control" v-model="state">
                <option  v-for="inputState in inputStates" :key="inputState">{{inputState}}</option> 
                </select>
              </div>
              <div class="form-group col-md-2">
                <label for="inputZip">Zip</label>
                <input type="number" class="form-control" id="inputZip" v-model.Number="zip">
              </div>
              </div>
              
            <legend>Contact Person:</legend>
            <div class="form-row"> 
            <div class="form-group col-md-6">
              <label for="inputName">Name</label>
              <input type="text" class="form-control" id="inputName" v-model="name">
            </div>
            <div class="form-group col-md-6">
              <label for="inputPosition">Position</label>
              <input type="text" class="form-control" id="inputPosition" v-model="position">
            </div>
            
            </div>
            
            <div class="form-row"> 
            <div class="form-group col-md-6">
              <label for="inputEmail">Email</label>
              <input type="email" class="form-control" id="inputEmail" v-model="email">
            </div>
            <div class="form-group col-md-6">
              <label for="inputPhone">Phone</label>
              <input type="text" class="form-control" id="inputPhone" v-model="phone">
            </div>
            
            </div>
            
            <div class="form-group">
            <label for="inputDescription">Brief</label>
            <textarea class="form-control" id="inputDescription" rows="3" v-model="description"></textarea>
            </div>
            
            <button type="submit" @click.prevent="submitReport" class="btn btn-primary">Submit report</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return {
            pageName: 'Edit',
            inputStates: ['Lagos', 'Abuja','PortHarcourt'],
            email: '',
            title: '',
            place: '',
            position: '',
            name: '',
            address: '',
            zip: 0,
            state: '',
            city: '',
            description: '',
            phone: 0       
      }
    },

  methods: {
     
      getAllReports(){ 
      axios.get('/get_report/'+this.$route.params.id) 
        .then(resp => {
            
            const data = resp.data;
            console.log('response',data[0]); 
             
            this.email = data[0].email 
            this.title = data[0].title
            this.place = data[0].place
            this.position = data[0].position
            this.name= data[0].contact_name
            this.address = data[0].address
            this.zip = data[0].zip
            this.state = data[0].state
            this.city = data[0].city 
            this.description = data[0].description
            this.phone = data[0].phone
             
            //console.log('getReport',getReport);
            }) 
        .catch(err => console.error(err));
	 
      },
    submitReport(){  
      const formData = {
        email: this.email,
        title: this.title,
        place: this.place,
        position: this.position,
        contact_name: this.name,
        address: this.address,
        zip: this.zip,
        state: this.state,
        city: this.city,
        description: this.description,
        phone: this.phone,
        reporter_id: 1

      };
      console.log('form Data:', formData)
      let RouteID = this.$route.params.id;
      axios.put(`/report_edit/${RouteID}`, formData)
      .then(resp => {
        //snackback alert
        alert('report edited');
        //change routes
        
        console.log('my response', resp)})
      .catch(err=> console.error(err));
        
    },
    addReview(submissionId) {
      }
  
  },
  created(){
    
    this.getAllReports(); 
  }
}
</script>
<style scoped>
.yellowText {
    color: yellow;
}
</style>