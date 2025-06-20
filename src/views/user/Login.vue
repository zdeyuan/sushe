<template>
  <div class="main">
    <a-form :form="form" class="user-layout-login" ref="formLogin" id="formLogin">
          <a-form-item>
            <a-input
              size="large"
              v-decorator="['username',validatorRules.username,{ validator: this.handleUsernameOrEmail }]"
              type="text"
              placeholder="请输入帐号">
              <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              v-decorator="['password',validatorRules.password]"
              size="large"
              type="password"
              autocomplete="false"
              placeholder="请输入密码">
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
            :disabled="loginBtn">登录
          </a-button>
        </div>
      </a-form-item>
    </a-form>
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
        encryptedString:{
          key:"",
          iv:"",
        },
        state: {
          time: 60,
          smsSendBtn: false,
        },
        validatorRules:{
          username:{rules: [{ required: true, message: '请输入账号!'},{validator: this.handleUsernameOrEmail}]},
          password:{rules: [{ required: true, message: '请输入密码!',validator: 'click'}]},
          mobile:{rules: [{validator:this.validateMobile}]},
          captcha:{rule: [{ required: true, message: '请输入验证码!'}]},
          inputCode:{rules: [{ required: true, message: '请输入验证码!'}]}
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
      this.currdatetime = new Date().getTime();
	  Vue.ls.remove(ACCESS_TOKEN)
      // Vue.ls.remove(ACCESS_TOKEN)
      this.handleChangeCheckCode();
      // update-begin- --- author:scott ------ date:20190805 ---- for:密码加密逻辑暂时注释掉，有点问题
      //this.getEncrypte();
      // update-end- --- author:scott ------ date:20190805 ---- for:密码加密逻辑暂时注释掉，有点问题
    },
    methods: {
      ...mapActions('user',['Login', 'Logout', 'PhoneLogin']),
      // handler
      handleUsernameOrEmail (rule, value, callback) {
        const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
        if (regex.test(value)) {
          this.loginType = 0
        } else {
          this.loginType = 1
        }
        callback()
      },
      handleTabClick (key) {
        this.customActiveKey = key
        // this.form.resetFields()
      },
      handleSubmit () {
		  let that = this
		  let loginParams = {};
		  that.loginBtn = true;
        that.form.validateFields([ 'username', 'password','inputCode', 'rememberMe' ], { force: true }, (err, values) => {
          if (!err) {
            loginParams.username = values.username
            // update-begin- --- author:scott ------ date:20190805 ---- for:密码加密逻辑暂时注释掉，有点问题
            //loginParams.password = md5(values.password)
            //loginParams.password = encryption(values.password,that.encryptedString.key,that.encryptedString.iv)
            loginParams.password = values.password
            loginParams.remember_me = values.rememberMe
            // update-begin- --- author:scott ------ date:20190805 ---- for:密码加密逻辑暂时注释掉，有点问题
            loginParams.captcha = that.inputCodeContent
            loginParams.checkKey = that.currdatetime
            that.Login(loginParams).then((res) => {
				
				 const now = new Date();
				 
				 const year = now.getFullYear();
				 const month = ('0' + (now.getMonth() + 1)).slice(-2);
				 const day = ('0' + now.getDate()).slice(-2);
				 const hours = ('0' + now.getHours()).slice(-2);
				 const minutes = ('0' + now.getMinutes()).slice(-2);
				 const seconds = ('0' + now.getSeconds()).slice(-2);
				 
				 const formattedTime = year +'-'+ month +'-'+ day +' '+ hours +':'+ minutes +':'+ seconds;
				 localStorage.setItem('loginTime',formattedTime)
				 that.$router.push({ path: "/" }).catch(()=>{
				 })
				 that.$notification.success({
				   message: '欢迎',
				   description: `${timeFix()}，欢迎回来`,
				 });
            }).catch((err) => {
				that.$notification.error({
				  message: '提示',
				  description: err.message,
				});
				setTimeout(()=>{
					that.loginBtn=false
				},500)
            });
        
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
		  this.$notification.success({
		    message: '欢迎',
		    description: `${timeFix()}，欢迎回来`,
		  });
      },
      cmsFailed(err){
      },
      requestFailed (err) {
      },
      validateMobile(rule,value,callback){
        if (!value || new RegExp(/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/).test(value)){
          callback();
        }else{
          callback("您的手机号码格式不正确!");
        }

      },
      validateInputCode(rule,value,callback){
        if(!value || this.verifiedCode==this.inputCodeContent){
          callback();
        }else{
          callback("您输入的验证码不正确!");
        }
      },
      generateCode(value){
        this.verifiedCode = value.toLowerCase()
      },
      inputCodeChange(e){
        this.inputCodeContent = e.target.value
      },
      loginSelectOk(){
        this.loginSuccess()
      },
   
    //获取密码加密规则
    getEncrypte(){
    },
    }
  }
</script>

<style lang="less" scoped>

  .user-layout-login {
    label {
      font-size: 14px;
    }
    .getCaptcha {
      display: block;
      width: 100%;
      height: 40px;
    }

    .forge-password {
      font-size: 14px;
    }

    button.login-button {
      padding: 0 15px;
      font-size: 16px;
      height:48px;
      width: 282.5px;
      // width: 100%;
      margin-top:10px;
      background-image: linear-gradient(to right, #115697, #0857E8);
      color:#FFFFFF;
      font-size:24px;
      font-weight: bold;
    }

    .user-login-other {
      text-align: left;
      margin-top: 24px;
      line-height: 22px;

      .item-icon {
        font-size: 24px;
        color: rgba(0,0,0,.2);
        margin-left: 16px;
        vertical-align: middle;
        cursor: pointer;
        transition: color .3s;

        &:hover {
          color: #1890ff;
        }
      }

      .register {
        float: right;
      }
    }
  }

</style>
<style>
  .valid-error .ant-select-selection__placeholder{
    color: #f5222d;
  }
</style>