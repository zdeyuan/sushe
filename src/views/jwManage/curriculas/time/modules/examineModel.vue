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
      <a-form :form="form" :label-col="{ span:12 }" :wrapper-col="{ span:24 }">
        <a-row>
          <a-col :span="12">
            <a-form-item label="学期" :label-col="{ span: 8 }" :wrapper-col="{ span: 10 }">
              <a-select default-value="1" style="width: 100%">
                <a-select-option value="1">
                  1
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="停止选课时间" :label-col="{ span: 8 }" :wrapper-col="{ span: 10 }">
              <a-date-picker @change="onChange" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item label="预计结束月日期" :label-col="{ span: 8 }" :wrapper-col="{ span: 10 }">
              <a-date-picker @change="onChange" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="排序码" :label-col="{ span: 8 }" :wrapper-col="{ span: 10 }">
              <a-input-number style="width: 100%" id="NumS" :min="0" @change="onChange"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col>
            <a-form-item label="是否有效" :label-col="{ span: 4 }" :wrapper-col="{ span: 1 }">
              <a-switch default-checked @change="onChange" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col>
            <a-form-item label="指定周" :label-col="{ span: 4 }" :wrapper-col="{ span: 17 }">
              <a-input />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
  </a-card>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      width:800,
      title:'',
      visible: false,
      form:this.$form.createForm(this),
      stateId:'',
      state: { props:{ disabled: '' } },
    }
  },
  created() {

  },
  computed: {},
  components: {},
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
    onChange(value) {
      console.log('changed', value);
    },
  }
}
</script>
<style scoped>

</style>
