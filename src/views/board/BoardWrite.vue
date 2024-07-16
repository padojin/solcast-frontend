<template>
  <div class="board-detail">
    <div class="common-buttons">
      <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnSave">저장</button>&nbsp;
      <button type="button" class="w3-button w3-round w3-gray" v-on:click="fnList">목록</button>
    </div>
    <div class="board-boardMemo">
      <input type="text" v-model="boardTitle" class="w3-input w3-border" placeholder="제목을 입력해주세요.">
      <input type="text" v-model="boardTeacher" class="w3-input w3-border" placeholder="작성자를 입력해주세요." v-if="idx === undefined">
    </div>
    <div class="board-boardMemo">
      <textarea id="" cols="30" rows="10" v-model="boardMemo" class="w3-input w3-border" style="resize: none;">
      </textarea>
    </div>
    <div class="board-boardFile">
      <v-container>
        <input id="file-selector" ref="file" type="file" @change="fnFileUpload">
        <button  class="w3-button w3-round w3-gray" @click="upload">파일 업로드</button>
      </v-container>
    </div>
    <div class="common-buttons">
      <button type="submit" class="w3-button w3-round w3-blue-gray" v-on:click="fnSave">저장</button>&nbsp;
      <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnList">목록</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() { //변수생성
    return {
      requestBody: this.$route.query,
      idx: this.$route.query.idx,  
      boardTitle: '',
      boardTeacher: '',
      boardMemo: '',
      fileCode: ''
    }
  },
  mounted() {
    this.fnGetView()
  },
  methods: {
    fnGetView() {
      if (this.idx !== undefined) {
        this.$axios.get(this.$serverUrl + '/board/' + this.idx, {
          params: this.requestBody
        }).then((res) => {
          this.boardTitle = res.data.boardTitle
          this.boardTeacher = res.data.boardTeacher
          this.boardMemo = res.data.boardMemo
          this.fileCode = res.data.fileCode
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
    fnView(boardNo) {
      this.requestBody.boardNo = boardNo
      this.$router.push({
        path: './detail',
        query: this.requestBody
      })
    },
    fnSave() {
      let apiUrl = this.$serverUrl + '/board'
      this.form = {
        "idx": this.idx,
        "boardTitle": this.boardTitle,
        "boardMemo": this.boardMemo,
        "boardTeacher": this.boardTeacher
      }
      if (this.idx === undefined) {
        //INSERT
        this.$axios.post(apiUrl, this.form)
        .then((res) => {
          alert('글이 저장되었습니다.');
          this.fnView(res.data.boardNo);
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
          this.fnView(res.data.boardNo);
        }).catch((err) => {
          if (err.message.indexOf('Network Error') > -1) {
            alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
          }
        })
      }
    },
    fnFileUpload() {
      this.file = this.$refs.file.files[0];
      console.log(this.file.name, "Test");
    },
    async upload() {
      if (!this.file) {
        alert('파일을 선택하세요');
        return;
      }
      try {
        const formData = new FormData();
        formData.append('file', this.file);
        console.log(formData.get('file')); // FormData 확인
        const response = await axios.post(this.$serverUrl+'/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        alert(response.data.message);
      } catch (err) {
        console.error('Error uploading file:', err.response ? err.response.data : err.message);
        alert('파일 업로드 실패');
      }
    }
    
  }
}
</script>
<style scoped>

</style>