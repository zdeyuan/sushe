<template>
	<a-card :bordered="false" class="header-solid mb-24">
		<div class="pageContentBox">
			<table class="scanTable top-div" style="text-align: left">
				<tr>
					<td colspan="4" class="tr-color">
						<span class="title-style">基本信息</span>
					</td>
				</tr>

				<tr class="tr-style">
					<td class="td-div">
						<div class="font-style">学校名称</div>
					</td>
					<td class="double">
						<a-input class="input-style-reply" v-model="schoolInfo.xxmc" :disabled='joinNotEite'>
						</a-input>
						<span class="nonull-tip"
							v-if="num != 0 && !(schoolInfo.xxmc != undefined && schoolInfo.xxmc.length > 0)">*必填项</span>
					</td>
					<td class="td-div">
						<div class="font-style">学校代码</div>
					</td>
					<td class="double">
						<a-input class="input-style-reply" v-model="schoolInfo.xxdm" :maxLength='8' v-on:blur="nameBule()"
							:disabled='joinNotEite'></a-input>
						<span class="nonull-tip"
							v-if="num != 0 && !(schoolInfo.xxdm != undefined && schoolInfo.xxdm.length > 0)">*必填项</span>
					</td>
				</tr>

				<tr class="tr-style">
					<td class="td-div">
						<div class="font-style">英文名称</div>
					</td>
					<td class="double">
						<!-- 没有接口 -->
						<a-input class="input-style-reply" v-model="schoolInfo.xxywmc"
							:disabled='joinNotEite'></a-input>
					</td>
					<td class="td-div">
						<div class="font-style">组织机构代码</div>
					</td>
					<td class="double">
						<a-input class="input-style-reply" v-model="schoolInfo.dwfzrUserId"
							:disabled='joinNotEite'></a-input>
					</td>
				</tr>
				<tr class="tr-style">
					<td class="td-div">
						<div class="font-style">校庆日</div>
					</td>
					<td class="double">
						<a-input class="input-style-reply" v-model="schoolInfo.xqr" :disabled='joinNotEite'></a-input>
					</td>
					<td class="td-div">
						<div class="font-style">学校举办者</div>
					</td>
					<td class="double">
						<a-input class="input-style-reply" v-model="schoolInfo.xxjbz" :disabled='joinNotEite'></a-input>
					</td>
				</tr>

				<tr class="tr-style">
					<td class="td-div">
						<div class="font-style">法人证书号</div>
					</td>
					<td class="double">
						<a-input class="input-style-reply" v-model="schoolInfo.frzsh" :disabled='joinNotEite'></a-input>
					</td>
					<td class="td-div">
						<div class="font-style">法定代表人</div>
					</td>
					<td class="double">
						<a-input class="input-style-reply" v-model="schoolInfo.fddbrm"
							:disabled='joinNotEite'></a-input>
						<span class="nonull-tip" v-if="num != 0 &&  schoolInfo.fddbrm == ''">*必填项</span>
					</td>
				</tr>


				<tr class="tr-style">
					<td class="td-div">
						<div class="font-style">校长</div>
					</td>
					<td class="double">
						<a-input class="input-style-reply" v-model="schoolInfo.xzxm" :disabled='joinNotEite'></a-input>
						<span class="nonull-tip" v-if="num != 0 &&  schoolInfo.xz == ''">*必填项</span>
					</td>
					<td class="td-div">
						<div class="font-style">党委负责人</div>
					</td>
					<td class="double">
						<a-input class="input-style-reply" v-model="schoolInfo.dwfzrxm"
							:disabled='joinNotEite'></a-input>
						<span class="nonull-tip" v-if="num != 0 &&  schoolInfo.dwfzrxm == ''">*必填项</span>
					</td>
				</tr>

				<tr class="tr-style">
					<td class="td-div">
						<div class="font-style">学校办学类</div>
					</td>
					<td class="double">
						<a-input class="input-style-reply" v-model.trim="schoolInfo.xxbxlxm"
							:disabled='joinNotEite'></a-input>
					</td>
					<!-- <td class="td-div">
							<div class="font-style">学校举办者</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="schoolInfo.xxjbz"
								:disabled='joinNotEite'></a-input>
						</td>-->
				</tr>
			</table>

			<table class="scanTable" style="text-align: left; margin-top: 20px">
				<tr>
					<td colspan="4" class="tr-color">
						<span class="title-style">联系信息</span>
					</td>
				</tr>

				<tr class="tr-style">
					<td class="td-div">
						<div class="font-style">地址</div>
					</td>
					<td class="double">
						<a-input class="input-style-reply" v-model="schoolInfo.xxdz" :disabled='joinNotEite'></a-input>
					</td>
					<td class="td-div">
						<div class="font-style">传真电话</div>
					</td>
					<td class="double">
						<a-input class="input-style-reply" v-model="schoolInfo.czdh" :disabled='joinNotEite'>
						</a-input>
					</td>
				</tr>

				<tr class="tr-style">
					<td class="td-div">
						<div class="font-style">联系电话</div>
					</td>
					<td class="double">
						<!-- 没有接口 -->
						<a-input class="input-style-reply" v-model="schoolInfo.lxdh" :disabled='joinNotEite'>
						</a-input>
					</td>
					<td class="td-div">
						<div class="font-style">电子邮箱</div>
					</td>
					<td class="double">
						<a-input class="input-style-reply" v-model="schoolInfo.dzxx" :disabled='joinNotEite'>
						</a-input>
					</td>
				</tr>

				<tr class="tr-style">
					<td class="td-div">
						<div class="font-style">主页地址</div>
					</td>
					<td class="double">
						<a-input class="input-style-reply" v-model="schoolInfo.zydz" :disabled='joinNotEite'>
						</a-input>
					</td>
				</tr>

			</table>

			<table class="scanTable" style="text-align: left; margin-top: 20px">
				<tr>
					<td colspan="4" class="tr-color">
						<span class="title-style">其他信息</span>
					</td>
				</tr>

				<tr class="tr-style">
					<td class="td-div">
						<div class="font-style">历史沿革</div>
					</td>
					<td class="double">
						<!-- 没有接口 -->
						<a-input class="input-style-reply" v-model="schoolInfo.lsyg" :disabled='joinNotEite'>
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
							<a-button class="search-button btn-style btn" @click="tip">
								{{joinNotEite == false ? '确认修改' : '修改'}} </a-button>
							<a-button class="search-button btn-style btn-cancle" @click="cancel"> 取消修改 </a-button>
						</a-col>
						<a-col :span="6"> </a-col>
					</a-row>
				</div>
			</div>
		</div>
	</a-card>
	</div>
</template>
<script>
	import {
		axios
	} from '@/utils/request'
	export default {
		data() {
			return {
				type: '',
				schoolInfo: {
					
				},
				ApplyObj: {},
				joinNotEite: true,
				num: 0,
				schoolTypeList: []
			}
		},
		created() {
			this.getschoolInfo()
		},
		methods: {
			getschoolInfo() {
				axios({
					url: 'common/veBase/getSchoolPageList',
					method: 'get',
					params: {
						pageNo: 1,
						pageSize: 5
					}
				}).then(res => {
					if (res.code == 200) {
						if (res.result.list.length != 0) {
							this.type = 'change'
							this.schoolInfo = res.result.list[0]
						} else {
							this.type = 'add'
						}
					}
				}).catch(err => {
					this.$message.warning("获取学校信息失败");
				})
			},
			tip() {
				if (this.joinNotEite) {
					this.joinNotEite = false
				} else {

					this.joinNotEite = true
					this.chanegEditSchool()
				}
			},
			cancel() {
				this.joinNotEite = true
			},

			chanegEditSchool() {
				console.log(this.schoolInfo, 'this.schoolInfo????')
				if (this.type == 'add') {
					this.schoolInfo.jxny = Math.floor(new Date(this.schoolInfo.jxny).getTime() / 1000);
					axios({
						url: 'common/veBase/addSchool',
						method: 'post',
						data: this.schoolInfo
					}).then(res => {
						if (res.code == 200) {
							this.joinNotEite = false
							this.$message.success("学校信息添加成功");
							this.getschoolInfo()
						}
					}).catch(err => {
						this.$message.warning("获取学校信息失败");
					})
				} else {
					this.schoolInfo.jxny = Math.floor(new Date(this.schoolInfo.jxny).getTime() / 1000);
					axios({
						url: 'common/veBase/editSchool',
						method: 'post',
						data: this.schoolInfo
					}).then(res => {
						if (res.code == 200) {
							this.joinNotEite = false
							this.$message.success("学校信息修改成功");
							this.getschoolInfo()
						}
					}).catch(err => {
						this.$message.warning("获取学校信息失败");
					})
				}
			},
		},
	}
</script>