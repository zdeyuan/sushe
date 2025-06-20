<template>
  <a-modal title="筛选" :width="800" placement="right" @cancel="close" @ok="submit" :visible="value">
    <a-form-model label-width="80px" :model="form" :rules="formRule" ref="form">
      <a-row>
        <a-col :span="12"
          ><a-form-model-item :label-col="{ span: 8 }" :wrapper-col="{ span: 10 }" prop="msid" label="选课模式">
            <a-select v-model="form.msid" style="width: 100%">
              <a-select-option :value="item.id" v-for="item in modelList" :key="item.id">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="12"
          ><a-form-model-item
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 10 }"
            prop="gatecount"
            label="系部/专业限选门数"
          >
            <a-input-number v-model="form.gatecount" style="width: 100%" id="NumS" :min="0" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12"
          ><a-form-model-item :label-col="{ span: 8 }" :wrapper-col="{ span: 10 }" prop="falid" label="限选系部">
            <a-select v-model="form.falid" style="width: 100%">
              <a-select-option :value="item.id" v-for="item in facultyList" :key="item.id">
                {{ item.yxmc }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="12"
          ><a-form-model-item :label-col="{ span: 8 }" :wrapper-col="{ span: 10 }" prop="specid" label="限选专业">
           <a-select v-model="form.specid" style="width: 100%" :disabled="!form.falid">
                <a-select-option :value="item.id" v-for="item in specialtyList" :key="item.id">
                  {{ item.zymc }}
                </a-select-option>
              </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="12"
          ><a-form-model-item :label-col="{ span: 8 }" :wrapper-col="{ span: 10 }" prop="gradeid" label="限选班级">
            <a-select v-model="form.gradeid" style="width: 100%" :disabled="!form.specid">
                <a-select-option :value="item.id" v-for="item in banJiList" :key="item.id">
                  {{ item.xzbmc }}
                </a-select-option>
              </a-select>
          </a-form-model-item>
        </a-col>

        <a-col :span="12">
        <a-form-model-item label="限选年级" :label-col="{ span: 8 }" :wrapper-col="{ span: 10 }">
              <a-select v-model="form.gradeid" style="width: 100%" placeholder="请选择班级">
                <a-select-option :value="item.id" v-for="item in nianjiList" :key="item.id">
                  {{ item.njmc }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
        </a-col>
        <a-col :span="12"
          ><a-form-model-item :label-col="{ span: 8 }" :wrapper-col="{ span: 10 }" prop="studentId" label="限选学生">
            <a-input @click="handleSelect" v-model="form.stuname" placeholder="请输入学生姓名" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12"
          ><a-form-model-item :label-col="{ span: 8 }" :wrapper-col="{ span: 10 }" prop="sex" label="限选性别">
            <j-dict-select-tag v-model="form.sex" placeholder="请选择性别" dictCode="sex"/>
          </a-form-model-item>
        </a-col>
        <a-col :span="12"
          ><a-form-model-item :label-col="{ span: 8 }" :wrapper-col="{ span: 10 }" prop="remark" label="描述">
            <a-input v-model="form.remark" placeholder="最多400字" :maxLength="400"></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="12"
          ><a-form-model-item :label-col="{ span: 8 }" :wrapper-col="{ span: 10 }" prop="ordernum" label="排序码">
            <a-input-number v-model="form.ordernum" style="width: 100%" id="NumS" :min="0" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12"
          ><a-form-model-item :label-col="{ span: 8 }" :wrapper-col="{ span: 10 }" prop="createtime" label="创建时间">
            <range-time :target="form" startKey="createtimestart" endKey="createtimeend"></range-time>
          </a-form-model-item>
        </a-col>
        <a-col :span="12"
          ><a-form-model-item :label-col="{ span: 8 }" :wrapper-col="{ span: 10 }" prop="deletetime" label="删除时间">
          <range-time :target="form" startKey="deletetimestart" endKey="deletetimeend"></range-time>
          </a-form-model-item>
        </a-col>
        <a-col :span="12"
          ><a-form-model-item
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 10 }"
            prop="updatetime"
            label="最后修改时间"
          >
           <range-time :target="form" startKey="updatetimestart" endKey="updatetimeend"></range-time>
          </a-form-model-item>
        </a-col>
        <a-col :span="12"
          ><a-form-model-item :label-col="{ span: 8 }" :wrapper-col="{ span: 10 }" prop="status" label="是否有效">
			 <j-dict-select-tag v-model="form.status" placeholder="请选择性别" dictCode="shifou"/>
          </a-form-model-item>
        </a-col>
        <a-col :span="12"
          ><a-form-model-item
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 10 }"
            prop="createusername"
            label="创建者名称"
          >
            <a-textarea v-model="form.createusername" placeholer="最多50个字" :maxLength="50" :rows="1" autoSize />
          </a-form-model-item>
        </a-col>
        <!-- <a-col :span="12"
          ><a-form-model-item :label-col="{ span: 8 }" :wrapper-col="{ span: 10 }" prop="kecheng" label="课程">
          </a-form-model-item>
        </a-col> -->
      </a-row>
    </a-form-model>
    <div slot="footer">
      <a-button @click="onClear">清空</a-button>
      <a-button type="primary" @click="submit">确定</a-button>
    </div>
     <select-model
      ref="selectModel"
      :visible="studentVisible"
      v-if="studentVisible"
      @cancel="handleSelectCancel"
      @ok="handleSelectOk"
      @select="handleSelectItem"
    ></select-model>
  </a-modal>
</template>

<script>
import selectModel from '@/views/jwManage/curriculas/components/selectModel'
import RangeTime from '@/components/RangeTime'
import apiVecommon from '@/api/base/common-veCommon'
import apiScheduleClassChoiceXkMs from '@/api/schedule/classChoice-xkms'
import apiScheduleClassChoiceXkxz from '@/api/schedule/classChoice-xkxz'
import { childSycId } from '@/config'
import modalMixin from '@/mixins/modalMixin'
export default {
  components: { RangeTime,selectModel },
  props: {
    form: {
      type: Object,
      default: () => {
        return {
          bjid: '',
          bjname: '',
          createtime: '',
          createuserid: '',
          createusername: '',
          deletetime: '',
          falid: '',
          falname: '',
          gatecount: '',
          gatecountspec: '',
          gradeid: '',
          gradename: '',
          id: '',
          isdelete: '',
          jointclass: '',
          kecheng: '',
          msid: '',
          msname: '',
          ordernum: '',
          pageNo: '',
          pageSize: '',
          remark: '',
          sex: '',
          specid: '',
          specname: '',
          status: '',
          stu: '',
          terminalid: '',
          updatetime: '',
          week: ''
        }
      }
    }
  },
  data() {
    return {
      facultyList: [],
      specialtyList: [],
      showStudent:false,
      banJiList: [],
      nianjiList: [],
      modelList: [],
      formRule: {},
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      studentVisible:false
    }
  },
   watch: {
    'form.falid'(val){
      this.querySpecialtyListByFalId(val)
    },
    'form.specid'(val){
      this.queryBanJiListBySpecId(val)
    }
  },
  mixins: [modalMixin],
  async created() {
    await this.getModelPageList()
    await this.queryFacultyList()
    await this.queryGradeList()
  },
  methods: {
    onClear(){
      this.$emit('clear')
    },
    async getModelPageList(){
     const res = await apiScheduleClassChoiceXkMs.getPageList({pageNo:1,pageSize:999})
     this.modelList = res.result.records
    },
    //院系
    async queryFacultyList() {
      const res = await apiVecommon.queryFacultyList({ id: childSycId })
      this.facultyList = res.result
    },
    //专业
    async querySpecialtyListByFalId(falId) {
      const res = await apiVecommon.querySpecialtyListByFalId({ falId,id: childSycId })
      this.specialtyList = res.result
    },
    //班级
    async queryBanJiListBySpecId(specId) {
      const res = await apiVecommon.queryBanJiListBySpecId({specId, id: childSycId })
      this.banJiList = res.result
    },
    //nianji
    async queryGradeList() {
      const res = await apiVecommon.queryGradeList({ id: childSycId })
      this.nianjiList = res.result
    },
    getStudentPageList() {},
    async submit() {
      let _valid= false
      this.$refs.form.validate(valid => {
        _valid = valid
      })
      if(!_valid) false
      if(this.id||this.obj.id){
        await apiScheduleClassChoiceXkxz.update({...this.form,id:this.id||this.obj.id})
      }else{
         await apiScheduleClassChoiceXkxz.create({...this.form})
      }
      this.$message.success('操作成功A!');
      this.$emit('after-save')
      this.close()
    },
    select() {
      this.showStudent=true
    },
    async submit() {
      let _valid = false
      this.$refs.form.validate(valid => {
        _valid = valid
      })
      if (!_valid) return
      this.$emit('search')
      this.dialogClose()
    },

      // 筛选回调
    handleSelectOk(val) {
      this.studentVisible = false;

    },
    // 筛选取消
    handleSelectCancel() {
      this.studentVisible = false
    },

    handleSelect() {
      this.studentVisible = true
    },

    // 选中
    handleSelectItem(name){
      this.form.stuname = name;
    },
  }
}
</script>
