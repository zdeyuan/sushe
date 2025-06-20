import {formatDate} from '@/utils/tools.js'
export const columns =(ctx)=>{
    return [
        {
          title: '课程组合',
          dataIndex: 'msname',
           width:150,
          fixed: 'left',
         
        },
        {
          title: '系部限选门数',
          dataIndex: 'gatecount',
           width:150,
          
        },
        {
          title: '专业限选门数',
          dataIndex: 'gatecountspec',
           width:150,
          
          
        },
        {
          title: '限选系部',
          dataIndex: 'falname',
           width:150,
          
          
        },
        {
          title: '限选年级',
          dataIndex: 'gradename',
           width:150,
          
          
        },
        {
          title: '限选班级',
          dataIndex: 'bjname',
           width:150,
          
        },
        {
          title: '学号',
          dataIndex: 'stuid',
           width:200,
          //  customRender:(t,r)=>{
          //   return (r.students.map(item=>item.stuid)).join(',')
          // }
          
        },
        {
          title: '学生',
          dataIndex: 'stuname',
           width:300,
          //  customRender:(t,r)=>{
          //   return (r.students.map(item=>item.stuname)).join(',')
          // }
          
        },
        {
          title: '描述',
          dataIndex: 'remark',
           width:200,
          
          
        },
        {
          title: '排序码',
          dataIndex: 'ordernum',
           width:100,
          
          
        },
        {
          title: '创建时间',
          dataIndex: 'createtime',
           width:200,
          
           customRender:(t)=>formatDate(t)
        },
        {
          title: '最后修改时间',
          dataIndex: 'updatetime',
           width:200,
          
          customRender:(t)=>formatDate(t)
          
        },
        {
          title: '删除时间',
          dataIndex: 'deletetime',
           width:200,
           customRender:(t)=>formatDate(t)
          
        },
        {
          title: '创建者名称',
          dataIndex: 'createusername',
           width:200,
          
          
        },
        {
          title: '课程',
          dataIndex: 'kecheng',
           width:200,
          
          
        },
        {
          title: '是否有效',
          dataIndex: 'joinclass',
           width:150,
          
          fixed: 'right',
          scopedSlots: { customRender: 'action' }
        },
        {
          title: '操作',
          dataIndex: 'sex8',
           width:250,
          
          fixed: 'right',
          scopedSlots: { customRender: 'actionS' }
        },
      ];
} 
export const searchParams = ()=>{
  return {
    bjid: '',
    bjname: '',
    createtime: '',
    createuserid: '',
    createusername: '',
    deletetime: '',
    falid: '',
    falname: '',
    gatecount: '',
    gatecountspec: '',
    gradeid: '',
    gradename: '',
    id: '',
    isdelete: '',
    jointclass: '',
    kecheng: '',
    msid: '',
    msname: '',
    ordernum: '',
    pageNo: '',
    pageSize: '',
    remark: '',
    sex: '',
    specid: '',
    specname: '',
    status: '',
    stu: '',
    stuname:'',
    terminalid: '',
    updatetime: '',
    week: ''
  }
}