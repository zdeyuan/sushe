<template>
    <div class="edit_form">
        <edu-form
                :title="textMap[dialogStatus]"
                top="60px"
                width="900px"
                @cancel="handelCancel"
                :is-show-btn-sure="false"
                :is-show-btn-cancel="false"
        >
            <!--<p style=" text-align:center;font-size: 18px;font-weight: bold;">{{stuName}}学生成绩单</p>-->
            <div class="table">
                <table >
                    <thead>
                    <tr class="course-head">
                        <th colspan="2">学科</th>
                        <th v-for="(item,i) in courseList">{{item}}</th>
                        <th>实习成绩</th>
                        <th>操行成绩</th>
                    </tr>
                    <tr class="course-head-2">
                        <th colspan="2">学年</th>
                        <th colspan="21" text-align="center">成绩</th>
                    </tr>
                    </thead>
                    <tbody v-for="(item,i) in courseScoreMap">
                    <tr>
                        <th rowspan="4">{{i}}学年</th>
                        <th class="sem-text-align">上学期</th>
                        <td v-for="(score,j) in item[0]">
                            <span v-if="score < 60"><font color="#FF0000">{{score}}</font></span>
                            <span v-else>{{score}}</span>
                        </td>
                        <td v-for="(score,j) in courseList!==undefined&&courseList.length>0?item[0]!==undefined&&item[0].length>0?courseList.length-item[0].length:courseList.length:0"></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th class="sem-text-align">补考</th>
                        <td v-for="(score,j) in item[1]">
                            <span v-if="score < 60"><font color="#FF0000">{{score}}</font></span>
                            <span v-else>{{score}}</span>
                        </td>
                        <td v-for="(score,j) in courseList!==undefined&&courseList.length>0?item[1]!==undefined&&item[1].length>0?courseList.length-item[1].length:courseList.length:0"></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th class="sem-text-align">下学期</th>
                        <td v-for="(score,j) in item[2]">
                            <span v-if="score < 60"><font color="#FF0000">{{score}}</font></span>
                            <span v-else>{{score}}</span>
                        </td>
                        <td v-for="(score,j) in courseList!==undefined&&courseList.length>0?item[2]!==undefined&&item[2].length>0?courseList.length-item[2].length:courseList.length:0"></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th class="sem-text-align">补考</th>
                        <td v-for="(score,j) in item[3]">
                            <span v-if="score < 60"><font color="#FF0000">{{score}}</font></span>
                            <span v-else>{{score}}</span>
                        </td>
                        <td v-for="(score,j) in courseList!==undefined&&courseList.length>0?item[3]!==undefined&&item[3].length>0?courseList.length-item[3].length:courseList.length:0"></td>
                        <td></td>
                        <td></td>
                    </tr>
                    </tbody>
                    <tbody>
                    <tr>
                        <th colspan="2">总评成绩</th>
                        <td v-for="(item,i) in totalScore">{{item}}</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th colspan="2">学籍变动记录</th>
                        <td colspan="21">
                            <div v-for="(item,i) in 6" style="padding-bottom: 5px;padding-top: 5px;"></div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </edu-form>
    </div>
</template>
<script>
    import veStuAttendApi from '@/views/stuManage/kqtj/api/veStuAttendApi';
    export default {
        props: {
            stuVo:{

            },
        },
        data() {
            return {
                textMap: {
                    create: '学生成绩单'
                },
                dialogStatus: 'create',
                courseList:[
                ],
                courseScoreMap:{
                    一:[
                        [],
                        [],
                        [],
                        [],
                    ],
                    二:[
                        [],
                        [],
                        [],
                        [],
                    ],
                    三:[
                        [],
                        [],
                        [],
                        [],
                    ],
                },
                totalScore:[],
                changeRecordsData:[
                ],
                changeRecordsColumns:[
                ],
            };
        },
        created(){
        },
        methods:{
            handelCancel() {
                this.$emit('onCancel');
            },
            handleFilter(){
                // this.stuId = 4822
                let stuId = this.stuVo.stuId
                this.textMap[this.dialogStatus] =  this.stuVo.stuName +this.textMap.create
                veStuAttendApi.getStuScoreMap(stuId).then(res => {
                    if (res.success) {
                        // console.log(res.result)
                        // this.$message.success(res.message)
                        this.courseList = res.result.courseList
                        this.courseScoreMap = res.result.courseScoreMap
                        this.totalScore = res.result.totalScore
                    } else {
                        this.$message.warning(res.message)
                    }
                });
            },
        }
    }
</script>
<style>
    .table table {
        width: 100%;
        text-align: center;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #666666;
    }
    .table th {
        border: 1px solid #CCCCCC;
        height: 30px;
        width:34px;
        line-height: 30px;
    }
    .table .course-head {
        height: 58px;
        background-color: #F4F4FA;
    }
    .table .course-head-2 {
        height: 19.5px;
        background-color: #F4F4FA;
    }
    .table tbody th {
        background-color: #F8F8F9;
    }
    .table td {
        border: 1px solid #CCCCCC;
        font-size: 7px;
        font-weight: normal;
        color: #999999;
        line-height: 8px;
    }
    .table .sem-text-align {
        text-align: left;
        padding: 0 10px;
    }
</style>