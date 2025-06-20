<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="项目详情" width="65%" size="big" class="mini-form-item inline-form" @cancel="handelCancel" :isShowBtn="false" top="10%">
      <div class="detail_title">基本信息</div>
      <a-form-model ref="veJkyProjectDataForm" labelAlign="right">
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
        <div style="padding-bottom:15px">
          <uploadFiles ref="uploadFiles" serviceType="project" edit />
        </div>

        <div class="fruit_list work_list" v-if="fruitList.length > 0 && showFruit">
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

        <template v-if="veJkyProjectVo.checkStatus != 1 && showAudit">
          <div class="detail_title">审核信息</div>
          <div class="card_content">
            <a-row>
              <a-col :span="12">
                <a-form-model-item label="审核状态" prop="serial">
                  <edu-dict-text
                    code="projectAudit"
                    :class="'cstatus' + veJkyProjectVo.checkStatus"
                    :value="veJkyProjectVo.checkStatus"
                  ></edu-dict-text>
                </a-form-model-item>
              </a-col>
              <a-col :span="12">
                <a-form-model-item label="审核人" prop="serial">
                  {{ veJkyProjectVo.mark }}
                </a-form-model-item>
              </a-col>
              <a-col :span="12">
                <a-form-model-item label="审核时间" prop="name">
                  {{ veJkyProjectVo.checkTime }}
                </a-form-model-item>
              </a-col>
              <a-col :span="12">
                <a-form-model-item label="审核理由" prop="name">
                  {{ veJkyProjectVo.checkTxt }}
                </a-form-model-item>
              </a-col>
            </a-row>
          </div>
        </template>

        <template v-if="viewType == 'audit'">
          <div class="detail_title">项目审核</div>
          <div class="card_content">
            <a-textarea v-model="spyj" :rows="4" :maxLength="65535" placeholder="请输入审批意见" />
            <div class="decision" style="padding:15px 0" align="right">
              <a-button type="primary" style="margin-right:15px" @click="audit(2)">审核通过 </a-button>
              <a-button type="danger" @click="audit(3)">
                驳 回
              </a-button>
            </div>
          </div>
        </template>

        <template v-if="viewType == 'progress'">
          <div class="detail_title">项目进度修改</div>
          <div class="card_content">
            <div class="progress_div"> <a-slider :marks="marks" v-model="progress" :min="0" :max="100"/></div>
            <div class="tip_msg">修改为100%将完成项目</div>
            <div class="decision" style="padding:15px 0" align="right">
              <a-button type="primary" style="margin-right:15px" @click="changeProgress()">修改进度</a-button>
            </div>
          </div>
        </template>
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
      veJkyProjectVo: {},
      marks: {
        0: '0%',
        50: '50%',
        100: '100%'
      },
      workList: [],
      fruitList: []
    };
    return data;
  },
  mounted() {},
  methods: {
    initFruit(proId) {
      const sub = {
        size: 1000,
        current: 1,
        conditions: [{ operator: 'eq', column: 'd.project_id', value: proId }],
        sorts: [{ column: 'd.id', asc: false }]
      };
      veJkyGainApi.page(sub).then(res => {
        this.fruitList = res.result.records;
      });
    },
    initWork(proId) {
      const sub = {
        size: 1000,
        current: 1,
        conditions: [{ operator: 'eq', column: 'd.project_id', value: proId }],
        sorts: [{ column: 'd.id', asc: false }]
      };
      veJkyProjectWorkApi.page(sub).then(res => {
        this.workList = res.result.records;
      });
    },
    /**
     * @msg: 初始化修改
     */
    doShow(row, type) {
      if (!type) {
        type = 'show';
      }
      this.viewType = type;
      this.progress = row.progress;
      veJkyProjectApi.get(row.id).then(res => {
        res.result.createOragn = parseInt(res.result.createOragn);
        this.veJkyProjectVo = res.result;
        setTimeout(() => {
          this.$refs.uploadFiles.setValue(res.result.id);
        }, 0);
      });
      this.initWork(row.id);
      if (this.showFruit) {
        this.initFruit(row.id);
      }
      this.$nextTick(() => {
        this.$refs.veJkyProjectDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veJkyProjectVo);
      const treeData = this.$refs.eduTree.getValue();
      tempData.cateId = treeData ? treeData[0] : 0;
      tempData.fileIds = this.$refs.uploadFiles.getValue();
      return tempData;
    },
    changeProgress() {
      let msg = `修改要将进度修改为${this.progress}%?`;
      if (this.progress == 100) {
        msg = '确定要完成项目?';
      }
      this.msgUtil.confirm('进度修改提示', msg, () => {
        veJkyProjectApi
          .updateProgress({
            ids: [this.veJkyProjectVo.id],
            status: this.progress
          })
          .then(res => {
            this.$notification.success({
              message: '修改成功',
              description: `成功将进度修改为${this.progress}%`
            });
          });
      });
    },
    /**
     * @msg: 调用Api创建数据
     */
    audit(checkStatus) {
      if (checkStatus == 3 && !this.spyj) {
        this.$message.error('驳回请输入理由');
        return;
      }
      const subData = {
        checkStatus: checkStatus,
        checkTxt: this.spyj || '',
        id: this.veJkyProjectVo.id
      };
      veJkyProjectApi.audit(subData).then(res => {
        this.$notification.success({
          message: '审核通过',
          description: '审核了一条数据'
        });
        this.$emit('onOk');
      });
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
