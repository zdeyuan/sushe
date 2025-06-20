<template>
  <div  class='constbox'>
    <div class="pageContentBox">

      <div class="xhRuleDiv">
        <table class="xhrule-tb">
          <tr class="head-style">
            <td class="td-style">规则名称</td>
            <td class="td-style">位数</td>
            <td class="td-style">排序</td>
            <td class="td-style">是否启用</td>
          </tr>

          <tr class="tr-style">
            <td class="td-class">年份</td>
            <td class="td-class"><a-input class="num-rule-input" v-model="yearDigit" v-on:blur="checkYearDigit()" oninput="value=value.replace(/[^\d]/g,'')" />
            <span
              class="noNull-style"
              v-if="flag!=0 && (yearDigit == undefined || yearDigit == null || yearDigit == '')"
              >*必填项</span>
            </td>
            <td class="td-class"><a-input class="num-rule-input" v-model="yearSort" oninput="value=value.replace(/[^\d]/g,'')"/>
              <span
              class="noNull-style"
              v-if="flag!=0 && (yearSort == undefined || yearSort == null || yearSort == '')"
              >*必填项</span>
            </td>
            
            <td class="td-class-radio">
              <a-radio-group class="radio-font" :options="yearOptions" v-model="yearVal" />
            </td>
          </tr>

          <tr class="tr-style">
            <td class="td-class">专业</td>
            <td class="td-class"><a-input class="num-rule-input" v-model="specDigit" v-on:blur="checkSpecDigit()" oninput="value=value.replace(/[^\d]/g,'')" />
              <span
              class="noNull-style"
              v-if="flag!=0 && (specDigit == undefined || specDigit == null || specDigit == '')"
              >*必填项</span>
            </td>       
            <td class="td-class"><a-input class="num-rule-input" v-model="specSort" oninput="value=value.replace(/[^\d]/g,'')"/>
              <span
              class="noNull-style"
              v-if="flag!=0 && (specSort == undefined || specSort == null || specSort == '')"
              >*必填项</span>
            </td>
            <td class="td-class-radio">
              <a-radio-group class="radio-font" :options="specOptions" v-model="specVal" />
            </td>
          </tr>

          <tr class="tr-style">
            <td class="td-class">班级</td>
            <td class="td-class"><a-input class="num-rule-input" v-model="clazzDigit" v-on:blur="checkClazzDigit()" oninput="value=value.replace(/[^\d]/g,'')" />
              <span
              class="noNull-style"
              v-if="flag!=0 && (clazzDigit == undefined || clazzDigit == null || clazzDigit == '')"
              >*必填项</span>
            </td>
            <td class="td-class"><a-input class="num-rule-input" v-model="clazzSort" oninput="value=value.replace(/[^\d]/g,'')"/>
              <span
              class="noNull-style"
              v-if="flag!=0 && (clazzSort == undefined || clazzSort == null || clazzSort == '')"
              >*必填项</span>
            </td>
            <td class="td-class-radio">
              <a-radio-group class="radio-font" :options="clazzOptions" v-model="clazzVal" />
            </td>
          </tr>

          <tr class="tr-style">
            <td class="td-class">流水号</td>
            <td class="td-class"><a-input class="num-rule-input" v-model="numDigit" v-on:blur="checkNumDigit()" oninput="value=value.replace(/[^\d]/g,'')"/>
              <span
              class="noNull-style"
              v-if="flag!=0 && (numDigit == undefined || numDigit == null || numDigit == '')"
              >*必填项</span>
            </td>
            <td class="td-class"><a-input class="num-rule-input" v-model="numSort" oninput="value=value.replace(/[^\d]/g,'')"/>
              <span
              class="noNull-style"
              v-if="flag!=0 && (numSort == undefined || numSort == null || numSort == '')"
              >*必填项</span>
            </td>
            <td class="td-class-radio">
              <a-radio-group class="radio-font" :options="numOptions" v-model="numVal" />
            </td>
          </tr>
          
        </table>
		<div style="text-align: center; margin: 10px;">
        <a-button type="primary" @click="saveNumRule">保存</a-button>
		</div>
        <div class="pointout-div">
          <br />
          <div class="font-div">
            温馨提示：<br />
            至少需要启用3条规则才允许生成学号;“位数”对年份和流水号有效;专业和班级按学生所属专业和班级代码取值;<br />
            年份按学生入学年份取值;流水号是新生在所在专业的注册序号，系统自动生成.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { Icon } from 'ant-design-vue'

import { axios } from '@/utils/request'

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2390461_f6v2cx4wmzq.js',
})

export default {
  data() {
    return {
      flag: 0,
      ruleList: [],
      /* 位数 */
      yearDigit: '',
      specDigit: '',
      clazzDigit: '',
      numDigit: '',
      /* 排序 */
      yearSort: '',
      specSort: '',
      clazzSort: '',
      numSort: '',
      /* 单选框的值 */
      yearVal: 0,
      specVal: 0,
      clazzVal: 0,
      numVal: 0,
      /* 单选框 */
      yearOptions: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 },
      ],
      specOptions: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 },
      ],
      clazzOptions: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 },
      ],
      numOptions: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 },
      ],
    }
  },
  mounted() {
    this.getRuleList()
  },

  components: {
    IconFont,
  },
  methods: {

    checkYearDigit(){
      if(!(this.yearDigit == 2 || this.yearDigit == 4) ){
        this.$message.warning("年份的位数必须是2位或4位数！");
        this.yearDigit = 2;
      }
    },
    checkNumDigit(){
      if(this.numDigit < 3){
        this.$message.warning("流水号的位数不能小于3位数！");
        this.numDigit = 3;
      }else if(this.numDigit >= 10){
        this.$message.warning("流水号的位数不能大于9位数！");
        this.numDigit = 3;
      }
    },
    checkSpecDigit(){
      if(this.specDigit >= 10){
        this.$message.warning("专业的位数不能大于9位数！");
        this.specDigit = 1;
      }
    },
    checkClazzDigit(){
      if(this.clazzDigit >= 10){
        this.$message.warning("班级的位数不能大于9位数！");
        this.clazzDigit = 1;
      }
    },
    saveNumRule() {

      if(this.yearSort == "" || this.specSort == "" || this.clazzSort == "" || this.numSort=="" || this.yearDigit=="" || this.specDigit=="" || this.clazzDigit=="" || this.numDigit==""){
        this.$message.warning("请填写完整！");
        return;
      }

      if(!(this.yearDigit == 2 || this.yearDigit == 4) ){
        this.$message.warning("年份的位数必须是2位或4位数！");
        return;
      }

      if(this.numDigit < 3){
        this.$message.warning("流水号的位数不能小于3位数！");
        return;
      }

      if(this.specDigit >= 10 || this.clazzDigit >= 10 || this.yearSort >= 10 || this.specSort >= 10 || this.clazzSort >= 10 || this.numSort >= 10 || this.numDigit >= 10){
        this.$message,warning("所填位数不能大于9位数！");
        return;
      }

      let count = this.yearVal+this.specVal+this.clazzVal+this.numVal;
     
      if(count < 3){
        this.$message.warning("至少需要启用3条规则！");
        return;
      }

      axios({
        url: 'enroll/numRuleSet/save',
        method: 'post',
        params: {
          "yearDigit": this.yearDigit,
          "numDigit": this.numDigit,
          "specDigit": this.specDigit,
          "clazzDigit": this.clazzDigit,
          "yearSort": this.yearSort,
          "specSort": this.specSort,
          "clazzSort": this.clazzSort,
          "numSort": this.numSort,
          "yearVal": this.yearVal,
          "specVal": this.specVal,
          "clazzVal": this.clazzVal,
          "numVal": this.numVal,
        },
      })
        .then((res) => {
         
          if(res.code == 500){
            this.$message.warning(res.message);
            return;
          }
          this.$message.success(res.result);
          this.getRuleList();
          
        })
        .catch((err) => {
          this.$message.warning('保存失败！');
        })
      
    },
    getRuleList() {
      axios({
        url: 'enroll/numRuleSet/select',
        method: 'post',
        params: {},
      })
        .then((res) => {
          
          this.ruleList = res.result
          this.yearDigit = this.ruleList[0].digit
          this.specDigit = this.ruleList[1].digit
          this.clazzDigit = this.ruleList[2].digit
          this.numDigit = this.ruleList[3].digit

          this.yearSort = this.ruleList[0].listSort
          this.specSort = this.ruleList[1].listSort
          this.clazzSort = this.ruleList[2].listSort
          this.numSort = this.ruleList[3].listSort

          this.yearVal = this.ruleList[0].status
          this.specVal = this.ruleList[1].status
          this.clazzVal = this.ruleList[2].status
          this.numVal = this.ruleList[3].status
          this.flag = 1;
        })
        .catch((err) => {
          this.$message.warning('获取规则列表失败')
        })
    },
  },
}
</script>

<style>

.noNull-style{
  font-family: Microsoft YaHei;
  font-weight: 700;
  color: #a83939;
  line-height: 24px;
  margin-left: 2px;
}

.pointout-div {
  width: 1499px;
  height: 130px;
  background-color: #dee2e6;
}

.font-div {
  width: 1223px;
  height: 29px;
  font-family: Microsoft YaHei;
  font-weight: 700;
  color: #3581a6;
  line-height: 28px;
  margin-left: 15px;
}

.num-rule-input {
  width: 60px;
  height: 34px;
  background: rgba(255, 255, 255, 0);
  border: 1px solid rgb(217, 237, 244);
  border-radius: 3px;
}

.xhRuleDiv {
  height: 700px;
}

.head-style {
  height: 60px;
  background: #66c3fd;
}

.td-style {
  width: 375.5px;
  text-align: center;
  color: #ffffff;
}

.td-class,.td-class-radio {
  height: 18px;
  color: #999999;
}

.td-class {
	text-align:center;
}

.td-class-radio {
  text-align: center;
}

.xhrule-tb {
  margin-top: 30px;
}

.radio-font .span.ant-radio + * {
  padding-right: 8px;
  padding-left: 8px;
  height: 19px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #666666;
}

.save-btn {
  width: 100px;
  height: 40px;
  background: #028be2;
  color: white;
  font-size: 20px;
  margin: 30px 45%;
}

.save-btn,
.save-btn:hover,
.save-btn:active,
.save-btn:focus {
  color: white;
  background: #028be2;
}


</style>