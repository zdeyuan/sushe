<template>
    <div slot="table" class="right_table">
        <div>
            <edu-query ref="cwQuery" ext="boxZybmbj" code="veStuHealthScore" :do-filter="handleFilter" @changeBj="handleFilter" :is-show-btn="saveBatch">
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
                                    v-for="col in ['height', 'weight', 'fhlvalue']"
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
</template>

<script>
    import veStuHealthScoreApi from '@/views/stuManage/tcgl/api/veStuHealthScoreApi';
    import baseApi from '@/views/stuManage/tcgl/api/baseApi';
    const columns = [
        {
            title: '学生体质健康情况登记表',
            align:'center',
            children:[
                {
                    title:'专业： 班级：',
                    align:'center',
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
                            title: '身高(米)',
                            dataIndex: 'height',
                            key: 'height',
                            width: 15,
                            align:'center',
                            scopedSlots: { customRender: 'height' },
                        },
                        {
                            title: '体重(kg)',
                            dataIndex: 'weight',
                            key: 'weight',
                            width: 15,
                            align:'center',
                            scopedSlots: { customRender: 'weight' },
                        },
                        {
                            title: '体重指数(BMI)',
                            align:'center',
                            children: [
                                {
                                    title: '数值',
                                    align:'center',
                                    dataIndex: 'tzzsvalue',
                                    key: 'tzzsvalue',
                                    width: 15,
                                },
                                {
                                    title: '成绩',
                                    align:'center',
                                    dataIndex: 'tzzsscore',
                                    key: 'tzzsscore',
                                    width: 15,
                                }
                            ],
                        },
                        {
                            title: '肺活量(毫升)',
                            align:'center',
                            children: [
                                {
                                    title: '数值',
                                    align:'center',
                                    dataIndex: 'fhlvalue',
                                    key: 'fhlvalue',
                                    width: 15,
                                    scopedSlots: { customRender: 'fhlvalue' },
                                },
                                {
                                    title: '成绩',
                                    align:'center',
                                    dataIndex: 'fhlscore',
                                    key: 'fhlscore',
                                    width: 15,
                                }
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
                queryParam:[],
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
                const params = this.$refs['cwQuery'].getQueryData();
                this.queryParam = veStuHealthScoreApi.getParams(params);
                return this.queryParam;
            },
            doImport() {
                return {
                    temp: ['姓名' /* stuId */, '学号' /* stuId */, '开始时间' /* startTime */, '结束时间' /* endTime */, '健康体质得分' /* score */],
                    tempName: '体质健康记录',
                    implName: 'veStuHealthScoreServiceImpl.importExcel'
                };
            },
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
                var specId = this.queryParam.query.specId
                var bjId = this.queryParam.query.bjId
                baseApi.getActionZhuanyeById(specId).then(res => {
                    this.specData = res.result
                });
                baseApi.getActionBanjiById(bjId).then(res => {
                    this.classData = res.result
                    this.grade = veStuHealthScoreApi.getTerm(this.classData.njdm)
                });
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
