<template>
  <div class="edit_form">
    <!-- 编辑页
               <a-row>
              <a-col :span="12"> </a-col>
              <a-col :span="12"> </a-col>
            </a-row>-->
    <edu-form :title="textMap[dialogStatus]" :isShowBtnSure="!isShow" @ok="createData()" @cancel="handelCancel">
      <a-form-model ref="veStuHygieneNormOptionDataForm" :rules="veStuHygieneNormOptionRules" :model="veStuHygieneNormOptionVo" labelAlign="right">
        <a-form-model-item label="被评学生" prop="stuId">
          {{ stuInfo.xm }}
        </a-form-model-item>
        <a-form-model-item label="项目" prop="itemId">
          {{ itemInfo.name }}
        </a-form-model-item>
        <a-form-model-item label="指标项" prop="normId">
          <div class="week_box" v-for="(item, index) in normList" :key="item.id">
            <span class="title"> {{ index + 1 }} , {{ item.name }}</span>
            <a-input style="display:inner-block;width:300px" v-model="item.descb" placeholder="请输入描述" />
          </div>
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuHygieneNormOptionApi from '../../api/veStuHygieneNormOptionApi';

export default {
  components: {},
  data() {
    let validateUser = (rule, value, callback) => {
      let isOk = true;
      this.normList.forEach(element => {
        if (!element.descb) {
          isOk = false;
        }
      });
      if (isOk) {
        callback();
      } else {
        callback(new Error('请输入指标描述'));
      }
    };
    const data = {
      stuInfo: {},
      itemInfo: {},
      veStuHygieneNormOptionVo: this.resetveStuHygieneNormOptionVo(),
      textMap: {
        update: '查看-学生项目指标表',
        create: '新增-学生项目指标表'
      },
      normList: [],
      dialogStatus: 'create',
      isShow: true,
      veStuHygieneNormOptionRules: {
        normId: [{ validator: validateUser, trigger: 'change', required: true }]
      }
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveStuHygieneNormOptionVo() {
      return {
        stuId: '', // 被评学生Id
        itemId: '', // 项目Id
        normId: '', // 指标Id
        desc: '' // 描述
      };
    },
    /**
     * @msg: 初始化修改
     */
    doShowCp(stuObj, itemObj, normList) {
      this.stuInfo = stuObj;
      this.itemInfo = itemObj;
      this.normList = this.$utils.copyObject(normList);
      if (stuObj.status == 0) {
        //
        this.isShow = false;
      } else {
        this.isShow = true;
        const sub = {
          conditions: [
            { operator: 'eq', column: 'item_id', value: itemObj.id },
            { operator: 'eq', column: 'stu_id', value: stuObj.stuId }
          ]
        };
        veStuHygieneNormOptionApi.all(sub).then(res => {
          const list = res.result;
          this.normList.forEach((element, index) => {
            list.forEach(listrrr => {
              if (element.id == listrrr.normId) {
                this.$set(this.normList[index], 'descb', listrrr.descb);
                //element.descb = listrrr.descb;
              }
            });
          });
        });
      }
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
      const tempData = [];
      this.normList.forEach(element => {
        const item = {
          stuId: this.stuInfo.stuId,
          itemId: this.itemInfo.id,
          normId: element.id,
          descb: element.descb
        };
        tempData.push(item);
      });
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veStuHygieneNormOptionDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veStuHygieneNormOptionApi.add(subData).then(res => {
            this.$notification.success({
              message: '数据新增成功',
              description: '新增了一条数据'
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
.week_box {
  padding: 8px 0;
  .title {
    display: inline-block;
    min-width: 200px;
  }
}
</style>
