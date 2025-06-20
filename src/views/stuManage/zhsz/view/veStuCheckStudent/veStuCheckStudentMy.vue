<template>
  <!-- 表格 -->
  <div slot="table" class="right_table">
    <div class="div-box">
      <div class="item-box">
        <edu-table
          ref="veStuCheckStudentTable"
          code="veStuCheckStudent"
          :api="veStuCheckStudentTable.api"
          :get-params="getParams"
          :config="{
            open: false,
            close: false,
            status: false,
            delete: false
          }"
        >
          <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
          <a-table-column title="被评人" dataIndex="xm" width="150px"> </a-table-column>
          <a-table-column title="评测状态" dataIndex="status" width="150px">
            <template slot-scope="text">
              <span v-if="text == 0" class="status2">待测评</span>
              <span v-else class="status1">已评测</span>
            </template>
          </a-table-column>
          <template slot="bef_btn" slot-scope="{ row }">
            <edu-pms :code="'v-add'" type="primary" ext="success" :name="row.status == 0 ? '开始评测' : '查看评测'" @click="doShowCp(row)"></edu-pms>
          </template>
        </edu-table>
      </div>
    </div>
    <!-- 编辑页 -->
    <veStuCheckStudentEdit v-if="showType == 'edit'" ref="veStuCheckStudentEdit" @onOk="editOk" @onCancel="editCancel"> </veStuCheckStudentEdit>
  </div>
</template>

<script>
import veStuCheckStudentApi from '../../api/veStuCheckStudentApi';
import veStuCheckStudentEdit from './veStuCheckStudentEdit';
import veStuCheckItemApi from '../../api/veStuCheckItemApi';
import veStuCheckNormApi from '../../api/veStuCheckNormApi';
import { baseMixins } from '@/mixins/baseMixins';
export default {
  components: {
    veStuCheckStudentEdit
  },
  mixins: [baseMixins],
  data() {
    const data = {
      veStuCheckStudentQuery: {},
      showType: 'table',
      selectItemId: '',
      itemList: [],
      normList: []
    };
    data.veStuCheckStudentTable = {
      api: veStuCheckStudentApi
    };
    return data;
  },
  mounted() {
    this.initItem();
  },
  methods: {
    initItem() {
      const sub = {
        params: { tea: true }
        //  conditions: [{ operator: 'eq', column: 'status', value: 1 }]
      };
      veStuCheckItemApi.all(sub).then(res => {
        this.itemList = res.result;
      });
    },
    changeItem() {
      if (!this.selectItemId) {
        this.itemList = [];
        return;
      }
      this.handleFilter();
      setTimeout(() => {
        const sub = {
          params: { itemId: this.selectItemId }
          //  conditions: [{ operator: 'eq', column: 'status', value: 1 }]
        };
        veStuCheckNormApi.all(sub).then(res => {
          this.normList = res.result;
        });
      }, 100);
    },
    /**
     * @msg: 表格获取请求数据 必须return 一个对象
     */
    getParams() {
      //loginInfo
      const params = { conditions: [{ operator: 'eq', column: 'stu_id', value: this.selectItemId || -89899 }] };
      return params;
    },
    /**
     * @msg: 搜索事件
     */
    handleFilter() {
      this.$refs.veStuCheckStudentTable.reload();
    },
    /**
     * @msg: 编辑行事件
     */
    doShowCp(row) {
      const obj = this.$utils.getInArr(this.itemList, 'id', this.selectItemId);
      if (obj == null) return;
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuCheckStudentEdit.doShowCp(row, obj, this.normList);
      });
    },
    /**
     * @msg: 编辑页取消事件
     */
    editCancel() {
      this.showType = 'table';
    },
    /**
     * @msg: 编辑页成功事件
     */
    editOk() {
      this.showType = 'table';
      this.$refs.veStuCheckStudentTable.reload();
    }
  }
};
</script>
<style lang="less" scoped>
.div-box {
  display: flex;
  .xueqi {
    width: 300px;
    padding: 15px;
  }
  .item-box {
    padding: 15px;
    flex: 1;
  }
}
.alert-info {
  color: #3a87ad;
  background-color: #e9f3ff;
  border-color: #bcd9ff;
  font-size: 14px;
  padding: 9px 35px 9px 14px;
  margin-bottom: 11px;
  height: auto;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
}

.zhou {
  padding: 15px;
}
.week_box {
  padding: 15px;
  margin: 0 8px;
  text-align: left;
  font-size: 14px;
  cursor: pointer;
  &.selected {
    // background: #5fcbff;
    // color: #fff;

    border: 0.00521rem dashed #4e89f8;
    color: #4e89f8;
  }
}

.show_tr {
  /deep/.anticon-check {
    color: #039471;
    font-size: 16px;
  }
  /deep/.anticon-close {
    color: rgb(212, 117, 117);
    font-size: 16px;
  }
}
.detail {
  font-size: 14px;
  text-align: left;
}
.status1 {
  color: #039471;
}
.status2 {
  color: rgb(212, 117, 117);
}
</style>
