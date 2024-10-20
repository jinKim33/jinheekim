<template>
    <div>
    <div class="white-bg">
      <div><img :src="원룸.image" :alt="원룸.content"></div>
      <h4 @click="$emit('openModal',원룸.id)">{{ 원룸.title}}</h4>
      <p>{{ 원룸.content}}</p>
      <p>{{ 원룸.price}}원</p>

    </div>
</div>
</template>

<script>
export default {
    name:'CardComponent',
    props :{
        원룸 : Object,
    },
    methods: {
        send(){
            this.$emit('opneModal',this.원룸.id);
        }
        
    },
}
</script>

<style>

</style>