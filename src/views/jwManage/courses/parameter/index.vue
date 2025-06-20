<template>
  <a-card :bordered="false">
    <div v-show="false" style="border-bottom: 1px #3779CA solid;margin-bottom: 20px">
      <p style="display: inline-block;font-weight: bold;font-size: 16px;color: #999999">排课管理</p>
      <p style="display: inline-block;font-weight: bold;font-size: 16px">></p>
      <p style="display: inline-block;font-weight: bold;font-size: 16px">排课参数配置</p>
    </div>
    <div v-if="sx==0" style="margin: 0 auto;text-align: center">
      <a-spin />
    </div>
    <a-form v-if="sx==1" :form="form" :label-col="{ span: 7 }" :wrapper-col="{ span: 5 }">
      <a-form-item label="连课节数">
        <a-select v-decorator="['lkjs']" >
          <a-select-option v-for="(item,index) in numData" :key="item.id" :value="item.id">{{item.name}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="教师最大课数">
        <a-select v-decorator="['jslks']" >
          <a-select-option v-for="(item,index) in numData" :key="item.id" :value="item.id">{{item.name}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="是否强制隔天上课">
        <a-radio-group name="radioGroup" v-decorator="['gtsk']">
          <a-radio :value="0">不使用</a-radio>
          <a-radio :value="1">使用</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="是否固定教室">
        <a-radio-group name="radioGroup" v-decorator="['gdjs']">
          <a-radio :value="0">否</a-radio>
          <a-radio :value="1">是</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="结课周期（一学期多少周）">
        <a-input  v-decorator.trim="['jkzq']" />
      </a-form-item>

      <div style="text-align:center">
        <a-button @click="compileSubmit" style="background-color: #0098F8;color: #FFFFFF;width:80px;">确认</a-button>
      </div>
    </a-form>
  </a-card>
</template>
<script>
import {parameter,parameterMod} from '@/api/kw/scheduling'
import '@/assets/scss/generalStyle.less'
export default {
  data() {
    return {
      hxData:[],
      numData:[
		{ id: 1,name: 1 },
        { id: 2,name: 2 },
        { id: 3,name: 3 },
        { id: 4,name: 4 },
        { id: 5,name: 5},
        { id: 6,name: 6},
        { id: 7,name: 7},
        { id: 8,name: 8},
        { id: 9,name: 9},
        { id: 10,name: 10},
      ],
      sx:0,
      form:this.$form.createForm(this),
    }
  },
  created() {
    this.getList()
  },
  computed: {},
  methods: {
    getList(){
      this.sx=0
      parameter().then((res)=>{
        // console.log(res.result)
        this.hxData = res.result
        this.model = Object.assign({},this.hxData);
        // console.log(this.model)
        this.sx=1
        this.$nextTick(() => {
          this.form.setFieldsValue({
            lkjs:this.hxData.lkjs,
            jslks:this.hxData.jslks,
            jkzq:this.hxData.jkzq,
            gdjs:this.hxData.gdjs,
            gtsk:this.hxData.gtsk
          })
          // console.log( this.$nextTick)
        });
      })
    },
    compileSubmit(){
      const form = this.form
      this.form.validateFields((err, values) => {
        let fsData = {}
        fsData = values
        fsData.id = 1
        fsData.terminalid = 1
        // console.log('向后端发送的数据',fsData)
        parameterMod(fsData).then((res)=>{
          if (res.code === 200) {
            this.$message.success("修改成功");
            this.getList()
          } else {
            this.$message.warning("修改失败");
          }
        })
      })
    }
  }
}
</script>
<style scoped>

</style>
