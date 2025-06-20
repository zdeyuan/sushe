<template>
	<a-modal v-model="joinOrChangeStuShow" :title="joinOrChangeStuType == 'add' ? '添加' : '修改'" :width="1073"
		:footer='false'>
		<div >
			<div class="pageContentBox">
				<table class="scanTable top-div" style="text-align: left">
					<tr>
						<td colspan="4" class="tr-color">
							<span class="title-style">基本信息</span>
						</td>
					</tr>
					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style"><span class="tip-star">*</span>班级代码</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" placeholder="请输入班级代码" @blur="validateField('xzbdm', ApplyObj.xzbdm, [validation.requiredRule])" v-model.trim="ApplyObj.xzbdm" :disabled='joinNotEite'>
							</a-input>
							<span class="nonull-tip" v-if="errors.xzbdm">{{errors.xzbdm}}</span>
						</td>
						<td class="td-div">
							<div class="font-style"><span class="tip-star">*</span>班级名称</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" placeholder="请输入班级名称" v-model.trim="ApplyObj.xzbmc" @blur="validateField('xzbmc', ApplyObj.xzbmc, [validation.requiredRule])"
								:disabled='joinNotEite'></a-input>
							<span class="nonull-tip" v-if="errors.xzbmc">{{errors.xzbmc}}</span>
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style"><span class="tip-star">*</span>所属年级</div>
						</td>
						<td class="double">
							<!-- 没有接口 -->
							<!-- <a-select  :options="grade" style="width:100%" placeholder="请选择所属年级"
								v-model="ApplyObj.gradeId" :disabled='joinNotEite' @blur="validateField('gradeId', ApplyObj.gradeId, [validation.requiredRule])"/>
							<span class="nonull-tip" v-if="errors.gradeId">{{errors.gradeId}}</span> -->
							<JSelectGrade placeholder="请选择所属年级" v-model="ApplyObj.gradeId"/>
						</td>
						<td class="td-div">
							<div class="font-style">毕业时间</div>
						</td>
						<td class="double">
							<DatePickByCN
							      v-model="ApplyObj.bysjName"
							      placeholder="请选择毕业时间"
								  :disabled='joinNotEite'
							    />
						</td>
					</tr>
					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style"><span class="tip-star">*</span>所属专业</div>
						</td>
						<td class="double">
							<a-select  style="width:100%" :options="specialty" @blur="validateField('specId', ApplyObj.specId, [validation.requiredRuleByArr])" placeholder="请选择所属专业"
								v-model="ApplyObj.specId" :disabled='joinNotEite' />
								<span class="nonull-tip" v-if="errors.specId">{{errors.specId}}</span>
						</td>
						<td class="td-div">
							<div class="font-style">建班年月</div>
						</td>
						<td class="double">
							<DatePickByCN
							      v-model="ApplyObj.jbny"
							      placeholder="请选择建班年月"
								  :disabled='joinNotEite'
							    />
						</td>
					</tr>
					
					
					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">所属班主任</div>
						</td>
						<td class="double">
							<JSelectTeacher placeholder="请选择所属班主任" v-model="ApplyObj.bzrUserId"></JSelectTeacher>
						</td>
						<td class="td-div">
							<div class="font-style" >班长</div>
						</td>
						<td class="double">
							<JSelectStudent placeholder="请选择班长"  v-model="ApplyObj.bzUserId"></JSelectStudent>
						</td>
					</tr>
						<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">固定教室</div>
						</td>
						<td class="double">
							<JSelectJiaoshi placeholder="请选择固定教室"  v-model="ApplyObj.jsid"  :trigger-change="true"></JSelectJiaoshi>
						</td>
					</tr>

				</table>

				<table class="scanTable" style="text-align: left; margin-top: 20px">
					<tr>
						<td colspan="4" class="tr-color">
							<span class="title-style">班级信息</span>
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">班級位置</div>
						</td>
						<td colspan="3" class="double">
							<!-- 省份下拉框 -->
							<a-select  :options="province" style="width:calc(50% - 115px)" placeholder="请选择班級位置"
								@change="cityChange" v-model="ApplyObj.campusId" :disabled='joinNotEite' />

						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">班级上限人数</div>
						</td>
						<td class="double">
							<!-- 没有接口 -->
							<a-input placeholder="请输入班级上限人数"  v-model.trim="ApplyObj.zrs" style="width:calc(50% - 115px)" :disabled='joinNotEite'>
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
								<a-button class="search-button btn-style btn" @click="tip"> 确认 </a-button>
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
    import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
	import validationService from '@/utils/validateForm';
	import JSelectTeacher from '@/components/kwglbiz/JSelectTeacherUserId'
	import JSelectStudent from '@/components/kwglbiz/JSelectStudent'
	import JSelectJiaoshi from '@/components/kwglbiz/JSelectJiaoshi'
	import JSelectGrade from '@/components/kwglbiz/JSelectGrade'
	import moment from 'moment';
	export default {
		components:{
			JSelectTeacher,
			JSelectStudent,
			JSelectJiaoshi,
			JSelectGrade
		},
		data() {
			return {
				locale,
				ApplyObj: {
					xzbdm: '',
					xzbmc: '',
					gradeId: '',
					bysjName: '',
					specId: '',
					bzrUserName: '',
					bzUserName: '',
					campusId: undefined,
					buildId: '',
					roomId: '',
					jsid:'',
					jbny: moment(new Date()).format('YYYY-MM-DD')
				}, //弹窗对象
				//下拉框数据
				addfaculty: [],
				specialty: [],
				province: [],
				city: [],
				county: [],
				xuzhi: [],
				zzmmmList: [],
				grade: [],
				num: 0,
				specId: 0,
				provinceId: 0,
				cityId: 0,
				countyId: 0,
				joinOrChangeStuType: '',
				joinOrChangeStuShow: false,
				joinNotEite: false,
				errors: {},
				validation: validationService
			}
		},
		methods: {
			// 验证单个字段的函数
			validateField(fieldName, fieldValue, rules) {
				let errorMessage = null;
				
				// 遍历规则数组并应用每个规则
				for (const rule of rules) {
					if (typeof rule === 'function') {
						// 如果规则是一个函数，则调用它并检查返回值
						const result = rule(fieldValue);
						if (result !== true) {
							// 如果规则验证失败，则设置错误消息
							errorMessage = result || '输入无效';
							break;
						}
					} else if (typeof rule === 'object' && rule.test) {
						// 如果规则是一个正则表达式对象，则测试字段值
						if (!rule.test(fieldValue)) {
							errorMessage = rule.message || '输入格式不正确';
							break;
						}
					}
				}
				// 设置或清除错误消息
				this.$set(this.errors, fieldName, errorMessage);
			},
			async judesType(type, id) {
				console.log(type, 'type')
				this.joinOrChangeStuType = type
				this.joinOrChangeStuShow = true
				this.getgrade()
				this.getProvince()
				this.specialtyList()
				this.clearArea()
				this.clearReplay()
				// 判断是否是添加或修改
				if (type !== 'add') {
					// console.log(type,'type')
					// 不是添加流程进入 修改 
					// 根据方法获取id
					// setTimeout(()=>{
					await this.getStuMsg(id)
					// },500)
				} else {
					this.ApplyObj = {
						xzbdm: '',
						xzbmc: '',
						gradeId: '',
						bysjName: '',
						specId: '',
						bzrUserName: '',
						bzUserName: '',
						campusId: undefined,
						buildId: '',
						roomId: '',
						jbny: moment(new Date()).format('YYYY-MM-DD')
					}
					this.num = 0
					this.clearArea()
					this.clearReplay()
					this.joinNotEite = false
				}
				this.joinOrChangeStuType = type
			},
			// 修改操作前,获取到用户信息
			getStuMsg(msg) {
				// /common/veBase/getStudentListById?id=20398
				this.ApplyObj = msg
				this.ApplyObj.bzrUserId=this.ApplyObj.bzrUserId+'';
				this.ApplyObj.bzUserId=this.ApplyObj.bzUserId+'';
				this.ApplyObj.jsid=this.ApplyObj.jsid+'';
				this.cityChange(this.ApplyObj.campusId)
				this.countyChange(this.ApplyObj.buildId)
			},
			//添加
			tip() {
				const fields = [{
						name: 'xzbdm',
						rules: [this.validation.requiredRule]
					},
					{
						name: 'xzbmc',
						rules: [this.validation.requiredRule]
					},
					{
						name: 'gradeId',
						rules: [this.validation.requiredRule]
					},
					{
						name: 'specId',
						rules: [this.validation.requiredRuleByArr]
					}
					// 更多字段和规则
				];
				
				// 执行字段验证
				this.errors = this.validation.validateFields(fields, this.ApplyObj);
				console.log("this.errors",this.errors)
				// 检查是否有错误
				if (Object.values(this.errors).every(error => error === null)) {
					if (this.joinNotEite) {
						this.cancel()
						return
					}
					this.num = 1;
					if(this.joinOrChangeStuType == 'add'){
						this.$http.post(this.$http.service.base + 'veBase/addBanJi',this.ApplyObj).then(res => {
							if (res.code == 200) {
								this.$message.success(res.message);
								this.$emit("JoinOrchangeStuSuss", this.joinOrChangeStuType)
								this.cancel();
								return;
							}else{
								this.$message.warning(res.message);
							}
							// this.$message.warning(res.message);
						})
						.catch((err) => {
							this.$message.warning("添加失败！");
						})
						
					}else{
						this.ApplyObj.status = this.ApplyObj.status == true ? 1 : 0
						this.$http.post(this.$http.service.base + 'veBase/editBanJi',this.ApplyObj).then(res => {
								if (res.code == 200) {
									this.$message.success(res.message);
									this.$emit("JoinOrchangeStuSuss", this.joinOrChangeStuType)
									this.cancel();
									return;
								}else{
									this.$message.warning(res.message);
								}
								// this.$message.warning(res.message);
						
						
							})
							.catch((err) => {
								this.$message.warning("修改失败！");
							})
					}
				}
				
			},

			//取消按钮
			cancel() {
				this.ApplyObj = {
					xzbdm: '',
					xzbmc: '',
					gradeId: '',
					bysjName: '',
					specId: '',
					bzrUserName: '',
					bzUserName: '',
					jbny: moment(new Date()).format('YYYY-MM-DD'),
					campusId: undefined,
				}
				this.num = 0
				this.clearArea()
				this.clearReplay()
				this.joinOrChangeStuShow = false
			},
			//数据校验环节
			//校验不为空
			nameBule() {
				let xm = this.ApplyObj.xm;
				if (xm != undefined && xm.length > 0) {} else {
					this.$message.warning('姓名不能为空')
					this.num = 1
				}
				this.oldNameBule()
			},
			//清除专业下拉框
			clearReplay() {
				this.ApplyObj.specId = []
				this.specialty = []
			},
			//清除户口下拉框
			clearArea() {
				this.ApplyObj.campusId = undefined
				this.city = []
				this.county = []
			},
			//联动获取班级
			getgrade() {
				this.grade = []
				this.ApplyObj.gradeId = []
				this.$http.get(this.$http.service.base + 'veCommon/queryGradeList',{
							pageNo: 1,
							pageSize: 100,
							interfaceUserId: "09d5e1e7f9b049008eee645c783a1d66"
						}).then(res => {
						this.grade.splice(0, this.grade.length)
						for (let grade of res.result) {
							this.grade.push({
								value: grade.id,
								label: grade.njdm,
							})
						}
					})
					.catch((err) => {
						this.$message.warning('获取班级失败')
					})
			},

			// 获取专业
			specialtyList() {
				this.specialty = [];
				this.ApplyObj.specId = '';
				this.$http.get(this.$http.service.base + 'veBase/getSpecisltyPageList',{}).then(res => {
					this.specialty.splice(0, this.specialty.length);
					for (let specialty of res.result) {
						this.specialty.push({
							value: specialty.id,
							label: specialty.zymc
						})
					}
				}).catch(err => {
					this.$message.warning("获取专业失败");
				})
			},
			//获取校区列表
			getProvince() {
				this.province = []
				this.$http.get(this.$http.service.base + 'veBase/getCampusPageList?pageNo=1&pageSize=100',{}).then(res => {
						for (let province of res.result.list) {
							this.province.push({
								value: province.id,
								label: province.xqmc,
							})
						}
					})
					.catch((err) => {
						this.$message.warning('获取校区列表失败')
					})
			},
			//获取楼层列表
			cityChange(value) {
				this.city = []
				this.county = []
				// this.ApplyObj.cityId = []
				// this.ApplyObj.countyId = []

				if (value.length == 0) {
					return
				}
				this.$http.get(this.$http.service.base + 'veCommon/queryBuildListByCampusId',{
							campusId: this.ApplyObj.campusId,
							interfaceUserId: "09d5e1e7f9b049008eee645c783a1d66"
						}).then(res => {
						if (res.result.length == 0) {
							return
						}
						// this.city.splice(0, this.addspecialty.length)
						for (let city of res.result) {
							this.city.push({
								value: city.id,
								label: city.jzwmc,
							})
						}
					})
					.catch((err) => {
						this.$message.warning('获取楼层失败')
					})
			},
			//获取房间
			countyChange(value) {
				this.county = []
				this.ApplyObj.countyId = []

				if (value.length == 0) {
					return
				}
				this.$http.get(this.$http.service.base + 'veCommon/queryRoomListByBuildId', {
							buildId: this.ApplyObj.buildId
						}).then(res => {
						this.county.splice(0, this.addspecialty.length)
						for (let county of res.result) {
							this.county.push({
								value: county.id,
								label: county.name,
							})
						}
					})
					.catch((err) => {
						this.$message.warning('获取房间失败')
					})
			},
			//获取学制
			getXuzhi() {
				this.xuzhi = [];
				this.$http.get(this.$http.service.base + 'veBase/getXueZhiPageList?pageNo=1&pageSize=100', {}).then(res => {
						for (let xuzhi of res.result.list) {
							this.xuzhi.push({
								value: xuzhi.id,
								label: xuzhi.xzmc,
							})
						}
					})
					.catch((err) => {
						this.$message.warning('获取学制列表失败')
					})
			},
		},
	}
</script>
<style lang="less" scoped>
	/deep/ .ant-select{
		width:100%;
	}
</style>
