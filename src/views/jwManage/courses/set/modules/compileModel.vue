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
      <a-card :bordered="false" @submit="handleSubmit">
        <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-form-item label="节">
            {{hxData.section}}
          </a-form-item>
          <a-form-item label="开始时间">
            <a-time-picker v-decorator="['kssj']" format="HH:mm" value-format="HH:mm" @change="onChange" />
          </a-form-item>
          <a-form-item label="结束时间：">
            <a-time-picker v-decorator="['jssj']" format="HH:mm" value-format="HH:mm" @change="onChangeS" />
          </a-form-item>
          <a-form-item label="是否排课：">
            <a-radio-group name="radioGroup" v-decorator="['status']">
              <a-radio :value="0">否</a-radio>
              <a-radio :value="1">是</a-radio>
            </a-radio-group>
          </a-form-item>
		  <a-form-item label="不排课程：">
		    	<j-select-jiaoxue-kecheng width="150px" :triggerChange="true" v-model="hxData.kcid"></j-select-jiaoxue-kecheng>
		  </a-form-item>
        </a-form>
      </a-card>
    </a-modal>
  </a-card>
</template>
<script>
import '@/assets/courses/courses.less'
import { nodeSetId,nodeSetEdit } from '@/api/kw/scheduling'
import JSelectJiaoxueKecheng from '@/components/kwglbiz/JSelectJiaoxueKecheng'
import pick from 'lodash.pick'
import moment from 'moment'
export default {
	components: {
	  JSelectJiaoxueKecheng
	},
  data() {
    return {
      width:800,
      title:'',
      visible: false,
      hxData:[],
      kssj:'',
      cId:'',
      jssj:'',
      form:this.$form.createForm(this),
    }
  },
  created() {

  },
  computed: {},
  methods: {
    compile(cId){
      this.visible = true;
      this.cId = cId
      this.getList(cId)
    },
    handleCancel() {
      this.visible = false;
    },
    handleSubmit() {

    },
    onChange(time, timeString) {
      // console.log(time, timeString);
      this.kssj = timeString
      console.log(timeString);
    },
    onChangeS(time, timeString){
      this.jssj = timeString
      console.log(timeString);
    },
    getList(cId){
      // console.log(cId)
      nodeSetId(cId).then((res) =>{
        // console.log(res.result)
        this.hxData = res.result
        this.kssj = this.hxData.kssj
        this.jssj = this.hxData.jssj;
        this.model = Object.assign({},this.hxData);
        // console.log(this.model)
        this.$nextTick(() => {
          this.form.setFieldsValue({
            // section:this.hxData.section,
            kssj:moment(this.hxData.kssj, 'HH:mm:ss'),
            status:this.hxData.status,
            jssj: moment(this.hxData.jssj, 'HH:mm:ss')
          })
          // console.log( this.$nextTick)
        });
      })
    },
    handleOk(){
      const form = this.form
      this.form.validateFields((err, values) => {
        let fsData = {}
        fsData.status = values.status
        fsData.kssj = this.kssj
        fsData.jssj = this.jssj
		fsData.kcid=this.hxData.kcid
        fsData.id = this.cId
        fsData.section = this.hxData.section
        fsData.terminalid = this.hxData.terminalid
        fsData.sort = this.hxData.sort
        // console.log('向后端发送的数据',fsData)
        nodeSetEdit(fsData).then((res) =>{
          if (res.code === 200) {
            this.$message.success("修改成功");
            // this.getList()
            this.$emit('editSuccess');
          } else {
            this.$message.warning("修改失败");
          }
        })
      })
      this.visible = false;
    }
  }
}
</script>
<style scoped>

</style>
