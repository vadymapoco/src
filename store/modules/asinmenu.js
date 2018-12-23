import Vue from 'vue';
import authstate from './authstate';

export default {

 	namespaced: true,

 	state:{
 		asins: [],
 		tags: [],
 		groups: [],
 		asinhistory: [],
 		asinLoaded: false,
 		asin_quant: 0,
 		
 	},
 	getters:{
 		asins(state){
 			return state.asins;
 		},
 		asinhistory(state){
 			return state.asinhistory;
 		},
 		tags(state){
 			return state.tags;
 		},
 		groups(state){
 			return state.groups;
 		},
 		asinLoaded(state){
 			return state.asinLoaded;
 		},
 		asin_quant(state){
 			return state.asin_quant;
 		}
 	},
 	mutations:{
 		lookasin(state,value){
 				console.log('asinmenu/lookasin mutation');
 				console.log('asins array');
 				console.log(value);
 				state.asins = value;
 				state.asinLoaded = true;
 				console.log('показываем главный экран - app mainPage');
 				authstate.state.isMainPage = true;
 			},
		lookasinhistory(state,value){
			console.log(' lookasinhistory mutation');
			console.log(value);
			state.asinhistory = value;
 			},
 		looktag(state,value){
 				console.log('looktag mutation');
 				console.log(value);
 				console.log('заносим все теги из таблицы в массив на складе в этом модуле');
 				state.tags = value;
 			},
		lookgroup(state,value){
			console.log('lookgroup mutation');
			console.log(value);
			console.log('заносим все группы из таблицы в массив на складе в этом модуле');
			state.groups = value;
 			},
 		asin_quant(state, value){
 				state.asin_quant = value.length;
 			}


	},
	actions: {
		lookasin(store){
			console.log('выполнение asinmenu/lookasin actions - запрашивает список всех асинов из БД')
			if(!store.state.asinLoaded){
				return new Promise ((resolve, reject) => { 
		        console.log(this.getters.uid + ' - уникальный номер пользователя');
		        console.log(this.getters.polesort + ' - параметр сортировки');

				//var uid = this.$store.getters.uid;
				Vue.http.get('http://bsr-consulting.com/alex.php', {
					params: {   asin : 'lookasin',
								sort: this.getters.polesort,
								uid: this.getters.uid,
							}
				}).then (
				response => {
					resolve (response);
					console.log('.then lookasin actions');
					store.commit('lookasin', response.data);
				},
				err => {
					reject(error);
					console.log(err);
				}
				);

				}) //promise
			}
		},
/*
			lookasin(store){
			console.log('выполнение asinmenu/lookasin actions - запрашивает список всех асинов из БД')
			if(!store.state.asinLoaded){
		        console.log(this.getters.uid + ' - уникальный номер пользователя');
		        console.log(this.getters.polesort + ' - параметр сортировки');

				//var uid = this.$store.getters.uid;
				Vue.http.get('http://bsr-consulting.com/alex.php', {
					params: {   asin : 'lookasin',
								sort: this.getters.polesort,
								uid: this.getters.uid,
							}
				}).then (
				response => {

					console.log('.then lookasin actions');
					store.commit('lookasin', response.data);
				},
				err => {
					console.log(err);
				}
				);}
			},*/
		asin_quant(store){
				console.log('выполнение asinmenu/asin_quant actions - смотрим количество асинов в базе по длине массива');
				Vue.http.get('http://bsr-consulting.com/alex.php', {
					params: {   asin : 'lookasin',
								sort: this.getters.polesort,
								uid: this.getters.uid,
							}
				}).then (
				(response) => {
					console.log('.then asin_quant actions');
					store.commit('asin_quant', response.data);
				},
				(err) => {
					console.log(err);
				}
				);
			},
		lookasinhistory(store){
				console.log('lookasinhistory action');
				console.log(this.getters.current_asin.asin);
				Vue.http.get('http://bsr-consulting.com/alex.php', {
					params: {   lookasinhistory : 'lookasinhistory',
								uid: this.getters.uid,
								current_asin: this.getters.current_asin.asin
							}
				}).then (
				(response) => {
					console.log('.then asinmenu/lookasinhistory actions')
					store.commit('lookasinhistory', response.data);
				},
				(err) => {
					console.log(err);
				}
				);
			},
		looktag(store){
			console.log('выполнение asinmenu/looktag actions - обращаемся к таблице tag и вытаскиваем все теги');
				Vue.http.get('http://bsr-consulting.com/alex.php', {
					params: {   lookasintag : 'lookasintag',
								sort: this.getters.poletagsort,
								uid: this.getters.uid
							}
				}).then (
				(response) => {
					console.log('.then asinmenu/looktag actions')
					//console.log('получили ответ от таблицы tag');
					store.commit('looktag', response.data);
				},
				(err) => {
					console.log(err);
				}
				);
			},

		lookgroup(store){
			console.log('выполнение asinmenu/lookgroup actions - обращаемся к таблице group и вытаскиваем все group');
				Vue.http.get('http://bsr-consulting.com/alex.php', {
					params: {   group : 'lookgroup',
								sort: this.getters.polegroupsort,
								uid: this.getters.uid
							}
				}).then (
				(response) => {
					console.log('.then asinmenu/lookgroup actions')
					//console.log('получили ответ от таблицы group');
					store.commit('lookgroup', response.data);
				},
				(err) => {
					console.log(err);
				}
				);
			},

		action_event(store, asin){
			console.log(' выполняется action - action_event');
			//console.log( asin);
			this.commit('keywordlist', asin);
			setTimeout(() => {
				console.log(' задержка 1 сек');
				this.dispatch('events/lookasineventhistory', asin);
			}, 100);

		},
		action_list(store, asin){
			console.log(' выполняется action - action_list');
			this.commit('keywordlist', asin);
			setTimeout(() => {
				console.log(' задержка 0.1 сек');
				this.dispatch('keywords/lookkeyword', asin);
				
			}, 100);
		}



	},
	
}
	