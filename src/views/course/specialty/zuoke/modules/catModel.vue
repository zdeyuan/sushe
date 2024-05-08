<template>
  <div>
    <a-button @click="showModal" type="primary" style='background-color: #00BAD0;height: 34px;border: none'><a-icon type="plus" />添加</a-button>
    <a-modal
      width='80%'
      :visible="visible"
      :title= "modelTitle"
      okText='确认'
      cancel-text="取消"
      @cancel="handleCancel"
      @ok="handleOk">
      <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 6 }" class="locationItem">
        <a-form-item label="上级节点：" >
          <a-select default-value="0" style="width: 140px;height: 34px;margin-right: 20px" @change="handleChange">
            <a-select-option value="0">
              全部专业
            </a-select-option>
            <a-select-option value="1">
              专业一
            </a-select-option>
            <a-select-option value="2">
              专业二
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="节点名称：">
          <a-input style='width: 236px;height: 34px;margin-right: 20px'/>
          <div>1~100个字符</div>
        </a-form-item>
        <a-form-item label="节点名称：">
          <a-input style='width: 236px;height: 34px;margin-right: 20px'/>
          <div>单位：分钟，填0则表示无时间限制。</div>
        </a-form-item>

        <a-form-item label="状态：">
          <a-radio :value="1">
            启用
          </a-radio>
          <a-radio :value="0">
            禁用
          </a-radio>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    //创建表单
    this.form = this.$form.createForm(this, { name: 'form_in_modal' });
  },
  data() {
    return {
      visible: false,
      modelTitle: '添加',
    };
  },
  methods: {
    handleChange(value) {
      console.log(`selected ${value}`);
    },
    showModal() {
      this.visible = true;
    },
    handleCancel() {
      this.visible = false;
    },
    handleOk() {
      const form = this.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        console.log('form 表单内容: ', values);
        form.resetFields();
        this.visible = false;
      });
    },
  },
};
</script>

<style scoped>

</style>