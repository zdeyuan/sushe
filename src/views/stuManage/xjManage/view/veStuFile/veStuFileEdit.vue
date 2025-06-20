<template>
  <div class="edit_form">
        <!-- 编辑页 -->
        <edu-form
          :title="textMap[dialogStatus]"
          @ok="viewType==='create'?createData():updateData()"
          @cancel="handelCancel"
        >
          <a-form-model
            ref="veStuFileDataForm"
            :rules="veStuFileRules"
            :model="veStuFileVo"
            labelAlign="right"
          >
                             <a-form-model-item label="扩展名" prop="ext" required>
                                 <a-input v-model="veStuFileVo.ext" :maxLength="255" placeholder="请输入扩展名" />
                               </a-form-model-item>
                            <a-form-model-item label="名称" prop="name" required>
                                 <a-input v-model="veStuFileVo.name" :maxLength="255" placeholder="请输入名称" />
                               </a-form-model-item>
                            <a-form-model-item label="文件名" prop="fileName" required>
                                 <a-input v-model="veStuFileVo.fileName" :maxLength="255" placeholder="请输入文件名" />
                               </a-form-model-item>
                            <a-form-model-item label="路径" prop="path" required>
                                 <a-input v-model="veStuFileVo.path" :maxLength="255" placeholder="请输入路径" />
                               </a-form-model-item>
                            <a-form-model-item label="保存路径 0  本地 1 阿里云" prop="saveType" required>
                                 <a-input v-model="veStuFileVo.saveType" :maxLength="0" placeholder="请输入保存路径 0  本地 1 阿里云" />
                               </a-form-model-item>
                            <a-form-model-item label="业务ID" prop="serviceId" required>
                                 <a-input v-model="veStuFileVo.serviceId" :maxLength="255" placeholder="请输入业务ID" />
                               </a-form-model-item>
                            <a-form-model-item label="业务类型" prop="serviceType" required>
                                 <a-input v-model="veStuFileVo.serviceType" :maxLength="255" placeholder="请输入业务类型" />
                               </a-form-model-item>
                      </a-form-model>
        </edu-form>
  </div>
</template>

<script>
import veStuFileApi from "@/views/stuManage/xjManage/api/veStuFileApi";

export default {
  components: { },
  data() {
    const data = {
      veStuFileVo: this.resetveStuFileVo(),
      textMap: {
        update: "编辑-",
        create: "新增-"
      },
      dialogStatus: 'create',
      veStuFileRules: {
      }
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveStuFileVo() {
      return {
             ext:'',// 扩展名
                  name:'',// 名称
                  fileName:'',// 文件名
                  path:'',// 路径
                  saveType:'',// 保存路径 0  本地 1 阿里云
                  serviceId:'',// 业务ID
                  serviceType:'',// 业务类型
                  };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.viewType = "create"
      this.veStuFileVo = this.resetveStuFileVo();
      this.$nextTick(() => {
        this.$refs.veStuFileDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veStuFileApi.get(row.id).then((res) => {
          this.veStuFileVo = res.result
      });
      this.viewType = "update"
      this.$nextTick(() => {
        this.$refs.veStuFileDataForm.clearValidate();
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
    getSubData(isUpdate){
       const tempData = Object.assign({}, this.veStuFileVo);
       return tempData
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veStuFileDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if(subData == null){
            return;
          }
          veStuFileApi.add(subData).then(res => {
              this.$notification.success({
              message: "数据新增成功",
              description: '新增了一条数据'});
              this.$emit('onOk');
          });
        }
      });
    },
    /**
     * @msg: 调用Api修改数据
     */
    updateData() {
      this.$refs.veStuFileDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if(subData == null){
            return;
          }
          veStuFileApi.update(subData).then(() => {
              this.$notification.success({
              message: "数据修改成功",
              description: "修改了一条数据"});
             this.$emit('onOk');
          });
        }
      });
    },
  }
};
</script>
<style lang="less" scoped>

</style>