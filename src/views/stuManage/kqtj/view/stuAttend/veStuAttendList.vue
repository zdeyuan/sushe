<template>
    <!--<edu-layout type="table">-->
        <!-- 表格 -->
        <div slot="table" class="right_table">
            <div>
                <edu-query ext="boxZybmbj" ref="cwQuery" code="veStuAttend" :do-filter="handleFilter" @changeBj="changeBj" @refreshBack="refreshBack">
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
                        </edu-query-item>
                    </template>
                </edu-query>
                <edu-table
                        ref="veStuAttendTable"
                        code="veStuAttend"
                        rowKey="stuId"
                        :api="veStuAttendTable.api"
                        :get-params="getParams"
                        :to-detail="toDetail"
                        :config="{
                            pageFn:'count',
                            showNo:false,
                            status:false,
                            delete:false,
                            open:false,
                            close:false,
                        }"
                        :doExport="doExportFn"
                        :exportConfig="{
                          project:'sanming',
                          url: 'veStuAttend/export',
                          name: '《学生考勤信息导出》'
                        }"
                >
                    <a-table-column title="学号" dataIndex="xh" align="center" width="150px"> </a-table-column>
                    <a-table-column title="姓名" dataIndex="xm" align="center" width="150px"> </a-table-column>
                    <a-table-column title="旷课" dataIndex="kk" align="center" width="150px"> </a-table-column>
                    <a-table-column title="迟到" dataIndex="cd" align="center" width="150px"> </a-table-column>
                    <a-table-column title="早退" dataIndex="zt" align="center" width="150px"> </a-table-column>
                    <a-table-column title="事假" dataIndex="sj" align="center" width="150px"> </a-table-column>
                    <a-table-column title="病假" dataIndex="bj" align="center" width="150px"> </a-table-column>

                </edu-table>
            </div>
            <veStuAttendDetail v-if="showType == 'show'" ref="veStuAttendDetail" :veStuAttendQueryParam="veStuAttendQuery" @onOk="editOk" @onCancel="editCancel"> </veStuAttendDetail>
        </div>
    <!--</edu-layout>-->
</template>

<script>
    import veStuAttendApi from '@/views/stuManage/kqtj/api/veStuAttendApi';
    import veStuAttendDetail from './veStuAttendDetail'
    import veStuScoreReport from '../veStuScoreReport'
    import termList from '@/components/termList'
    import http from '@/utils/kq/http'
    const url = http.service.sanming;
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
            veStuAttendDetail,
            veStuScoreReport,
            termList,
        },
        props: {
            viewType: String,
        },
        data() {
            const data = {
                url,
                courses:[],
                month:'',
                open: false,
                veStuAttendQuery: {},
                showType: 'table'
            };
            data.veStuAttendTable = {
                api: veStuAttendApi
            };
            return data;
        },
        created(){
            this.getCourseList();
        },
        mounted() {},
        methods: {
            doExportFn(){
                const config = {
                    nameTime: true
                };
                config.service = 'sanming';

                Object.assign(config, this.exportConfig);
                if (!config.url) {
                    return;
                }
                if (config.nameTime) {
                    config.name = this.exportConfig.name + this.$date.format() + '.xlsx';
                }
                //数据加载
                let reqData = {};
                /* 如果是自己的 */
                reqData['size'] = 100000;
                reqData['current'] = 1;
                if (this.queryParam) {
                    Object.assign(reqData, this.queryParam);
                }
                if (this.getParams) {
                    Object.assign(reqData, this.getParams());
                }
                reqData.sorts = this.sorts;
                this.$http.exportExcel(this.url + config.url, reqData, 'post', {
                    name: config.name
                });
            },
            showStuScore(row){
                // 学生成绩单 TODO
                this.veStuAttendQuery.stuVo = {stuId:row.stuId,stuName:row.xm}
                this.showType = 'edit';
                this.$nextTick(() => {
                    this.$refs.veStuScoreReport.handleFilter();
                });
            },
            changeBj(){
                this.getCourseList();
            },
            refreshBack() {
                this.veStuAttendQuery.checkTime = undefined;
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
            getName(dataId) {
                const list = this.$refs.termList.getList() || [];
                for (let i = 0; i < list.length; i++) {
                    const element = list[i];
                    if (element.id == dataId) return element.name;
                }
                return '-';
            },
            /**
             * @msg: 表格获取请求数据 必须return 一个对象
             */
            getParams() {
                const params = this.$refs['cwQuery'].getQueryData();
                if (!this.veStuAttendQuery.checkTime) {
                    this.veStuAttendQuery.checkTime = new Date().format("yyyy-MM");
                }
                params.conditions.push({operator: "like", column: "check_time", value: this.veStuAttendQuery.checkTime})
                return params;
            },
            /**
             * @msg: 搜索事件
             */
            handleFilter() {
                this.$refs.veStuAttendTable.reload();
            },
            /**
             * @msg: 新增事件
             */
            handleCreate() {
                this.showType = 'edit';
                this.$nextTick(() => {
                    // this.$refs.veStuAttendDetail.doCreate();
                });
            },
            /**
             * @msg: 编辑行事件
             */
            handleUpdate(row) {
                this.showType = 'edit';
                this.$nextTick(() => {
                    // this.$refs.veStuAttendDetail.doUpdate(row);
                });
            },
            /**
             * @msg: 编辑行事件
             */
            toDetail(row) {
                let params = this.getParams();
                params.conditions.push({operator: "eq", column: "stu_id", value: row.stuId})
                let showParam = {xm:row.xm,month:parseInt(this.veStuAttendQuery.checkTime.split('-')[1])+'月'};
                this.veStuAttendQuery.showParam = showParam
                this.veStuAttendQuery.params = params

                this.showType = 'show';
                this.$nextTick(() => {
                    this.$refs.veStuAttendDetail.doShow();
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
                this.$refs.veStuAttendTable.reload();
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
<style lang="less" scoped></style>
