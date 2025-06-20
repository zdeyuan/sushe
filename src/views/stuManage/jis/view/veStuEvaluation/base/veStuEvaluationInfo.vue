<template>
  <div class="info_view edu-form-size">
    <div class="no-data" v-if="stuInfo == null">未选择</div>
    <a-form-model ref="veStuEvaluationDataForm" v-else :rules="veStuEvaluationRules" :model="veStuEvaluationVo" labelAlign="right">
      <!-- 学生基本信息 -->
      <template>
        <div class="detail_title">学生基本信息</div>
        <table class="stable">
          <tr>
            <td> 姓名：{{ stuInfo.stu.xm }}</td>
            <td> 性别： <edu-dict-text :value="stuInfo.stu.xbm" code="sex" /></td>
            <td> 籍贯: {{ stuInfo.stuInfo.jg }}</td>
          </tr>
          <tr>
            <td> 出生年月：{{ stuInfo.stu.csny }}</td>
            <td>
              政治面貌：
              <edu-dict-text :value="stuInfo.stuInfo.zzmmm" code="zzmmm" />
            </td>
            <td> 健康状况: <edu-dict-text :value="stuInfo.stuInfo.jkzkm" code="jkzkm"/></td>
          </tr>
          <tr>
            <td> 专业：{{ stuInfo.stu.sepcText }}</td>
            <td> 班级：{{ stuInfo.stu.bjText }}</td>
            <td> 家庭住址: {{ stuInfo.stuInfo.jtdz }}</td>
          </tr>
        </table>
      </template>
      <!-- 学生成绩信息 -->
      <template>
        <div class="detail_title">学生成绩信息</div>
        <a-table :pagination="false" :data-source="xscjList">
          <a-table-column title="序号" dataIndex="xh" width="150px">
            <template slot-scope="text, record, index">
              {{ index + 1 }}
            </template>
          </a-table-column>
          <a-table-column title="学期" dataIndex="semidName" width="100px"> </a-table-column>
          <a-table-column title="课程名称" dataIndex="kcid_dictText" width="100px"> </a-table-column>
          <a-table-column title="成绩" dataIndex="score" width="100px"> </a-table-column>
          <a-table-column title="考试日期" dataIndex="ksrq" width="100px"> </a-table-column>
        </a-table>
      </template>
      <!--行为检查记录  -->
      <template>
        <div class="detail_title">行为检查记录</div>
        <a-table :pagination="false" :data-source="xwjcList">
          <a-table-column title="序号" dataIndex="xh" width="150px">
            <template slot-scope="text, record, index">
              {{ index + 1 }}
            </template>
          </a-table-column>
          <a-table-column title="项目名称" dataIndex="itemName" width="100px"> </a-table-column>
          <a-table-column title="指标名称" dataIndex="normName" width="100px"> </a-table-column>
          <a-table-column title="检查内容" dataIndex="description" width="100px"> </a-table-column>
          <a-table-column title="时间" dataIndex="createDate" width="100px"> </a-table-column>
        </a-table>
      </template>
      <!--卫生检查记录  -->
      <template>
        <div class="detail_title"> 卫生检查记录</div>
        <a-table :pagination="false" :data-source="wsjcList">
          <a-table-column title="序号" dataIndex="xh" width="150px">
            <template slot-scope="text, record, index">
              {{ index + 1 }}
            </template>
          </a-table-column>
          <a-table-column title="项目名称" dataIndex="itemName" width="100px"> </a-table-column>
          <a-table-column title="指标名称" dataIndex="normName" width="100px"> </a-table-column>
          <a-table-column title="检查内容" dataIndex="description" width="100px"> </a-table-column>
          <a-table-column title="时间" dataIndex="createDate" width="100px"> </a-table-column>
        </a-table>
      </template>
      <!--文体活动记录  -->
      <template>
        <div class="detail_title"> 文体活动记录</div>
        <a-table :pagination="false" :data-source="whhdList">
          <a-table-column title="序号" dataIndex="xh" width="150px">
            <template slot-scope="text, record, index">
              {{ index + 1 }}
            </template>
          </a-table-column>
          <a-table-column title="活动名称" dataIndex="title"> </a-table-column>
          <a-table-column title="活动类型" dataIndex="type" width="100px">
            <template slot-scope="text">
              <span>{{ text == 1 ? '校级' : '班级' }}</span>
            </template>
          </a-table-column>
          <a-table-column title="级别" dataIndex="grade" width="100px">
            <template slot-scope="text">
              <edu-dict-text code="whhdjb" :value="text"></edu-dict-text>
            </template>
          </a-table-column>
          <a-table-column title="起止时间" dataIndex="startTime" width="150px"> </a-table-column>
          <a-table-column title="主办单位" dataIndex="company" width="200px"> </a-table-column>
        </a-table>
      </template>
      <!--党团活动记录  -->
      <template>
        <div class="detail_title"> 党团活动记录</div>
        <a-table :pagination="false" :data-source="dyhdList">
          <a-table-column title="序号" dataIndex="xh" width="150px">
            <template slot-scope="text, record, index">
              {{ index + 1 }}
            </template>
          </a-table-column>
          <a-table-column title="活动标题" dataIndex="title" width="100px"> </a-table-column>
          <a-table-column title="级别" dataIndex="grade" width="100px">
            <template slot-scope="value">
              <edu-dict-text code="caucusLevel" :class="'status' + value" :value="value"></edu-dict-text>
            </template>
          </a-table-column>
          <a-table-column title="起止时间" dataIndex="startTime" width="100px"> </a-table-column>
          <a-table-column title="主办单位" dataIndex="organization" width="100px"> </a-table-column>
        </a-table>
      </template>
      <!--奖励记录  -->
      <template>
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
      </template>
      <!--惩罚记录  -->
      <template>
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
      <!--勤工俭学记录  -->
      <template>
        <div class="detail_title"> 勤工俭学记录</div>
        <a-table :pagination="false" :data-source="qinggjxList">
          <a-table-column title="序号" dataIndex="xh" width="150px">
            <template slot-scope="text, record, index">
              {{ index + 1 }}
            </template>
          </a-table-column>
          <a-table-column title="职位名称" dataIndex="positionName" width="100px"> </a-table-column>
          <a-table-column title="薪资(元/月)" dataIndex="money" width="100px"> </a-table-column>
          <a-table-column title="就职时间" dataIndex="applyTime" width="100px"> </a-table-column>
        </a-table>
      </template>
      <!--体质健康记录  -->
      <template>
        <div class="detail_title"> 体质健康记录</div>
        <a-table :pagination="false" :data-source="tizhiList">
          <a-table-column title="序号" dataIndex="xh" width="150px">
            <template slot-scope="text, record, index">
              {{ index + 1 }}
            </template>
          </a-table-column>
          <a-table-column title="体质健康得分" dataIndex="score" width="200px"> </a-table-column>
          <a-table-column title="起止时间" dataIndex="startTime"> </a-table-column>
        </a-table>
      </template>
      <!--职业认证信息  -->
      <!-- <template>
        <div class="detail_title"> 职业认证信息</div>
        <a-table :pagination="false" :data-source="zhiyeList">
          <a-table-column title="序号" dataIndex="xh" width="150px">
            <template slot-scope="text, record, index">
              {{ index + 1 }}
            </template>
          </a-table-column>
          <a-table-column title="证书名称" dataIndex="xm" width="100px"> </a-table-column>
          <a-table-column title="颁证单位" dataIndex="xm" width="100px"> </a-table-column>
          <a-table-column title="颁证日期" dataIndex="xm" width="100px"> </a-table-column>
        </a-table>
      </template> -->
      <!--操行评分  -->
      <template>
        <div class="detail_title"> 操行评分</div>
        <a-table :pagination="false" :data-source="caoxinList">
          <a-table-column title="学期" dataIndex="semidName" width="150px"> </a-table-column>
          <a-table-column title="评分" dataIndex="score" width="100px">
            <template slot-scope="text, record">
              <a-input v-model="record.item" :maxLength="150" placeholder="请输入操行评分" />
            </template>
          </a-table-column>
        </a-table>
		<div v-if="$hasPer('[`system`,`teacher`]')">
        <div class="detail_title" > 综合评价意见</div>
        <a-textarea v-model="spyj" :rows="4" :maxLength="65535" placeholder="请输入综合评价意见" />
        <div class="decision" style="padding:15px 0" align="right">
          <a-button type="primary" style="margin-right:15px" @click="createData(2)">确定保存 </a-button>
        </div>
		</div>
      </template>
    </a-form-model>
  </div>
</template>

<script>
	import {
		axios
	} from '@/utils/request';
import veStuEvaluationApi from '@/views/stuManage/jis/api/veStuEvaluationApi';
import veBaseStudentApi from '@/views/stuManage/xjManage/api/veBaseStudentApi';
import veStuHealthReportApi from '@/views/stuManage/xljk/api/veStuHealthReportApi';
import hqStuPositionApplyApi from '@/views/stuManage/kqManage/api/hqStuPositionApplyApi';
import veStuRewardApi from '@/views/stuManage/kqManage/api/veStuRewardApi';
import veStuPunishApi from '@/views/stuManage/kqManage/api/veStuPunishApi';
import veStuLiteraryActiveApi from '@/views/stuManage/zhsz/api/veStuLiteraryActiveApi';
import veStuHygieneStudentApi from '@/views/stuManage/zhsz/api/veStuHygieneStudentApi';
import veStuCheckStudentApi from '@/views/stuManage/zhsz/api/veStuCheckStudentApi';
import veStuCaucusApi from '@/views/stuManage/zhsz/api/veStuCaucusApi';
export default {
  components: {},
  data() {
    const data = {
      stuInfo: null,
      xscjList: [],
      xwjcList: [],
      wsjcList: [],
      whhdList: [],
      dyhdList: [],
      jianliList: [],
      chenfaList: [],
      qinggjxList: [],
      tizhiList: [],
      zhiyeList: [],
      caoxinList: [],
      veStuEvaluationVo: this.resetveStuEvaluationVo(),
      textMap: {
        update: '编辑-学生评价表',
        create: '新增-学生评价表'
      },
      dialogStatus: 'create',
      veStuEvaluationRules: {}
    };
    return data;
  },
  mounted() {
	  //this.doShow();
	  if(this.$hasPer(['student'])){
		   this.getStudentInfo();
	  }
  },
  methods: {
	  getStudentInfo(){
		  veBaseStudentApi.findStudentInfo().then(res => {
			  console.log("res.result",res.result)
		    this.stuInfo = res.result;
			this.getCjList();
		    //  this.veBaseStudentInfoVo = res.result.stuInfo;
		  });
	  },
	  getCjList(){
		  axios({
		  	url: '/kwgl/veJwChengji/list',
		  	method: 'get',
		  	params: {}
		  }).then(res => {
			  this.xscjList=res.result.records;
		  })
	  },
    initData(stuId) {
      const allSub = {
        conditions: [{ operator: 'eq', column: 'stu_id', value: stuId }]
      };
      const pageSub = {
        size: 1000,
        current: 1,
        conditions: [{ operator: 'eq', column: 'stu_id', value: stuId }]
      };
	  // 
      veStuHealthReportApi.all(allSub).then(res => {
        this.tizhiList = res.result;
      });
	  // 
      hqStuPositionApplyApi.page(pageSub).then(res => {
        this.qinggjxList = res.result.records;
      });
      veStuRewardApi.page(pageSub).then(res => {
        this.jianliList = res.result.records;
      });
      veStuPunishApi.page(pageSub).then(res => {
        this.chenfaList = res.result.records;
      });
      veStuHygieneStudentApi.findStu(stuId).then(res => {
        this.wsjcList = res.result;
      });
      veStuCheckStudentApi.findStu(stuId).then(res => {
        this.xwjcList = res.result;
      });
      const pageWenHua = {
        size: 1000,
        current: 1,
        params: {
          my: true,
          stuId: stuId
        }
      };
      veStuLiteraryActiveApi.page(pageWenHua).then(res => {
        this.whhdList = res.result.records;
      });
      veStuCaucusApi.page(pageWenHua).then(res => {
        this.dyhdList = res.result.records;
      });
    },
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
		if(row){
			veBaseStudentApi.get(row.id).then(res => {
			  this.stuInfo = res.result;
			  //  this.veBaseStudentInfoVo = res.result.stuInfo;
			});
			this.initData(row.id);
			this.dialogStatus = 'update';
		}else{
			this.getStudentInfo();
		}
      // this.$nextTick(() => {
      //   this.$refs.veStuEvaluationDataForm.clearValidate();
      // });
    },
    /**
     * @msg: 重置数据
     */
    resetveStuEvaluationVo() {
      return {
        stuId: '', // 学生Id
        judgeUser: '', // 评价人
        judgeUserName: '', //
        comment: '' // 老师评语
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.dialogStatus = 'create';
      this.veStuEvaluationVo = this.resetveStuEvaluationVo();
      this.$nextTick(() => {
        this.$refs.veStuEvaluationDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veStuEvaluationVo);
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veStuEvaluationDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veStuEvaluationApi.add(subData).then(res => {
            this.$notification.success({
              message: '数据新增成功',
              description: '新增了一条数据'
            });
            this.$emit('onOk');
          });
        }
      });
    },
    /**
     * @msg: 调用Api修改数据
     */
    updateData() {
      this.$refs.veStuEvaluationDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veStuEvaluationApi.update(subData).then(() => {
            this.$notification.success({
              message: '数据修改成功',
              description: '修改了一条数据'
            });
            this.$emit('onOk');
          });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.info_view {
  max-height: 70vh;
  overflow-y: auto;
  padding: 15px;
  /deep/.ant-empty {
    margin: 0px;
  }
}
::-webkit-scrollbar {
  width: 8px;
  height: 10px;
}
::-webkit-scrollbar-thumb {
  border-radius: 50px;
  background-color: rgba(0, 0, 0, 0.2);
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
}
.detail_title {
  margin-top: 8px;
}
.stable {
  text-align: left;
  width: 100%;
  td {
    border: 1px solid #ebebeb;
    padding: 8px;
  }
}
</style>
