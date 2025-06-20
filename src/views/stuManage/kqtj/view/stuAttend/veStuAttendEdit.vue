<template>
  <div class="edit_form">
    <edu-form
            :title="textMap[dialogStatus]"
            top="200px"
            width="600px"
            @ok="dialogStatus === 'create' ? createData() : updateData()"
            @cancel="handelCancel"
    >
      <a-form-model
              ref="veStuAttendDataForm"
              :rules="veStuAttendRules"
              :model="veStuAttendVo"
              labelAlign="right"
      >
        <a-form-model-item label="时间">
          <span>{{veStuAttendVo.dateText}}</span>
        </a-form-model-item>
        <a-form-model-item label="考勤状态" prop="status" required>
          <a-radio-group name="radioGroup" v-model="veStuAttendVo.status">
            <a-radio :value="0">正常</a-radio>
            <a-radio :value="1">事假</a-radio>
            <a-radio :value="2">病假</a-radio>
            <a-radio :value="3">迟到</a-radio>
            <a-radio :value="4">早退</a-radio>
            <a-radio :value="5">旷课</a-radio>
          </a-radio-group>
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
    import veStuAttendApi from '@/views/stuManage/kqtj/api/veStuAttendApi';
    Date.prototype.format = function(fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    }
    export default {
        components: {},
        data() {
            const data = {
                oldStatus:null,
                veStuAttendVo: this.resetVeStuAttendVo(),
                textMap: {
                    update: '编辑-考勤状态',
                    create: '修改-考勤状态'
                },
                dialogStatus: 'create',
                veStuAttendRules: {},
                weekCourseMap:{},
            };
            return data;
        },
        mounted() {},
        methods: {
            /**
             * @msg: 重置数据
             */
            resetVeStuAttendVo() {
                return {
                    typeName: '', // 类型名称
                    status: 1 // 状态：0=禁用，1=启用
                };
            },
            /**
             * @msg: 初始化新增
             */
            doCreateAttend(record,column,status,weekCourseMap) {
                let cArray = column.split(/[d,w,s]/);
                this.dialogStatus = 'create';
                this.oldStatus = status.value;
                this.veStuAttendVo = this.resetVeStuAttendVo();
                this.veStuAttendVo.statusText = status.text;
                this.veStuAttendVo.status = status.value;
                this.veStuAttendVo.info = record;
                this.veStuAttendVo.info.month = cArray[1];
                this.veStuAttendVo.info.week = cArray[2];
                this.veStuAttendVo.info.section = cArray[3];
                this.veStuAttendVo.info.title = column;
                this.weekCourseMap = weekCourseMap;
                let s = this.veStuAttendVo.info.month;
                this.veStuAttendVo.dateText = s.substring(0,4)+'年'+parseInt(s.substring(4,6))+'月'+parseInt(s.substring(6,s.length))+'日'
                    +' 星期'+this.getWeekName(this.veStuAttendVo.info.week)
                    +' 第'+this.veStuAttendVo.info.section+'节';
                this.$nextTick(() => {
                    return this.$refs.veStuAttendDataForm.clearValidate();
                });
            },
            getWeekName(w){
                let weekArray = ['','一','二','三','四','五','六','日']
              return  weekArray[w];
            },
            /**
             * @msg: 初始化修改
             */
            doUpdate(row) {
                veStuAttendApi.get(row.id).then(res => {
                    this.veStuAttendVo = res.result;
                });
                this.dialogStatus = 'update';
                this.$nextTick(() => {
                    this.$refs.veStuAttendDataForm.clearValidate();
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
                const tempData = Object.assign({}, this.veStuAttendVo);
                return tempData;
            },

        /**
         * @msg: 调用Api创建数据
         */
        createData() {
            this.$refs.veStuAttendDataForm.validate(valid => {
                if (valid) {
                    if (this.veStuAttendVo.status == this.oldStatus) {
                        this.$emit('onOk');
                        return
                    }
                    this.veStuAttendVo.info.typeId = this.veStuAttendVo.status;
                    this.veStuAttendVo.info = Object.assign(this.veStuAttendVo.info,this.weekCourseMap[this.veStuAttendVo.info.week][this.veStuAttendVo.info.section])
                    this.veStuAttendVo.info.fal_id = this.veStuAttendVo.info.falId
                    this.veStuAttendVo.info.spec_id = this.veStuAttendVo.info.specId
                    this.veStuAttendVo.info.jxbjId = this.veStuAttendVo.info.jxbId
                    this.veStuAttendVo.info.bj_id = this.veStuAttendVo.info.bjId
                    this.veStuAttendVo.info.checkTime = this.formatDate(this.veStuAttendVo.info.month)
                    this.veStuAttendVo.info.courseId = this.veStuAttendVo.info.kcId
                    this.veStuAttendVo.info.courseName = this.veStuAttendVo.info.kcmc
                    this.veStuAttendVo.info.id = this.veStuAttendVo.info[this.veStuAttendVo.info.title+'id']
                    this.veStuAttendVo.info.teacherName = this.veStuAttendVo.info.jsxm
                    if (this.veStuAttendVo.info.id != null && this.veStuAttendVo.info.typeId == 0) {
                        veStuAttendApi.delete([this.veStuAttendVo.info.id]).then(res => {
                            this.$notification.success({
                                message: '数据修改成功',
                                description: '修改了一条数据'
                            });
                            this.$emit('onOk');
                            return
                        });
                    } else {
                      veStuAttendApi.add(this.veStuAttendVo.info).then(res => {
                          this.$notification.success({
                              message: '数据修改成功',
                              description: '修改了一条数据'
                          });
                          this.$emit('onOk');
                      });
                    }
                }
            });
        },
        formatDate(s) {
            return s.substring(0,4)+'-'+s.substring(4,6)+'-'+s.substring(6,s.length)
        },
        /**
         * @msg: 调用Api修改数据
         */
        updateData() {
            this.$refs.veStuAttendDataForm.validate(valid => {
                if (valid) {
                    const subData = this.getSubData(true);
                    if (subData == null) {
                        return;
                    }
                    veStuAttendApi.update(subData).then(() => {
                        this.$notification.success({
                            message: '数据修改成功',
                            description: '修改了一条数据'
                        });
                        this.$emit('onOk');
                    });
                }
            });
        }
    },
    };
</script>
<style lang="less" scoped></style>
