<template>
	<div  class='constbox'>
		
		<div class="pageContentBox">
			<div class="content-head">

				<div>
					<span class="head-span">招生季：</span>
					<a-cascader class="condition" :options="quarter" placeholder="默认当前招生季" 
						v-model="quarterId" />
				
					<span class="head-span">专业部：</span>
					<a-cascader class="condition" :options="faculty" placeholder="请选择" @change="facultyChange" 
						v-model="facultyId" />
				
					<span class="head-span">专业：</span>
					<a-cascader class="condition" :options="specialty" placeholder="请选择" v-model="specialtyId" />
				
					<!-- <a-button  type="danger"  icon="delete" style="margin-left:10px;" @click="clear">
						
						清除
					</a-button> -->
				</div>
				
			</div>

			<div class="content-head">

				<div>					
					<a-cascader :options="keys" placeholder="姓名" style="width:150px" class="condition select"
						v-model="keysVal"/>		
					<a-input class="condition-input" style="width: 200px;"  placeholder="请输入" v-model.trim="keyword" />
					<a-button  type="primary" icon="search" style="margin-left: 10px;" @click="search">
						搜索
					</a-button>

					<a-button  type="danger"  icon="delete" style="margin-left: 10px;" @click="empty">
						清空
					</a-button>
				</div>
			</div>

			<div class="content-head">
				<div>
					<a-button  type="primary" style="margin-right: 10px;" @click="showModalReport">
						
						批量报到
					</a-button>
					<a-modal v-model="visibleReport" title="提示" @ok="handleOkReport" :width="478"> 
						<template slot="footer">		
                        <a-button key="back"  @click="handleOkReport" class="btn"> 确定</a-button>
                        <a-button key="submit" type="primary"  @click="closePop"  class="btn-cancle">取消</a-button>
                        </template>		
      					<div class="report-text">确认要批量报到吗?</div>				     					
    				</a-modal>
					

					<!-- <a-button  type="primary" style="margin-right: 10px;" @click="showModalReportBySearch">
						
						按搜索条件批量报到
					</a-button> -->
					<a-modal v-model="visibleReportBySearch" title="提示" @ok="handleOkReportBySearch" :width="478">
						<template slot="footer">		
                        <a-button key="back"  @click="handleOkReportBySearch" class="btn"> 确定</a-button>
                        <a-button key="submit" type="primary"  @click="closePop"  class="btn-cancle">取消</a-button>
                        </template>	
      					<div class="report-search-text">共{{this.reportCount}}条数据，确认要按条件批量报到吗?</div>						
    				</a-modal>

                    <a-button  type="danger"  icon="delete" style="margin-right: 10px;" @click="showModalDelete">
						删除
					</a-button>
					<a-modal v-model="visibleDelete" title="提示" @ok="handleOkDelete" :width="478"> 
						<template slot="footer">		
                        <a-button key="back"  @click="handleOkDelete" class="btn"> 确定</a-button>
                        <a-button key="submit" type="primary"  @click="closePop"  class="btn-cancle">取消</a-button>
                        </template>
      					<div class="delete-text">确认执行删除?</div>
    				</a-modal>

					<a-button  type="primary"  icon="reload" style="margin-right: 10px;" @click="refresh">					
						刷新
					</a-button>
				</div>

			</div>
			<div>
				<a-table 					
					:columns="columns" 
					:data-source="data" 
					:scroll="{ x: 1500}"
					:row-selection="rowSelection" 
					:defaultCurrent="6"
					:pagination="pagination" 
					
					@change="tableChange">
					<span slot="operator" slot-scope="text, record">
						<a class = "text-btn-color2"  @click="showMsg(record)">查看</a>						
					</span>
										
				</a-table>
			</div>
		</div>

		<!-- 查看界面 -->
 		<a-modal v-model="visible" title="查看招生信息" on-ok="handleClose" :width="1073">
		
      <template slot="footer" >
		  
        <a-button key="back" class="btn" v-print="'#printContent'">
          打印
        </a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleClose"  class="btn-cancle">
          关闭
        </a-button>
		  
      </template>
	 	<div ref="print" id="printContent">
          <table class="scanTable " style="text-align:left">
            <tr>
            <td  colspan="4" class="tr-color"> 
                  <span class="title-style">基本信息</span>
              </td>
            </tr>
			
        <tr class="tr-style">
          <td class=" td-div">
            <div class="font-style ">姓名</div>
          </td>
          <td class="double" >
            <a-input read-only class=" input-style"  v-model="entityObj.xm"></a-input>
          </td>
          <td class=" td-div">
            <div class="font-style">身份证号</div>
          </td>
          <td class="double">
            <a-input read-only class=" input-style" v-model="entityObj.sfzh"></a-input>
          </td>
        </tr>

           <tr class="tr-style">
          <td class=" td-div">
            <div class="font-style">曾用名</div>
          </td>
          <td class="double">
            <a-input read-only class=" input-style" v-model="entityObj.cym"></a-input>
          </td>
          <td class=" td-div">
            <div class="font-style">性别</div>
          </td>
          <td class="double">
            <a-input read-only class=" input-style" v-model="entityObjTwo.XBM"></a-input>
          </td>
					
        </tr>
           <tr class="tr-style">
          <td class=" td-div">
            <div class="font-style">出生日期</div>
          </td>
          <td class="double">
            <a-input read-only class=" input-style" v-model="entityObj.csrq"></a-input>
          </td>
          <td class=" td-div">
            <div class="font-style">政治面貌</div>
          </td>
          <td class="double">
            <a-input read-only class=" input-style" v-model="entityObj.zzmmm"></a-input>
          </td>
        </tr>
     
           <tr class="tr-style">
          <td class=" td-div">
            <div class="font-style">籍贯</div>
          </td>
          <td class="double">
            <a-input read-only class=" input-style" v-model="entityObj.jg"></a-input>
          </td>
          <td class=" td-div">
            <div class="font-style">民族</div>
          </td>
          <td class="double">
            <a-input read-only class=" input-style" v-model="entityObj.mzm"></a-input>
          </td>
        </tr>

           <tr class="tr-style">
          <td class=" td-div">
            <div class="font-style">健康状况</div>
          </td>
          <td class="double">
            <a-input read-only class=" input-style" v-model="entityObj.jkzkm"></a-input>
          </td>
          <td class=" td-div">
            <div class="font-style">毕业学校</div>
          </td>
          <td class="double">
            <a-input read-only class=" input-style" v-model="entityObj.byxx"></a-input>
          </td>
        </tr>

           <tr class="tr-style">
          <td class=" td-div">
            <div class="font-style">户口类别</div>
          </td>
          <td class="double">
            <a-input read-only class=" input-style" v-model="entityObj.hklbm"></a-input>
          </td>
          <td class=" td-div ">
            <div class="font-style">是否低保</div>
          </td>
          <td class="double">
            <a-input read-only class=" input-style" v-model="entityObj.sfdb"></a-input>
          </td>
        </tr>

           <tr class="tr-style">
          <td class=" td-div">
            <div class="font-style">招生类型</div>
          </td>
          <td class="double">
            <a-input read-only class=" input-style" v-model="entityObj.zslx"></a-input>
          </td>
          <td class=" td-div">
            <div class="font-style">准考证号</div>
          </td>
          <td class="double">
            <a-input read-only class=" input-style" v-model="entityObj.zkzh"></a-input>
          </td>
        </tr>

         <tr class="tr-style">
          <td class=" td-div">
            <div class="font-style">考生号</div>
          </td>
          <td class="double">
            <a-input read-only class=" input-style" v-model="entityObj.ksh"></a-input>
          </td>
          <td class=" td-div">
            <div class="font-style">考试总分</div>
          </td>
          <td class="double">
            <a-input read-only class=" input-style" v-model="entityObj.kszf" ></a-input>
          </td>
        </tr>
     	
      </table>

       <table class="scanTable " style="text-align:left; margin-top:20px">
            <tr>
            <td  colspan="4" class="tr-color"> 
                  <span class="title-style">报名信息</span>
              </td>
            </tr>
			
        <tr class="tr-style">
          <td class=" td-div">
            <div class="font-style">专业部</div>
          </td>
          <td class="double">
            <a-input read-only class=" input-style" v-model="entityObjTwo.YXMC"></a-input>
          </td>
          <td class=" td-div">
            <div class="font-style">专业</div>
          </td>
          <td class="double">
            <a-input read-only class=" input-style" v-model="entityObjTwo.ZYMC "></a-input>
          </td>
        </tr>

           <tr class="tr-style">
          <td class=" td-div">
            <div class="font-style">学制</div>
          </td>
          <td class="double">
            <a-input read-only class=" input-style" v-model="entityObjTwo.XZ"></a-input>
          </td>
          <td class=" td-div">
            <div class="font-style">入学年月</div>
          </td>
          <td class="double">
            <a-input read-only class=" input-style" v-model="entityObj.rxny"></a-input>
          </td>

        </tr>
           <tr class="tr-style">
          <td class=" td-div">
            <div class="font-style">层次</div>
          </td>
          <td class="double">
            <a-input read-only class=" input-style" v-model="entityObj.ccm"></a-input>
          </td>
          <td class=" td-div">
            <div class="font-style">就读方式</div>
          </td>
          <td class="double">
            <a-input read-only class=" input-style" v-model="entityObj.jdfs"></a-input>
          </td>
        </tr>
    
      </table>

      
       <table class="scanTable " style="text-align:left; margin-top:20px" >
            <tr>
            <td  colspan="4" class="tr-color"> 
                  <span class="title-style">联系方式</span>
              </td>
            </tr>
			
        <tr class="tr-style">
          <td class=" td-div">
            <div class="font-style">详细家庭地址</div>
          </td>
          <td  colspan="3" class="double"> 
            <a-input read-only class=" input-style" v-model="entityObj.jtdz"></a-input>
              </td>
        </tr>

           <tr class="tr-style">
          <td class=" td-div">
            <div class="font-style">家庭邮编</div>
          </td>
          <td class="double">
            <a-input read-only class=" input-style" v-model="entityObj.jtyb"></a-input>
          </td>
          <td class="td-div">
            <div class="font-style">家庭联系电话</div>
          </td>
          <td class="double">
            <a-input read-only class=" input-style" v-model="entityObj.jtlxdh"></a-input>
          </td>

        </tr>
           <tr class="tr-style">
          <td class=" td-div">
            <div class="font-style">户籍所在地</div>
          </td>
          <td class="double">
            <a-input read-only class=" input-style" v-model="entityObj.county"></a-input>
          </td>
          <td class=" td-div">
            <div class="font-style">学生联系电话</div>
          </td>
          <td class="double">
            <a-input read-only class=" input-style" v-model="entityObj.xslxdh"></a-input>
          </td>
        </tr>

           <tr class="tr-style">
          <td class="td-div">
            <div class="font-style">电子邮箱</div>
          </td>
          <td class="double">
            <a-input read-only class=" input-style" v-model="entityObj.dzxx"></a-input>
          </td>
          <td class=" td-div">
            <div class="font-style">即时通讯号</div>
          </td>
          <td class="double">
            <a-input read-only class=" input-style" v-model="entityObj.jstxh"></a-input>
          </td>
        </tr>
    
    <tr>
            <td  colspan="4" class="tr-color"> 
                  <span class="title-style">其他信息</span>
              </td>
            </tr>
			
        <tr class="tr-style">
          <td class=" td-div">
            <div class="font-style">特长</div>
          </td>
          <td  colspan="3" class="double"> 
           <a-input read-only class=" input-style" v-model="entityObj.tc"></a-input>
              </td>
        </tr>
      </table>
	  </div>	
    	</a-modal>

	</div>
</template>


<script>
	import {
		Icon
	} from 'ant-design-vue';

	import {
		axios
	} from "@/utils/request"

	const IconFont = Icon.createFromIconfontCN({
		scriptUrl: '//at.alicdn.com/t/font_2390461_f6v2cx4wmzq.js',
	});

	const columns = [{
			title: '姓名',
			dataIndex: 'XM',
			key: 'XM',
			fixed: 'left',
			width: 150,
		},
		{
			title: '身份证号',
			dataIndex: 'SFZH',
			key: 'SFZH',
			fixed: 'left',
			width: 250,
		},
		{
			title: '所属专业部',
			dataIndex: 'YXMC',
			key: 'YXMC',
			width: 150
		},
		{
			title: '所属专业',
			dataIndex: 'ZYMC',
			key: 'ZYMC',
			width: 150
		},
		{
			title: '考试总分',
			dataIndex: 'KSZF',
			key: 'KSZF',
			width: 150
		},
		{
			title: '是否录取',
			dataIndex: 'isAdmit',
			key: 'isAdmit',
			width: 150
		},
		{
			title: '性别',
			dataIndex: 'XBM',
			key: 'XBM',
			width: 150
		},
		{
			title: '入学年份',
			dataIndex: 'RXNF',
			key: 'RXNF',
			width: 150
		},
		{
			title: '招生季',
			dataIndex: 'ZSJ',
			key: 'ZSJ',
			width: 150
		},
		{
			title: '学制',
			dataIndex: 'XZ',
			key: 'XZ',
			width: 150
		},
		{
			title: '操作',
			dataIndex: 'operator',
			key: 'operator',
			fixed: 'right',
			width: 200,
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
					current: 0,
					pageSize: 10,
					showSizeChanger: true,
					pageSizeOptions: ['6', '10', '20','30','50'],
					showTotal: (total, range) => {
						return '显示' + range[0] + '到' + range[1] + '条, 共' + total + '条记录'
					},
					showQuickJumper: true,					
					total: 0
				},
				selectedRowKeys: [],
				/* 页码 */
				currentPage: 1,
				pageSize: 10,
				/* 关键词 */
				keyword: '',
				kw: '',
				/* 表格数据 */
				data,
				columns,
				/* 按钮大小 */
				size: 'small',
				/* 下拉框数据 */
				quarter: [],
				quarterId: [],
				faculty: [],
				facultyId: [],
				specialty: [],
				specialtyId: [], 
				//搜索条件
				curQuarter: 0,
				curFaculty: 0,
				curSpecialty: 0,
				condit: '',
				keys: [{value:'XM',label:'姓名'},{value:'SFZH',label:'身份证号'}],
				//defVal: ['XM'],
				keysVal: [],
				/* 提示 */
				pointOut: '',
				/* 按条件搜索报到的数量 */
				reportCount: 0,
				/* 弹出框属性 */
				visibleReport: false,
				visibleReportBySearch: false,
				visibleDelete: false,
				visible: false,
				loading: false,
				/* 弹窗对象 */
				entityObj:{},
				entityObjTwo:{},
				
			};
		},
		mounted() {		
			//this.addCondit();	
			this.getStuList();
			this.getQuarter();
			this.getFaculty();
					
		},
		computed: {
            rowSelection() {              
                const selectedRowKeys = this.selectedRowKeys; //常量
                //console.log('selectedRowKeys:',selectedRowKeys,this.selectedRowKeys);
                return {
                    selectedRowKeys,
                    onChange: this.onSelectChange,
                };
            },
        },
		components: {
			IconFont,
		},
		methods: {
			//start
			showMsg(a) {

				axios({					
						url: 'enroll/reportMng/getInfoByID',
						method: 'post',
						params: {
						 	"id": a.key
						}
				}).then(res => {
                this.entityObj=res.result;
				this.entityObjTwo=a; 
				//数据加工处理
				let zslx = res.result.zslx == 1 ? '统一招生' : '自主招生';
                let jdfs = res.result.jdfs == 1 ? '住校' : '走读';
				let sfdb = res.result.sfdb == 1 ? '是' : '否';		

				this.entityObj.zslx=zslx;
				this.entityObj.jdfs=jdfs;
				this.entityObj.sfdb=sfdb;
				}).catch(err => {
					this.$message.warning("获取招生信息失败");
				})
                this.visible = true;
   			},
    		handleClose(e) {
      			setTimeout(() => {
        			this.visible = false;
        			this.loading = false;
      			});
    		},
    		handlePrint(e) {
     			 this.visible = false;
    		},
			// end
			
			onSelectChange(selectedRowKeys) {
                this.selectedRowKeys = selectedRowKeys;
                
            },
			clear(){				
				this.quarterId = [];				
				this.facultyId = [];
				this.specialty = [];
				this.specialtyId = [];
				//this.quarter.splice(0, this.quarter.length);
				
			},
			empty(){				
				this.keyword = '';
				this.keysVal = [];

				this.clear();

			},
			deleteStu(){
				
				let ids = '';
				
				for (let i = 0; i < this.selectedRowKeys.length; i++) {
					ids += this.selectedRowKeys[i];
					if (i != this.selectedRowKeys.length - 1) {
						ids += ',';
					}
				}

				axios({
					
					url: 'enroll/reportMng/deleteStu',
					method: 'post',
					params: {
						 "ids": ids,
					}
				}).then(res => {

					this.$message.success(res.result);
					
					this.refresh();

				}).catch(err => {
					this.$message.warning("批量删除失败");
				})

			},
			batchReport(){
	
				let ids = '';
				
				for (let i = 0; i < this.selectedRowKeys.length; i++) {
					ids += this.selectedRowKeys[i];
					if (i != this.selectedRowKeys.length - 1) {
						ids += ',';
					}
				}

				axios({
					
					url: 'enroll/reportMng/batchReport',
					method: 'post',
					params: {
						 "ids": ids,
					}
				}).then(res => {
					
					this.$message.success(res.result);
					
					this.getStuList();

				}).catch(err => {
					this.$message.warning("批量报到失败");
				})

			},
			batchReportBySearch(){

				let quarId = this.quarterId.length == 0 ? 0 : this.quarterId[0];
				let facuId = this.facultyId.length == 0 ? 0 : this.facultyId[0];
				let specId = this.specialtyId.length == 0 ? 0 : this.specialtyId[0];

				axios({
					
					url: 'enroll/reportMng/batchReportBySearch',
					method: 'post',
					params: {
						"quarterId": quarId,
						"facultyId": facuId,
						"specialtyId": specId,
					}
				}).then(res => {
					
					this.$message.success(res.result);
					
					this.getStuList();

				}).catch(err => {
					this.$message.warning("按条件批量报到失败");
				})
				
			},
			search(){			
				this.currentPage = 1;
				this.curQuarter = this.quarterId.length == 0 ? 0 : this.quarterId[0];
				this.curFaculty = this.facultyId.length == 0 ? 0 : this.facultyId[0];
				this.curSpecialty = this.specialtyId.length == 0 ? 0 : this.specialtyId[0];
				this.kw = this.keyword;
				this.condit = this.keysVal[0] == undefined ? 'XM' : this.keysVal[0];
			
				this.getStuList();

			},
			refresh(){
			
				this.selectedRowKeys=[];
				this.getStuList();

			},
			showModalReport() {
				if (this.selectedRowKeys.length == 0) {
				
					this.$message.warning("请选择要报到的学生！");
					return;
				}
				
				this.visibleReport = true;
			},
			handleOkReport() {
      			
				this.batchReport();
      			this.visibleReport = false;
    		},
			showModalReportBySearch(){

				let quarId = this.quarterId.length == 0 ? 0 : this.quarterId[0];
				let facuId = this.facultyId.length == 0 ? 0 : this.facultyId[0];
				let specId = this.specialtyId.length == 0 ? 0 : this.specialtyId[0];

				axios({					
					url: 'enroll/reportMng/getCountBySearch',
					method: 'post',
					params: {
						"quarterId": quarId,
						"facultyId": facuId,
						"specialtyId": specId,
					}
				}).then(res => {
					
					this.reportCount = res.result;
					
					if(quarId == 0){
						this.pointOut = '（招生季不选则默认当前招生季）';
					}

					if(this.reportCount == 0){
						this.$message.warning("该条件没有可报到的学生！");
						return;
					}

					this.visibleReportBySearch = true;

				}).catch(err => {
					this.$message.warning("搜索条件批量报到数量失败");
				})

				
			},
			handleOkReportBySearch(){

				this.batchReportBySearch();
				this.visibleReportBySearch = false;

			},
			showModalDelete() {
				if (this.selectedRowKeys.length == 0) {
					this.$message.warning("请选择要删除的学生！");
					return;
				}
				
				this.visibleDelete = true;
			},
			handleOkDelete(){
				
				this.deleteStu();
				this.visibleDelete = false;
			},
			//关闭删除/批量报道/按条件批量报道
			closePop(){
				this.visibleDelete = false;
				this.visibleReportBySearch = false;
				this.visibleReport = false;
			},
			
			tableChange(pagination) {
				/* , filters, sorter */
				this.pagination.current = pagination.current;
				this.pagination.pageSize = pagination.pageSize;

				//this.$message.warning(pagination.current);

				this.currentPage = pagination.current;
				this.pageSize = pagination.pageSize;

				this.getStuList();

			},
			getStuList() {

				let currentPage = this.currentPage;
				let pageSize = this.pageSize;			
				
				axios({
					
					url: 'enroll/reportMng/select',
					method: 'post',
					params: {
						"quarterId": this.curQuarter,
						"facultyId": this.curFaculty,
						"specialtyId": this.curSpecialty,
						"keyword": this.kw,
						"condit": this.condit,
						"currentPage": currentPage,
						"pageSize": pageSize
					}
				}).then(res => {
					if (res.code == 500) {
            			this.$message.warning(res.message)
            			return
          			}

					data.splice(0, data.length);

					for (let stu of res.result.list) {
						let sex = stu.xbm == 1 ? '男' : '女';
						let isAdmit = stu.isAdmit == 1 ? '已录取' : '未录取';
						data.push({
							key: stu.id,
							XM: stu.xm,
							SFZH: stu.sfzh,
							YXMC: stu.yxmc,
							ZYMC: stu.zymc,
							KSZF: stu.kszf,
							isAdmit: isAdmit,
							XBM: sex,
							RXNF: stu.rxnf,
							ZSJ: stu.zsj,
							XZ: stu.xz,
						})
					}
					this.pagination.current = currentPage;
					this.pagination.total = res.result.count;
				}).catch(err => {
					this.$message.warning("获取学生列表失败");
				})
			},
			addCondit(){
				for (let k of this.keys) {
						this.keys.push({
							value: k.value,
							label: k.label
						})
					}
				//this.defVal = 'XM';
			},
			getQuarter() {
				
				axios({
					url: 'enroll/reportMng/getQuarter',
					method: 'post',
					params: {}

				}).then(res => {

					for (let quarter of res.result) {
						this.quarter.push({
							value: quarter.id,
							label: quarter.name
						})
					}
					//this.dv = res.result[0].id;
				}).catch(err => {
					this.$message.warning("获取招生季失败");
				})
			},
			getFaculty() {
				//this.faculty = [];
				//this.facultyId = [];
				
				axios({
					url: 'enroll/reportMng/getFaculty',
					method: 'post',
					params: {
						
					}
				}).then(res => {

					//this.faculty.splice(0, this.faculty.length);
					for (let faculty of res.result) {
						this.faculty.push({
							value: faculty.id,
							label: faculty.yxmc
						})
					}
				}).catch(err => {
					this.$message.warning("获取专业部失败");
				})
			},
			facultyChange(value){

				this.specialty = [];
				this.specialtyId = [];

				if (value.length == 0) {
					return;
				}
				
				axios({
					url: 'enroll/reportMng/getSpecialty',
					method: 'post',
					params: {
						"facultyId": this.facultyId[0]
					}
				}).then(res => {

					this.specialty.splice(0, this.specialty.length);
					for (let specialty of res.result) {
						this.specialty.push({
							value: specialty.id,
							label: specialty.zymc
						})
					}
				}).catch(err => {
					this.$message.warning("获取专业失败");
				})
			},
			
		}
	};
</script>

<style>

</style>