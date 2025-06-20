<template>
  <a-card :bordered="false">
    <div v-if="indexStyle==0">
      <div>
        <div style='background-color: #0098F8;width: 10px;height: 30px;display: inline-block;vertical-align:middle;margin-top: -6px'></div>
        <p style='display: inline-block;color: #666666;font-size: 20px;margin-left: 20px'>做课-轮机电气学（已完成）</p>
      </div>
      <div class="table-operator" style="">
        <a-button @click=" " type="primary" style='position: absolute;right: 0;height: 48px;top: 30px'><a-icon type="caret-right" />课程预览</a-button>
      </div>
      <div class="table-operator" style="height: 30px;display: inline-block">
        <!--            <a-button @click="showModal" type="primary" style='background-color: #00BAD0;height: 34px;border: none'><a-icon type="plus" />添加</a-button>-->
        <tianJIa></tianJIa>
      </div>
      <div class="table-operator" style="height: 30px;display: inline-block">
        <a-button @click=" " type="primary" style='background-color: #00D09D;border: none;height: 34px;'><a-icon type="check" />保存排序</a-button>
      </div>
      <a-table style='padding-top: 20px' :columns="columns" :data-source="data"  >
            <span slot='sortIco' slot-scope="text,record">
                <a-icon @click='' type="arrow-up" />
              <div style='width: 30px;display: inline-block'></div>
              <a-icon @click='' type="arrow-down" />
            </span>
        <span slot="action" slot-scope="text, record">
              <a v-if="record.stastus==false" @click=" " style="color:#00BAD0">添加</a>
               <a-divider v-if="record.stastus==false" type="vertical"/>
              <a v-if="record.stastus==true" @click="conlumn" style="color:#00BAD0">内容管理</a>
               <a-divider v-if="record.stastus==true" type="vertical"/>
              <a @click=" " style="color:#0098F8">编辑</a>
               <a-divider type="vertical"/>
              <a @click=" " style="color:#FC8950">删除</a>
          </span>
      </a-table>
    </div>

    <div>
      <conlumnMod v-if="indexStyle==1"></conlumnMod>
    </div>
  </a-card>
</template>

<script>
import tianJIa from './modules/catModel.vue';
import conlumnMod from './modules/conlunmModel.vue';
const columns = [
  {
    title: '章节',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '排序移动',
    dataIndex: 'sort',
    key: 'sort',
    width: '30%',
    scopedSlots:{customRender:'sortIco'}
  },
  {
    title: '操作',
    dataIndex: 'address',
    width: '30%',
    key: 'address',
    scopedSlots:{customRender:'action'}
  },
];
const data = [
  {
    key: '1',
    name: '第一章节',
    stastus:false,
    operation: '',
    children: [
      {
        key: 11,
        stastus:false,
        name: '第一小节',
        age: 42,
      },
      {
        key: 12,
        stastus:true,
        name: '第二小节',
        age: 42,
      },
    ],
  },
  {
    key: '2',
    name: '第二章节',
    operation: '',
    children: [
      {
        key: 211,
        name: '第一小节',
        age: 42,
      },
      {
        key: 212,
        name: '第二小节',
        age: 42,
      },
    ],
  },
];
export default {
  name: 'zCat',
  components:{
    tianJIa,
    conlumnMod,
  },
  data() {
    return {
      columns,
      data,
      indexStyle:0,
    };
  },
  methods:{
    conlumn(){
      this.indexStyle=1
    },
  },
}

</script>

<style scoped>

</style>