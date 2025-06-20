<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="项目详情" width="65%" size="big" class="mini-form-item inline-form" @cancel="handelCancel" :isShowBtn="false" top="10%">
      <a-form-model ref="veJkyProjectDataForm" labelAlign="right">
        <div class="detail_title">人员基本信息</div>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="姓名" prop="serial">
              {{ veJkyUserInfo.realname }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="毕业院校" prop="name">
              {{ veJkyUserInfo.graCollege }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="学历" prop="name">
              <edu-dict-text code="xueli" :value="veJkyUserInfo.educate"></edu-dict-text>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="职称" prop="name">
              <edu-dict-text code="zhichen" :value="veJkyUserInfo.proCall"></edu-dict-text>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="科研方向" prop="name">
              {{ veJkyUserInfo.direction }}
            </a-form-model-item>
          </a-col>
        </a-row>
        <div class="work_list" v-if="projectList.length > 0">
          <div class="detail_title">项目信息</div>
          <div v-for="(veJkyProjectVo, index) in projectList" :key="veJkyProjectVo.id" class="work_box">
            <div class="one_t">项目{{ +index }}</div>
            <a-row>
              <a-col :span="12">
                <a-form-model-item label="项目编号" prop="serial">
                  {{ veJkyProjectVo.serial }}
                </a-form-model-item>
              </a-col>
              <a-col :span="12">
                <a-form-model-item label="项目名称" prop="name">
                  {{ veJkyProjectVo.name }}
                </a-form-model-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="12">
                <a-form-model-item label="项目分类" prop="cateId">
                  {{ veJkyProjectVo.cateIdText }}
                </a-form-model-item>
              </a-col>

              <a-col :span="12">
                <a-form-model-item label="级别id" prop="levelId">
                  {{ veJkyProjectVo.levelIdText }}
                </a-form-model-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="12">
                <a-form-model-item label="立项组织" prop="createOragn">
                  {{ veJkyProjectVo.createOragnText }}
                </a-form-model-item>
              </a-col>

              <a-col :span="12">
                <a-form-model-item label="项目经费" prop="totalCost">
                  {{ veJkyProjectVo.totalCost }}
                </a-form-model-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="12">
                <a-form-model-item label="项目开始时间" prop="startTime">
                  {{ veJkyProjectVo.startTime }}
                </a-form-model-item>
              </a-col>

              <a-col :span="12">
                <a-form-model-item label="项目结束时间" prop="endTime">
                  {{ veJkyProjectVo.endTime }}
                </a-form-model-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="12">
                <a-form-model-item label="项目合同编号" prop="termNum">
                  {{ veJkyProjectVo.termNum }}
                </a-form-model-item>
              </a-col>
              <a-col :span="12">
                <a-form-model-item label="项目来源" prop="source">
                  {{ veJkyProjectVo.source }}
                </a-form-model-item>
              </a-col>
            </a-row>
            <a-form-model-item label="项目简介" prop="remark">
              {{ veJkyProjectVo.remark }}
            </a-form-model-item>
            <a-form-model-item label="项目成员" v-if="veJkyProjectVo.userNames">
              {{ veJkyProjectVo.userNames }}
            </a-form-model-item>
          </div>
        </div>

        <div class="fruit_list work_list" v-if="fruitList.length > 0">
          <div class="detail_title">成果信息</div>
          <div v-for="(item, index) in fruitList" :key="item.id" class="work_box">
            <div class="one_t">成果{{ +index }}</div>
            <a-row>
              <a-col :span="12">
                <div class="work-info">
                  <label>成果名称</label>
                  <span>{{ item.name }}</span>
                </div>
              </a-col>
              <a-col :span="12">
                <div class="work-info">
                  <label>发表成果时间</label>
                  <span>{{ item.createTime }}</span>
                </div>
              </a-col>
              <a-col :span="12">
                <div class="work-info">
                  <label>成果参与人员</label>
                  <span>{{ item.userNames }}</span>
                </div>
              </a-col>
              <a-col :span="12">
                <div class="work-info">
                  <label>成果文件名称</label>
                  <span>{{ item.fileNames }}</span>
                </div>
              </a-col>
              <a-col :span="24">
                <div class="work-info">
                  <label>成果说明</label>
                  <span>{{ item.textId }}</span>
                </div>
              </a-col>
            </a-row>
          </div>
        </div>

        <div class="work_list" v-if="workList.length > 0">
          <div class="detail_title">工作信息</div>
          <div v-for="(item, index) in workList" :key="item.id" class="work_box">
            <div class="one_t">工作{{ +index }}</div>
            <a-row>
              <a-col :span="12">
                <div class="work-info">
                  <label>工作名称</label>
                  <span>{{ item.title }}</span>
                </div>
              </a-col>
              <a-col :span="12">
                <div class="work-info">
                  <label>工作人员</label>
                  <span>{{ item.userNames }}</span>
                </div>
              </a-col>
              <a-col :span="12">
                <div class="work-info">
                  <label>开始时间</label>
                  <span>{{ item.startTime }}</span>
                </div>
              </a-col>
              <a-col :span="12">
                <div class="work-info">
                  <label>结束时间</label>
                  <span>{{ item.endTime }}</span>
                </div>
              </a-col>
              <a-col :span="12">
                <div class="work-info">
                  <label>工作经度</label>
                  <span>{{ item.progress }}%</span>
                </div>
              </a-col>
            </a-row>
          </div>
        </div>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veJkyProjectApi from '@/api/research/rproject/veJkyProjectApi';
import uploadFiles from '@/components/kqManageComponent/uploadFiles';
import veJkyProjectWorkApi from '@/api/research/rproject/veJkyProjectWorkApi';
import veJkyGainApi from '@/api/research/rproject/veJkyGainApi';
export default {
  components: { uploadFiles },
  props: {
    showAudit: {
      type: Boolean,
      default: true
    },
    showFruit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const data = {
      spyj: '',
      viewType: 'show',
      progress: 0,
      marks: {
        0: '0%',
        50: '50%',
        100: '100%'
      },
      veJkyUserInfo: {},
      projectList: [],
      workList: [],
      fruitList: []
    };
    return data;
  },
  mounted() {},
  methods: {
    initProject(userId) {
      const sub = {
        size: 1000,
        current: 1,
        conditions: [],
        params: { userId: userId },
        sorts: [{ column: 'd.id', asc: false }]
      };
      veJkyProjectApi.page(sub).then(res => {
        this.projectList = res.result.records;
      });
    },
    initFruit(userId) {
      const sub = {
        size: 1000,
        current: 1,
        conditions: [],
        params: { userId: userId },
        sorts: [{ column: 'd.id', asc: false }]
      };
      veJkyGainApi.page(sub).then(res => {
        this.fruitList = res.result.records;
      });
    },
    initWork(userId) {
      const sub = {
        size: 1000,
        current: 1,
        conditions: [],
        params: { userId: userId },
        sorts: [{ column: 'd.id', asc: false }]
      };
      veJkyProjectWorkApi.page(sub).then(res => {
        this.workList = res.result.records;
      });
    },
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veJkyUserInfo = row;
      this.initProject(row.id);
      this.initWork(row.id);
      this.initFruit(row.id);
      this.$nextTick(() => {
        this.$refs.veJkyProjectDataForm.clearValidate();
      });
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
.cstatus2 {
  color: #039471;
}
.cstatus3 {
  color: rgb(212, 117, 117);
}
.cstatus1 {
  color: #999;
}
.progress_div {
  padding: 15px 15%;
}
.tip_msg {
  text-align: center;
  color: red;
  font-size: 12px;
}

.work_list {
  .work_title {
    padding-left: 180px;
  }
  .work_box {
    border: 1px dashed #3ca7e8;
    border-radius: 15px;
    margin-bottom: 15px;
    .work-info {
      padding: 8px 0;
      label {
        display: inline-block;
        width: 100px;
        text-align: right;
        padding-right: 15px;
        color: #888;
      }
      span {
        color: #000;
      }
    }
  }
}
.one_t {
  padding: 5px 30px;
  font-size: 14px;
  color: #000;
}
</style>
