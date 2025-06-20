<template>
  <a-card :bordered="false">
    <a-modal
      :title="title"
      :width="width"
      placement="right"
      okText='确定'
      cancel-text="取消"
      @cancel="handleCancel"
      @ok="handleOk"
      :ok-button-props="state"
      :visible="visible">

      <a-form :form="form" :label-col="{ span:4 }" :wrapper-col="{ span:16 }">
        <a-row>
          <a-col>
            <a-form-item label="图片">
              <a-upload
                :list-type="uploadData.listType"
                class="avatar-uploader"
                :show-upload-list="false"
                :action="uploadData.action"
                :before-upload="beforeUpload"
                @change="handleChange"
              >
                <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                <div v-else>
                  <a-icon :type="loading ? 'loading' : 'plus'" />
                  <div class="ant-upload-text">
                    上传
                  </div>
                </div>
              </a-upload>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col>
            <a-form-item label="请输入模式名称">
              <a-input style="width: 100%"></a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item label="最低限制人数" :label-col="{ span: 8 }" :wrapper-col="{ span: 8 }">
              <a-input-number style="width: 100%" id="NumBig" :min="0" @change="onChange"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="最高限制人数" :label-col="{ span: 8 }" :wrapper-col="{ span: 8 }">
              <a-input-number style="width: 100%" id="NumLittle" :min="0" @change="onChange"/>
            </a-form-item>
          </a-col>
        </a-row>

        <div v-show="this.stateId==1">
          <a-button style="background-color: #00BAD0;color: #FFFFFF;margin-bottom: 15px;margin-left: 125px">
            <IconFont style="font-weight: bold;" type="iconjiahao" />
            添加科目
          </a-button>
        </div>
        <a-row>
          <a-col :span="12">
            <a-form-item label="科目一" :label-col="{ span: 8 }" :wrapper-col="{ span: 8 }">
              <a-select default-value="1" style="width: 100%">
                <a-select-option value="1">
                  1
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="科目二" :label-col="{ span: 8 }" :wrapper-col="{ span: 8 }">
              <a-select default-value="1" style="width: 100%">
                <a-select-option value="1">
                  1
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item label="科目三" :label-col="{ span: 8 }" :wrapper-col="{ span: 8 }">
              <a-select default-value="1" style="width: 100%">
                <a-select-option value="1">
                  1
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="科目四" :label-col="{ span: 8 }" :wrapper-col="{ span: 8 }">
              <a-select default-value="1" style="width: 100%">
                <a-select-option value="1">
                  1
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item label="科目五" :label-col="{ span: 8 }" :wrapper-col="{ span: 8 }">
              <a-select default-value="1" style="width: 100%">
                <a-select-option value="1">
                  1
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="科目六" :label-col="{ span: 8 }" :wrapper-col="{ span: 8 }">
              <a-select default-value="1" style="width: 100%">
                <a-select-option value="1">
                  1
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col>
            <a-form-item label="描述">
              <a-textarea auto-siz />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
  </a-card>
</template>
<script>
import { IconFont } from '@/cas/ico'
export default {
  name: '',
  data() {
    return {
      width:800,
      title:'',
      visible: false,
      stateId:'',
      state: { props:{ disabled: '' } },
      uploadData: {
        action: process.env.VUE_APP_API_BASE_URL + 'edu-portal/pub/file/uploadImage',
        listType: 'picture-card'
      },
      imageUrl:''
    }
  },
  created() {

  },
  computed: {

  },
  components: {
    IconFont
  },
  methods: {
    exam(){
      if(this.stateId == 0){
        this.state.props.disabled = false
        this.visible = true;
      }else{
        this.state.props.disabled = true
        this.visible = true;
      }
    },
    handleCancel() {
      this.visible = false;
    },
    handleOk(){
      this.visible = false;

    },
    //编辑接口
    getListS(){

    },
    onChange(value) {
      console.log('changed', value);
    },
    handleChange(info) {
      if (info.file.status === 'uploading') {
        this.loading = true;
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        this.getBase64(info.file.originFileObj, imageUrl => {
          this.imageUrl = imageUrl;
          this.loading = false;
        })
        const { id } = info.file.response.result
        this.form.coverId = id
      }
    },
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.$message.error('请上传jpeg/png格式图片!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('图片大小不能超过2M!');
      }
      return isJpgOrPng && isLt2M;
    },
    getBase64(img, callback) {
      const reader = new FileReader()
      reader.addEventListener('load', () => callback(reader.result))
      reader.readAsDataURL(img)
    },

  }
}
</script>
<style scoped>
:global(.ant-form-item) {
  margin-bottom: 5px;
}

</style>
