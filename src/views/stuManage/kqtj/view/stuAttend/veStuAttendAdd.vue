<template>
    <edu-layout type="table" :extHeight="viewType == 'register' ? 50 : 0" :topName="viewType == 'register' ? '考勤登记' : ''">
        <!-- 表格 -->
        <div slot="table" class="right_table">
            <div>
                <edu-query ext="boxZybmbj" ref="cwQuery" code="veStuAttend" :do-filter="handleFilter" @changeBj="handleFilter" @refreshBack="refreshBack">
                    <template slot="search">
                        <edu-query-item title="教师" pname="teacher_name" pop="like" stype="input"> </edu-query-item>
                        <edu-query-item title="学期" pname="sem_id" pop="eq">
                            <termList ref="termList" v-model="veStuAttendQuery.semId"></termList>
                        </edu-query-item>
                        <edu-query-item title="科目" pname="course_id" pop="eq">
                            <a-select v-model="veStuAttendQuery.courseId" allowClear :style="'100%'" placeholder="请选择科目" >
                                <a-select-option v-for="item in courses" :key="item.id" :value="item.id">
                                    {{ item.name }}
                                </a-select-option>
                            </a-select>
                        </edu-query-item>
                        <edu-query-item title="月份" pname="check_time" pop="like">
							<DatePickByCN  mode="month" displayFormat="YYYY-MM"
								   v-model="veStuAttendQuery.checkTime"  placeholder="请选择月份"/>
                            <!-- <a-date-picker
                                    :open="open"
                                    @openChange="openChange"
                                    @panelChange="panelChange"
                                    mode="month"
                                    :value="veStuAttendQuery.checkTime"
                                    format="yyyy-MM"
                                    valueFormat="yyyy-MM"
                            /> -->
                        </edu-query-item>
                    </template>
                </edu-query>
                <p style=" text-align:center;font-size: 18px;font-weight: bold;">{{bjText}}日常考勤表</p>
                <div class="table-useful">
                    <a-table rowKey="stuId" :columns="columns" :data-source="data" :scroll="scrollTemp" bordered :customRow="getChange">
                        <template
                                v-for="col in colDynamic"
                                :slot="col"
                                slot-scope="text, record, index"
                        >
                            <div>
                                <div style="width: 100%;height:100%;" v-if="record.editable" :value="text" @click="e => handleCreate(e, record, col)">
                                    <span v-if="text == 1" class="matter">事假</span>
                                    <span v-else-if="text == 2" class="sick">病假</span>
                                    <span v-else-if="text == 3" class="late">迟到</span>
                                    <span v-else-if="text == 4" class="early">早退</span>
                                    <span v-else-if="text == 5" class="early">旷课</span>
                                    <span v-else>正常</span>
                                </div>
                                <template v-else>
                                    <span v-if="text == 1" class="matter">事假</span>
                                    <span v-else-if="text == 2" class="sick">病假</span>
                                    <span v-else-if="text == 3" class="late">迟到</span>
                                    <span v-else-if="text == 4" class="early">早退</span>
                                    <span v-else-if="text == 5" class="early">旷课</span>
                                    <span v-else>正常</span>
                                </template>
                            </div>
                        </template>
                    </a-table>
                </div>
            </div>
            <veStuAttendEdit v-if="showType == 'edit'" ref="veStuAttendEdit" @onOk="editOk" @onCancel="editCancel">
            </veStuAttendEdit>
        </div>
    </edu-layout>
</template>

<script>
    import baseApi from '@/views/stuManage/tcgl/api/baseApi';
    import veStuAttendApi from '@/views/stuManage/kqtj/api/veStuAttendApi';
    import veStuAttendEdit from './veStuAttendEdit';
    import termList from '@/components/termList'
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
        components: {
            veStuAttendEdit,
            termList,
        },
        props: {
            viewType: String,
            stuId: Number,
            month: String,
        },
        data() {
            return {
                courses:[],
                open: false,
                veStuAttendQuery: {},
                showType: 'table',
                scrollTemp:{ x: 150, y: 200 },
                bjText:'',
                daysArr:[],
                queryParam:{bj_id:114},
                editingKey: '',
                sectionList:[],
                data:[],
                columns:[],
                colDynamic:[],
                weekCourseMap:{},
                veStuAttendVo:null,
            };
        },
        created(){
            this.getCourseList();
        },
        mounted() {},
        methods: {
            refreshBack() {
                this.veStuAttendQuery.checkTime = undefined;
                this.queryParam.check_time = undefined;
            },
            changeBj() {
                this.getCourseList();
            },
            //Ant Design封装月份选择组件
            openChange(status) {
                if (status) {
                    this.open = true;
                } else {
                    this.open = false;
                }
            },
            panelChange(value) {
                this.veStuAttendQuery.checkTime = value ? value.format('yyyy-MM') : '';
                this.open = false;
            },
            getChange(record,index){
                return {
                    on:{
                        click:()=>{
                            this.edit(record.key);
                        },
                    }
                }
            },
            handleChange(value, key, column) {
                // console.log(value,key,column)
                const newData = [...this.data];
                const target = newData.filter(item => key === item.key)[0];
                if (target) {
                    target[column] = value;
                    this.data = newData;
                }
            },
            edit(key) {
                const newData = [...this.data];
                const target = newData.filter(item => key === item.key)[0];
                this.editingKey = key;
                if (target) {
                    target.editable = true;
                    this.data = newData;
                }
            },
            /**
             * @msg: 表格获取请求数据 必须return 一个对象
             */
            getParams() {
                const params = this.$refs['cwQuery'].getQueryData();
                if (this.veStuAttendQuery.checkTime) {
                    params.conditions.push({operator: "like", column: "check_time", value: this.veStuAttendQuery.checkTime})
                }
                for (var i = 0; i < params.conditions.length; i++){
                    this.queryParam[params.conditions[i].column] = params.conditions[i].value
                }
                if (!this.queryParam.bj_id) {
                    return false;
                }
                return params;
            },
            /**
             * @msg: 搜索事件
             */
            handleFilter() {
                // this.$refs.veStuAttendTable.reload();
                // 获取学生列表
                // 获取月课程节次
                let params = this.getParams();
                if (!params){
                    this.$message.warning('请选择班级')
                    return
                }
                console.log(params)
                let weekSection = [];
                console.log(this.queryParam)
                veStuAttendApi.weekSchedule(this.queryParam).then(res => {
                    weekSection = res.result;
                    // console.log(weekSection)
                    /**
                     * 星期包含节次
                     * weekBySectionList = {1:[1,2],2:[2,3]}
                     * @type {{}}
                     */
                    let weekBySectionList = {};
                    let weekCourseMap = {};
                    for (let i = 0; i < weekSection.length; i++) {
                        let courseInfo = weekSection[i];
                        let sectionList = weekBySectionList[courseInfo.week];
                        if (sectionList!=null){
                            sectionList.push(courseInfo.section);
                        } else {
                            sectionList = [courseInfo.section];
                        }
                        weekBySectionList[courseInfo.week] = sectionList
                        weekCourseMap[courseInfo.week] = weekCourseMap[courseInfo.week]!=null?weekCourseMap[courseInfo.week]:{}
                        weekCourseMap[courseInfo.week][courseInfo.section] = courseInfo;
                    }
                    if (Object.getOwnPropertyNames(weekBySectionList).length <= 0){
                        this.data = [];
                        this.columns = [];
                        this.$message.warning('暂无数据')
                        return
                    }
                    this.weekCourseMap = weekCourseMap;
                    /**
                     * sectionList = [{title:'d0601',d:'6月1日',w:4,sList:[1,2]}]
                     * @type {Array}
                     */
                    let sectionList = [];
                    // 获取月历
                    this.getMonthDays(this.queryParam.check_time);
                    // 整合节次月历
                    /**
                     * daysArr = [{title:'d0601',d:'6月1日',w:4}]
                     * @type {Array|*}
                     */
                    let daysArr = this.daysArr;
                    for (let i = 0; i < daysArr.length; i++) {
                        let day = daysArr[i];
                        if (weekBySectionList[day.w]) {
                            day.sList = weekBySectionList[day.w]
                            sectionList.push(day)
                        }
                    }
                    // 生成title
                    let columns = [{
                            title: '',
                            fixed: 'left',
                            children:[
                                {
                                    title: '序号',
                                    align: 'center',
                                    width: 60,
                                    dataIndex: 'rowIndex',
                                    customRender: function (t, r, index) {
                                        return parseInt(index) + 1
                                    },
                                }
                            ]
                        },
                        {
                            title: '',
                            fixed: 'left',
                            children:[
                                {
                                    title: '姓名',
                                    align: 'center',
                                    dataIndex: 'xm',
                                    width: 80,
                                }
                            ]
                        }];
                    let colDynamic = [];
                    for (let i = 0; i < sectionList.length; i++) {
                        // day = {title:'d0601',d:'6月1日',w:4,sList:[1,2]}
                        let day = sectionList[i];
                        let p = {title:day.d,align:'center'}
                        let children = [];
                        let sList = day.sList;
                        for (let j = 0; j < sList.length; j++) {
                            let dataIndex = day.title+'w'+day.w+'s'+sList[j];
                            let s = {title: '第'+sList[j]+'节',align:'center',width: 80,dataIndex: dataIndex,scopedSlots: { customRender: dataIndex}}
                            children.push(s);
                            colDynamic.push(dataIndex);
                        }
                        p.children = children;
                        columns.push(p)
                    }
                    this.columns = columns;
                    this.colDynamic = colDynamic;
                    // console.log(this.colDynamic)
                    // 根据班级id获取学生信息
                    let bjId = this.queryParam.bj_id;
                    baseApi.getStudentPageList(bjId).then(res => {
                        if (res.success) {
                            let data = res.result.list==null?[]:res.result.list
                            let params = this.getParams()
                            veStuAttendApi.all(params).then(res => {
                                let checkList = res.result
                                for (let i = 0; i < data.length; i++) {
                                    data[i].key = i;
                                    data[i].stuId = data[i].id
                                    data[i].id = null
                                    if (checkList != null && checkList.length > 0)
                                        for (let j = 0; j < checkList.length; j++){
                                            let checkAttend = checkList[j];
                                            if (data[i].stuId != checkAttend.stuId){
                                                continue;
                                            }
                                            let checkTime = checkAttend.checkTime;
                                            let week = checkAttend.week;
                                            let section = checkAttend.section;
                                            let title = 'd'+checkTime.replace(/-/g,'')+'w'+week+'s'+section;
                                            data[i][title] = checkAttend.typeId
                                            data[i][title+'id'] = checkAttend.id
                                        }
                                }
                                this.data = data;
                            });

                        } else {
                            this.$message.warning(res.message)
                        }
                    });
                    /*let data = [];
                    for (let i = 0; i < 20; i++){
                        data.push({
                            stuId:i,
                            xm:'周棋洛'+i,
                            d20210602w3s5:i%4,
                            d20210602w3s6:i%3,
                            key:i
                        })
                    }
                    this.data = data*/
                    // console.log(this.data)
                });
            },
            /**
             * @msg: 新增事件
             */
            handleCreate(e, record, column) {
                let status = {
                    text:e.currentTarget.firstElementChild.innerHTML,
                    value:record[column]!=null?record[column]:0
                }
                this.showType = 'edit';
                this.$nextTick(() => {
                    this.$refs.veStuAttendEdit.doCreateAttend(record,column,status,this.weekCourseMap);
                });
            },
            /**
             * @msg: 编辑行事件
             */
            handleUpdate(row) {
                this.showType = 'edit';
                this.$nextTick(() => {
                    // this.$refs.veStuAttendEdit.doUpdate(row);
                });
            },
            /**
             * @msg: 编辑行事件
             */
            toDetail(row) {
                this.showType = 'show';
                this.$nextTick(() => {
                    this.$refs.veStuAttendEdit.doShow(row);
                });
            },
            /**
             * @msg: 编辑页取消事件
             */
            editCancel() {
                this.showType = 'table';
            },
            /**
             * @msg: 编辑页成功事件
             */
            editOk() {
                this.showType = 'table';
                this.handleFilter();
            },
            /**
             * 获取月历
             * @param month
             */
            getMonthDays(month) {
                let now = new Date();
                if (!month){
                    month = now.getMonth() + 1
                } else {
                    month = parseInt(month.split("-")[1])
                }
                now.setMonth(month - 1);
                now.setDate(1);
                let currentWeekday = now.getDay(); // 获取当月1日为星期几

                now.setMonth(month);
                now.setDate(0);
                let currentMonthDays = now.getDate(); // 获取当月天数

                let daysArr = [];
                let tempWeekDay = currentWeekday;
                for(let i = 0; i < currentMonthDays; i++) {
                    now.setDate(i+1);
                    daysArr.push({title:'d'+now.format("yyyyMMdd"),d:now.format("M月d日"),w:tempWeekDay==0?7:tempWeekDay});
                    tempWeekDay++;
                    if(tempWeekDay > 6) {
                        tempWeekDay = 0;
                    }
                }
                this.daysArr = daysArr;
            },
            getCourseList(){
                veStuAttendApi.queryCourseList({}).then(res => {
                    res.result.forEach(element => {
                        element.name = element.KCMC;
                    });
                    this.courses = res.result;
                });
            },
        }
    };

</script>
<style lang="less" scoped>
    /**早退*/
    .early {
        color: #FC8950;
    }
    /*迟到*/
    .late {
        color: #FC8950;
    }
    /*病假*/
    .sick {
        color: #F88600;
    }
    /*事假*/
    .matter {
        color: #F88600;
    }
</style>
