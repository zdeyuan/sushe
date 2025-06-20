<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-04-21 22:49:27
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-06-10 23:02:37
-->
<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div class="ant-table-body edu-form-size">
        <a-form-model ref="veStuIdxScoreConfigDataForm" :rules="veStuIdxScoreConfigRules" :model="veStuIdxScoreConfigVo" labelAlign="right">
          <a-form-model-item label="模板名称" prop="name" required>
            <a-input v-model="tempData.name" :maxLength="50" placeholder="请输入模板名称" />
          </a-form-model-item>
          <a-form-model-item label="模板大小" prop="size" required>
            <a-input v-model="tempData.size" style="width:50px" :maxLength="50" />
            X
            <a-input v-model="tempData.size2" style="width:50px" :maxLength="50" />
            (单位：mm)
          </a-form-model-item>
          <a-form-model-item label="打印方向" prop="zhouqi" required>
            <edu-data v-model="tempData.zhouqi" stype="select" code="printSet" />
          </a-form-model-item>
          <a-form-model-item label="打印代码">
            <a-textarea v-model="tempData.content" :maxLength="300" placeholder="请输入详细说明" :rows="15" />
            <div style="color:red">
              支持数据：姓名、性别、专业、毕业年、毕业月、出生年、出生月、入学年、入学月、学制、身份证号、毕业证号，模板示例：%姓名%
            </div>
          </a-form-model-item>
        </a-form-model>

        <div class="form-footer">
          <a-button style="padding: 0 25px;margin-right: 15px;" type="primary" @click="updateData">
            确定
          </a-button>
          <a-button style="padding: 0 25px;margin-right: 15px;" @click="rest">
            重置
          </a-button>
        </div>
      </div>
    </div>
  </edu-layout>
</template>

<script>
import veStuPeriodApi from '@/views/stuManage/jis/api/veStuPeriodApi';

export default {
  components: {},
  data() {
    const data = {
      tempData: {
        name: '毕业证书模板',
        size: '270.00',
        size2: '200.00',
        zhouqi: 0,
        content: `LODOP.PRINT_INITA(0,0,1020,756,"");
LODOP.SET_PRINT_PAGESIZE(0,2700,2000,"");
LODOP.ADD_PRINT_SETUP_BKIMG("C:\\Users\\thong\\Desktop\\bymodel1.jpg");
LODOP.SET_SHOW_MODE("BKIMG_PRINT",true);
LODOP.ADD_PRINT_TEXT(328,190,69,26,"%姓名%");
LODOP.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
LODOP.ADD_PRINT_TEXT(328,381,38,26,"%性别%");
LODOP.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
LODOP.ADD_PRINT_TEXT(328,468,78,26,"%出生年%");
LODOP.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
LODOP.ADD_PRINT_TEXT(328,568,68,26,"%出生月%");
LODOP.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
LODOP.ADD_PRINT_TEXT(328,669,58,26,"%出生日%");
LODOP.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
LODOP.ADD_PRINT_TEXT(328,840,78,26,"%入学年%");
LODOP.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
LODOP.ADD_PRINT_TEXT(375,110,52,26,"%入学月%");
LODOP.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
LODOP.ADD_PRINT_TEXT(378,241,78,26,"%毕业年%");
LODOP.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
LODOP.ADD_PRINT_TEXT(378,349,56,26,"%毕业月%");
LODOP.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
LODOP.ADD_PRINT_TEXT(378,612,222,26,"%专业%");
LODOP.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
LODOP.ADD_PRINT_TEXT(427,182,72,26,"%学制%");
LODOP.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
LODOP.ADD_PRINT_TEXT(426,349,32,26,"专");
LODOP.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
LODOP.ADD_PRINT_TEXT(563,257,133,26,"武汉职业技术学院");
LODOP.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
LODOP.ADD_PRINT_TEXT(563,767,55,26,"张苍冥");
LODOP.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
LODOP.ADD_PRINT_TEXT(632,209,100,26,"%毕业证号%");
LODOP.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
LODOP.ADD_PRINT_TEXT(630,639,45,27,"2016");
LODOP.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
LODOP.ADD_PRINT_TEXT(630,764,30,26,"07");
LODOP.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
LODOP.ADD_PRINT_TEXT(630,857,28,26,"21");
LODOP.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
LODOP.SET_PRINT_STYLEA(0,"FontSize",11);`
      },
      dataList: {},
      veStuIdxScoreConfigRules: {}
    };
    return data;
  },
  mounted() {
    this.init();
  },
  methods: {
    rest() {},
    init() {
      const sub = {
        sorts: [{ column: 'list_sort', asc: true }]
      };
      veStuPeriodApi.all(sub).then(res => {
        this.dataList = res.result;
      });
    },
    /**
     * @msg: 调用Api修改数据
     */
    updateData() {
      veStuPeriodApi.update(this.dataList).then(() => {
        this.$notification.success({
          message: '数据修改成功',
          description: '修改了一条数据'
        });
        this.$emit('onOk');
      });
    },
    /**
     * @msg: 表格获取请求数据 必须return 一个对象
     */
    getParams() {
      const params = this.$refs['cwQuery'].getQueryData();
      return params;
    },
    /**
     * @msg: 搜索事件
     */
    handleFilter() {
      this.$refs.veStuPeriodTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuPeriodEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuPeriodEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veStuPeriodShow.doShow(row);
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
      this.$refs.veStuPeriodTable.reload();
    }
  }
};
</script>
<style lang="less" scoped>
.ant-table-body {
  padding: 15px 10%;
}

.my_table {
  width: 100%;

  th,
  td {
    text-align: center;
    padding: 8px;
    border: 1px solid #f2f2f2;
  }
}
.form-footer {
  padding: 15px;
  text-align: center;
}
</style>
