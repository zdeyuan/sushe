<template>
   <a-modal
    :title="title"
    :width="width"
    placement="right"
    :closable="false"
    okText='确定'
    cancel-text="返回"
    @cancel="handleCancel"
    @ok="handleOk"
    :visible="visible">
  <a-card :bordered="false" @submit="handleSubmit" >
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 6 }" class="locationItem">
      <a-input class="locationInput" placeholder="项目名称" />
      <div class="localtionDiv">
        <a-button class="localtionRefresh"><a-icon type="sync" />清空</a-button>
        <a-button class="localtionsearch" style=''>搜索</a-button>
      </div>
     <!-- <a-transfer
        :data-source="mockData"
        :titles="['资源名称','资源名称']"
        :operations="['选择勾选', '取消勾选']"
        :list-style="{
          width: '450px',
          height: '300px',
        }"
        :target-keys="targetKeys"
        :render="renderItem"
        @change="handleChange"
        :show-select-all="true"
      /> -->
      <div>
        <a-transfer
          :data-source="mockData"
          :target-keys="targetKeys"
          :titles="['资源名称','资源名称']"
          :operations="['选择勾选', '取消勾选']"
          :show-search="showSearch"
          
          :show-select-all="false"
          @change="onChange"
        >
          <template
            slot="children"
            slot-scope="{
              props: { direction, filteredItems, selectedKeys,},
              on: { itemSelectAll, itemSelect },
            }"
          >
            <a-table
              :row-selection="
                getRowSelection({  selectedKeys, itemSelectAll, itemSelect })
              "
              :columns="direction === 'left' ? leftColumns : rightColumns"
              :data-source="filteredItems"
              size="small"
              
              
            />
          </template>
        </a-transfer>
      </div>
    
    </a-form>
  </a-card> 
  </a-modal>
</template>

<script>
  import '@/assets/less/usercolor.less'
  import difference from 'lodash/difference';
  const mockData = [];
  for (let i = 0; i < 20; i++) {
    mockData.push({
      key: i.toString(),
      title: `content${i + 1}`,
      description: `description of content${i + 1}`,
      disabled: i % 4 === 0,
    });
  }

  const originTargetKeys = mockData.filter(item => +item.key % 3 > 1).map(item => item.key);

  const leftTableColumns = [
    {
      dataIndex: 'title',
      title: 'Name',
    },
    // {
    //   dataIndex: 'description',
    //   title: 'Description',
    // },
  ];
  const rightTableColumns = [
    {
      dataIndex: 'title',
      title: 'Name',
    },
  ];
  export default {
    //添加
    name: 'SelectionModal',
    components: {
     
    },
    data () {
      return {
        mockData,
        targetKeys: originTargetKeys,
        disabled: false,
        showSearch: false,
        leftColumns: leftTableColumns,
        rightColumns: rightTableColumns,
        // mockData: [],
        // targetKeys: [],
        queryParam:{

        },
        title:"操作",
        width:1200,
        visible: false,
        disableSubmit: false,
        form:this.$form.createForm(this),
        fileList:[],
        indexStyle:0,
        panelData:[
          {
            name:'石心疯第一节',
            id:1
          },{
            name:'石心疯第一节',
            id:1
          },],
        typeData:[{
          id:1,
          type:'电子教材'
        },{
          id:1,
          type:'实训指导书'
        },],  
        validatorRules:{
          name:{rules: [
                  { required: true, message: '请输入节点!' },
                ]},
          Resourcename:{ rules: [{ required: true, message: '请输入资源名称!' }] },
          type: { rules: [{ required: true, message: '请输入应用类型!' }] },
          classification: { rules: [{ required: true, message: '请输入资源分类!' }] },
        },
      }
    },
    mounted() {
      // this.getMock();
    },
    methods: {
      handleChange(targetKeys, direction, moveKeys) {
        console.log(targetKeys, direction, moveKeys);
        this.targetKeys = targetKeys;
      },
      selectSys(){
        this.visible=true
        this.$nextTick(()=>{
          this.$refs.realForm.selectSys();
        })
      },
      examine (record) {
        this.visible=true
        this.$nextTick(()=>{
          this.$refs.realForm.examine(record);
        });
      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleCancel() {
        this.visible = false;
      },
      submitCallback(){
        this.$emit('ok');
        this.visible = false;
      },
      handleOk () {
        // this.$refs.realForm.submitForm();
         const form = this.form;
          form.validateFields((err, values) => {
          if (err) {
            return;
          }
          console.log('form 表单内容: ', values);
          form.resetFields();
          this.visible = false;
        });
      },
      handleCancel () {
        this.close()
      },
      //添加
      handleSubmit(e) {
        console.log(e) 
      },
      handReturn(){
        this.indexStyle=0;
        this.produceNum=0
      },
      handleChangeImg(item){
        console.log(item)
        
      },
      createSubmit(){

      },
      onChange(nextTargetKeys) {
      this.targetKeys = nextTargetKeys;
      },

      // triggerDisable(disabled) {
      //   this.disabled = disabled;
      // },

      triggerShowSearch(showSearch) {
        this.showSearch = showSearch;
      },
      getRowSelection({  selectedKeys, itemSelectAll, itemSelect }) {
        return {
          // getCheckboxProps: item => ({ props: { disabled: disabled || item.disabled } }),
          onSelectAll(selected, selectedRows) {
            const treeSelectedKeys = selectedRows
              .filter(item => !item.disabled)
              .map(({ key }) => key);
            const diffKeys = selected
              ? difference(treeSelectedKeys, selectedKeys)
              : difference(selectedKeys, treeSelectedKeys);
            itemSelectAll(diffKeys, selected);
          },
          onSelect({ key }, selected) {
            itemSelect(key, selected);
          },
          selectedRowKeys: selectedKeys,
        };
      },
      // getMock() {
      //   const targetKeys = [];
      //   const mockData = [];
      //   for (let i = 0; i < 20; i++) {
      //     const data = {
      //       key: i.toString(),
      //       title: `消息系统数据设计${i + 1}`,
      //       description: `description of content${i + 1}`,
      //       chosen: Math.random() * 2 > 1,
      //     };
      //     if (data.chosen) {
      //       targetKeys.push(data.key);
      //     }
      //     mockData.push(data);
      //   }
      //   this.mockData = mockData;
      //   this.targetKeys = targetKeys;
      // },
      // renderItem(item) {
      // const customLabel = (
      //   <span class="custom-item">
      //     {item.title}
      //   </span>
      // );
      //   return {
      //     label: customLabel, // for displayed item
      //     value: item.title, // for title and filter matching
      //   };
      // },
    }
  }
</script>

<style lang="less" scoped>
/** Button按钮间距 */
  .drawer-footer{
    position: absolute;
    bottom: -8px;
    width: 100%;
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    text-align: right;
    left: 0;
    background: #fff;
    border-radius: 0 0 2px 2px;
  }


</style>