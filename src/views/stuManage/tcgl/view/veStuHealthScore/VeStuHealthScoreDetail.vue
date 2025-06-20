<template>
    <edu-layout type="table" :extHeight="viewType == 'detail' ? 50 : 0" :topName="viewType == 'detail' ? '体质管理' : ''">
        <!-- 表格 -->
        <div slot="table" class="right_table">
            <div>
                <edu-query ref="cwQuery" ext="boxZybmbj" code="veStuHealthScore" :do-filter="handleFilter" :is-show-btn="saveBatch">
                </edu-query>

                <template>
                    <div class="table-box">
                        <!-- 编辑页 -->

                        <div class="sysBtn">
                            <slot name="top_bef_btn"></slot>
                            <slot name="top_btn">
                                <edu-pms type="primary" :code="code + '-btn-add'" ext="add" iconfont="plus" name="保存" @click="saveBatch"></edu-pms>
                            </slot>
                            <slot name="top_af_btn"></slot>
                        </div>
                        <slot name="btn_af_div"></slot>
                        <div class="table-useful">
                            <a-table :columns="columns" :data-source="data" bordered :customRow="getChange">
                                <template
                                        v-for="col in ['fiftyvalue', 'zwtqqvalue', 'jumpvalue', 'pullsitvalue', 'runvaluename']"
                                        :slot="col"
                                        slot-scope="text, record, index"
                                >
                                    <div :key="col">
                                        <a-input
                                                v-if="record.editable"
                                                style="margin: -5px 0"
                                                :value="text"
                                                @change="e => handleChange(e.target.value, record.key, col)"
                                        />
                                        <template v-else>
                                            {{ text }}
                                        </template>
                                    </div>
                                </template>
                            </a-table>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </edu-layout>

</template>

<script>
    import veStuHealthScoreApi from '@/views/stuManage/tcgl/api/veStuHealthScoreApi';
    import baseApi from '@/views/stuManage/tcgl/api/baseApi';
    const columns = [
        {
            title: '学生体质健康测试登记表',
            align:'center',
            children:[
                {
                    title:'专业： 班级：',
                    align:'center',
                    children:[
                        {
                            title: '',
                            align:'center',
                            height: 100,
                            children: [
                                {
                                    title: '序号',
                                    dataIndex: '',
                                    key: 'rowIndex',
                                    width: 15,
                                    align: 'center',
                                    customRender: function (t, r, index) {
                                        return parseInt(index) + 1
                                    },
                                },
                                {
                                    title: '座号',
                                    dataIndex: 'xh',
                                    key: 'xh',
                                    width: 15,
                                    align:'center',
                                    customRender: function (text) {
                                        return text.substr(-2);
                                    },
                                },
                                {
                                    title: '姓名',
                                    dataIndex: 'xm',
                                    key: 'xm',
                                    width: 15,
                                    align:'center',
                                },
                                {
                                    title: '性别',
                                    dataIndex: 'xbm',
                                    key: 'xbm',
                                    width: 15,
                                    align:'center',
                                    customRender: function (text) {
                                        if (text == 1) {
                                            return "男";
                                        } else if (text == 2) {
                                            return "女";
                                        } else {
                                            return text;
                                        }
                                    }
                                },
                                {
                                    title: '50米跑(秒)',
                                    align:'center',
                                    children:[
                                        {
                                            title: '数量',
                                            dataIndex: 'fiftyvalue',
                                            key: 'fiftyvalue',
                                            width: 15,
                                            align:'center',
                                            scopedSlots: { customRender: 'fiftyvalue' },
                                        },
                                        {
                                            title: '成绩',
                                            dataIndex: 'fiftyscore',
                                            key: 'fiftyscore',
                                            width: 15,
                                            align:'center',
                                        }
                                    ]
                                },
                                {
                                    title: '坐位体前屈(cm)',
                                    align:'center',
                                    children:[
                                        {
                                            title: '数量',
                                            dataIndex: 'zwtqqvalue',
                                            key: 'zwtqqvalue',
                                            width: 15,
                                            align:'center',
                                            scopedSlots: { customRender: 'zwtqqvalue' },
                                        },
                                        {
                                            title: '成绩',
                                            dataIndex: 'zwtqqscore',
                                            key: 'zwtqqscore',
                                            width: 15,
                                            align:'center',
                                        }
                                    ]
                                },
                                {
                                    title: '立定跳远(cm)',
                                    align:'center',
                                    children:[
                                        {
                                            title: '数量',
                                            dataIndex: 'jumpvalue',
                                            key: 'jumpvalue',
                                            width: 15,
                                            align:'center',
                                            scopedSlots: { customRender: 'jumpvalue' },
                                        },
                                        {
                                            title: '成绩',
                                            dataIndex: 'jumpscore',
                                            key: 'jumpscore',
                                            width: 15,
                                            align:'center',
                                        }
                                    ]
                                },
                                {
                                    title: '引体向上(男)1分钟仰卧起坐(女)(次)',
                                    align:'center',
                                    children:[
                                        {
                                            title: '数量',
                                            dataIndex: 'pullsitvalue',
                                            key: 'pullsitvalue',
                                            width: 15,
                                            align:'center',
                                            scopedSlots: { customRender: 'pullsitvalue' },
                                        },
                                        {
                                            title: '成绩',
                                            dataIndex: 'pullsitscore',
                                            key: 'pullsitscore',
                                            width: 15,
                                            align:'center',
                                        }
                                    ]
                                },
                                {
                                    title: '1000米跑(男)800米跑(女)(分·秒)',
                                    align:'center',
                                    children:[
                                        {
                                            title: '数量',
                                            dataIndex: 'runvaluename',
                                            key: 'runvaluename',
                                            width: 15,
                                            align:'center',
                                            scopedSlots: { customRender: 'runvaluename' },
                                        },
                                        {
                                            title: '成绩',
                                            dataIndex: 'runscore',
                                            key: 'runscore',
                                            width: 15,
                                            align:'center',
                                        }
                                    ]
                                },
                            ],
                        },
                    ],

                },
            ],
        },
    ];
    export default {
        props: {
            viewType: String
        },
        components: {
        },
        data() {
            return {
                code:'veStuHealthScore',
                isShowImport:false,
                columns,
                data:[],
                editingKey: '',
                queryParam:{},
                grade:null,
                specData:[],
                classData:[],
            };
        },
        mounted() {},
        created(){
        },
        methods: {
            getParams() {
                const params = this.$refs['cwQuery'].getQueryData({ base: true });
                for (var i = 0; i < params.conditions.length; i++){
                    this.queryParam[params.conditions[i].column] = params.conditions[i].value
                }
                if (this.queryParam.bjId) {
                    return true;
                }
            },
            doImport() {
                return {
                    temp: ['姓名' /* stuId */, '学号' /* stuId */, '开始时间' /* startTime */, '结束时间' /* endTime */, '健康体质得分' /* score */],
                    tempName: '体质健康记录',
                    implName: 'veStuHealthScoreServiceImpl.importExcel'
                };
            },
            /**
             * @msg: 表格获取请求数据 必须return 一个对象
             */
            // getParams() {
            //     const params = this.$refs['cwQuery'].getQueryData({ base: true });
            //     return params;
            // },
            /**
             * @msg: 搜索事件
             */
            handleFilter() {
                if (!this.getParams()){
                    this.$message.warning('请选择班级')
                    return
                }
                this.getGrade()
                this.list()
            },
            getGrade(){
                var specId = this.queryParam.specId
                var bjId = this.queryParam.bjId
                baseApi.getActionZhuanyeById(specId).then(res => {
                    this.specData = res.result
                });
                baseApi.getActionBanjiById(bjId).then(res => {
                    this.classData = res.result
                    this.getTerm(this.classData.njdm)
                });
            },
            getTerm(startYear){	//取入学年份
                let date=new Date;	//当前时间
                let year=date.getFullYear();	//现在年份
                let month=date.getMonth()+1;    //getMonth()获取当前月份(0-11,0代表1月)
                let term = (year - startYear)*2 + parseInt(month/9);	//学期
                let yTermValue = year - startYear + parseInt(month/9); //计算学年，如2018-2019学年两个学期值都是2018，方便写入选择器
                if (yTermValue > 3) {
                    yTermValue = 3;
                }
                this.grade = yTermValue
            },
            list() {
                this.data = [];
                veStuHealthScoreApi.page(this.queryParam).then(res => {
                    let data = res.result.records
                    if (data == null || data.length < 1) {
                        this.$message.warning('暂无数据')
                        return
                    }
                    for (let i = 0; i < data.length; i++) {
                        data[i].key = i.toString()
                    }
                    this.data = data;
                    this.columns[0].children[0].title = '专业：'+this.specData.zymc+' 班级：'+this.classData.xzbmc
                });
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
            saveBatch() {
                this.editingKey = '';
                const newData = [...this.data];
                let dataList = [];
                for (let i = 0; i < newData.length; i++){
                    if (newData[i].editable != null) {
                        newData[i].grade = this.grade;
                        dataList.push(newData[i])
                    }
                }
                veStuHealthScoreApi.saveBatch(dataList).then(res => {
                    this.list();
                });
            },

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
</style>
