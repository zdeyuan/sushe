<template>
  <a-card :bordered="false">
<!--    <div style="border-bottom: 1px #3779CA solid;margin-bottom: 20px">-->
<!--      <p style="display: inline-block;font-weight: bold;font-size: 16px;color: #999999">调课管理</p>-->
<!--      <p style="display: inline-block;font-weight: bold;font-size: 16px">></p>-->
<!--      <p style="display: inline-block;font-weight: bold;font-size: 16px">调课统计</p>-->
<!--    </div>-->

    <a-row>
        <p class="cm-p1">教学班</p>
        <a-input :value="selectedClassesName" disabled placeholder="选择教学班级" style="width: 200px; margin-right: 8px"></a-input>
         <a-button type="primary"  icon="search"   @click="onClickSelectClass" >选择</a-button>
        <a-button @click="onClickCleanSkxzbdm" type="danger" icon="rest">清空</a-button>
	  </a-row>
	 <a-row>
        <p class="cm-p1">教职工号</p>
        <a-input v-model="queryParams.jsjgh" placeholder="请输入教职工号" style="width: 150px; margin-right: 8px"></a-input>
		  <p class="cm-p1">课程名称</p>
		  <a-input v-model="queryParams.kcmc" placeholder="请输入课程名称" style="width: 150px; margin-right: 8px"></a-input>
        <a-button @click="onClickSearch" type="primary" icon="search">搜索</a-button>
        <a-button @click="onClickClean" type="danger" icon="rest">清空</a-button>
    </a-row>

    <g-tools :fields="toolsFields" />

    <g-table ref="refTable" :columns="columns" :data="loadData" :scroll="scroll" row-key="id"></g-table>

    <examine-model :data="examineData" :visible.sync="examineVisible" ref="refExamineModel"></examine-model>
    <select-class-model :visible.sync="selectClassesVisible" @ok="onSelectJSBJOk" ref="searchModel"></select-class-model>
  </a-card>
</template>
<script>
import examineModel from '@/views/jwManage/courseManagement/record/modules/examineModel.vue'
import selectClassModel from '../record/modules/selectClassModel.vue'
import selectClassMixin from '../record/modules/selectClassMixin.js'
import '@/assets/scss/generalStyle.less'
import GTools from '@/components/GTools'
import GTable from '@/components/GTable'
import '@/assets/couMan/universal.less'
import { apiScheduleClassSwitchTiaoke } from '@/api/schedule/index'
function digital2Chinese(num, identifier) {
	    const character = ['一','二', '三', '四', '五', '六','日'];
	    return identifier === 'week' && (num === 0 || num === 7) ? '一' : character[num-1];
	  }
 function digital2ChineseS(num) {
        const character =['一','二', '三', '四', '五', '六','七','八','九','晚自习第一节','晚自习第二节','晚自习第三节'];
        return  `第${character[num-1]}节`;
      }
const columns = [
  { title: '原上课日期', dataIndex: 'yskrq', key: 'yskrq' },
  { title: '原上课周', dataIndex: 'yweek', key: 'yweek',
	customRender: (text) => '星期' + digital2Chinese(text, 'week') 
	},
  { title: '原上课节', dataIndex: 'section', key: 'section',customRender: function (text) {
			  return  digital2ChineseS(text) 
			} },
  { title: '新上课日期', dataIndex: 'xskrq', key: 'xskrq' },
  { title: '新上课周', dataIndex: 'xweek', key: 'xweek',
  	customRender: (text) => '星期' + digital2Chinese(text, 'week') 
  	},
  { title: '申请教师', dataIndex: 'teacherName', key: 'teacherName' },
  { title: '新上课节', dataIndex: 'xsection', key: 'xsection',customRender: function (text) {
  			  return  digital2ChineseS(text) 
  			} },
  { title: '上课教学班', dataIndex: 'bjmc', key: 'bjmc' },
  { title: '审核人', dataIndex: 'verifyUser', key: 'verifyUser' },
  { title: '审核时间', dataIndex: 'verifyTime', key: 'verifyTime' },
]


const queryParams = {
  currentUser: undefined,
  jsjgh: undefined, // 教师工号
  kcmc: undefined, // 课程名称
  skxzbdm: undefined, // 教学班代码
  verifyStatus: 1, // 审核状态
}

export default {
  data() {
    const _t = this
    return {
      columns,
      toolsFields: [{ fieldType: 'button', label: '刷新', icon: 'sync', type: 'info', handler: _t.onClickToolRefresh }],
      queryParams: { ...queryParams }, // 筛选数据
      scroll: { x: 1200 },
      examineData: null,
      examineVisible: false,
      examineMode: 2, // 这里没有新增和编辑，只有查看
    }
  },
  created() {},
  mixins: [selectClassMixin],
  computed: {},
  components: {
    GTools,
    GTable,
    examineModel,
    selectClassModel,
  },
  methods: {
    onClickSearch() {
      this.refreshTable(1)
    },
    onClickClean() {
      this.selectedClasses = []
      this.queryParams = { ...queryParams };
	  this.refreshTable(1)
    },
    onClickToolRefresh() {
      this.refreshTable(1)
    },
    // table
    onClicOpenView(record) {
      this.examineData = record
      this.examineVisible = true
      this.examineMode = 2 // 2 查看
    },

    refreshTable(b = 0) {
      this.$refs.refTable.refresh(b)
      this.selectedRowKeys = []
    },
    // 表格拉取数据
    loadData(params) {
      params = { ...params, ...this.queryParams, skxzbdm: this.selectedClassesIds }
      return apiScheduleClassSwitchTiaoke.getPageList(params).then((res) => res.result)
    },
  },
}
</script>
<style scoped>
</style>
