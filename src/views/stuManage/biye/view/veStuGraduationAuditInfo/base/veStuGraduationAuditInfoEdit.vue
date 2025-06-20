<template>
	<div class="edit_form">
		<!-- 编辑页
               <a-row>
              <a-col :span="12"> </a-col>
              <a-col :span="12"> </a-col>
            </a-row>-->
		<edu-form :title="textMap[dialogStatus]" @ok="updateData()" @cancel="handelCancel">
			<a-form-model ref="veStuGraduationAuditInfoDataForm" :rules="veStuGraduationAuditInfoRules"
				:model="veStuGraduationAuditInfoVo" labelAlign="right">
				<div class="detail_title"> 学生信息</div>
				<a-row>
					<a-col :span="12">
						<a-form-model-item label="学号" class="ytop"  >
							{{ veStuGraduationAuditInfoVo.xh }}
						</a-form-model-item>
					</a-col>
					<a-col :span="12">
						<a-form-model-item label="姓名" class="ytop"  >
							{{ veStuGraduationAuditInfoVo.xm }}
						</a-form-model-item>
					</a-col>
				</a-row>

				<!--财务  -->
				<template v-if="viewType == 'CW'">
					<div class="detail_title">缴费</div>
					<a-table :pagination="false" :data-source="tempList">
						<a-table-column title="序号" dataIndex="xh" width="150px">
							<template slot-scope="text, record, index">
								{{ index + 1 }}
							</template>
						</a-table-column>
						<a-table-column title="缴费年份" dataIndex="typeName" width="100px"> </a-table-column>
						<a-table-column title="应缴金额" dataIndex="rewardTime" width="100px"> </a-table-column>
						<a-table-column title="已缴费" dataIndex="rewardTime" width="100px"> </a-table-column>
						<a-table-column title="减免费" dataIndex="rewardTime" width="100px"> </a-table-column>
						<a-table-column title="欠费" dataIndex="rewardTime" width="100px"> </a-table-column>
					</a-table>
				</template>
				<!--成绩  -->
				<template v-if="viewType == 'CJ'">
					<div class="detail_title">成绩记录</div>
					<a-table :pagination="false" :data-source="tempList">
						<a-table-column title="序号" dataIndex="xh" width="150px">
							<template slot-scope="text, record, index">
								{{ index + 1 }}
							</template>
						</a-table-column>
						<a-table-column title="学期" dataIndex="typeName" width="100px"> </a-table-column>
						<a-table-column title="课程" dataIndex="rewardTime" width="100px"> </a-table-column>
						<a-table-column title="最终成绩" dataIndex="rewardTime" width="100px"> </a-table-column>
						<a-table-column title="考试日期" dataIndex="rewardTime" width="100px"> </a-table-column>
					</a-table>
				</template>
				<!--学生处  -->
				<template v-if="viewType == 'XSC'">
					<div class="detail_title"> 奖励记录</div>
					<a-table :pagination="false" :data-source="jianliList">
						<a-table-column title="序号" dataIndex="xh" width="150px">
							<template slot-scope="text, record, index">
								{{ index + 1 }}
							</template>
						</a-table-column>
						<a-table-column title="获奖名称" dataIndex="typeName" width="100px"> </a-table-column>
						<a-table-column title="获奖级别" dataIndex="level" width="150px">
							<template slot-scope="value">
								<edu-dict-text code="jlJb" :value="value"></edu-dict-text>
							</template>
						</a-table-column>
						<a-table-column title="获奖日期" dataIndex="rewardTime" width="100px"> </a-table-column>
					</a-table>
					<div class="detail_title"> 惩罚记录</div>
					<a-table :pagination="false" :data-source="chenfaList">
						<a-table-column title="序号" dataIndex="xh" width="150px">
							<template slot-scope="text, record, index">
								{{ index + 1 }}
							</template>
						</a-table-column>
						<a-table-column title="惩罚类型" dataIndex="typeName" width="100px"> </a-table-column>
						<a-table-column title="惩罚描述" dataIndex="content" width="100px"> </a-table-column>
						<a-table-column title="惩罚日期" dataIndex="punishTime" width="100px"> </a-table-column>
					</a-table>
				</template>
				<div class="card_content">
					<div class="flex">
						<div class="detail_title">处置情况</div>
						<edu-data v-model="veStuGraduationAuditInfoVo.auditStatus" stype="radio" code="biyeAuditStatus" />
					</div>
					<div class="flex">
						<div class="detail_title">处置情况</div>
						<a-textarea v-model="veStuGraduationAuditInfoVo.remark" :rows="4" :maxLength="500"
							placeholder="请输入备注" />
					</div>
					<!-- <div class="decision" style="padding:15px 0" align="right">
            <a-button type="primary" style="margin-right:15px" @click="audit(1)">审核通过 </a-button>
            <a-button type="danger" @click="audit(0)">
              不通过
            </a-button>
          </div> -->
				</div>
			</a-form-model>
		</edu-form>
	</div>
</template>

<script>
	import veStuGraduationAuditInfoApi from '@/views/stuManage/biye/api/veStuGraduationAuditInfoApi';
	import veStuRewardApi from '@/views/stuManage/kqManage/api/veStuRewardApi';
	import veStuPunishApi from '@/views/stuManage/kqManage/api/veStuPunishApi';

	export default {
		props: {
			viewType: String
		},
		components: {},
		data() {
			const data = {
				tempList: [],
				jianliList: [],
				chenfaList: [],
				veStuGraduationAuditInfoVo: {},
				textMap: {
					update: '毕业审核'
				},
				dialogStatus: 'create',
				dataList: [],
				veStuGraduationAuditInfoRules: {}
			};
			return data;
		},
		mounted() {},
		methods: {
			/**
			 * @msg: 调用Api创建数据
			 */
			audit(status) {
				const tempData = Object.assign({}, this.veStuGraduationAuditInfoVo);
				tempData.auditStatus = status;
				veStuGraduationAuditInfoApi.updateStatus(tempData).then(res => {
					this.$notification.success({
						message: '审核' + status == 1 ? '通过' : '不通过',
						description: '审核了一条数据'
					});
					this.$emit('onOk');
				});
			},
			/**
			 * @msg: 初始化修改
			 */
			doUpdate(row,type) {
				this.veStuGraduationAuditInfoVo = row;
				/*     veStuGraduationAuditInfoApi.get(row.id).then(res => {
				  this.veStuGraduationAuditInfoVo = res.result;
				}); */
				this.viewType=type;
				if(type&&type=='XSC'){
					this.initData(row.stuId);
				}
				this.dialogStatus = 'update';
				this.$nextTick(() => {
					this.$refs.veStuGraduationAuditInfoDataForm.clearValidate();
				});
			},
			initData(stuId) {
				const pageSub = {
					size: 1000,
					current: 1,
					conditions: [{
						operator: 'eq',
						column: 'stu_id',
						value: stuId
					}]
				};
				veStuRewardApi.page(pageSub).then(res => {
					this.jianliList = res.result.records;
				});
				veStuPunishApi.page(pageSub).then(res => {
					this.chenfaList = res.result.records;
				});
			},
			/**
			 * @msg: 编辑页取消
			 */
			handelCancel() {
				this.$emit('onCancel');
			},
			/**
			 * @msg: 获取提交的数据 新增和 修改复用
			 */
			getSubData(isUpdate) {
				const tempData = Object.assign({}, this.veStuGraduationAuditInfoVo);
				
				return tempData;
			},
			/**
			 * @msg: 调用Api修改数据
			 */
			updateData() {
				this.$refs.veStuGraduationAuditInfoDataForm.validate(valid => {
					if (valid) {
						const subData = this.getSubData(true);
						if (subData == null) {
							return;
						}
						if(this.viewType=="BZR"){
							let backData={
								id:subData.id,
								stuId:subData.stuId,
								auditStatus:subData.auditStatus,
								remark:subData.remark
							}
							veStuGraduationAuditInfoApi.auditByBzr(backData).then(() => {
								this.$notification.success({
									message: '数据修改成功',
									description: '修改了一条数据'
								});
								this.$emit('onOk');
							});
						}else{
							let backData={
								id:subData.id,
								stuId:subData.stuId,
								auditType:this.viewType,
								auditStatus:subData.auditStatus,
								remark:subData.remark
							}
							veStuGraduationAuditInfoApi.updateStatus(backData).then(() => {
								this.$notification.success({
									message: '数据修改成功',
									description: '修改了一条数据'
								});
								this.$emit('onOk');
							});
						}
						
					}
				});
			}
		}
	};
</script>
<style lang="less" scoped>
	.flex{
		display:flex;
		margin: 15px 0;
		align-items:center;
	}
	.detail_title {
		
		width:100px;
	}

	/deep/.ant-empty-normal {
		margin: 0;
	}
</style>