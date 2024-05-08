<template>
  <div style="background:#E9EDF6; padding:30px">
		<div class="content-title">
			违纪管理
		</div>
		<div class="pageContentBox">
		  <div class="headTop">住宿考勤 > <span class="notTop">违纪管理</span></div>
      <div class="content-head">
        <div>
          <a-button :size="size" class="content-button button-skyblue" style="font-size:16px;width:88px;height:34px;background-color:#3a3aff " @click="getStuList">
            <icon-font type="iconxindongfang-shuaxintubiao" style="color: #FFFFFF;" />
            刷新
          </a-button>
        </div>

        <div style="min-width: 260px;"></div>

        <div>
          <span class="head-span">姓名</span>
          <a-input class="condition" placeholder="请输入姓名" v-model="name" onkeyup="this.value=this.value.replace(/[, ]/g,'')"/>
        </div>

        <div>
          <span class="head-span">学号</span>
          <a-input class="condition" placeholder="请输入学号" v-model="stuId" onkeyup="this.value=this.value.replace(/[, ]/g,'')"/>
        </div>

        <div>
          <span class="head-span">宿舍楼</span>
          <a-cascader class="condition" :options="build" placeholder="请选择宿舍楼" v-model="buildId" />
        </div>

        <div>
          <a-button :size="size" class="content-button button-blue" style="font-size:16px;width:88px;height:34px;background-color:#1AE642 " @click="getStuList">
            <icon-font type="iconsousuo" style="color: #FFFFFF;" />
            搜索
          </a-button>

          <a-button :size="size" class="content-button button-orange button-after" style="font-size:16px;width:88px;height:34px;background-color:#E61A1A " @click="resetAll">
            <icon-font type="iconqingkong1" style="color: #FFFFFF;" />
            清空
          </a-button>
        </div>
      </div>
      <div>
        <a-table :columns="columns" :data-source="data" :defaultCurrent="6" :pagination="pagination" @change="tableChange">
          <span slot="operator" slot-scope="text, record">
            <a style="font-size:18px;color:#00bad0;border-bottom: 1px solid #66C3FD;" @click="showModal(record.key)">添加违纪信息</a>
          </span>
        </a-table>
      </div>
	  <div>
		  <a-modal title="添加违纪信息" :visible="add" :confirm-loading="confirmLoading" width="600px" @cancel="handleCancel">
		    <table class="scanTale">
		      <tr>
		        <td class="single"><span class="spanRed">*</span>违纪类型:</td>
		        <td class="long">
		          <a-cascader :options="type" class="scanInput" placeholder="请选择类型" v-model="typeId"></a-cascader>
		        </td>
		      </tr>
		      <tr>
		        <td class="single">违纪时间:</td>
		        <td class="long"><input class="scanInput" type="date" v-model="addTime"></td>
		      </tr>
		      <tr>
		        <td class="single">姓名:</td>
		        <td class="long"><a-input class="scanInput" :disabled="true" v-model="addName"></a-input></td>
		      </tr>
		      <tr>
		        <td class="single">学号:</td>
		        <td class="long"><a-input class="scanInput" :disabled="true" v-model="addStuId"></a-input></td>
		      </tr>
		      <tr>
		        <td class="single">宿舍楼:</td>
		        <td class="long"><a-input class="scanInput" :disabled="true" v-model="addBuildId"></a-input></td>
		      </tr>
		      <tr>
		        <td class="single">房间号:</td>
		        <td class="long"><a-input class="scanInput" :disabled="true" v-model="addDormId"></a-input></td>
		      </tr>
		    </table>
		    <template slot="footer" class="floor-footer">
		      <a-button type="primary" style="background-color:#028be2;color:#ffffff;font-weight:bold" @click="handleOk()">确定</a-button>
		      <a-button style="background-color:#999999;color:#ffffff;font-weight:bold" @click="handleCancel()">取消</a-button>
		    </template>
		  </a-modal>
	  </div>
    </div>
  </div>


</template>

<script>
  import {
    Icon
  } from 'ant-design-vue';
  import {
    axios
  } from '@/utils/request';
  import moment from 'moment';
  const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2390461_p27mhrdyg1k.js',
  });

  const columns = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '学号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '宿舍楼',
      dataIndex: 'dorm',
      key: 'dorm',
    },
    {
      title: '房间号',
      dataIndex: 'room',
      key: 'room',
    },
    {
      width: '40%',
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
          total: 0
        },
        build: [],
        buildId: [],
        name: '',
        stuId: '',
        /* 表格数据 */
        data,
        columns,
        /* 按钮大小 */
        size: 'small',
        /* 添加-弹出框数据 */
        add: false,
        confirmLoading: false,
        addId: '',
        type: [],
        typeId: [],
        addName: '',
        addDormId: '',
        addBuildId: '',
        addTime: '',
        addStuId: '',
        addSslId: '',
      };
    },
    mounted() {
      this.getBuildList();
      this.getStuList();
      this.getTypeList();
    },
    components: {
      IconFont,
    },
    methods: {
      showModal(id) {
        this.addId = id;
        axios({
          url: 'dorm/check/selectById',
          method: 'post',
          params: {
            id: id
          }
        }).then(res => {
          this.addName = res.result.xm;
          this.addStuId = res.result.xh;
          this.addBuildId = res.result.jzwmc;
          this.addDormId = res.result.fjbm;
          this.addSslId = res.result.sslid;
		  this.addId = res.result.stuId;
          this.typeId = [];
          this.addTime = '';
          this.add = true;
        }).catch(err => {
          this.$message.warning("获取该学生信息失败");
        })
      },
      handleOk(e) {
        this.confirmLoading = true;
        if(this.typeId.length == 0 || this.addTime == '') {
          this.$message.warning("请将信息输入完整");
          return;
        }
        axios({
          url: 'dorm/discipline/insert',
          method: 'post',
          params: {
            stuId: this.addId,
            XH: this.addStuId,
            XM: this.addName,
            typeId: this.typeId[0],
            wjTime: moment(this.addTime, 'YYYY:MM:DD').valueOf() / 1000
          }
        }).then(res => {
          this.$message.success(res.message);
          this.confirmLoading = false;
          this.add = false;
        }).catch(err => {
          this.$message.warning("添加违纪信息失败");
        })
      },
      handleCancel(e) {
        this.add = false;
      },
      tableChange(pagination, filters, sorter) {
        this.pagination.current = pagination.current;
        this.pagination.pageSize = pagination.pageSize;
      },
      getStuList() {
        let sslbm = this.buildId.length == 0 ? 0 : this.buildId[0];
        axios({
          url: 'dorm/check/selectList',
          method: 'post',
          params: {
            XM: this.name,
            XH: this.stuId,
            SSLBM: sslbm
          }
        }).then(res => {
          data.splice(0, data.length);
          for(let stu of res.result) {
            data.push({
              key: stu.id,
              name: stu.xm,
              id: stu.xh,
              dorm: stu.jzwmc,
              room: stu.fjbm
            })
          }
          this.pagination.current = 1;
          this.pagination.total = data.length;
        }).catch(err => {
          this.$message.warning("获取学生列表失败");
        })
      },
      getBuildList() {
        axios({
          url: '/dorm/bulidMng/querySuSheLou',
          method: 'post',
          params: {
            "jzwmc": ''
          },
        }).then(res => {
          this.build.splice(0, this.build.length);
          for (let build of res.result) {
            this.build.push({
              label: build.jzwmc,
              value: build.id,
            })
          }
        }).catch(err => {
          this.$message.warning("获取建筑列表失败");
        })
      },
      resetAll() {
        this.name = '';
        this.stuId = '';
        this.buildId = [];
      },
      getTypeList() {
        axios({
          url: 'dorm/disciplineType/selectList',
          method: 'post',
          params: {
            name: '',
            status: 1
          }
        }).then(res => {
          this.type.splice(0, this.type.length);
          for(let type of res.result) {
            this.type.push({
              value: type.id,
              label: type.name
            })
          }
        }).catch(err => {
          this.$message.warning("获取违纪类型失败");
        })
      }
    }
  };
</script>

<style>
.s{
	background: rgba(0,0,0,0.2);
}
</style>
