<template>
	<a-modal v-model="joinOrChangeStuShow" :title="joinOrChangeStuType == 'add' ? '添加' : '修改'" :width="1073"
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
							<div class="font-style">通知类型</div>
						</td>
						<td class="double">
							<a-select :options="fzrUser" placeholder="请选择通知类型"
								v-model="ApplyObj.msgType" :disabled='joinNotEite' />
						</td>
					</tr>
					
					<tr class="tr-style" v-if="ApplyObj.msgType == 'USER'">
						<td class="td-div">
							<div class="font-style">通知用户</div>
						</td>
						<td class="double">
							<JSelectAllUser v-model="ApplyObj.userIds" :multiple='true' :width='"300"'></JSelectAllUser>
						</td>
					</tr>
					
					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">通知标题</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" placeholder="请输入通知标题"  v-model.trim="ApplyObj.titile" :disabled='joinNotEite'>
							</a-input>
						</td>
					</tr>
					
					<tr class="tr-style">

						<td class="td-div">
							<div class="font-style">通知内容</div>
						</td>
						<td class="double">
							<ueditor ref="ueditor" style="width: 100%;"></ueditor>
							<!-- <a-input class="input-style-reply" v-model.trim="ApplyObj.msgContent"
								:disabled='joinNotEite'></a-input> -->
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">开始时间</div>
						</td>
						<td class="double">
							<DatePickByCN
							      v-model="ApplyObj.startTime"
							      placeholder="请选择开始时间"
								  displayFormat="YYYY-MM-DD HH:mm:ss"
							    />
							<!-- <a-date-picker
							      :show-time="{ format: 'HH:mm:ss' }"
							  format="YYYY-MM-DD HH:mm:SS"
							  placeholder="请选择开始时间"
							  v-model="ApplyObj.startTime"
							/> -->
						</td>
						<td class="td-div">
							<div class="font-style">结束时间</div>
						</td>
						<td class="double">
							<DatePickByCN
							      v-model="ApplyObj.endTime"
							      placeholder="请选择结束时间"
								  displayFormat="YYYY-MM-DD HH:mm:ss"
							    />
							<!-- <a-date-picker
							      :show-time="{ format: 'HH:MM:SS' }"
							  format="YYYY-MM-DD HH:mm:SS"
							  placeholder="请选择结束时间"
							  v-model="ApplyObj.endTime"
							/> -->
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">优先级</div>
						</td>
						<td class="double">
							<!-- <a-input class="input-style-reply" v-model.trim="ApplyObj.userType" :disabled='joinNotEite'>
							</a-input> -->
							<a-select :options="xbUser" placeholder="请选择优先级"
								v-model="ApplyObj.priority" :disabled='joinNotEite' />
						</td>
						<td class="td-div">
							<div class="font-style">公告类型</div>
						</td>
						<td class="double">
							<!-- <a-input class="input-style-reply" v-model.trim="ApplyObj.statusVal" :disabled='joinNotEite'>
							</a-input> -->
							<!-- <a-select :options="ztUser" placeholder="请选择公告类型"
								v-model="ApplyObj.msgCategory" :disabled='joinNotEite' /> -->
							<j-dict-select-tag :disabled="joinNotEite" placeholder="请选择公告类型" v-model="ApplyObj.msgCategory"
								dictCode="msg_category"></j-dict-select-tag>	
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
	import {
		mapActions,
		 mapState
	} from 'vuex'
	import ueditor from '@/components/ueditor';
	import JSelectAllUser from '@/components/kwglbiz/JSelectAllUser'
	export default {
		components: { ueditor,JSelectAllUser },
		
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
						value: "1",
						label: "通知公告"
					},
					{
						value: "2",
						label: "系统消息"
					},
					{
						value: "3",
						label: "实时新闻"
					},
				],
				xbUser: [{
						value: "L",
						label: "低"
					},
					{
						value: "M",
						label: "中"
					},
					{
						value: "H",
						label: "高"
					},
				],
				jsUser: [{
						value: "L",
						label: "低"
					},
					{
						value: "M",
						label: "中"
					},
					{
						value: "H",
						label: "高"
					},
				],
				fzrUser: [
					{
						value: "USER",
						label: "指定用户通知"
					},
					{
						value: "ALL",
						label: "全体用户"
					},
				],
				ApplyObj: {
					userPassword: '123456',
					status: 0
				}, //弹窗对象
				joinOrChangeStuShow: false,
				joinNotEite: false,
				joinOrChangeStuType: ''
			}
		},
		created() {
			this.getyx();
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
				console.log(type, 'type')
				// console.log(id, 'id')
				// 判断是否是添加或修改
				console.log(obj, 'this.ApplyObj？？？？？')
				this.joinOrChangeStuType = type
				if (type !== 'add') {
					this.ApplyObj = obj
					this.ApplyObj.userType = this.ApplyObj.userType + '1'
					this.ApplyObj.roleId = Number(this.ApplyObj.roleId)
					this.joinOrChangeStuShow = true
					setTimeout(()=>{
						this.$refs.ueditor.setValue(this.ApplyObj.msgContent);
					},500)
				} else {
					this.ApplyObj = {}
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
				this.ApplyObj.msgContent = this.$refs.ueditor.getValue();
				if (this.joinOrChangeStuType == 'add') {
					if (this.joinNotEite) {
						this.cancel()
						return
					}
					this.$http.post('/sys/annountCement/add', this.ApplyObj)
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
					this.$http.put('/sys/annountCement/edit', this.ApplyObj)
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

<style>
	.count {
		padding: 0px;
		margin-top: 10px;
	}

	.tb {
		text-align: left;
	}

	.scanTable {
		width: 100%;
	}

	/* 表行高样式 */
	.tr-style {
		height: 49px;
		border: 1px solid #dee2e6;
	}

	/* 行颜色 */
	.tr-color {
		padding-left: 10px;
		box-sizing: border-box;
		height: 60px;
		width: 100%;
		background: #66c3fd;
		color: #fff;
	}

	.input-style-reply {
		color: #666666;
		width: 300px;
		border: 1px solid #666;
		background-color: #ffffff;
		border: 0;
		margin-left: 5px;
	}

	.input-style-replyTwo {
		color: #666666;
		width: 180px;
		background-color: #ffffff;
		border: 0;
		margin-left: 5px;
	}

	.td-div {
		padding-left: 10px;
		box-sizing: border-box;
		width: 159px;
	}

	.btn {
		width: 100px;
		height: 40px;
		background: #0098f8;
		border-radius: 5px;
		font-family: Microsoft YaHei;
		color: #ffffff;
	}

	.applyBtn-div {
		width: 100%;
	}

	.btn-style {
		width: 100px;
		height: 40px;
		margin-bottom: 33px;
		margin-top: 30px;
	}


	.date-style-Apply .ant-input {
		width: 300px;
		height: 34px;
	}

	.r-style {}

	.icon-img {
		margin-bottom: 5px;
		margin-right: 1px;
	}

	.info-tip {
		width: 94px;
		height: 19px;

		font-family: Microsoft YaHei;
		font-weight: 700;
		color: #666666;
		line-height: 24px;
	}

	.tableClean-button {
		width: 88px;
		height: 34px;
		margin-right: 0px;
		margin-left: 10px;
		background: #028BE2;
		border-radius: 5px;
		color: #fff;

		&:hover {
			background: #028BE2;
			color: #fff;
		}
	}
</style>