<template>
	<div class="container">
		<h1> First Page </h1>
		<hr>
    <p>Какие то графики</p>
    <p>Какие то цифры</p>
		</div>
  








</template>



<script>




export default{
	components: {
    
    
  },
  created(){
    console.log('First page created');
    this.$store.dispatch('settingss/lookplan');
  }
	
}
</script>

<style scoped>

	
		
</style>