const constant = {
  getValue(name, id) {
    for (let i = 0; i < constant[name].length; i++) {
      const element = constant[name][i];
      if (element.id == id) {
        return element.value;
      }
    }
    return '';
  },
  commonApi: '09d5e1e7f9b049008eee645c783a1d67',
  qstatus: [
    { value: '启用', id: 1 },
    { value: '禁用', id: 0 }
  ],
  status: [
    { value: '可用', id: 1 },
    { value: '禁用', id: 0 }
  ],
  statusFb: [
    { value: '发布', id: 1 },
    { value: '未发布', id: 0 }
  ],
  shifou: [
    { value: '是', id: 1 },
    { value: '否', id: 0 }
  ],
  duicuo: [
    { value: '√', id: 1 },
    { value: '×', id: 0 }
  ],
  dioayan: [
    { value: '开始调研', id: 1 },
    { value: '取消调研', id: 2 }
  ],
  timuType: [
    { value: '单选题', id: 'dan' },
    { value: '多选题', id: 'duo' },
    { value: '问答题', id: 'wen' }
  ],
  cgxz: [
    { value: '科研成果', id: 'ky' },
    { value: '项目成果', id: 'xm' }
  ],
  report: [
    { value: '论文', id: 1 },
    { value: '科研课题', id: 2 },
    { value: '其他', id: 3 }
  ],
  sex: [
    { value: '男', id: 1 },
    { value: '女', id: 2 }
  ],
  sexStr: [
    { value: '男', id: '1' },
    { value: '女', id: '2' }
  ],
  userType: [
    { value: '校内人员', id: 1 },
    { value: '校外人员', id: 2 }
  ],
  projectType: [
    { value: '未完成', id: 1 },
    { value: '已完成', id: 2 }
  ],
  projectAudit: [
    { value: '未审核', id: 1 },
    { value: '已审核', id: 2 },
    { value: '审核不通过', id: 3 }
  ],
  fundAudit: [
    { value: '未审核', id: 0 },
    { value: '已通过', id: 1 },
    { value: '不通过', id: 2 }
  ],
  meetKaoqing: [
    { value: '未考勤', id: 0 },
    { value: '正常', id: 1 },
    { value: '迟到', id: 2 },
    { value: '未到', id: 3 }
  ],
  meetAudit: [
    { value: '未审核', id: 0 },
    { value: '已通过', id: 1 },
    { value: '不通过', id: 2 }
  ],
  zhichen: [
    //职称
    { value: '助教', id: '1' },
    { value: '讲师', id: '2' },
    { value: '高级讲师', id: '3' },
    { value: '三级讲师', id: '4' }
  ],
  xueli: [
    //学历
    { value: '专科', id: '1' },
    { value: '本科', id: '2' },
    { value: '硕士研究生', id: '3' },
    { value: '博士研究生', id: '4' }
  ],
  hqUserType: [
    { value: '医疗人员', id: '1' },
    /*   { value: '餐厅', id: '2' }, */
    { value: '保安员', id: '3' }
  ],
  // 留宿类型
  accommodateType: [
    { value: '暑假留宿', id: 0 },
    /*   { value: '餐厅', id: '2' }, */
    { value: '寒假留宿', id: 1 }
  ],
  hqUserStatus: [
    { value: '在岗', id: 1 },
    { value: '离岗', id: 2 }
  ],
  anbaozStatus: [
    { value: '正常', id: 1 },
    { value: '不正常', id: 0 }
  ],
  ctStatus: [
    { value: '开放', id: 1 },
    { value: '未开放', id: 0 }
  ],
  wxStatus: [
    { value: '完成', id: 1 },
    { value: '在修', id: 2 },
    { value: '未修', id: 0 }
  ],
  mainTain: [
    { value: '修缮说明', id: 6 },
    { value: '财政拨款', id: 5 },
    { value: '贷款', id: 4 },
    { value: '自筹资金', id: 3 },
    { value: '捐助', id: 2 },
    { value: '集资', id: 1 },
    { value: '其它', id: 0 }
  ],
  zcStatus: [
    { value: '闲置', id: 'unallocated' },
    { value: '被借领', id: 'apply' },
    { value: '维修中', id: 'maintain' },
    { value: '报废', id: 'retire' }
  ],
  applyFor: [
    { value: '借用', id: '1' },
    { value: '领用', id: '2' }
  ],
  zcWxStatus: [
    { value: '维修完成', id: 1 },
    { value: '维修中', id: 2 }
  ],
  revertStatus: [
    { value: '未归还', id: 0 },
    { value: '已归还', id: 1 }
  ],
  bxStatus: [
    { value: '驳回', id: 0 },
    { value: '待审批', id: 1 },
    { value: '待维修', id: 2 },
    { value: '已维修', id: 3 },
    { value: '未维修', id: 4 }
  ],
  mzm: [
    { value: '汉族', id: '1' },
    { value: '藏族', id: '2' },
    { value: '蒙古族', id: '3' },
    { value: '维吾尔族', id: '4' },
    { value: '回族', id: '5' },
    { value: '壮族', id: '6' },
    { value: '满族', id: '7' }
  ],
  zzmmm: [
    { value: '群众', id: '1' },
    { value: '团员', id: '2' },
    { value: '党员', id: '3' },
    { value: '预备党员', id: '4' }
  ],
  jdfs: [
    { value: '住校', id: 1 },
    { value: '走读', id: 2 }
  ],
  bmfsm: [
    { value: '在线报名', id: 1 },
    { value: '线下报名', id: 2 }
  ],
  xz: [
    { value: '两年', id: 3 },
    { value: '三年', id: 4 },
    { value: '四年', id: 5 },
    { value: '五年', id: 6 },
    { value: '八年', id: 7 }
  ],
  jkzkm: [
    { value: '健康或良好', id: '1' },
    { value: '一般或较弱', id: '2' },
    { value: '有慢性病', id: '3' },
    { value: '残疾', id: '4' }
  ],
  hklbm: [
    { value: '城市', id: '1' },
    { value: '城镇', id: '2' },
    { value: '农村', id: '3' }
  ],
  sfsldrk: [
    { value: '非流动人口', id: '0' },
    { value: '流动人口', id: '1' }
  ],
  stuStatye: [
    { value: '新生', id: 'XS' },
    { value: '在校', id: 'ZX' },
    { value: '休学', id: 'XX' },
    { value: '退学', id: 'TX' },
    { value: '开除', id: 'KC' },
    { value: '毕业', id: 'BY' },
    { value: '肄业', id: 'YY' },
    { value: '转学', id: 'ZXX' },
    { value: '结业', id: 'JY' }
  ],
  ydlbm: [
    //;1=>'退学',2=>'休学',3=>'转专业',4=>'留级',5=>'转入',6=>'转出'
    { value: '退学', id: '1' },
    { value: '休学', id: '2' },
    { value: '转专业', id: '3' },
    { value: '留级', id: '4' },
    { value: '转出', id: '6' }
  ],
  gxm: [
    { value: '父子', id: '1' },
    { value: '母子', id: '2' },
    { value: '父女', id: '3' },
    { value: '母女', id: '4' },
    { value: '兄弟', id: '5' },
    { value: '姐妹', id: '6' }
  ],
  xjAuditStatus: [
    { value: '待审核', id: 0 },
    { value: '审核通过', id: 1 },
    { value: '审核不通过', id: 2 }
  ],
  shetAuditStatus: [
    //1通过，0不通过，2未审核
    { value: '待审核', id: 2 },
    { value: '通过', id: 1 },
    { value: '不通过', id: 0 }
  ],
  auditStatus: [
    { value: '通过', id: 1 },
    { value: '不通过', id: 2 }
  ],
  biyeAuditStatus: [
    { value: '通过', id: 1 },
    { value: '不通过', id: 0 }
  ],
  biyeStatus: [
    { value: '待审核', id: -1 },
    { value: '通过', id: 1 },
    { value: '不通过', id: 0 }
  ],
  levelType: [
    { value: '事假', id: 1 },
    { value: '病假', id: 2 },
    { value: '丧假', id: 3 }
  ],
  jlJb: [
    { value: '国家级奖励', id: 'GJJJL' },
    { value: '省级奖励', id: 'SJJL' },
    { value: '市级奖励', id: 'SJJL' },
    { value: '区级奖励', id: 'QJJL' },
    { value: '校级奖励', id: 'XJJL' }
  ],
  jllb: [
    { value: '个人', id: 1 },
    { value: '集体', id: 2 }
  ],
  jllb2: [
    { value: '个人', id: 0 },
    { value: '集体', id: 1 }
  ],
  whhdjb: [
    { value: '国际级', id: 0 },
    { value: '国家级', id: 1 },
    { value: '省级', id: 2 },
    { value: '市级', id: 3 },
    { value: '县级', id: 4 },
    { value: '其它', id: 5 }
  ],
  courseName: [
    { value: '早自习', id: '早自习' },
    { value: '晚自习', id: '晚自习' }
  ],
  checkName:[
	  {value: '第一节', id: '1'},
	  {value: '第二节', id: '2'},
	  {value: '第三节', id: '3'},
	  {value: '第四节', id: '4'},
	  {value: '第五节', id: '5'},
	  {value: '第六节', id: '6'},
	  {value: '第七节', id: '7'},
	  {value: '第八节', id: '8'},
	  {value: '第九节', id: '9'},
	  {value: '晚自习第一节', id: '10'},
	  {value: '晚自习第二节', id: '11'},
	  {value: '晚自习第三节', id: '12'}
  ],
  awardLevel: [
    { value: '一等奖', id: 0 },
    { value: '二等奖', id: 1 },
    { value: '三等奖', id: 2 }
  ],
  caucusLevel: [
    { value: '市级', id: 0 },
    { value: '区级', id: 1 },
    { value: '学校', id: 2 }
  ],
  yyType: [
    { value: '心里咨询教师', id: 1 },
    { value: '区级教室场地', id: 2 },
    { value: '设备', id: 3 }
  ],
  qrStatus: [
    { value: '已确认', id: 1 },
    { value: '未确认', id: 0 }
  ],
  yyXinz: [
    { value: '自定义预约', id: 1 },
    { value: '常规时间预约', id: 2 }
  ],
  zhouqi: [
    { value: '学期/次 ', id: 0 },
    { value: '学年/次 “学期/次”表示每学期评测一次，“学年/次”表示每学年评测一次', id: 1 }
  ],
  byxsStatus: [
    //>毕业，2=>结业，3=>未结业，4=>肄业
    { value: '毕业 ', id: 1 },
    { value: '结业 ', id: 2 },
    { value: '未结业 ', id: 3 },
    { value: '肄业 ', id: 4 }
  ],
  byxsStatus2: [
    //>毕业，2=>结业，3=>未结业，4=>肄业
    { value: '毕业 ', id: '1' },
    { value: '结业 ', id: '2' },
    { value: '肄业 ', id: '4' }
  ],
  printSet: [
    { value: '打印方向由操作者自行选择或按打印机缺省设置 ', id: 0 },
    { value: '纵(正)向打印，固定纸张 ', id: 1 },
    { value: '横向打印，固定纸张 ', id: 2 },
    { value: '纵(正)向打印，宽度固定，高度按打印内容的高度自适应 ', id: 3 }
  ]
};
export default constant;
