<template>
  <a-modal
    title="申请调课"
    :width="740"
    :visible="visible"
    @ok="
      () => {
        handleSubmit()
      }
    "
    @cancel="
      () => {
        handleCancel()
      }
    "
  >
    <a-spin :spinning="loading">
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        class="form-model"
      >
        <a-form-model-item label="原上课时间" prop="yskrq">
			<DatePickByCN
			   v-model="form.yskrq"
			  placeholder="请选择原上课日期"  @change="handleOldDateChange"/>
         <!-- <a-date-picker
            v-model="form.yskrq"
            format="YYYY-MM-DD"
            value-format="X"
            placeholder="请选择原上课日期"
            @change="handleOldDateChange"
          /> -->
          <span class="form-item__tip">请选择一个周{{ form.yweek }}的上课日期!</span>
        </a-form-model-item>
        <a-form-model-item label="原上课周" prop="yweek">
          <div class="form-item__val">{{ form.yweek | weekFilter(weekData) }}</div>
        </a-form-model-item>
        <a-form-model-item label="原上课节" prop="section">
          <div class="form-item__val">{{ form.ysection }}</div>
        </a-form-model-item>
        <a-form-model-item label="原上课教室" prop="jsmc">
          <a-input placeholder="暂无教室" v-model="form.jsmc" disabled />
        </a-form-model-item>
        <a-form-model-item label="课程名称" prop="kcmc">
          <a-input placeholder="暂无课程" v-model="form.kcmc" disabled />
        </a-form-model-item>

        <a-form-model-item label="新上课周" prop="xweek">
          <a-select v-model="form.xweek" placeholder="请选择新上课周" @change="handleWeekChange">
            <a-select-option v-for="item in weekData" :key="item.id" :value="item.id">{{
              item.weekName
            }}</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="新上课节" prop="xsection">
          <a-select
            v-model="form.xsection"
            placeholder="请选择新上课节"
            @change="handleSectitonChange"
            :disabled="!form.xweek"
          >
            <a-select-option
              v-for="item in nodeData"
              :key="item.id"
              :value="item.id"
              :disabled="form.xweek == form.yweek && item.id == form.section"
              >{{ item.section }}</a-select-option
            >
          </a-select>
        </a-form-model-item>

        <a-form-model-item label="新上课时间" prop="xskrq">
			<DatePickByCN
			   v-model="form.xskrq"
			   :disabled="!form.xweek"
			  placeholder="请选择新上课日期"  @change="handleNewDateChange"/>
          <span class="form-item__tip">请选择一个周{{ form.xweek }}的上课日期!</span>
        </a-form-model-item>

        <a-form-model-item label="上课教室" prop="campusId" class="form-item">
          <a-select class="form-item__control" v-model="campusId" placeholder="请选择校区" @change="handleCampusChange">
            <a-select-option v-for="item in campusData" :key="item.id" :value="item.id">{{
              item.xqmc
            }}</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item prop="buildId" class="form-item" :wrapper-col="{ span: 14, offset: 6 }">
          <a-select class="form-item__control" v-model="buildId" placeholder="请选择楼栋" @change="handleBuildChange">
            <a-select-option v-for="item in buildingData" :key="item.id" :value="item.id">{{
              item.jzwmc
            }}</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item prop="xjsid" class="form-item" :wrapper-col="{ span: 14, offset: 6 }">
          <a-select class="form-item__control" v-model="form.xjsid" placeholder="请选择教室">
             <a-select-option v-for="item in classRoomData" :key="item.id" :value="item.id">{{
              item.jsmc
            }}</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="调课类型" prop="applytype" class="form-item">
          <a-select class="form-item__control" v-model="form.applytype" placeholder="请选择调课类型">
            <a-select-option :value="1">因公</a-select-option>
            <a-select-option :value="2">因私</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="调课理由" prop="applyreason" class="form-item">
          <a-textarea v-model="form.applyreason" :rows="4" placeholder="请输入调课理由" />
        </a-form-model-item>
      </a-form-model>
    </a-spin>
  </a-modal>
</template>
<script>
import { apiScheduleClassSwitchTiaoke } from '@/api/schedule/index'
import { queryCampusList} from '@/api/base/common-veCommon'
import {queryBuildListByCampusId, getClassRoomList } from '@/api/schedule/pub'

import { childSycId } from '@/config'
import { mapGetters } from 'vuex'
import moment from 'moment'
export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    isAdd: {
      type: Boolean,
      default: true,
    },
    model: {
      type: Object,
      default: () => null,
    },
    classInfo: {
      type: Object,
      default: () => null,
    },
    weekData: {
      type: Array,
      default: () => {
        return []
      },
    },
    nodeData: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 14,
      },
      form: {
        applyreason: '', //调课理由
        applytype: 1, //调课类型
        // id: 0,
        jsjgh: '', //	教师教工号
        kcid: 0, //	课程ID
        kxh: '', //课序号
        oldkcid: 0, //	对调课的课程ID
        section: '', //原上课节（可能连节）
        semid: 0, //学期Id
        skxzbdm: '', //上课教学班代码
        teacherid: 0, //任课教师用户ID
        terminalid: 0, //终端ID

        xjsh: '', ///新上课教室号
        xjsid: undefined, //新上课教室ID
        xsection: undefined, //新上课节（连节）
        xskrq: null, //新上课日期
        xweek: undefined, //新上课周
        yjsh: '', //	原上课教室号
        yjsid: undefined, //原教室ID
        yskrq: null, //原上课日期
        yweek: 0, //原上课周
      },
      campusId: undefined,
      buildId: undefined,
      campusData: [], //校区列表
      buildingData: [], //楼栋列表
      classRoomData: [], //教室列表

      loading: false,
      title: '',
    }
  },
  created() {
    if (this.model) {
      this.form = {
        ...this.form,
        ...this.model
      }
    }

    this.buildId = this.model.jzid
    this.campusId = this.classInfo.campusId

    this.title = !this.isAdd ? '编辑' : '新增'
    
    this.getCampusList()
    
  },
  filters: {
    weekFilter(val, list) {
      let _obj = list.find((item) => item.id == val)
      return _obj ? _obj.weekName : '-'
    },
  },
  computed: {
    rules() {
      return {
        yskrq: [
          {
            required: true,
            message: '请选择原上课时间',
            trigger: 'change',
          },
        ],
        xweek: [
          {
            required: true,
            message: '请选择新上课周',
            trigger: 'change',
          },
        ],

        xsection: [
          {
            required: true,
            message: '请选择新上课节',
            trigger: 'change',
          },
        ],

        xskrq: [
          {
            required: true,
            message: '请选择新上课日期',
            trigger: 'change',
          },
        ],
        campusId: [
          {
            required: false,
            message: '请选择校区',
            trigger: 'change',
          },
        ],
        buildId: [
          {
            required: false,
            message: '请选择楼栋',
            trigger: 'change',
          },
        ],
        xjsid: [
          {
            required: false,
            message: '请选择教室',
            trigger: 'change',
          },
        ],
      }
    },
  },
  methods: {
    // 时间控件
    moment,
    // 原日期修改
    handleOldDateChange(date,dateString) {
      const _this = this
      let week = moment(date).isoWeekday()
      if (week != this.form.yweek) {
        this.$message.warning({
          content: `请选择一个周${this.form.yweek}的上课日期!`,
          duration: 1,
          onClose: () => {
            _this.form.yskrq = null
          },
        })
      }
    },
    //  新上课周修改
    handleWeekChange(val){
      this.form.xsection = undefined
      this.form.xskrq = null
    },
    // 新上课节修改
    handleSectitonChange(val) {
      if (!this.form.xweek) {
        this.form.xsection = undefined
        this.$message.warning('先选择新上课周')
        return
      }
    },
    // 新上课日期修改
    handleNewDateChange(date,dateString) {
      const _this = this
      let week = moment(date).isoWeekday()
      if (week != this.form.xweek) {
        this.$message.warning({
          content: `请选择一个周${this.form.xweek}的上课日期!`,
          duration: 1,
          onClose: () => {
            _this.form.xskrq = null
          },
        })
      }
    },

    // 获取校区
    getCampusList() {
      queryCampusList().then((res) => {
        if (res.code == 200) {
          this.campusData = res.result || [];
		  this.getBuildList()
        }
      })
    },
    handleCampusChange() {
      this.buildId = undefined;
      this.form.xjsid = undefined;
      this.getBuildList()
    },
    // 获取楼栋
    getBuildList() {
      queryBuildListByCampusId(this.campusId).then((res) => {
        if (res.code == 200) {
         this.buildingData = res.result.records || []
          this.getClassRoomList()
        }
      })
    },
    // 楼栋修改获取教室
    handleBuildChange(val) {
       this.form.xjsid = undefined
      this.getClassRoomList()
    },
    // 获取教室
    getClassRoomList() {
       let params = {
        campusid: this.campusId,
        jzid:this.buildId
      }
      getClassRoomList(params).then((res) => {
        if (res.code == 200) {
          this.classRoomData = res.result.records || []
        }
      })
    },
    // 提交
    handleSubmit() {
      // delete this.form.campusId;
      // delete this.form.buildId;
      // delete this.form.buildName;

      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.form.yskrq = +this.form.yskrq;
          this.form.xskrq = +this.form.xskrq;
          this.loading = true
          apiScheduleClassSwitchTiaoke.create({
            ...this.form,
          }).then((res) => {
            this.loading = false
            if (res.code == 200) {
                // const h = this.$createElement
              this.$success({
                title: '提示',
                // content: h('div', { class: ['model-info'] }, [
                //   h('i', { class: ['icon-success'] }),
                //   h('p', '提交成功，请等待审核'),
                // ]),
                content:'提交成功，请等待审核',
                okText:'确定',
                onOk() {},
              })
              this.$emit('ok')
            } else {
            
              this.$message.warning("调课申请失败，请重新申请")
            }
          })
        } else {
          return false
        }
      })
    },
    handleCancel() {
      this.$emit('cancel')
    },
  },
}
</script>
<style lang="less" scoped>
.form-model {
  /deep/ .ant-form-item {
    margin-bottom: 10px;
  }
}
.form-item {
  &__tip {
    padding-left: 10px;
  }
}
</style>
