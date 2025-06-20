<template>
	<!-- 表格 -->
	<edu-layout type="table">
		<div slot="table" class="right_table">
			<div>
				<edu-query ref="cwQuery" code="veBaseStudent" ext="boxZybmbj" :ext="$hasPer([`system`,`bzr`])?'boxZybmbj':''" :showZybAndnj="$hasPer([`bzr`])?false:true" :do-filter="handleFilter">
					<template slot="search">
						<edu-query-item title="学号" pname="xh" pop="like" stype="input"> </edu-query-item>
						<edu-query-item title="姓名" pname="xm" pop="like" stype="input"> </edu-query-item>
						<edu-query-item title="身份证号" pname="sfzh" pop="like" stype="input"> </edu-query-item>
						<edu-query-item title="学生状态" pname="xsdqztm" pop="like" stype="select" code="stuStatye">
						</edu-query-item>
					</template>
				</edu-query>
				<edu-table ref="veBaseStudentTable" code="veBaseStudent" :api="veBaseStudentTable.api"
					:get-params="getParams" :config="{
						open: false,
						close: false,
						status: false,
						delete: false,
						bdelete: false
					  }" :sorts="[
						{
						 column: 'xh',
						 asc: true
						}
					  ]"
					  :tableX="2000"
					  >
					<template slot="af_btn" slot-scope="{ row }">
						<edu-pms :code="'aaa'" name="学籍注册" ext="tedit" type="success" size="mini"
							@click="handleUpdate(row)"> </edu-pms>
						<edu-pms :code="'aaa'" name="照片采集" ext="tdo" type="success" size="mini" @click="doPhoto(row)">
						</edu-pms>
					</template>

					<!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
					<a-table-column title="姓名" dataIndex="xm" width="100px"> </a-table-column>
					<a-table-column title="学号"  dataIndex="xh" width="80px"> </a-table-column>
					<a-table-column title="性别"  dataIndex="xbm" width="60px">
						<template slot-scope="value">
							<edu-dict-text code="sexStr" :value="value"></edu-dict-text>
						</template>
					</a-table-column>
					<a-table-column title="身份证号" dataIndex="sfzh" width="200px"> </a-table-column>
					<a-table-column title="学生状态" dataIndex="xsdqztm" width="100px">
						<template slot-scope="value">
							<edu-dict-text code="stuStatye" :value="value"></edu-dict-text>
						</template>
					</a-table-column>
					<a-table-column title="所属专业部" dataIndex="falText" width="150px"> </a-table-column>
					<a-table-column title="所属专业" dataIndex="specText" width="150px"> </a-table-column>
					<a-table-column title="所属班级" dataIndex="bjText" width="150px"> </a-table-column>
					<a-table-column title="学生联系电话" dataIndex="xslxdh" width="150px"> </a-table-column>
				</edu-table>
			</div>
			<!-- 编辑页 -->
			<veBaseStudentEdit family v-if="showType == 'edit'" ref="veBaseStudentEdit" @onOk="editOk"
				@onCancel="editCancel"> </veBaseStudentEdit>
			<veBaseStudentPhoto v-if="showType == 'photo'" ref="veBaseStudentPhoto" @onOk="editOk"
				@onCancel="editCancel"> </veBaseStudentPhoto>
		</div>
	</edu-layout>
</template>

<script>
	import veBaseStudentApi from '@/views/stuManage/xjManage/api/veBaseStudentApi';
	import veBaseStudentEdit from './veBaseStudentEdit';
	import veBaseStudentPhoto from './veBaseStudentPhoto';

	export default {
		components: {
			veBaseStudentEdit,
			veBaseStudentPhoto
		},
		data() {
			const data = {
				veBaseStudentQuery: {},
				showType: 'table'
			};
			data.veBaseStudentTable = {
				api: veBaseStudentApi
			};
			return data;
		},
		mounted() {},
		methods: {
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
				this.$refs.veBaseStudentTable.reload();
			},
			/**
			 * @msg: 编辑行事件
			 */
			handleUpdate(row) {
				this.showType = 'edit';
				this.$nextTick(() => {
					this.$refs.veBaseStudentEdit.doUpdate(row);
				});
			},
			/**
			 * @msg: 编辑行事件
			 */
			doPhoto(row) {
				this.showType = 'photo';
				this.$nextTick(() => {
					this.$refs.veBaseStudentPhoto.doUpdate(row);
				});
			},
			/**
			 * @msg: 编辑页取消事件
			 */
			editCancel() {
				this.showType = 'table';
			},
			/**
			 * @msg: 编辑页成功事件
			 */
			editOk() {
				this.showType = 'table';
				this.$refs.veBaseStudentTable.reload();
			}
		}
	};
</script>
<style lang="less" scoped></style>