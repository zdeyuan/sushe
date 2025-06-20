<template>
	<div  class='constbox'>
		
		<div class="pageContentBox">
            <div class="div-bg" style="margin-bottom: 10px;"><div class="span-class">温馨提示：分班之前需要按专业部、专业和年级搜索未分班学生，再根据专业的班级列表设定好班级，然后批量选中学生，调整到某一个班级里面。</div></div>
			<div>

                <a-row>
                    <a-col :span="11">
                        
                        <div class="content-head">
                            <div style="display:inline-block;margin-bottom:5px;margin-right:5px;">
					            <!-- <span class="divide-span">年级</span> -->
					           年级：<j-select-grade placeholder="请选择年级" v-model="gradeId"></j-select-grade>
							</div><div style="display:inline-block;margin-bottom:5px;">
					            <!-- <span class="divide-span">专业部</span> -->
					           专业部： <j-select-zyb placeholder="请选择院系" v-model="facultyId"  :trigger-change="false" ></j-select-zyb>
							</div><div style="display:inline-block">
					            <!-- <span class="divide-span">专业</span> -->
					           专业： <j-select-zy-by-zyb ref="zyByZyb" placeholder="请选择专业" v-model="specialtyId"  :trigger-change="false"></j-select-zy-by-zyb>
                            </div>
				        </div>

                        <div class="content-head">
				            <div>					

					            <a-cascader :options="keys" :default-value="defVal" style="width:100px" placeholder="姓名" class="condition select"
						            v-model="keysVal"/>					
								 <a-input class="condition-input" style="width: 200px;"  placeholder="请输入" v-model.trim="keyword" />	
					            <a-button type="primary" icon="search" style="margin-right: 10px; margin-top: 10px;" @click="search">
						            搜索
					            </a-button>

					            <a-button type="danger"  icon="delete" @click="empty">
						            
						            清空
					            </a-button>
				            </div>
			            </div>

                        <div class="content-head ">
				            <div class="noDivideFont">					
                                未分班学生信息
				            </div>
			            </div>

                        <div>
				            <a-table 		
                                class="my-table"			
					            :columns="columns" 
								:scroll="{ x: 900, y: 300 }"
					            :data-source="data" 
					            :row-selection="rowSelection" 
					            :defaultCurrent="6"
					            :pagination="pagination" 					
					            @change="tableChange">
										
				            </a-table>
			            </div>

                    </a-col>

                    <a-col :span="2" class="center-col">
                    
                        <div>
                            <div class="btn-div">
                                <a-button class="divide-btn" @click="showModalDivide">
                                    <img src="@/assets/img/right.png" class="icon-divide"/>
                                </a-button>
								<a-modal v-model="visibleDivide" title="提示" @ok="handleOkDivide" :width="478"> 
									<template slot="footer">		
                        			<a-button key="back"  @click="handleOkDivide" class="btn"> 确定</a-button>
                        			<a-button key="submit" type="primary"  @click="closePop"  class="btn-cancle">取消</a-button>
                        			</template>		
      								<div class="divide-text">你确定要将这{{divideNum}}名学生进行分班吗？</div>
    							</a-modal>
                                <span class="divideOrDrop">分班</span>
                            </div>

                            <div class="btn-div-two">
                                <a-button class="drop-btn" @click="showModalDrop">
                                    <img src="@/assets/img/left.png" class="icon-divide"/>
                                </a-button>
								<a-modal v-model="visibleDrop" title="提示" @ok="handleOkDrop" :width="478"> 
									<template slot="footer">		
                        			<a-button key="back"  @click="handleOkDrop" class="btn"> 确定</a-button>
                        			<a-button key="submit" type="primary"  @click="closePop"  class="btn-cancle">取消</a-button>
                        			</template>	
      								<div class="drop-text">你确定要将这{{dropNum}}名学生退成未分班的学生吗？</div>
    							</a-modal>
                                <span class="divideOrDrop">退班</span>
                            </div>

                        </div>
                       
                    </a-col>

                    <a-col :span="11">
                        
                        <div class="content-head">
                            <div>
					            <span class="divide-span">可以分配的班级列表：</span>
					            <a-cascader :options="clazz" placeholder="请选择" @change="getClazzInfo"
						            v-model="clazzId" />

                                <a-button type="danger"  icon="delete" style="margin-left:10px;" @click="clear">
						            
						            清除
					            </a-button>
                            </div>
                           
                        </div>  

                        <div class="content-head">                         
                            <div class="two">
                               <span class="people-span">总人数：{{totalMan}} </span> 
                                <span class="people-span">现有男生：{{man}} </span>  
                                <span class="people-span">女生：{{women}} </span> 
                                <span class="people-span">可分配：{{distribute}}</span>
                            </div>
                        </div>

                        <div class="content-head ">
				            <div class="noDivideFont">					
                                班级新生信息（已经在校的学生不会在这显示）
				            </div>
			            </div>

                        <div>
				            <a-table 			
                                class="my-table"	
							    :scroll="{ x: 900 }"
					            :columns="columnsRight" 
					            :data-source="dataRight" 
					            :row-selection="rowSelectionRight" 
					            :defaultCurrent="6"
					            :pagination="paginationRight" 					
					            @change="tableChangeRight">

				            </a-table>
			            </div>

                     </a-col>
                </a-row>
                
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
	} from "@/utils/request"
	import JSelectGrade from '@/components/kwglbiz/JSelectGrade'
	import JSelectZyb from '@/components/kwglbiz/JSelectZyb'
	import JSelectZyByZyb from '@/components/kwglbiz/JSelectZyByZyb'
    const IconFont = Icon.createFromIconfontCN({
		scriptUrl: '//at.alicdn.com/t/font_2390461_f6v2cx4wmzq.js',
	});

    const columns = [{
			title: '姓名',
			dataIndex: 'XM',
			key: 'XM',
			width: 80,
			ellipsis:true
		},
		{
			title: '准考证号',
			dataIndex: 'ZKZH',
			key: 'ZKZH',
			width: 100,
			ellipsis:true
		},
        {
			title: '性别',
			dataIndex: 'XBM',
			key: 'XBM',
			width: 80,
			ellipsis:true
		},
		{
			title: '所属专业部',
			dataIndex: 'YXMC',
			key: 'YXMC',
			width: 120,
			ellipsis:true
		},
		{
			title: '所属专业',
			dataIndex: 'ZYMC',
			key: 'ZYMC',
			width: 120,
			ellipsis:true
		},
		// {
		// 	title: '所属年级',
		// 	dataIndex: 'NJMC',
		// 	key: 'NJMC',
		// 	width: 100,
		// 	ellipsis:true
		// },
		
	];

    const columnsRight = [{
			title: '姓名',
			dataIndex: 'XM',
			key: 'XM',
			width: 150,
			ellipsis:true
		},
		{
			title: '准考证号',
			dataIndex: 'ZKZH',
			key: 'ZKZH',
			width: 200,
			ellipsis:true
		},
        {
			title: '性别',
			dataIndex: 'XBM',
			key: 'XBM',
			width: 100,
			ellipsis:true
		},
		{
			title: '所属专业部',
			dataIndex: 'YXMC',
			key: 'YXMC',
			width: 100,
			ellipsis:true
		},
		{
			title: '所属专业',
			dataIndex: 'ZYMC',
			key: 'ZYMC',
			width: 100,
			ellipsis:true
		},
		{
			title: '所属年级',
			dataIndex: 'NJMC',
			key: 'NJMC',
			width: 100,
			ellipsis:true
		},
		
	];

	let data = [];
	let dataRight = [];

export default {
    data(){
        return{
            pagination: {
				current: 0,
				pageSize: 10,				
				pageSizeOptions: ['10', '20','30','50'],
				showTotal: (total, range) => {
					return '显示' + range[0] + '到' + range[1] + '条, 共' + total + '条记录'
				},
                showSizeChanger: true,
				showQuickJumper: true,					
				total: 0
			},
			selectedRowKeys: [],
            paginationRight: {
				current: 0,
				pageSize: 10,				
				pageSizeOptions: ['10', '20','30','50'],
				showTotal: (total, range) => {
					return '显示' + range[0] + '到' + range[1] + '条, 共' + total + '条记录'
				},
                showSizeChanger: true,
				showQuickJumper: true,					
				total: 0
			},
			selectedRowKeysRight: [],
			/* 页码 */
			currentPage: 1,
			pageSize: 10,
			currentPageRight: 1,
			pageSizeRight: 10,
            /* 下拉框数据 */
            grade: [],
            gradeId: '',
            faculty: [],
			facultyId: '',
			specialty: [],
			specialtyId: '', 
			clazz: [],
			clazzId: '',
            keys: [{value:'XM',label:'姓名'},{value:'SFZH',label:'身份证号'}],
			defVal: ['XM'],
			keysVal: [],
			/* 数据 */
			curGrade: 0,
			curFaculty: 0,
			curSpecialty: 0,
			condit: 'XM',
            /* 关键词 */
			kw: '',
			keyword: '',
            /* 表格数据 */
			data,
			columns,
            dataRight,
            columnsRight,
            /* 显示的数据 */
            totalMan: 0,
            man: 0,
            women: 0,
            distribute: 0,
			divideNum: 0,
			dropNum: 0,
			clazzName: '',	
			/* 弹出框属性 */		
			visibleDivide: false,
			visibleDrop: false,
        };
    },
    computed: {
            rowSelection() {              
                const selectedRowKeys = this.selectedRowKeys; //常量
                
                return {
                    selectedRowKeys,
                    onChange: this.onSelectChange,
                };
            },
            rowSelectionRight() {              
                const selectedRowKeysRight = this.selectedRowKeysRight; //常量
                
                return {
                    selectedRowKeysRight,
                    onChange: this.onSelectChangeRight,
                };
            },
        },
    components: {
		IconFont,
		JSelectGrade,
		JSelectZyb,
		JSelectZyByZyb
	},
	watch:{
			facultyId(val){
				this.zybChange(val)
			},
			gradeId(val){
				this.getClazz();
			},specialtyId(val){
				this.getClazz();
			}
	},
    mounted() {		
				
			//this.getStuList();
			// this.getGrade();
			// this.getFaculty();
			this.getStuOfNoDivideClass();
		},
    methods:{
		
		showModalDivide() {
			if (this.selectedRowKeys.length == 0) {
				this.$message.warning("请选择要分班的学生！");
				return;
			}

			if(this.clazzId == ''){
				this.$message.warning("请选择一个班级！");
				return;
			}
			this.clazzName = this.clazz[0].label;
			this.divideNum = this.selectedRowKeys.length;
			this.visibleDivide = true;
		},
		handleOkDivide(){
			this.divideClass();
			this.visibleDivide = false;
		},
		showModalDrop(){
			if (this.selectedRowKeysRight.length == 0) {
				
				this.$message.warning("请选择要退班的学生！");
				return;
			}
			this.dropNum = this.selectedRowKeysRight.length;
			this.visibleDrop = true;
		},
		handleOkDrop(){
			this.dropClass();
			this.visibleDrop = false;
		},
		closePop(){
			this.visibleDrop = false;
			this.visibleDivide = false;
		},
        onSelectChange(selectedRowKeys) {
            this.selectedRowKeys = selectedRowKeys;              
        },
        onSelectChangeRight(selectedRowKeysRight) {
            this.selectedRowKeysRight = selectedRowKeysRight;              
        },
        tableChange(pagination) {
			
			this.pagination.current = pagination.current;
			this.pagination.pageSize = pagination.pageSize;

			this.currentPage = pagination.current;
			this.pageSize = pagination.pageSize;

			this.getStuOfNoDivideClass();

		},
		tableChangeRight(paginationRight){
			this.paginationRight.current = paginationRight.current;
			this.paginationRight.pageSize = paginationRight.pageSize;

			this.currentPageRight = paginationRight.current;
			this.pageSizeRight = paginationRight.pageSize;

			this.getClazzInfo();

		},
		zybChange(code) {
		  if (this.$refs.zyByZyb != null) {
		    this.$refs.zyByZyb.initDictData(code)
		  }
		},
        clear(){				
			this.gradeId = [];				
			this.facultyId = [];
			this.specialty = [];
			this.specialtyId = [];
			this.clazz = [];
			this.clazzId = [];

			this.totalMan = 0;
			this.man = 0;
			this.women = 0;
			this.distribute = 0;

			this.getClazzInfo();
        	this.getStuOfNoDivideClass();
				
		},
		empty(){				
			this.keyword = '';
			this.keysVal = [];

			this.clear();

			this.search();

		},
        search(){
			this.currentPage = 1;
			this.curGrade = this.gradeId.length == 0 ? 0 : this.gradeId;
			this.curFaculty = this.facultyId.length == 0 ? 0 : this.facultyId;
			this.curSpecialty = this.specialtyId.length == 0 ? 0 : this.specialtyId;
			this.kw = this.keyword;
			this.condit = this.keysVal[0] == undefined ? 'XM' : this.keysVal;
			this.getStuOfNoDivideClass();
			//this.getClazz();
        },
		divideClass(){
			
			let clazzId = this.clazzId[0];
			let ids = '';
				
				for (let i = 0; i < this.selectedRowKeys.length; i++) {
					ids += this.selectedRowKeys[i];
					if (i != this.selectedRowKeys.length - 1) {
						ids += ',';
					}
				}

				axios({
					url: 'enroll/divideClassMng/divideClass',
					method: 'post',
					params: {
						"clazzId": clazzId,
						 "ids": ids,
					}
				}).then(res => {
					
					this.$message.success(res.result);
					
					this.getStuOfNoDivideClass();
					this.getClazzInfo();

					this.selectedRowKeys=[];
					this.selectedRowKeysRight=[];

				}).catch(err => {
					this.$message.warning("分班失败");
				})

		},
		dropClass(){

			let clazzId = this.clazzId[0];
			let ids = '';
				
				for (let i = 0; i < this.selectedRowKeysRight.length; i++) {
					ids += this.selectedRowKeysRight[i];
					if (i != this.selectedRowKeysRight.length - 1) {
						ids += ',';
					}
				}

				axios({
					
					url: 'enroll/divideClassMng/dropClass',
					method: 'post',
					params: {
						"clazzId": clazzId,
						 "ids": ids,
					}
				}).then(res => {
					
					this.$message.success(res.result);
					
					this.getStuOfNoDivideClass();
					this.getClazzInfo();

					this.selectedRowKeys=[];
					this.selectedRowKeysRight=[];

				}).catch(err => {
					this.$message.warning("退班失败");
				})

		},
        getStuOfNoDivideClass(){

				let currentPage = this.currentPage;
				let pageSize = this.pageSize;
				
				axios({
					
					url: 'enroll/divideClassMng/select',
					method: 'post',
					params: {
						 "gradeId": this.curGrade,
						 "facultyId": this.curFaculty,
						 "specialtyId": this.curSpecialty,
						 "keyword": this.kw,
						 "condit": this.condit,
						 "currentPage": currentPage,
						 //  ---------------林彬辉
						 "isNum":0,
						//  ----------------
						 "pageSize": pageSize
					}
				}).then(res => {

					data.splice(0, data.length);

					for (let stu of res.result.list) {
						let sex = stu.xbm == 1 ? '男' : '女';
						
						data.push({
							key: stu.id,
							XM: stu.xm,
                            ZKZH: stu.zkzh,							
							XBM: sex,
                            YXMC: stu.yxmc,
							ZYMC: stu.zymc,
							NJMC: stu.njmc,
						})
					}
					this.pagination.current = currentPage;
					this.pagination.total = res.result.count;
				}).catch(err => {
				})
        },
        getGrade() {
				
				axios({
					url: 'enroll/divideClassMng/getGrade',
					method: 'post',
					params: {}

				}).then(res => {

					for (let grade of res.result) {
						this.grade.push({
							value: grade.id,
							label: grade.njmc
						})
					}
				}).catch(err => {
					this.$message.warning("获取年级失败");
				})
		},
		getFaculty() {
				
				axios({
					url: 'enroll/reportMng/getFaculty',
					method: 'post',
					params: {
						
					}
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

					//this.search();
					
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
			this.curGrade = this.gradeId.length == 0 ? 0 : this.gradeId[0];
			this.curFaculty = this.facultyId.length == 0 ? 0 : this.facultyId[0];
			this.curSpecialty = this.specialtyId.length == 0 ? 0 : this.specialtyId[0];

			this.selectedRowKeys=[];
			this.selectedRowKeysRight=[];

				this.clazz = [];
				this.clazzId = [];
				if(!this.gradeId&&!this.specialtyId){
					this.$message.warning("请选择年级或专业");
					return;
				}
				axios({
					url: 'enroll/divideClassMng/getClazz',
					method: 'post',
					params: {
						"gradeId": this.gradeId,
						"specialtyId": this.specialtyId,
					}
				}).then(res => {

					this.search();
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
		getClazzInfo(){
			let clazzId = this.clazzId.length == 0 ? 0 : this.clazzId[0];
			this.selectedRowKeys=[];
			this.selectedRowKeysRight=[];
			
			let currentPage = this.currentPageRight;
			let pageSize = this.pageSizeRight;

				axios({
					
					url: 'enroll/divideClassMng/getClazzInfo',
					method: 'post',
					params: {
						 "clazzId": clazzId,
						 "currentPage": currentPage,
						 "pageSize": pageSize
					}
				}).then(res => {

					dataRight.splice(0, dataRight.length);
					
					this.man = res.result.clazz.nansrs;
					this.women = res.result.clazz.nvsrs;
					this.totalMan = this.man + this.women;
					this.distribute = res.result.clazz.zrs - this.man - this.women;

					for (let stu of res.result.list) {
						let sex = stu.xbm == 1 ? '男' : '女';
						
						dataRight.push({
							key: stu.id,
							XM: stu.xm,
                            ZKZH: stu.zkzh,							
							XBM: sex,
                            YXMC: stu.yxmc,
							ZYMC: stu.zymc,
							NJMC: stu.njmc,
						})
					}
					this.paginationRight.current = currentPage;
					this.paginationRight.total = res.result.count;
				}).catch(err => {
					this.$message.warning("当前条件没有班级！");
				})
		},
    }

}
</script>

<style>

.my-table .ant-pagination-total-text {
    position: absolute;
    margin-top: 30px;
    font-family: "Adobe Heiti Std R";
    font-size: 14px;
    font-weight: 400;
    color: #999999;
}

.div-bg{
    background-color: #DEE2E6;
    border: 1px solid #DEE2E6;
	padding:10px
}

.span-class{
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 700;
    color: #3581A6;
    line-height: 24px;
}

.center-col{ 
    border: 1px solid rgba(217, 237, 244, 0.3);
}

.btn-div{
    width: 40px;
    margin: 176px auto;
}

.btn-div-two{
    width: 40px;
    margin: 10px auto;
}

.divide-btn{
    width: 40px;
    height: 40px;  
    background-color: #00D09D;
}

  .divide-btn,
  .divide-btn:hover,
  .divide-btn:active,
  .divide-btn:focus{
    color: white;
    background: #00D09D;
  }

.drop-btn{
    width: 40px;
    height: 40px;  
    background-color: #FC8950;
}
  .drop-btn,
  .drop-btn:hover,
  .drop-btn:active,
  .drop-btn:focus{
    color: white;
    background: #FC8950;
  }

.divideOrDrop{
    height: 19px;
    font-size: 20px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #666666;
}

.divide-select{
    width: 150px;
    height: 34px;
    background: rgba(255, 255, 255, 0);
    border: 1px solid rgba(217, 237, 244, 0.3);
    border-radius: 3px;
    margin-left: 10px;
    margin-right: 10px;
}

.divide-select span,
.divide-select input {
    width: 150px;
    height: 34px;
    background: rgba(255, 255, 255, 0);
    border: 1px solid rgba(217, 237, 244, 0.3);
    border-radius: 3px;
}

.divide-span{
    height: 18px;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #666666;
    line-height: 24px;
    text-align: center;
    
}

.noDivideFont{
    height: 21px;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #666666;
}


.people-span{
    height: 19px;
    margin-right: 30px;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #666666;
    line-height: 24px;
    text-align: center;
}


</style>