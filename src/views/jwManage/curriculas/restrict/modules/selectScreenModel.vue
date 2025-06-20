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
      :visible="visible">

      <a-form :form="form" :label-col = "{ span:4 }" :wrapper-col = "{ span:16 }">
        <a-row>
          <a-col :span="8">
            <a-form-item label="学号" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
              <a-input />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="姓名" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
              <a-input />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="英文姓名" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
              <a-input />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="8">
            <a-form-item label="性别" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
              <a-select default-value="1" style="margin-right: 15px">
                <a-select-option value="1">
                  请选择学期
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="入学年份" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
              <a-select default-value="1" style="margin-right: 15px">
                <a-select-option value="1">
                  请选择学期
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="院系" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
              <a-select default-value="1" style="margin-right: 15px">
                <a-select-option value="1">
                  请选择学期
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="8">
            <a-form-item label="专业" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
              <a-select default-value="1" style="margin-right: 15px">
                <a-select-option value="1">
                  请选择学期
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="班级" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
              <a-select default-value="1" style="margin-right: 15px">
                <a-select-option value="1">
                  请选择学期
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="就读方式" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
              <a-select default-value="1" style="margin-right: 15px">
                <a-select-option value="1">
                  请选择学期
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="8">
            <a-form-item label="状态" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
              <a-input />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="创建时间" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
              <a-range-picker @change="onChange" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="民族" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
              <a-select default-value="1" style="margin-right: 15px">
                <a-select-option value="1">
                  请选择学期
                </a-select-option>
              </a-select>
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
      width:1000,
      title:'',
      visible: false,
      form:this.$form.createForm(this),
    }
  },
  created() {

  },
  computed: {},
  components: {},
  methods: {
    scre(){
      this.visible = true;
    },
    handleCancel() {
      this.visible = false;
    },
    handleOk(){
      this.visible = false;
    },
  }
}
</script>
<style scoped>

</style>
