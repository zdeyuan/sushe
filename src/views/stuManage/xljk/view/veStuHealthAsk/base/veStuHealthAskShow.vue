<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-04-18 12:03:21
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-05-01 19:18:14
-->
<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="心理咨询详情" @ok="createDate" @cancel="handelCancel">
      <div>
        <div style="padding:15px">
          <h2 style="text-align:center"> {{ veStuHealthAskVo.title }}</h2>
        </div>
        <div style="padding:15px">
          <h3> {{ veStuHealthAskVo.content }}</h3>
        </div>
        <template v-if="dataList.length > 0">
          <div class="detail_title">发表提问</div>
          <div class="rep-list" style="padding:15px">
            <div class="box" v-for="item in dataList" :key="item.id">
              <div class="user">
                {{ item.answerUserName }}
                {{ item.answerTime }}

                <a-button style="float:right" @click="spyj = '回复@' + item.answerUserName + '：'">
                  回复
                </a-button>
              </div>
              <div class="msg">
                {{ item.answer }}
              </div>
            </div>
          </div>
        </template>
        <div v-else class="no-data">暂无回复</div>
        <div class="detail_title">发表提问</div>
        <a-textarea v-model="spyj" :rows="4" :maxLength="65535" placeholder="发表提问" />
      </div>
    </edu-form>
  </div>
</template>

<script>
import veStuHealthAskApi from '../../../api/veStuHealthAskApi';
import veStuHealthReplyApi from '../../../api/veStuHealthReplyApi';
export default {
  components: {},
  data() {
    const data = {
      veStuHealthAskVo: {},
      dataList: [],
      spyj: ''
    };
    return data;
  },
  mounted() {},
  methods: {
    init() {
      const sub = {
        conditions: [{ operator: 'eq', column: 'ask_id', value: this.veStuHealthAskVo.id }]
      };
      veStuHealthReplyApi.all(sub).then(res => {
        this.dataList = res.result;
      });
    },
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veStuHealthAskVo = Object.assign({}, row);
      this.init();
      //    veStuHealthAskApi.get(row.id).then((res) => {
      //      this.veStuHealthAskVo = res.result
      // });
    },
    /**
     * @msg: 获取提交的数据 新增和 修改复用
     */
    getSubData(isUpdate) {
      const tempData = {
        answer: this.spyj, // 回复内容
        askId: this.veStuHealthAskVo.id // 咨询内容Id
      };
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createDate() {
      if (!this.spyj) return;
      const subData = this.getSubData(false);
      if (subData == null) {
        return;
      }
      veStuHealthReplyApi.add(subData).then(res => {
        this.$notification.success({
          message: '数据新增成功',
          description: '新增了一条数据'
        });
        this.$emit('onOk');
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
.box {
  font-size: 14px;
  margin-bottom: 15px;
  border: 1px dashed #028be2;
  padding: 8px;
  .user {
    padding: 8px;
  }
  .msg {
    padding: 8px;
  }
}
</style>
