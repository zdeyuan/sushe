<template>
	<div>
		<a-card :bordered="false" class="header-solid mb-24">
			<div class="btns">
				<a-button type="primary" @click="getrebuck" style="margin-right: 20px;">
					返回上一页
				</a-button>
			</div>
			<div class="count">
				<div>
					<a-select :options="timeList" placeholder="请选择日期" v-model="time" @select="goup" />
					<a-button type="primary" @click="shengc" style="margin-left: 20px;">
						生成
					</a-button>
				</div>
				<div style="padding: 20px; display: flex; flex-wrap: wrap;">
					<div v-for="(val,key) in weekday"
						style="width: 14%; padding: 10px 20px; border: 1px solid lightblue; font-size: 18px; font-weight: 700;text-align: center;">
						{{val}}
					</div>
					<div v-for="(val,key) in data"
						style="width: 14%; padding: 10px 20px; border: 1px solid lightblue; font-size: 18px; font-weight: 700;">
						<div style="text-align: center;" v-if="val">
							{{val.dates}}
						</div>
						<div style="text-align: center;" v-if="val">
							周{{val.dayOfWeek == '7' ? '天' : val.dayOfWeek}},第{{val.week}}周
						</div>
					</div>
				</div>
			</div>
			<div class="showNewDoginBox">

			</div>
		</a-card>
	</div>
</template>

<script>
	import md5 from 'js-md5';
	import {
		axios
	} from '@/utils/request';
	import joinOrChangeStuInfo from './join.vue'
	export default {
		components: {
			joinOrChangeStuInfo
		},
		data() {
			return {
				current: 'schoolInfo',
				columns: [{
						title: '节假日名称',
						dataIndex: 'title',
						key: 'title',
					},
					{
						title: '节假日开始时间',
						dataIndex: 'beginDate',
						key: 'beginDate',
					},
					{
						title: '节假日结束时间',
						dataIndex: 'endDate',
						key: 'endDate',
					},
					{
						title: '操作',
						dataIndex: 'action',
						key: 'action',
						scopedSlots: {
							customRender: 'action'
						},
					},
				],
				weekday: ['周一', '周二', '周三', '周四', '周五', '周六','周天'],
				data: [],
				selectedRowKeys: [],
				pagination: {
					current: 1,
					pageSize: 10,
					pageSizeOptions: ['10', '20', '30', '50'],
					showTotal: (total, range) => {
						return '显示' + range[0] + '到' + range[1] + '条, 共' + total + '条记录'
					},
					showSizeChanger: true,
					showQuickJumper: true,
					total: 0
				},
				timeList: [],
				time: '',
				//搜索参数
				searchInfo: {

					pageNo: 1,

					pageSize: 10,

				}
			}
		},
		computed: {
			rowSelection() {
				const selectedRowKeys = this.selectedRowKeys; //常量

				return {
					selectedRowKeys,
					onChange: this.onSelectChange,
				};
			},
		},
		created() {
			var id = this.$route.query.id
			this.searchInfo.semId = id
			var arr = this.getMonthsBetweenDates(new Date(this.$route.query.xqksrqName), new Date(this.$route.query
				.xqjsrqName))
			this.timeList = []
			for (var i = 0; i < arr.length; i++) {
				var obj = {
					label: arr[i],
					value: arr[i]
				}
				this.timeList.push(obj)
			}
			this.time = arr[0]
			this.getStuInfo()
		},
		methods: {
			shengc(){
				axios({
					url: '/common/veBase/addCalendar?semId=' + this.$route.query.id,
					method: 'post',
					data: {
						semId: this.$route.query.id,
					}
				}).then(res1 => {
					if(res1.code == 200){
					console.log(res1, 'ree？？？？？')
					this.getStuInfo()
					}else{
						this.$message.warning(res1.message);
					}
				}).catch(err => {
				
					this.$message.warning("获取节假日信息失败");
				
				})
			},
			goup(e) {
				this.getStuInfo()
			},
			getMonthsBetweenDates(startDate, endDate) {
				const months = [];
				const startYear = startDate.getFullYear();
				const startMonth = startDate.getMonth();
				const endYear = endDate.getFullYear();
				const endMonth = endDate.getMonth();

				if (startYear === endYear && startMonth === endMonth) {
					// 如果两个日期在同一个月份
					months.push(`${startYear}-${String(startMonth + 1).padStart(2, '0')}`);
				} else {
					// 计算两个日期之间的所有月份
					let currentYear = startYear;
					let currentMonth = startMonth;

					while (currentYear < endYear || (currentYear === endYear && currentMonth <= endMonth)) {
						months.push(`${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`);
						currentMonth++;
						if (currentMonth > 11) {
							currentMonth = 0;
							currentYear++;
						}
					}
				}

				return months;
			},
			getrebuck() {
				this.$router.push({
					path: '/baseData/semester/index',
				});
			},
			changetu(e, id) {
				console.log(e, 'e/????????')
				console.log(id, 'e/????????')
				axios({
					url: 'common/veBase/presentSemesterBatch?ids=' + id,
					method: 'post',
				}).then(res => {
					
					if (res.code == 200) {

						this.getStuInfo()
					}


				}).catch(err => {

					this.$message.warning("获取设置失败");

				})
			},
			joinStu(type, id) {
				// this.joinOrChangeStuShow = true
				this.$refs.joinOrChangeStu.judesType(type, id)
			},
			JoinOrchangeStuSuss() {
				this.getStuInfo()
			},
			jugeType(value) {
				this.type = value
			},
			getStuInfo() {
				this.searchInfo.times = this.time
				axios({
					url: '/common/veBase/queryCalendarListBySemId',
					method: 'get',
					params: this.searchInfo
				}).then(res => {

					if (res.code == 200) {
						if (res.result.length == 0) {
							axios({
								url: '/common/veBase/addCalendar?semId=' + this.$route.query.id ,
								method: 'post',
								data: {
									semId: this.$route.query.id,
								}
							}).then(res1 => {
								console.log(res1, 'ree？？？？？')
								this.getStuInfo()
							}).catch(err => {

								this.$message.warning("获取节假日信息失败");

							})
						} else {
							this.data = this.days(res.result)
							console.log(this.data)
							// this.data = res.result
						}

						// this.pagination.total = res.result.total
					}


				}).catch(err => {

					this.$message.warning("获取节假日信息失败");

				})
			},
			// 当前年份
			currentYear() {
				return new Date(this.time).getFullYear();
			},
			// 当前月份（0-11）
			currentMonth() {
				return new Date(this.time).getMonth();
			},
			// 获取当前月份的天数
			daysInMonth() {
				return new Date(this.currentYear(), this.currentMonth() + 1, 0).getDate();
			},
			firstDayOfMonth() {
				console.log(new Date(this.currentYear(), this.currentMonth(), 1).getDay())
				if(new Date(this.currentYear(), this.currentMonth(), 1).getDay() == 0){
					return 6
				}else{
				return new Date(this.currentYear(), this.currentMonth(), 1).getDay()-1;
				}
			},
			days(obj) {
				const days = [];
				// 填充前面的空白（上个月的日期）
				console.log(this.firstDayOfMonth(),'this.firstDayOfMonth()？、')
				for (let i = 0; i < this.firstDayOfMonth(); i++) {
					days.push(null);
				}
				// 填充当前月份的日期
				for (let i = 0; i < obj.length; i++) {
					days.push(obj[i]);
				}
				return days;
			},

			onSelectChange(selectedRowKeys) {
				console.log('selectedRowKeys changed: ', selectedRowKeys);
				this.selectedRowKeys = selectedRowKeys;
			},

			tableChange(value, key, column) {
				this.searchInfo.pageNo = value.current
				this.pagination.current = value.current
				this.getStuInfo()
			},
			// 删除信息
			delteIds(id) {
				var then = this
				this.$confirm({
					title: '是否删除',
					content: '是否删除这条数据',
					okText: '确认',
					cancelText: '取消',
					onOk() {
						axios({
							url: 'common/veBase/deleteFestivalBatch?ids=' + id,
							method: 'post',
							params: {}

						}).then(res => {
							if (res.code == 200) {
								then.$message.success(res.message);
								then.getStuInfo()
							}

						}).catch(err => {
							then.$message.warning("删除失败");
						})
					},
				});
			},
		},
	}
</script>

<style lang="less" scoped>
	.top {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	/deep/ .ant-table-tbody>tr>td,
	/deep/.ant-table-thead>tr>th {
		padding: 15px 5px;
	}

	/deep/ .ant-table-thead>tr>th {
		background: #66c3fd;
		color: #fff;
		font-size: 14px;
	}

	/deep/ .ant-table-tbody {
		tr:nth-child(even) {
			background: #f4f7f9;
		}
	}
</style>