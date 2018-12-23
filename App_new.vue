<!-- файл входа/ управление всем приложением -->


<template>
	<v-app id="inspire">
		<v-content>
			<v-container fluid fill-height>
				<v-layout align-center justify-center>
					<v-flex xs12 sm8 md4 lg4>
						<v-card class="elevation-12">
							<v-toolbar dark color="green">
								<v-toolbar-title> Login form</v-toolbar-title>
								<v-spacer></v-spacer>
								
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="login" label="Login" type="text"></v-text-field>
                  <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn dark color="green">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>

 
</template>

<script>

  let user = firebase.auth().currentUser;
  if (user!= null){
          console.log(user.displayName);
          console.log(user.email)};

  if (user == null){
    console.log ('Зарегистрироваться!!');
  };

//import AppInput from './Components/Input.vue';


import AppAuth from './Components/Auth.vue';
import AppSignup from './Components/Signup.vue';
import AppSignin from './Components/Signin.vue';
import AppTovar from './Components/Tovar.vue';
import bModal from 'bootstrap-vue/es/components/modal/modal';
import Mainpageview from './Components/Mainpageview';

import {mapGetters} from 'vuex';
import {mapMutations} from 'vuex';
import {mapActions} from 'vuex';

export default {
    components: {
         //  AppInput
         Mainpageview,
         AppAuth,
         AppSignup,
         AppSignin,
         AppTovar,
         bModal
      },
      created(){
          this.$router.push({ path: '/'}); //чистит строку в браузере
      },
      data(){
        return{
          }
      },
      computed: {

      ...mapGetters('authstate', {
        //название переменной : название геттера
        signin: 'signin', /* форма входа */
        signup: 'signup', /* форма регистрации */ 
        user_email: 'useremail', /* адрес почты зарегистрированного пользователя */
        isMainPage: 'isMainPage', /* главный экран */
        signinbtn: 'signinbtn', /* кнопка входа */
        signoutbtn: 'signoutbtn', /* кнопка выхода */
        signupbtn: 'signupbtn', /* кнопка регистрации */
        user_plan: 'user_plan',
      }),
      /*
      logoutbtn(){
        return this.$store.state.logoutbtn; //показывать или нет кнопку выхода
      },*/
      
    },
     methods:{
      ...mapActions('authstate',{
          signOutAct: 'signOutAct', /*  для выхода пользователя посредством метода сервиса FireBase */
          signIn: 'signIn',   /* action по изменению статуса окна и кнопок регистрации */
          signUp: 'signUp' /* action для регистрации нового пользователя*/ 
      }),
    
     }
      

}

</script>

<style scoped>

        

    .amz{
      color:  white;
    }

    .user{
      color:  white;
    }


</style>
