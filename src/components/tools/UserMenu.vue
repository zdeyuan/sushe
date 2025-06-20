<template>
  <div>
    <a-menu v-model="current" mode="horizontal">
      <a-col :span="11">
		<div class="title">
			人事管理系统
		</div>
	  </a-col>
      <a-col :span="13" class="nav-bottom">
        <a-dropdown>
          <a class="ant-dropdown-link" @click="e => e.preventDefault()">
            <a-icon type="user" class="head-icon" />
            <span class="admin">系统管理员</span>
            <a-icon type="down" class="head-icon" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a href="javascript:;">个人信息</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
        <a-dropdown>
					<a class="ant-dropdown-link">
						<span class="nav-item">切换系统</span>
						<a-icon type="down" class="head-icon" />
					</a>
					<a-menu slot="overlay">
						<a-menu-item v-for="(val,key) in manage">
							<a :href="val.appAddress+'?token='+token+'&appId='+appId"
								target="_blank">{{val.appName}}</a>
						</a-menu-item>
					</a-menu>
          </a-dropdown>

          <div>
              <!-- <icon-font type="iconshouye-xuanzhong" class="head-icon" /> -->
              <span class="nav-item">学校首页</span>
          </div>

          <div>
              <!-- <icon-font type="iconxitong" class="head-icon" /> -->
            <span class="nav-item">设置</span>
          </div>

          <div>
              <!-- <icon-font type="iconfanhui" class="head-icon" /> -->
            <span class="nav-item">返回</span>
          </div>

          <div @click="handleLogout">
			<!-- <icon-font type="icontuichu" class="head-icon" /> -->
            <span class="nav-item">退出登录</span>
          </div>
      </a-col>
    </a-menu>
  </div>
</template>

<script>
  import { Icon } from 'ant-design-vue';

  const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2390461_xsxva8v3rr.js',
  });
 import {
 	mapActions
 } from 'vuex'
 export default {
 	data() {
 		return {
 			manage: '',
 			token: '',
 			appId: '',
 		}
 	},
 	mounted() {
 		window.console.log('页面完成加载')
 		this.token = window.sessionStorage.getItem('token')
 		if (this.token !== undefined || this.token !== null) {
 			this.token = window.sessionStorage.getItem('token')
 			this.appId = window.sessionStorage.getItem('appId')
 			this.manage = JSON.parse(window.sessionStorage.getItem('manage'))
 			window.console.log(this.manage)
 			// let index = this.manage.findIndex(item => item.APP_NAME == '宿舍管理系统')
 			// this.manage = this.manage.splice(index, 1)
 		}
 	},
    methods: {
	  ...mapActions(["Logout"]),
      handleLogout() {
        const that = this
        this.$confirm({
          title: '提示',
          content: '真的要注销登录吗 ?',
          onOk() {
            return that.Logout({}).then(() => {
			  
              that.$router.push({ path: '/user/login' });
            }).catch(err => {
              that.$message.error({
                title: '错误',
                description: err.message
              })
            })
          },
          onCancel() {
          },
        });
      },
    }
  }
</script>

<style>
  .ant-menu ant-menu-horizontal ant-menu-root ant-menu-light .nav-bottom{
	  display: flex;
  }
  .nav-bottom {
    height: 60px !important;
    display: flex !important;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-around;
	margin-bottom: 5px;
  }

  .ant-menu {
    height: 59px;
  }

  .title {
    width: 320px;
    border-radius: 0px;
    font-size: 25px;
	height: 58px;
	line-height: 58px;
    text-align: center;
    font-family: "MicrosoftYaHei";
	color: white;
	background: #2E437D;
  }

  .admin {
    color: #9F9F9F;
    font-size: 14px;
  }

  .nav-item {
    color: #707070;
    font-size: 15px;
    /* font-weight: bold; */
    /* margin: 0 5px; */
    line-height: 15px;
  }

  .head-icon {
    width: 28px;
    height: 28px;
    font-size: 28px;
    color: #707070;
  }
</style>
