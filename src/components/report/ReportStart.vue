<template>
    <div> 
            <div class="row">
                <div class="col-md-12 col-centered ">
                    
                    <router-link class="nav-link btn btn-primary btn-sm" to="/report-add">Add Report <span class="sr-only">(current)</span></router-link> 
                    
                <table class="table table-hover table-striped">
            <thead class="thead-dark">
                <tr>
                <th scope="col">#</th>
                <th scope="col">Image</th>
                <th scope="col">Report</th>
                <th scope="col">Date</th>
                <th scope="col"> Location </th>
                <th scope="col"> Status </th>
                <th scope="col">Options</th> 
                </tr>
            </thead>
            <tbody>
                <tr v-for="submission in submissions"  :key="submission.report_id">
                <th scope="row">{{ submission.report_id}}</th>
                <td><img class="img-resize" :src="submission.image_path"/><br/>
                <small> {{ submission.name }}</small></td>
                <td><h5> {{ submission.title }}</h5>
                        <p> {{ submission.description }}</p>
                </td>
                <td>{{ submission.date }}</td>
                <td><p> {{ combinedStates(submission) }}</p> </td>
                <td><p :class="{ 'yellowText' : submission.status == 'pending'}"> {{ submission.status }}</p> </td>
                <td>
                    <div class="dropdown">
                <button class="btn btn-success dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-chevron-circle-down"></i>
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenu2">                   
                     <router-link tag="button" class="btn  dropdown-item" aria-label="Left Align"
                    :to="{name: 'reportEdit', params: { id: submission.report_id}}" ><i class="fas fa-edit"></i> Edit</router-link>
                    
                    <router-link tag="button" class="btn  dropdown-item" aria-label="Left Align"
                    :to="'report/'+ submission.report_id" ><i class="fas fa-search"></i> Review </router-link>
               
                    <button type="button" class="btn btn-success dropdown-item" @click="accept(submission.report_id)" aria-label="Left Align">
                    <span><i class="fas fa-thumbs-up"></i> Accept</span>
                    </button>
                   
                    <div class="dropdown-divider"></div>
                     <button type="button" class="btn btn-danger dropdown-item" @click="reject(submission.report_id)" aria-label="Left Align">
                    <span><i class="fas fa-thumbs-down"></i> Reject</span>
                    </button>
                     <button type="button" class="btn btn-danger dropdown-item" @click="remove(submission.report_id)" aria-label="Left Align">
                    <span><i class="fas fa-trash-alt"></i> Delete</span>
                    </button>
                     
                </div>
                </div>
                     
                </td>
                </tr>
                
            </tbody>
            </table>

        </div>
    </div>
</div>
</template>

<script>
  import axios from 'axios'
export default {
    data(){
        return {
         counter: 0,
         submissions : []   
        }
    },

  methods: {
    accept(submissionId) {
        axios.put(`/acp_report/${submissionId}`,{status:'Accepted'}) 
        .then(resp =>  {
            console.log(resp)
           // this.submission.status = 'Accepted'
             })
        .catch(err=> console.error(err));
        
         },

    reject(submissionId) {
        axios.put(`/acp_report/${submissionId}`, {status:'Rejected'}) 
        .then(resp =>  {
            console.log(resp)
            //this.submission.status = 'Rejected'
             })
        .catch(err=> console.error(err));
        } ,

    remove(submissionId) {
        if (confirm('Are You Sure you wanna delete?')) {
        axios.delete(`/del_report/${submissionId}`) 
        .then(resp =>  { alert('Report Deleted for life')})
        .catch(err=> console.error(err));
        } 
       
    },

    combinedStates(submission) {
       return submission.city + '  ' +  submission.state;
  },
  getAllReports(){ 
      axios.get('/get_reports') 
        .then(resp => {

            const data = resp.data;
            for(let key in data){
                const report = data[key]
                report.report_id = key;
                this.submissions.push(report)
            }
             
            console.log('report object', resp.data)}) 
        .catch(err => console.error(err));
	 
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