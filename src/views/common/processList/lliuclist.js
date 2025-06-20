const liucen = [
	{
		name:'学生请假流程审批',
		ApplyObj: [{
				"inputType": "1",
				"label": "请假人",
				"parameter": "QJR",
				"isRequired": true,
				"isCustomRules": false,
				"rules": "",
				"isDictionary": false,
				"dictionaryName": ""
			},
			{
				"inputType": "1",
				"label": "紧急联系电话",
				"parameter": "JJLXDH",
				"isRequired": true,
				"isCustomRules": true,
				"rules": "^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\\d{8}$",
				"isDictionary": false,
				"dictionaryName": ""
			},
			{
				"inputType": "2",
				"label": "请假类型",
				"parameter": "JSLX",
				"isRequired": true,
				"isCustomRules": false,
				"rules": "",
				"isDictionary": true,
				"dictionaryName": "JSLX"
			},
			{
				"inputType": "5",
				"label": "请假开始时间",
				"parameter": "QJKSSJ",
				"isRequired": true,
				"isCustomRules": false,
				"rules": "",
				"isDictionary": false,
				"dictionaryName": ""
			},
			{
				"inputType": "5",
				"label": "请假结束时间",
				"parameter": "QJJSSJ",
				"isRequired": true,
				"isCustomRules": false,
				"rules": "",
				"isDictionary": false,
				"dictionaryName": ""
			},
			{
				"inputType": "1",
				"label": "请假事由",
				"parameter": "QJSY",
				"isRequired": true,
				"isCustomRules": false,
				"rules": "",
				"isDictionary": false,
				"dictionaryName": ""
			}
		]
	},
	{
		name:'培养方案流程审批',
		ApplyObj: [{
				"inputType": "1",
				"label": "培养方案名称",
				"parameter": "PYFAMC",
				"isRequired": true,
				"isCustomRules": false,
				"rules": "",
				"isDictionary": false,
				"dictionaryName": ""
			},
			{
				"inputType": "7",
				"label": "专业组",
				"parameter": "ZYZ",
				"isRequired": true,
				"isCustomRules": true,
				"rules": "",
				"isDictionary": false,
				"dictionaryName": "ZYZ"
			},
			{
				"inputType": "7",
				"label": "专业",
				"parameter": "ZY",
				"isRequired": true,
				"isCustomRules": true,
				"rules": "",
				"isDictionary": false,
				"dictionaryName": "ZY"
			},
			{
				"inputType": "7",
				"label": "学制",
				"parameter": "XZ",
				"isRequired": true,
				"isCustomRules": false,
				"rules": "",
				"isDictionary": true,
				"dictionaryName": "XZ",
				"url":"/common/veCommon/queryXueZhiList?_t=1739928558&id=09d5e1e7f9b049008eee645c783a1d67&interfaceUserId=09d5e1e7f9b049008eee645c783a1d67"
			},
			{
				"inputType": "7",
				"label": "年级",
				"parameter": "NJ",
				"isRequired": true,
				"isCustomRules": false,
				"rules": "",
				"isDictionary": false,
				"dictionaryName": "NJ",
				"url":"/common/veCommon/queryGradeList?_t=1739928796&id=09d5e1e7f9b049008eee645c783a1d67&interfaceUserId=09d5e1e7f9b049008eee645c783a1d67"
			},
			{
				"inputType": "7",
				"label": "学期",
				"parameter": "XQ",
				"isRequired": true,
				"isCustomRules": false,
				"rules": "",
				"isDictionary": false,
				"dictionaryName": "XQ",
				"url":"/common/veCommon/querySemesterList?_t=1739928796&id=09d5e1e7f9b049008eee645c783a1d67&interfaceUserId=09d5e1e7f9b049008eee645c783a1d67"
			},
			{
				"inputType": "1",
				"label": "专业方向",
				"parameter": "ZYFX",
				"isRequired": true,
				"isCustomRules": false,
				"rules": "",
				"isDictionary": false,
				"dictionaryName": ""
			},
			{
				"inputType": "1",
				"label": "描述",
				"parameter": "MS",
				"isRequired": true,
				"isCustomRules": false,
				"rules": "",
				"isDictionary": false,
				"dictionaryName": ""
			}
		]
	},
	
	{
		name:'学生学籍申请修改审批',
		ApplyObj: [{
				"inputType": "1",
				"label": "申请人",
				"parameter": "SQR",
				"isRequired": true,
				"isCustomRules": false,
				"rules": "",
				"isDictionary": false,
				"dictionaryName": ""
			},
			{
				"inputType": "7",
				"label": "原专业组",
				"parameter": "YZYZ",
				"isRequired": true,
				"isCustomRules": true,
				"rules": "",
				"isDictionary": false,
				"dictionaryName": "ZYZ"
			},
			{
				"inputType": "7",
				"label": "原专业",
				"parameter": "YZY",
				"isRequired": true,
				"isCustomRules": true,
				"rules": "",
				"isDictionary": false,
				"dictionaryName": "ZY"
			},
			{
				"inputType": "7",
				"label": "原学制",
				"parameter": "YXZ",
				"isRequired": true,
				"isCustomRules": false,
				"rules": "",
				"isDictionary": true,
				"dictionaryName": "XZ",
				"url":"/common/veCommon/queryXueZhiList?_t=1739928558&id=09d5e1e7f9b049008eee645c783a1d67&interfaceUserId=09d5e1e7f9b049008eee645c783a1d67"
			},
			{
				"inputType": "7",
				"label": "原年级",
				"parameter": "YNJ",
				"isRequired": true,
				"isCustomRules": false,
				"rules": "",
				"isDictionary": false,
				"dictionaryName": "NJ",
				"url":"/common/veCommon/queryGradeList?_t=1739928796&id=09d5e1e7f9b049008eee645c783a1d67&interfaceUserId=09d5e1e7f9b049008eee645c783a1d67"
			},
			{
				"inputType": "7",
				"label": "原学期",
				"parameter": "YXQ",
				"isRequired": true,
				"isCustomRules": false,
				"rules": "",
				"isDictionary": false,
				"dictionaryName": "XQ",
				"url":"/common/veCommon/querySemesterList?_t=1739928796&id=09d5e1e7f9b049008eee645c783a1d67&interfaceUserId=09d5e1e7f9b049008eee645c783a1d67"
			},
			{
				"inputType": "7",
				"label": "现专业组",
				"parameter": "XZYZ",
				"isRequired": true,
				"isCustomRules": true,
				"rules": "",
				"isDictionary": false,
				"dictionaryName": "ZYZ"
			},
			{
				"inputType": "7",
				"label": "现专业",
				"parameter": "XZY",
				"isRequired": true,
				"isCustomRules": true,
				"rules": "",
				"isDictionary": false,
				"dictionaryName": "ZY"
			},
			{
				"inputType": "7",
				"label": "现学制",
				"parameter": "XXZ",
				"isRequired": true,
				"isCustomRules": false,
				"rules": "",
				"isDictionary": true,
				"dictionaryName": "XZ",
				"url":"/common/veCommon/queryXueZhiList?_t=1739928558&id=09d5e1e7f9b049008eee645c783a1d67&interfaceUserId=09d5e1e7f9b049008eee645c783a1d67"
			},
			{
				"inputType": "7",
				"label": "现年级",
				"parameter": "XNJ",
				"isRequired": true,
				"isCustomRules": false,
				"rules": "",
				"isDictionary": false,
				"dictionaryName": "NJ",
				"url":"/common/veCommon/queryGradeList?_t=1739928796&id=09d5e1e7f9b049008eee645c783a1d67&interfaceUserId=09d5e1e7f9b049008eee645c783a1d67"
			},
			{
				"inputType": "7",
				"label": "现学期",
				"parameter": "XXQ",
				"isRequired": true,
				"isCustomRules": false,
				"rules": "",
				"isDictionary": false,
				"dictionaryName": "XQ",
				"url":"/common/veCommon/querySemesterList?_t=1739928796&id=09d5e1e7f9b049008eee645c783a1d67&interfaceUserId=09d5e1e7f9b049008eee645c783a1d67"
			},
		]
	},
]

export default liucen;