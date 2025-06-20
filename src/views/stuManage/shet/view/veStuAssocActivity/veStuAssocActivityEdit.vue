<template>
  <div class="edit_form">
        <!-- 编辑页
               <a-row>
              <a-col :span="12"> </a-col>
              <a-col :span="12"> </a-col>
            </a-row>-->
        <edu-form
          :title="textMap[dialogStatus]"
          @ok="dialogStatus==='create'?createData():updateData()"
          @cancel="handelCancel"
        >
          <a-form-model
            ref="veStuAssocActivityDataForm"
            :rules="veStuAssocActivityRules"
            :model="veStuAssocActivityVo"
            labelAlign="right"
          >
                             <a-form-model-item label="社团id" prop="assocId" required>
                                 <a-input v-model="veStuAssocActivityVo.assocId" :maxLength="0" placeholder="请输入社团id" />
                               </a-form-model-item>
                            <a-form-model-item label="活动类型id" prop="typeId" required>
                                 <a-input v-model="veStuAssocActivityVo.typeId" :maxLength="0" placeholder="请输入活动类型id" />
                               </a-form-model-item>
                            <a-form-model-item label="活动主题" prop="theme" required>
                                 <a-input v-model="veStuAssocActivityVo.theme" :maxLength="50" placeholder="请输入活动主题" />
                               </a-form-model-item>
                            <a-form-model-item label="活动开始时间" prop="startTime" required>
								<DatePickByCN  v-model="veStuAssocActivityVo.startTime"  placeholder="请选择活动开始时间"/>
                               </a-form-model-item>
                            <a-form-model-item label="活动结束时间" prop="endTime" required>
								<DatePickByCN  v-model="veStuAssocActivityVo.endTime"  placeholder="请选择活动结束时间"/>
                               </a-form-model-item>
                            <a-form-model-item label="活动地点" prop="place" required>
                                 <a-input v-model="veStuAssocActivityVo.place" :maxLength="100" placeholder="请输入活动地点" />
                               </a-form-model-item>
                            <a-form-model-item label="活动费用" prop="price" required>
                                 <a-input v-model="veStuAssocActivityVo.price" :maxLength="0" placeholder="请输入活动费用" />
                               </a-form-model-item>
                            <a-form-model-item label="活动介绍" prop="intro" required>
                                 <a-input v-model="veStuAssocActivityVo.intro" :maxLength="65535" placeholder="请输入活动介绍" />
                               </a-form-model-item>
                            <a-form-model-item label="添加学生id" prop="addStuId" required>
                                 <a-input v-model="veStuAssocActivityVo.addStuId" :maxLength="11" placeholder="请输入添加学生id" />
                               </a-form-model-item>
                            <a-form-model-item label="" prop="addStuName" required>
                                 <a-input v-model="veStuAssocActivityVo.addStuName" :maxLength="255" placeholder="请输入" />
                               </a-form-model-item>
                            <a-form-model-item label="添加时间" prop="addTime" required>
                                 <a-input v-model="veStuAssocActivityVo.addTime" :maxLength="0" placeholder="请输入添加时间" />
                               </a-form-model-item>
                            <a-form-model-item label="活动查看次数" prop="viewCount" required>
                                 <a-input v-model="veStuAssocActivityVo.viewCount" :maxLength="0" placeholder="请输入活动查看次数" />
                               </a-form-model-item>
                      </a-form-model>
        </edu-form>
  </div>
</template>

<script>
import veStuAssocActivityApi from "@/views/stuManage/shet/api/veStuAssocActivityApi";

export default {
  components: { },
  data() {
    const data = {
      veStuAssocActivityVo: this.resetveStuAssocActivityVo(),
      textMap: {
        update: "编辑-社团活动",
        create: "新增-社团活动"
      },
      dialogStatus: 'create',
      veStuAssocActivityRules: {
      }
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveStuAssocActivityVo() {
      return {
             assocId:'',// 社团id
                  typeId:'',// 活动类型id
                  theme:'',// 活动主题
                  startTime:'',// 活动开始时间
                  endTime:'',// 活动结束时间
                  place:'',// 活动地点
                  price:'',// 活动费用
                  intro:'',// 活动介绍
                  addStuId:'',// 添加学生id
                  addStuName:'',// 
                  addTime:'',// 添加时间
                  viewCount:'',// 活动查看次数
                  };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.dialogStatus = "create"
      this.veStuAssocActivityVo = this.resetveStuAssocActivityVo();
      this.$nextTick(() => {
        this.$refs.veStuAssocActivityDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veStuAssocActivityApi.get(row.id).then((res) => {
          this.veStuAssocActivityVo = res.result
      });
      this.dialogStatus = "update"
      this.$nextTick(() => {
        this.$refs.veStuAssocActivityDataForm.clearValidate();
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
       const tempData = Object.assign({}, this.veStuAssocActivityVo);
       return tempData
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veStuAssocActivityDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if(subData == null){
            return;
          }
          veStuAssocActivityApi.add(subData).then(res => {
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
      this.$refs.veStuAssocActivityDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if(subData == null){
            return;
          }
          veStuAssocActivityApi.update(subData).then(() => {
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