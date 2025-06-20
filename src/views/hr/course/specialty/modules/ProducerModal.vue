<template>
   <a-modal
    :title="title"
    :width="width"
    placement="right"
    :closable="false"
    okText='确定'
    cancel-text="取消"
    @cancel="handleCancel"
    @ok="handleOk"
    :visible="visible">
  <a-card :bordered="false" @submit="handleSubmit" >
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 6 }" class="locationItem">
      <a-input class="locationInput" placeholder="项目名称" />
        <a-select  placeholder="全部专业" style="width:140px;height:34px;margin-right: 20px">
          <a-select-option value="jack">
            专业
          </a-select-option>
          <a-select-option value="lucy">
            专业一
          </a-select-option>
          <a-select-option value="disabled">
            专业二
          </a-select-option>
        </a-select>
        <a-select default-value="lucy" style="width: 140px;height: 34px;margin-right: 20px" @change="handleChange">
          <a-select-option value="jack">
            全部角色
          </a-select-option>
          <a-select-option value="lucy">
            角色一
          </a-select-option>
          <a-select-option value="disabled">
            角色二
          </a-select-option>
        </a-select>
        <a-select default-value="lucy" style="width: 140px;height: 34px;margin-right: 20px" @change="handleChange">
          <a-select-option value="jack">
            教师
          </a-select-option>
          <a-select-option value="lucy">
            教师一
          </a-select-option>
          <a-select-option value="disabled">
            教师二
          </a-select-option>
        </a-select>
        <a-select default-value="lucy" style="width: 140px;height: 34px;margin-right: 20px" @change="handleChange">
            <a-select-option value="jack">
              全部机构
            </a-select-option>
            <a-select-option value="lucy">
              机构一
            </a-select-option>
            <a-select-option value="disabled">
              机构二
            </a-select-option>
          </a-select>
        <div class="localtionDiv">
          <a-button class="localtionRefresh"><a-icon type="sync" />清空</a-button>
          <a-button class="localtionsearch" style=''>搜索</a-button>
        </div>
         <a-transfer
            :data-source="mockData"
            :titles="['姓名','姓名']"
            :operations="['选择勾选', '取消勾选']"
            :list-style="{
              width: '450px',
              height: '300px',
            }"
            :target-keys="targetKeys"
            :render="renderItem"
            @change="handleChange"
            :show-select-all="true"
          />
    </a-form>
  </a-card> 
  </a-modal>
</template>

<script>
  import '@/assets/less/usercolor.less'
  export default {
    //添加
    name: 'ProducerModal',
    components: {
     
    },
    data () {
      return {
        mockData: [],
        targetKeys: [],
        queryParam:{

        },
        title:"操作",
        width:1200,
        visible: false,
        disableSubmit: false,
        form:this.$form.createForm(this),
        fileList:[],
        treeData:[{
          title: 'Node1',
          value: '0-0',
          key: '0-0',
          children: [
            {
              title: 'Child Node1',
              value: '0-0-0',
              key: '0-0-0',
            },
          ],
        },],
        indexStyle:0,
        majorData:[
          {
            name:'汽车专业',
            id:1
          },
          {
            name:'测试专业',
            id:2
          },
          {
            name:'轮机工程技术',
            id:3
          }],
        validatorRules:{
          name:{rules: [
                  { required: true, message: '请输入名称!' },
                  { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
                ]},
          code:{ rules: [{ required: true, message: '请输入标识!' }] },
          veCondition: { rules: [{ required: true, message: '请输入默认权重!' }] },
          unit: { rules: [{ required: true, message: '请输入计算单位!' }] },
        },
      }
    },
    mounted() {
      this.getMock();
    },
    methods: {
      getMock() {
        const targetKeys = [];
        const mockData = [];
        for (let i = 0; i < 20; i++) {
          const data = {
            key: i.toString(),
            title: `教师${i + 1}`,
            description: `description of content${i + 1}`,
            chosen: Math.random() * 2 > 1,
          };
          if (data.chosen) {
            targetKeys.push(data.key);
          }
          mockData.push(data);
        }
        this.mockData = mockData;
        this.targetKeys = targetKeys;
      },
      renderItem(item) {
      const customLabel = (
        <span class="custom-item">
          {item.title} - {item.description}
        </span>
      );
        return {
          label: customLabel, // for displayed item
          value: item.title, // for title and filter matching
        };
      },
      handleChange(targetKeys, direction, moveKeys) {
        console.log(targetKeys, direction, moveKeys);
        this.targetKeys = targetKeys;
      },
      produceradd () {
        this.visible=true
        this.$nextTick(()=>{
          this.$refs.realForm.produceradd();
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
        this.$refs.realForm.submitForm();
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
      createSubmit(){

      },
    }
  }
</script>

<style lang="less" scoped>
/** Button按钮间距 */
  .ant-btn {
    margin-left: 30px;
    margin-bottom: 30px;
    float: right;
  }
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