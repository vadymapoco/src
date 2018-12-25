<template>
	<div>
		
			<h1> Keyword Tracking</h1>

			<label> {{asin.title}} </label>

			<p>ASIN: {{asin}}</p>

			<p>Keyword : {{current_keyword}}</p>


			<div>
				<table class="table table-bordered">
					<tr class="name">
						
						<td>Date</td>
						<td>Position</td>
						<td>Page</td>
						<td>Amazon choice</td>
						<td>Advertising page</td>
						<td>Event</td>
						

					</tr>
					<tr v-for="(kw, index) in kwhistory"
						
					>
					    <td>{{kw.data}}</td>
				        <td>{{kw.kw_position }}</td>
				        <td>{{kw.kw_page}}</td>
				        <td>{{kw.amazon_choice}}</td>
				        <td>{{kw.advertising_page}}</td>
				        <td>{{kw.event1}}</td>
				       

				    </tr>
					
				</table>
				
			</div>

					<div>
					<button @click="back">back to Keyword</button>
					<v-btn class="primary"
					@click="current_event"
					>
					Events
					</v-btn>
					</div>
			<p> {{ asin }} </p>
			<p> {{ current_keyword }} </p>
			<table class="table table-bordered">
				<tr>
						<td>event_id</td>
						<td>ASIN</td>
						<td>Keyword</td>
						<td>Start date</td>
						<td>Finish date</td>
						<td>Comment</td>
					</tr>
					<tr v-for="(event, index) in eventhistory_array">
						<td>{{event.event_history_id}}</td>
						<td>{{event.asin}}</td>
						<td>{{event.keyword}}</td>
						<td>{{event.start_date}}</td>
						<td>{{event.end_date}}</td>
						<td>{{event.comment}}</td>
					</tr>
			</table>
			<p> {{ eventhistory_array }} </p>
			

				</div>
			
			
				
			
</template>

<script>
	import Vue from 'vue';
	import AppEditAsinPopup from '../Components/EditAsinPopup.vue';
	import {mapGetters} from 'vuex';
	import {mapActions} from 'vuex';
	import 'vue-awesome/icons/angle-up';
	import 'vue-awesome/icons/angle-down';
	import 'vue-awesome/icons/brands/amazon';
	import 'vue-awesome/icons/trash';
	import 'vue-awesome/icons/calendar-alt';
	import 'vue-awesome/icons/edit';
	import 'vue-awesome/icons/list';
	import 'vue-awesome/icons/file';


	export default {

		components: {
         AppEditAsinPopup,
      },
      directives: {
      	},
      created(){
      	
      	console.log('keywords/lookkwhistory actions в момент создания компонента');
      	this.$store.dispatch('keywords/lookkwhistory').then( response => {
      		console.log('then');
      		
     		this.copy_kwhistory = this.kwhistory.slice();
		});

      		console.log('created 2');

      	this.eventhistory_array = this.event.filter(item => item.keyword == this.$store.getters['keywords/current_keyword']);//фильтр по текущему ключевому слову

      },
      
      
		data(){
			return{
			eventhistory_array: [],
			copy_kwhistory: [],
			eventts: []

		}
	},
		computed: {
			...mapGetters('events', 
				{eventFiltered: 'eventhistory_filtered',
				 event: 'eventhistory',
				 eventKeyword : 'eventhistory_filtered_keyword'
				 
			}),

			kwhistory(){
				return this.$store.getters['keywords/keywordhistory'];
			},
			asin(){
				return this.$store.getters.current_asin;
			},
			current_keyword(){
				return this.$store.getters['keywords/current_keyword'];
			},
			
			
		},

		methods:{

			back(){
				this.$router.push({ name: 'keywords'});
			},
			
			action (){

			},
			current_event(){
				console.log('current event');
				for(var i=0; i<this.kwhistory.length; i++){
					for (var x=0; x<this.eventhistory_array.length; x++){
							if (this.kwhistory[i].data >= this.eventhistory_array[x].start_date && 
								this.kwhistory[i].data <= this.eventhistory_array[x].end_date) {
								console.log(this.kwhistory[i].data);
								var ev = true;
								var comm = this.eventhistory_array[x].comment;
								break;
								
							}else ev=false;}
							if (ev == true) {
								this.kwhistory[i].event1 = comm;}
								else{
								this.kwhistory[i].event1 = 'no';;
							}
							
					}
				
			},
			}
			
		}




</script>

<style scoped>

		.table-button{
			display:  flex;
		}

		.button-block{
			display:  flex;
			margin-left: 10px;

		}

		.fa-icon {
			margin:  0;
			padding: 0;
			width: 100%;
			height: 100%; /* or any other relative font sizes */
			 
			  /* You would have to include the following two lines to make this work in Safari */
			max-width: 100%;
			max-height: 100%;
}

		.btn-small{
			margin: 0;
			margin-right: 5px;
			padding: 0;
			width: 20px;
			height: 20px;
		}

		.btn-menu-small{
			margin: 0;
			margin-right: 2px;
			padding: 0;
			width: 20px;
			height: 20px;
		}

		.table-menubuttons{
			width: 200px;
		}

		td{
			font-family: verdana;
			font-size: 14px;
			text-align: left;
		}

		.asin{
			font-size: 10px;
			font-weight: bold;
		}

		.name{
			font-weight: bold;
		}

</style>