<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="毕业查询管理详情" type="view" :isShowBtn="false"   >
		<a-form-model ref="veStuGraduationDataForm" labelAlign="right" v-if="!veStuGraduationVo.id">
				暂无毕业信息
				</a-form-model>
      <a-form-model ref="veStuGraduationDataForm" labelAlign="right" v-else>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="学号" prop="code">
              {{ veStuGraduationVo.code }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="姓名" prop="name">
              {{ veStuGraduationVo.name }}
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="身份证号" prop="idcard">
              {{ veStuGraduationVo.idcard }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="专业部名称" prop="falName">
              {{ veStuGraduationVo.falName }}
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="专业名称" prop="specName">
              {{ veStuGraduationVo.specName }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="班级名称" prop="bjName">
              {{ veStuGraduationVo.bjName }}
            </a-form-model-item>
          </a-col>
        </a-row>

        <div class="detail_title"> 毕业信息</div>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="结束学业年月" prop="jsxyDateTime">
              {{ veStuGraduationVo.jsxyDateTime }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="结束学业状态" prop="jsxym">
              <edu-dict-text code="byxsStatus" :value="veStuGraduationVo.jsxym"></edu-dict-text>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-form-model-item label="结束学业原因说明" prop="jsxyReson">
          {{ veStuGraduationVo.jsxyReson }}
        </a-form-model-item>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="毕业证书号" prop="byZsh">
              {{ veStuGraduationVo.byZsh }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="获毕业证书日期" prop="byDate">
              {{ veStuGraduationVo.byDate }}
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="结业证书号" prop="jyZsh">
              {{ veStuGraduationVo.jyZsh }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="获结业证书日期" prop="jyDate">
              {{ veStuGraduationVo.jyDate }}
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuGraduationApi from '@/views/stuManage/biye/api/veStuGraduationApi';

export default {
  components: {},
  data() {
    const data = {
      veStuGraduationVo: {}
    };
    return data;
  },
  mounted() {
	  this.getData();
  },
  methods: {
	  async  getData(){
		  let res=await veStuGraduationApi.page({});
		  this.doShow(res.records[0]);
	  },
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veStuGraduationVo = Object.assign({}, row);
      if (this.veStuGraduationVo.jsxyDate) {
        this.veStuGraduationVo.jsxyDateTime = this.$date.getDate(this.veStuGraduationVo.jsxyDate * 1000).format('YYYY-MM-DD');
      }
      //    veStuGraduationApi.get(row.id).then((res) => {
      //      this.veStuGraduationVo = res.result
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
