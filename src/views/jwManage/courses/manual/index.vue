<template>
  <div class="schedule">
    <a-breadcrumb v-show="false" separator=">" class="schedule-breadcrumb">
      <a-breadcrumb-item>排课管理</a-breadcrumb-item>
      <a-breadcrumb-item>手动排课</a-breadcrumb-item>
    </a-breadcrumb>

    <a-row>
      <a-col class="schedule-left boxshadow" :span="6">
        <a-card :bordered="false" size="small">
          <div class="schedule-left__search" v-if="false">
            <a-input v-model="keyword" placeholder="请输入课程名称" size="small" class="search-input" />
            <a-button type="primary" @click="handleSearch" icon="search" size="small">搜索</a-button>
          </div>
          <div class="schedule-left__form">
            <div class="form-label">选择学期</div>
            <a-select class="form-value" v-model="semesterId" placeholder="请选择学期" @change="handleSemesterChange">
              <a-select-option v-for="(item, index) in semesterData" :key="index" :value="item.id">{{
                item.xqmc
              }}</a-select-option>
            </a-select>
          </div>
          <div class="tree-wrp">
             <a-directory-tree
              :replace-fields="{ title: 'name', key: 'id' }"
              :tree-data="treeData"
              :load-data="onLoadData"
              default-expand-all
              @select="onTreeSelect"
            />
          </div>
        </a-card>
      </a-col>
      <a-col :span="18">
        <a-card :bordered="false" size="small" class="schedule-right boxshadow">
          <a-popconfirm title="确定要清空课表么?" ok-text="确定" cancel-text="取消" @confirm="handleClearClass">
            <a-button type="danger" icon="delete" size="small">清空课表</a-button>
<!--            <edu-button icon="delete" type="7" title="清空课表"></edu-button>-->
          </a-popconfirm>
          <div class="schedule-main">
            <div class="schedule-main__title">{{ scheduleTitle }}</div>
            <div class="schedule-main__table">
              <a-row class="table-row">
                <a-col class="table-th" :span="3"> 节次/星期 </a-col>
                <a-col class="table-th" :span="3" v-for="(item, index) in weekData" :key="index">
                  {{ item.weekName }}
                </a-col>
              </a-row>
               <a-spin :spinning="loading">
              <a-row class="table-row table-row__body" v-for="item in scheduleNodeMorningData" :key="item.id">
                <a-col :span="3" class="table-td table-section">
                  <div class="table-td__inner">
                    {{ item.section }}
                    <div class="table-section__time">{{ item.kssj }}-{{ item.jssj }}</div>
                  </div>
                </a-col>
                <a-col
                  :span="3"
                  class="table-td"
                  v-for="(sub, index) in weekData"
                  :key="index"
                  @click="handleAddOrEdit(item, index)"
                  :class="{'disabled':!item.status}"
                >
                  <div class="table-td__inner" v-show="item[index]">
                    {{ (item[index] && item[index].kcmc) || '-' }}
                    <div class="table-td__label">
                      {{ (item[index] && item[index].jsmc)}} - {{ (item[index] && item[index].jsxm)}}
                    </div>
                  </div>
                </a-col>
              </a-row>
              <a-row class="table-row">
                <a-col class="table-th" :span="24"> 午休 </a-col>
              </a-row>
              <a-row class="table-row table-row__body" v-for="item in scheduleNodeAfternoonData" :key="item.id">
                <a-col :span="3" class="table-td table-section">
                  <div class="table-td__inner">
                    {{ item.section }}
                    <div class="table-section__time">{{ item.kssj }}-{{ item.jssj }}</div>
                  </div>
                </a-col>
                <a-col
                  :span="3"
                  class="table-td"
                  v-for="(sub, index) in weekData"
                  :key="index"
                  @click="handleAddOrEdit(item, index)"
                  :class="{'disabled':!item.status}"
                >
                  <div class="table-td__inner" v-show="item[index]">
                    {{ (item[index] && item[index].kcmc) || '-' }}
                    <div class="table-td__label">
                      {{ (item[index] && item[index].jsmc) }} - {{ (item[index] && item[index].jsxm) }}
                    </div>
                  </div>
                </a-col>
              </a-row>
              <a-row class="table-row">
                <a-col class="table-th" :span="24"> 晚自习 </a-col>
              </a-row>
              <a-row class="table-row table-row__body" v-for="item in scheduleNodeNightData" :key="item.id">
                <a-col :span="3" class="table-td table-section">
                  <div class="table-td__inner">
                    {{ item.section }}
                    <div class="table-section__time">{{ item.kssj }}-{{ item.jssj }}</div>
                  </div>
                </a-col>
                <a-col
                  :span="3"
                  class="table-td"
                  v-for="(sub, index) in weekData"
                  :key="index"
                  @click="handleAddOrEdit(item, index)"
                  :class="{'disabled':!item.status}"
                >
                  <div class="table-td__inner" v-show="item[index]">
                    {{ (item[index] && item[index].kcmc) || '-' }}
                    <div class="table-td__label">
                      {{ (item[index] && item[index].jsmc)}} - {{ (item[index] && item[index].jsxm)}}
                    </div>
                  </div>
                </a-col>
              </a-row>
               </a-spin>
            </div>
          </div>
        </a-card>
      </a-col>
    </a-row>

    <select-model
      ref="selectModel"
      :week-data="weekData"
      :node-data="scheduleNodeData"
      :model="scheduleDetail"
      :is-add="isAdd"
      @cancel="handleCancel"
      @ok="handleOk"
      :visible="visible"
      v-if="visible"
    ></select-model>
  </div>
</template>

<script>
import moment from 'moment'
import selectModel from './modules/selectModel'
import '@/assets/scss/generalStyle.less'
import {
  getClassSchedule,
  addClassSchedule,
  updateClassSchedule,
  getClassScheduleDetail,
  removeClassDetail,
  getScheduleNodeList,
} from '@/api/schedule/classSchedule'
import {
  queryFacultyList,
  querySpecialtyListByFalId,
  queryBanJiListBySpecId,
  querySemesterList,
} from '@/api/base/common-veCommon'
import { childSycId } from '@/config'
export default {
  name: 'manual',
  components: {
    selectModel,
  },
  data() {
    return {
      // 树搜索条件
      keyword: '',
      //树数据
      treeData: [],

      // 学期数据
      semesterData: [],
      // 学期信息
      semsterInfo: {},
      // 学期id
      semesterId: undefined,
      // 院系列表
      facultyList: [],
      // 专业列表
      specisltyList: [],
      //班级列表
      classesList: [],
      // 班级信息
      classInfo: {},
      // 排课id
      pkId: null,
      //
      // 星期表格
      weekData: [
        { id: 1, weekName: '星期一', course: {} },
        { id: 2, weekName: '星期二', course: {} },
        { id: 3, weekName: '星期三', course: {} },
        { id: 4, weekName: '星期四', course: {} },
        { id: 5, weekName: '星期五', course: {} },
        { id: 6, weekName: '星期六', course: {} },
        { id: 7, weekName: '星期日', course: {} },
      ],

      // 排课节数据
      scheduleNodeData: [],
      // 排课节上午数据
      scheduleNodeMorningData: [],
      // 排课节下午数据
      scheduleNodeAfternoonData: [],
      // 排课节晚自习数据
      scheduleNodeNightData: [],

      // 排课课表数据
      scheduleData: [],

      // 排课课表明细数据
      scheduleDetail: [],

      // 弹框
      visible: false,

      // 是否是新增
      isAdd: false,
      loading:false
    }
  },
  created() {
    // 学期数据
    this.getSemesterList()
    // 学院数据
    this.getFacultyList()
    // 排课节
    this.getScheduleNodeList();
  },

  computed: {
    scheduleTitle() {
      return this.semesterId ? `${this.classInfo.name || ''}（${this.semsterInfo.xqmc}）排课` : '暂无排课'
    },
  },
  methods: {
    // 时间处理
    moment,
    // 获取学期数据
    getSemesterList() {
      querySemesterList(childSycId).then((res) => {
        if (res.code == 200) {
          this.semesterData = res.result
        }
      })
    },
	
    // 学期改变
    handleSemesterChange(val) {
      this.semsterInfo = this.semesterData.find((item) => item.id == val)
      console.log(this.semsterInfo)
      if (this.classInfo.sid) {
        this.getClassSchedule()
      }
    },
    // 获取院系列表
    getFacultyList() {
      let params = {
        id: childSycId,
      }
      queryFacultyList(params).then((res) => {
        if (res.code == 200) {
          this.facultyList = res.result
          this.treeData = res.result.map((item) => {
            return {
              name: item.yxmc,
              pid: 0,
              id: item.id,
              level: 1,
            }
          })
        }
      })
    },
    // 院系选中,获取专业列表
    getSpecialtyList(val) {
      let params = {
        id: childSycId,
        falId: val,
      }
      querySpecialtyListByFalId(params).then((res) => {
        if (res.code == 200) {
          this.specisltyList = res.result
          return res.result.map((item) => {
            return {
              name: item.zymc,
              pid: val,
              id: item.id,
              level: 2,
            }
          })
        } else {
          return []
        }
      })
    },
    // 专业选中,获取班级数据
    getBanjiList(val) {
      let params = {
        id: childSycId,
        specId: val,
      }
      queryBanJiListBySpecId(params).then((res) => {
        if (res.code == 200) {
          this.classesList = res.result
          return res.result.map((item) => {
            return {
              name: item.xzbmc,
              pid: val,
              id: item.id,
              level: 3,
            }
          })
        } else {
          return []
        }
      })
    },

    // 树异步加载下一级
    onLoadData(treeNode) {
      let node = treeNode.dataRef

      return new Promise((resolve) => {
        if (treeNode.dataRef.children) {
          resolve()
          return
        }
        if (node.level == 1) {
          let params = {
            id: childSycId,
            falId: node.id,
          }
          querySpecialtyListByFalId(params).then((res) => {
            if (res.code == 200) {
              this.specisltyList = res.result
              if (res.result.length) {
                treeNode.dataRef.children = res.result.map((item) => {
                  return {
                    name: item.zymc,
                    pid: item.falid,
                    id:  '2-' +item.id,
                    sid:item.id,
                    level: 2,
                  }
                })
              } else {
                treeNode.dataRef.children = []
                this.$message.warning('该学院暂无专业')
              }
              this.treeData = [...this.treeData]
              resolve()
            }
          })
        }

        if (node.level == 2) {
          let params = {
            id: childSycId,
            specId: node.sid,
          }
          queryBanJiListBySpecId(params).then((res) => {
            if (res.code == 200) {
              this.classesList = res.result
              if (res.result.length) {
                treeNode.dataRef.children = res.result.map((item) => {
                  let params = {
                    name: item.xzbmc,
                    pid: node.sid,
                    id: '3-' +item.id,
                    sid: item.id,
                    level: 3,
                    isLeaf: true,
                  }
                  return { ...item, ...params }
                })
              } else {
                treeNode.dataRef.children = []
                this.$message.warning('该专业暂无班级')
              }
              this.treeData = [...this.treeData]
              resolve()
            }
          })
        }
      })
    },

    // 树点击选择
    onTreeSelect(selectedKeys, e) {
      let id = selectedKeys[0]
      let nodeInfo = e.node.dataRef
      if (id) {
        if (nodeInfo.level == 3) {
           this.classInfo = nodeInfo
          console.log("xuanze",this.classInfo)
          if (!this.semesterId) {
            this.$message.warning('请先选择学期')
            return
          }

          this.getClassSchedule()
        }
      }
    },
    // 搜索树结构
    handleSearch() {},
    // 获取课表列表
    getClassSchedule() {
      let _this = this
      let params = {
        jxbid: this.classInfo.sid,
        semid: this.semesterId,
      }
      this.loading = true;
      this.getScheduleNodeList();
      getClassSchedule(params).then((res) => {
        if (res.code == 200) {
          this.scheduleData = res.result.records || []
          if (res.result.total) {
            // 默认排课详情
            this.pkId = res.result.records[0].id
            this.getClassScheduleDetail(this.pkId)
          } else {
            this.$message.warning({
              content: '该班级暂无排课信息,自动新增排课信息',
              duration: 2,
              onClose: () => {
                _this.handleAddClassSchedule()
              },
            })
          }
        }else{
           this.$message.warning(res.message)
        }
      })
    },
    // 新增排课信息
    handleAddClassSchedule() {
      const _this = this
      let params = {
        gradeid: this.classInfo.gradeId,
        jxbid: this.classInfo.sid,
        jxbmc: this.classInfo.name,
        kksmtid: 0,
        qsz: 0,
        semid: this.semesterId,
        terminalid: this.classInfo.terminalid,
        xknj: this.classInfo.rxnf,
        xqmc: '',
        zzz: 0,
      }
      addClassSchedule(params).then((res) => {
        if (res.code == 200) {
          this.$message.info({
            content: '自动新增排课信息成功',
            duration: 1,
            onClose: () => {
              _this.getClassSchedule()
            },
          })
        } else {
          this.$message.warning(res.message)
        }
      })
    },
    // 获取课表明细详情
    getClassScheduleDetail(id) {
      // this.loading = true;
      getClassScheduleDetail(id).then((res) => {
        if (res.code == 200) {
          let scheduleDetailData = res.result.records || []
          if (res.result.total) {
            scheduleDetailData.map((item) => {
              this.scheduleNodeData[item.section - 1][item.week - 1] = item
            })
          } else {
            this.$message.warning('该班级排课暂无明细')
          }
           this.setScheduleNodeData()
        }
      })
    },

    // 清空排课信息
    handleClearClass() {
      if (!this.pkId) {
        this.$message.warning('暂无可清空的排课')
        return
      }
      removeClassDetail(this.pkId).then((res) => {
        if (res.code == 200) {
          this.$message.info(res.result)
          this.getClassSchedule()
        } else {
          this.$message.warning(res.message)
        }

      })
    },

    // 获取排课节信息
    getScheduleNodeList() {
      // this.scheduleNodeData = []
      getScheduleNodeList().then((res) => {
        if (res.code == 200) {
          // res.result.records.forEach((item) => {
          //   this.$set(item, 'weekData', this.weekData)
          // })
          this.scheduleNodeData = res.result.records
          this.setScheduleNodeData()
        }
      })
    },
    // 设置排课节数据
    setScheduleNodeData() {
      this.scheduleNodeMorningData = this.scheduleNodeData.filter((item) => +item.jssj.split(':')[0] < 12)
      this.scheduleNodeAfternoonData = this.scheduleNodeData.filter(
        (item) => +item.jssj.split(':')[0] < 18 && +item.jssj.split(':')[0] > 12
      )
      this.scheduleNodeNightData = this.scheduleNodeData.filter((item) => +item.jssj.split(':')[0] > 18);
      this.loading = false
    },

    // 新增或编辑排课明细
    handleAddOrEdit(item, idx) {
		
      if(!item.status){
        return;
      }
      if (!this.semesterId) {
        this.$message.warning('请先选择学期')
        return
      }
      if (!this.classInfo.sid) {
        this.$message.warning('请先选择班级')
        return
      }
      if (!this.pkId) {
        this.$message.warning('该班级暂无排课')
        return
      }
      let otherParam = {
        pkid: this.pkId,
        jxbid: this.classInfo.sid,
        semid: this.semesterId,
        week: idx + 1,
        section: item.id,
        jsid:this.classInfo.jsid,
        buildId:this.classInfo.jzid,
        campusId:this.classInfo.campusId
      }
      this.scheduleDetail = item[idx] ? { ...item, ...otherParam, ...item[idx] } : { ...item, ...otherParam }
      console.log("+++++",this.scheduleDetail)
      this.isAdd = item[idx] ? false : true
      this.visible = true
    },
    // 弹框回调
    handleOk() {
      this.visible = false
      console.log('xxxxxx')
      this.getClassSchedule()
    },
    // 弹框取消
    handleCancel() {
      this.visible = false
    },
  },
}
</script>
<style scoped lang="less">
.tree-wrp {
  max-height: 937px;
  margin-top: 10px;
  overflow-y: auto;
}
.schedule {
  background-color: #fff;
  padding: 15px;
  .boxshadow {
    box-shadow: 0px 1px 8px 0px #e9edf6;
  }
  &-breadcrumb {
    padding-bottom: 15px;
  }
  &-left {
    &__search {
      display: flex;
      padding: 10px 0;
      .search-input {
        margin-right: 10px;
      }
    }
    &__form {
      display: flex;
      align-items: center;
      .form-label {
        padding-right: 10px;
      }
      .form-value {
        flex: 1;
      }
    }
  }
  &-right {
    margin-left: 15px;
  }
  &-main {
    &__title {
      font-size: 18px;
      text-align: center;
      padding: 15px 0;
    }
    &__table {
      text-align: center;
      .table-row {
        &__body {
          border-right: 1px solid #e6e6e6;
          border-bottom: 1px solid #e6e6e6;
        }
      }
      .table-th {
        background-color: #66c3fd;
        color: #fff;
        line-height: 30px;
      }

      .table-td {
        padding: 5px;
        min-height: 80px;
        border-left: 1px solid #e6e6e6;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        &.disabled{
          background-color: #f1f1f1;
          cursor:default
        }
        &__inner {
          width: 100%;
          height: 100%;
        }
        &__label {
          color: #fc620e;
          padding-top: 5px;
        }
      }
      .table-section {
        background-color: #f8f8f8;
        color: #666;

        &__time {
        }
      }
    }
  }
}
</style>