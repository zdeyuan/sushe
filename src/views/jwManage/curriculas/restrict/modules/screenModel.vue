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
            <a-form-item label="选课模式" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
              <a-select default-value="1" style="margin-right: 15px">
                <a-select-option value="1">
                  请选择学期
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="系部/专业限选门数" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
              <a-select default-value="1" style="width: 110px;">
                <a-select-option value="1">
                  请选择学期
                </a-select-option>
              </a-select>
              -
              <a-select default-value="1" style="width: 110px;">
                <a-select-option value="1">
                  请选择学期
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="限选系部/专业" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
              <a-select default-value="1" style="width: 110px;">
                <a-select-option value="1">
                  请选择学期
                </a-select-option>
              </a-select>
              -
              <a-select default-value="1" style="width: 110px;">
                <a-select-option value="1">
                  请选择学期
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="8">
            <a-form-item label="限制班级" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
              <a-select default-value="1" style="margin-right: 15px">
                <a-select-option value="1">
                  请选择学期
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="限制学生" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
              <a-select default-value="1" style="margin-right: 15px">
                <a-select-option value="1">
                  请选择学期
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="限制性别" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
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
            <a-form-item label="描述" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
              <a-input />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="排序码" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
              <a-input />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="创建时间" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
              <a-range-picker @change="onChange" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="8">
            <a-form-item label="最后修改时间" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
              <a-range-picker @change="onChange" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="是否有效" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
              <a-select default-value="1" style="margin-right: 15px">
                <a-select-option value="1">
                  请选择学期
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="删除时间" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
              <a-range-picker @change="onChange" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="8">
            <a-form-item label="创建者名称" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
              <a-input />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="课程" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
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
      width:1200,
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
    onChange(value) {
      console.log('changed', value);
    },
  }
}
</script>
<style scoped>

</style>
