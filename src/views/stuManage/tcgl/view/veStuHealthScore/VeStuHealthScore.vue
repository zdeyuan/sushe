<template>
    <edu-layout type="table" :extHeight="50" :topName="topName">
    <div slot="table" class="right_table">
        <div>
            <edu-query ref="cwQuery" ext="boxZybmbj" code="veStuHealthScore" :do-filter="handleFilter" @changeBj="handleFilter" :is-show-btn="saveBatch">
            </edu-query>

            <template>
                <div class="table-box">
                    <!-- 编辑页 -->
                    <edu-form title="导入" v-if="isShowImport" width="40%" top="200px" @ok="doImportFn(false)" @cancel="doImportFn(true)">
                        <div>
                            <a-form-model labelAlign="right">
                                <a-form-model-item label="附近">
                                    <uploadFiles
                                            :showFiles="false"
                                            one
                                            :getParams="doImport"
                                            serviceType="upload"
                                            :showMsg="false"
                                            @upload="doImportFn"
                                            uploadBtnClass="success"
                                            uploadBtnName="选择文件"
                                            style="display: inline-block;"
                                    />
                                </a-form-model-item>
                                <a-form-model-item label="说明" prop="hqUserId" required>
                                    <span>请按模板填写好要导入的数据</span>
                                    <span class="down-btn" @click="tempDownload">模板下载</span>
                                </a-form-model-item>
                            </a-form-model>
                        </div>
                    </edu-form>
                    <div class="sysBtn">
                        <slot name="top_bef_btn"></slot>
                        <slot name="top_btn">
                            <!--<edu-pms :code="code + '-btn-add'" ext="success" iconfont="icondaoru" name="导入" @click="isShowImport = true"></edu-pms>-->
                            <edu-pms type="primary" v-if="viewType == 'base' || viewType == 'detail'" :code="code + '-btn-add'" ext="add" iconfont="plus" name="保存" @click="saveBatch"></edu-pms>
                            <edu-pms ext="success" v-if="viewType == 'summary'" iconfont="icondaochu" name="导出" @click="doExportFn" :code="code + '-btn-add'"></edu-pms>
                        </slot>
                        <slot name="top_af_btn"></slot>
                    </div>
                    <slot name="btn_af_div"></slot>
                    <div class="table-useful">
                        <a-table :columns="columns" :data-source="data" bordered :customRow="getChange">
                            <template
                                    v-for="col in colUpdate"
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
    import uploadFiles from '@/components/uploadFiles';
    import http from '@/utils/kq/http'
    const url = http.service.sanming;
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
            uploadFiles
        },
        data() {
            return {
                url,
                importUrl:'',
                exportConfig:{
                    url: 'veStuHealthScore/export',
                    name: '《国家学生体质健康标准》成绩汇总表'
                },
                topName:'健康测试',
                code:'veStuHealthScore',
                isShowImport:false,
                columns,
                colUpdate:['height', 'weight', 'fhlvalue'],
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
            switch (this.viewType) {
                case 'detail':
                    this.topName = '体质管理';
                    this.columns = [
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
                    this.colUpdate = ['fiftyvalue', 'zwtqqvalue', 'jumpvalue', 'pullsitvalue', 'runvaluename'];
                    break;
                case 'summary':
                    this.topName = '健康汇总';
                    this.columns =  [
                        {
                            title: '《国家学生体质健康标准》成绩汇总表',
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
                                    title: '体重指数(BMI)(千克/米²)(15分)',
                                    align:'center',
                                    children: [
                                        {
                                            title: '成绩',
                                            align:'center',
                                            dataIndex: 'tzzsscore',
                                            key: 'tzzsscore',
                                            width: 15,
                                            // customRender: function (text) {
                                            //   if (text == null) return text;
                                            //   return text*0.15
                                            // }
                                        }
                                    ],
                                },
                                {
                                    title: '肺活量(毫升)(15分)',
                                    align:'center',
                                    children: [
                                        {
                                            title: '成绩',
                                            align:'center',
                                            dataIndex: 'fhlscore',
                                            key: 'fhlscore',
                                            width: 15,
                                            // customRender: function (text) {
                                            //   if (text == null) return text;
                                            //   return text*0.15
                                            // }
                                        }
                                    ],
                                },
                                {
                                    title: '50米跑(秒)(20分)',
                                    align:'center',
                                    children: [
                                        {
                                            title: '成绩',
                                            align:'center',
                                            dataIndex: 'fiftyscore',
                                            key: 'fiftyscore',
                                            width: 15,
                                            // customRender: function (text) {
                                            //   if (text == null) return text;
                                            //   return text*0.2
                                            // }
                                        }
                                    ],
                                },
                                {
                                    title: '坐位体前屈(CM)(10分)',
                                    align:'center',
                                    children: [
                                        {
                                            title: '成绩',
                                            align:'center',
                                            dataIndex: 'zwtqqscore',
                                            key: 'zwtqqscore',
                                            width: 15,
                                            // customRender: function (text) {
                                            //   if (text == null) return text;
                                            //   return text*0.1
                                            // }
                                        }
                                    ],
                                },
                                {
                                    title: '立定跳远(CM)(10分)',
                                    align:'center',
                                    children: [
                                        {
                                            title: '成绩',
                                            align:'center',
                                            dataIndex: 'jumpscore',
                                            key: 'jumpscore',
                                            width: 15,
                                            // customRender: function (text) {
                                            //   if (text == null) return text;
                                            //   return text*0.1
                                            // }
                                        }
                                    ],
                                },
                                {
                                    title: '引体向上(男)/1分钟仰卧起坐(女)(次)(10分)',
                                    align:'center',
                                    children: [
                                        {
                                            title: '成绩',
                                            align:'center',
                                            dataIndex: 'pullsitscore',
                                            key: 'pullsitscore',
                                            width: 15,
                                            // customRender: function (text) {
                                            //   if (text == null) return text;
                                            //   return text*0.1
                                            // }
                                        }
                                    ],
                                },
                                {
                                    title: '1000米跑(男)/800米跑(女)(20分)',
                                    align:'center',
                                    children: [
                                        {
                                            title: '成绩',
                                            align:'center',
                                            dataIndex: 'runscore',
                                            key: 'runscore',
                                            width: 15,
                                            // customRender: function (text) {
                                            //   if (text == null) return text;
                                            //   return text*0.2
                                            // }
                                        }
                                    ],
                                },
                                {
                                    title: '合计成绩',
                                    align:'center',
                                    dataIndex: 'total',
                                    key: 'total',
                                    width: 15,
                                },
                            ],
                        },
                    ];
                    this.colUpdate = [];
            }
        },
        methods: {
            doImportFn(type) {
                if (!type) {
                    return;
                }
                this.isShowImport = false;
                // this.$message.success('导入成功');
            },
            tempDownload() {
                const temp = this.doImport();
                let url = this.$http.service.hq + 'veHqExcel';

                // this.$http.exportExcel(url + '/exportTemp', temp, 'post', { name: temp.tempName + '导入模板.xlsx' });
            },
            getParams() {
                const params = this.$refs['cwQuery'].getQueryData();
                this.queryParam = veStuHealthScoreApi.getParams(params);
                return this.queryParam;
            },
            doImport() {
                alert('doImport')
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
                    switch (this.viewType) {
                        case 'base':
                        case 'detail':
                            this.columns[0].children[0].title = '专业：'+this.specData.zymc+' 班级：'+this.classData.xzbmc
                            break;
                        case 'summary':
                            break;
                    }
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
                if (dataList != null && dataList.length > 0) {
                    veStuHealthScoreApi.saveBatch(dataList).then(res => {
                        this.list();
                    });
                } else {
                    this.$message.warning('暂无修改数据')
                }
            },
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
