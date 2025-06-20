
<template>
  <div  class='constbox'>
    <div class="pageContentBox">
      <table class="scanTable top-div" style="text-align: left">
        <tr>
          <td colspan="4" class="tr-color">
            <span class="title-style">基本信息</span>
          </td>
        </tr>

        <tr class="tr-style">
          <td class="td-div">
            <div class="font-style">姓名</div>
          </td>
          <td class="double">
            <a-input class="input-style-reply" v-model.trim="ApplyObj.xm" v-on:blur="nameBule()"></a-input>
            <span
              class="nonull-tip"
              v-if="num != 0 && !(this.ApplyObj.xm != undefined && this.ApplyObj.xm.length > 0)"
              >*必填项</span
            >
          </td>
          <td class="td-div">
            <div class="font-style">身份证号</div>
          </td>
          <td class="double">
            <a-input class="input-style-reply" v-model.trim="ApplyObj.sfzh" v-on:blur="idCheck()"></a-input>
            <span
              class="nonull-tip"
              v-if="num != 0 && !(this.ApplyObj.sfzh != undefined && this.ApplyObj.sfzh.length > 0)"
              >*必填项</span
            >
          </td>
        </tr>

        <tr class="tr-style">
          <td class="td-div">
            <div class="font-style">曾用名</div>
          </td>
          <td class="double">
            <a-input class="input-style-reply" v-model.trim="ApplyObj.cym" v-on:blur="oldNameBule()"></a-input>
          </td>
          <td class="td-div">
            <div class="font-style">性别</div>
          </td>
          <td class="double">
            <a-radio-group v-model="ApplyObj.xbm" @change="onChangeSex" class="input-style-reply">
              <a-radio :value="1"> 男 </a-radio>
              <a-radio :value="2"> 女 </a-radio>
            </a-radio-group>
          </td>
        </tr>
        <tr class="tr-style">
          <td class="td-div">
            <div class="font-style">出生日期</div>
          </td>
          <td class="double">
			  <DatePickByCN
			        v-model="ApplyObj.csrq"
			        placeholder="请选择出生日期"
			      />
          </td>
          <td class="td-div">
            <div class="font-style">政治面貌</div>
          </td>
          <td class="double">
            <!-- 政治面貌下拉框 -->
            <a-select class="input-style-reply" :options="politic" placeholder="请选择" v-model="ApplyObj.zzmmm" />
          </td>
        </tr>

        <tr class="tr-style">
          <td class="td-div">
            <div class="font-style">籍贯</div>
          </td>
          <td class="double">
            <a-input class="input-style-reply" v-model.trim="ApplyObj.jg"></a-input>
          </td>
          <td class="td-div">
            <div class="font-style">民族</div>
          </td>
          <td class="double">
            <!-- 民族下拉框 -->
            <a-select class="input-style-reply" :options="nation" placeholder="请选择" v-model="ApplyObj.mzm" />
          </td>
        </tr>

        <tr class="tr-style">
          <td class="td-div">
            <div class="font-style">健康状况</div>
          </td>
          <td class="double">
            <!-- 健康状况下拉框 -->
            <a-select class="input-style-reply" :options="healthy" placeholder="请选择" v-model="ApplyObj.jkzkm" />
          </td>
          <td class="td-div">
            <div class="font-style">毕业学校</div>
          </td>
          <td class="double">
            <a-input class="input-style-reply" v-model.trim="ApplyObj.byxx"></a-input>
          </td>
        </tr>

        <tr class="tr-style">
          <td class="td-div">
            <div class="font-style">户口类别</div>
          </td>
          <td class="double">
            <!-- 户口类别下拉框 -->
            <a-select class="input-style-reply" :options="residence" placeholder="请选择" v-model="ApplyObj.hklbm" />
          </td>
          <td class="td-div">
            <div class="font-style">是否低保</div>
          </td>
          <td class="double">
            <a-radio-group v-model="ApplyObj.sfdb" @change="onChangezslx" class="input-style-reply">
              <a-radio :value="1"> 是 </a-radio>
              <a-radio :value="0"> 否 </a-radio>
            </a-radio-group>
          </td>
        </tr>

        <tr class="tr-style">
          <td class="td-div">
            <div class="font-style">招生类型</div>
          </td>
          <td class="double">
            <a-radio-group v-model="ApplyObj.zslx" @change="onChangezslx" class="input-style-reply">
              <a-radio :value="1"> 统一招生 </a-radio>
              <a-radio :value="2"> 自主招生 </a-radio>
            </a-radio-group>
          </td>
          <td class="td-div">
            <div class="font-style">准考证号</div>
          </td>
          <td class="double">
            <a-input class="input-style-reply" v-model.trim="ApplyObj.zkzh"></a-input>
          </td>
        </tr>

        <tr class="tr-style">
          <td class="td-div">
            <div class="font-style">考生号</div>
          </td>
          <td class="double">
            <a-input class="input-style-reply" v-model.trim="ApplyObj.ksh"></a-input>
          </td>
          <td class="td-div">
            <div class="font-style">考试总分</div>
          </td>
          <td class="double">
            <a-input class="input-style-reply" v-model.trim="ApplyObj.kszf" v-on:blur="numCheck()"></a-input>
          </td>
        </tr>
      </table>

      <table class="scanTable" style="text-align: left; margin-top: 20px">
        <tr>
          <td colspan="4" class="tr-color">
            <span class="title-style">报名信息</span>
          </td>
        </tr>

        <tr class="tr-style">
          <td class="td-div">
            <div class="font-style">专业部</div>
          </td>
          <td class="double">
            <a-select
              class="input-style-reply"
              :options="addfaculty"
              placeholder="请选择"
              @change="addfacultyChange"
              v-model="ApplyObj.falId"
            />
          </td>
          <td class="td-div">
            <div class="font-style">专业</div>
          </td>
          <td class="double">
            <a-select class="input-style-replyTwo" :options="addspecialty" placeholder="请选择" v-model="ApplyObj.specId" />
            <a-button type="primary" icon="search" style="margin-left: 10px;" @click="clear">
              
              清除
            </a-button>
          </td>
        </tr>

        <tr class="tr-style">
          <td class="td-div">
            <div class="font-style">学制</div>
          </td>
          <td class="double">
            <a-select class="input-style-reply" :options="xuzhi" placeholder="请选择学制" v-model="ApplyObj.xz" />
            <span class="nonull-tip" v-if="num != 0 && this.ApplyObj.xz == undefined">*必填项</span>
          </td>
          <td class="td-div">
            <div class="font-style">就读方式</div>
          </td>
          <td class="double">
            <a-radio-group v-model="ApplyObj.jdfs" @change="onChangejdfs" class="input-style-reply">
              <a-radio :value="1"> 住校 </a-radio>
              <a-radio :value="2"> 走读 </a-radio>
            </a-radio-group>
          </td>
        </tr>
      </table>

      <table class="scanTable" style="text-align: left; margin-top: 20px">
        <tr>
          <td colspan="4" class="tr-color">
            <span class="title-style">联系方式</span>
          </td>
        </tr>

        <tr class="tr-style">
          <td class="td-div">
            <div class="font-style">户籍所在地</div>
          </td>
          <td colspan="3" class="double">
            <!-- 省份下拉框 -->
            <a-select
              class="input-style-reply"
              :options="province"
              placeholder="请选择省份"
              @change="cityChange"
              v-model="ApplyObj.provinceId"
            />

            <!-- 市级下拉框 -->
            <a-select
              class="input-style-reply"
              :options="city"
              placeholder="请选择市区"
              @change="countyChange"
              v-model="ApplyObj.cityId"
            />

            <!-- 县级下拉框 -->
            <a-select class="input-style-reply" :options="county" placeholder="请选择县区" v-model="ApplyObj.countyId" />

            <a-button type="primary" icon="search" style="margin-left: 10px;" @click="clearArea">
              
              清除
            </a-button>
          </td>
        </tr>

        <tr class="tr-style">
          <td class="td-div">
            <div class="font-style">家庭邮编</div>
          </td>
          <td class="double">
            <a-input class="input-style-reply" v-model.trim="ApplyObj.jtyb" v-on:blur="checkCode()"></a-input>
          </td>
          <td class="td-div">
            <div class="font-style">家庭联系电话</div>
          </td>
          <td class="double">
            <a-input class="input-style-reply" v-model.trim="ApplyObj.jtlxdh" v-on:blur="phone()"></a-input>
            <span
              class="nonull-tip"
              v-if="num != 0 && !(this.ApplyObj.jtlxdh != undefined && this.ApplyObj.jtlxdh.length > 0)"
              >*必填项</span
            >
          </td>
        </tr>
        <tr class="tr-style">
          <td class="td-div">
            <div class="font-style">详细家庭地址</div>
          </td>
          <td class="double">
            <a-input class="input-style-reply" v-model.trim="ApplyObj.jtdz" v-on:blur="adressCheck()"></a-input>
            <span
              class="nonull-tip"
              v-if="num != 0 && !(this.ApplyObj.jtdz != undefined && this.ApplyObj.jtdz.length > 0)"
              >*必填项</span
            >
          </td>
          <td class="td-div">
            <div class="font-style">学生联系电话</div>
          </td>
          <td class="double">
            <a-input class="input-style-reply" v-model.trim="ApplyObj.xslxdh" v-on:blur="phone()"></a-input>
          </td>
        </tr>

        <tr class="tr-style">
          <td class="td-div">
            <div class="font-style">电子邮箱</div>
          </td>
          <td class="double">
            <a-input class="input-style-reply" v-model.trim="ApplyObj.dzxx" v-on:blur="email()"></a-input>
          </td>
          <td class="td-div">
            <div class="font-style">即时通讯号</div>
          </td>
          <td class="double">
            <a-input class="input-style-reply" v-model.trim="ApplyObj.jstxh" v-on:blur="phone()"></a-input>
          </td>
        </tr>

        <tr>
          <td colspan="4" class="tr-color">
            <span class="title-style">其他信息</span>
          </td>
        </tr>

        <tr class="tr-style">
          <td class="td-div">
            <div class="font-style">特长</div>
          </td>
          <td colspan="3" class="double">
            <a-input class="input-style-reply" v-model="ApplyObj.tc"></a-input>
          </td>
        </tr>
      </table>

      <!-- 按钮区 -->
      <div class="content-head">
        <div class="applyBtn-div">
          <a-row>
            <a-col :span="10"> </a-col>
            <a-col :span="8">
              <a-button class="search-button btn-style btn" @click="tip"> 确定 </a-button>
              <a-button class="search-button btn-style btn-cancle" @click="cancel"> 取消 </a-button>
            </a-col>
            <a-col :span="6"> </a-col>
          </a-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { axios } from '@/utils/request'

export default {
  data() {
    return {
      ApplyObj: {
        xbm: 1,
        sfdb: 1,
        jdfs: 1,
        zslx: 1,
        provinceId: '',
        cityId: '',
        countyId: '',
        specId: '',
        yxmc: '',
        zymc: '',
        province: '',
        city: '',
        county: '',
      }, //弹窗对象
      //下拉框数据
      addfaculty: [],
      addspecialty: [],
      province: [],
      city: [],
      county: [],
      xuzhi: [],
      politic: [],
      healthy: [],
      nation: [],
      residence: [],
      num: 0,
      falId: 0,
      specId: 0,
      provinceId: 0,
      cityId: 0,
      countyId: 0,
    }
  },
  mounted() {
    this.getaddFaculty()
    this.getProvince()
    this.getXuzhi()
    this.getPolitic()
    this.getHealthy()
    this.getNation()
    this.getResidence()
    this.clearArea()
    this.clear()
  },
  methods: {
    //添加
    tip() {
      let xz = this.ApplyObj.xz

      this.num = 1
      //获取院校名称
      for (let addfaculty of this.addfaculty) {
        if (addfaculty.value == this.ApplyObj.falId) {
          this.ApplyObj.yxmc = addfaculty.label
        }
      }
      //获取专业名称
      for (let addspecialty of this.addspecialty) {
        if (addspecialty.value == this.ApplyObj.specId) {
          this.ApplyObj.zymc = addspecialty.label
        }
      }
      if (this.ApplyObj.zymc == '') {
        this.$message.warning('请填完专业相关信息')
        return
      }
      //获取省
      for (let p of this.province) {
        if (p.value == this.ApplyObj.provinceId) {
          this.ApplyObj.province = p.label
        }
      }
      //获取市
      for (let c of this.city) {
        if (c.value == this.ApplyObj.cityId) {
          this.ApplyObj.city = c.label
        }
      }
      //获取县
      for (let c of this.county) {
        if (c.value == this.ApplyObj.countyId) {
          this.ApplyObj.county = c.label
        }
      }
      if (this.ApplyObj.county == '') {
        this.$message.warning('请填完户籍所在地信息')
        return
      }


      let xm = this.ApplyObj.xm
      let sfzh = this.ApplyObj.sfzh
      let jtdz = this.ApplyObj.jtdz
      let jtlxdh = this.ApplyObj.jtlxdh

      if (
        xm == '' ||
        xm == undefined ||
        sfzh == '' ||
        sfzh == undefined ||
        xz == '' ||
        jtdz == '' ||
        jtdz == undefined ||
        jtlxdh == undefined ||
        jtlxdh == ''
      ) {
        this.$message.warning('请填完必填项')
        return
      } else {
        //出生日期格式修改
        if (this.ApplyObj.csrq == '' || this.ApplyObj.csrq == undefined) {
          this.ApplyObj.csrq == ''
        } else {
          let d = new Date(this.ApplyObj.csrq)
          let youWant = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
          this.ApplyObj.csrq = youWant
        }
        console.log(this.ApplyObj)
        axios({
          url: 'enroll/OnlineApply/onlineCreate',
          method: 'post',
          params:this.ApplyObj,

        })
          .then((res) => {
            if(res.code==200){
                 this.$message.success(res.message);
                 this.cancel();
                 return;
            }
                 this.$message.warning(res.message);

            
          })
          .catch((err) => {
            this.$message.warning("添加失败！");
          })
      }
    },


    //取消按钮
    cancel() {
      this.ApplyObj = {
        xbm: 1,
        sfdb: 1,
        jdfs: 1,
        zslx: 1,
        // provinceId: '',
        // cityId: '',
        countyId: '',
        specId: '',
        // yxmc: '',
        // zymc: '',
        // province: '',
        // city: '',
        // county: '',
      }
      this.num = 0
      this.clearArea()
      this.clear()
    },
    //数据校验环节
    //校验不为空
    nameBule() {
      let xm = this.ApplyObj.xm
      if (xm != undefined && xm.length > 0) {
      } else {
        this.$message.warning('姓名不能为空')
        this.num = 1
      }
      this.oldNameBule()
    },
    //校验地址不为空
    adressCheck() {
      let jtdz = this.ApplyObj.jtdz
      if (jtdz != undefined && jtdz.length > 0) {
      } else {
        this.$message.warning('详细地址很重要，请详细填写')
        this.num = 1
      }
    },
    //曾用名校验
    oldNameBule() {
      let xm = this.ApplyObj.xm
      let cym = this.ApplyObj.cym

      if (cym != undefined && cym.length > 0 && xm != undefined && xm.length > 0 && xm == cym) {
        this.$message.warning('曾用名不能和姓名一致')
        //清空曾用名
        this.ApplyObj.cym = ''
      }
    },
    // 验证是否是邮箱
    email() {
      let dzxx = this.ApplyObj.dzxx
      let emailRule = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
      if (!emailRule.test(dzxx) && dzxx != undefined) {
        this.$message.warning('请输入正确的邮箱地址')
        //清空邮箱
        this.ApplyObj.dzxx = ''
      }
    },
    // 验证是否是手机号码
    phone() {
      let jtlxdh = this.ApplyObj.jtlxdh
      let jstxh = this.ApplyObj.jstxh
      let xslxdh = this.ApplyObj.xslxdh
      let phoneRule = /^[1][3,4,5,7,8][0-9]{9}$/
      if (!phoneRule.test(jtlxdh) && jtlxdh != undefined) {
        this.$message.warning('请输入正确的手机号码')
        //清空手机号
        this.ApplyObj.jtlxdh = ''
        this.num = 1
      }
      if (!phoneRule.test(jstxh) && jstxh != undefined) {
        this.$message.warning('请输入正确的手机号码')
        //清空手机号
        this.ApplyObj.jstxh = ''
      }
      if (!phoneRule.test(xslxdh) && xslxdh != undefined) {
        this.$message.warning('请输入正确的手机号码')
        //清空手机号
        this.ApplyObj.xslxdh = ''
      }
    },
    // 验证是否是身份证
    idCheck() {
      let sfzh = this.ApplyObj.sfzh
      let idRule = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[X])$)$/
      if (!idRule.test(sfzh) && sfzh != undefined) {
        this.$message.warning('请输入正确的身份证号')
        //清空身份证
        this.ApplyObj.sfzh = ''
        this.num = 1
      }
    },
    onChange(date, dateString) {
      console.log(date, dateString)
    },
    // 验证邮政编码
    checkCode() {
      let jtyb = this.ApplyObj.jtyb
      let codeRule = /^[1-9][0-9]{5}$/
      if (!codeRule.test(jtyb) && jtyb != undefined) {
        this.$message.warning('请输入正确的邮政编码')
        //清除邮政编码
        this.ApplyObj.jtyb = ''
      }
    },
    // 验证成绩
    numCheck() {
      let kszf = this.ApplyObj.kszf
      let numRule = /^[+-]?(0|([1-9]\d*))(\.\d{1})?$/
      if (!numRule.test(kszf) && kszf != undefined) {
        this.$message.warning('请输入正确的考试分数（仅一位小数）')
        //清除成绩
        this.ApplyObj.kszf = ''
        return
      }
      if (!(kszf > 0 && kszf <= 750)) {
        this.$message.warning('考试分数在0-750之间')
        //清除成绩
        this.ApplyObj.kszf = ''
      }
    },

    onChange(date, dateString) {
      console.log(date, dateString)
    },

    //选择性别
    onChangeSex() {
      console.log('radio checked', this.ApplyObj.xbm)
    },
    //选择是否低保
    onChangedb() {
      console.log('radio checked', this.ApplyObj.sfdb)
    },
    //选择就读方式
    onChangejdfs() {
      console.log('radio checked', this.ApplyObj.jdfs)
    },
    //选择招生类型
    onChangezslx() {
      console.log('radio checked', this.ApplyObj.zslx)
    },

    //清除
    clear() {
      this.ApplyObj.falId = []
      this.ApplyObj.specId = []
      this.addspecialty = []
    },
    //清除
    clearArea() {
      this.ApplyObj.cityId = []
      this.ApplyObj.countyId = []
      this.ApplyObj.provinceId = []
      this.city = []
      this.county = []
    },
    //获取专业部
    getaddFaculty() {
      axios({
        url: 'enroll/reportMng/getFaculty',
        method: 'post',
        params: {},
      })
        .then((res) => {
          for (let addfaculty of res.result) {
            this.addfaculty.push({
              value: addfaculty.id,
              label: addfaculty.yxmc,
            })
          }
        })
        .catch((err) => {
          this.$message.warning('获取专业部失败')
        })
    },
    //获取联动专业
    addfacultyChange(value) {
      this.addspecialty = []
      this.ApplyObj.specId = []

      if (value.length == 0) {
        return
      }

      axios({
        url: 'enroll/reportMng/getSpecialty',
        method: 'post',
        params: {
          facultyId: this.ApplyObj.falId,
        },
      })
        .then((res) => {
          this.addspecialty.splice(0, this.addspecialty.length)
          for (let addspecialty of res.result) {
            this.addspecialty.push({
              value: addspecialty.id,
              label: addspecialty.zymc,
            })
          }
        })
        .catch((err) => {
          this.$message.warning('获取专业失败')
        })
    },
    //获取政治面貌列表
    getPolitic() {
      axios({
        url: 'enroll/ApplyMsgMng/getSysDict',
        method: 'post',
        params: {
          dictCode: 'politic',
        },
      })
        .then((res) => {
          for (let politic of res.result) {
            this.politic.push({
              value: politic.id,
              label: politic.itemText,
            })
          }
        })
        .catch((err) => {
          this.$message.warning('获取政治面貌列表失败')
        })
    },
    //获取民族列表
    getNation() {
      axios({
        url: 'enroll/ApplyMsgMng/getSysDict',
        method: 'post',
        params: {
          dictCode: 'nation',
        },
      })
        .then((res) => {
          for (let nation of res.result) {
            this.nation.push({
              value: nation.id,
              label: nation.itemText,
            })
          }
        })
        .catch((err) => {
          this.$message.warning('获取民族列表失败')
        })
    },
    //获取户口类别列表
    getResidence() {
      axios({
        url: 'enroll/ApplyMsgMng/getSysDict',
        method: 'post',
        params: {
          dictCode: 'residence',
        },
      })
        .then((res) => {
          for (let residence of res.result) {
            this.residence.push({
              value: residence.id,
              label: residence.itemText,
            })
          }
        })
        .catch((err) => {
          this.$message.warning('获取户口类别列表失败')
        })
    },
    //获取健康状态列表
    getHealthy() {
      axios({
        url: 'enroll/ApplyMsgMng/getSysDict',
        method: 'post',
        params: {
          dictCode: 'healthy',
        },
      })
        .then((res) => {
          for (let healthy of res.result) {
            this.healthy.push({
              value: healthy.id,
              label: healthy.itemText,
            })
          }
        })
        .catch((err) => {
          this.$message.warning('获取健康状态列表失败')
        })
    },
    //获取省份列表
    getProvince() {
      axios({
        url: 'enroll/ApplyMsgMng/getProvince',
        method: 'post',
        params: {},
      })
        .then((res) => {
          for (let province of res.result) {
            this.province.push({
              value: province.id,
              label: province.name,
            })
          }
        })
        .catch((err) => {
          this.$message.warning('获取省份列表失败')
        })
    },
    //获取市区列表
    cityChange(value) {
      this.city = []
      this.county = []
      this.ApplyObj.cityId = []
      this.ApplyObj.countyId = []

      if (value.length == 0) {
        return
      }

      axios({
        url: 'enroll/ApplyMsgMng/getCity',
        method: 'post',
        params: {
          id: this.ApplyObj.provinceId,
        },
      })
        .then((res) => {
          this.city.splice(0, this.addspecialty.length)
          for (let city of res.result) {
            this.city.push({
              value: city.id,
              label: city.name,
            })
          }
        })
        .catch((err) => {
          this.$message.warning('获取市区失败')
        })
    },
    //获取县区
    countyChange(value) {
      this.county = []
      this.ApplyObj.countyId = []

      if (value.length == 0) {
        return
      }

      axios({
        url: 'enroll/ApplyMsgMng/getCity',
        method: 'post',
        params: {
          id: this.ApplyObj.cityId,
        },
      })
        .then((res) => {
          this.county.splice(0, this.addspecialty.length)
          for (let county of res.result) {
            this.county.push({
              value: county.id,
              label: county.name,
            })
          }
        })
        .catch((err) => {
          this.$message.warning('获取县区失败')
        })
    },
    //获取学制
    getXuzhi() {
      axios({
        url: 'enroll/ApplyMsgMng/getXuezi',
        method: 'post',
        params: {},
      })
        .then((res) => {
          for (let xuzhi of res.result) {
            this.xuzhi.push({
              value: xuzhi.id,
              label: xuzhi.xzmc,
            })
          }
        })
        .catch((err) => {
          this.$message.warning('获取学制列表失败')
        })
    },
  },
}
</script>

<style scoped>
.tb {
  text-align: left;
}
/* 标题样式 */
.title-style {
  width: 76px;
  height: 19px;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 700;
  margin-left: 23px;
  color: #ffffff;
  line-height: 24px;
}
/* 表行高样式 */
.tr-style {
  height: 49px;
  border: 1px solid #dee2e6;
}
/* 行颜色 */
.tr-color {
  height: 60px;
  width: 1500px;
  background: #66c3fd;
}
.input-style-reply {
  color: #666666;
  width: 300px;
  background-color: #ffffff;
  border: 0;
  margin-left: 5px;
}
.input-style-replyTwo {
  color: #666666;
  width: 200px;
  background-color: #ffffff;
  border: 0;
  margin-left: 5px;
}

.td-div {
  width: 259px;
}


.applyBtn-div {
  width: 100%;
}


.top-div {
  margin-top: 22px;
}


.r-style {
  font-size: 18px;
}

.icon-img {
  margin-bottom: 5px;
  margin-right: 1px;
}

.info-tip {
  width: 94px;
  height: 19px;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 700;
  color: #666666;
  line-height: 24px;
}

 .date-style-Apply .ant-input {
  width: 300px;
  height: 34px;
}
</style>
