<template>
  <div class="board-detail">

  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      file: null,
      albumBucketName: 'solcast-test-bucket123',
      bucketRegion: 'ap-northeast-2',
      IdentityPoolId: ''
    }
  },
  methods: {
    fnFileUpload() {
      this.file = this.$refs.file.files[0];
      console.log(this.file, "Test");
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
        const response = await axios.post('http://localhost:3001/upload', formData, {
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
