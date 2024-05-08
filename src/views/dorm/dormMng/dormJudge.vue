<template>
	<div style="background:#E9EDF6; padding:30px">
		<div class="content-title ">
			宿舍卫生评比
		</div>
		<div class="pageContentBox">
			<div class="headTop">宿务管理 > <span class="notTop">宿舍卫生评比</span></div>
			<div class="content-head">

				<div style="min-width: 460px;"></div>
				<div>
					<span class="head-span">校区</span>
					<a-cascader class="condition" :options="school" placeholder="请选择类型" @change="schoolChange"
						v-model="schoolId" />
				</div>

				<div>
					<span class="head-span">宿舍楼</span>
					<a-cascader class="condition" :options="build" placeholder="请选择宿舍楼" @change="buildChange"
						v-model="buildId" />
				</div>

				<div>
					<span class="head-span">楼层</span>
					<a-cascader class="condition" :options="floor" placeholder="请选择宿舍楼" @change="floorChange"
						v-model="floorId" />
				</div>

				<a-button :size="size" class="content-button button-orange" style="font-size:16px;width:88px;height:34px;background-color:#E61A1A " @click="resetAll">
					<icon-font type="iconqingkong1" style="color: #FFFFFF;" />
					清空
				</a-button>
			</div>
			<div class="content-head" style="margin-top: 8px;">
				<div>
					<a-button :size="size" class="content-button button-lightgreen" style="font-size:16px;width:88px;height:34px;background-color:#3a3aff " @click="addJudge">
						<icon-font type="icontianjia" style="color: #FFFFFF;" />
						添加
					</a-button>
					<a-modal title="添加" :visible="add" :confirm-loading="confirmLoading" @ok="addOK" @cancel="addCancel"
						:width="1000">

						<table class="scanTable">
							<tr>
								<td class="single">
									<div>学期:</div>
								</td>
								<td class="double">
									<a-input class="scanInput" v-model="scanTerm" :disabled="true"></a-input>
								</td>
								<td class="single">
									<div>周:</div>
								</td>
								<td class="double">
									<a-input class="scanInput" v-model="scanWeek" :disabled="true"></a-input>
								</td>
							</tr>

							<tr>
								<td class="single">
									<div>校区号-宿舍楼:</div>
								</td>
								<td class="double">
									<a-cascader class="small" :options="scanSchool" placeholder="请选择校区"
										v-model="scanSchoolId" @change="scanSchoolChange" />
									<a-cascader class="small" :options="scanBuild" placeholder="请选择宿舍楼"
										v-model="scanBuildId" @change="scanBuildChange" />
								</td>
								<td class="single">
									<div>楼层-宿舍:</div>
								</td>
								<td class="double">
									<a-cascader class="small" :options="scanFloor" placeholder="请选择楼层"
										v-model="scanFloorId" @change="scanFloorChange" />
									<a-cascader class="small" :options="scanDorm" placeholder="请选择宿舍"
										v-model="scanDormId" />
								</td>
							</tr>

							<tr>
								<td class="single">
									<div>周一:</div>
								</td>
								<td class="double">
									<a-input-number class="scanInput" placeholder="请输入周一分数" v-model="one">
									</a-input-number>
								</td>
								<td class="single">
									<div>周二:</div>
								</td>
								<td class="double">
									<a-input-number class="scanInput" placeholder="请输入周二分数" v-model="two">
									</a-input-number>
								</td>
							</tr>

							<tr>
								<td class="single">
									<div>周三:</div>
								</td>
								<td class="double">
									<a-input-number class="scanInput" placeholder="请输入周三分数" v-model="three">
									</a-input-number>
								</td>
								<td class="single">
									<div>周四:</div>
								</td>
								<td class="double">
									<a-input-number class="scanInput" placeholder="请输入周四分数" v-model="four">
									</a-input-number>
								</td>
							</tr>

							<tr>
								<td class="single">
									<div>周五:</div>
								</td>
								<td class="double">
									<a-input-number class="scanInput" placeholder="请输入周五分数" v-model="five">
									</a-input-number>
								</td>
							</tr>
						</table>

						<template slot="footer">
							<a-button style="background-color:#028be2;color:#ffffff;font-weight:bold" type="primary" @click="addOK">确定</a-button>
							<a-button style="background-color:#999999;color:#ffffff;font-weight:bold" @click="addCancel">取消</a-button>
						</template>
					</a-modal>

					<a-button :size="size" class="content-button button-blue button-after" style="font-size:16px;width:88px;height:34px; " @click="showUpload">
						<icon-font type="iconfanhui" style="color: #FFFFFF;" />
						导入
					</a-button>
					<a-modal v-model="upload" title="导入" @ok="uploadCancel" @cancel="uploadCancel">
						<table class="scanTable">
							<tr>
								<td class="single">导入模版</td>
								<td class="double">
									<a style="font-size: 14px; margin-left: 20px;"
										@click="handleExportXls('宿舍卫生评比模版')">点击下载</a>
								</td>
							</tr>
							<tr>
								<td class="single">选择Excel表格</td>
								<td class="double">
									<a-upload name="file" :showUploadList="false" :multiple="false"
										:headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
										<a-button icon="import">选择文件</a-button>
									</a-upload>
								</td>
							</tr>
						</table>
					</a-modal>

					<a-button :size="size" class="content-button button-skyblue button-after" style="font-size:16px;width:88px;height:34px;background-color:#3a3aff  " @click="getJudgeList">
						<icon-font type="iconxindongfang-shuaxintubiao" style="color: #FFFFFF;" />
						刷新
					</a-button>
				</div>

				<div style="min-width: 120px;"></div>

				<div>
					<span class="head-span">宿舍</span>
					<a-cascader class="condition" :options="dorm" placeholder="请选择宿舍" v-model="dormId" />
				</div>

				<div>
					<span class="head-span">学期</span>
					<a-cascader class="condition" :options="term" placeholder="请选择学期" @change="termChange"
						v-model="termId" />
				</div>

				<div>
					<span class="head-span">周</span>
					<a-cascader class="condition" :options="week" placeholder="请选择周" v-model="weekId" />
				</div>

				<a-button :size="size" class="content-button button-blue" style="font-size:16px;width:88px;height:34px;background-color:#1AE642 " @click="getJudgeList">
					<icon-font type="iconsousuo" style="color: #FFFFFF;" />
					搜索
				</a-button>
			</div>
			<div>
				<a-table :columns="columns" :data-source="data" :defaultCurrent="6" :pagination="pagination"
					@change="tableChange">
					<span slot="operator" slot-scope="text, record">
						<a style="font-size:18px;border-bottom: 1px solid #66C3FD;" @click="editJudge(record.key)">编辑</a>
						<a-modal title="编辑" :visible="edit" :confirm-loading="confirmLoading" @ok="editOK"
							@cancel="editCancel" :width="1000">

							<table class="scanTable">
								<tr>
									<td class="single">
										<div>学期:</div>
									</td>
									<td class="double">
										<a-input class="scanInput" v-model="scanTerm" :disabled="true"></a-input>
									</td>
									<td class="single">
										<div>周:</div>
									</td>
									<td class="double">
										<a-input class="scanInput" v-model="scanWeek" :disabled="true"></a-input>
									</td>
								</tr>

								<tr>
									<td class="single">
										<div>校区号-宿舍楼:</div>
									</td>
									<td class="double">
										<a-cascader class="small" :options="scanSchool" placeholder="请选择校区"
											v-model="scanSchoolId" @change="scanSchoolChange" :disabled="true" />
										<a-cascader class="small" :options="scanBuild" placeholder="请选择宿舍楼"
											v-model="scanBuildId" @change="scanBuildChange" :disabled="true" />
									</td>
									<td class="single">
										<div>楼层-宿舍:</div>
									</td>
									<td class="double">
										<a-cascader class="small" :options="scanFloor" placeholder="请选择楼层"
											v-model="scanFloorId" @change="scanFloorChange" :disabled="true" />
										<a-cascader class="small" :options="scanDorm" placeholder="请选择宿舍"
											v-model="scanDormId" :disabled="true" />
									</td>
								</tr>

								<tr>
									<td class="single">
										<div>周一:</div>
									</td>
									<td class="double">
										<a-input-number class="scanInput" placeholder="请输入周一分数" v-model="one">
										</a-input-number>
									</td>
									<td class="single">
										<div>周二:</div>
									</td>
									<td class="double">
										<a-input-number class="scanInput" placeholder="请输入周二分数" v-model="two">
										</a-input-number>
									</td>
								</tr>

								<tr>
									<td class="single">
										<div>周三:</div>
									</td>
									<td class="double">
										<a-input-number class="scanInput" placeholder="请输入周三分数" v-model="three">
										</a-input-number>
									</td>
									<td class="single">
										<div>周四:</div>
									</td>
									<td class="double">
										<a-input-number class="scanInput" placeholder="请输入周四分数" v-model="four">
										</a-input-number>
									</td>
								</tr>

								<tr>
									<td class="single">
										<div>周五:</div>
									</td>
									<td class="double">
										<a-input-number class="scanInput" placeholder="请输入周五分数" v-model="five">
										</a-input-number>
									</td>
								</tr>
							</table>

							<template slot="footer">
								<a-button type="primary" style="background-color:#028be2;color:#ffffff;font-weight:bold" @click="editOK">确定</a-button>
								<a-button style="background-color:#999999;color:#ffffff;font-weight:bold" @click="editCancel">取消</a-button>
							</template>
						</a-modal>
						<span>|</span>
						<a style="font-size:18px;color:orange; border-bottom: 1px solid orange;"
							@click="deleteJudge(record.key)">删除</a>
					</span>
				</a-table>
			</div>
		</div>
	</div>


</template>

<script>
	import {
		Icon
	} from 'ant-design-vue';
	import {
		axios
	} from '@/utils/request';
	import {
		EduListMixin
	} from '@/mixins/EduListMixin';
	import {
		downFile
	} from '@/api/manage'

	const IconFont = Icon.createFromIconfontCN({
		scriptUrl: '//at.alicdn.com/t/font_2390461_f6v2cx4wmzq.js',
	});

	const columns = [{
			title: '学期',
			dataIndex: 'term',
			key: 'term',
		},
		{
			title: '周',
			dataIndex: 'week',
			key: 'week',
		},
		{
			title: '宿舍名',
			dataIndex: 'dorm',
			key: 'dorm',
		},
		{
			title: '周一',
			dataIndex: 'monday',
			key: 'monday',
		},
		{
			title: '周二',
			dataIndex: 'tuesday',
			key: 'tuesday',
		},
		{
			title: '周三',
			dataIndex: 'wednesday',
			key: 'wednesday',
		},
		{
			title: '周四',
			dataIndex: 'thursday',
			key: 'thursday',
		},
		{
			title: '周五',
			dataIndex: 'friday',
			key: 'friday',
		},
		{
			title: '周平均分',
			dataIndex: 'avg',
			key: 'avg',
		},
		{
			title: '操作',
			dataIndex: 'operator',
			key: 'operator',
			scopedSlots: {
				customRender: 'operator'
			},
		},
	];

	let data = [];

	export default {
		mixins: [EduListMixin],
		data() {
			return {
				pagination: {
					current: 1,
					pageSize: 10,
					pageSizeOptions: ['6', '10'],
					showTotal: (total, range) => {
						return '显示' + range[0] + '到' + range[1] + '条, 共' + total + '条记录'
					},
					showQuickJumper: true,
					showSizeChanger: true,
					total: 1000
				},
				/* 表格数据 */
				data,
				columns,
				add: false,
				/* 按钮大小 */
				size: 'small',
				/* 下拉框数据 */
				school: [],
				schoolId: [],
				build: [],
				buildId: [],
				floor: [],
				floorId: [],
				dorm: [],
				dormId: [],
				term: [],
				termId: [],
				week: [],
				weekId: [],
				/* 添加-弹出框数据 */
				add: false,
				confirmLoading: false,
				scanSchool: [],
				scanSchoolId: [],
				scanBuild: [],
				scanBuildId: [],
				scanFloor: [],
				scanFloorId: [],
				scanDorm: [],
				scanDormId: [],
				scanTermId: '',
				scanMonthId: '',
				scanTerm: '',
				scanWeek: '',
				one: '',
				two: '',
				three: '',
				four: '',
				five: '',
				edit: false,
				oneId: '',
				twoId: '',
				threeId: '',
				fourId: '',
				fiveId: '',
				url: {
					list: 'dorm/wsceil/exportModel',
					exportXlsUrl: 'dorm/wsceil/exportModel',
					importExcelUrl: 'dorm/wsceil/import'
				},
				upload: false,
			};
		},
		mounted() {
			this.getSchoolList();
			this.getTermList();
			this.getJudgeList();
		},
		computed: {
			importExcelUrl: function() {
				return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
			}
		},
		components: {
			IconFont,
		},
		methods: {
			addJudge() {
				axios({
					url: 'dorm/wsceil/addMessage',
					method: 'post',
					param: {}
				}).then(res => {
					this.scanTermId = res.result.semId;
					this.scanMonthId = res.result.month;
					this.scanTerm = res.result.xqmc;
					this.scanWeek = res.result.week;
					var arr = res.result.week;
					this.scanSchoolId = [];
					this.scanBuild = [];
					this.scanBuildId = [];
					this.scanFloor = [];
					this.scanFloorId = [];
					this.scanDorm = [];
					this.scanDormId = [];
					this.one = '';
					this.two = '';
					this.three = '';
					this.four = '';
					this.five = '';
					this.add = true;
				}).catch(err => {
					this.$message.warning("校历表不存在今日日期，无法获取");
				})
			},
			rangeJudge(num) {
				if (parseInt(num) < 0 || parseInt(num) > 100) {
					return false;
				}
				return true;
			},
			scoreJudge(num) {
				if (num > 90) {
					return 'A';
				} else if (num > 80) {
					return 'B';
				} else if (num > 70) {
					return 'C';
				} else if (num > 60) {
					return 'D';
				} else {
					return 'E';
				}
			},
			addOK() {
				this.confirmLoading = true;
				if (this.scanSchoolId.length == 0 || this.scanBuildId.length == 0 || this.scanFloorId.length == 0 ||
					this.scanDormId.length == 0 || this.one == '' || this.two == '' || this.three == '' || this.four ==
					'' ||
					this.five == '') {
					this.$message.warning("请将信息输入完整");
					return;
				}
				// if(this.rangeJudge(this.one) && this.rangeJudge(this.two) && this.rangeJudge(this.three) &&
				// this.rangeJudge(this.four) && this.rangeJudge(this.five)) {
				//   this.$message.success("请输入正确分数 0-100");
				//   return;
				// }
				axios({
					url: 'dorm/wsceil/add',
					method: 'post',
					params: {
						campusId: this.scanSchoolId[0],
						semId: this.scanTermId,
						mouth: this.scanMonthId,
						week: this.scanWeek,
						jzwId: this.scanBuildId[0],
						lcId: this.scanFloorId[0],
						ssId: this.scanDormId[0],
						oneScore: this.one,
						twoScore: this.two,
						threeScore: this.three,
						fourScore: this.four,
						fiveScore: this.five
					}
				}).then(res => {
					this.$message.success(res.message);
					this.getJudgeList();
					this.add = false;
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			addCancel() {
				this.add = false;
			},
			tableChange(pagination, filters, sorter) {
				this.pagination.current = pagination.current;
				this.pagination.pageSize = pagination.pageSize;
			},
			/* 获取校区列表 */
			getSchoolList() {
				axios({
					url: 'dorm/laiFang/xiaoQu',
					method: 'post',
					params: {}
				}).then(res => {
					this.school.splice(0, this.school.length);
					this.scanSchool.splice(0, this.scanSchool.length);
					for (let school of res.result) {
						this.school.push({
							value: school.id,
							label: school.name
						});
						this.scanSchool.push({
							value: school.id,
							label: school.name
						});
					}
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			/* 获取宿舍楼列表 */
			schoolChange(value) {
				this.build = [];
				this.buildId = [];
				this.floor = [];
				this.floorId = [];
				this.dorm = [];
				this.dormId = [];
				if (value.length == 0) {
					return;
				}
				axios({
					url: 'dorm/laiFang/suSheLou',
					method: 'post',
					params: {
						"XQBH": this.schoolId[0]
					}
				}).then(res => {
					this.build.splice(0, this.build.length);
					for (let build of res.result) {
						this.build.push({
							value: build.id,
							label: build.name
						})
					}
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			/* 添加/编辑-获取宿舍楼列表 */
			scanSchoolChange(value) {
				this.scanBuild = [];
				this.scanBuildId = [];
				this.scanFloor = [];
				this.scanFloorId = [];
				this.scanDorm = [];
				this.scanDormId = [];
				if (value.length == 0) {
					return;
				}
				axios({
					url: 'dorm/laiFang/suSheLou',
					method: 'post',
					params: {
						"XQBH": this.scanSchoolId[0]
					}
				}).then(res => {

					this.scanBuild.splice(0, this.scanBuild.length);
					for (let build of res.result) {
						this.scanBuild.push({
							value: build.id,
							label: build.name
						})
					}
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			/* 获取楼层列表 */
			buildChange(value) {
				this.floor = [];
				this.floorId = [];
				this.dorm = [];
				this.dormId = [];
				if (value.length == 0) {
					return;
				}
				axios({
					url: 'dorm/floorMng/select',
					method: 'post',
					params: {
						"xqId": this.schoolId[0],
						"sslId": this.buildId[0],
					}
				}).then(res => {
					this.floor.splice(0, this.floor.length);
					for (let floor of res.result) {
						this.floor.push({
							value: floor.id,
							label: floor.lcname
						})
					}
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			/* 添加/编辑-获取楼层列表 */
			scanBuildChange(value) {
				this.scanFloor = [];
				this.scanFloorId = [];
				this.scanDorm = [];
				this.scanDormId = [];
				if (value.length == 0) {
					return;
				}
				axios({
					url: 'dorm/floorMng/select',
					method: 'post',
					params: {
						"xqId": this.scanSchoolId[0],
						"sslId": this.scanBuildId[0],
					}
				}).then(res => {

					this.scanFloor.splice(0, this.scanFloor.length);
					for (let floor of res.result) {
						this.scanFloor.push({
							value: floor.id,
							label: floor.lcname
						})
					}
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			/* 获取宿舍列表 */
			floorChange(value) {
				this.dorm = [];
				this.dormId = [];
				if (value.length == 0) {
					return;
				}
				axios({
					url: 'dorm/dormMng/select',
					method: 'post',
					params: {
						"xqId": this.schoolId[0],
						"jzwId": this.buildId[0],
						"lcId": this.floorId[0]
					}
				}).then(res => {

					this.dorm.splice(0, this.dorm.length);
					for (let dorm of res.result) {
						this.dorm.push({
							value: dorm.id,
							label: dorm.fjbm
						})
					}
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			/* 添加/编辑-获取宿舍列表 */
			scanFloorChange(value) {
				this.scanDorm = [];
				this.scanDormId = [];
				if (value.length == 0) {
					return;
				}
				axios({
					url: 'dorm/dormMng/select',
					method: 'post',
					params: {
						"xqId": this.scanSchoolId[0],
						"jzwId": this.scanBuildId[0],
						"lcId": this.scanFloorId[0]
					}
				}).then(res => {

					this.scanDorm.splice(0, this.scanDorm.length);
					for (let dorm of res.result) {
						this.scanDorm.push({
							value: dorm.id,
							label: dorm.fjbm
						})
					}
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			getTermList() {
				axios({
					url: 'dorm/wsceil/semester',
					method: 'post',
					params: {}
				}).then(res => {
					this.term.splice(0, this.term.length);
					for (let term of res.result) {
						this.term.push({
							value: term.id,
							label: term.xqmc
						})
					}
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			termChange(value) {
				this.week = [];
				this.weekId = [];
				if (value.length == 0) {
					return;
				}
				axios({
					url: 'dorm/wsceil/weekNum',
					method: 'post',
					params: {
						semester: this.termId[0]
					}
				}).then(res => {
					console.log(res);
					this.week.splice(0, this.week.length);
					for (let week of res.result) {
						this.week.push({
							value: week.id,
							label: week.dates+' 第'+week.week+'周'
						})
					}
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			getJudgeList() {
				let campusId = this.schoolId.length == 0 ? '' : this.schoolId[0];
				let jzwId = this.buildId.length == 0 ? '' : this.buildId[0];
				let lcId = this.floorId.length == 0 ? '' : this.floorId[0];
				let ssId = this.dormId.length == 0 ? '' : this.dormId[0];
				let semId = this.termId.length == 0 ? '' : this.termId[0];
				let weekNum = this.weekId.length == 0 ? '' : this.weekId[0];
				axios({
					url: 'dorm/wsceil/queryByName',
					method: 'post',
					params: {
						campusId: campusId,
						jzwId: jzwId,
						lcId: lcId,
						ssId: ssId,
						semId: semId,
						weekNum: weekNum
					}
				}).then(res => {

					data.splice(0, data.length);
					for (let judge of res.result) {
						let avg = (judge.one + judge.two + judge.three + judge.four + judge.five) / 5;
						data.push({
							key: judge.id,
							term: judge.semName,
							week: '第' + judge.weekNum + '周',
							dorm: judge.campusName + '-' + judge.jzwName + '-' + judge.lcName + '-' + judge
								.ssName,
							monday: judge.one,
							tuesday: judge.two,
							wednesday: judge.three,
							thursday: judge.four,
							friday: judge.five,
							avg: avg + ',评比等级(' + this.scoreJudge(parseFloat(avg)) + ')'
						})
					}
					this.pagination.current = 1;
					this.pagination.total = data.length;
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			deleteJudge(id) {
				let re = confirm("确认删除");
				if (re) {
					axios({
						url: 'dorm/wsceil/delete',
						method: 'post',
						params: {
							id: id
						}
					}).then(res => {
						this.$message.success(res.message);
						this.getJudgeList();
					}).catch(err => {
						this.$message.warning("此处有异常");
					})
				}
			},
			editJudge(id) {
				console.log(id);
				axios({
					url: 'dorm/wsceil/updateMessage',
					method: 'post',
					params: {
						id: id
					}
				}).then(res => {

					this.scanWeek = res.result[0].weekNum;
					let termName;
					for (let term of this.term) {
						if (term.value == res.result[0].semId) {
							termName = term.label;
						}
					}
					this.scanTerm = termName;
					this.scanTermId = res.result[0].semId;
					this.scanSchoolId = [res.result[0].campusId];
					this.scanSchoolChange([0]);
					this.scanBuildId = [res.result[0].jzwId];
					this.scanBuildChange([0]);
					this.scanFloorId = [res.result[0].lcId];
					this.scanFloorChange([0]);
					this.scanDormId = [res.result[0].ssId];
					for (let judge of res.result) {
						if (judge.week == 1) {
							this.one = judge.score;
							this.oneId = judge.id;
						} else if (judge.week == 2) {
							this.two = judge.score;
							this.twoId = judge.id;
						} else if (judge.week == 3) {
							this.three = judge.score;
							this.threeId = judge.id;
						} else if (judge.week == 4) {
							this.four = judge.score;
							this.fourId = judge.id;
						} else if (judge.week == 5) {
							this.five = judge.score;
							this.fiveId = judge.id;
						}
					}
					this.edit = true;
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			editOK() {
				if (this.one == '' || this.two == '' || this.three == '' || this.four == '' || this.five == '') {
					this.$message.warning("请将信息输入完整");
					return;
				}
				axios({
					url: 'dorm/wsceil/update',
					method: 'post',
					params: {
						oneId: this.oneId,
						oneScore: this.one,
						twoId: this.twoId,
						twoScore: this.two,
						threeId: this.threeId,
						threeScore: this.three,
						fourId: this.fourId,
						fourScore: this.four,
						fiveId: this.fiveId,
						fiveScore: this.five
					}
				}).then(res => {
					this.$message.success(res.message);
					this.getJudgeList();
					this.edit = false;
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			editCancel() {
				this.edit = false;
			},
			resetAll() {
				this.schoolId = [];
				this.build = [];
				this.buildId = [];
				this.floor = [];
				this.floorId = [];
				this.dorm = [];
				this.dormId = [];
				this.termId = [];
				this.week = [];
				this.weekId = [];
			},
			showUpload() {
				this.upload = true;
			},
			uploadCancel() {
				this.upload = false;
			}
		},
	};
</script>

<style>
	..ant-pagination {
		bottom: 40px;
	}
</style>
