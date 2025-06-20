<template>
  <a-card :bordered="false">
<!--    <div>-->
<!--      <p style="font-weight: bold;color: #999999;font-size: 18px">学生选课时间</p>-->
<!--    </div>-->

    <g-tools :fields="toolsFields"/>
    <!-- <g-export :api="exportXls()" :params="form"></g-export> -->
    <!-- <div style="display: inline-block;margin-bottom: 20px">
      <a-button @click="addition({})" style="color: #FFFFFF;background-color: #00BAD0;margin-right: 15px">
        <IconFont style="font-weight: bold;" type="iconjiahao" />
        添加
      </a-button>
      <a-button style="color: #FFFFFF;background-color: #00D09D;margin-right: 15px">
        <IconFont style="font-weight: bold;" type="icondaochu" />
        导出
      </a-button>
      <a-button @click="recycle" style="color: #FFFFFF;background-color: #F88600;margin-right: 15px">
        <IconFont style="font-weight: bold;font-size: 18px" type="iconhuishouzhanx" />
        回收站
      </a-button>

      <a-dropdown style="background-color: #028BE2;color: #FFFFFF;margin-right: 15px">
        <a-menu slot="overlay" @click="handleMenuClick">
          <a-menu-item key="1">
            <IconFont type="iconkaiguankai" />
            选中启用
          </a-menu-item>
          <a-menu-item key="2">
            <IconFont type="iconkaiguanguan" />
            选中禁用
          </a-menu-item>
          <a-menu-item key="3">
            <IconFont type="icondaochu" />
            选中导出
          </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">批量操作<a-icon type="down" /> </a-button>
      </a-dropdown>

      <a-button style="color: #FFFFFF;background-color: #F88600;margin-right: 15px">
        <IconFont style="font-weight: bold;" type="iconshanchu" />
        删除
      </a-button>
      <a-button style="color: #FFFFFF;background-color: #66C3FD;">
        <IconFont style="font-weight: bold;" type="iconshuaxin" />
        刷新
      </a-button>
    </div>

    <div style="display: inline-block;margin-bottom: 20px;float: right">
      <a-button @click.native="openSearch" style="color: #FFFFFF;background-color: #00BAD0;margin-right: 15px">
        <IconFont style="font-weight: bold;" type="iconshaixuan" />
        筛选
      </a-button>
      <a-input @click="selectStudent" style="width: 160px"/>
      <a-button style="color: #FFFFFF;background-color: #028BE2;margin-right: 15px">
        <IconFont style="font-weight: bold;" type="iconsousuo" />
        搜索
      </a-button>
      <a-button style="color: #FFFFFF;background-color: #F88600;margin-right: 15px">
        <IconFont style="font-weight: bold;" type="iconshanchu" />
        清空
      </a-button>
    </div> -->
    <g-table
      ref="table"
      size="default"
      rowKey="id"
      :columns="columns"
      :data="loadList"
      :rowSelection="rowSelection"
      showPagination="auto"
      :scroll="{ x: 1500 }"
    >
      <span slot="action" slot-scope="text, record">
      <!-- <zm-switch :defaultChecked="!!text" @change=""></zm-switch> -->
           <a-switch :defaultChecked="!!text" default-checked @change="(checked)=>onChange(record,checked)"/>
        </span>
        <span slot="actionS" slot-scope="text, record">
          <a @click="onDetail(record)" style="color:#17C295">查看</a>
          <a-divider type="vertical"/>
          <a @click="addition(record)" style="color:#0098F8">编辑</a>
          <a-divider type="vertical"/>
          <a style="color:#FC8950" @click="singleDel(record)">删除</a>
        </span>
    </g-table>
    <add-model v-model="showAdd" v-if="showAdd" @after-save="afterAdd" :obj="addXzObj"></add-model>
    <!-- <examine-model ref="examineModel"></examine-model>
    <recycle-model ref="recycleModel"></recycle-model>
    <screen-model ref="screenModel"></screen-model> -->
    <search-form v-model="showSearch" :form="form" @clear="clearSearch" @search="refreshTable"></search-form>
  <select-model
      ref="selectModel"
      :visible="studentVisible"
      v-if="studentVisible"
      @cancel="handleSelectCancel"
      @ok="handleSelectOk"
      @select="handleSelectItem"
    ></select-model>
    <TrashModal v-model="showRecycle" v-if="showRecycle"></TrashModal>
  </a-card>
</template>
<script>
import { IconFont } from '@/cas/ico'
import selectModel from '@/views/jwManage/curriculas/components/selectModel'
import GTools from '@/components/GTools'
import addModel from '@/views/jwManage/curriculas/restrict/modules/addModel'
import examineModel from '@/views/jwManage/curriculas/restrict/modules/examineModel'
import screenModel from '@/views/jwManage/curriculas/restrict/modules/screenModel'
import recycleModel from '@/views/jwManage/curriculas/restrict/modules/recycleModel'
import { columns } from './const'
import apiScheduleClassChoiceXkxz from '@/api/schedule/classChoice-xkxz'
import GTable from '@/components/GTable/'
import ZmSwitch from '@/components/switch/index.vue'
import SearchForm from './components/searchForm.vue'
import {searchParams} from './const'
import GExport from '@/views/jwManage/curriculas/restrict/components/GExport'
import TrashModal from './modules/trashModal.vue'
import exportXls from '@/utils/exportXls'
export default {
  data() {
    const _t = this
    return {
      showAdd:false,
      showRecycle:false,
      data: [],
      columns: columns(this),
      loading: false,
      addXzObj:{},
      showSelectStudent:false,
      showSearch:false,
      studentVisible:false,
      selectedRowKeys: [], //列表选择key
      selectedRows: [], //列表选择数据
      toolsFields: [
        { fieldType: 'button', label: '添加', icon: 'plus', type: 'primary', handler: ()=>_t.addition({}) },
        { fieldType: 'button', label: '导出', icon: 'export', type: 'success', handler: _t.export },
        { fieldType: 'button', label: '回收站', icon: 'reset', type: 'warning', handler: _t.recycle },
        {
          fieldType: 'menus',
          label: '批量操作',
          type: 'primary',
          children: [{ label: '选中启用' }, { label: '选中禁用' }, { label: '选中导出' }],
          handler: _t.onClickMenus,
        },
        { fieldType: 'button', label: '删除', icon: 'delete', type: 'danger', handler: _t.del },
        { fieldType: 'button', label: '刷新', icon: 'sync', type: 'primary', handler: _t.refreshTable },
        { fieldType: 'button', label: '筛选', icon: 'filter', type: 'warning', placement: 'right', handler: _t.screen },
        {
          placement: 'right',
          render(h) {

            return (
              <a-input style="width:160px;margin-left:10px;" onClick={_t.handleSelect} value={_t.form.stuname} placeholder="请输入学生姓名" />
            )
          },
        },
        { fieldType: 'button', label: '搜索', icon: 'plus', placement: 'right', type: 'primary', handler: _t.search },
        { fieldType: 'button', label: '清空', icon: 'plus', placement: 'right', type: 'primary', handler: _t.clear },
      ],
      form: {...searchParams()}
    }
  },
  async created() {
    // await this.getSemesterList()
    this.loadList()
  },
  components: {
    IconFont,
    addModel,
    examineModel,
    screenModel,
    recycleModel,
    GTable,
    ZmSwitch,
    GTools,
    SearchForm,
    selectModel,
    GExport,
    TrashModal
  },
  computed: {
    rowSelection() {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange,
      }
    },
  },
  methods: {
    loadList(parameter) {
      return apiScheduleClassChoiceXkxz
        .getPageList({
           ...parameter,
         ...this.form
        })
        .then(({result}) => {
         return result
        })
    },
    handleMenuClick(e) {
      console.log('click', e)
    },
    async onChange(record,checked,isMultiple=false) {
      const params = {ids:isMultiple?this.selectedRowKeys.join(','):record.id}
      if(checked){
        await apiScheduleClassChoiceXkxz.setValidStatus(params)
      }else{
        await apiScheduleClassChoiceXkxz.setInvalidStatus(params)
      }
      this.$refs.table.refresh(false)
      this.$message.success('操作成功!')
      console.log(`a-switch to ${checked}`)
    },
    addition(item) {
      this.addXzObj = item
      this.showAdd = true
    },
    onDetail(item){},
    export(){
      const field = this.columns
        .map((o) => o.dataIndex)
        .filter((o) => o)
        .join(',')
      const { current, pageSize } = this.$refs.table.localPagination
      const params = { current, pageSize, ...this.form }

      // 导出
      exportXls({
        url: '/edu-schedule/classChoise/veJwXkxz/exportXls',
        params: params,
        field: field,
      })
    },
    recycle(){
      this.showRecycle = true
    },
    onClickMenus(e){
      if(this.selectedRowKeys.length){
        if(e.key==='item_0'){
          this.onChange({},true,true)
        }
        if(e.key==='item_1'){
          this.onChange({},false,true)
        }
        if(e.key==='item_2'){
          console.log('批量导出没做')
        }
      }
    },
    exportXls(){
      return apiScheduleClassChoiceXkxz.exportXls
    },
    async del(){
      if(this.selectedRowKeys.length){
      this.$confirm({
        title: '系统提示',
        content: '确认删除？',
        onOk:async()=>{
            await apiScheduleClassChoiceXkxz.batchDeleteByStatus({ids:this.selectedRowKeys.join(',')})
            this.$message.success('操作成功!')
            this.refreshTable()
        },
        onCancel() {},
      });
      }else{
        this.$message.warning('请选择记录!')
      }

    },
    singleDel(item){
       this.$confirm({
        title: '系统提示',
        content: '确认删除？',
        onOk:async()=>{
            await apiScheduleClassChoiceXkxz.batchDeleteByStatus({ids:item.id})
          this.$message.success('操作成功!')
          this.refreshTable()
        },
        onCancel() {},
      });

    },
    screen(){
      this.showSearch=true
    },
    clear(){},
    afterAdd(){
      this.addXzObj={}
      this.refreshTable()
    },
    refreshTable(){
      this.$refs.table.refresh(true)
    },
    selectStudent(){
      this.showSelectStudent = true
    },
    clearSearch(){
      this.form={...searchParams()}
      this.refreshTable()
    },
    // 记录选择
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
          // 筛选回调
    handleSelectOk(val) {
      this.studentVisible = false;

    },
    // 筛选取消
    handleSelectCancel() {
      this.studentVisible = false
    },

    handleSelect() {
      this.studentVisible = true
    },

    // 选中
    handleSelectItem(name){
      this.form.stuname = name;
    },
  }
}
</script>
<style scoped></style>
