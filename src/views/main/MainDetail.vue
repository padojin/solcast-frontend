<template>
  <div class="main-detail">
    <div class="common-buttons">
      <!-- <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnUpdate">수정</button>&nbsp; -->
      <!-- <button type="button" class="w3-button w3-round w3-red" v-on:click="fnDelete">삭제</button>&nbsp; -->
      <button type="button" class="w3-button w3-round w3-gray" v-on:click="fnList">목록</button>
    </div>
    <div class="main-memo">
      <h3>{{ main_title }}</h3>
      <div>
        <strong class="w3-large">{{ main_author }}</strong>
        <br>
      </div>
    </div>
    <div class="main-memo">
      <span>{{ main_ctgy }}</span>
    </div>
    <div class="common-buttons">
      <!-- <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnUpdate">수정</button>&nbsp; -->
      <!-- <button type="button" class="w3-button w3-round w3-red" v-on:click="fnDelete">삭제</button>&nbsp; -->
      <button type="button" class="w3-button w3-round w3-gray" v-on:click="fnList">목록</button>
    </div>
  </div>
</template>

<script>
export default {
  data() { //변수생성
    return {
      requestBody: this.$route.query,
      mainNo: this.$route.query.idx,

      main_title: '',
      main_author: '',
      main_ctgy: ''
    }
  },
  mounted() {
    this.fnGetView()
  },
  methods: {
    fnGetView() {
      this.$axios.get(this.$serverUrl + '/main/detail/' + this.mainNo, {
        params: this.requestBody
      }).then((res) => {
        this.main_title = res.data.main_title
        this.main_author = res.data.main_author
        this.main_ctgy = res.data.main_ctgy
      }).catch((err) => {
        if (err.message.indexOf('Network Error') > -1) {
          alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
        }
      })
    },
    fnList() {
      delete this.requestBody.mainNo
      this.$router.push({
        path: './list',
        query: this.requestBody
      })
    },
    fnUpdate() {
      this.$router.push({
        path: './write',
        query: this.requestBody
      })
    },
    fnDelete() {
      if (!confirm("삭제하시겠습니까?")) return

      this.$axios.delete(this.$serverUrl + '/main/' + this.mainNo, {})
          .then(() => {
            alert('삭제되었습니다.')
            this.fnList();
          }).catch((err) => {
        console.log(err);
      })
    }
  }
}
</script>
<style scoped>


</style>