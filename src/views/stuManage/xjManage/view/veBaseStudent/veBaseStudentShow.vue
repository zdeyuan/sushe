<template>
	<div class="edit_form">
		<!-- 编辑页 -->
		<edu-form title="学生信息详情" :isShowBtnSure="false" @cancel="handelCancel">
			<a-form-model ref="veBaseStudentDataForm" labelAlign="right">
				<a-button type="primary" v-print="'#printDiv'">
					打印
				</a-button>
				<div id="printDiv" style="margin-top:8px">
					<div class="detail_title">基本信息</div>


					<a-row>
						<a-col :span="12">
							<a-form-model-item label="身份证类型" class="ytop" prop="sfzlx">
								<j-dict-select-tag v-model="veBaseStudentVo.sfzjlxm" placeholder="请选择" dictCode="SFZJLXM" disabled/>		
							</a-form-model-item>
						</a-col>
						<a-col :span="12">
							<a-form-model-item label="身份证号" class="ytop" prop="sfzh">
								{{ veBaseStudentVo.sfzh }}
							</a-form-model-item>
						</a-col>
					</a-row>


					<a-row>
						<a-col :span="12">
							<a-form-model-item label="姓名" prop="xm">
								{{ veBaseStudentVo.xm }}
							</a-form-model-item>
						</a-col>
						<a-col :span="12">
							<a-form-model-item label="是否是困难生" prop="sfkns">
								{{veBaseStudentVo.sfkns == 1 ? '是' : '否'}}
							</a-form-model-item>
						</a-col>
					</a-row>

					<a-row>
						<a-col :span="12">
							<a-form-model-item label="学号" prop="xh">
								{{ veBaseStudentVo.xh }}
							</a-form-model-item>
						</a-col>
						<a-col :span="12">
							<a-form-model-item label="性别" prop="xbm">
								<edu-dict-text :value="veBaseStudentVo.xbm" stype="radio" code="sexStr" />
							</a-form-model-item>
						</a-col>
					</a-row>

					<a-row>
						<a-col :span="12">
							<a-form-model-item label="姓名拼音" prop="xmpy">
								{{ veBaseStudentVo.xmpy }}
							</a-form-model-item>
						</a-col>
						<a-col :span="12">
							<a-form-model-item label="英文名" prop="ywm">
								{{ veBaseStudentVo.ywm }}
							</a-form-model-item>
						</a-col>
					</a-row>


					<a-row>
						<a-col :span="12">
							<a-form-model-item label="学籍状态" prop="ywxj">
								{{veBaseStudentVo.ywxj == '1' ? '有' : '无'}}
							</a-form-model-item>
						</a-col>
						<a-col :span="12">
							<a-form-model-item label="是否在校" prop="sfzx">
								{{veBaseStudentVo.sfzx == '1' ? '是' : '否'}}
							</a-form-model-item>
						</a-col>
					</a-row>
					
					<a-row>
						<a-col :span="12">
							<a-form-model-item label="曾用名" prop="cym">
								{{ veBaseStudentInfoVo.cym }}
							</a-form-model-item>
						</a-col>
						<a-col :span="12">
							<a-form-model-item label="出生日期" prop="csrq">
								{{ $date.intTime(veBaseStudentInfoVo.csrq) }}
							</a-form-model-item>
						</a-col>
					</a-row>
				
					<a-row>
						<a-col :span="12">
							<a-form-model-item label="民族码" prop="mzm">
								<a-select style="width:100%" :options="mzmList" disabled placeholder="请选择"
									v-model="veBaseStudentVo.mzm" />
							</a-form-model-item>
						</a-col>
						<a-col :span="12">
							<a-form-model-item label="籍贯" prop="jg">
								{{ veBaseStudentInfoVo.jg }}
							</a-form-model-item>
						</a-col>
					</a-row>
					
					<a-row>
						<a-col :span="12">
							<a-form-model-item label="政治面貌码" prop="zzmmm">
								<a-select style="width:100%" :options="zzmmmList" disabled placeholder="请选择"
									v-model="veBaseStudentInfoVo.zzmmm" />
							</a-form-model-item>
						</a-col>
						<a-col :span="12">
							<a-form-model-item label="就读方式" prop="jdfs">
								<edu-dict-text :value="veBaseStudentVo.jdfs" stype="radio" code="jdfs" />
							</a-form-model-item>
						</a-col>
					</a-row>
					
					<a-form-model-item label="学生照片" prop="zp">
						<uploadFiles ref="uploadFiles" :limit="1" fileType="image" isImg serviceType="student">
							<a-table-column dataIndex="ext" title="图片">
								<template slot-scope="ext, row">
									<!-- <img :src="$http.baseServer + '/' + $http.service.stu + 'veStuFile/download?id=' + row.id"
										style="height:50px" /> -->
										{{row.name}}
								</template>
							</a-table-column>
						</uploadFiles>
					</a-form-model-item>

					<div class="detail_title" style="margin-top:15px">学籍信息</div>

					<a-row>
						<a-col :span="12">
							<a-form-model-item label="所属年级" prop="xz">
								{{ veBaseStudentVo.gradeText }}
							</a-form-model-item>
						</a-col>
						<a-col :span="12">
							<a-form-model-item label="所属专业部" prop="xz">
								{{ veBaseStudentVo.falText }}
							</a-form-model-item>
						</a-col>
						<a-col :span="12">
							<a-form-model-item label="所属专业" prop="xz">
								{{ veBaseStudentVo.specText }}
							</a-form-model-item>
						</a-col>
						<a-col :span="12">
							<a-form-model-item label="所属班级" prop="xz">
								{{ veBaseStudentVo.bjText }}
							</a-form-model-item>
						</a-col>
					</a-row>
					
					<a-row>
						<a-col :span="12">
							<a-form-model-item label="学制" prop="xz" >
								<a-select style="width:100%" disabled :options="xuzhi" placeholder="请选择"
									v-model="veBaseStudentVo.xz" />
							</a-form-model-item>
						</a-col>
						<a-col :span="12">
							<a-form-model-item label="报名方式" prop="bmfsm">
								<edu-data v-model="veBaseStudentInfoVo.bmfsm" stype="select" code="bmfsm" />
							</a-form-model-item>
						</a-col>
					</a-row>
					
					<a-row>
						<a-col :span="12">
							<a-form-model-item label="报名号" prop="bmh">
								{{ veBaseStudentVo.bmh }}
							</a-form-model-item>
						</a-col>
						<a-col :span="12">
							<a-form-model-item label="入学年月" prop="rxny">
								{{ $date.intTime(veBaseStudentInfoVo.rxny) }}
							</a-form-model-item>
						</a-col>
					</a-row>
					
					<a-row>
						<a-col :span="12">
							<a-form-model-item label="入学成绩" prop="rxcj">
								{{ veBaseStudentInfoVo.rxcj }}
							</a-form-model-item>
						</a-col>
						<a-col :span="12">
							<a-form-model-item label="毕业学校" prop="byxx">
								{{ veBaseStudentInfoVo.byxx }}
							</a-form-model-item>
						</a-col>
					</a-row>
					
					<a-row>
						<a-col :span="12">
							<a-form-model-item label="入学文化程度" prop="rxwhcd">										
								<j-dict-select-tag disabled v-model="veBaseStudentVo.rxwhcd" placeholder="请选择" dictCode="RXWHCD" disabled/>
							</a-form-model-item>
						</a-col>
						<a-col :span="12">
							<a-form-model-item label="学生类别" prop="xslb">
									<j-dict-select-tag disabled v-model="veBaseStudentVo.xslb" placeholder="请选择" dictCode="XSLB" disabled/>
							</a-form-model-item>
						</a-col>
					</a-row>
					
					<a-row>
						<a-col :span="12">
							<a-form-model-item label="学习形式" prop="xxxs">										
								<j-dict-select-tag disabled v-model="veBaseStudentVo.xxxs" placeholder="请选择" dictCode="XXXS"/>	
							</a-form-model-item>
						</a-col>
						<a-col :span="12">
							<a-form-model-item label="入学方式" prop="rxfs">
								<j-dict-select-tag disabled v-model="veBaseStudentVo.rxfs" placeholder="请选择" dictCode="RXFS"/>	
							</a-form-model-item>
						</a-col>
					</a-row>
					
					<a-row>
						<a-col :span="12">
							<a-form-model-item label="港澳台侨外" prop="gatqwm">										
								<j-dict-select-tag disabled v-model="veBaseStudentVo.gatqwm" placeholder="请选择" dictCode="GATQWM"/>	
							</a-form-model-item>
						</a-col>
						<a-col :span="12">
							<a-form-model-item label="入学日期" prop="rxrq">
								{{ $date.intTime(veBaseStudentInfoVo.rxrq) }}
							</a-form-model-item>
						</a-col>
					</a-row>

					<div class="detail_title" style="margin-top:15px">联系方式</div>

					<a-form-model-item label="户口所在地" class="ytop" prop="province">
						{{ veBaseStudentVo.province }}
						{{ veBaseStudentVo.city }}
						{{ veBaseStudentVo.county }}
					</a-form-model-item>

					<a-form-model-item label="籍贯所在地" prop="jgszProvince">
						{{ veBaseStudentInfoVo.jgszProvince }}
						{{ veBaseStudentInfoVo.jgszCity }}
						{{ veBaseStudentInfoVo.jgszCounty }}
					</a-form-model-item>

					<a-form-model-item label="出生地所在地" prop="csdszProvince">
						{{ veBaseStudentInfoVo.csdszProvince }}
						{{ veBaseStudentInfoVo.csdszCity }}
						{{ veBaseStudentInfoVo.csdszCounty }}
					</a-form-model-item>

					<a-form-model-item label="生源所在地" prop="sheng">
						{{ veBaseStudentVo.sheng }}
						{{ veBaseStudentVo.shi }}
						{{ veBaseStudentVo.qu }}
					</a-form-model-item>

					<a-row>
						<a-col :span="12">
							<a-form-model-item label="学生联系电话" prop="xslxdh">
								{{ veBaseStudentInfoVo.xslxdh }}
							</a-form-model-item>
						</a-col>
						<a-col :span="12">
							<a-form-model-item label="QQ" prop="jstxh">
								{{ veBaseStudentInfoVo.jstxh }}
							</a-form-model-item>
						</a-col>
					</a-row>
					
					<a-row>
						<a-col :span="12">
							<a-form-model-item label="户口性质" prop="hksz">
								<j-dict-select-tag disabled v-model="veBaseStudentInfoVo.hksz" placeholder="请选择" dictCode="HKSZ"/>
							</a-form-model-item>
						</a-col>
						<a-col :span="12">
							<a-form-model-item label="户口详细地址" prop="jstxh">
								{{veBaseStudentVo.hkxxdz}}
							</a-form-model-item>
						</a-col>
					</a-row>
					
					<a-row>
						<a-col :span="12">
							<a-form-model-item label="招生对象" prop="zsdx">
								<j-dict-select-tag disabled v-model="veBaseStudentInfoVo.zsdx" placeholder="请选择" dictCode="zsdx"/>
							</a-form-model-item>
						</a-col>
						<a-col :span="12">
							<a-form-model-item label="户籍所属派出所" prop="jstxh">
								{{veBaseStudentVo.hjsspcs}}
							</a-form-model-item>
						</a-col>
					</a-row>
					
					<a-row>
						<a-col :span="12">
							<a-form-model-item label="学生来源" prop="xsly">
								<j-dict-select-tag disabled v-model="veBaseStudentInfoVo.xsly" placeholder="请选择" dictCode="XSLY"/>
							</a-form-model-item>
						</a-col>
						<a-col :span="12">
							<a-form-model-item label="是否随迁子女" prop="jstxh">
								{{veBaseStudentInfoVo.sfsqzn == '1' ? '是' : '否'}}
							</a-form-model-item>
						</a-col>
					</a-row>
					
					<a-row>
						<a-col :span="12">
							<a-form-model-item label="联系人" prop="lxr">
								{{veBaseStudentInfoVo.lxr}}
							</a-form-model-item>
						</a-col>
						<a-col :span="12">
							<a-form-model-item label="家庭邮政编码" prop="jtyzbm">
								{{veBaseStudentInfoVo.jtyzbm}}
							</a-form-model-item>
						</a-col>
					</a-row>
					
					<a-row>
						<a-col :span="12">
							<a-form-model-item label="乘火车区间" prop="chcqj">
								{{veBaseStudentInfoVo.chcqj}}
							</a-form-model-item>
						</a-col>
						<a-col :span="12">
							<a-form-model-item label="是否建档立卡" prop="sfjdlk">
								{{veBaseStudentInfoVo.sfjdlk == '1' ? '是' : '否' }}
							</a-form-model-item>
						</a-col>
					</a-row>
					
					<a-row>
						<a-col :span="12">
							<a-form-model-item label="电子邮箱" prop="dzxx">
								{{ veBaseStudentInfoVo.dzxx }}
							</a-form-model-item>
						</a-col>
						<a-col :span="12">
							<a-form-model-item label="家庭联系电话" prop="jtlxdh">
								{{ veBaseStudentInfoVo.jtlxdh }}
							</a-form-model-item>
						</a-col>
					</a-row>
					<a-form-model-item label="详细家庭地址" prop="jtdz">
						{{ veBaseStudentInfoVo.jtdz }}
					</a-form-model-item>
					<div class="detail_title" style="margin-top:15px">其他信息</div>
					
					<a-row>
						<a-col :span="12">
							<a-form-model-item label="国籍/地区" class="ytop" prop="chcqj">
								{{veBaseStudentInfoVo.gj}}
							</a-form-model-item>
						</a-col>
						<a-col :span="12">
							<a-form-model-item label="是否享受国家助学金" class="ytop" prop="sfjdlk">
								{{veBaseStudentInfoVo.sfssgjzxj == '1' ? '是' : '否'}}
							</a-form-model-item>
						</a-col>
					</a-row>
					
					<a-row>
						<a-col :span="12">
							<a-form-model-item label="助学金月发放标准" prop="zxjffbz">
								{{veBaseStudentInfoVo.zxjffbz}}
							</a-form-model-item>
						</a-col>
						<a-col :span="12">
							<a-form-model-item label="宗教信仰" prop="zjxy">
								{{veBaseStudentInfoVo.zjxy}}
							</a-form-model-item>
						</a-col>
					</a-row>
					
					<a-row>
						<a-col :span="12">
							<a-form-model-item label="健康状况" prop="jkzkm">
								<edu-dict-text :value="veBaseStudentInfoVo.jkzkm" stype="select" code="jkzkm" />
							</a-form-model-item>
						</a-col>
						<a-col :span="12">
							<a-form-model-item label="是否流动人口" prop="sfsldrk">
								<edu-dict-text :value="veBaseStudentInfoVo.sfsldrk" stype="select" code="sfsldrk" />
							</a-form-model-item>
						</a-col>
					</a-row>
					<a-row>
						<a-col :span="12">
							<a-form-model-item label="户口类别" prop="hklbm">
								<edu-dict-text :value="veBaseStudentInfoVo.hklbm" stype="select" code="hklbm" />
							</a-form-model-item>
						</a-col>
						<a-col :span="12">
							<a-form-model-item label="是否低保" prop="sfdb">
								<edu-dict-text :value="veBaseStudentInfoVo.sfdb" stype="radio" code="shifou" />
							</a-form-model-item>
						</a-col>
					</a-row>
					<a-row>
						<a-col :span="12">
							<a-form-model-item label="血型" prop="xx">
								<j-dict-select-tag v-model="veBaseStudentInfoVo.xx" placeholder="请选择" dictCode="XX" disabled/>
							</a-form-model-item>
						</a-col>
					</a-row>
					
					<a-form-model-item label="特长" prop="tc">
						{{ veBaseStudentInfoVo.tc }}
					</a-form-model-item>
					<a-form-model-item label="备注" prop="tc">
						{{veBaseStudentInfoVo.remark}}
					</a-form-model-item>
				</div>
			</a-form-model>
		</edu-form>
	</div>
</template>

<script>
	import veBaseStudentApi from '@/views/stuManage/xjManage/api/veBaseStudentApi';
	import uploadFiles from '@/components/uploadFiles';
	import {
		axios
	} from '@/utils/request'
	export default {
		components: {
			uploadFiles
		},
		data() {
			const data = {
				veBaseStudentVo: {},
				veBaseStudentInfoVo: {}
			};
			return {
				bmfsmList: [{
						value: '1',
						label: '线上',
					},
					{
						value: '2',
						label: '线下',
					},
				],
				xuzhi: [],
				mzmList: [],
				sfzlxList: [],
				rxwhcd: [],
				xslb: [],
				xxxs: [],
				zsdx: [],
				rxfs: [],
				xsly: [],
				xslb: [],
				jtlb: [],
				hksz: [],
				zzmmmList: [],
				xx: [],
				gatqwm: [],
				...data
			};
		},
		mounted() {
			this.getXuzhi()
			this.getNation()
			this.getPolitic()
			this.getsfzlx()
			this.getrxwhcd()
			this.getxslb()
			this.getxxxs()
			this.getrxfs()
			this.gethksz()
			this.getzsdx()
			this.getxsly()
			this.getjtlb()
			this.getxx()
			this.getgatqwm()
		},
		methods: {
			//获取学制
			getXuzhi() {
				this.xuzhi = []
				axios({
						url: '/common/veBase/getXueZhiPageList?pageNo=1&pageSize=100',
						method: 'get',
						params: {},
					})
					.then((res) => {
						for (let xuzhi of res.result.list) {
							this.xuzhi.push({
								value: xuzhi.id,
								label: xuzhi.xzmc,
							})
						}
					})
					.catch((err) => {
						this.$message.warning('获取学制列表失败')
					})
			},

			//获取政治面貌列表
			getPolitic() {
				this.zzmmmList = []
				axios({
						url: '/common/veCommon/queryDictDataByModelCode?modelCode=ZZMM',
						method: 'get',
						params: {
							interfaceUserId: '09d5e1e7f9b049008eee645c783a1d66'
							// dictCode: 'politic',
						},
					})
					.then((res) => {
						for (let politic of res.result) {
							this.zzmmmList.push({
								value: politic.code,
								label: politic.title,
							})
						}
					})
					.catch((err) => {
						this.$message.warning('获取政治面貌列表失败')
					})
			},

			//获取身份证类型
			getsfzlx() {
				this.sfzlxList = []
				axios({
						url: '/common/veCommon/queryDictDataByModelCode?modelCode=SFZLX',
						method: 'get',
						params: {
							interfaceUserId: '09d5e1e7f9b049008eee645c783a1d66'
							// dictCode: 'politic',
						},
					})
					.then((res) => {
						for (let politic of res.result) {
							this.sfzlxList.push({
								value: politic.code,
								label: politic.title,
							})
						}
					})
					.catch((err) => {
						this.$message.warning('获取身份证类型失败')
					})
			},

			//获取入学文化程度
			getrxwhcd() {
				this.rxwhcd = []
				axios({
						url: '/common/veCommon/queryDictDataByModelCode?modelCode=RXWHCD',
						method: 'get',
						params: {
							interfaceUserId: '09d5e1e7f9b049008eee645c783a1d66'
							// dictCode: 'politic',
						},
					})
					.then((res) => {
						for (let politic of res.result) {
							this.rxwhcd.push({
								value: politic.code,
								label: politic.title,
							})
						}
					})
					.catch((err) => {
						this.$message.warning('获取入学文化程度失败')
					})
			},

			//获取学生类别
			getxslb() {
				this.xslb = []
				axios({
						url: '/common/veCommon/queryDictDataByModelCode?modelCode=XSLB',
						method: 'get',
						params: {
							interfaceUserId: '09d5e1e7f9b049008eee645c783a1d66'
							// dictCode: 'politic',
						},
					})
					.then((res) => {
						for (let politic of res.result) {
							this.xslb.push({
								value: politic.code,
								label: politic.title,
							})
						}
					})
					.catch((err) => {
						this.$message.warning('获取学生类别失败')
					})
			},

			//获取学习形式
			getxxxs() {
				this.xxxs = []
				axios({
						url: '/common/veCommon/queryDictDataByModelCode?modelCode=XXXS',
						method: 'get',
						params: {
							interfaceUserId: '09d5e1e7f9b049008eee645c783a1d66'
							// dictCode: 'politic',
						},
					})
					.then((res) => {
						for (let politic of res.result) {
							this.xxxs.push({
								value: politic.code,
								label: politic.title,
							})
						}
					})
					.catch((err) => {
						this.$message.warning('获取学习形式失败')
					})
			},

			//获取户口性质
			gethksz() {
				this.hksz = []
				axios({
						url: '/common/veCommon/queryDictDataByModelCode?modelCode=HKSZ',
						method: 'get',
						params: {
							interfaceUserId: '09d5e1e7f9b049008eee645c783a1d66'
							// dictCode: 'politic',
						},
					})
					.then((res) => {
						for (let politic of res.result) {
							this.hksz.push({
								value: politic.code,
								label: politic.title,
							})
						}
					})
					.catch((err) => {
						this.$message.warning('获取户口性质失败')
					})
			},

			//获取入学方式
			getrxfs() {
				this.rxfs = []
				axios({
						url: '/common/veCommon/queryDictDataByModelCode?modelCode=RXFS',
						method: 'get',
						params: {
							interfaceUserId: '09d5e1e7f9b049008eee645c783a1d66'
							// dictCode: 'politic',
						},
					})
					.then((res) => {
						for (let politic of res.result) {
							this.rxfs.push({
								value: politic.code,
								label: politic.title,
							})
						}
					})
					.catch((err) => {
						this.$message.warning('获取入学方式失败')
					})
			},


			//获取港澳台侨外
			getgatqwm() {
				this.gatqwm = []
				axios({
						url: '/common/veCommon/queryDictDataByModelCode?modelCode=GATQW',
						method: 'get',
						params: {
							interfaceUserId: '09d5e1e7f9b049008eee645c783a1d66'
							// dictCode: 'politic',
						},
					})
					.then((res) => {
						for (let politic of res.result) {
							this.gatqwm.push({
								value: politic.code,
								label: politic.title,
							})
						}
					})
					.catch((err) => {
						this.$message.warning('获取港澳台侨外失败')
					})
			},

			//招生对象
			getzsdx() {
				this.zsdx = []
				axios({
						url: '/common/veCommon/queryDictDataByModelCode?modelCode=ZSDX',
						method: 'get',
						params: {
							interfaceUserId: '09d5e1e7f9b049008eee645c783a1d66'
							// dictCode: 'politic',
						},
					})
					.then((res) => {
						for (let politic of res.result) {
							this.zsdx.push({
								value: politic.code,
								label: politic.title,
							})
						}
					})
					.catch((err) => {
						this.$message.warning('获取招生对象失败')
					})
			},

			//学生来源
			getxsly() {
				this.xsly = []
				axios({
						url: '/common/veCommon/queryDictDataByModelCode?modelCode=XSLY',
						method: 'get',
						params: {
							interfaceUserId: '09d5e1e7f9b049008eee645c783a1d66'
							// dictCode: 'politic',
						},
					})
					.then((res) => {
						for (let politic of res.result) {
							this.xsly.push({
								value: politic.code,
								label: politic.title,
							})
						}
					})
					.catch((err) => {
						this.$message.warning('获取学生来源失败')
					})
			},

			//家庭类别
			getjtlb() {
				this.jtlb = []
				axios({
						url: '/common/veCommon/queryDictDataByModelCode?modelCode=JTLB',
						method: 'get',
						params: {
							interfaceUserId: '09d5e1e7f9b049008eee645c783a1d66'
							// dictCode: 'politic',
						},
					})
					.then((res) => {
						for (let politic of res.result) {
							this.jtlb.push({
								value: politic.code,
								label: politic.title,
							})
						}
					})
					.catch((err) => {
						this.$message.warning('获取家庭类别失败')
					})
			},

			//血型
			getxx() {
				this.xx = []
				axios({
						url: '/common/veCommon/queryDictDataByModelCode?modelCode=XX',
						method: 'get',
						params: {
							interfaceUserId: '09d5e1e7f9b049008eee645c783a1d66'
							// dictCode: 'politic',
						},
					})
					.then((res) => {
						for (let politic of res.result) {
							this.xx.push({
								value: politic.code,
								label: politic.title,
							})
						}
					})
					.catch((err) => {
						this.$message.warning('获取血型失败')
					})
			},

			//获取民族列表
			getNation() {
				this.mzmList = []
				axios({
						url: '/common/veCommon/queryDictDataByModelCode?modelCode=MZ',
						method: 'get',
						params: {
							interfaceUserId: '09d5e1e7f9b049008eee645c783a1d66'
							// dictCode: 'nation',
						},
					})
					.then((res) => {
						for (let nation of res.result) {
							this.mzmList.push({
								value: nation.code,
								label: nation.title,
							})
						}
					})
					.catch((err) => {
						console.log(err)
						this.$message.warning('获取民族列表失败')
					})
			},



			doPrint() {
				var divToPrint = document.getElementById('printDiv');
				var newWin = window.open('', 'Print-Window');
				newWin.document.open();
				newWin.document.write('<html><body onload="window.print()">' + divToPrint.innerHTML + '</body></html>');
				newWin.document.close();
				setTimeout(function() {
					newWin.close();
				}, 10);
			},
			/**
			 * @msg: 初始化修改
			 */
			doShow(row, stuId) {
				veBaseStudentApi.get(stuId || row.id).then(res => {
					this.veBaseStudentVo = res.result.stu;
					this.veBaseStudentInfoVo = res.result.stuInfo;
					this.$refs.uploadFiles.setValue(null, res.result.stuInfo.photo);
					/*   this.$refs.boxZybmbj.setValue(res.result.stu);
					this.$refs.boxCitySelect.setValue(res.result.stu);
					this.$refs.uploadFiles.setValue(null, res.result.stuInfo.photo); */
				});

				//this.veBaseStudentVo =Object.assign({}, row)
				//    veBaseStudentApi.get(row.id).then((res) => {
				//      this.veBaseStudentVo = res.result
				// });
			},
			/**
			 * @msg: 编辑页取消
			 */
			handelCancel() {
				this.$emit('onCancel');
			}
		}
	};
</script>
<style lang="less" scoped></style>