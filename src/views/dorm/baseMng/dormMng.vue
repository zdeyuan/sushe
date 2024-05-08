<template>
  <div style="background:#E9EDF6; padding:30px">
    <div class="content-title">
    	宿舍管理
    </div>
		<div class="pageContentBox">
		  <div class="headTop">基础管理 > <span class="notTop">宿舍管理</span></div>
      <div class="content-head">
        <div>
          <a-button :size="size" class="content-button button-lightgreen" style="font-size:16px;width:88px;height:34px;background-color:#3a3aff " @click="showModal">
            <icon-font type="icontianjia" style="color: #FFFFFF;" />
            添加
          </a-button>
          <a-modal title="添加宿舍" :visible="visible" :confirm-loading="confirmLoading" @ok="handleOk" @cancel="handleCancel"
            :width="1000">
            <table class="scanTable">
              <tr>
                <td class="single">
                  <div>宿舍名称:</div>
                </td>
                <td class="double">
                  <a-input class="scanInput" placeholder="请输入宿舍名称" v-model="name"></a-input>
                </td>
                <td class="single">
                  <div>可用床位:</div>
                </td>
                <td class="double">
                  <a-input-number class="scanInput" placeholder="请输入床位数" v-model="bedNum"></a-input-number>
                </td>
              </tr>
              <tr>
                <td class="single">
                  <div>所在宿舍楼:</div>
                </td>
                <td class="double">
                  <a-cascader style="width: 140px;" ref="school" :options="scanSchool" placeholder="请选择校区" @change="scanSchoolChange"
                    v-model="scanSchoolId" />
                  <a-cascader style="width: 140px;" ref="school" :options="scanBuild" placeholder="请选择宿舍楼" @change="scanBuildChange"
                    v-model="scanBuildId" />
                </td>
                <td class="single">
                  <div>所在楼层:</div>
                </td>
                <td class="double">
                  <a-cascader style="width: 140px;" ref="school" :options="scanFloor" placeholder="请选择楼层" v-model="scanFloorId" />
                </td>
              </tr>
              <tr>
                <td class="single">
                  <div>电表止码:</div>
                </td>
                <td class="double">
                  <a-input-number class="scanInput" placeholder="请输入电表止码" v-model="eleCode"></a-input-number>
                </td>
                <td class="single">
                  <div>水表止码:</div>
                </td>
                <td class="double">
                  <a-input-number class="scanInput" placeholder="请输入水表止码" v-model="waterCode"></a-input-number>
                </td>
              </tr>
              <tr>
                <td class="single">
                  <div>是否有电视:</div>
                </td>
                <td class="double">
                  <a-cascader class="scanInput" :options="yon" placeholder="是否有电视" v-model="tv" />
                </td>
                <td class="single">
                  <div>电话号码:</div>
                </td>
                <td class="double">
                  <a-input class="scanInput" placeholder="请输入电话号码" v-model="phone"></a-input>
                </td>
              </tr>
              <tr>
                <td class="single">
                  <div>是否有网络:</div>
                </td>
                <td class="double">
                  <a-cascader class="scanInput" :options="yon" placeholder="是否有网络" v-model="wlan" />
                </td>
                <td class="single">
                  <div>是否有洗手间:</div>
                </td>
                <td class="double">
                  <a-cascader class="scanInput" :options="yon" placeholder="是否有洗手间" v-model="wc" />
                  </a-input>
                </td>
              </tr>
              <tr>
                <td class="single">
                  <div>使用性别:</div>
                </td>
                <td class="double">
                  <a-cascader :disabled="true" style="width: 140px;" ref="school" :options="sex" placeholder="请选择使用性别" v-model="sexId" />
                </td>
                <td class="single">
                  <div>是否可用:</div>
                </td>
                <td class="double">
                  <label v-for="(item, index) in radioName"> {{ item.value }}
                    <input type="radio" name="approveResult" :value="index" v-model="checkedValue">
                  </label>
                </td>
              </tr>
            </table>
            <template slot="footer">
              <a-button type="primary" style="background-color:#0098f8;font-weight:bold;color:#ffffff" @click="handleOk()">确定</a-button>
              <a-button style="background-color:#999999;font-weight:bold;color:#ffffff" @click="handleCancel()">取消</a-button>
            </template>
          </a-modal>

          <a-button :size="size" class="content-button button-blue button-after" style="font-size:16px;width:88px;height:34px; " @click="showUpload">
            <icon-font type="iconfanhui" style="color: #FFFFFF;" />
            导入
          </a-button>
          <a-modal v-model="upload" title="导入" @ok="uploadCancel" @cancel="uploadCancel">
            <table class="scanTable">
              <tr>
                <td class="single">导入模版</td>
                <td class="double">
                  <a style="font-size: 14px; margin-left: 20px;" @click="handleExportXls('宿舍')">点击下载</a>
                </td>
              </tr>
              <tr>
                <td class="single">选择Excel表格</td>
                <td class="double">
                  <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="url.importExcelUrl"
                    @change="handleImportExcel">
                    <a style="font-size: 14px; margin-left: 20px; color:black">选择文件</a>
                    <a-input style="font-size: 14px; margin-left: 20px; width:100px;" placeholder="未选择文件" :disabled="true" v-model="fileName"/>
                  </a-upload>
                </td>
              </tr>
            </table>
          </a-modal>

          <a-button :size="size" class="content-button button-skyblue button-after" style="font-size:16px;width:88px;height:34px;background-color:#3a3aff " @click="getDormList">
            <icon-font type="iconxindongfang-shuaxintubiao" style="color: #FFFFFF;" />
            刷新
          </a-button>
        </div>

        <div>
          <span class="head-span">校区</span>
          <a-cascader class="condition" :options="school" placeholder="请选择校区" @change="schoolChange" v-model="schoolId" />
        </div>

        <div>
          <span class="head-span">宿舍楼</span>
          <a-cascader class="condition" :options="build" placeholder="请选择宿舍楼" @change="buildChange" v-model="buildId" />
        </div>

        <div>
          <span class="head-span">楼层</span>
          <a-cascader class="condition" :options="floor" placeholder="请选择楼层" v-model="floorId" />
        </div>

        <div>
          <a-button :size="size" class="content-button button-blue" style="font-size:16px;width:88px;height:34px;background-color:#1AE642 " @click="getDormList">
            <icon-font type="iconsousuo" style="color: #FFFFFF;" />
            搜索
          </a-button>

          <a-button :size="size" class="content-button button-orange button-after" style="font-size:16px;width:88px;height:34px;background-color:#E61A1A " @click="clearAll">
            <icon-font type="iconqingkong1" style="color: #FFFFFF;" />
            清空
          </a-button>
        </div>
      </div>
      <div>
        <a-table :columns="columns" :data-source="data" :defaultCurrent="6" :pagination="pagination" @change="tableChange">
          <span slot="operator" slot-scope="text, record">
            <a style="font-size:18px;font-weigth:bold;border-bottom: 1px solid #66C3FD;" @click="editDorm(record.key)">编辑</a>
            <span>|</span>
            <a style="font-size:18px;font-weigth:bold;color:orange; border-bottom: 1px solid orange;" @click="deleteDorm(record.key)">删除</a>
          </span>
        </a-table>
      </div>
    </div>
    <a-modal title="编辑宿舍" :visible="edit" :confirm-loading="confirmLoading" @ok="editOK" @cancel="editCancel"
      :width="1000">
      <table class="scanTable">
        <tr>
          <td class="single">
            <div>宿舍名称:</div>
          </td>
          <td class="double">
            <a-input class="scanInput" placeholder="请输入宿舍名称" v-model="name"></a-input>
          </td>
          <!-- <td class="single">
            <div>可用床位:</div>
          </td>
          <td class="double">
            <a-input-number class="scanInput" placeholder="请输入床位数" v-model="bedNum"></a-input-number>
          </td> -->
        </tr>
        <tr>
          <!-- <td class="single">
            <div>所在宿舍楼:</div>
          </td>
          <td class="double">
            <a-cascader style="width: 140px;" ref="school" :options="scanSchool" placeholder="请选择校区" @change="scanSchoolChange"
              v-model="scanSchoolId" />
            <a-cascader style="width: 140px;" ref="school" :options="scanBuild" placeholder="请选择宿舍楼" @change="scanBuildChange"
              v-model="scanBuildId" />
          </td> -->
          <td class="single">
            <div>所在楼层:</div>
          </td>
          <td class="double">
            <a-cascader style="width: 140px;" ref="school" :options="scanFloor" placeholder="请选择楼层" v-model="scanFloorId" />
          </td>
          <td class="single">
            <div>可用床位:</div>
          </td>
          <td class="double">
            <a-input-number class="scanInput" placeholder="请输入床位数" v-model="bedNum"></a-input-number>
          </td>
        </tr>
        <tr>
          <td class="single">
            <div>电表止码:</div>
          </td>
          <td class="double">
            <a-input-number class="scanInput" placeholder="请输入电表止码" v-model="eleCode"></a-input-number>
          </td>
          <td class="single">
            <div>水表止码:</div>
          </td>
          <td class="double">
            <a-input-number class="scanInput" placeholder="请输入水表止码" v-model="waterCode"></a-input-number>
          </td>
        </tr>
        <tr>
          <td class="single">
            <div>是否有电视:</div>
          </td>
          <td class="double">
            <a-cascader class="scanInput" :options="yon" placeholder="是否有电视" v-model="tv" />
          </td>
          <td class="single">
            <div>电话号码:</div>
          </td>
          <td class="double">
            <a-input class="scanInput" placeholder="请输入电话号码" v-model="phone"></a-input>
          </td>
        </tr>
        <tr>
          <td class="single">
            <div>是否有网络:</div>
          </td>
          <td class="double">
            <a-cascader class="scanInput" :options="yon" placeholder="是否有网络" v-model="wlan" />
          </td>
          <td class="single">
            <div>是否有洗手间:</div>
          </td>
          <td class="double">
            <a-cascader class="scanInput" :options="yon" placeholder="是否有洗手间" v-model="wc" />
            </a-input>
          </td>
        </tr>
        <tr>
          <td class="single">
            <div>使用性别:</div>
          </td>
          <td class="double">
            <a-cascader :disabled="true" style="width: 140px;" ref="school" :options="sex" placeholder="请选择使用性别" v-model="sexId" />
          </td>
          <td class="single">
            <div>是否可用:</div>
          </td>
          <td class="double">
            <label v-for="(item, index) in radioName"> {{ item.value }}
              <input type="radio" name="approveResult" :value="index" v-model="checkedValue">
            </label>
          </td>
        </tr>
      </table>
      <template slot="footer">
        <a-button type="primary" style="background-color:#0098f8;font-weight:bold;color:#ffffff" @click="editOK()">确定</a-button>
        <a-button style="background-color:#999999;font-weight:bold;color:#ffffff" @click="editCancel()">取消</a-button>
      </template>
    </a-modal>
  </div>


</template>

<script>
  import {
    Icon
  } from 'ant-design-vue';
  import {
    axios
  } from '@/utils/request';
  import {
    EduListMixin
  } from '@/mixins/EduListMixin';
  import {
    downFile
  } from '@/api/manage'

  const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2390461_vvis3tohqh.js',
  });

  const columns = [{
      title: '宿舍名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '可住人数',
      dataIndex: 'totalNum',
      key: 'totalNum',
    },
    {
      title: '已住人数',
      dataIndex: 'nowNum',
      key: 'nowNum',
    },
    {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '电表截止码',
      dataIndex: 'eleCode',
      key: 'eleCode',
    },
    {
      title: '水表截止码',
      dataIndex: 'waterCode',
      key: 'waterCode',
    },
    {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: '操作',
      dataIndex: 'operator',
      key: 'operator',
      scopedSlots: {
        customRender: 'operator'
      },
    },
  ];

  let data = [];

  export default {
    mixins: [EduListMixin],
    data() {
      return {
        pagination: {
          current: 1,
          pageSize: 10,
          pageSizeOptions: ['6', '10'],
          showTotal: (total, range) => {
            return '显示' + range[0] + '到' + range[1] + '条, 共' + total + '条记录'
          },
          showQuickJumper: true,
          showSizeChanger: true,
          total: 1000
        },
        /* 下拉框数据 */
        school: [],
        schoolId: [],
        build: [],
        buildId: [],
        floor: [],
        floorId: [],
        scanSchool: [],
        scanSchoolId: [],
        scanBuild: [],
        scanBuildId: [],
        scanFloor: [],
        scanFloorId: [],
        /* 表格数据 */
        data,
        columns,
        /* 按钮大小 */
        size: 'small',
        /* 添加-弹出框数据 */
        visible: false,
        confirmLoading: false,
        radioName: [{
          index: 1,
          value: '不可用'
        }, {
          index: 2,
          value: '可用'
        }],
        yon: [{
          value: 0,
          label: '无',
        }, {
          value: 1,
          label: '有'
        }],
        state: [{
          value: 0,
          label: '禁用',
        }, {
          value: 1,
          label: '正常',
        }, {
          value: 2,
          label: '维修'
        }, {
          value: 3,
          label: '报废'
        }],
        checkedValue: '',
        tv: [],
        wc: [],
        wlan: [],
        bedNum: '',
        eleCode: '',
        waterCode: '',
        phone: '',
        name: '',
        sex: [{
          value: 0,
          label: '暂无',
        }, {
          value: 1,
          label: '男',
        }, {
          value: 2,
          label: '女',
        }],
        sexId: [],
        editId: '',
        edit: false,
        url: {
          list: 'dorm/dormMng/exportModel',
          exportXlsUrl: 'dorm/dormMng/exportModel',
          importExcelUrl: 'dorm/dormMng/import',
        },
        upload: false,
        fileName: ''
      };
    },
    computed: {
      importExcelUrl: function() {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    mounted() {
      this.getDormList();
      this.getSchoolList();
    },
    components: {
      IconFont,
    },
    methods: {
      showModal() {
        this.name = '';
        this.bedNum = '';
        this.scanSchoolId = [];
        this.scanBuild = [];
        this.scanBuildId = [];
        this.scanFloor = [];
        this.scanFloorId = [];
        this.eleCode = '';
        this.waterCode = '';
        this.tv = [];
        this.phone = '';
        this.wc = [];
        this.sexId = [];
        this.wlan = [];
        this.checkedValue = '';
        this.visible = true;
      },
      handleOk(e) {
        if (this.name == '' || this.bedNum == '' || this.scanSchoolId.length == 0 || this.scanBuildId.length == 0 ||
          this.scanFloorId.length == 0 || this.eleCode == '' || this.waterCode == '' || this.tv.length == 0 ||
          this.phone == '' || this.wlan.length == 0 || this.wc.length == 0 || this.sexId.length == 0 || this.checkedValue === ''
        ) {
          this.$message.warning("请将信息输入完整");
          return;
        }
        this.confirmLoading = true;
        axios({
          url: 'dorm/dormMng/add',
          method: 'post',
          params: {
            "xqh": this.scanSchoolId[0],
            "jzwh": this.scanBuildId[0],
            "wldk": '无',
            'fjbm': this.name,
            'lch': this.scanFloorId[0],
            'kzrs': this.bedNum,
            'dbds': this.eleCode,
            'sbds': this.waterCode,
            'sfdsj': this.tv[0],
            'dhhm': this.phone,
            'sfwl': this.wlan[0],
            'rzxb': this.sexId[0],
			'sfxsj': this.wc[0],
            'status': this.checkedValue 
          }
        }).then(res => {
          this.$message.success(res.message);
          this.getDormList();
          this.visible = false;
          this.confirmLoading = false;
        }).catch(err => {
          this.$message.warning("此处有异常");
        })
      },
      handleCancel(e) {
        console.log('Clicked cancel button');
        this.visible = false;
      },
      tableChange(pagination, filters, sorter) {
        this.pagination.current = pagination.current;
        this.pagination.pageSize = pagination.pageSize;
      },
      /* 获取宿舍列表 */
      getDormList() {
        let xqId = this.schoolId.length == 0 ? null : this.schoolId[0];
        let jzwId = this.buildId.length == 0 ? null : this.buildId[0];
        let lcId = this.floorId.length == 0 ? null : this.floorId[0];
        axios({
          url: 'dorm/dormMng/select',
          method: 'post',
          params: {
            "xqId": xqId,
            "jzwId": jzwId,
            "lcId": lcId
          }
        }).then(res => {
          
          data.splice(0, data.length);
          for (let dorm of res.result) {
            data.push({
              key: dorm.id,
              name: dorm.fjbm,
              totalNum: dorm.kzrs,
              nowNum: dorm.yzrs,
              phone: dorm.dhhm,
              eleCode: dorm.dbds,
              waterCode: dorm.sbds,
              state: this.state[dorm.status].label,
            });
          }
          this.pagination.current = 1;
          this.pagination.total = res.result.length;
        }).catch(err => {
          this.$message.warning("此处有异常");
        })
      },
      /* 获取校区列表 */
      getSchoolList() {
        axios({
          url: 'dorm/laiFang/xiaoQu',
          method: 'post',
          params: {

          }
        }).then(res => {
          
          for (let sc of res.result) {
            this.school.push({
              value: sc.id,
              label: sc.name
            });
            this.scanSchool.push({
              value: sc.id,
              label: sc.name
            })
          }
        }).catch(err => {
          this.$message.warning("此处有异常");
        })
      },
      /* 根据校区ID获取宿舍楼 */
      schoolChange(value) {
        this.build = [];
        this.buildId = [];
        this.floor = [];
        this.floorId = [];
        if (value.length == 0) {
          return;
        }
        axios({
          url: 'dorm/laiFang/suSheLou',
          method: 'post',
          params: {
            "XQBH": this.schoolId[0]
          }
        }).then(res => {
          
          this.build.splice(0, this.build.length);
          for (let build of res.result) {
            this.build.push({
              value: build.id,
              label: build.name
            })
          }
        }).catch(err => {
          this.$message.warning("此处有异常");
        })
      },
      /* 根据宿舍楼查询楼层 */
      buildChange(value) {
        this.floor = [];
        this.floorId = [];
        if (value.length == 0) {
          return;
        }
        axios({
          url: 'dorm/floorMng/select',
          method: 'post',
          params: {
            "xqId": this.schoolId[0],
            "sslId": this.buildId[0],
          }
        }).then(res => {
          this.floor.splice(0, this.floor.length);
          for (let floor of res.result) {
            this.floor.push({
              value: floor.id,
              label: floor.lcname
            })
          }
        }).catch(err => {
          this.$message.warning("此处有异常");
        })
      },
      scanSchoolChange(value) {
        this.scanBuild = [];
        this.scanBuildId = [];
        this.scanFloor = [];
        this.scanFloorId = [];
        if (value.length == 0) {
          return;
        }
        axios({
          url: 'dorm/laiFang/suSheLou',
          method: 'post',
          params: {
            "XQBH": this.scanSchoolId[0]
          }
        }).then(res => {
          this.scanBuild.splice(0, this.scanBuild.length);
          for (let build of res.result) {
            this.scanBuild.push({
              value: build.id,
              label: build.name
            })
          }
        }).catch(err => {
          this.$message.warning("此处有异常");
        })
      },
      scanBuildChange(value) {
        this.scanFloor = [];
        this.scanFloorId = [];
        if (value.length == 0) {
          return;
        }
        axios({
          url: 'dorm/floorMng/select',
          method: 'post',
          params: {
            "xqId": this.scanSchoolId[0],
            "sslId": this.scanBuildId[0],
          }
        }).then(res => {
          console.log(res);
          this.scanFloor.splice(0, this.scanFloor.length);
          for (let floor of res.result) {
            this.scanFloor.push({
              value: floor.id,
              label: floor.lcname
            })
          }
        }).catch(err => {
          this.$message.warning("获取楼层下拉框失败");
        })
        
        axios({
          url: 'dorm/bulidMng/sexNum',
          method: 'post',
          params: {
            "buildId": this.scanBuildId[0],
          }
        }).then(res => {
          console.log(res);
          this.sexId = [res.result];
        }).catch(err => {
          this.$message.warning("此处有异常");
        })
      },
      clearAll() {
        this.schoolId = [];
        this.buildId = [];
        this.floorId = [];
      },
      deleteDorm(id) {
        let re = confirm("确认删除?");
        if(re) {
          axios({
            url: 'dorm/dormMng/delete',
            method: 'post',
            params: {
              'id': id
            }
          }).then(res => {
			this.$message.success(res.message);
            this.getDormList();
          }).catch(err => {
            this.$message.warning("此处有异常");
          })
        }
      },
      editDorm(id) {
        this.editId = id;
        axios({
          url: 'dorm/dormMng/getEdit',
          method: 'post',
          params: {
            'id': id
          }
        }).then(res => {
          console.log(res.result)
          this.name = res.result.fjbm;
          this.bedNum = res.result.kzrs;
          this.scanSchoolId = [res.result.xqh];
          this.scanSchoolChange([0]);
          this.scanBuildId = [res.result.jzwh];
          this.scanBuildChange([0]);
          this.scanFloorId = [res.result.lch];
          this.eleCode = res.result.dbds;
          this.waterCode = res.result.sbds;
          this.tv = [res.result.sfdsj];
          this.phone = res.result.dhhm;
          this.wlan = [res.result.sfwl];
          this.wc = [res.result.sfxsj];
          this.sexId = [res.result.rzxb];
          this.checkedValue = res.result.status;
          this.edit = true;
        }).catch(err => {
          this.$message.warning("此处有异常");
        })
      },
      editOK() {
        if (this.name == '' || this.bedNum == '' || this.scanSchoolId.length == 0 || this.scanBuildId.length == 0 ||
          this.scanFloorId.length == 0 || this.eleCode == '' || this.waterCode == '' || this.tv.length == 0 ||
          this.phone == '' || this.wlan.length == 0 || this.wc.length == 0 || this.sexId.length == 0 || this.checkedValue === ''
        ) {
          this.$message.warning("请将信息输入完整");
          return;
        }
        axios({
          url: 'dorm/dormMng/edit',
          method: 'post',
          params: {
            'id': this.editId,
            'xqh': this.scanSchoolId[0],
            'jzwh': this.scanBuildId[0],
            'wldk': '暂无',
            'fjbm': this.name,
            'lch': this.scanFloorId[0],
            'kzrs': this.bedNum,
            'dbds': this.eleCode,
            'sbds': this.waterCode,
            'sfdsj': this.tv[0],
			'sfxsj': this.wc[0],
            'dhhm': this.phone,
            'sfwl': this.wlan[0],
            'rzxb': this.sexId[0],
            'status': this.checkedValue
          }
        }).then(res => {
          this.$message.success(res.message);
          this.getDormList();
          this.edit = false;
        }).catch(err => {
          this.$message.warning("此处有异常");
        })
      },
      editCancel() {
        this.edit = false;
      },
      showUpload() {
        this.upload = true;
      },
      uploadCancel() {
        this.upload = false;
      },
    },
  };
</script>

<style>
  

</style>
