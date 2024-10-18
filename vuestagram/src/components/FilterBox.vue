<template>

        <div :class="`filter-item ${filterData}`"   @click="$emit('filterClass', filterData)" :style="`background-image: url(${uploadimg})`">{{ filterData }}</div> 
    
</template>

<script>
export default {
    name: 'FilterboxCom',
    props:{
        uploadimg:String,
        filterData:Array,
    },
}
</script>

<style>
.filter-item {
  width: 100px;
  height: 100px;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color : white;
  background-size: cover;
  background-position : center;
}
</style>