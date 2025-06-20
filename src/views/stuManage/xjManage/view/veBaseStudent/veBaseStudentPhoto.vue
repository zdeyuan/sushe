<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-04-11 15:44:02
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-04-11 15:49:44
-->
<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="学生照片采集" @ok="updateData()" @cancel="handelCancel">
      <a-form-model ref="veBaseStudentDataForm" :rules="veBaseStudentRules" :model="veBaseStudentVo" labelAlign="right">
        <div class="detail_title" style="margin-top:15px">学生照片</div>
        <uploadFiles ref="uploadFiles" :limit="1" fileType="image" isImg serviceType="student">
          <a-table-column dataIndex="ext" title="图片">
            <template slot-scope="ext, row">
              <!-- <img :src="$http.baseServer + '/' + row.path" style="height:50px" /> -->
			  {{row.name}}
            </template>
          </a-table-column>
        </uploadFiles>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veBaseStudentApi from '@/views/stuManage/xjManage/api/veBaseStudentApi';
import uploadFiles from '@/components/uploadFiles';
export default {
  components: { uploadFiles },
  data() {
    const data = {
      veBaseStudentVo: {},
      veBaseStudentInfoVo: {},
      veBaseStudentRules: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
		 console.log("row",row);
		
      veBaseStudentApi.get(row.id).then(res => {
        this.veBaseStudentVo = res.result.stu;
        this.veBaseStudentInfoVo = res.result.stuInfo;
        this.$refs.uploadFiles.setValue(null, res.result.stuInfo.zp);
      });
      this.dialogStatus = 'update';
      this.$nextTick(() => {
        this.$refs.veBaseStudentDataForm.clearValidate();
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
    getSubData(isUpdate, callback) {
      const tempData = Object.assign({}, this.veBaseStudentVo);
      const tempInfoData = Object.assign({}, this.veBaseStudentInfoVo);

      const fileIds = this.$refs.uploadFiles.getValue();
	  console.log(fileIds,'fileIds')
      tempInfoData.zp = fileIds[0];

      callback({
        stu: tempData,
        stuInfo: tempInfoData
      });
    },
    /**
     * @msg: 调用Api修改数据
     */
    updateData() {
      this.$refs.veBaseStudentDataForm.validate(valid => {
        if (valid) {
          this.getSubData(true, subData => {
            if (subData == null) {
              return;
            }
            veBaseStudentApi.update(subData).then(() => {
              this.$notification.success({
                message: '数据修改成功',
                description: '修改了一条数据'
              });
              this.$emit('onOk');
            });
          });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped></style>
