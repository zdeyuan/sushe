<template>
  <!--@ok="handleOk"-->

  <!--cancelText="关闭"-->
  <a-modal
    :title="title"
    :width="width"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭"
  >
    <a-spin :spinning="confirmLoading">
      <a-form id="formDiv" :form="form">
        <a-col :md="24" :sm="24">
          <a-form-item label="专业部" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <j-select-zyb placeholder="请选择专业部" v-model="dataObj.zyb" @input="zybChange"></j-select-zyb>
          </a-form-item>
        </a-col>
        <a-col :md="24" :sm="24">

          <a-form-item label="专业" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <j-select-zy-by-zyb ref="zyByZyb" placeholder="请选择专业" v-model="dataObj.zy"
                                @input="zyChange"></j-select-zy-by-zyb>
          </a-form-item>
        </a-col>
        <a-col :md="24" :sm="24">
          <a-form-item label="班级" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <j-select-banji-by-zy ref="banjiByZy" placeholder="请选择班级" v-model="dataObj.bj"
                                  @input="changeBanji"></j-select-banji-by-zy>
          </a-form-item>
        </a-col>
        <a-col :md="24" :sm="24">
          <a-form-item label="职业认证考试" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <edu-data v-model="queryParam.zyksid" stype="select" :datas="zyksList" textKey="name" dtype="datas" />
          </a-form-item>
        </a-col>
        <a-col :md="24" :sm="24">
          <a-form-item label="导出名单" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-button @click="dcExcel" >导出名单</a-button>
          </a-form-item>
        </a-col>
        <a-col :md="24" :sm="24">
          <a-form-item label="导入成绩" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <input style="height: 40px" type="file" id="inputFile" accept=".xls,.xlsx"></input>
          </a-form-item>
        </a-col>
        <a-col :md="24" :sm="24" style="padding: 40px">
          <div style="height: 160px; background-color: #e5f3fc; padding: 10px; color: #5f91af">
            <span>温馨提示</span> <br/><br/>
            <span
            >①1.根据行政班信息，先导出学员名单，录入成绩后，再将学员名单导入。</span
            ><br/>
            <span>②若无相关成绩信息，成绩需填写0。</span><br/>
          </div>
        </a-col>
        <!--        <a-row :md="24" :sm="24">-->
        <!--          -->
        <!--        </a-row>-->
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>

  import { httpAction, getAction,downFile, getActionStudentPageList } from '@/api/common/manage'
  import pick from 'lodash.pick'
  import { validateDuplicateValue } from '@/utils/util'
  import JDate from '@/components/edu/JDate'
  import JSelectZyb from '@/components/kwglbiz/JSelectZyb'
  import JSelectZyByZyb from '@/components/kwglbiz/JSelectZyByZyb'
  import JSelectBanjiByZy from '@/components/kwglbiz/JSelectBanjiByZy'
  import ARadioGroup from 'ant-design-vue/es/radio/Group'

  export default {
    name: 'VeJwCjZhiyeExcelImportModal',
    components: {
      ARadioGroup,
      JSelectBanjiByZy,
      JSelectZyByZyb,
      JSelectZyb,
      JDate
    },
    data() {
      return {
        form: this.$form.createForm(this),
        title: '操作',
        width: 800,
        visible: false,
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        },
        columns: [
          {
            title: '序号',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: 'center',
            customRender: function(t, r, index) {
              return parseInt(index) + 1
            }
          },
          {
            title: '姓名',
            align: 'center',
            dataIndex: 'xm',
            width: 150
          },
          {
            title: '证书号',
            align: 'center',
            width: 100,
            dataIndex: 'zsh',
            scopedSlots: { customRender: 'zsh' }
          },
          {
            title: '准考证号',
            align: 'center',
            width: 100,
            dataIndex: 'zkzh',
            scopedSlots: { customRender: 'zkzh' }
          },
          {
            title: '理论成绩',
            align: 'center',
            dataIndex: 'llcj',
            width: 100,
            scopedSlots: { customRender: 'llcj' }
          },
          {
            title: '实操成绩',
            align: 'center',
            width: 100,
            dataIndex: 'sccj',
            scopedSlots: { customRender: 'sccj' }
          },
          {
            title: '考试成绩',
            align: 'center',
            width: 100,
            dataIndex: 'kscj',
            scopedSlots: { customRender: 'kscj' }
          },
          {
            title: '评定结果',
            align: 'center',
            dataIndex: 'ispass',
            scopedSlots: { customRender: 'ispass' }
          }
        ],
        confirmLoading: false,
        validatorRules: {
          zyksid: {
            rules: [
              { required: true, message: '请输入职业认证考试ID!' }
            ]
          }
        },
		zyksList:[],
        url: {
          add: '/edu-schedule/jingsaiProject/veJwCjZhiye/add',
          batchAddOrEdit: '/edu-schedule/jingsaiProject/veJwCjZhiye/batchAddOrEdit',
          getXueshengCj: '/edu-schedule/jingsaiProject/veJwCjZhiye/getXueshengCj',
          exportXlsUrl: '/edu-schedule/jingsaiProject/veJwCjZhiye/exportXlsBanji',
          importExcelUrl: '/edu-schedule/jingsaiProject/veJwCjZhiye/importExcel',
        },
        studentList: [],
        dataObj: { zyb: '', zy: '', bj: '', ks: '' }
      }
    },
    created() {
		this.getZyrz();
    },
    methods: {
      dcExcel(){
        let fileName = '班级名单';
        let that=this;
        if (this.dataObj.zyb == '') {
          that.$message.warning('请选择专业部')
          return
        }
        if (this.dataObj.zy == '') {
          that.$message.warning('请选择专业')
          return
        }
        if (this.dataObj.bj == '') {
          that.$message.warning('请选择班级')
          return
        }
        if (this.dataObj.ks == '') {
          that.$message.warning('请选择职业考试')
          return
        }
        // let paramsStr = encodeURI(JSON.stringify({xzbid:this.dataObj.bj,zyksid:this.dataObj.ks}))
        // let url = `${window._CONFIG['domianURL']}/${this.url.exportXlsUrl}?paramsStr=${paramsStr}`
        // window.location.href = url;
        if (!fileName || typeof fileName != 'string') {
          fileName = '导出文件'
        }
        let param = {xzbid:this.dataObj.bj,zyksid:this.dataObj.ks}

        console.log('导出参数', param)
        downFile(this.url.exportXlsUrl, param).then((data) => {
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
      },
      add() {
        this.edit({})
      },
	  getZyrz(){
	  	getAction('/edu-schedule/jingsaiProject/veJwKsZhiye/select').then(
	  	res => {
	  		this.zyksList = []
	  		if (res.code == 200) {
	  			this.zyksList=res.result;
	  		}
	  	
	  	}).catch(err => {
	  		
	  	})
	  },
      changeBanji() {
        let that = this
        that.studentList = []
        if (this.dataObj.bj == '' || this.dataObj.ks == '') {
          return
        }
        getAction(this.url.getXueshengCj, { id: this.dataObj.bj, ksid: this.dataObj.ks }).then((res) => {
          if (res.success) {
            let array = res.result
            if (array == null || array.length == 0) {
              that.$message.warning('行政班下无学生信息')
              return
            }
            that.studentList = array
          } else {
            that.$message.warning(res.message)
          }
        }).catch(error => {

        })
        // getActionStudentPageList({ id: bjid,pageSize:9999}).then((res) => {
        //   if (res.success) {
        //     let array = res.result.list;
        //     if(array == null || array.length == 0){
        //       that.$message.warning("行政班下无学生信息");
        //       return;
        //     }
        //     for(let i=0;i<array.length;i++){
        //       array[i].zkzh='';
        //       array[i].zsh='';
        //       array[i].llcj=null;
        //       array[i].sccj=null;
        //       array[i].kscj=null;
        //       array[i].ispass=1;
        //     }
        //     that.studentList=array;
        //   } else {
        //     that.$message.warning(res.message)
        //   }
        // }).catch(error => {
        //   reject(error)
        // })
      },
      select(record) {
        this.dataObj = record
        this.studentList = []
        this.student = null
        this.visible = true
      },
      zybChange(code) {
        if (this.$refs.zyByZyb != null) {
          this.$refs.zyByZyb.initDictData(code)
        }
      },
      zyChange(code) {
        if (this.$refs.banjiByZy != null) {
          this.$refs.banjiByZy.initDictData(code)
        }
      },
      close() {
        this.$emit('close')
        this.visible = false
      },
      handleOk() {
        const that = this
        if( document.getElementById("inputFile").files == null ||document.getElementById("inputFile").files.length == 0 ){
          that.$message.warning('未选择文件')
          return;
        }
        let formData = new FormData();
        let fileObj = document.getElementById("inputFile").files[0];
        formData.append('file', fileObj);
        that.confirmLoading = true
        let httpurl = ''
        let method = ''
        httpurl += this.url.importExcelUrl
        method = 'post'
        httpAction(httpurl, formData, method).then((res) => {
          if (res.success) {
            that.$message.success(res.message)
            that.$emit('ok')
            that.close()
          } else {
            that.$message.warning(res.message)
          }
        }).finally(() => {
          that.confirmLoading = false
        })
      },
      handleCancel() {
        this.close()
      },
      popupCallback(row) {
      }
    }
  }
</script>