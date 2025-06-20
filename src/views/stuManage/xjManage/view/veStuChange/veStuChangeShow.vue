<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="学生学籍异动详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="veStuChangeDataForm" labelAlign="right">
        <a-form-model-item label="异动类别">
			<edu-dict-text code="ydlbm" :value="veStuChangeVo.ydlbm"></edu-dict-text>
        </a-form-model-item>
        <a-form-model-item label="异动日期">
          {{ veStuChangeVo.ydDate }}
        </a-form-model-item>
        <a-form-model-item label="异动原因">
          {{ veStuChangeVo.ydMsg }}
        </a-form-model-item>
        <a-form-model-item label="异动去向" v-if="veStuChangeVo.ydqxxm">
          {{ veStuChangeVo.ydqxxm }}
        </a-form-model-item>
        <a-form-model-item label="异动说明">
          {{ veStuChangeVo.ydsm }}
        </a-form-model-item>
        <a-form-model-item label="原院系" v-if="veStuChangeVo.ydlbm==3">
          {{ veStuChangeVo.ofalText }}
        </a-form-model-item>
        <a-form-model-item label="原专业" v-if="veStuChangeVo.ydlbm==3">
          {{ veStuChangeVo.ospecText }}
        </a-form-model-item>
        <a-form-model-item label="原班级" v-if="veStuChangeVo.ydlbm==3">
          {{ veStuChangeVo.objText }}
        </a-form-model-item>
        <a-form-model-item label="原年级" v-if="veStuChangeVo.ydlbm==3">
          {{ veStuChangeVo.ogradeTest }}
        </a-form-model-item>
        <a-form-model-item label="新院系" v-if="veStuChangeVo.ydlbm==3">
          {{ veStuChangeVo.falText }}
        </a-form-model-item>
        <a-form-model-item label="新专业" v-if="veStuChangeVo.ydlbm==3">
          {{ veStuChangeVo.specText }}
        </a-form-model-item>
		<a-form-model-item label="新年级" v-if="veStuChangeVo.ydlbm==3">
		  {{ veStuChangeVo.gradeText }}
		</a-form-model-item>
        <a-form-model-item label="新班级" v-if="veStuChangeVo.ydlbm==3">
          {{ veStuChangeVo.bjText }}
        </a-form-model-item>
        
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuChangeApi from '@/views/stuManage/xjManage/api/veStuChangeApi';

export default {
  components: {},
  data() {
    const data = {
      veStuChangeVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veStuChangeVo = Object.assign({}, row);
      //    veStuChangeApi.get(row.id).then((res) => {
      //      this.veStuChangeVo = res.result
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
<style lang="less" scoped></style>
