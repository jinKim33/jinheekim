
<!-- 상속된 데이터는 재할당 x 모달창열렸니 = false -->

<template>

  <div class="black-bg" v-if="모달창열렸니 == true">
    <div class="white-bg">
      <div><img :src="상속데이터[누른거].image" :alt="상속데이터[누른거].content"></div>
      <h4>{{ 상속데이터[누른거].title}}</h4>
      <p>{{ 상속데이터[누른거].content}}</p>
      <!-- <input @input="month = $event.target.value"> 아래처럼 바꿈 v-model-->
      <input v-model.number ="month">
      <input type="range" min="1" max="12">
      <!-- <textarea v-model="month"></textarea> -->
      <!-- @input 입력할때마다 뭐를 실행 
          @onChange 입력후 다른곳을 클릭했을때
      -->
      <p>{{ month }} 개월 선택함{{ 상속데이터[누른거].price * month}}원</p>
      <button class="btn_close" @:click="$emit('modalClose',false)">닫기</button>
    </div>
</div>
</template>

<script>
export default {
    name:'ModalWindow',
    data(){
      return{
        month : 1, /*문자입력받으려면 초기값을 문자로*/
      }
    },
    watch :{ /* 감시할데이터(){} 데이터가 변할때마다 watcher도 실행됨*/
      month(a){/*(변경전데이터,변경후데이터)*/
        if(isNaN(a) & !a ==""){
          alert("숫자로 입력해주세요");
          this.month = 1;
        } 
      },
    },
    props :{
        상속데이터 : Array,
        누른거 : Number,
        모달창열렸니 : Boolean,
    },
    beforeUpdate(){
      if(this.month==2){
        alert("2를 입력했습니다!");
      }
    },
}
</script>

<style>

</style>