<template>
  <div class="edit_form">
    <!-- 编辑页 -->
      <a-form-model ref="veBaseStudentDataForm" labelAlign="right">
        <a-button type="primary" @click="doPrint()">
          打印
        </a-button>
        <div id="printDiv" style="margin-top:8px">
          <div class="detail_title">基本信息</div>
          <a-row>
            <a-col :span="12">
              <a-form-model-item label="身份证号" class="ytop" prop="sfzh">
                {{ veBaseStudentVo.sfzh }}
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="姓名" class="ytop" prop="xm">
                {{ veBaseStudentVo.xm }}
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-model-item label="学号" prop="xh">
                {{ veBaseStudentVo.xh }}
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="性别" prop="xbm">
                <edu-dict-text :value="veBaseStudentVo.xbm" stype="radio" code="sexStr" />
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-model-item label="曾用名" prop="cym">
                {{ veBaseStudentInfoVo.csrq }}
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="出生日期" prop="csrq">
                {{ $date.intTime(veBaseStudentInfoVo.csrq) }}
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-model-item label="民族码" prop="mzm">
                <edu-dict-text :value="veBaseStudentVo.mzm" stype="select" code="mzm" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="籍贯" prop="jg">
                {{ veBaseStudentInfoVo.jg }}
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-model-item label="政治面貌码" prop="zzmmm">
                <edu-dict-text :value="veBaseStudentInfoVo.zzmmm" stype="select" code="zzmmm" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="就读方式" prop="jdfs">
                <edu-dict-text :value="veBaseStudentVo.jdfs" stype="radio" code="jdfs" />
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-form-model-item label="是否是困难生" prop="sfkns">
            <edu-dict-text :value="veBaseStudentVo.sfkns" stype="radio" code="shifou" />
          </a-form-model-item>
          <a-form-model-item label="学生照片" prop="sfkns">
            <uploadFiles edit :editTitle="false" ref="uploadFiles" :limit="1" fileType="image" isImg serviceType="student">
              <a-table-column dataIndex="ext" title="图片">
                <template slot-scope="ext, row">
                  <img :src="$http.baseServer + '/' + $http.service.stu + 'veStuFile/download?id=' + row.id" style="height:50px" />
                </template>
              </a-table-column>
            </uploadFiles>
          </a-form-model-item>

          <div class="detail_title" style="margin-top:15px">学籍信息</div>

          <a-row>
            <a-col :span="12">
              <a-form-model-item label="所属年级" prop="xz">
                {{ veBaseStudentVo.gradeText }}
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="所属专业部" prop="xz">
                {{ veBaseStudentVo.falText }}
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="所属专业" prop="xz">
                {{ veBaseStudentVo.specText }}
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="所属班级" prop="xz">
                {{ veBaseStudentVo.bjText }}
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-model-item label="学制" prop="xz">
                {{ veBaseStudentVo.xz }}
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="报名方式" prop="bmfsm">
                {{ veBaseStudentInfoVo.bmfsm }}
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-model-item label="报名号" prop="bmh">
                {{ veBaseStudentVo.bmh }}
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="入学年月" prop="rxny">
                {{ $date.intTime(veBaseStudentInfoVo.rxny) }}
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-model-item label="入学成绩" prop="rxcj">
                {{ veBaseStudentInfoVo.rxcj }}
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="毕业学校" prop="byxx">
                {{ veBaseStudentInfoVo.byxx }}
              </a-form-model-item>
            </a-col>
          </a-row>

          <div class="detail_title" style="margin-top:15px">联系方式</div>

          <a-form-model-item label="户口所在地" class="ytop" prop="province">
            {{ veBaseStudentVo.province }}
            {{ veBaseStudentVo.city }}
            {{ veBaseStudentVo.county }}
          </a-form-model-item>

          <a-row>
            <a-col :span="12">
              <a-form-model-item label="学生联系电话" prop="xslxdh">
                {{ veBaseStudentInfoVo.xslxdh }}
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="QQ" prop="jstxh">
                {{ veBaseStudentInfoVo.jstxh }}
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-model-item label="电子邮箱" prop="dzxx">
                {{ veBaseStudentInfoVo.dzxx }}
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="家庭联系电话" prop="jtlxdh">
                {{ veBaseStudentInfoVo.jtlxdh }}
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-form-model-item label="详细家庭地址" prop="jtdz">
            {{ veBaseStudentInfoVo.jtdz }}
          </a-form-model-item>
          <div class="detail_title" style="margin-top:15px">其他信息</div>

          <a-row>
            <a-col :span="12">
              <a-form-model-item class="ytop" label="健康状况" prop="jkzkm">
                <edu-dict-text :value="veBaseStudentInfoVo.jkzkm" stype="select" code="jkzkm" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item class="ytop" label="是否流动人口" prop="sfsldrk">
                <edu-dict-text :value="veBaseStudentInfoVo.sfsldrk" stype="select" code="sfsldrk" />
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-model-item label="户口类别" prop="hklbm">
                <edu-dict-text :value="veBaseStudentInfoVo.hklbm" stype="select" code="hklbm" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="是否低保" prop="sfdb">
                <edu-dict-text :value="veBaseStudentInfoVo.sfdb" stype="radio" code="shifou" />
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-form-model-item label="特长" prop="tc">
            {{ veBaseStudentInfoVo.tc }}
          </a-form-model-item>
        </div>
      </a-form-model>
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
      veBaseStudentInfoVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    doPrint() {
      var divToPrint = document.getElementById('printDiv');
      var newWin = window.open('', 'Print-Window');
      newWin.document.open();
      newWin.document.write('<html><body onload="window.print()">' + divToPrint.innerHTML + '</body></html>');
      newWin.document.close();
      setTimeout(function() {
        newWin.close();
      }, 10);
    },
    /**
     * @msg: 初始化修改
     */
    doShow(row, stuId) {
      veBaseStudentApi.get(stuId || row.id).then(res => {
        this.veBaseStudentVo = res.result.stu;
        this.veBaseStudentInfoVo = res.result.stuInfo;
        this.$refs.uploadFiles.setValue(null, res.result.stuInfo.photo);
        /*   this.$refs.boxZybmbj.setValue(res.result.stu);
        this.$refs.boxCitySelect.setValue(res.result.stu);
        this.$refs.uploadFiles.setValue(null, res.result.stuInfo.photo); */
      });

      //this.veBaseStudentVo =Object.assign({}, row)
      //    veBaseStudentApi.get(row.id).then((res) => {
      //      this.veBaseStudentVo = res.result
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
<style lang="less" scoped></style>
