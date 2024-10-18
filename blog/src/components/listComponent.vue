<template>

  <div v-for="(blogdata,i) in 블로그글" :key="i">
    <h5>{{블로그글[i].title}}</h5>
    <p>{{블로그글[i].date}}</p>
    <p>{{블로그글[i].content}}</p>
  </div>
</template>

<script>
export default {
 props:{
  블로그글 : Array,
 }
}
</script>

<style>

</style>