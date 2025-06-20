<template>
  <a-modal
    :title="title"
    :width="width"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    okText="确认"  cancelText="取消"
  >
    <template slot="footer">
      <a-button @click="handleCancel">关闭</a-button>
    </template>
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row :gutter="24">
          <a-col :md="24" :sm="24">
            <a-form-item label="学期" :labelCol="labelCol" :wrapperCol="wrapperCol"
                         style="font-weight: bold;font-size: 30px">
<!--              <j-select-xueqi placeholder="请选择学期" v-model="gradeid" @input="changeGrade"></j-select-xueqi>-->
              <j-select-xueqi :isCurrent="true" placeholder="请选择学期" v-model="semid" :triggerChange="false"></j-select-xueqi>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24" style="height:400px;overflow-y: scroll;width: 100%;border: 1px solid #ddd">
          <table style="padding:0 20px;">
            <thead>
            <tr>
              <th class="thClass">序号</th>
              <th class="thClass">学生</th>
              <th class="thClass">学号</th>
              <th v-if="kechengList.length==0" class="thClass" style="color:red">暂无数据</th>
              <template v-for="(kecheng,kcIndex) in kechengList">
                <th class="thClass" style="min-width: 200px">{{kecheng.name}}</th>
              </template>
            </tr>
            </thead>
            <tbody>
            <template v-for="(item,index) in studentList">
              <tr>
                <td class="tdClass">
                  {{index+1}}
                </td>
                <td class="tdClass">
                  {{item.xm}}
                </td>
                <td class="tdClass">
                  {{item.xh}}
                </td>
                <td v-if="kechengList.length==0" class="tdClass" style="color:red"></td>
                <template v-for="(kecheng,kcIndex) in kechengList">
                  <td class="thClass">{{kechengChengji[kecheng.id]!=null && kechengChengji[kecheng.id][item.xh]!=null ? kechengChengji[kecheng.id][item.xh]:''}}</td>
                </template>
              </tr>
            </template>
            </tbody>
          </table>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<style lang="less" scoped>
  .thClass {
    min-width: 100px;
    line-height: 40px;
    font-weight: bold;
    text-align: center;
    font-size: 20px;
    padding: 5px;
  }

  .tdClass {
    text-align: center;
    font-size: 18px;
    line-height: 40px;
    padding: 5px;
  }
</style>

<script>
  import { httpAction, getActionStudentByClass, getAction } from '@/api/common/manage'
  import { EduListMixin } from '@/mixins/EduListMixin'
  import pick from 'lodash.pick'
  import { validateDuplicateValue } from '@/utils/util'
  import JDate from '@/components/edu/JDate'
  import JDictSelectTag from '@/components/dict/JDictSelectTag'
  import { postAction, downFile } from '@/api/common/manage'
  import JSelectGrade from '@/components/kwglbiz/JSelectGrade'
  import Handle from 'ant-design-vue/es/vc-slider/src/Handle'
  import JSelectXueqi from '@/components/kwglbiz/JSelectXueqi'

  export default {
    name: 'VeJwCjClassModal',
    mixins: [EduListMixin],
    components: {
      JSelectXueqi,
      Handle,
      JSelectGrade,
      JDate,
      JDictSelectTag
    },
    data() {
      return {
        form: this.$form.createForm(this),
        disableMixinCreated: true,
        title: '操作',
        gradeid: null,
        semid:null,
        width: '90%',
        visible: false,
        bkid: null,
        ksfs: null,
        kcmc: null,
        kechengList: [],
        kechengChengji: {},
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 }
        },
        studentList: [],
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        },
        confirmLoading: false,
        validatorRules: {},
        url: {
          add: '/kwgl/veJwChengji/add',
          edit: '/kwgl/veJwChengji/edit',
          getClassCj: '/kwgl/veJwChengji/queryClassCj',
          exportXls: '/kwgl/veJwCjBukao/exportXls',
          importExcelUrl: 'kwgl/veJwCjBukao/importExcel'
        }
      }
    },
    computed: {
      importExcelUrl: function() {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
      }
    },
	watch:{
		 semid(val){
			 console.log("bianhua",val)
			this.getChengji();
		 }
	},
    created() {
    },
    methods: {
      add() {
        this.edit({})
      },
      edit(record) {
        this.gradeid = null
        this.studentList = []
        this.kechengList = []
        this.kechengChengji = {}
        this.bjid = record.id
        this.form.resetFields()
        this.model = Object.assign({}, record)
        this.visible = true
        let that = this
        that.loading = true
        getActionStudentByClass(record.id).then().then((res) => {
          if (res.success) {
            that.studentList = res.result.list;
			this.getChengji();
          } else {
            that.$message.warning(res.message)
          }
        })
          .finally(() => {
            that.loading = false
          })
      },
      close() {
        this.$emit('close')
        this.visible = false
      },
      changeGrade(value) {
		  console.log("value",value)
        this.kechengList = []
        this.kechengChengji = {}
        let that = this
        that.loading = true
		this.semid=value;
        //gradeid: value
       this.getChengji();
      },
	  getChengji(){
		  let that = this;
		  if(!this.semid) return;
		  getAction(this.url.getClassCj, { bjid: this.model.id, semid:this.semid}).then((res) => {
		    if (res.success) {
		      that.kechengList = res.result.kechengList
		      that.kechengChengji = res.result.kechengInfo
		    } else {
		      that.$message.warning(res.message)
		    }
		  }).finally(() => {
		      that.loading = false
		    })
	  },
      handleOk() {
        // const that = this
        // // 触发表单验证
        // this.form.validateFields((err, values) => {
        //   if (!err) {
        //     that.confirmLoading = true
        //     let httpurl = ''
        //     let method = ''
        //     if (!this.model.id) {
        //       httpurl += this.url.add
        //       method = 'post'
        //     } else {
        //       httpurl += this.url.edit
        //       method = 'put'
        //     }
        //     let formData = Object.assign(this.model, values)
        //     console.log('表单提交数据', formData)
        //     httpAction(httpurl, formData, method)
        //       .then((res) => {
        //         if (res.success) {
        //           that.$message.success(res.message)
        //           that.$emit('ok')
        //         } else {
        //           that.$message.warning(res.message)
        //         }
        //       })
        //       .finally(() => {
        //         that.confirmLoading = false
        //         that.close()
        //       })
        //   }
        // })

        this.$emit('close')
        this.visible = false
      },
      handleCancel() {
        this.close()
      },
      popupCallback(row) {
        this.form.setFieldsValue(
          pick(
            row,
            'jxrwid',
            'ksxsid',
            'xzid',
            'hasexam',
            'ksid',
            'ksidDictText',
            'ksrq',
            'falid',
            'specid',
            'gradeid',
            'semid',
            'kcid',
            'stuid',
            'userid',
            'xh',
            'xm',
            'xzbid',
            'jxbid',
            'ksrqsj',
            'pscj',
            'fslkscj',
            'djlkscj',
            'kccj',
            'kcdjcjm',
            'jgcj',
            'sfjg',
            'teacherid',
            'rkjsgh',
            'recorduserid',
            'cjlrrh',
            'cjlrrqsj',
            'auditstatus',
            'audituserid',
            'audittime',
            'audittid',
            'terminalid'
          )
        )
      },

      putout(fileName) {
        if (!fileName || typeof fileName != 'string') {
          fileName = this.kcmc + '-补考成绩信息'
        }
        let param = {
          bkId: this.bkid
        }
        console.log('导出参数', param)
        downFile(this.url.exportXls, param).then((data) => {
          if (!data) {
            this.$message.warning('文件下载失败')
            return
          }
          if (typeof window.navigator.msSaveBlob !== 'undefined') {
            window.navigator.msSaveBlob(new Blob([data], { type: 'application/vnd.ms-excel' }), fileName + '.xls')
          } else {
            let url = window.URL.createObjectURL(new Blob([data], { type: 'application/vnd.ms-excel' }))
            let link = document.createElement('a')
            link.style.display = 'none'
            link.href = url
            link.setAttribute('download', fileName + '.xls')
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link) //下载完成移除元素
            window.URL.revokeObjectURL(url) //释放掉blob对象
          }
        })
      }
    }
  }
</script>