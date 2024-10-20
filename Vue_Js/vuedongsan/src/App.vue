<template>
<div v-if="1==0">
  안녕하세요
</div>
<!-- <div v-else>
  참이 아닐경우
</div> 
<div v-else-if="1==1">
  if elseif

</div>
-->
<transition name="fade">
  <modal :상속데이터="원룸들" :누른거="누른거" :모달창열렸니="모달창열렸니"  @modalClose="모달창열렸니 = false" />
</transition>


 <discount_bnr v-if="showDiscount == true" :할인율="할인율"></discount_bnr>

 <!-- v-bind ="오브젝트" 배열전체를 가져올때 쓴다-->
  <div class="menu">
    <a  v-for="a in 메뉴들" :key="a">{{ a }}</a>
    <!---v-for 작명 in 3 :key=""-->
  </div>
 <button @click="productSort">가나다순</button>
 <button @click="priceReverseSort">가격역순정렬</button>
 <button @click="priceSort">가격순정렬</button>
 <button @click="underFifty">50만원이하 정렬</button>
 <button @click="sortBack">되돌리기</button>
<!-- <CardList :카드데이터 = "원룸들"></CardList> -->
<!-- props 보낼때 다양한 자료형 입력가능 : 작명 = "문자자료" 숫자자료일경우는 :붙인다 (:작명="123")-->
 
<card @openModal="모달창열렸니 = true;누른거 = $event" v-for="(room,i) in 원룸들" :key="room" :원룸="원룸들[i]"></card> 
</template>

<script> 

import one from './assets/oneroom.js';
import disComponent from './discountCom.vue';
import ModalWindow from './ModalWindow.vue';
// import CardList from './CardList.vue';
import CardComponent from './CardComponent.vue';


export default {
  name: 'App',
  data(){ //데이터 만들시에는 하위 컴포넌트 말고 상위컴포넌트에서 만듬(하위에서 데이터 가져올때 문법이 어려워짐)
    return{
     showDiscount : true,
     원룸들오리지널 : [...one], /*object 데이터의 각각 별개의 사본을 만든다*/
     오브젝트 : {name : 'kim', age : 20},
     누른거 : 0, 
     원룸들 : one,
     모달창열렸니 : false, 
     신고수 : [0,1,3],
     메뉴들 : ['Home', 'Products', 'About'], 
     product : ['역삼동원룸', '천호동원룸', '마포구원룸'],
     할인율 : 20,
    }
  },
  methods :{
    saleCount() {
    this.할인율+=1;
  },
    increase(){
      this.신고수+=1;
    },
    sortBack(){
      this.원룸들 = this.원룸들오리지널;
    },
    priceSort(){
      this.원룸들.sort(function(a,b){
        return a.price - b.price;
      });
    },
    productSort(){
      this.원룸들.sort(function(a,b){
        return ( a.title < b.title ) ? -1 : ( a.title == b.title ) ? 0 : 1;
      });
    },
    underFifty(){

        this.원룸들 = this.원룸들
          .filter(room => room.price < 500000) // 50만 원 이하 원룸들만 필터링
          .sort(function(a, b) {
            return a.price - b.price; // 오름차순으로 정렬
          });

    },
    priceReverseSort(){
      this.원룸들.sort(function(a,b){
        return b.price + a.price;
      });
    }

  },
  // mounted(){
  //   setTimeout(()=>{
  //    this.showDiscount = false;
  //   }, 2000);

  // },
  // mounted(){
  //   setInterval(() => {
  //     this.할인율++;
  //   }, 1000);
  // },


  components: {
    discount_bnr : disComponent,
    modal : ModalWindow,
    // CardList : CardList,
    card : CardComponent,
  }
}
</script>

<style>
body{
  margin:0;
}
div{
  box-sizing: border-box;
}
.black-bg{
  width: 100%;
  height:100%;
  background:rgba(0,0,0,0.5);
  position:fixed;
  padding:20px;
}
.white-bg{
  width:100%;background:#fff;border-radius: 8px;padding:20px;
}
.room-img{
  width:100%;
  margin-top:40px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.menu{
  background:darkslateblue;
  padding:15px ;
  border-radius: 5px;
}
.menu a{
  color:#fff;
  padding:10px;
}

.btn_close{background:violet;padding:10px 20px;border:0}
.discount{background:mediumslateblue;margin: 10px;padding:10px;border-radius:5px;}
.start{
  opacity:0;
  transition: all 1s;
}

.end{
  opacity:1;
}

/* .fade-enter-from{
  opacity:0
}
.fade-enter-active{
  transition: all 1s;
}
.fade-enter-to{
  opacity:1;
}
.fade-leave-from{
  opacity:1;
}
.fade-leave-active{
  transition: all 1s;
}
.fade-leave-to{
  opacity:0;
} */
.fade-enter-from{
  transform:translateY(-1000px);
}
.fade-enter-active{
  transition: all 1s;
}
.fade-enter-to{
  transform:translateY(0px);
}
.fade-leave-from{

  transform:translateY(0px);
}
.fade-leave-active{
  transition: all 1s;
}
.fade-leave-to{
  transform:translateY(-1000px);
}

</style>
