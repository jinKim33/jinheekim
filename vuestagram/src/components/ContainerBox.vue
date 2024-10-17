<template>
  <div>
    <div v-if="step == 0">
      <Post :게시물 = "게시물[i]" v-for ="(data,i) in 게시물" :key = "i" /><!-- v-for와 v-if는 같은 태그에 못쓴다.-->
    </div>
    <!-- 필터선택페이지 -->
    <div class="" v-if="step == 1" >
        <div class="upload-image" :style="`background-image: url(${uploadimg})`"  @change="$emit('changeimg', this.uploadimg)"></div>
        <div class="filters">
          <div class="filter-1"></div>
          <div class="filter-1"></div>
          <div class="filter-1"></div>
          <div class="filter-1"></div>
          <div class="filter-1"></div>
        </div>
      </div>
    <!-- 글작성페이지 -->
    <div class="upload-image" v-if="step == 2" :style="`background-image: url(${uploadimg})`"></div>
    <div class="write">
      <textarea class="write-box" v-model = "cont" @input="this.$emit('contentTxt', this.cont)">write!</textarea>
      <p>{{ this.cont }}</p>
    </div>
  </div>
</template>

<script>
export default {

  components: {
    Post : PostCom,
  },
  props:{
    게시물 : Array,
    step : Number,
    uploadimg : String,
  },
}

import PostCom from './PostComponent.vue';
</script>

<style>
.upload-image{
width: 100%;
height: 450px;

background-size : cover;
}
.filters{
overflow-x:scroll;
white-space: nowrap;
}
.filter-1 {
width: 100px;
height: 100px;
background-color: cornflowerblue;
margin: 10px 10px 10px auto;
padding: 8px;
display: inline-block;
color : white;
background-size: cover;
}
.filters::-webkit-scrollbar {
height: 5px;
}
.filters::-webkit-scrollbar-track {
background: #f1f1f1; 
}
.filters::-webkit-scrollbar-thumb {
background: #888; 
border-radius: 5px;
}
.filters::-webkit-scrollbar-thumb:hover {
background: #555; 
}
.write-box {
border: none;
width: 90%;
height: 100px;
padding: 15px;
margin: auto;
display: block;
outline: none;
}
</style>