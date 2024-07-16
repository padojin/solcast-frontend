<template>
  <div class="main-detail">
    <div class="common-buttons">
      <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnSave">저장</button>&nbsp;
      <button type="button" class="w3-button w3-round w3-gray" v-on:click="fnList">목록</button>
    </div>
    <div class="main-Memo">
      <input type="text" v-model="mainTitle" class="w3-input w3-border" placeholder="제목을 입력해주세요.">
      <input type="text" v-model="mainAuthor" class="w3-input w3-border" placeholder="작성자를 입력해주세요." v-if="idx === undefined">
      <input type="text" v-model="mainCtgy" class="w3-input w3-border" placeholder="카테고리를 입력해주세요." v-if="idx === undefined">
    </div>
    <div class="common-buttons">
      <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnSave">저장</button>&nbsp;
      <button type="button" class="w3-button w3-round w3-gray" v-on:click="fnList">목록</button>
    </div>
  </div>
</template>

<script>
export default {
  data() { //변수생성
    return {
      requestBody: this.$route.query,
      idx: this.$route.query.idx,  
      mainTitle: '',
      mainAuthor: '',
      mainCtgy: ''
    }
  },
  mounted() {
    this.fnGetView()
  },
  methods: {
    fnGetView() {
      if (this.idx !== undefined) {
        this.$axios.get(this.$serverUrl + '/main/' + this.idx, {
          params: this.requestBody
        }).then((res) => {
          this.mainTitle = res.data.mainTitle
          this.mainAuthor = res.data.mainAuthor
          this.mainCtgy = res.data.mainCtgy
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    fnList() {
      delete this.requestBody.idx
      this.$router.push({
        path: './list',
        query: this.requestBody
      })
    },
    fnView(mainNo) {
      this.requestBody.mainNo = mainNo
      this.$router.push({
        path: './detail',
        query: this.requestBody
      })
    },
    fnSave() {
      let apiUrl = this.$serverUrl + '/main'
      this.form = {
        "idx": this.idx,
        "mainTitle": this.mainTitle,
        "mainCtgy": this.mainCtgy,
        "mainAuthor": this.mainAuthor
      }
      if (!this.mainTitle || !this.mainAuthor || !this.mainCtgy) {
            alert('모든 필드를 채워주세요.');
            return;
        }
      if (this.idx === undefined) {
        //INSERT        
        this.$axios.post(apiUrl, this.form)
        .then((res) => {
          alert('글이 저장되었습니다.');
          this.fnView(res.data.mainNo);
        }).catch((err) => {
          if (err.message.indexOf('Network Error') > -1) {
            alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
          }
        })
      } else {
        //UPDATE
        this.$axios.patch(apiUrl, this.form)
        .then((res) => {
          alert('글이 저장되었습니다.')
          this.fnView(res.data.mainNo);
        }).catch((err) => {
          if (err.message.indexOf('Network Error') > -1) {
            alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
          }
        })
      }
    }
    
  }
}
</script>
<style scoped>

</style>