<template>
  <a-card :bordered="false" >
    <div>
      <div>
        <div style='background-color: #0098F8;width: 10px;height: 30px;display: inline-block;vertical-align:middle;margin-top: -6px'></div>
        <p style='display: inline-block;color: #666666;font-size: 20px;margin-left: 20px'>做课-轮机电气学（已完成）</p>
      </div>
      <div class="table-operator" style="">
        <a-button @click=" " type="primary" style='position: absolute;right: 0;height: 48px;top: 30px'><a-icon type="caret-right" />课程预览</a-button>
      </div>
      <!--    上传按钮-->
      <div style='padding-top: 50px;padding-left: 10%'>
        <div>
          <p style='font-size: 22px;color: #666666;display: inline-block;margin-right: 50px'>课程封面：</p>
          <a-upload
            name="file"
            :multiple="true"
            :headers="headers"
            @change="handleChange"
          >
            <a-button style='height: 50px;'>选择文件</a-button>
          </a-upload>
        </div>
        <div style='margin-left: 170px;padding-top: 30px;padding-bottom: 30px'>
          <img style='height: 73px;width: 117px' src='../../../../assets/specialty/touxian.png'>
          <p style='color: #9A9A9A;font-size: 18px;'>图片建议尺寸为230x130px</p>
        </div>
        <div id="app" style='display: inline-block'>
          <p style='font-size: 22px;color: #666666;display: inline-block;margin-right: 50px'>课程简介：</p>
          <vue-editor v-model="content" style='display: inline-block;position: absolute;width: 866px'></vue-editor>
        </div>
        <div class="table-operator" style="margin-top: 220px;margin-left: 170px">
          <a-button @click=" " type="primary">保存</a-button>
        </div>
      </div>
    </div>
  </a-card>
</template>

<script>
import { VueEditor } from 'vue2-editor';

export default {
  name: 'zMessage',
  components: {
    VueEditor,
  },
  data(){

  },
  methods: {
    handleChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },
    callback(key) {
      console.log(key);
      this.indexStyle = key
    },
  },
}
</script>

<style scoped>

</style>