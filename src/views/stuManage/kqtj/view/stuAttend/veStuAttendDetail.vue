<template>
    <!--<edu-layout type="table" :extHeight="viewType == 'detail' ? 50 : 0" :topName="viewType == 'detail' ? '考勤统计详情' : ''">-->
    <!-- 表格 -->
    <!--<div slot="table" class="right_table">

    </div>-->
    <div class="edit_form">
        <edu-form
                :title="textMap[dialogStatus]"
                top="60px"
                width="900px"
                @cancel="handelCancel"
                :is-show-btn-sure="false"
                :is-show-btn-cancel="false"
        >
        <!--<p style=" text-align:center;font-size: 18px;font-weight: bold;">{{monthName}}{{stuName}}异常考勤情况</p>-->
        <edu-table
                ref="veStuAttendTable"
                code="veStuAttend"
                :get-params="getParams"
                :api="veStuAttendTable.api"
                :is-auto-btn="true"
                :isShowTopBtn="false"
                :config="{
                            showNo:false,
                            status:false,
                            delete:false,
                            open:false,
                            close:false,
                        }"
        >
            <a-table-column title="学号" dataIndex="xh" align="center" width="150px"> </a-table-column>
            <a-table-column title="姓名" dataIndex="xm" align="center" width="150px"> </a-table-column>
            <a-table-column title="科目" dataIndex="courseName" align="center" width="150px"> </a-table-column>
            <a-table-column title="老师" dataIndex="teacherName" align="center" width="150px"> </a-table-column>
            <a-table-column title="时间" dataIndex="checkTime" align="center" width="150px"> </a-table-column>
            <a-table-column title="星期" dataIndex="week" align="center" width="150px"> </a-table-column>
            <a-table-column title="节次" dataIndex="section" align="center" width="150px"> </a-table-column>
            <a-table-column title="异常状态" dataIndex="typeId" align="center" width="150px">
                <template slot-scope="text">
                    <span v-if="text == 1" class="matter">事假</span>
                    <span v-else-if="text == 2" class="sick">病假</span>
                    <span v-else-if="text == 3" class="late">迟到</span>
                    <span v-else-if="text == 4" class="early">早退</span>
                    <span v-else-if="text == 5" class="early">旷课</span>
                    <span v-else>正常</span>
                </template>
            </a-table-column>
        </edu-table>
        </edu-form>
    </div>
    <!--</edu-layout>-->

</template>

<script>
    import veStuAttendApi from '@/views/stuManage/kqtj/api/veStuAttendApi';
    export default {
        props: {
            viewType: String,
            stuId: Number,
            month: String,
            veStuAttendQueryParam:{},
        },
        components: {
        },
        data() {
            return {
                textMap: {
                    create: '异常考勤情况'
                },
                dialogStatus: 'create',
                veStuAttendTable:{
                    api: veStuAttendApi
                },
                queryParam:{},
                monthName:'',
                stuName:'',
                dataList:[
                ],
                veStuAttendQuery: {},
                showType: 'table',
                typeNodes: [],
            };
        },
        mounted() {},
        created(){},
        methods: {
            handelCancel() {
                this.$emit('onCancel');
            },
            /**
             * @msg: 表格获取请求数据 必须return 一个对象
             */
            getParams() {
                return this.veStuAttendQueryParam.params;
            },
            /**
             * @msg: 搜索事件
             */
            handleFilter() {
                this.$refs.veStuAttendTable.reload();
            },
            doShow() {
                let show = this.veStuAttendQueryParam.showParam;
                this.stuName = show.xm
                this.monthName = show.month
                this.textMap[this.dialogStatus] =  this.monthName+ this.stuName +this.textMap.create
            }
        }
    };
</script>
<style lang="less" scoped>
    .sysBtn {
        margin-bottom: 10px;
    }
    .sysBtn span {
        margin-right: 4px;
    }
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
