<template>
  <div class="board-list">
    <div class="common-buttons">
      <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnWrite">등록</button>
    </div>
    <table class="w3-table-all">
      <thead>
      <tr>
        <th>No</th>
        <th>제목</th>
        <th>강사명</th>
        <th>상세내역</th>
        <th>파일코드</th>
        <th>작성일</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(row, board_no) in list" :key="board_no">
        <td><a v-on:click="fnView(`${row.board_no}`)">{{ row.board_no }}</a></td>
        <td><a v-on:click="fnView(`${row.board_no}`)">{{ row.board_title }}</a></td>
        <td><a v-on:click="fnView(`${row.board_no}`)">{{ row.board_teacher }}</a></td>
        <td><a v-on:click="fnView(`${row.board_no}`)">{{ row.board_memo }}</a></td>
        <td><a v-on:click="fnView(`${row.board_no}`)">{{ row.file_code }}</a></td>
        <td><a v-on:click="fnView(`${row.board_no}`)">{{ row.board_CDT }}</a></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() { //변수생성
    return {
      requestBody: {}, //리스트 페이지 데이터전송
      list: {}, //리스트 데이터
      no: '', //게시판 숫자처리
      keyword: this.$route.query.keyword,
    }
  },
  mounted() {
    this.fnGetList()
  },
  methods: {
    fnGetList() {
      this.requestBody = { // 데이터 전송
        keyword: this.keyword,
        page: this.page,
        size: this.size
      }

      this.$axios.get(this.$serverUrl + "/board/list", {
        params: this.requestBody,
        headers: {}
      }).then((res) => {      

        this.list = res.data  //서버에서 데이터를 목록으로 보내므로 바로 할당하여 사용할 수 있다.

      }).catch((err) => {
        if (err.message.indexOf('Network Error') > -1) {
          alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
        }
      })
    },
    fnView(idx) {
      this.requestBody.boardNo = idx
      this.$router.push({
        path: './detail',
        query: this.requestBody
      })
    },
    fnWrite() {
      this.$router.push({
        path: './write'
      })
    }
  }
}
</script>