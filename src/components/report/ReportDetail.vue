<template>
    <div>
           
            <div class="row justify-content-md-center">
                   
                    <p>User loaded has ID: {{  }}</p>
             
            <ul >
                <li v-for=" detail in getIndex($route.params.id )" :key="detail.id"> {{detail}}</li>
            </ul>

        <router-link
                tag="button"
                :to="{ name: 'reportEdit', params: { id: $route.params.id }, query: { locale: 'en', q: 100 } }"
                class="btn btn-primary">Edit Report</router-link>
         <!-- Button trigger modal -->
            <button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#exampleModal">
            Add Review
            </button>

        <button class="btn btn-danger" @click="remove">Delete Report</button>

            </div>
            
            

       

        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form>
                <div class="form-group">
                <label for="inputReview"></label>
                <textarea class="form-control" id="inputReview" rows="3" v-model="inputReview"></textarea>
                </div>

                <div class="form-group">
                <label for="inputRating">Rating</label>
                <select id="inputRating" class="form-control" v-model.number="selectedRating">
                <option  v-for="inputRating in inputRatings" :key="inputRating">{{inputRating}}</option> 
                </select>
              </div>
              </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" @click.prevent="submittedRating" class="btn btn-primary">Save changes</button>
            </div>
            
            </div>
        </div>
        </div>      
    </div>
 
</template>

<script>
 
export default { 
    props:  [],
    data(){
        return {
        pageName: 'Details',
        inputRatings: [1,2,3,4,5],
         submissions : [
            {
            id: 1,
            date:'May 25, 2011',
            reporter: 'Adekunle Ajayi',
            title: 'A report on The bridge School Visited',
            place: 'The bridge School',
            description: ' is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using "Content here, content here", making it look like readable English.',
            address: '41 a, Sobo Arobiodu street',
            city: 'agege',
            state: 'Lagos',
            name: 'AMOKO Daniel',
            position: 'Software Engineer',
            email:'mokowebtech@gmail.com',
            phone: '081-0201-7459',
            image: '/src/assets/img/avatars/veronika.jpg',
            status: 'Pending',
            selectedRating: 4,
            inputReview: ''
            },
             {
            id: 2,
            date:'May 23, 2019',
            reporter: 'Afoabi David',
            title: 'A report on The bridge School Visited',
            place: 'The bridge School',
            description: ' is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using "Content here, content here", making it look like readable English.',
            address: '41 a, Sobo Arobiodu street',
            city: 'agege',
            state: 'Lagos',
            name: 'AMOKO Daniel',
            position: 'Software Engineer',
            email:'mokowebtech@gmail.com',
            phone: '081-0201-7459',
            image: '/src/assets/img/avatars/kristy.png',
            status: 'Pending',
            selectedRating: 5,
            inputReview: ''
            },
             {
            id: 3,
            reporter: 'Chucks Haven',
            date:'Nov. 25, 2018',
            title: 'A report on The bridge School Visited',
            place: 'The bridge School',
            description: ' is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using "Content here, content here", making it look like readable English.',
            address: '41 a, Sobo Arobiodu street',
            city: 'agege',
            state: 'Lagos',
            name: 'AMOKO Daniel',
            position: 'Software Engineer',
            email:'mokowebtech@gmail.com',
            phone: '081-0201-7459',
            image: '/src/assets/img/avatars/daniel.jpg',
            status: 'Pending',
            selectedRating: 2,
            inputReview: ''
            }

            ]   
        }
    },

  methods: {
    accept(submissionId) {
        const submission = this.submissions.find(submission => submission.id === submissionId);
        submission.status = 'accepted'; },

    reject(submissionId) {
        const submission = this.submissions.find(submission => submission.id === submissionId);
        submission.status = 'rejected';},

    combinedStates(submission) {
       return submission.city + '  ' +  submission.state;
  },
    
    getIndex(routeID){  
        var index = this.submissions.findIndex(x => x.id === parseInt(routeID)); //gets index
        return this.submissions[index];//returns object
    },
    remove(){
        if (confirm('Are You Sure you wanna delete?')) {
        //remove report
    } else {
        
        }
    },
    submittedRating(){  
          if (this.inputReview && this.inputRating) {
          let reportReview = { 
            inputReview: this.inputReview,
            inputRating: this.inputRating
          }
          console.log('review:', reportReview);
        //   eventBus.$emit('review-submitted', reportReview) 
        //   this.inputReview = null
        //   this.inputRating = null
        }
     }
},

 computed: {
     
 }
}
</script>
<style scoped>
.yellowText {
    color: yellow;
}
</style>