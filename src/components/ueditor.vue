<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2020-11-29 14:37:30
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-02-27 10:25:39
-->
<template>
  <div class="edit_container">
    <vue-editor id="editor" useCustomImageHandler  @imageAdded="handleImageAdded" v-model="content"> </vue-editor>
  </div>
</template>
<script>
import { VueEditor } from 'vue2-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

export default {
  name: 'ue',
  components: { VueEditor },
  data() {
    return {
      content: '',
      editorOption: {}
    };
  },
  props: {
    value: '',
    config: {}
  },
  mounted() {},
  methods: {
    handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append(\'file\', file)

      var formData = new FormData();
      formData.append('image', file);

      axios({
        url: 'https://fakeapi.yoursite.com/images',
        method: 'POST',
        data: formData
      })
        .then(result => {
          let url = result.data.url; // Get url from response
          Editor.insertEmbed(cursorLocation, 'image', url);
          resetUploader();
        })
        .catch(err => {
          console.log(err);
        });
    },
    getValue() {
      // 获取内容方法
      return this.content;
    },
    setValue(val) {
      // 设置内容方法
      this.content = val;
    }
  }
};
</script>
