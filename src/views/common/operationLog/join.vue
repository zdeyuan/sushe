<template>
	<a-modal v-model="joinOrChangeStuShow" :title="joinOrChangeStuType == 'add' ? '添加系统管理员' : '修改'" :width="1073"
		:footer='false'>
		<div>
			<div class="pageContentBox">
				<table class="scanTable top-div" style="text-align: left">
					<tr>
						<td colspan="4" class="tr-color">
							<span class="title-style">基本信息</span>
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">用户名称</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.userName" :disabled='joinNotEite'>
							</a-input>
						</td>
						<td class="td-div">
							<div class="font-style">真实姓名</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.realName"
								:disabled='joinNotEite'></a-input>
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">学/工号</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.userId" :disabled='joinNotEite'>
							</a-input>
						</td>
						<td class="td-div">
							<div class="font-style">性别</div>
						</td>
						<td class="double">
							<a-select class="input-style-reply" :options="xbUser" placeholder="请选择"
								v-model="ApplyObj.sex" :disabled='joinNotEite' />
						</td>
					</tr>

					<tr class="tr-style" v-if='joinOrChangeStuType!="add"'>
						<td class="td-div">
							<div class="font-style">用户角色</div>
						</td>
						<td class="double">
							<!-- <a-input class="input-style-reply" v-model.trim="ApplyObj.userType" :disabled='joinNotEite'>
							</a-input> -->
							<a-select class="input-style-reply" disabled :options="jsUser" placeholder="请选择"
								v-model="ApplyObj.roleId"  />
						</td>
						<td class="td-div">
							<div class="font-style">用户状态</div>
						</td>
						<td class="double">
							<!-- <a-input class="input-style-reply" v-model.trim="ApplyObj.statusVal" :disabled='joinNotEite'>
							</a-input> -->
							<a-select class="input-style-reply" :options="ztUser" placeholder="请选择"
								v-model="ApplyObj.statusVal" :disabled='joinNotEite' />
						</td>
					</tr>


					<tr class="tr-style"  v-if='joinOrChangeStuType!="add"'>
						<td class="td-div">
							<div class="font-style">用户类别</div>
						</td>
						<td class="double">
							<a-select class="input-style-reply" disabled :options="lbUser" placeholder="请选择"
								v-model="ApplyObj.userType" />
						</td>
						<td class="td-div">
							<div class="font-style">联系地址</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.address" :disabled='joinNotEite'>
							</a-input>
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">邮箱</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.email" :disabled='joinNotEite'>
							</a-input>
						</td>
						<td class="td-div">
							<div class="font-style">手机号</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.userTel" :disabled='joinNotEite'>
							</a-input>
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">学历</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.education"
								:disabled='joinNotEite'>
							</a-input>
						</td>
						<td class="td-div">
							<div class="font-style">学位</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.degree" :disabled='joinNotEite'>
							</a-input>
						</td>
					</tr>

					<!-- <tr class="tr-style">
						<td class="td-div">
							<div class="font-style">联系地址</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.address" :disabled='joinNotEite'>
							</a-input>
						</td>
					</tr> -->

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">联系地址</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.address" :disabled='joinNotEite'>
							</a-input>
						</td>
					</tr>

				</table>

				<!-- 按钮区 -->
				<div class="content-head">
					<div class="applyBtn-div">
						<a-row>
							<a-col :span="10"> </a-col>
							<a-col :span="8">
								<a-button class="search-button btn-style btn" @click="tip"> 确定 </a-button>
								<a-button class="search-button btn-style btn-cancle" @click="cancel"> 取消 </a-button>
							</a-col>
							<a-col :span="6"> </a-col>
						</a-row>
					</div>
				</div>
			</div>
		</div>
	</a-modal>
</template>
<script>
	import {
		axios
	} from '@/utils/request'

	export default {
		data() {
			return {
				lbUser: [{
						value: "01",
						label: "管理员"
					},
					{
						value: "11",
						label: "老师"
					},
					{
						value: "21",
						label: "学生"
					},
					{
						value: "31",
						label: "企业管理员"
					},
					{
						value: "41",
						label: "企业教师"
					},
				],
				ztUser: [{
						value: "0",
						label: "招聘"
					},
					{
						value: "1",
						label: "在职"
					},
					{
						value: "2",
						label: "退休"
					},
				],
				xbUser: [{
						value: "0",
						label: "保密"
					},
					{
						value: "1",
						label: "男"
					},
					{
						value: "2",
						label: "女"
					},
				],
				jsUser: [],
				fzrUser: [],
				ApplyObj: {
					userPassword: '123456',
					status:0
				}, //弹窗对象
				joinOrChangeStuShow: false,
				joinNotEite: false,
				joinOrChangeStuType: ''
			}
		},
		created() {
			this.getyx()
		},
		methods: {
			getyx() {
				var user = sessionStorage.getItem('userInfo')
				// console.log(user,'user????')
				user = JSON.parse(user)
				axios({
						url: '/edu-base/base/veCertification/getAppRoleList',
						method: 'get'
					})
					.then((res) => {
						if (res.code == 200) {
							for (let jsUser of res.result) {
								this.jsUser.push({
									value: jsUser.id,
									label: jsUser.text,
								})
							}
							return;
						}
					})
					.catch((err) => {
						this.$message.warning("获取角色失败！");
					})
			},
			async judesType(type, obj) {
				// 判断是否是添加或修改
				this.joinOrChangeStuType = type
				if (type !== 'add') {
					this.ApplyObj = obj
					this.ApplyObj.userType = this.ApplyObj.userType+'1'
					this.ApplyObj.roleId = Number(this.ApplyObj.roleId)
					this.joinOrChangeStuShow = true
				} else {
					this.ApplyObj = {}
					this.jsUser.forEach(e=>{
						if(e.label=="系统管理员"){
							this.ApplyObj.roleId=e.value;
						}
					})
					this.joinOrChangeStuShow = true
					this.joinNotEite = false
				}
			},
			//添加
			tip() {
				// this.ApplyObj.njzzuserid
				// var index = this.fzrUser.findIndex(e=>e.value == this.ApplyObj.njzzuserid)
				// console.log(index,'index？？？？？？？？？？')

				// this.ApplyObj.xm = this.fzrUser[index].label


				if (this.joinOrChangeStuType == 'add') {

					if (this.joinNotEite) {
						this.cancel()
						return
					}
					this.ApplyObj.userPassword = '123456'
					// this.ApplyObj.userType = this.ApplyObj.userType+'0'
					this.ApplyObj.status = '0'
					// this.ApplyObj.njzt = this.ApplyObj.njzt == true ? 1 : 0
          this.$http.post('/edu-base/base/veCertification/appUserAdd', this.ApplyObj)
            .then(res => {
              if (res.code == 200) {
                this.$message.success('添加成功');
                this.$emit("JoinOrchangeStuSuss", '233');
                this.cancel();
              } else {
                this.$message.warning(res.message);
              }
            })
            .catch(err => {
              this.$message.warning("添加失败！");
            });

				} else {
					// this.ApplyObj.userType = this.ApplyObj.userType+'0'
          this.$http.post('/edu-base/base/veCertification/appUserEdit', this.ApplyObj)
            .then(res => {
              if (res.code == 200) {
                this.$message.success('修改成功');
                this.$emit("JoinOrchangeStuSuss", '233');
                this.cancel();
              } else {
                this.$message.warning(res.message);
              }
            })
            .catch(err => {
              this.$message.warning("修改失败！");
            });
				}
			},

			//取消按钮
			cancel() {
				this.ApplyObj = {}
				this.joinOrChangeStuShow = false
			},
		},
	}
</script>

<style lang="less" scoped>
	
	/deep/ .ant-select-selection--single{
		width:100%;
	}
</style>