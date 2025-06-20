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
           <edu-data v-model="dataObj.ks" stype="select" :datas="zyksList" textKey="name" dtype="datas" />
          </a-form-item>
        </a-col>
        <a-col :md="24" :sm="24" v-if="studentList.length>0">
          <div style="height: 40px; background-color: #66c3fe; padding: 10px; color: white; margin: 10px">
            <span>学生列表（共{{studentList.length}}名学生）</span>
          </div>
        </a-col>
        <a-col :md="24" :sm="24" v-if="studentList.length>0" style=" padding:0 10px;">
          <a-table
            ref="table"
            size="middle"
            bordered
            rowKey="id"
            :columns="columns"
            :dataSource="studentList"
          >
            <template slot="zsh" slot-scope="text, record">
              <a-input v-model="record.zsh"></a-input>
            </template>
            <template slot="zkzh" slot-scope="text, record">
              <a-input v-model="record.zkzh"></a-input>
            </template>
            <template slot="kscj" slot-scope="text, record">
              <a-input v-model="record.kscj"></a-input>
            </template>
            <template slot="sccj" slot-scope="text, record">
              <a-input v-model="record.sccj"></a-input>
            </template>
            <template slot="llcj" slot-scope="text, record">
              <a-input v-model="record.llcj"></a-input>
            </template>
            <template slot="ispass" slot-scope="text, record">
              <a-radio-group v-model="record.ispass">
                <a-radio :value="1">通过</a-radio>
                <a-radio :value="0">不通过</a-radio>
              </a-radio-group>
            </template>
          </a-table>

        </a-col>
        <!--        <a-row :md="24" :sm="24">-->
        <!--          -->
        <!--        </a-row>-->
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>

  import { httpAction,getAction, getActionStudentPageList } from '@/api/common/manage'
  import pick from 'lodash.pick'
  import { validateDuplicateValue } from '@/utils/util'
  import JDate from '@/components/edu/JDate'
  import JSelectZyb from '@/components/kwglbiz/JSelectZyb'
  import JSelectZyByZyb from '@/components/kwglbiz/JSelectZyByZyb'
  import JSelectBanjiByZy from '@/components/kwglbiz/JSelectBanjiByZy'
  import ARadioGroup from 'ant-design-vue/es/radio/Group'

  export default {
    name: 'VeJwCjZhiyeExcelBatchModal',
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
        width: 1000,
        visible: false,
        model: {},
		zyksList:[],
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        },
        columns:[
          {
            title: '序号',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: "center",
            customRender: function (t, r, index) {
              return parseInt(index) + 1;
            }
          },
          {
            title: '姓名',
            align: 'center',
            dataIndex: 'xm',
            width:150,
          },
          {
            title: '证书号',
            align: 'center',
            width:100,
            dataIndex: 'zsh',
            scopedSlots: { customRender: 'zsh' },
          },
          {
            title: '准考证号',
            align: 'center',
            width:100,
            dataIndex: 'zkzh',
            scopedSlots: { customRender: 'zkzh' },
          },
          {
            title: '理论成绩',
            align: 'center',
            dataIndex: 'llcj',
            width:100,
            scopedSlots: { customRender: 'llcj' },
          },
          {
            title: '实操成绩',
            align: 'center',
            width:100,
            dataIndex: 'sccj',
            scopedSlots: { customRender: 'sccj' },
          },
          {
            title: '考试成绩',
            align: 'center',
            width:100,
            dataIndex: 'kscj',
            scopedSlots: { customRender: 'kscj' },
          },
          {
            title: '评定结果',
            align: 'center',
            dataIndex: 'ispass',
            scopedSlots: { customRender: 'ispass' },
          },
        ],
        confirmLoading: false,
        validatorRules: {
          zyksid: {
            rules: [
              { required: true, message: '请输入职业认证考试ID!' }
            ]
          }
        },
        url: {
          add: '/edu-schedule/jingsaiProject/veJwCjZhiye/add',
          batchAddOrEdit: '/edu-schedule/jingsaiProject/veJwCjZhiye/batchAddOrEdit',
          getXueshengCj: '/edu-schedule/jingsaiProject/veJwCjZhiye/getXueshengCj',
        },
        studentList:[],
        dataObj: { zyb: '', zy: '', bj: '', ks: '' }
      }
    },
    created() {
		this.getZyrz();
    },
    methods: {
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
        let that=this;
        that.studentList=[];
        if(this.dataObj.bj == '' || this.dataObj.ks == ''){
          return;
        }
        getAction(this.url.getXueshengCj,{ id: this.dataObj.bj,ksid:this.dataObj.ks}).then((res) => {
          if (res.success) {
            let array = res.result;
            if(array == null || array.length == 0){
              that.$message.warning("行政班下无学生信息");
              return;
            }
            that.studentList=array;
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
        this.dataObj = record;
        this.studentList=[];
        this.student = null;
        this.visible = true;
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
        const that = this;
        if(this.dataObj.zyb ==''){
          that.$message.warning("请选择专业部");
          return;
        }
        if(this.dataObj.zy ==''){
          that.$message.warning("请选择专业");
          return;
        }
        if(this.dataObj.bj ==''){
          that.$message.warning("请选择班级");
          return;
        }
        if(this.dataObj.ks ==''){
          that.$message.warning("请选择职业考试");
          return;
        }
        if(this.studentList.length == 0){
          that.$message.warning("无相关学生数据");
          return;
        }

        that.confirmLoading = true
        let httpurl = ''
        let method = ''
        httpurl += this.url.batchAddOrEdit
        method = 'put'
        httpAction(httpurl, this.studentList, method).then((res) => {
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