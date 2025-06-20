<template>
    <div class="edit_form">
        <!-- 编辑页 -->
        <edu-form
                title="设备资产调拨详情"
                :isShowBtnSure="false"
                @cancel="handelCancel"
        >
            <a-form-model
                    ref="veSbzcZcAllocateDataForm"
                    labelAlign="right"
            >
                <a-row>
                    <a-col :span="12">
                        <a-form-model-item label="资产名称">
                            {{veSbzcZcAllocateVo.assetName}}
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item label="资产编号">
                            {{veSbzcZcAllocateVo.assetCode}}
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="12">
                        <a-form-model-item label="所属部门">
                            {{veSbzcZcAllocateVo.deptOwn}}
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item label="现在所属部门">
                            {{veSbzcZcAllocateVo.allocateDept}}
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="12">
                        <a-form-model-item label="批准人姓名">
                            {{veSbzcZcAllocateVo.checkUserName}}
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item label="调拨日期">
                            {{veSbzcZcAllocateVo.allocateDate}}
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-form-model-item label="备注">
                    {{veSbzcZcAllocateVo.remark}}
                </a-form-model-item>
            </a-form-model>
        </edu-form>
    </div>
</template>

<script>
  import veSbzcZcAllocateApi from '@/views/sbzc/fund/api/veSbzcZcAllocateApi';

  export default {
    components: {},
    data() {
      const data = {
        veSbzcZcAllocateVo: {}
      };
      return data;
    },
    mounted() {
    },
    methods: {
      /**
       * @msg: 初始化修改
       */
      doShow(row) {
        this.veSbzcZcAllocateVo = Object.assign({}, row);
        //    veSbzcZcAllocateApi.get(row.id).then((res) => {
        //      this.veSbzcZcAllocateVo = res.result
        // });
      },
      /**
       * @msg: 编辑页取消
       */
      handelCancel() {
        this.$emit('onCancel');
      }
    }
  };
</script>
<style lang="less" scoped>

</style>