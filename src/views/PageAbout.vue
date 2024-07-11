<template>
  <div class="common-detail">
    <div class="common-contents">
      <p>ID   </p>
      <input type="text" v-model="userId" class="w3-input w3-border" placeholder="아이디를 입력해주세요.">
      <p>PW    </p>
      <input type="text" v-model="userPw" class="w3-input w3-border" placeholder="비밀번호를 입력해주세요.">
      <p>Name      </p>
      <input type="text" v-model="userName" class="w3-input w3-border" placeholder="이름을 입력해주세요.">
      <div class="common-buttons">
        <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnSave">저장</button>&nbsp;
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() { //변수생성
    return {
      requestBody: this.$route.query,
      userId: this.$route.query.userId,

      userPw: '',
      userName: ''
    }
  },
  mounted() {
    this.fnGetView()
  },
  methods: {
    fnGetView() {
      if (this.userId !== undefined) {
        this.$axios.get(this.$serverUrl + '/user/' + this.userId, {
          params: this.requestBody
        }).then((res) => {
          this.userId = res.data.userId
          this.userPw = res.data.userPw
          this.userName = res.data.userName
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    fnList() {
      delete this.requestBody.userId
      this.$router.push({
        path: './list',
        query: this.requestBody
      })
    },
    fnView(userId) {
      this.requestBody.userId = userId
      this.$router.push({
        path: './detail',
        query: this.requestBody
      })
    },
    fnSave() {
      let apiUrl = this.$serverUrl + '/user'
      this.form = {
        "userId": this.userId,
        "userPw": this.userPw,
        "userName": this.userName
      }
        //INSERT
        this.$axios.post(apiUrl, this.form)
        .then((res) => {
          alert('회원 가입을 축하합니다.')
          this.fnView(res.data.userId)
        }).catch((err) => {
          if (err.message.indexOf('Network Error') > -1) {
            alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
          }
        })
    }
  }
}
</script>
<style scoped>

</style>