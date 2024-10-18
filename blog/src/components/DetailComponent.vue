<template>
  <!-- {{$route.params.id}} guswo URL정보는 $route에 담겨있음,$route.params는 현재 파라미터 자리에 기입된것을 알려줌 -->
  <div>
    <h4>상세페이지</h4>
    <h5>{{블로그글[$route.params.id].title}}</h5>
    <p>{{블로그글[$route.params.id].content}}</p>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
 props :{
  블로그글 : Array,
 }
}
</script>

<style>

</style>