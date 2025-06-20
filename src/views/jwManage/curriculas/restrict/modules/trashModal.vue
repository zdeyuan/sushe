<template>
  <a-card :bordered="false">
    <a-modal title="回收站" :width="width" placement="right" @cancel="onCancel" @ok="submit" :visible.sync="value">
     <g-tools :fields="isDelTools"/>
     <g-table
      ref="table"
      size="default"
      rowKey="id"
      :columns="columns"
      :data="loadList"
      :rowSelection="rowSelection"
      showPagination="auto"
      :scroll="{ x: 1000 }"
    >
      <span slot="action" slot-scope="text">
        {{!!text?'是':'否'}}
        </span>
        <span slot="actionS" slot-scope="text, record">
          <a @click="onDetail(record)" style="color:#17C295">查看</a>
          <a-divider type="vertical"/>
          <a @click="batchHandler('batchDel',record.id)" style="color:#0098F8">销毁</a>
          <a-divider type="vertical"/>
          <a style="color:#FC8950" @click="batchHandler('batchReverseByStatus',record.id)">还原</a>
        </span>
    </g-table>
    </a-modal>
  </a-card>
</template>
<script>
import selectModel from '@/views/jwManage/curriculas/components/selectModel'
import apiScheduleClassChoiceXkxz from '@/api/schedule/classChoice-xkxz'
import GTable from '@/components/GTable/'
import GTools from '@/components/GTools'
import modalMixin from '@/mixins/modalMixin'
import {columns} from '../const'
export default {
  name: 'TrashModal',
  components: {
    selectModel,
    GTable,
    GTools
  },
  mixins: [modalMixin],
  data() {
    const _t = this
    return {
      width: 800,
      selectedRowKeys:[],
      columns:columns(this),
      form:{
        stuname:'',
        isdelete:1,
      },
      isDelTools: [
        { fieldType: 'button', label: '销毁', icon: 'plus', type: 'warning', handler: ()=>{_t.batchHandler('bacthDel')} },
        { fieldType: 'button', label: '还原', icon: 'plus', type: 'success', handler: ()=>{_t.batchHandler('batchReverseByStatus') }},
        { fieldType: 'button', label: '刷新', icon: 'sync', type: 'primary', handler: _t.refreshTable },
        {
          placement: 'right',
          render(h) {
           
            return (
              <a-input style="width:160px;margin-left:10px;" value={_t.form.msname} placeholder="请输入学生姓名" />
            )
          },
        },
        { fieldType: 'button', label: '搜索', icon: 'plus', placement: 'right', type: 'primary', handler: _t.refreshTable },
        { fieldType: 'button', label: '清空', icon: 'plus', placement: 'right', type: 'warning', handler: _t.onClear },
      ],
    }
  },
  computed:{
    rowSelection() {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange,
      }
    },
  },
  async created() {
    
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
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    async submit() {
      let _valid = false
      this.$refs.form.validate(valid => {
        _valid = valid
      })
      if (!_valid) false
      
      this.$message.success('操作成功!')
      this.$emit('after-save')
      this.close()
    },
    async batchHandler(id,apiType){
      let ids = ''
      if(id){
        ids = id
      }else if(!this.selectedRowKeys.length){
        return this.$message.warning('请选择记录!')
      }else{
        ids = this.selectedRowKeys.join(',')
      }
      await apiScheduleClassChoiceXkxz[apiType]({ids})
      this.refreshTable(true)
      this.$message.success('操作成功!')
    },
    refreshTable(){
      this.$refs.table.refresh(true)
    },
    onClear(){
      this.form.msname = ''
      this.refreshTable(true)
    }
  }
}
</script>
<style scoped></style>
