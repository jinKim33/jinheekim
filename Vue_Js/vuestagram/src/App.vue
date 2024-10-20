<template>
  <div class="header">
      <ul class="header-button-left">
        <li @click="step = 0" v-if="step==2">Cancel</li>
      </ul>
      <ul class="header-button-right">
        <li @click="step++" v-if="step==1">Next</li>
        <li @click="publish" v-if="step ==2">발행</li>
      </ul>
      <img src="./assets/logo.png" class="logo" />
    </div>

    <Container :게시물 = "게시물" :step="step" :uploadimg="uploadimg" v-model="parentContent" @contentTxt ="txtCont = $event" :filterData="filterData"/>
    <button @click="more" v-if="step == 0">더보기</button> 

    <div class="footer">
      <ul class="footer-button-plus">
        <input @change="upload" type="file" id="file" class="inputfile" /><!-- @change : input태그에 데이터가 변경이 됬을때 실행-->
        <label for="file" class="input-plus" v-if="step==0">+</label>
      </ul>
  </div>
  <ContainerBox  />

  <!--탭버튼 만들기
  <div v-if="step == 0">내용0</div>
  <div v-if="step == 1">내용1</div>
  <div v-if="step == 2">내용2</div>
  <button @click="step = 0">버튼0</button>
  <button @click="step = 1">버튼1</button>
  <button @click="step = 2">버튼2</button> -->



  <div style="margin-top:500px"></div>
</template>

<script>
import ContainerBox from "./components/ContainerBox.vue";
import postData from "./assets/instaData.js";
import axios from "axios";


export default {
  name: 'App',
  data(){
    return{
      step : 0,
      게시물: postData,
      count:0,
      uploadimg:'',
      txtCont:'',
      parentContent:'',
      filterData: [ "aden", "_1977", "brannan", "brooklyn", "clarendon", "earlybird", "gingham", "hudson", 
"inkwell", "kelvin", "lark", "lofi", "maven", "mayfair", "moon", "nashville", "perpetua", 
"reyes", "rise", "slumber", "stinson", "toaster", "valencia", "walden", "willow", "xpro2"],
        classfilter:''
    }
  },

  components: {
    Container: ContainerBox,
  },

  methods:{
    more(){
      // axios.post('URL', {name: 'kim'}).then().catch((error)=>{ }) : 실패시는 .catch() 요청성공시 then
      axios.get(`https://codingapple1.github.io/vue/more${this.count}.json`).then(response => {
        this.게시물.push(response.data);
        this.count++;
      });
    },
    publish(){
      //게시물에 내가 작성한 글 밀어넣기
      let 내게시물 = {
        name: "author",
        userImage: "https://picsum.photos/100?random=3",
        postImage: this.uploadimg,
        likes: 0,
        date: "d",
        liked: false,
        content: this.txtCont,
        filter: ""

      }
      this.게시물.unshift(내게시물);
      console.log(this.txtCont);
      this.step = 0;

    },
    upload(e){
      let 파일 = e.target.files; /*내가 업로드한 파일 저장*/
      console.log(파일[0]);
      /*업로드하자마자 다음페이지로 */
      let url = URL.createObjectURL(파일[0]);
      console.log(url);
      this.step++;
      this.uploadimg = url;
      /* 업로드한 이미지를 화면에 보여주기
            (방법1)FileReader():파일을 글자로 변환해준다
            (방법2)URL.createObjectURL():이미지의 가상 URL을 생성해줌
      */


    }
  }

}
</script>

<style>
#app {
  box-sizing: border-box;
  font-family: "consolas";
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}
body {
  margin: 0;
}
ul {
  padding: 5px;
  list-style-type: none;
}
.logo {
  width: 22px;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 13px;
}
.header {
  width: 100%;
  height: 40px;
  background-color: white;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
}
.header-button-left {
  color: skyblue;
  float: left;
  width: 50px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}
.header-button-right {
  color: skyblue;
  float: right;
  width: 50px;
  cursor: pointer;
  margin-top: 10px;
}
.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
}
.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}
.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}
.inputfile {
  display: none;
}
.input-plus {
  cursor: pointer;
}

</style>
