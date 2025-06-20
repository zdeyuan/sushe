<template>
<a-card :bordered="false">
  <div>
    <div style='background-color: #0098F8;width: 10px;height: 30px;display: inline-block;vertical-align:middle;margin-top: -6px'></div>
    <p style='display: inline-block;color: #666666;font-size: 20px;margin-left: 20px'>站点配置</p>
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
      <a-form-item label="标题：">
        <a-input></a-input>
        <div>前台页面显示的标题</div>
      </a-form-item>
      <a-form-item label="网页banner：">
        <a-button style='height: 50px;'>选择文件</a-button>
        <div>
        <img style='height: 73px;width: 117px'src='@/assets/specialty/touxian.png'>
      </div>
      </a-form-item>
      <a-form-item label="网页LOGO：">
        <a-button style='height: 50px;'>选择文件</a-button>
        <div>
        <img style='height: 73px;width: 117px'src='@/assets/specialty/touxian.png'>
      </div>
      </a-form-item>
      <a-form-item label="宣传视频：">
        <a-button style='height: 50px;'>选择文件</a-button>
        <div>
          支持的文件扩展名只允许mp4格式并且编码格式必须是H.264
        </div>
      </a-form-item>
      <a-form-item label="宣传视频封面图片：">
        <a-button style='height: 50px;'>选择文件</a-button>
      </a-form-item>
      <a-form-item label="关键字：">
        <a-input></a-input>
      </a-form-item>
      <a-form-item label="描述：">
        <a-input></a-input>
      </a-form-item>
      <a-form-item label="状态：">
        <a-radio :value="1">
          启用
        </a-radio>
        <a-radio :value="0">
          禁用
        </a-radio>
      </a-form-item>
      <a-form-item label="关闭原因：">
        <a-input></a-input>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary" html-type="submit">
          确定
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</a-card>
</template>

<script>
export default {
  name: 'zWeb',
  data() {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinated' }),
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    },
    handleSelectChange(value) {
      console.log(value);
      this.form.setFieldsValue({
        note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
      });
    },
  },
};
</script>

<style scoped>

</style>