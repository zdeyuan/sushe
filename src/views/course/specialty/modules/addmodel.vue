<template>
  <div>
    <!--添加按钮和模态框-->
    <a-button @click="showModal" type="primary" style='background-color: #00BAD0;height: 34px;border: none'><a-icon type="plus" />添加</a-button>
    <a-modal
      width='80%'
      :visible="visible"
      :title= "modelTitle"
      okText='确认'
      cancel-text="取消"
      @cancel="handleCancel"
      @ok="handleOk">
      <a-form layout='vertical' :form="form" style='position: relative'>
        <a-input style='width: 236px;height: 34px;margin-right: 20px' placeholder="请输入用户名或姓名" />

        <a-select default-value="lucy" style="width: 140px;height: 34px;margin-right: 20px" @change="handleChange">
          <a-select-option value="jack">
            全部专业
          </a-select-option>
          <a-select-option value="lucy">
            专业一
          </a-select-option>
          <a-select-option value="disabled">
            专业二
          </a-select-option>
        </a-select>

          <a-select default-value="lucy" style="width: 140px;height: 34px;margin-right: 20px" @change="handleChange">
            <a-select-option value="jack">
              全部角色
            </a-select-option>
            <a-select-option value="lucy">
              角色一
            </a-select-option>
            <a-select-option value="disabled">
              角色二
            </a-select-option>
          </a-select>

          <a-select default-value="lucy" style="width: 140px;height: 34px;margin-right: 20px" @change="handleChange">
            <a-select-option value="jack">
              教师
            </a-select-option>
            <a-select-option value="lucy">
              教师一
            </a-select-option>
            <a-select-option value="disabled">
              教师二
            </a-select-option>
          </a-select>

          <a-select default-value="lucy" style="width: 140px;height: 34px;margin-right: 20px" @change="handleChange">
            <a-select-option value="jack">
              全部机构
            </a-select-option>
            <a-select-option value="lucy">
              机构一
            </a-select-option>
            <a-select-option value="disabled">
              机构二
            </a-select-option>
          </a-select>
        <div style='position: absolute;right: 0;top: 0px;right: 70px'>
          <a-button style='width: 100px;height: 34px;background-color: #028BE2;color: white;margin-right: 20px'>搜索</a-button>
          <a-button style='width: 100px;height: 34px;background-color: #66C3FD;color: white'><a-icon type="sync" />清空</a-button>
        </div>


      </a-form>
    </a-modal>
  </div>
</template>

<script>
export default {
  //el 创建前
  beforeCreate() {
    //创建表单
    this.form = this.$form.createForm(this, { name: 'form_in_modal' });
  },
  data() {
    return {
      visible: false,
      modelTitle: '请选择',
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
