<template>
  <a-modal
    title="选择学生"
    :width="1000"
    placement="right"
    okText="确定选中"
    cancel-text="取消"
    @ok="
      () => {
        handleOk()
      }
    "
    @cancel="
      () => {
        handleCancel()
      }
    "
    :footer="null"
    :visible="visible"
  >
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="6" :sm="24">
            <a-form-item label="姓名">
              <a-input v-model="queryParam.xm" placeholder="请输入姓名" />
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label="学号">
              <a-input v-model="queryParam.xh" placeholder="请输入学号" />
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label="性别">
              <a-select v-model="queryParam.xbm" placeholder="请选择性别">
                <a-select-option :value="1">男生</a-select-option>
                <a-select-option :value="2">女生</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <template v-if="advanced">
            <a-col :md="6" :sm="24">
              <a-form-item label="入学年份">
                <a-month-picker v-model="queryParam.rxnf" placeholder="请选择入学年份" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="专业部">
                <a-select v-model="queryParam.falId" placeholder="请选择院系" @change="handleFacultyChange">
                  <a-select-option v-for="(item, index) in facultyList" :key="index" :value="item.id">{{
                    item.yxmc
                  }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="专业">
                <a-select v-model="queryParam.specId" placeholder="请选择专业" @change="handleSpecisltyChange">
                  <a-select-option v-for="(item, index) in specisltyList" :key="index" :value="item.id">{{
                    item.zymc
                  }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="班级">
                <a-select v-model="queryParam.bjId" placeholder="请选择班级">
                  <a-select-option v-for="(item, index) in classesList" :key="index" :value="item.id">{{
                    item.xzbmc
                  }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="就读方式">
                <a-select v-model="queryParam.jdfs" placeholder="请选择就读方式">
                  <a-select-option :value="1">住校</a-select-option>
                  <a-select-option :value="2">走读</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="学生状态">
                <a-select v-model="queryParam.xsdqztm" placeholder="请选择状态">
                  <a-select-option v-for="(item, index) in statusList" :key="index" :value="item.dictValue">{{
                    item.dictLabel
                  }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="民族">
                <a-select v-model="queryParam.mzm" placeholder="请选择民族">
                  <a-select-option v-for="(item, index) in mzmList" :key="index" :value="item">{{
                    item
                  }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="6" :sm="24">
            <span
              class="table-page-search-submitButtons"
              :style="(advanced && { float: 'right', overflow: 'hidden' }) || {}"
            >
              <a-button type="primary" @click="handleSearch">查询</a-button>
              <a-button style="margin-left: 8px" @click="handleReset">重置</a-button>
              <a @click="toggleAdvanced" style="margin-left: 8px">
                {{ advanced ? '收起' : '展开' }}
                <a-icon :type="advanced ? 'up' : 'down'" />
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <g-table
      ref="table"
      rowKey="id"
      :columns="columns"
      :data="loadData"
      showPagination="auto"
      :row-selection="rowSelection"
      :scroll="{ x: 1100 }"
    >
      <div slot="rxnfName" slot-scope="text">
        {{ text | rxnfNameFilter }}
      </div>
      <div slot="falName" slot-scope="text">
        {{ text | falNameFilter }}
      </div>
      <div slot="specName" slot-scope="text">
        {{ text | specNameFilter }}
      </div>
      <div slot="bjName" slot-scope="text">
        {{ text | bjNameFilter }}
      </div>
      <!-- <div slot="status" slot-scope="text">
        {{ text | statusFilter(statusList) }}
      </div> -->
       <div slot="createTime" slot-scope="text">
        {{ text | createTimeFilter }}
      </div>
      <span slot="action" slot-scope="text, record" v-if="!multiple">
        <a @click="handleSelect(record)" style="color: #17c295">选择</a>
      </span>
    </g-table>
    <div class="ant-modal-footer" v-if="multiple">
      <a-button @click="handleCancel"> 取消 </a-button>
      <a-button type="primary" :loading="loading" @click="handleOk"> 确定选中 </a-button>
    </div>
  </a-modal>
</template>

<script>
import moment from 'moment'
import GTable from '@/components/GTable'
import { childSycId } from '@/config'
import { queryFacultyList, querySpecialtyListByFalId, queryBanJiListBySpecId } from '@/api/base/common-veCommon'
import { getStudentPageList } from '@/api/base/common-veCommon'

export default {
  name: 'studentTableList',
  props: {
    multiple: {
      type: Boolean,
      default: false,
    },
    semesterData: {
      type: Array,
      default: () => {
        return []
      },
    },
    visible: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    GTable,
  },
  data() {
    const _this = this
    return {
      // 高级搜索 展开/关闭
      advanced: false,

      columns: [
        {
          title: '入学年份',
          width: 120,
          dataIndex: 'rxnf',
          key: 'rxnf',
          scopedSlots: {
            customRender: 'rxnfName',
          },
        },
        {
          title: '院系',
          dataIndex: 'fal_id',
          width: 150,
          // scopedSlots: {
          //   customRender: 'falName',
          // },
        },
        {
          title: '专业',
          dataIndex: 'spec_id',
          width: 150,
          // scopedSlots: {
          //   customRender: 'specName',
          // },
        },
        {
          title: '班级',
          dataIndex: 'bj_id',
          width: 120,
          // scopedSlots: {
          //   customRender: 'bjName',
          // },
        },
        {
          title: '姓名',
          width: 100,
          dataIndex: 'xm',
          key: 'xm',
        },
        {
          title: '学号',
          width: 160,
          dataIndex: 'xh',
          key: 'xh',
        },
        {
          title: '性别',
          dataIndex: 'xbm',
          width: 80,
          customRender: (text) => (text == 1 ? '男' : '女'),
        },
        {
          title: '身份证号',
          dataIndex: 'sfzh',
          key: 'sfzh',
          width: 200,
        },
        {
          title: '就读方式',
          dataIndex: 'jdfs',
          key: 'jdfs',
          width: 100,
          customRender: (text) => (text == 1 ? '住校' : '走读'),
        },
         {
          title: '民族',
          dataIndex: 'mzm',
          key: 'mzm',
          width: 80,
        },
         {
          title: '创建时间',
          dataIndex: 'createTime',
          key: 'createTime',
          width: 200,
           scopedSlots: {
            customRender: 'createTime',
          },
        },
        // {
        //   title: '当前状态',
        //   dataIndex: 'xsdqztm',
        //   key: 'xsdqztm',
        //   width: 100,
        //   scopedSlots: {
        //     customRender: 'status',
        //   },
        // },
        !_this.multiple
          ? {
              title: '操作',
              dataIndex: 'action',
              width: 80,
              fixed: 'right',
              scopedSlots: {
                customRender: 'action',
              },
            }
          : {},
      ],

      // 查询参数
      queryParam: {
        xm: '', //姓名
        xh: '', //学号
        xsdqztm: undefined, //学生当前状态码
        jdfs: undefined, //就读方式
        sfkns: undefined, //困难学生
        xbm: undefined, //性别
        rxny: undefined, //学期 入学年份
        falId: undefined, //院系
        specId: undefined, //专业
        bjId: undefined, //班级
      },
      // 加载数据方法 必须为 Promise 对象
      loadData: (parameter) => {
        let params = { ...parameter, ...this.queryParam }
        return getStudentPageList(params).then((res) => {
          return res.result
        })
      },
      selectedRowKeys: [],
      selectedRows: [],

      // 院系列表
      facultyList: [],
      // 专业列表
      specisltyList: [],
      //班级列表
      classesList: [],

      // 当前状态
      statusList: [
        {
          dictValue: 'XS',
          dictLabel: '新生',
        },
        {
          dictValue: 'ZX',
          dictLabel: '在校',
        },
        {
          dictValue: 'XX',
          dictLabel: '休学',
        },
        {
          dictValue: 'TX',
          dictLabel: '退学',
        },
        {
          dictValue: 'KC',
          dictLabel: '开除',
        },
        {
          dictValue: 'BY',
          dictLabel: '毕业',
        },
        {
          dictValue: 'YY',
          dictLabel: '肄业',
        },
        {
          dictValue: 'ZXX',
          dictLabel: '转学',
        },
        {
          dictValue: 'JY',
          dictLabel: '结业',
        },
      ],
      mzmList:['汉族','满族','蒙古族','回族','藏族','维吾尔族','苗族','彝族','壮族','布依族','侗族','瑶族','白族','土家族','哈尼族','哈萨克族','傣族','黎族','傈僳族','佤族','畲族','高山族','拉祜族','水族','东乡族','纳西族','景颇族','柯尔克孜族','土族','其他','外国血统中国籍人士']
    }
  },
  filters: {
    rxnfNameFilter(val) {
      return moment(val).format('YYYY-MM')
    },
    createTimeFilter(val) {
      return moment(val).format('YYYY-MM-DD hh:mm:ss')
    },
    falNameFilter(val, list) {
      let _obj = list.find((item) => item.id == val)
      return _obj ? _obj.xqmc : '-'
    },
    specNameFilter(val, list) {
      let _obj = list.find((item) => item.id == val)
      return _obj ? _obj.xqmc : '-'
    },
    bjNameFilter(val, list) {
      let _obj = list.find((item) => item.id == val)
      return _obj ? _obj.xqmc : '-'
    },
    statusFilter(val) {
      //   let _obj = list.find((item) => item.id == val)
      //   return _obj ? _obj.xqmc : '-'
      return val
    },
  },
  created() {
    this.getFacultyList()
  },
  computed: {
    rowSelection() {
      return this.multiple
        ? {
            selectedRowKeys: this.selectedRowKeys,
            onChange: this.onSelectChange,
          }
        : null
    },
  },
  methods: {
    // 弹框回调
    handleCancel() {
      this.$emit('cancel')
    },
    handleOk() {
      this.$emit('ok',this.selectedRowKeys)
    },
    //  表格选中
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    //单个选择
    handleSelect(record) {
      this.$emit('select', record.xm)
      this.handleCancel()
    },

    // 展开收起
    toggleAdvanced() {
      this.advanced = !this.advanced
    },
    //搜索
    handleSearch() {
      this.$refs.table.refresh(true)
    },
    // 重置
    handleReset() {
      this.queryParam = {}
    },

    // 获取院系列表
    getFacultyList() {
      let params = {
        id: childSycId,
      }
      queryFacultyList(params).then((res) => {
        if (res.code == 200) {
          this.facultyList = res.result
        }
      })
    },

    // 院系选中
    handleFacultyChange(val) {
      let params = {
        id: childSycId,
        falId: val,
      }
      querySpecialtyListByFalId(params).then((res) => {
        if (res.code == 200) {
          this.specisltyList = res.result
        }
      })
    },
    // 专业选中
    handleSpecisltyChange(val) {
      let params = {
        id: childSycId,
        specId: val,
      }
      queryBanJiListBySpecId(params).then((res) => {
        if (res.code == 200) {
          this.classesList = res.result
        }
      })
    },
  },
}
</script>
