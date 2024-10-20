<template>
  <div class="discount">
    <h4>지금 결제하면 {{할인율}}% 할인</h4>
  </div>
</template>

<script>
export default {
   name: 'disComponent',
   props:{
    할인율 : Number,
   }
}
</script>

<style>

</style>
