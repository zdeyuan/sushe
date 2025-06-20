<template>
  <a-modal
    :title="`${title}学生选课`"
    :width="640"
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
      <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="用户名" prop="uName">
          <a-input v-model="form.uName" placeholder="请输入用户名" :disabled="isView" />
        </a-form-model-item>
        <a-form-model-item label="手机号" prop="uPhone">
          <a-input v-model="form.uPhone" :max-length="11" placeholder="请输入手机号"  :disabled="isView"  />
        </a-form-model-item>
        <a-form-model-item label="英文名" prop="englishName">
          <a-input v-model="form.englishName" placeholder="请输入英文名"  :disabled="isView" />
        </a-form-model-item>
        <a-form-model-item label="密码" prop="password">
          <a-input-password v-model="form.password" placeholder="请输入密码"  :disabled="isView" />
        </a-form-model-item>
        <a-form-model-item label="性别" prop="uSex">
          <a-select v-model="form.uSex" placeholder="请选择性别"  :disabled="isView" >
            <a-select-option :value="0"> 男 </a-select-option>
            <a-select-option :value="1"> 女 </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="出生日期" prop="uBirthday">
			<DatePickByCN
			   v-model="form.uBirthday"
			   :disabled="isView"
			  placeholder="请选择出生日期"  />
        </a-form-model-item>
        <a-form-model-item label="地区" prop="belongArea">
          <a-select v-model="form.belongArea" placeholder="请选择地址" :disabled="isView">
            <a-select-option value="中国"> 中国 </a-select-option>
            <a-select-option value="美国"> 美国 </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="学校类型" prop="schoolType">
          <a-select v-model="form.schoolType" placeholder="请选择所在学校类型"  :disabled="isView">
            <a-select-option value="0"> 国际学校 </a-select-option>
            <a-select-option value="1"> 公立学校 </a-select-option>
            <a-select-option value="2"> 私立学校 </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="备注" prop="remark">
          <a-input v-model="form.remark" type="textarea" :rows="3"  :maxLength="200" placeholder="请输入备注"  :disabled="isView" />
        </a-form-model-item>
      </a-form-model>
    </a-spin>
  </a-modal>
</template>
<script>
import { apiScheduleClassChoiceXkdj } from '@/api/schedule'
import { mapGetters } from 'vuex'

export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    id: {
      type: Number | String,
      default: '',
    },
    model: {
      type: Object,
      default: () => null,
    },
    isView:{
      type:Boolean,
      default:false
    }
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
        uId: '',
        uName: '',
        uSex: undefined,
        uPhone: undefined,
        englishName: '',
        password: '',
        uBirthday: '',
        belongArea: undefined,
        schoolType: undefined,
        remark: '',
      },

      loading: false,
      title:'',
    }
  },
  created() {
    if (this.model) {
      this.form = {
        ...this.model,
      }
    } else {
      // this.form.uId = this.id
    }
    this.title = this.isView ? '查看' : this.id ? '编辑':'新增';
  },
  computed: {
    rules() {
      return {
        uName: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur',
          },
        ],
        uSex: [
          {
            required: true,
            message: '请选择性别',
            trigger: 'change',
          },
        ],
        uPhone: [
          {
            required: true,
            message: '请输入手机号码',
            trigger: 'blur',
          },
        ],

        englishName: [
          {
            required: true,
            message: '请输入英文名',
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: this.model ? false : true,
            message: '请输入密码',
            trigger: 'blur',
          },
        ],
        uBirthday: [
          {
            required: true,
            message: '请选择出生日期',
            trigger: 'change',
          },
        ],
        belongArea: [
          {
            required: true,
            message: '请选择地区',
            trigger: 'change',
          },
        ],
        schoolType: [
          {
            required: true,
            message: '请选择学校类型',
            trigger: 'change',
          },
        ],
      }
    },
  },
  methods: {
    handleSubmit() {
      if(this.isView){
        this.handleCancel()
        return
      }
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.loading = true
          let _method = this.model ? edit : create
          _method({
            ...this.form,
          }).then((res) => {
            this.loading = false
            if (res.code == '0000') {
              this.$message.info(`${this.model ? '编辑' : '新增'}成功`)
              this.$emit('ok')
            } else {
              this.$message.warning(res.msg)
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
