<template>
    <div v-for="(room,i) in 카드데이터" :key="i">
        <img :src="room.image" class="room-img"><!-- 현재경로는 ./으로 무조건 시작-웹팩언어 -->
        <!-- <h4 @click="모달창열렸니 = true; 누른거 = i">{{room.title}}</h4> -->
        <p>{{room.price}}원</p>
        <p>{{room.content}}</p>
    </div>  
</template>

<script>
export default {
    name : "CardList",
    props :{
        카드데이터 : Array,
    }

}
</script>

<style>

</style>