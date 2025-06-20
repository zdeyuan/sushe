<template>
	<div class='constbox'>

		<div class="pageContentBox">
			<div class="content-head">

				<div>

					<span class="head-span">到达地点：</span>
					<a-cascader class="condition" :options="endPlace" placeholder="请选择" v-model="endPlaceId" />

					<span class="head-span">到达时间：</span>

					<a-date-picker :showTime="{ format: 'HH:mm' }" @change="onChangeDate" v-model="curStaTime"
						placeholder="请选择日期" />

					<span class="head-span" style="margin: 0 10px;">至</span>

					<a-date-picker :showTime="{ format: 'HH:mm' }" @change="onChangeDate" v-model="curEndTime"
						class="condition" placeholder="请选择日期" />

					<span class="head-span">校车接送：</span>
					<a-cascader class="condition" :options="isNeed" placeholder="请选择" v-model="isNeedId" />
					<a-button type="primary" icon="search" style="margin-right: 10px;" @click="search">

						搜索
					</a-button>

					<a-button type="danger" icon="delete" style="margin-right: 10px;" @click="empty">

						清空
					</a-button>
				</div>
			</div>

			<div class="content-head">
				<div>

					<a-button type="primary" icon="plus" @click="showPanel('add')">
						<span class="flex_box">

							新增
						</span>
					</a-button>


					<a-button type="primary" icon="reload" style="margin-left: 10px;" @click="refresh">
						<span class="flex_box">

							刷新
						</span>
					</a-button>
				</div>
			</div>

			<div>
				<a-table :columns="columns" :scroll="{ x: 1500 }" :data-source="data" :row-selection="rowSelection"
					:defaultCurrent="6" :pagination="pagination" @change="tableChange">
					<span slot="operator" slot-scope="text, record">
						<a class="text-btn-color2" @click="showMsg(record)">查看</a><a-divider type="vertical" />
						<a class="text-btn-color3" @click="showPanel('update', record)">编辑</a>
						<a-divider type="vertical" />
						<a class="text-btn-color4" @click="deleteRecord(record)">删除</a>


					</span>
				</a-table>
				<a-modal v-model="visibleDelete" title="删除页面" @ok="Delete">
					<template slot="footer">
						<a-button key="back" @click="Delete" class="btn"> 确定</a-button>
						<a-button key="submit" type="primary" @click="closePop" class="btn-cancle">取消</a-button>
					</template>
					<div class="delete-text">确认执行删除?</div>
				</a-modal>
				<!--  -->
				<a-modal v-model="visibleLook" :title="'查看新生报到信息'" on-ok="handleOk" :width="1073">
					<template slot="footer">
						<a-button key="submit" type="primary" @click="cancel" class="btn-cancle"> 返回 </a-button>
						<!-- <a-button key="back" @click="cancel" class="btn"> 确定 </a-button> -->

					</template>
					<table class="scanTable" style="text-align: left">
						<tr class="tr-style">
							<td class="td-div">
								<div class="font-style">姓名</div>
							</td>
							<td colspan="3" class="double">
								<!-- 姓名输入框 -->
								<a-input class="input-style-replyTwo" v-model="entityObj.stuName"
									aria-readonly="true"></a-input>
							</td>

						</tr>

						<tr class="tr-style">
							<td class="td-div">
								<div class="font-style">身份证号</div>
							</td>
							<td colspan="3" class="double">
								<!-- 身份证号输入框 -->
								<a-input class="input-style-reply" v-model.trim="entityObj.stuID"
									aria-readonly="true"></a-input>
							</td>
						</tr>

						<tr class="tr-style">
							<td class="td-div">
								<div class="font-style">出发时间</div>
							</td>
							<td colspan="3" class="double">
								<!-- 出发时间的输入框 -->
								<!-- <a-date-picker :showTime="{ format: 'HH:mm' }" :disabledTime="disabledDateTime" 
				class="input-style-reply date-style-Apply" @change="onChangeDate" v-model="entityObj.startTime" placeholder="请选择日期"  />-->
								<a-input v-model="entityObj.startTime" style="width:300px" aria-readonly="true"></a-input>
							</td>
						</tr>

						<tr class="tr-style">
							<td class="td-div">
								<div class="font-style">出发地点</div>
							</td>
							<td colspan="3" class="double">
								<a-input class="input-style-reply" v-model="entityObj.startPlace"
									aria-readonly="true"></a-input>
							</td>
						</tr>
						<!-- </td>
            </tr>  -->

						<tr class="tr-style">
							<td class="td-div">
								<div class="font-style" style="width:150px">搭乘的交通工具</div>
							</td>
							<td colspan="3" class="input-style-replyTwo">
								<a-input class="input-style-reply" v-model="entityObj.vehicleName"
									aria-readonly="true"></a-input>
							</td>
						</tr>

						<tr class="tr-style">
							<td class="td-div">
								<div class="font-style">交通工具信息</div>
							</td>
							<td colspan="3" class="input-style-replyTwo">
								<a-input class="input-style-replyTwo" v-model="entityObj.vehicleCode"
									aria-readonly="true"></a-input>
							</td>
						</tr>

						<tr class="tr-style">
							<td class="td-div">
								<div class="font-style">到达时间</div>
							</td>
							<td colspan="3" class="double">
								<!-- <a-date-picker :showTime="{ format: 'HH:mm' }" :disabledTime="disabledDateTime" 
				class="input-style-reply date-style-Apply" @change="onChangeDate" v-model="entityObj.endTime" placeholder="请选择日期"  /> -->
								<a-input v-model="entityObj.endTime" aria-readonly="true" style="width:300px"></a-input>
							</td>
						</tr>

						<tr class="tr-style">
							<td class="td-div">
								<div class="font-style">到达地点</div>
							</td>
							<td colspan="3" class="double">
								<a-input class="input-style-reply" v-model="entityObj.endPlace"
									aria-readonly="true"></a-input>
							</td>
						</tr>
						<tr class="tr-style">
							<td class="td-div">
								<div class="font-style">随行人数</div>
							</td>
							<td colspan="3" class="double">
								<a-input class="input-style-reply" v-model="entityObj.accompanyNumber"
									aria-readonly="true"></a-input>
							</td>
						</tr>
						<tr class="tr-style">
							<td class="td-div">
								<div class="font-style" style="width:150px">是否需要校车接送</div>
							</td>
							<td colspan="3" class="double">
								<a-input class="input-style-reply" v-model="curNeedName" aria-readonly="true"></a-input>
							</td>
						</tr>
					</table>
				</a-modal>
				<a-modal v-model="visible" :title="(mode === 'add' ? '添加' : '编辑') + '新生报到信息'" on-ok="handleOk"
					:width="1073">
					<template slot="footer">
						<a-button key="submit" type="primary" @click="cancel" class="btn-cancle"> 返回 </a-button>
						<a-button key="back" @click="handleOk" class="btn"> 确定 </a-button>

					</template>
					<table class="scanTable" style="text-align: left">
						<tr class="tr-style">
							<td class="td-div">
								<div class="font-style">姓名</div>
							</td>
							<td colspan="3" class="double">
								<!-- 姓名输入框 -->
								<a-input class="input-style-reply" v-model="entityObj.stuName" v-on:blur="nameBule()"
									placeholder="请输入姓名"></a-input>
							</td>

						</tr>

						<tr class="tr-style">
							<td class="td-div">
								<div class="font-style">身份证号</div>
							</td>
							<td colspan="3" class="double">
								<!-- 身份证号输入框 -->
								<a-input class="input-style-reply" v-model.trim="entityObj.stuID" v-on:blur="idCheck()"
									placeholder="请输入身份证号"></a-input>
							</td>
						</tr>

						<tr class="tr-style">
							<td class="td-div">
								<div class="font-style">出发时间</div>
							</td>
							<td colspan="3" class="double">
								<!-- 出发时间的输入框 -->
								<a-date-picker :showTime="{ format: 'HH:mm' }" class=" date-style-Apply"
									@change="onChangeDate" v-model="entityObj.startTime" placeholder="请选择日期" />
							</td>
						</tr>

						<tr class="tr-style">
							<td class="td-div">
								<div class="font-style">出发地点</div>
							</td>
							<td colspan="3" class="double">
								<a-input class="input-style-reply" v-model="entityObj.startPlace"
									placeholder="请输入出发地点"></a-input>
								<!-- 省份下拉框
            <a-select
              class="input-style-replyTwo"
              :options="province"
              placeholder="请选择省份"
              @change="cityChange"
              v-model="entityObj.provinceId"
              
            />

            市级下拉框 -->
								<!-- @change="countyChange" -->
								<!-- <a-select
              class="input-style-replyTwo"
              :options="city"
              placeholder="请选择市区"
			  @change='cityUp'
              v-model="entityObj.cityId"
               
            /> -->

								<!-- <a-button type="danger" style="margin-left: 10px;" @click="clearArea">
              
              清除
            </a-button> -->

							</td>
						</tr>
						<!-- </td>
            </tr>  -->

						<tr class="tr-style">
							<td class="td-div">
								<div class="font-style" style="width:150px">搭乘的交通工具</div>
							</td>
							<td colspan="3" class="double">
								<a-cascader class="input-style-replyTwo" :options="vehicle" placeholder="请选择"
									v-model="entityObj.vehicleId" />
							</td>
						</tr>

						<tr class="tr-style">
							<td class="td-div">
								<div class="font-style">交通工具信息</div>
							</td>
							<td colspan="3" class="double">
								<a-input class="input-style-reply" v-model="entityObj.vehicleCode"
									placeholder="请输入交通工具信息"></a-input>
							</td>
						</tr>

						<tr class="tr-style">
							<td class="td-div">
								<div class="font-style">到达时间</div>
							</td>
							<td colspan="3" class="double">
								<a-date-picker :showTime="{ format: 'HH:mm' }" class="  date-style-Apply"
									@change="onChangeDate" v-model="entityObj.endTime" placeholder="请选择日期" />
							</td>
						</tr>

						<tr class="tr-style">
							<td class="td-div">
								<div class="font-style">到达地点</div>
							</td>
							<td colspan="3" class="double">
								<a-cascader class="input-style-replyTwo" :options="endPlace" placeholder="请选择"
									v-model="entityObj.endPlaceId" ref="endPlace" />
							</td>
						</tr>
						<tr class="tr-style">
							<td class="td-div">
								<div class="font-style">随行人数</div>
							</td>
							<td colspan="3" class="double">
								<a-input class="input-style-reply" oninput="value=value.replace(/[^\d]/g,'')"
									v-model="entityObj.accompanyNumber" placeholder="请输入随行人数"></a-input>
							</td>
						</tr>
						<tr class="tr-style">
							<td class="td-div">
								<div class="font-style" style="width:150px">是否需要校车接送</div>
							</td>
							<td colspan="3" class="double">
								<a-radio-group v-model="entityObj.isSchool" @change="onChangeNeed"
									class="input-style-replyTwo">
									<a-radio :value="1"> 否 </a-radio>
									<a-radio :value="2"> 是 </a-radio>
								</a-radio-group>
							</td>
						</tr>
					</table>
				</a-modal>
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
	} from "@/utils/request"

	const IconFont = Icon.createFromIconfontCN({
		scriptUrl: '//at.alicdn.com/t/font_2390461_f6v2cx4wmzq.js',
	});

	const columns = [{
			title: '姓名',
			dataIndex: 'stuName',
			key: 'stuName',
			fixed: 'left',
			width: 150
		},
		{
			title: '身份证号',
			dataIndex: 'stuID',
			key: 'stuID',
			fixed: 'left',
			width: 200
		},
		{
			title: '出发时间',
			dataIndex: 'startTime',
			key: 'startTime',
			width: 250
		},
		{
			title: '出发地点',
			dataIndex: 'startPlace',
			key: 'startPlace',
			width: 250
		},
		{
			title: '搭乘的交通工具',
			dataIndex: 'vehicleName',
			key: 'vehicleName',
			width: 250
		},

		{
			title: '交通工具信息',
			dataIndex: 'vehicleCode',
			key: 'vehicleCode',
			width: 250
		},
		{
			title: '到达时间',
			dataIndex: 'endTime',
			key: 'endTime',
			width: 250
		},
		{
			title: '到达地点',
			dataIndex: 'endPlace',
			key: 'endPlace',
			width: 250
		},
		{
			title: '随行人数',
			dataIndex: 'accompanyNumber',
			key: 'accompanyNumber',
			width: 150
		},
		{
			title: '需要校车接送',
			dataIndex: 'isSchool',
			key: 'isSchool',
			width: 200
		},
		{
			title: '操作',
			dataIndex: 'operator',
			// width: '10%',
			key: 'operator',
			fixed: 'right',
			width: 200,
			scopedSlots: {
				customRender: 'operator'
			},
		},
	];

	let data = [];

	export default {
		data() {
			return {

				//添加弹窗的对象属性
				MessageObj: {
					id: 0,
					stuName: '',
					stuID: '',
					startTime: '',
					startPlace: '',
					provinceId: '',
					startPlaceId: '',
					countyId: '',
					vehicleName: '',
					vehicleCode: '',
					endTime: '',
					endPlace: '',
					accompanyNumber: '',
					isSchool: '',
				}, //弹窗对象
				pagination: {
					current: 0,
					pageSize: 8,
					showSizeChanger: true,
					pageSizeOptions: ['8', '10', '20', '30', '50'],
					showTotal: (total, range) => {
						return '显示' + range[0] + '到' + range[1] + '条, 共' + total + '条记录'
					},
					showQuickJumper: true,
					total: 0
				},
				selectedRowKeys: [],
				/* 页码 */
				currentPage: 1,
				pageSize: 10,
				/* 关键词 */
				keyword: '',
				kw: '',
				/* 表格数据 */
				data,
				columns,
				/* 按钮大小 */
				size: 'small',
				/* 下拉框数据 */
				isNeed: [],
				isNeedId: [],
				//出发时间与到达时间
				staTime: '',
				endTime: '',
				//到达地点
				endPlace: [],
				endPlaceId: [],
				//出发地点
				staPlace: [],
				staPlaceId: [],
				//搭乘的交通工具
				vehicle: [],
				vehicleId: [],
				//省份
				province: [],
				provinceId: [],

				curProvinceId: 0,
				//市级
				city: [],
				cityId: [],

				curEndPlace: '',
				curStaTime: 0,
				curEndTime: 0,
				curNeed: 0,
				curNeedName: '',
				//模式选择add为添加，look为查看，update为编辑
				mode: 'add',
				condit: '',
				/* 按条件搜索报到的数量 */
				reportCount: 0,
				/* 弹出框属性 */
				visibleLook: false,
				visible: false,
				loading: false,
				/* 弹窗对象 */
				entityObj: {},
				//删除的弹窗
				visibleDelete: false,

			};
		},
		mounted() {
			this.getReportMsg();
			this.getPlace();
			this.getNeed();
			this.getProvince();
			this.getVehicle();
		},
		computed: {
			rowSelection() {
				const selectedRowKeys = this.selectedRowKeys; //常量

				return {
					selectedRowKeys,
					onChange: this.onSelectChange,
				};
			}
		},
		components: {
			IconFont,
		},
		methods: {
			handleOk() {
				//数据整合
				this.entityObj.startTime = this.todate(this.entityObj.startTime);
				this.entityObj.endTime = this.todate(this.entityObj.endTime);
				this.entityObj.endPlaceId = this.entityObj.endPlaceId[0];
				this.entityObj.vehicleId = this.vehicle.length == 0 ? 0 : this.entityObj.vehicleId[0];
				this.entityObj.startPlaceId = this.entityObj.startPlaceId;
				if (typeof this.entityObj.provinceId == 'object') {
					this.entityObj.provinceId = this.entityObj.provinceId[0]
				} else {
					this.entityObj.provinceId = this.entityObj.provinceId;
				}
				//调用方法
				if (this.mode == "add") {
					// this.entityObj.startPlaceId = this.entityObj.cityId[0];
					this.checkNull();
					this.saveMessage();
				} else if (this.mode == "update") {
					console.log("update进来了");
					this.checkNull();
					this.updateMessage();
				}
			},
			cityUp(e) {
				console.log(e)
				this.entityObj.startPlaceId = e
			},
			//清除户口下拉框
			clearArea() {

				this.province = [];
				this.provinceId = [];
				this.cityId = [];
				this.city = [];
				this.getProvince();

			},
			//校验名字不为空
			nameBule() {
				let xm = this.entityObj.stuName;
				if (xm != undefined && xm.length > 0) {} else {
					this.$message.warning('姓名不能为空');
				}

			},
			// 验证是否是身份证
			idCheck() {
				let sfzh = this.entityObj.stuID
				let idRule =
					/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[X])$)$/
				if (!idRule.test(sfzh) && sfzh != undefined) {
					this.$message.warning('请输入正确的身份证号')
					//清空身份证
					this.entityObj.stuID = '';
				}
			},
			//是否需要校车接送
			onChangeNeed() {},


			//显示添加弹窗
			// 获取点击状态位置 
			// 根据状态判断添加/修改
			// msg 为修改点击使用的数据
			// 用于回显数据
			showPanel(mode, a) {
				this.cancel();
				this.mode = mode;
				//数据整合

				console.log(this.mode + "mode")
				//entityObj中加id
				if (mode !== 'add') {
					this.getReportMsgById(a);
					this.entityObj.isSchool = this.entityObj.isSchool;
					this.vehicleId[0] = this.entityObj.vehicleId;
					this.cityId[0] = this.entityObj.provinceId;

					this.provinceId[0] = this.entityObj.startPlaceId;

					this.entityObj.id = a.key;
				} else {
					this.entityObj = {};
				}
				this.visible = true;
			},
			//修改的方法
			updateMessage() {
				// console.log(this.entityObj.cityId+"city");
				this.entityObj.staTime = this.todate(this.entityObj.staTime);
				this.entityObj.endTime = this.todate(this.entityObj.endTime);
				console.log(this.entityObj.endTime + "xiugaishijan")
				// // this.entityObj.startPlaceId = this.entityObj.cityId;
				console.log(this.entityObj.startPlaceId + "start");
				//发送请求
				// console.log(this.entityObj)
				// return
				axios({
					url: 'enroll/reportMessage/update',
					method: 'post',
					data: this.entityObj,
				}).then(res => {
					if (res.code == 200) {
						this.getReportMsg()
						this.cancel();
						this.$message.success(res.result)
					} else if (res.code == 500) {
						this.getReportMsg()
						// this.cancel();
						this.$message.warning(res.result)
					}
				}).catch(err => {
					this.$message.warning("操作失败");
				})
			},

			//保存的方法
			saveMessage() {
				this.entityObj.startPlaceId = this.entityObj.cityId;
				// this.entityObj.staTime = this.todate(this.entityObj.staTime);
				// this.entityObj.endTime = this.todate(this.entityObj.endTime);
				//发送请求
				axios({
					url: 'enroll/reportMessage/save',
					method: 'post',
					data: this.entityObj,
				}).then(res => {
					if (res.code == 200) {
						this.getReportMsg()
						this.cancel();
						this.$message.success(res.result)
					} else if (res.code == 500) {
						this.getReportMsg()
						this.cancel();
						this.$message.warning(res.result)
					}
				}).catch(err => {
					this.$message.warning("操作失败");
				})
			},
			//删除的方法
			Delete() {
				this.deleteStu()
				this.visibleDelete = false
				console.log('删除后', this.selectedRowKeys.length)
				this.selectedRowKeys = []
			},
			//删除取消
			closePop() {
				this.visibleDelete = false

				this.selectedRowKeys = []
			},
			//删除的ajax
			deleteStu() {
				// if (this.selectedRowKeys.length <= 0) {
				//   alert('没有选中')
				//   return
				// }
				var id = this.ys
				//用于传递的全局变量
				var obj = {}
				for (var i = 0; i < this.data.length; i++) {
					if (id == this.data[i].key) {
						obj = this.data[i]
						break
					}
				}
				axios({
					url: 'enroll/reportMessage/delete',
					method: 'post',
					params: obj,
				}).then((res) => {
					console.log('删除', res.code)
					if (res.code == 200) {
						this.getReportMsg()
						this.$message.success('删除成功')
					} else if (res.code == 500) {
						this.getReportMsg()
						this.$message.warning('删除失败')
					}
				})
			},

			//根据id获取报道信息
			getReportMsgById(a) {
				axios({
					url: 'enroll/reportMessage/selectReportMsgById',
					method: 'post',
					params: {
						"id": a.key
					}
				}).then(res => {
					console.log(res.result + "houduanfanhui")
					var msg = res.result
					msg.vehicleId = [res.result.vehicleId]
					// msg.provinceId = [res.result.provinceId]
					msg.cityId = res.result.startPlace
					msg.provinceId = [res.result.provinceId]
					msg.endPlaceId = [res.result.endPlaceId]
					this.entityObj = msg
					console.log(this.entityObj)
					this.curNeedName = this.entityObj.isSchool == 1 ? '否' : '是';
				}).catch(err => {
					this.$message.warning("获取新生报到信息失败");
				})
			},
			//start
			showMsg(a) {
				this.getReportMsgById(a);
				this.visibleLook = true;
			},
			handleClose(e) {
				setTimeout(() => {
					this.visible = false;
					this.loading = false;
				});
			},
			handlePrint(e) {
				this.visible = false;
			},
			// end

			onSelectChange(selectedRowKeys) {
				this.selectedRowKeys = selectedRowKeys;

			},
			//删除的弹窗提示
			deleteRecord(zsjh) {
				// if (this.selectedRowKeys.length == 0) {
				//   this.$message.warning('请选择要删除的！')
				//   return
				// }
				this.ys = zsjh.key
				this.visibleDelete = true
			},
			empty() {
				this.endPlace = [];
				this.endPlaceId = [];
				this.curStaTime = '';
				this.curEndTime = '';
				this.isNeed = [];
				this.isNeedId = [];
				this.getPlace();
				this.getNeed();
			},
			search() {
				this.currentPage = 1;
				this.curEndPlace = this.endPlaceId.length == 0 ? 0 : this.endPlaceId[0];
				this.curNeed = this.isNeedId.length == 0 ? 0 : this.isNeedId[0];
				this.getReportMsg();

			},
			refresh() {
				this.selectedRowKeys = [];
				this.getReportMsg();
			},

			tableChange(pagination) {

				this.pagination.current = pagination.current;
				this.pagination.pageSize = pagination.pageSize;

				this.currentPage = pagination.current;
				this.pageSize = pagination.pageSize;

				this.getReportMsg();

			},
			// 日期选择器
			onChangeDate(date, dateString) {

			},

			getReportMsg() {

				let currentPage = this.currentPage;
				let pageSize = this.pageSize;
				let staTime = this.todate(this.curStaTime);
				let entTime = this.todate(this.curEndTime);
				console.log(this.curStaTime + "curtime");

				axios({

					url: 'enroll/reportMessage/selectReportMsg',
					method: 'post',
					params: {
						"endPlaceId": this.curEndPlace,
						"staTime": staTime,
						"endTime": entTime,
						"isNeed": this.curNeed,

						"currentPage": currentPage,

						"pageSize": pageSize

					}
				}).then(res => {
					if (res.code == 500) {
						this.$message.warning(res.message)
						return
					}

					data.splice(0, data.length);

					if (res.result.list.length == 0) {
						this.$message.warning("暂无新生报到信息！");
						return;
					}

					for (let reportMsg of res.result.list) {
						let need = reportMsg.isSchool == 1 ? '否' : '是';
						data.push({
							key: reportMsg.id,
							stuName: reportMsg.stuName,
							// --------------林彬辉
							stuID: reportMsg.stuID,
							startTime: reportMsg.startTime,
							// ------------
							endTime: reportMsg.endTime,
							startPlace: reportMsg.startPlace,
							endPlace: reportMsg.endPlace,
							isSchool: need,
							accompanyNumber: reportMsg.accompanyNumber,
							vehicleName: reportMsg.vehicleName,
							vehicleCode: reportMsg.vehicleCode
						})
					}
					this.pagination.current = currentPage;
					this.pagination.total = res.result.count;
				}).catch(err => {
					this.$message.warning("获取新生报到信息列表失败");
				})
			},
			//获取搭乘的交通工具列表
			getVehicle() {
				axios({
						url: 'enroll/ApplyMsgMng/getSysDict',
						method: 'post',
						params: {
							dictCode: 'vehicle_type',
						},
					})
					.then((res) => {
						console.log(res)
						for (let vehicle of res.result) {
							this.vehicle.push({
								value: vehicle.id,
								label: vehicle.itemText,
							})
						}
					})
					.catch((err) => {})
			},
			//获取到达地点列表
			getPlace() {
				axios({
						url: 'enroll/ApplyMsgMng/getSysDict',
						method: 'post',
						params: {
							dictCode: 'end_place',
						},
					})
					.then((res) => {
						for (let endPlace of res.result) {
							console.log(endPlace.itemText + "地点");
							this.endPlace.push({
								value: endPlace.id,
								label: endPlace.itemText,
							})
						}
					})
					.catch((err) => {
						this.$message.warning('获取到达地点列表失败')
					})
			},

			getNeed() {
				let isNeed = [{
					text: '是',
					value: '2'
				}, {
					text: '否',
					value: '1'
				}];
				for (let need of isNeed) {
					console.log(need.value + "vale")
					this.isNeed.push({
						label: need.text,
						value: need.value
					})
				}
			},
			//获取省份列表
			getProvince() {
				axios({
						url: 'enroll/ApplyMsgMng/getProvince',
						method: 'post',
						params: {},
					})
					.then((res) => {
						for (let province of res.result) {
							this.province.push({
								value: province.id,
								label: province.name,
							})
						}

					})
					.catch((err) => {
						this.$message.warning('获取省份列表失败')
					})
			},
			//获取市区列表
			cityChange(value) {
				// this.entityObj.startPlaceId = 0;lbh
				// this.entityObj.startPlaceId = this.entityObj.cityId[0];
				// ====
				this.city = [];
				this.cityId = [];

				if (value.length == 0) {
					return
				}

				axios({
						url: 'enroll/ApplyMsgMng/getCity',
						method: 'post',
						params: {
							id: value,
						},
					})
					.then((res) => {
						// this.city.splice(0, this.addspecialty.length)
						for (let city of res.result) {
							console.log(city.id + "cityid");
							this.city.push({
								value: city.id,
								label: city.name,
							})
						}
					})
					.catch((err) => {
						this.$message.warning('获取市区失败')
					})
			},
			//转换时间格式
			todate: function(date) {
				var json_date = new Date(date).toJSON();
				// return new Date(new Date(json_date)).toISOString().replace(/-/g,"/").replace(/\.[\d]{3}Z/, '')
				return new Date(new Date(json_date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(
					/\.[\d]{3}Z/, '')
			},
			checkNull() {
				if (this.entityObj.endTime == undefined) {
					this.$message.warning('请填写到达时间');
					return;
				}
				if (this.entityObj.endPlaceId == 0 || this.entityObj.endPlaceId == undefined) {
					this.$message.warning('请选择到达地点');
					console.log("未选择地点")
					return;
				}
				if (this.entityObj.accompanyNumber == "" || this.entityObj.accompanyNumber == undefined) {
					this.$message.warning('请填写随行人数');
					return;
				}
				if (this.entityObj.isSchool == 0 || this.entityObj.isSchool == undefined) {
					this.$message.warning('请选择是否需要校车接送');
					return;
				}

			},
			//添加窗口 取消按钮
			cancel() {
				this.entityObj = {
					id: 0,
					stuName: '',
					stuID: '',
					startTime: '',
					startPlace: '',
					provinceId: '',
					cityId: '',
					countyId: '',
					vehicleName: '',
					vehicleCode: '',
					endTime: '',
					endPlace: '',
					accompanyNumber: '',
					isSchool: '',
				}
				// this.clearArea()
				// this.clearReplay()
				this.visible = false;
				this.visibleLook = false;
			},

		}
	};
</script>

<style scoped>
	.stuInfo-input {
		margin-left: 10px;
	}

	.export-button {
		width: 88px;
		height: 34px;
		background: #00D09D;
		border-radius: 5px;
		margin-right: 20px;
	}

	.export-button,
	.export-button:hover,
	.export-button:active,
	.export-button:focus {
		color: white;
		background-color: #00D09D;
	}

	.double {
		background-color: white;
		width: 500px;
	}

	.date-style-Apply .ant-input {
		width: 300px;
		height: 34px;
		border: 0 !important;
	}

	.input-style-replyTwo {
		color: #666666;
		width: 200px;
		background-color: #ffffff;
		border: 0;
		margin-left: 5px;
	}

	.input-style-reply {
		color: #666666;
		width: 300px;
		background-color: #ffffff;
		border: 0;
		margin-left: 5px;
	}

	.tempAdd-button {
		background-color: #00bad0;
		width: 88px;
		height: 34px;
		/* border-radius: 5px; */
		font-size: 16px;
		color: #ffffff;
		/* font-weight: bold; */
		font-family: 'Microsoft YaHei';
		margin-right: 20px;
	}

	.add-button {
		background: '#00bad0';
		font-family: 'Microsoft YaHei';
		width: 88px;
		height: 34px;
		font-size: 16px;
		color: white;
		margin-right: 10px;
	}

	.icon_btn {
		color: #ffffff;
		font-size: 16px;
		margin-right: 20px;
		width: 88px;
		height: 34px;
	}

	.icon_btn_type_2 {
		color: #ffffff;
		font-size: 16px;
		margin-right: 20px;
		height: 34px;
	}
</style>