<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14 23:36:16
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-03-29 21:07:30
-->
<template>
  <edu-layout type="table">
    <div class="show_user" slot="table">
      <edu-form title="用户信息" size="big" type="view" class="mini-form-item inline-form" width="40%" @ok="createData()">
        <a-form-model ref="veJkyUserDataForm" :model="veJkyUserVo" labelAlign="right">
          <a-row>
            <a-col :span="12">
              <a-form-model-item label="姓名" class="ytop" prop="realname" required>
                <a-input v-model="veJkyUserVo.realname" :maxLength="20" placeholder="请输入姓名" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="性别" class="ytop" prop="sexNum">
                <edu-data v-model="veJkyUserVo.sexNum" stype="radio" code="sex" />
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-model-item label="身份证" prop="idCard" required>
                <a-input v-model="veJkyUserVo.idCard" :maxLength="20" placeholder="请输入" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="政治面貌" prop="idCard" required>
                <a-input v-model="veJkyUserVo.idCard" :maxLength="20" placeholder="请输入" />
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-model-item label="所属部门" prop="sexNum">
                <dept-tree ref="deptTreeOwn"></dept-tree>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="所属系部" prop="birthday">
                <dept-tree ref="deptTreeOwn"></dept-tree>
              </a-form-model-item>
            </a-col>
          </a-row>

          <a-row>
            <a-col :span="12">
              <a-form-model-item label="职称" prop="proCall">
                <edu-data v-model="veJkyUserVo.proCall" stype="select"  width="180px"   code="zhichen" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="职称获取时间" prop="educate">
				  <DatePickByCN
				     v-model="veJkyUserVo.sgTime"
				    placeholder="请选择职称获取时间"  />
              </a-form-model-item>
            </a-col>
          </a-row>
          <div class="detail_title" style="margin:15px 0">第一学历信息</div>
          <a-row>
            <a-col :span="12">
              <a-form-model-item label="第一学历" class="ytop" prop="educate">
                <edu-data v-model="veJkyUserVo.educate" stype="select"  width="180px"   code="xueli" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="学位" class="ytop" prop="proCall">
                <edu-data v-model="veJkyUserVo.proCall" stype="select"  width="180px"   code="zhichen" />
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-model-item label="毕业院校" prop="graCollege">
                <a-input v-model="veJkyUserVo.graCollege" :maxLength="60" placeholder="请输入毕业院校" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="专业" prop="graCollege">
                <a-input v-model="veJkyUserVo.graCollege" :maxLength="60" placeholder="请输入毕业院校" />
              </a-form-model-item>
            </a-col>
          </a-row>
          <div class="detail_title" style="margin:15px 0">最高学历信息</div>
          <a-row>
            <a-col :span="12">
              <a-form-model-item label="最高学历" class="ytop" prop="educate">
                <edu-data v-model="veJkyUserVo.educate" stype="select"  width="180px"   code="xueli" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="学位" class="ytop" prop="proCall">
                <edu-data v-model="veJkyUserVo.proCall" stype="select"  width="180px"   code="zhichen" />
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-model-item label="毕业院校" prop="graCollege">
                <a-input v-model="veJkyUserVo.graCollege" :maxLength="60" placeholder="请输入毕业院校" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="专业" prop="graCollege">
                <a-input v-model="veJkyUserVo.graCollege" :maxLength="60" placeholder="请输入毕业院校" />
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-form-model>
      </edu-form>
    </div>
  </edu-layout>
</template>

<script>
import deptTree from '@/components/kqManageComponent/deptTree';

export default {
  components: { deptTree },
  data() {
    let validateDeptOwn = (rule, value, callback) => {
      const data = this.$refs.deptTreeOwn.getValue();
      if (data && data.length > 0) {
        callback();
      } else {
        callback(new Error('请选择'));
      }
    };
    return {
      veJkyUserVo: {},
      rules: {
        deptTreeOwn: [{ validator: validateDeptOwn, trigger: 'change', required: true }]
      }
    };
  },
  mounted() {},
  methods: {
    createData() {
      this.$message.error('基础服务未对接');
    }
  }
};
</script>
<style lang="less" scoped></style>
