<template>
	<div  class='constbox'>
		
		<div class="pageContentBox">
			<div class="content-head">

				<div>
					<span class="head-span">专业部：</span>
					<j-select-zyb placeholder="请选择院系" v-model="facultyId"  :trigger-change="false" ></j-select-zyb>
					<span class="head-span">专业：</span>
					<j-select-zy-by-zyb ref="zyByZyb" placeholder="请选择专业" v-model="specialtyId"  :trigger-change="false"></j-select-zy-by-zyb>
					<span class="head-span">班级：</span>
					<j-select-banji-by-zy ref="banjiByZy" placeholder="请先选择专业"
					                      v-model="clazzId"></j-select-banji-by-zy>

				</div>		
			</div>

			<div class="content-head">
				<div>
					<a-cascader class="condition select" style="width:100px;" :options="keys" placeholder="姓名" v-model="keysVal" />
					<a-input class="condition-input" style="width:200px;" placeholder="请输入" v-model.trim="keyword" />
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
		
					<a-button  type="primary" style="margin-right: 10px;" @click="showModalCreate">
						
						批量编制学号
					</a-button>
					<a-modal v-model="visibleCreate" title="提示" @ok="handleOkCreate" :width="478"> 
						<template slot="footer">		
                        <a-button key="back"  @click="handleOkCreate" class="btn"> 确定</a-button>
                        <a-button key="submit" type="primary"  @click="closePop"  class="btn-cancle">取消</a-button>
                        </template>	
						<div class="create-text">确认要批量编制学号吗?</div>
    				</a-modal>
					
					<!-- <a-button  type="primary" style="margin-right: 10px;" @click="showModalCreateBySearch">
						
						按搜索条件批量编制学号
					</a-button> -->
					<a-modal v-model="visibleCreateBySearch" title="提示" @ok="handleOkCreateBySearch" :width="478">
						<template slot="footer">		
                        <a-button key="back"  @click="handleOkCreateBySearch" class="btn"> 确定</a-button>
                        <a-button key="submit" type="primary"  @click="closePop"  class="btn-cancle">取消</a-button>
                        </template>	
					    <div class="create-search-text">共{{this.createCount}}条数据，确认要进行按条件批量编制学号吗?</div>						
    				</a-modal>

                    <a-button  type="primary" style="margin-right: 10px;" @click="refresh">
						
						刷新
					</a-button>
				</div>
			</div>

			<div>
				<a-table 					
					:columns="columns" 
					:data-source="data" 
					:row-selection="rowSelection" 
					:defaultCurrent="6"
					:pagination="pagination" 
					:scroll="{ x: 1500}"
					@change="tableChange">
					<span slot="operator" slot-scope="text, record">
						<a class = "text-btn-color2"  @click="showMsg(record)">查看</a>						
					</span>
										
				</a-table>
			</div>
	
		</div>

		<!-- 查看界面 -->
 		<a-modal v-model="visible" title="查看新生信息" on-ok="handleClose" :width="1073" >
		
      <template slot="footer" >
		  
        <a-button key="back" class="btn" v-print="'#printContent'">
          打印
        </a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleClose"  class="btn-cancle">
          关闭
        </a-button>
		  
      </template>
	 	<div ref="print" id="printContent">
          <table class="scanTable " style="text-align:left" >
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
            <a-input read-only class=" input-style-print"  v-model="entityObj.xm"></a-input>
          </td>
          <td class=" td-div">
            <div class="font-style">身份证号</div>
          </td>
          <td class="double">
            <a-input read-only class=" input-style-print" v-model="entityObj.sfzh"></a-input>
          </td>
        </tr>

		 <tr class="tr-style">
			 <td class=" td-div">
            <div class="font-style">报到名</div>
          </td>
          <td class="double">
            <a-input read-only class=" input-style-print" v-model="entityObj.bmh" ></a-input>
          </td>
          <td class=" td-div">
            <div class="font-style">考生号</div>
          </td>
          <td class="double">
            <a-input read-only class=" input-style-print" v-model="entityObj.ksh"></a-input>
          </td>
         
        </tr>

           <tr class="tr-style">
          <td class=" td-div">
            <div class="font-style">准考证号</div>
          </td>
          <td class="double">
            <a-input read-only class=" input-style-print" v-model="entityObj.zkzh"></a-input>
          </td>
          <td class=" td-div">
            <div class="font-style">性别</div>
          </td>
          <td class="double">
            <a-input read-only class=" input-style-print" v-model="entityObj.xbm"></a-input>
          </td>
					
        </tr>

		<tr class="tr-style">
          <td class=" td-div">
            <div class="font-style">专业部</div>
          </td>
          <td class="double">
            <a-input read-only class=" input-style-print" v-model="entityObj.yxmc"></a-input>
          </td>
          <td class=" td-div">
            <div class="font-style">专业</div>
          </td>
          <td class="double">
            <a-input read-only class=" input-style-print" v-model="entityObj.zymc "></a-input>
          </td>
        </tr>

           <tr class="tr-style">
          <td class=" td-div">
            <div class="font-style">班级</div>
          </td>
          <td class="double">
            <a-input read-only class=" input-style-print" v-model="entityObj.xzbmc"></a-input>
          </td>
          <td class=" td-div">
            <div class="font-style">班主任</div>
          </td>
          <td class="double">
            <a-input read-only class=" input-style-print" v-model="entityObj.tea"></a-input>
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
	import JSelectBanjiByZy from '@/components/kwglbiz/JSelectBanjiByZy'
	import JSelectZyb from '@/components/kwglbiz/JSelectZyb'
	import JSelectZyByZyb from '@/components/kwglbiz/JSelectZyByZyb'
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
		// ----------林彬辉
		// {
		// 	title: '学号',
		// 	dataIndex: 'XH',
		// 	key: 'XH',
		// },
		// -------
		{
			title: '性别',
			dataIndex: 'XBM',
			key: 'XBM',
			fixed: 'left',
			width: 150,
		},
		{
			title: '学生状态',
			dataIndex: 'XSDQZTM',
			key: 'XSDQZTM',
			width: 150,
		},
		{
			title: '身份证号',
			dataIndex: 'SFZH',
			key: 'SFZH',
			width: 250,
		},
		{
			title: '所属专业部',
			dataIndex: 'YXMC',
			key: 'YXMC',
			width: 150,
		},
		{
			title: '所属专业',
			dataIndex: 'ZYMC',
			key: 'ZYMC',
			width: 150,
		},
		{
			title: '所属年级',
			dataIndex: 'NJMC',
			key: 'NJMC',
			width: 150,
		},
		{
			title: '所属班级',
			dataIndex: 'XZBMC',
			key: 'XZBMC',
			width: 150,
		},
		{
			title: '学生联系电话',
			// dataIndex: 'XZLXDH',
			// key: 'XZLXDH',
			// ------------林彬辉
			dataIndex: 'XSLXDH',
			key: 'XSLXDH',
			width: 250,
			// --------
		},
		{
			title: '操作',
			dataIndex: 'operator',
			fixed: 'right',
			width: 200,
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
					current: 0,
					pageSize: 8,
					showSizeChanger: true,
					pageSizeOptions: ['8', '10', '20', '30', '50'],
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
				clazz: [],
				clazzId: [],
				faculty: [],
				facultyId: [],
				specialty: [],
				specialtyId: [], 
				keys: [],
				keysVal: [],
				curQuarter: 0,
				curFaculty: 0,
				curSpecialty: 0,
				curClazz: 0,
				condit: '',
				/* 按条件搜索报到的数量 */
				createCount: 0,
				/* 弹出框属性 */
				visible: false,
				loading: false,
				/* 弹窗对象 */
				entityObj:{},

                visibleCreate: false,
                visibleCreateBySearch: false,
				
			};
		},
		mounted() {			
			this.getStuList();			
			this.getFaculty();
			this.addCondit();			
		},
		computed: {
            rowSelection() {              
                const selectedRowKeys = this.selectedRowKeys; //常量
                
                return {
                    selectedRowKeys,
                    onChange: this.onSelectChange,
                };
            },
        },
		watch:{
				facultyId(val){
					this.zybChange(val)
				},
				specialtyId(va){
					this.zyChange()
				}
		},
		components: {
			IconFont,
			JSelectZyByZyb,
			JSelectZyb,
			JSelectBanjiByZy,
		},
		methods: {
			//start
			showMsg(a) {

				axios({					
						url: 'enroll/stuInfoQuery/getInfoByID',
						method: 'post',
						params: {
						 	"id": a.key
						}
				}).then(res => {

				this.entityObj=res.result;
				
				//数据加工处理				
				let sex = res.result.xbm == 1 ? '男' : '女';
				this.entityObj.xbm=sex;

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
            showModalCreate(){
				if (this.selectedRowKeys.length == 0) {
				
					this.$message.warning("请选择要编制学号的学生！");
					return;
				}
                this.visibleCreate = true;
            },
            handleOkCreate(){
                
				let ids = '';
				
				for (let i = 0; i < this.selectedRowKeys.length; i++) {
					ids += this.selectedRowKeys[i];
					if (i != this.selectedRowKeys.length - 1) {
						ids += ',';
					}
				}

				axios({
					
					url: 'enroll/createNum/batchCreateNum',
					method: 'post',
					params: {
						 "ids": ids,
					}
				}).then(res => {

					this.$message.success(res.result);
					this.getStuList();

				}).catch(err => {
					this.$message.warning("批量编制学号失败");
				})

				this.visibleCreate = false;
				
            },
            showModalCreateBySearch(){
                
				let facuId = this.facultyId.length == 0 ? 0 : this.facultyId[0];
				let specId = this.specialtyId.length == 0 ? 0 : this.specialtyId[0];
				let clazzId = this.clazzId.length == 0 ? 0 : this.clazzId[0];

				if(facuId == 0 ){
					this.$message.warning("请选择条件！");
					return;
				}

				axios({					
					url: 'enroll/createNum/getCountBySearch',
					method: 'post',
					params: {
						"clazzId": clazzId,
						"facultyId": facuId,
						"specialtyId": specId,
					}
				}).then(res => {
					
					this.createCount = res.result;

					if(this.createCount == 0){
						this.$message.warning("该条件没有可编制学号的学生！");
						return;
					}

					this.visibleCreateBySearch = true;

				}).catch(err => {
					this.$message.warning("获取搜索条件批量报到数量失败");
				})

            },
			closePop(){
					this.visibleCreateBySearch = false;
					this.visibleCreate = false;
			},
			handleOkCreateBySearch(){
                
				let facuId = this.facultyId.length == 0 ? 0 : this.facultyId[0];
				let specId = this.specialtyId.length == 0 ? 0 : this.specialtyId[0];
				let clazzId = this.clazzId.length == 0 ? 0 : this.clazzId[0];

				axios({					
					url: 'enroll/createNum/batchCreateNumBySearch',
					method: 'post',
					params: {
						"clazzId": clazzId,
						"facultyId": facuId,
						"specialtyId": specId,
					}
				}).then(res => {
					
					this.$message.success(res.result);
					this.getStuList();

				}).catch(err => {
					this.$message.warning("搜索条件批量编制学号失败");
				})
				this.visibleCreateBySearch = false;
            },

			onSelectChange(selectedRowKeys) {
                this.selectedRowKeys = selectedRowKeys;
                
            },

			clear(){											
				this.facultyId = [];
				this.specialty = [];
				this.specialtyId = [];
				this.clazz = [];
				this.clazzId = [];
				
			},
			empty(){				
				this.keyword = '';
				this.keysVal = [];
				this.clear();
			},			
			search(){			
				this.currentPage = 1;				
				this.curFaculty = this.facultyId.length == 0 ? 0 : this.facultyId[0];
				this.curSpecialty = this.specialtyId.length == 0 ? 0 : this.specialtyId[0];
				this.curClazz = this.clazzId.length == 0 ? 0 : this.clazzId[0];
				this.kw = this.keyword;
				this.condit = this.keysVal[0] == undefined ? 'XM' : this.keysVal[0];
				this.getStuList();

			},
			refresh(){								
				this.selectedRowKeys=[];
				this.getStuList();
			},
			
			tableChange(pagination) {
				
				this.pagination.current = pagination.current;
				this.pagination.pageSize = pagination.pageSize;

				this.currentPage = pagination.current;
				this.pageSize = pagination.pageSize;

				this.getStuList();

			},
			getStuList() {
				
				let currentPage = this.currentPage;
				let pageSize = this.pageSize;
				
				axios({
					
					url: 'enroll/stuInfoQuery/select',
					method: 'post',
					params: {						 
						 "facultyId": this.curFaculty,
						 "specialtyId": this.curSpecialty,
						 "clazzId": this.curClazz,
						 "keyword": this.kw,
						 "condit": this.condit,
						 "currentPage": currentPage,
						  //  ---------------林彬辉
						 "isNum":0,
						//  ----------------
						 "pageSize": pageSize
					}
				}).then(res => {
					if (res.code == 500) {
            			this.$message.warning(res.message)
            			return
          			}

					data.splice(0, data.length);
					
					if(res.result.list.length==0){
						return;
					}

					for (let stu of res.result.list) {
						let sex = stu.xbm == 1 ? '男' : '女';
						// --------------林彬辉
						let state = stu.isAdmit == 1 ? '未录取' : '已录取';
						// --------------
						data.push({
							key: stu.id,
							XM: stu.xm,
							// --------------林彬辉
							XSDQZTM:state,
							// ------------
							SFZH: stu.sfzh,
							YXMC: stu.yxmc,
							ZYMC: stu.zymc,	
							XBM: sex,						
							NJMC: stu.njmc,
							XZBMC: stu.xzbmc,
							XSLXDH: stu.xslxdh,
						})
					}
					this.pagination.current = currentPage;
					this.pagination.total = res.result.count;
				}).catch(err => {
					this.$message.warning("获取学生列表失败！");
				})
			},
			addCondit(){
				for (let k of [{value:'XM',label:'姓名'},{value:'SFZH',label:'身份证号'}]) {
						this.keys.push({
							value: k.value,
							label: k.label
						})
					}
			},
			
			getFaculty() {
				
				axios({
					url: 'enroll/reportMng/getFaculty',
					method: 'post',
					params: {}
				}).then(res => {

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
			getClazz(){
				
				let curSpecialty = this.specialtyId.length == 0 ? 0 : this.specialtyId[0];

				this.clazz = [];
				this.clazzId = [];
				
				axios({
					url: 'enroll/stuInfoQuery/getClazz',
					method: 'post',
					params: {
						"specialtyId": curSpecialty,
					}
				}).then(res => {

					this.clazz.splice(0, this.clazz.length);
					for (let clazz of res.result) {
						this.clazz.push({
							value: clazz.id,
							label: clazz.xzbmc
						})
					}
				}).catch(err => {
					this.$message.warning("获取班级失败");
				})
				
			},
			
		}
	};
</script>

<style>

.stuInfo-input{
	margin-left: 10px;
}

.create-text{
  width: 190px;
  height: 19px;
  color: #666666;
  line-height: 24px;
}

.create-search-text{
  height: 19px;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 700;
  color: #666666;
  line-height: 24px;
  margin-top: 20px;
  margin-left: 25px;
}

</style>