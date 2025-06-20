<template>
  <a-modal
    :title="title"
    :width="width"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
    @ok="handleOk"
    cancelText="关闭"
  >
    <a-spin :spinning="confirmLoading">

      <div class="basic">
        <div class="title">
          <span>基本信息</span>
        </div>
        <table>
          <tbody>
          <tr>
            <th>教学班</th>
            <td v-text="jxrw.jxbid_dictText">班级名称</td>
            <th>执行学期</th>
            <td v-text="jxrw.semester">执行学期</td>
          </tr>
          <tr>
            <th>年级</th>
            <td v-text="jxrw.gradeidName">年级</td>
            <th>授课教师</th>
            <td v-text="jxrw.teachername">教师名称</td>
          </tr>
          <tr>
            <th>课程名称</th>
            <td v-text="jxrw.kcid_dictText">课程名称</td>
            <th>总学时</th>
            <td v-text="jxrw.zxs">学时</td>
          </tr>
          <tr>
            <th>使用教材</th>
            <td colspan="3" v-text="jxrw.jcid_dictText">使用教材</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="plan" v-if="!isCopy">
        <div class="title">授课计划</div>
        <div class="content">
          <table>
            <tbody>
            <tr>
              <th style="width: 100px;">学时</th>
              <th>授课内容</th>
            </tr>
            <tr v-for="item in skjhList">
              <th>{{item.xueshi}}</th>
              <td>
                <a-input v-model="item.content" type="textarea" :disabled="true" style="resize:none;" autoSize/>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="plan" v-if="isCopy">
        <div class="title">复制到其他教学任务</div>
        <div class="content">
          <a-table
            size="middle"
            rowKey="id"
            :rowSelection="{ fixed: true, selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
            :columns="columns"
            :data-source="list"
            :pagination="false"
            :scroll="{ y: 300 }"
          />
        </div>
      </div>

    </a-spin>
  </a-modal>
</template>

<script>
import { httpAction } from '@/api/common/manage'
import { EduUtils } from '@/mixins/EduUtils'
import pick from 'lodash.pick'
import { validateDuplicateValue } from '@/utils/util'
import JSelectTeacher from '@/components/kwglbiz/JSelectTeacher'
import JSelectBanji from '@/components/kwglbiz/JSelectBanji'
import JSelectJiaoxueKecheng from '@/components/kwglbiz/JSelectJiaoxueKecheng'
import JSelectXueqi from '@/components/kwglbiz/JSelectXueqi'
import {  getActionForBase } from '@/api/common/manage'
import { getAction, postAction } from '@/api/common/manage'

export default {
  name: 'VeJwSkjhModal',
  mixins: [EduUtils],
  components: { JSelectJiaoxueKecheng, JSelectBanji, JSelectTeacher,JSelectXueqi,JSelectTeacher },
  data() {
    return {
      semesters:[],
      form: this.$form.createForm(this),
      title: '操作',
      width: 900,
      visible: false,
      model: {},
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
      confirmLoading: false,
      url: {
        add: '/jxgz/veJwSkjh/add',
        edit: '/jxgz/veJwSkjh/edit',
        detailList: '/jxgz/veJwSkjhmx/detailList/',
        // 获取可复制列表
        getList: '/jxrw/veJwJxrw/copy/list',
        // 复制
        copy: '/jxgz/veJwSkjh/copy',
      },
      // 教学任务信息
      jxrw: null,
      // 授课计划信息
      skjhList:[],
      // 年级
      gradeList: [],
      // 是否复制
      isCopy: false,
      // 可复制教学任务列表
      list: [],
      // 列表展示
      columns: [
        {
          title: '课程',
          align: 'center',
          dataIndex: 'jcid_dictText',
        },
        {
          title: '总学时',
          align: 'center',
          dataIndex: 'zxs',
        },
        {
          title: '教学班',
          align: 'center',
          dataIndex: 'jxbid_dictText',
        },
        {
          title: '学期',
          align: 'center',
          dataIndex: 'semester',
        },
        {
          title: '课程分类',
          align: 'center',
          dataIndex: 'kcflm_dictText',
        },
        {
          title: '课程属性',
          align: 'center',
          dataIndex: 'type_dictText',
        }
      ],
      selectedRowKeys: [],
    }
  },
  created() {
    this.getSemesters();
    this.getActionGradeList();
  },
  methods: {
    // 获取可复制列表
    getList(id){
      getAction(this.url.getList, {"jxrwId" : id}).then((res)=>{
        if(res.success){
          this.list = res.result.records;
        }
      });
    },
    // 展示
    detail(record){
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.jxrw = record;
      console.log(record)
      // 获取授课计划详情列表
      this.getSkjhmxList(record.id);
    },
    // 获取授课计划详情列表
    getSkjhmxList(jxrweId){
      console.log(this.url)
      let url = this.url.detailList + jxrweId;
      getAction(url).then((res)=>{
        if(res.success){
          this.skjhList = res.result;
        }
        // 如果未制定过授课计划，则报错
        else {
          this.$message.warning(res.message);
        }
      });
    },
    close() {
      this.$emit('close')
      this.visible = false
    },
    handleOk(){
      // 如果不是复制
      if(!this.isCopy){
        this.close();
        return ;
      }
      let url = this.url.copy;
      this.confirmLoading = true;
      postAction(url, { 'jxrwId': this.jxrw.id, 'copyIdList': this.selectedRowKeys }).then((res)=>{
        if(res.success){
          this.$message.success(res.message)
        }else {
          this.$message.warning(res.message)
        }
      }).finally(() => {
        this.confirmLoading = false
        this.close()
      })
    },
    handleCancel() {
      this.close()
    },
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
  },
}
</script>
<style scoped lang="less">
  
  table{
    width: 100%;
    th,td{
      padding: 5px;
      border: 1px solid #ddd;
    }
    th{
      background-color: #f0f0f0;
    }
  }
  .title{
    height: 40px;
    background-color: #66c3fe;
    padding: 10px;
    color: white;
  }

  .basic th{
    width: 150px;
  }

  .plan{
    margin-top: 10px;

    .content{
      height: 350px;
      overflow-y: auto;
    }
    table{
      text-align: center;
    }
  }
  .ant-empty-normal {
    margin: 400px 0 !important;
  }
</style>