<template>
  <div class="edit_form">
    <a-row>
      <a-col :span="4">
        <div class="quetion-info">
          <div class="detail_title">可选题型</div>
          <div class="detail_box">
            <a-button block @click="addTimu('dan')">单选题</a-button>
          </div>
          <div class="detail_box">
            <a-button block @click="addTimu('duo')"> 多选题</a-button>
          </div>
          <div class="detail_box">
            <a-button block @click="addTimu('wen')">问答题</a-button>
          </div>
        </div>
      </a-col>
      <a-col :span="20">
        <edu-form :title="textMap[dialogStatus]" type="view" @ok="dialogStatus === 'create' ? createData() : updateData()" @cancel="handelCancel">
          <a-form-model ref="hqStuHealthQuestionDataForm" :rules="hqStuHealthQuestionRules" :model="hqStuHealthQuestionVo" labelAlign="right">
            <a-form-model-item label="问卷标题" prop="title" required>
              <a-input v-model="hqStuHealthQuestionVo.title" :maxLength="100" placeholder="请输入标题" />
            </a-form-model-item>
            <a-form-model-item label="问卷描述" prop="content" required>
              <a-textarea v-model="hqStuHealthQuestionVo.content" :maxLength="300" placeholder="请输入问卷描述" :rows="4" />
            </a-form-model-item>
            <a-form-model-item label="状态" prop="status" required>
              <edu-data v-model="hqStuHealthQuestionVo.status" stype="radio" code="dioayan" />
            </a-form-model-item>
          </a-form-model>
          <div class="timu-info">
            <div class="timu-box" v-for="(item, index) in timuList">
              <div class="title-box">
                <span class="title"> 第{{ index + 1 }}题</span>
                <span class="title-type">(<edu-dict-text code="timuType" :value="item.type"></edu-dict-text>)</span>
                <a-button shape="circle" class="title-btn" icon="delete" @click="timuList.splice(index, 1)" />
              </div>
              <a-form-model-item label="题目" class="ytop" prop="title">
                <a-input v-model="item.title" :maxLength="100" placeholder="请输入题目" />
              </a-form-model-item>
              <a-form-model-item label="选项" v-if="item.type != 'wen'">
                <div class="xuan-info">
                  <div class="xuan-box" v-for="(xuanItem, xuanIndex) in item.arr">
                    <span class="title">{{ xuanIndex | engNum }}、</span>
                    <a-input v-model="xuanItem.title" style="width:400px" :maxLength="100" placeholder="请输入选项" />

                    <span
                      v-if="item.type == 'dan'"
                      :class="item.answer == xuanIndex ? 'selected' : ''"
                      class="setdan"
                      @click="item.answer = xuanIndex"
                    >
                      设置为答案
                    </span>
                    <span
                      v-if="item.type == 'duo'"
                      :class="item.answer.indexOf(xuanIndex) > -1 ? 'selected' : ''"
                      class="setdan"
                      @click="toRemove(item.answer, xuanIndex)"
                    >
                      设置为答案
                    </span>

                    <a-button shape="circle" class="xuan-btn" icon="delete" @click="item.arr.splice(xuanIndex, 1)" />
                  </div>
                  <div class="detail_box add">
                    <a-button @click="addXuan(item.arr)">新增选项</a-button>
                  </div>
                </div>
              </a-form-model-item>
              <a-form-model-item label="备注" prop="remark">
                <a-input v-model="item.remark" :maxLength="500" placeholder="请输入备注" />
              </a-form-model-item>
              <a-form-model-item label="问题解析" prop="remark">
                <a-textarea v-model="item.analysis" :maxLength="300" placeholder="请输入问题解析" :rows="4" />
              </a-form-model-item>
              <a-form-model-item label="参考答案" v-if="item.type == 'wen'" prop="remark">
                <a-textarea v-model="item.answer" :maxLength="300" placeholder="请输入问题解析" :rows="4" />
              </a-form-model-item>
            </div>
          </div>
        </edu-form>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import hqStuHealthQuestionApi from '../../api/hqStuHealthQuestionApi';

export default {
  components: {},
  data() {
    const data = {
      hqStuHealthQuestionVo: this.resethqStuHealthQuestionVo(),
      textMap: {
        update: '编辑-心理健康测试',
        create: '新增-心理健康测试'
      },
      dialogStatus: 'create',
      timuList: [],
      hqStuHealthQuestionRules: {
		  remark: [{ required: true , message: '请输入备注',}],
		  analysis: [{ required: true , message: '请输入问题解析',}],
		  title: [{ required: true , message: '请输入问卷标题',}],
		  content: [{ required: true , message: '请输入问卷描述',}],
		  status: [{ required: true , message: '选择状态',}],
	  }
    };
    return data;
  },
  filters: {
    engNum(val) {
      return String.fromCharCode(65 + parseInt(val));
    }
  },
  mounted() {},
  methods: {
    toRemove(arr, num) {
      const index = arr.indexOf(num);
      if (index > -1) {
        arr.splice(index, 1);
      } else {
        arr.push(num);
      }
    },
    addXuan(arr) {
      arr.push({ title: '' });
    },
    addTimu(type) {
      const timu = {
        type: type,
        title: '',
        remark: '',
        answer: '',
        analysis: ''
      };
      if (type == 'dan') {
        timu.answer = -99;
      } else if (type == 'duo') {
        timu.answer = [];
      }
      if (type != 'wen') {
        timu.arr = [{ title: '' }, { title: '' }];
      }
      this.timuList.push(timu);
    },
    /**
     * @msg: 重置数据
     */
    resethqStuHealthQuestionVo() {
      return {
        userId: '', // 添加人
        title: '', // 标题
        content: '', // 心里测试内容
        analysis: '', // 心理测试答案解析
        status: 2 // 状态：0=禁用，1=启用
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.dialogStatus = 'create';
      this.hqStuHealthQuestionVo = this.resethqStuHealthQuestionVo();
      this.$nextTick(() => {
        this.$refs.hqStuHealthQuestionDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      hqStuHealthQuestionApi.get(row.id).then(res => {
        this.hqStuHealthQuestionVo = res.result;
        this.timuList = JSON.parse(res.result.analysis);
      });
      this.dialogStatus = 'update';
      this.$nextTick(() => {
        this.$refs.hqStuHealthQuestionDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.hqStuHealthQuestionVo);
      if (this.timuList.length == 0) {
        this.$message.error('请添加题目');
        return;
      }

      for (let i = 0; i < this.timuList.length; i++) {
        const data = this.timuList[i];
        if (!data.title) {
          this.$message.error('请输入题目');
          return;
        }
        if (data.arr) {
          for (let j = 0; j < data.arr.length; j++) {
            const option = data.arr[j];
            if (!option.title) {
              this.$message.error('请输入选项');
              return;
            }
          }
        }
        if (data.type == 'dan') {
          if (data.answer < 0) {
            this.$message.error('请选择答案');
            return;
          }
        }
      }
      tempData.analysis = JSON.stringify(this.timuList);
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.hqStuHealthQuestionDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          hqStuHealthQuestionApi.add(subData).then(res => {
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
      this.$refs.hqStuHealthQuestionDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          hqStuHealthQuestionApi.update(subData).then(() => {
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
.setdan {
  color: #999;
  display: inline-block;
  padding: 0px 5px;
  border-radius: 5px;
  margin-left: 15px;
  cursor: pointer;
  font-size: 12px;
  line-height: 29px;
  border: 1px #999 solid;
  &.selected {
    background: #1890ff;
    border: 1px #1890ff solid;
    color: white;
  }
}
.detail_box {
  padding: 8px 0;
  .ant-btn {
    color: #1890ff;
  }
}
.quetion-info {
  padding: 15px;
}
.timu-info {
  .timu-box {
    padding-top: 15px;
    .title-box {
      margin: 8px 0;
      .title {
        color: #1890ff;
        font-size: 16px;
      }
      .title-type {
        color: #ababab;
        font-size: 12px;
        display: inline-block;
        padding-left: 20px;
      }
      .title-btn {
        float: right;
      }
    }
    .xuan-info {
    }
    .xuan-box {
      border: 1px dashed #d6d6d6;
      margin: 8px;
      padding: 5px;
      border-radius: 5px;
    }
    .xuan-btn {
      float: right;
    }
  }
}
</style>
