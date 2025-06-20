<template>
  <div class="schedule">

    <a-breadcrumb v-show="false" separator=">" class="schedule-breadcrumb">
      <a-breadcrumb-item>排课管理</a-breadcrumb-item>
      <a-breadcrumb-item>教室不排课时间</a-breadcrumb-item>
    </a-breadcrumb>
    <a-row>
      <a-col class="schedule-left boxshadow" :span="6">
        <a-card :bordered="false" size="small">
          <div class="tree-wrp">
            <a-directory-tree
              :replace-fields="{ title: 'name', key: 'id' }"
              :tree-data="treeData"
              :load-data="onLoadData"
              default-expand-all
              @select="onTreeSelect"
              @expand="onTreeExpand"
            />
          </div>
        </a-card>
      </a-col>
      <a-col :span="18">
        <a-card :bordered="false" size="small" class="schedule-right boxshadow">
          <div class="schedule-opt">
            <a-button type="primary" @click="handleSave">保存</a-button>
            <a-button type="primary" @click="handleRefresh">刷新</a-button>
          </div>
          <div class="schedule-main">
            <div class="schedule-main__table">
              <a-row class="table-row">
                <a-col class="table-th" :span="3">节次/星期</a-col>
                <a-col class="table-th" :span="3" v-for="(item, index) in weekData" :key="index">
                  {{ item.weekName }}
                </a-col>
              </a-row>
              <a-spin :spinning="loading">
                <a-checkbox-group v-model="noScheduleIds" class="checkbox-group" @change="handleChangeCheckbox">
                  <a-row class="table-row table-row__body" v-for="item in scheduleNodeData" :key="item.id">
                    <a-col :span="3" class="table-td table-section">
                      <div class="table-td__inner">
                        {{ item.section }}
                        <!-- <div class="table-section__time">{{ item.kssj }}-{{ item.jssj }}</div> -->
                      </div>
                    </a-col>
                    <a-col
                      :span="3"
                      class="table-td"
                      v-for="(sub, index) in weekData"
                      :key="index"
                      :class="{ disabled: !item.status }"
                    >
                      <div class="table-td__inner">
                        <a-checkbox :value="sub.id + '-' + item.id"></a-checkbox>
                      </div>
                    </a-col>
                  </a-row>
                </a-checkbox-group>
              </a-spin>
            </div>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import '@/assets/scss/generalStyle.less'
import { queryCampusList } from '@/api/base/common-veCommon'
import { queryBuildListByCampusId, getClassRoomList } from '@/api/schedule/pub'
import {
  getClassroomNoScheduleList,
  setNoScheduleForRoom,
  setNoScheduleAdd,
  setNoScheduleDelete,
  getScheduleNodeList,
} from '@/api/schedule/classSchedule'
import { childSycId } from '@/config'
import moment from 'moment'
export default {
  name: 'no-shedule-classroom',
  data() {
    return {
      treeData: [],
      classroomId: null,
      terminalid: null,
      // 星期表格
      weekData: [
        { id: 1, weekName: '星期一', checked: [] },
        { id: 2, weekName: '星期二', checked: [] },
        { id: 3, weekName: '星期三', checked: [] },
        { id: 4, weekName: '星期四', checked: [] },
        { id: 5, weekName: '星期五', checked: [] },
        { id: 6, weekName: '星期六', checked: [] },
        { id: 7, weekName: '星期日', checked: [] },
      ],

      // 排课节数据
      scheduleNodeData: [],

      // 不开课ids
      noScheduleIds: [],
      loading: false,
    }
  },
  created() {
    this.getCampusList()
    this.getScheduleNodeList()
  },
  methods: {
    // 获取校区
    getCampusList() {
      queryCampusList().then((res) => {
        if (res.code == 200) {
          this.treeData = res.result.map((item) => {
            return {
              name: item.xqmc,
              pid: 0,
              id: item.id,
              level: 1,
              terminalid: item.terminalid,
            }
          })
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
          queryBuildListByCampusId(node.id).then((res) => {
            if (res.code == 200) {
              if (res.result.total) {
                treeNode.dataRef.children = res.result.records.map((item) => {
                  return {
                    name: item.jzwmc,
                    pid: node.id,
                    id: '2-' + item.id,
                    sid: item.id,
                    level: 2,
                  }
                })
              } else {
                treeNode.dataRef.children = []
                this.$message.warning('该校区暂无教学楼')
              }
              this.treeData = [...this.treeData]
              resolve()
            }
          })
        }

        if (node.level == 2) {
          let params = {
            campusid: node.pid,
            jzid: node.sid,
          }
          getClassRoomList(params).then((res) => {
            if (res.code == 200) {
              if (res.result.total) {
                treeNode.dataRef.children = res.result.records.map((item) => {
                  let params = {
                    name: item.jsmc,
                    pid: node.sid,
                    id: '3-' + node.sid + '-' + item.id,
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
          this.classroomId = nodeInfo.sid
          this.getClassroomNoScheduleList(nodeInfo.sid)
        }
      }
    },
    onTreeExpand(selectedKeys, e) {
      let nodeInfo = e.node.dataRef
      if (nodeInfo.level == 1) {
        this.terminalid = nodeInfo.terminalid
      }
    },
    // 获取排课节信息
    getScheduleNodeList() {
      getScheduleNodeList().then((res) => {
        if (res.code == 200) {
          this.scheduleNodeData = res.result.records || []
        }
      })
    },

    // 获取不排课数据
    getClassroomNoScheduleList(classroomid) {
      let params = {
        classroomid,
      }
      this.loading = true
      getClassroomNoScheduleList(params).then((res) => {
        if (res.code == 200) {
          this.noScheduleIds = []
          if (res.result.total) {
            res.result.records.forEach((item) => {
              this.noScheduleIds.push(item.week + '-' + item.section)
            })
          }
        }
        this.loading = false
      })
    },

    handleChangeCheckbox(values) {
      if (!this.classroomId) {
        this.noScheduleIds = []
        this.$message.warning('请选择班级')
        return
      }
    },
    // 不上课时间 保存
    handleSave() {
      if (!this.classroomId) {
        this.noScheduleIds = []
        this.$message.warning('请选择班级')
        return
      }
      // if (!this.noScheduleIds.length) {
      //   this.$message.warning('请选择')
      //   return
      // }
      this.loading = true
      let arr = []
      this.noScheduleIds.map((item) => {
        let split = item.split('-')
        arr.push({
          terminalid: this.terminalid,
          week: split[0],
          section: split[1],
          classroomid: this.classroomId,
        })
      })

      // if (arr.length) {
      setNoScheduleForRoom(this.classroomId, arr).then((res) => {
        if (res.code == 200) {
          this.$message.success('保存成功')
        } else {
          this.$message.warning('失败')
        }
        this.loading = false
      })
      // }
    },

    // 刷新
    handleRefresh() {
      if (!this.classroomId) {
        this.noScheduleIds = []
        this.$message.warning('请选择班级')
        return
      }

      this.getClassroomNoScheduleList(this.classroomId)
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
    padding-top: 15px;
    &__title {
      font-size: 18px;
      text-align: center;
      padding: 15px 0;
    }
    &__table {
      text-align: center;
      .checkbox-group {
        width: 100%;
      }
      .table-row {
        &__body {
          &:nth-child(2n + 1) {
            background-color: #f4f7f9;
          }
        }
      }
      .table-th {
        background-color: #66c3fd;
        color: #fff;
        line-height: 30px;
      }

      .table-td {
        padding: 5px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
    }
  }
}
</style>