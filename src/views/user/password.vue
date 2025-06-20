<template>
  <div>
	  <div class="title">
		  修改密码
	  </div>
	  <a-card style="width:80%;margin:0 auto;min-width:800px">
    <a-form style="width:600px;margin:0 auto;padding-top:30px;" :form="form" class="user-layout-login"  ref="formLogin" id="formLogin">
          <a-form-item label="旧密码">
            <a-input
              size="large"
              v-decorator="['oldPwd',validatorRules.oldPwd]"
              type="password"
              placeholder="请输入旧密码">
              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>
          <a-form-item  label="新密码">
            <a-input
              v-decorator="['newPwd',validatorRules.newPwd]"
              size="large"
              type="password"
              autocomplete="false"
              placeholder="请输入新密码">
              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>
			<a-form-item label="重复密码" >
			  <a-input
				v-decorator="['affirmPwd',validatorRules.affirmPwd]"
				size="large"
				type="password"
				autocomplete="false"
				placeholder="请输入重复密码">
				<a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
			  </a-input>
			</a-form-item>
      <a-form-item >
        <div style="text-align: center;">
          <a-button
            size="large"
            htmlType="submit"
            class="login-button"
            :loading="loginBtn"
            @click.stop.prevent="handleSubmit"
            :disabled="loginBtn">提交
          </a-button>
        </div>
      </a-form-item>
    </a-form>
	</a-card>
	<!-- <login-select-tenant ref="loginSelect" @success="loginSelectOk"></login-select-tenant> -->
  </div>
</template>

<script>
  //import md5 from "md5"
  import api from '@/api/common'
  import { mapActions } from "vuex"
  import { timeFix } from "@/utils/util"
  import Vue from 'vue'
  import { ACCESS_TOKEN ,ENCRYPTED_STRING} from "@/store/mutation-types"
  import { putAction,postAction,getAction } from '@/api/common/manage'
  import store from '@/store/'
  import { USER_INFO } from "@/store/mutation-types"
  export default {
    components: {
    },
    data () {
      return {
        customActiveKey: "tab1",
        loginBtn: false,
        // login type: 0 email, 1 username, 2 telephone
        loginType: 0,
        requiredTwoStepCaptcha: false,
        stepCaptchaVisible: false,
        form: this.$form.createForm(this),
        validatorRules:{
          affirmPwd:{rules: [{ required: true, message: '请输入重复密码!',validator: 'click'}]},
          newPwd:{rules: [{ required: true, message: '请输入新密码!',validator: 'click'}]},
          oldPwd:{rules: [{ required: true, message: '请输入新密码!',validator: 'click'}]},
          captcha:{rule: [{ required: true, message: '请输入验证码!'}]},
        },
        verifiedCode:"",
        inputCodeContent:"",
        inputCodeNull:true,
        currentUsername:"",
        currdatetime:'',
        randCodeImage:'',
        requestCodeSuccess:false,
      }
    },
    created () {
      this.handleChangeCheckCode();
    },
    methods: {
      handleSubmit () {
		  let that = this
		  that.loginBtn = true;
		   let params = {};
        that.form.validateFields([ 'newPwd', 'oldPwd','affirmPwd' ], { force: true }, (err, values) => {
          if (!err) {
			  params.newPwd=values.newPwd;
			  params.oldPwd=values.oldPwd;
			  params.affirmPwd=values.affirmPwd;
			  params.id=JSON.parse(localStorage.getItem('userInfo')).id;
             postAction(`/common/veCommon/editPassword`,params).then(res=>{
				if(res.success){
					this.$message.success("修改成功，请重新登录");
					window.localStorage.clear();
					window.sessionStorage.clear();
					this.$router.push({ path: "/user/login" })
				}else{
					 this.$message.error(res.message)
				}
			})
          }else {
            that.loginBtn = false;
          }
        })
      },
      handleChangeCheckCode(){
		  this.currdatetime = new Date().getTime();
		  getAction(`/sys/randomImage/${this.currdatetime}`).then(res=>{
		    if(res.success){
		      this.randCodeImage = res.result
		      this.requestCodeSuccess=true
		    }else{
		      this.$message.error(res.message)
		      this.requestCodeSuccess=false
		    }
		  }).catch(()=>{
		    this.requestCodeSuccess=false
		  })
      },
      loginSuccess () {
		  this.$router.push({ path: "/" }).catch(()=>{
		  })
      },
   
    }
  }
</script>

<style lang="less" scoped>
	.title{
		font-size:20px;
		text-align:center;
		padding:20px 0;
	}
  .user-layout-login {
    label {
      font-size: 14px;
    }

    button.login-button {
      padding: 0 25px;
      font-size: 16px;
      height:38px;
      // width: 100%;
      margin-top:10px;
      background-image: linear-gradient(to right, #115697, #0857E8);
      color:#FFFFFF;
      font-weight: bold;
    }

  }

</style>
<style>
  .valid-error .ant-select-selection__placeholder{
    color: #f5222d;
  }
</style>