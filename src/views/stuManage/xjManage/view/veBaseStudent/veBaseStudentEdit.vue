<template>
	<div class="edit_form">
		<!-- 编辑页 -->
		<edu-form width="900px" top="50px" :title="textMap[dialogStatus]"
			@ok="dialogStatus === 'create' ? createData() : updateData()" @cancel="handelCancel">
			<a-form-model ref="veBaseStudentDataForm" :rules="veBaseStudentRules" :model="veBaseStudentVo"
				labelAlign="right">
				<a-tabs>
					<a-tab-pane tab="基本信息" key="first">
						<div class="detail_title">基本信息</div>
						<a-row>
							<a-col :span="12">
								<a-form-model-item label="身份证类型" class="ytop" prop="sfzlx">
									
								<j-dict-select-tag v-model="veBaseStudentVo.sfzjlxm" placeholder="请选择" dictCode="SFZJLXM"/>		
								</a-form-model-item>
							</a-col>
							<a-col :span="12">
								<a-form-model-item label="身份证号" class="ytop" prop="sfzh" :rules="[{ required: true, message: '请输入身份证号' }]">
									<a-input v-model="veBaseStudentVo.sfzh" :maxLength="20" placeholder="请输入身份证号" />
								</a-form-model-item>
							</a-col>
						</a-row>
						<a-row>
							<a-col :span="12">
								<a-form-model-item label="姓名" prop="xm" :rules="[{ required: true, message: '请输入姓名' }]">
									<a-input v-model="veBaseStudentVo.xm" :maxLength="20" placeholder="请输入姓名" />
								</a-form-model-item>
							</a-col>
							<a-col :span="12">
								<a-form-model-item label="是否是困难生" prop="sfkns">
									<edu-data v-model="veBaseStudentVo.sfkns" stype="radio" code="shifou" />
								</a-form-model-item>
							</a-col>
						</a-row>
						<a-row>
							<a-col :span="12">
								<a-form-model-item label="学号" prop="xh" :rules="[{ required: true, message: '请输入学号' }]">
									<a-input v-model="veBaseStudentVo.xh" :maxLength="30" placeholder="请输入学号"  :disabled="dialogStatus !== 'create'"/>
								</a-form-model-item>
							</a-col>
							<a-col :span="12">
								<a-form-model-item label="性别" prop="xbm" :rules="[{ required: true, message: '选择性别' }]">
									<edu-data v-model="veBaseStudentVo.xbm" stype="radio" code="sexStr" />
								</a-form-model-item>
							</a-col>
						</a-row>
						<a-row>
							<a-col :span="12">
								<a-form-model-item label="姓名拼音" prop="xmpy">
									<a-input v-model="veBaseStudentVo.xmpy" :maxLength="200" placeholder="请输入姓名拼音" />
								</a-form-model-item>
							</a-col>
							<a-col :span="12">
								<a-form-model-item label="英文名" prop="ywm">
									<a-input v-model="veBaseStudentVo.ywm" :maxLength="200" placeholder="请输入英文名" />
								</a-form-model-item>
							</a-col>
						</a-row>

						<a-row>
							<a-col :span="12">
								<a-form-model-item label="学籍状态" prop="ywxj">
									<a-radio-group v-model="veBaseStudentVo.ywxj">
										<a-radio value="1"> 有 </a-radio>
										<a-radio value="0"> 无 </a-radio>
									</a-radio-group>
								</a-form-model-item>
							</a-col>
							<a-col :span="12">
								<a-form-model-item label="是否在校" prop="sfzx">
									<a-radio-group v-model="veBaseStudentVo.sfzx">
										<a-radio value="1"> 是 </a-radio>
										<a-radio value="0"> 否 </a-radio>
									</a-radio-group>
								</a-form-model-item>
							</a-col>
						</a-row>

						<a-row>
							<a-col :span="12">
								<a-form-model-item label="曾用名" prop="cym">
									<a-input v-model="veBaseStudentInfoVo.cym" :maxLength="20" placeholder="请输入曾用名" />
								</a-form-model-item>
							</a-col>
							<a-col :span="12">
								<a-form-model-item label="出生日期" prop="csDate">
									<DatePickByCN  v-model="veBaseStudentInfoVo.csDate"  placeholder="请选择出生日期" @change="tese"/>
								</a-form-model-item>
							</a-col>
						</a-row>
						<a-row>
							<a-col :span="12">
								<a-form-model-item label="民族码" prop="mzm">
									<j-dict-select-tag v-model="veBaseStudentVo.mzm" placeholder="请选择" dictCode="nation"/>
								</a-form-model-item>
							</a-col>
							<a-col :span="12">
								<a-form-model-item label="籍贯" prop="jg">
									<a-input v-model="veBaseStudentInfoVo.jg" :maxLength="255" placeholder="请输入籍贯" />
								</a-form-model-item>
							</a-col>
						</a-row>
						<a-row>
							<a-col :span="12">
								<a-form-model-item label="政治面貌" prop="zzmmm">
									<j-dict-select-tag v-model="veBaseStudentInfoVo.zzmmm" placeholder="请选择" dictCode="ZZMMM"/>
									<!-- <a-select style="width:100%" :options="zzmmmList" placeholder="请选择"
										v-model="veBaseStudentInfoVo.zzmmm" /> -->
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

						<a-form-model-item class="ytop" label="专业部" prop="boxZybmbj">
							<boxZybmbj ref="boxZybmbj"></boxZybmbj>
						</a-form-model-item>
						<a-row>
							<a-col :span="12">
								<a-form-model-item label="学制" prop="xz" :rules="[{ required: true, message: '请选择' }]">
									<a-select style="width:100%" :options="xuzhi" placeholder="请选择"
										v-model="veBaseStudentVo.xz" />
								</a-form-model-item>
							</a-col>
							<a-col :span="12">
								<a-form-model-item label="报名方式" prop="bmfsm">
									<edu-data v-model="veBaseStudentInfoVo.bmfsm" stype="select" code="bmfsm" />
									<!-- <j-dict-select-tag v-model="veBaseStudentInfoVo.bmfsm" placeholder="请选择" dictCode="BMFS"/> -->
									<!-- <a-select style="width:100%" :options="bmfsmList" placeholder="请选择"
										v-model="veBaseStudentInfoVo.bmfsm" /> -->
								</a-form-model-item>
							</a-col>
						</a-row>
						<a-row>
							<a-col :span="12">
								<a-form-model-item label="报名号" prop="bmh">
									<a-input v-model="veBaseStudentVo.bmh" :maxLength="20" placeholder="请输入报名号" />
								</a-form-model-item>
							</a-col>
							<a-col :span="12">
								<a-form-model-item label="入学年月" prop="rxDate">
									<DatePickByCN  mode="month" displayFormat="YYYY-MM"
										 v-model="veBaseStudentVo.rxDate"  placeholder="请选择入学年月" @change="tese"/>
									<!-- <a-date-picker v-model="veBaseStudentVo.rxDate" valueFormat="YYYY-MM" /> -->
								</a-form-model-item>
							</a-col>
						</a-row>
						<a-row>
							<a-col :span="12">
								<a-form-model-item label="入学成绩" prop="rxcj">
									<a-input-number :min="0" style="width:100%" v-model="veBaseStudentInfoVo.rxcj"
										placeholder="请输入入学成绩" />
								</a-form-model-item>
							</a-col>
							<a-col :span="12">
								<a-form-model-item label="毕业学校" prop="byxx">
									<a-input v-model="veBaseStudentInfoVo.byxx" :maxLength="255"
										placeholder="请输入毕业学校" />
								</a-form-model-item>
							</a-col>
						</a-row>

						<a-row>
							<a-col :span="12">
								<a-form-model-item label="入学文化程度" prop="rxwhcd">
									<j-dict-select-tag v-model="veBaseStudentVo.rxwhcd" placeholder="请选择" dictCode="RXWHCD"/>
								</a-form-model-item>
							</a-col>
							<a-col :span="12">
								<a-form-model-item label="学生类别" prop="xslb">
									<j-dict-select-tag v-model="veBaseStudentVo.xslb" placeholder="请选择" dictCode="XSLB"/>
								</a-form-model-item>
							</a-col>
						</a-row>

						<a-row>
							<a-col :span="12">
								<a-form-model-item label="学习形式" prop="xxxs">
									<j-dict-select-tag v-model="veBaseStudentVo.xxxs" placeholder="请选择" dictCode="XXXS"/>
								</a-form-model-item>
							</a-col>
							<a-col :span="12">
								<a-form-model-item label="入学方式" prop="rxfs">
									<j-dict-select-tag v-model="veBaseStudentVo.rxfs" placeholder="请选择" dictCode="RXFS"/>
								</a-form-model-item>
							</a-col>
						</a-row>

						<a-row>
							<a-col :span="12">
								<a-form-model-item label="港澳台侨外" prop="gatqwm">
									<j-dict-select-tag v-model="veBaseStudentVo.gatqwm" placeholder="请选择" dictCode="GATQWM"/>
								</a-form-model-item>
							</a-col>
							<a-col :span="12">
								<a-form-model-item label="入学日期" class="ytop" prop="rxrqDate">
									<DatePickByCN
									      v-model="veBaseStudentVo.rxrqDate"
									      placeholder="请选择学期开始日期"
										  @change="tese"
									    />
									<!-- <a-date-picker v-model="veBaseStudentVo.rxrqDate" valueFormat="YYYY-MM-DD" /> -->
								</a-form-model-item>
							</a-col>
						</a-row>
						
						<a-row>
							<a-col :span="12">
								<a-form-model-item label="准考证号" prop="zkzh">
									<a-input v-model="veBaseStudentVo.zkzh" :maxLength="20" placeholder="请输入准考证号" />
								</a-form-model-item>
							</a-col>
							<a-col :span="12">
								<a-form-model-item label="银行卡号" prop="yhkh">
									<a-input v-model="veBaseStudentInfoVo.yhkh" :maxLength="30" placeholder="请输入银行卡号" />
								</a-form-model-item>
							</a-col>
						</a-row>

						<div class="detail_title" style="margin-top:15px">联系方式</div>

						<a-form-model-item label="户口所在地" class="ytop" prop="province">
							<boxCitySelect ref="boxCitySelect"></boxCitySelect>
						</a-form-model-item>

						<a-form-model-item label="籍贯所在地" class="ytop" prop="jgszprovince">
							<boxCitySelectJgsz ref="boxCitySelectJgsz"></boxCitySelectJgsz>
						</a-form-model-item>

						<a-form-model-item label="出生地所在地" class="ytop" prop="csdszprovince">
							<boxCitySelectCsdsz ref="boxCitySelectCsdsz"></boxCitySelectCsdsz>
						</a-form-model-item>

						<a-form-model-item label="生源所在地" class="ytop" prop="sheng">
							<boxCitySelectSheng ref="boxCitySelectSheng"></boxCitySelectSheng>
						</a-form-model-item>

						<a-row>
							<a-col :span="12">
								<a-form-model-item label="学生联系电话" prop="xslxdh">
									<a-input v-model="veBaseStudentInfoVo.xslxdh" :maxLength="20"
										placeholder="请输入学生联系电话" />
								</a-form-model-item>
							</a-col>
							<a-col :span="12">
								<a-form-model-item label="QQ" prop="jstxh">
									<a-input v-model="veBaseStudentInfoVo.jstxh" :maxLength="50"
										placeholder="请输入即时通讯号" />
								</a-form-model-item>
							</a-col>
						</a-row>

						<a-row>
							<a-col :span="12">
								<a-form-model-item label="户口性质" prop="hksz">
									<j-dict-select-tag v-model="veBaseStudentInfoVo.hksz" placeholder="请选择" dictCode="HKSZ"/>
									<!-- <a-select style="width:100%" :options="hksz" placeholder="请选择"
										v-model="veBaseStudentVo.hksz" /> -->
								</a-form-model-item>
							</a-col>
							<a-col :span="12">
								<a-form-model-item label="户口详细地址" prop="jstxh">
									<a-input v-model="veBaseStudentVo.hkxxdz" :maxLength="50" placeholder="请输入户口详细地址" />
								</a-form-model-item>
							</a-col>
						</a-row>

						<a-row>
							<a-col :span="12">
								<a-form-model-item label="招生对象" prop="zsdx">
									<j-dict-select-tag v-model="veBaseStudentInfoVo.zsdx" placeholder="请选择" dictCode="zsdx"/>
								</a-form-model-item>
							</a-col>
							<a-col :span="12">
								<a-form-model-item label="户籍所属派出所" prop="jstxh">
									<a-input v-model="veBaseStudentVo.hjsspcs" :maxLength="50"
										placeholder="请输入户籍所属派出所" />
								</a-form-model-item>
							</a-col>
						</a-row>

						<a-row>
							<a-col :span="12">
								<a-form-model-item label="学生来源" prop="xsly">
									<j-dict-select-tag v-model="veBaseStudentInfoVo.xsly" placeholder="请选择" dictCode="XSLY"/>
								</a-form-model-item>
							</a-col>
							<a-col :span="12">
								<a-form-model-item label="是否随迁子女" prop="jstxh">
									<a-radio-group v-model="veBaseStudentInfoVo.sfsqzn">
										<a-radio value="1"> 是 </a-radio>
										<a-radio value="0"> 否 </a-radio>
									</a-radio-group>
								</a-form-model-item>
							</a-col>
						</a-row>

						<a-row>
							<a-col :span="12">
								<a-form-model-item label="联系人" prop="lxr">
									<a-input v-model="veBaseStudentInfoVo.lxr" :maxLength="50" placeholder="请输入联系人" />
								</a-form-model-item>
							</a-col>
							<a-col :span="12">
								<a-form-model-item label="家庭邮政编码" prop="jtyzbm">
									<a-input v-model="veBaseStudentInfoVo.jtyzbm" :maxLength="50"
										placeholder="请输入家庭邮政编码" />
								</a-form-model-item>
							</a-col>
						</a-row>

						<a-row>
							<a-col :span="12">
								<a-form-model-item label="乘火车区间" prop="chcqj">
									<a-input v-model="veBaseStudentInfoVo.chcqj" :maxLength="50"
										placeholder="请输入乘火车区间" />
								</a-form-model-item>
							</a-col>
							<a-col :span="12">
								<a-form-model-item label="是否建档立卡" prop="sfjdlk">
									<a-radio-group v-model="veBaseStudentInfoVo.sfjdlk">
										<a-radio value="1"> 是 </a-radio>
										<a-radio value="0"> 否 </a-radio>
									</a-radio-group>
								</a-form-model-item>
							</a-col>
						</a-row>


						<a-row>
							<a-col :span="12">
								<a-form-model-item label="电子邮箱" prop="dzxx">
									<a-input v-model="veBaseStudentInfoVo.dzxx" :maxLength="50" placeholder="请输入电子邮箱" />
								</a-form-model-item>
							</a-col>
							<a-col :span="12">
								<a-form-model-item label="家庭联系电话" prop="jtlxdh">
									<a-input v-model="veBaseStudentInfoVo.jtlxdh" :maxLength="30"
										placeholder="请输入家庭联系电话" />
								</a-form-model-item>
							</a-col>
						</a-row>
						<a-form-model-item label="详细家庭地址" prop="jtdz">
							<a-input v-model="veBaseStudentInfoVo.jtdz" :maxLength="255" placeholder="请输入家庭地址" />
						</a-form-model-item>
					</a-tab-pane>
					<a-tab-pane tab="家庭成员" v-if="family" key="tttt">
						<veStuFamilyEdit :stuId="stuId" ref="veStuFamilyEdit"></veStuFamilyEdit>
					</a-tab-pane>

					<a-tab-pane tab="其他信息" key="second">
						<a-row>
							<a-col :span="12">
								<a-form-model-item label="国籍/地区" prop="chcqj">
									<a-input v-model="veBaseStudentInfoVo.gj" :maxLength="50" placeholder="请输入国籍/地区" />
								</a-form-model-item>
							</a-col>
							<a-col :span="12">
								<a-form-model-item label="是否享受国家助学金" prop="sfjdlk">
									<a-radio-group v-model="veBaseStudentInfoVo.sfssgjzxj">
										<a-radio value="1"> 是 </a-radio>
										<a-radio value="0"> 否 </a-radio>
									</a-radio-group>
								</a-form-model-item>
							</a-col>
						</a-row>

						<a-row>
							<a-col :span="12">
								<a-form-model-item label="助学金月发放标准" prop="zxjffbz">
									<a-input v-model="veBaseStudentInfoVo.zxjffbz" :maxLength="50"
										placeholder="请输入助学金月发放标准" />
								</a-form-model-item>
							</a-col>
							<a-col :span="12">
								<a-form-model-item label="宗教信仰" prop="zjxy">
									<a-input v-model="veBaseStudentInfoVo.zjxy" :maxLength="50" placeholder="请输入宗教信仰" />
								</a-form-model-item>
							</a-col>
						</a-row>

						<a-row>
							<a-col :span="12">
								<a-form-model-item class="ytop" label="健康状况" prop="jkzkm">
									<j-dict-select-tag v-model="veBaseStudentInfoVo.jkzkm" placeholder="请选择" dictCode="healthy"/>
								</a-form-model-item>
							</a-col>
							<a-col :span="12">
								<a-form-model-item class="ytop" label="是否流动人口" prop="sfsldrk">
									<edu-data v-model="veBaseStudentInfoVo.sfsldrk" stype="select" code="sfsldrk" />
								</a-form-model-item>
							</a-col>
						</a-row>
						<a-row>
							<a-col :span="12">
								<a-form-model-item label="户口类别" prop="hklbm">
									<j-dict-select-tag v-model="veBaseStudentInfoVo.hklbm" placeholder="请选择" dictCode="residence"/>
								</a-form-model-item>
							</a-col>
							<a-col :span="12">
								<a-form-model-item label="是否低保" prop="sfdb">
									<edu-data v-model="veBaseStudentInfoVo.sfdb" stype="radio" code="shifou" />
								</a-form-model-item>
							</a-col>
						</a-row>
						<a-row>
							<a-col :span="12">
								<a-form-model-item label="血型" prop="xx">
									<j-dict-select-tag v-model="veBaseStudentInfoVo.xx" placeholder="请选择" dictCode="XX"/>
								</a-form-model-item>
							</a-col>
						</a-row>
						<a-form-model-item label="特长" prop="tc">
							<a-textarea v-model="veBaseStudentInfoVo.tc" :maxLength="65535" placeholder="请输入特长"
								:rows="4" />
						</a-form-model-item>
						<a-form-model-item label="备注" prop="tc">
							<a-textarea v-model="veBaseStudentInfoVo.remark" :maxLength="65535" placeholder="请输入备注"
								:rows="4" />
						</a-form-model-item>
					</a-tab-pane>
				</a-tabs>
			</a-form-model>
		</edu-form>
	</div>
</template>

<script>
	import veBaseStudentApi from '@/views/stuManage/xjManage/api/veBaseStudentApi';
	import boxZybmbj from '@/components/boxZybmbj';
	import boxCitySelect from '@/components/boxCitySelect';
	import boxCitySelectCsdsz from '@/components/boxCitySelectCsdsz';
	import boxCitySelectJgsz from '@/components/boxCitySelectJgsz';
	import boxCitySelectSheng from '@/components/boxCitySelectSheng';
	import uploadFiles from '@/components/uploadFiles';
	import veStuFamilyEdit from './veStuFamilyEdit';
	import {
		axios
	} from '@/utils/request'
	export default {
		components: {
			boxZybmbj,
			uploadFiles,
			boxCitySelect,
			veStuFamilyEdit,
			boxCitySelectSheng,
			boxCitySelectJgsz,
			boxCitySelectCsdsz
		},
		props: {
			family: {
				type: Boolean,
				default: false
			}
		},
		data() {
			let validateBoxZybmbj = (rule, value, callback) => {
				const data = this.$refs.boxZybmbj.getCheck();
				if (data) {
					callback(new Error(data));
				} else {
					callback();
				}
			};
			let validatePhone = (rule, value, callback) => {
				if (this.veBaseStudentInfoVo.phone) {
					callback();
				} else {
					callback(new Error('请完善'));
				}
			};
			let validateHomePhone = (rule, value, callback) => {
				if (this.veBaseStudentInfoVo.homePhone) {
					callback();
				} else {
					callback(new Error('请完善'));
				}
			};

			const data = {
				veBaseStudentVo: this.resetveBaseStudentVo(),
				veBaseStudentInfoVo: this.resetveBaseStudentInfoVo(),
				textMap: {
					update: '编辑-学生信息',
					create: '新增-学生信息'
				},
				stuId: null,
				dialogStatus: 'create',
				veBaseStudentRules: {
					boxZybmbj: [{
						validator: validateBoxZybmbj,
						trigger: 'change',
						required: true
					}],
					phone: [{
						validator: validatePhone,
						trigger: 'change',
						required: true
					}],
					homePhone: [{
						validator: validateHomePhone,
						trigger: 'change',
						required: true
					}]
				}
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
			// this.getNation()
			// this.getPolitic()
			// this.getsfzlx()
			// this.getrxwhcd()
			// this.getxslb()
			// this.getxxxs()
			// this.getrxfs()
			// this.gethksz()
			// this.getzsdx()
			// this.getxsly()
			// this.getjtlb()
			// this.getxx()
			// this.getgatqwm()
		},
		methods: {
			tese(e){
				this.$forceUpdate()
			},
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
			handleDateChange(date){
				console.log("收到zhi",date)
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





			/**
			 * @msg: 重置数据
			 */
			resetveBaseStudentInfoVo() {
				return {
					stuId: '', // 学生ID
					cym: '', // 曾用名
					rxfs:'',
					csDate: '', // 出生日期
					jg: '', // 籍贯
					jkzkm: '', // 健康状况码
					zzmmm: '', // 政治面貌码
					hklbm: '', // 户口类别码
					sfsldrk: '', // 是否是流动
					address: '', // 家庭地址
					rxDate: undefined, // 入学年月
					rxrqDate:undefined,
					csDate:undefined,
					homePhone: '', // 家庭联系电话
					tc: '', // 特长
					phone: '', // 学生联系电话
					email: '', // 电子信箱
					photo: '', // 照片
					qq: '', // 即时通讯号
					sfdb: 0, // 是否低保0否1是
					byxx: '', // 毕业学校
					bmfsm: '', // 报名方式
					rxcj: '', // 入学成绩
					jtdzStatus: '', // 家庭地址是否公开 1公开2不公开
					xslxdhStatus: '' // 联系电话是否公开 1公开2不公开
				};
			},
			/**
			 * @msg: 重置数据
			 */
			resetveBaseStudentVo() {
				return {
					sfzh: '', // 身份证号，唯一
					code: '', // 学号
					name: '', // 姓名
					sex: 1, // 性别码1男生2女生
					userId: '', // 用户ID
					mzm: '', // 民族码
					bmh: '', // 报名号
					jdfs: 1, // 就读方式：1住校，2走读
					xsdqztm: 'ZX', // 当前状态码'XS'=>'新生', 'ZX' => '在校', 'XX' => '休学', 'TX' => '退学', 'KC' => '开除', 'BY' => '毕业', 'YY' => '肄业', 'ZXX' => '转学', 'JY' => '结业'
					rxDate: undefined, // 入学年月
					rxrqDate:undefined,
					csDate:undefined,
					xz: '', // 学制;与学制表关联
					falId: '', // 院系ID
					specId: '', // 专业ID
					bjId: '', // 班级ID
					gradeId: '', // 年级ID
					province: '', // 户口所在省份
					city: '', // 户口所在市
					county: '', // 户口所在区
					sProvince: '', // 生源地省id
					sCity: '', // 生源地市id
					sCounty: '', // 生源地区id
					sfkns: 0, // 是否是困难生 0=否  1=是
					zkzh: '', // 准考证号
					ksh: '', // 考生号
					updateStatus: '' // 更新状态（0：未更新; 1：已更新）
				};
			},
			/**
			 * @msg: 初始化新增
			 */
			doCreate() {
				this.dialogStatus = 'create';
				this.veBaseStudentVo = this.resetveBaseStudentVo();
				this.$nextTick(() => {
					this.$refs.veBaseStudentDataForm.clearValidate();
				});
			},
			/**
			 * @msg: 初始化修改
			 */
			doUpdate(row) {
				veBaseStudentApi.get(row.id).then(res => {
					this.veBaseStudentVo = res.result.stu;
					this.veBaseStudentInfoVo = res.result.stuInfo;
					if (this.veBaseStudentVo.rxny) {
						this.veBaseStudentVo.rxDate = this.$date.getDate(this.veBaseStudentVo.rxny * 1000).format(
							'YYYY-MM');
					}
					if (this.veBaseStudentInfoVo.csrq) {
						this.veBaseStudentInfoVo.csDate = this.$date.getDate(this.veBaseStudentInfoVo.csrq * 1000)
							.format('YYYY-MM-DD');
					}
					console.log(this.veBaseStudentInfoVo.csDate, 'this.veBaseStudentInfoVo.csDate')
					if (this.veBaseStudentVo.rxrq) {
						this.veBaseStudentVo.rxrqDate = this.$date.getDate(this.veBaseStudentVo.rxrq * 1000)
							.format('YYYY-MM-DD');
					}
					this.veBaseStudentVo.xsdqztm='ZX';
					this.$refs.boxZybmbj.setValue(res.result.stu);
					this.$refs.boxCitySelect.setValue(res.result.stu);
					this.$refs.boxCitySelectJgsz.setValue(res.result.stuInfo);
					this.$refs.boxCitySelectCsdsz.setValue(res.result.stuInfo);
					this.$refs.boxCitySelectSheng.setValue(res.result.stu);
					this.$refs.uploadFiles.setValue(null, res.result.stuInfo.zp);
				});
				this.dialogStatus = 'update';
				this.$nextTick(() => {
					this.$refs.veBaseStudentDataForm.clearValidate();
					if (this.family) {
						this.stuId = row.id;
					}
				});
			},
			/**
			 * @msg: 编辑页取消
			 */
			handelCancel() {
				this.$emit('onCancel');
			},
			/**
			 * @msg: 获取提交的数据 新增和 修改复用
			 */
			getSubData(isUpdate, callback) {
				const tempData = Object.assign({}, this.veBaseStudentVo);
				if (tempData.rxDate) {
					tempData.rxny = this.$date.geTime(tempData.rxDate, 'YYYY-MM') / 1000;
				}
				if (tempData.rxrqDate) {
					tempData.rxrq = this.$date.geTime(tempData.rxDate, 'YYYY-MM') / 1000;
				}
				const tempInfoData = Object.assign({}, this.veBaseStudentInfoVo);
				if (tempInfoData.csDate) {
					tempInfoData.csrq = this.$date.geTime(tempInfoData.csDate, 'YYYY-MM-DD') / 1000;
				}
				const fileIds = this.$refs.uploadFiles.getValue();
				tempInfoData.photo = fileIds[0];
				this.$refs.boxCitySelect.getSetValue(tempData);
				this.$refs.boxCitySelectJgsz.getSetValue(tempInfoData);
				this.$refs.boxCitySelectCsdsz.getSetValue(tempInfoData);
				this.$refs.boxCitySelectSheng.getSetValue(tempData);
				this.$refs.boxZybmbj.getSetValue(tempData, () => {
					const ret = {
						stu: tempData,
						stuInfo: tempInfoData
					};
					if (this.family && this.$refs.veStuFamilyEdit) {
						ret.family = this.$refs.veStuFamilyEdit.getSubData();
					}
					console.log("ret",ret)
					callback(ret);
				});
			},
			/**
			 * @msg: 调用Api创建数据
			 */
			createData() {
				this.$refs.veBaseStudentDataForm.validate(valid => {
					if (valid) {
						this.getSubData(false, subData => {
							if (subData == null) {
								return;
							}
							veBaseStudentApi.add(subData).then(res => {
								this.$notification.success({
									message: '数据新增成功',
									description: '新增了一条数据'
								});
								this.$emit('onOk');
							});
						});
					}
				});
			},
			/**
			 * @msg: 调用Api修改数据
			 */
			updateData() {
				this.$refs.veBaseStudentDataForm.validate((valid,errors) => {
					if (valid) {
						this.getSubData(true, subData => {
							console.log("subData",subData)
							if (subData == null) {
								return;
							}
							veBaseStudentApi.update(subData).then(() => {
								this.$notification.success({
									message: '数据修改成功',
									description: '修改了一条数据'
								});
								this.$emit('onOk');
							});
						});
					}else{
						console.log(error)
					}
				});
			}
		}
	};
</script>
<style lang="less" scoped></style>