<template>
  <a-card :bordered="false">
    <a-modal :title="title" :width="width" placement="right" @cancel="onCancel" @ok="submit" :visible.sync="value">
      <a-form-model ref="form" :model="form" :label-col="{ span: 12 }" :wrapper-col="{ span: 24 }">
        <a-row>
          <a-col :span="12">
            <a-form-model-item  prop="msid" required :rules="[{ required: true, message: '请选择选课模式' }]"  label="选课模式" :label-col="{ span: 8 }" :wrapper-col="{ span: 10 }">
              <a-select v-model="form.msid" style="width: 100%" placeholder="请选择选课模式">
                <a-select-option :value="item.id" v-for="item in modelList" :key="item.id">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="系部限选门数" prop="gatecount" required :rules="[{ required: true, message: '请输入系部限选门数' }]"  :label-col="{ span: 8 }" :wrapper-col="{ span: 10 }">
              <a-input-number v-model="form.gatecount" style="width: 100%" id="gatecount" :min="0" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="专业限选门数" prop="gatecountspec" required :rules="[{ required: true, message: '请输入专业限选门数' }]" :label-col="{ span: 8 }" :wrapper-col="{ span: 10 }">
              <a-input-number v-model="form.gatecountspec" style="width: 100%" id="gatecountspec" :min="0" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="限选院系" prop="falid" required :rules="[{ required: true, message: '请选择院系' }]" :label-col="{ span: 8 }" :wrapper-col="{ span: 10 }">
              <a-select v-model="form.falid" style="width: 100%" placeholder="请选择院系">
                <a-select-option :value="item.id" v-for="item in facultyList" :key="item.id">
                  {{ item.yxmc }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="限选专业" prop="specid" required :rules="[{ required: true, message: '请选择专业' }]" :label-col="{ span: 8 }" :wrapper-col="{ span: 10 }">
              <a-select v-model="form.specid" style="width: 100%" :disabled="!form.falid" placeholder="请选择专业">
                <a-select-option :value="item.id" v-for="item in specialtyList" :key="item.id">
                  {{ item.zymc }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="限选班级" prop="bjid" required :rules="[{ required: true, message: '请选择班级' }]"  :label-col="{ span: 8 }" :wrapper-col="{ span: 10 }">
              <a-select v-model="form.bjid" style="width: 100%" :disabled="!form.specid" placeholder="请选择班级">
                <a-select-option :value="item.id" v-for="item in banJiList" :key="item.id">
                  {{ item.xzbmc }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="限选年级" prop="gradeid" required :rules="[{ required: true, message: '限选年级' }]"  :label-col="{ span: 8 }" :wrapper-col="{ span: 10 }">
              <a-select v-model="form.gradeid" style="width: 100%" placeholder="请选择年级">
                <a-select-option :value="item.id" v-for="item in nianjiList" :key="item.id">
                  {{ item.njmc }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="限选学生" :label-col="{ span: 8 }" :wrapper-col="{ span: 10 }">
              <a-input @click="handleSelect" v-model="form.stuname" placeholder="请输入学生姓名" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="限选性别" :label-col="{ span: 8 }" :wrapper-col="{ span: 10 }">
             <j-dict-select-tag v-model="form.sex" placeholder="请选择性别" dictCode="sex"/>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="排序码" :label-col="{ span: 8 }" :wrapper-col="{ span: 10 }">
              <a-input-number
                v-model="form.ordernum"
                style="width: 100%"
                id="NumS"
                :min="0"
                placeholder="请输入排序码"
              />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="是否为合班班级" :label-col="{ span: 8 }" :wrapper-col="{ span: 1 }">
              <ZmSwitch v-model="form.jointclass"></ZmSwitch>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col>
            <a-form-model-item label="描述" :label-col="{ span: 4 }" :wrapper-col="{ span: 17 }">
              <a-input placeholder="请输入描述,最多200个字" :maxLength="200" v-model="form.remark" />
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </a-modal>
    <select-model
      ref="selectModel"
      :multiple="true"
      :visible="studentVisible"
      :select-ids="studentIds"
      :select-vals="studentVals"
      v-if="studentVisible"
      @cancel="handleSelectCancel"
      @ok="handleSelectOk"
    ></select-model>
  </a-card>
</template>
<script>
import selectModel from '@/views/jwManage/curriculas/components/selectModel'
import apiVecommon from '@/api/base/common-veCommon'
import apiVeIntegration from '@/api/base/common-veIntegration'
import apiScheduleClassChoiceXkMs from '@/api/schedule/classChoice-xkms'
import apiScheduleClassChoiceXkxz from '@/api/schedule/classChoice-xkxz'
import { childSycId } from '@/config'
import ZmSwitch from '@/components/switch/index.vue'
import modalMixin from '@/mixins/modalMixin'
export default {
  name: 'AddXkXz',
  components: {
    selectModel,
    ZmSwitch
  },
  mixins: [modalMixin],
  data() {
    return {
      width: 800,
      facultyList: [],
      specialtyList: [],
      banJiList: [],
      modelList: [],
      nianjiList: [],
      form: {
        falid: undefined,
        msid: '',
        specid: undefined,
        bjid: undefined,
        ordernum: 0,
        sex: undefined,
        jointclass: 0,
        remark: '',
        gatecountspec: 0,
        gatecount: 0
      },
      studentVisible: false,
      studentIds: [],
      studentVals: []
    }
  },
  watch: {
    'form.falid'(val) {
      this.querySpecialtyListByFalId(val)
    },
    'form.specid'(val) {
      this.queryBanJiListBySpecId(val)
    }
  },
  async created() {
    if (this.id || this.obj.id) await this.getDetail()
    await this.getModelPageList()
    await this.queryFacultyList()
    await this.queryGradeList()
    if (this.id || this.obj.id) {
      await this.querySpecialtyListByFalId(this.form.falid)
      await this.queryBanJiListBySpecId(this.form.specid)
    }
  },

  methods: {
    async getDetail() {
      const res = await apiScheduleClassChoiceXkxz.detail({ id: this.id || this.obj.id })
      this.form = { ...this.form, ...res.result }
      const studentInfoRes = await apiScheduleClassChoiceXkxz.getStudentInfoList({
        xzid: res.result.id
      })
      this.form.students = studentInfoRes.result.records || []
      this.studentVals = this.form.students
      let arr = this.studentVals.map(item => item.stuname)
      this.form.stuname = arr.join(',')
    },
    //模式
    async getModelPageList() {
      const res = await apiScheduleClassChoiceXkMs.getPageList({ pageNo: 1, pageSize: 999 })
      this.modelList = res.result.records
    },
    //院系
    async queryFacultyList() {
      const res = await apiVecommon.queryFacultyList({ id: childSycId })
      this.facultyList = res.result
    },
    //专业
    async querySpecialtyListByFalId(falId) {
      const res = await apiVecommon.querySpecialtyListByFalId({ falId, id: childSycId })
      this.specialtyList = res.result
    },
    //班级
    async queryBanJiListBySpecId(specId) {
      const res = await apiVecommon.queryBanJiListBySpecId({ specId, id: childSycId })
      this.banJiList = res.result
    },
    //nianji
    async queryGradeList() {
      const res = await apiVecommon.queryGradeList({ id: childSycId })
      this.nianjiList = res.result
    },
    getStudentPageList() {},
    async submit() {
      let _valid = false
	  console.log(this.$refs.form,'v???????')
     this.$refs.form.validate()
      if (!_valid) false
      const params = {
        msname: this.modelList.find(item => item.id === this.form.msid).name,
        falname: this.facultyList.find(item => item.id === this.form.falid).yxmc,
        bjname: this.banJiList.find(item => item.id === this.form.bjid).xzbmc,
        gradename: this.nianjiList.find(item => item.id === this.form.gradeid).njmc,
        ...this.form
      }
      if (this.id || this.obj.id) {
        await apiScheduleClassChoiceXkxz.update({ ...params, id: this.id || this.obj.id })
      } else {
        await apiScheduleClassChoiceXkxz.create({ ...params })
      }
      this.$message.success('操作成功!')
      this.$emit('after-save')
      this.close()
    },

    // 点击跳出弹框
    handleSelect() {
      this.studentVisible = true
    },
    // 筛选回调
    handleSelectOk(vals) {
      console.log(vals)
      this.form.students = vals
      this.studentVals = vals
      let arr = vals.map(item => item.stuname)
      this.form.stuname = arr.join(',')
      this.studentVisible = false
    },

    // 筛选取消
    handleSelectCancel() {
      this.studentVisible = false
    },

    // 选中返回
    handleSelectItem(vals) {
      console.log(vals)
      this.form.students = vals
    }
  }
}
</script>
<style scoped></style>
