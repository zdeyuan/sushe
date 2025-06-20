<template>
  <div class="edit_form">
    <!-- 编辑页
               <a-row>
              <a-col :span="12"> </a-col>
              <a-col :span="12"> </a-col>
            </a-row>-->
    <edu-form :title="'设置' + checkItem.name + '项目指标'" @ok="createData()" @cancel="handelCancel">
    	 <a-transfer
    	 :list-style="{
    	   width: '45%',
    	   height: '300px',
    	 }"
    	        :data-source="dataSource"
    	        :target-keys="targetKeys"
    	        :render="item => item.title"
    	        @change="handleChange"
    	    />
    </edu-form>
  </div>
</template>

<script>
import veStuHygieneItemNormApi from '../../../api/veStuHygieneItemNormApi';
import veStuHygieneNormApi from '../../../api/veStuHygieneNormApi';

export default {
  components: {},
  data() {
    const data = {
      veStuHygieneItemNormVo: this.resetveStuHygieneItemNormVo(),
      textMap: {
        update: '编辑-项目指标表',
        create: '新增-项目指标表'
      },
      dialogStatus: 'create',
      dataSource: [],
	  targetKeys:[],
      defalutSetting: {
        check: {
          enable: true,
          chkStyle: 'checkbox',
          chkboxType: { Y: '', N: '' }
        }
      },
	  tempSelectedKeys:[],
      veStuHygieneItemNormRules: {},
      checkItem: {}
    };
    return data;
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      veStuHygieneNormApi.all({}).then(res => {
        this.dataSource = res.result.map(item => ({
        		key: item.id.toString(),
        		title: item.name,
        		description: item.description
        	}));
      });
    },
    /**
     * @msg: 重置数据
     */
    resetveStuHygieneItemNormVo() {
      return {
        itemId: '', // 项目Id
        normId: '', // 指标Id
        listSort: '', // 排序
        status: '' // 是否禁用 0为否 1为是
      };
    },
	// 处理 Transfer 组件的 change 事件
	handleChange(targetKeys, direction, moveKeys) {
	  this.targetKeys = targetKeys;
	  this.saveSelectedItems(targetKeys)
	},
	saveSelectedItems(selectedKeys) {
		// 将选中的key转换为normId数组
		const normIds = selectedKeys.map(key => parseInt(key));
		this.tempSelectedKeys=normIds;
	},
    /**
     * @msg: 初始化新增
     */
    doCreate(row) {
      this.checkItem = row;
      this.dialogStatus = 'create';
      this.veStuHygieneItemNormVo = this.resetveStuHygieneItemNormVo();
      const sub =  {
			itemId: row.id
		}

      veStuHygieneItemNormApi.all(sub).then(res => {
        const datas = res.result;
		this.targetKeys = datas.map(item => item.id.toString());
		this.tempSelectedKeys = [...this.targetKeys];
      });
    },
    /**
     * @msg: 编辑页取消
     */
    handelCancel() {
      this.$emit('onCancel');
    },
    /**
     * @msg: 获取提交的数据 新增和 修改复用
     */
    getSubData(isUpdate) {
      if (this.tempSelectedKeys.length == 0) {
      	return null;
      }

      const tempData = {
        itemId: this.checkItem.id,
        ids: this.tempSelectedKeys
      };
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      const subData = this.getSubData(false);
      if (subData == null) {
        return;
      }
      veStuHygieneItemNormApi.add(subData).then(res => {
        this.$notification.success({
          message: '数据新增成功',
          description: '新增了一条数据'
        });
        this.$emit('onOk');
      });
    }
  }
};
</script>
<style lang="less" scoped></style>
