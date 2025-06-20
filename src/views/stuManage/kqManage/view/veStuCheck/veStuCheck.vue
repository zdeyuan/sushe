<template>
	<edu-layout type="table" :extHeight="viewType == 'count' ? 50 : 0" :topName="viewType == 'count' ? '考勤查询' : '考勤管理'">
		<!-- 表格 -->
		<div slot="table" class="right_table">
			<div>
				<edu-query ref="cwQuery" ext="boxZybmbj" code="veStuCheck" :do-filter="handleFilter">
					<template slot="search">
						<edu-query-item title="学期" pname="sem_id" pop="eq">
						  <termList ref="termList" v-model="veStuCheckQuery.xqh" @change="handleFilter"></termList>
						</edu-query-item>
						<edu-query-item title="学生姓名" pname="xm" v-if="$hasPer(['system'])" pop="like" stype="input">
						</edu-query-item>
						<edu-query-item title="考勤类型" pname="type_id" textKey="title" pop="eq" width="150px"
							stype="select" :datas="typeNodes" dtype="datas">
						</edu-query-item>
						<edu-query-item title="第几周" pname="week" pop="eq" stype="input"> </edu-query-item>
						<edu-query-item title="第几节" pname="section" pop="eq" stype="select" code="checkName"> </edu-query-item>
					</template>
				</edu-query>
				<edu-table type="kq" ref="veStuCheckTable" code="veStuCheck" :api="veStuCheckTable.api" :get-params="getParams"
					:exportConfig="$hasPer(['system'])?{
            url: 'veStuCheck/selectStuChecklist',
            name: '《考勤信息表导出》'
          }:null" :config="{
            open: false,
            close: false,
            status: false,
            delete: $hasPer(['system'])?viewType != 'count':false
          }" :sorts="[
            {
              column: 'create_date',
              asc: false
            }
          ]" :do-add="handleCreate" :to-update="handleUpdate" :toDetail="toDetail" :isAutoBtn="viewType == 'count'"
					:doImport="$hasPer(['system'])?viewType == 'count' ? null : doImport:null">
					<!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
					<a-table-column title="学生姓名" dataIndex="xm" width="100px"> </a-table-column>
					<a-table-column title="学生学号" dataIndex="xh" width="100px"> </a-table-column>
					<a-table-column title="班级名称" dataIndex="bjText" width="100px" v-if="!$hasPer(['student'])">
					</a-table-column>
					<a-table-column title="考勤类型" dataIndex="typeName" width="100px"> </a-table-column>
					<a-table-column title="第几周" dataIndex="week" width="100px">
						<template slot-scope="value">
							{{`第${value}周`}}
						</template>
					</a-table-column>
					<a-table-column title="异常时间" dataIndex="checkTime" width="100px"> </a-table-column>
					<a-table-column title="第几节" dataIndex="section" width="100px">
						<template slot-scope="value">
							<edu-dict-text code="checkName"  :value="value"></edu-dict-text>
						</template>
					</a-table-column>
				</edu-table>
			</div>
			<!-- 编辑页 -->
			<veStuCheckEdit v-if="showType == 'edit'" ref="veStuCheckEdit" :typeNodes="typeNodes" @onOk="editOk"
				@onCancel="editCancel"> </veStuCheckEdit>
			<veStuCheckShow v-if="showType == 'show'" ref="veStuCheckShow" @onOk="editOk" @onCancel="editCancel">
			</veStuCheckShow>
		</div>
	</edu-layout>
</template>

<script>
	import veStuCheckTypeApi from '../../api/veStuCheckTypeApi';
	import veStuCheckApi from '../../api/veStuCheckApi';
	import veStuCheckEdit from './veStuCheckEdit';
	import veStuCheckShow from './veStuCheckShow';
	import termList from '@/components/kqManageComponent/termList';
	export default {
		props: {
			viewType: String
		},
		components: {
			veStuCheckEdit,
			veStuCheckShow,
			termList
		},
		data() {
			const data = {
				veStuCheckQuery: {},
				showType: 'table',
				typeNodes: []
			};
			data.veStuCheckTable = {
				api: veStuCheckApi
			};
			return data;
		},
		mounted() {
			this.initData();
		},
		methods: {
			doImport() {
				return {
					temp: ['序号', '姓名', '学号', '学院', '专业', '年级','考勤类型','学期','备注','日期','第几节'],
					tempName: '考勤导入模板',
					implName: 'veStuCheckServiceImpl.importExcel'
				};
			},
			initData() {
				const sub = {
					conditions: [{
						operator: 'eq',
						column: 'status',
						value: 1
					}]
				};
				veStuCheckTypeApi.all(sub).then(res => {
					this.typeNodes = res.result;
				});
			},
			/**
			 * @msg: 表格获取请求数据 必须return 一个对象
			 */
			getParams() {
				const params = this.$refs['cwQuery'].getQueryData({
					base: true
				});
				return params;
			},
			/**
			 * @msg: 搜索事件
			 */
			handleFilter() {
				this.$refs.veStuCheckTable.reload();
			},
			/**
			 * @msg: 新增事件
			 */
			handleCreate() {
				this.showType = 'edit';
				this.$nextTick(() => {
					this.$refs.veStuCheckEdit.doCreate();
				});
			},
			/**
			 * @msg: 编辑行事件
			 */
			handleUpdate(row) {
				this.showType = 'edit';
				this.$nextTick(() => {
					this.$refs.veStuCheckEdit.doUpdate(row);
				});
			},
			/**
			 * @msg: 编辑行事件
			 */
			toDetail(row) {
				this.showType = 'show';
				this.$nextTick(() => {
					this.$refs.veStuCheckShow.doShow(row);
				});
			},
			/**
			 * @msg: 编辑页取消事件
			 */
			editCancel() {
				this.showType = 'table';
				this.$refs.veStuCheckEdit.visible = false;
			},
			/**
			 * @msg: 编辑页成功事件
			 */
			editOk() {
				this.showType = 'table';
				this.$refs.veStuCheckTable.reload();
			}
		}
	};
</script>
<style lang="less" scoped></style>