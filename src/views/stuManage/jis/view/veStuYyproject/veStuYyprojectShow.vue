<template>
	<div class="editIform">
		<!-- 编辑页 -->
		<edu-form title="详情" :isShowBtnSure="false" @cancel="handelCancel">
			<a-form-model ref="veStuYyprojectDataForm" labelAlign="right">
				<a-form-model-item label="预约项目对象">
					<edu-dict-text :value="veStuYyprojectVo.type" code="yyType" /></td>
				</a-form-model-item>
				<a-form-model-item label="预约形式">
					 <edu-dict-text code="yyXinz" :value="veStuYyprojectVo.yyType"></edu-dict-text>
				</a-form-model-item>
				<a-form-model-item label="预约场地" v-if="veStuYyprojectVo.type==2">
					{{ veStuYyprojectVo.XQMC }} - {{ veStuYyprojectVo.JZWMC }} - {{ veStuYyprojectVo.JSMC }}
				</a-form-model-item>
				<a-form-model-item label="预约设备名称" v-if="veStuYyprojectVo.type==3">
					{{veStuYyprojectVo.sbName}}
				</a-form-model-item>
				<a-form-model-item label="预约说明">
					{{veStuYyprojectVo.yyRemark}}
				</a-form-model-item>
				<a-form-model-item label="限制人数">
					{{veStuYyprojectVo.limitNum}}人
				</a-form-model-item>
				<a-form-model-item label="开始时间">
					{{veStuYyprojectVo.statusTime}}
				</a-form-model-item>
				<a-form-model-item label="结束时间">
					{{veStuYyprojectVo.endTime}}
				</a-form-model-item>
				<a-form-model-item label="状态">
					<edu-dict-text :value="veStuYyprojectVo.status" code="qstatus" />
				</a-form-model-item>
			</a-form-model>
		</edu-form>
	</div>
</template>

<script>
	import veStuYyprojectApi from "@/views/stuManage/jis/api/veStuYyprojectApi";

	export default {
		components: {},
		data() {
			const data = {
				veStuYyprojectVo: {},
			};
			return data;
		},
		mounted() {},
		methods: {
			/**
			 * @msg: 初始化修改
			 */
			doShow(row) {
				this.veStuYyprojectVo = Object.assign({}, row)
				//    veStuYyprojectApi.get(row.id).then((res) => {
				//      this.veStuYyprojectVo = res.result
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