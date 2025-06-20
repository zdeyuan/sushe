<template>
	<div class="edit_form">
		<!-- 编辑页 -->
		<edu-form title="预约与学生关联表详情" :isShowBtnSure="false" @cancel="handelCancel">
			<a-form-model ref="veStuYystuDataForm" labelAlign="right">
				<a-form-model-item label="预约学生" v-if="!$hasPer(['student'])">
					{{veStuYystuVo.xm}}
				</a-form-model-item>
				<a-form-model-item label="预约项目对象">
					<edu-dict-text :value="veStuYystuVo.type" code="yyType" />
				</a-form-model-item>
				<a-form-item label="预约场地" v-if="veStuYystuVo.type==2">
					{{ veStuYystuVo.XQMC }} - {{ veStuYystuVo.JZWMC }} - {{ veStuYystuVo.JSMC }}
				</a-form-item>
				<a-form-item label="预约设备名称" v-if="veStuYystuVo.type==3">
					{{veStuYystuVo.sbName}}
				</a-form-item>
				<a-form-model-item label="预约开始时间">
					{{moment(veStuYystuVo.statusTime).format('YYYY-MM-DD HH:mm:ss')}}
				</a-form-model-item>
				<a-form-model-item label="预约结束时间">
					{{moment(veStuYystuVo.endTime).format('YYYY-MM-DD HH:mm:ss')}}
				</a-form-model-item>
				<a-form-model-item label="预约原因">
					{{veStuYystuVo.yyReason}}
				</a-form-model-item>
				<a-form-model-item label="预约审核结果">
					<edu-dict-text :value="veStuYystuVo.yyauthStatus" code="shetAuditStatus" /></td>
				</a-form-model-item>
			</a-form-model>
		</edu-form>
	</div>
</template>

<script>
	import veStuYystuApi from "@/views/stuManage/jis/api/veStuYystuApi";
	import moment from 'moment';
	export default {
		components: {},
		data() {
			const data = {
				veStuYystuVo: {},
			};
			return data;
		},
		mounted() {},
		methods: {
			moment,
			/**
			 * @msg: 初始化修改
			 */
			doShow(row) {
				this.veStuYystuVo = Object.assign({}, row)
				//    veStuYystuApi.get(row.id).then((res) => {
				//      this.veStuYystuVo = res.result
				// });
			},
			/**
			 * @msg: 编辑页取消
			 */
			handelCancel() {
				this.$emit('onCancel');
			}
		}
	};
</script>
<style lang="less" scoped>

</style>