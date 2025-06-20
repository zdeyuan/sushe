<template>
	<a-modal v-model="joinOrChangeStuShow" :title="joinOrChangeStuType == 'add' ? '添加' : '修改'" :width="1073"
		:footer='false'>
		<div>
			<div class="pageContentBox">
				<table class="scanTable top-div" style="text-align: left">
					<tr>
						<td colspan="4" class="tr-color">
							<span class="title-style">基本信息</span>
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style"><span class="tip-star">*</span>学号</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.xh"
								@blur="validateField('xh', ApplyObj.xh, [validation.requiredRule])"
								:disabled='joinOrChangeStuType!="add"'></a-input>
							<span class="nonull-tip" v-if="errors.xh">{{errors.xh}}</span>
						</td>
						<td class="td-div">
							<div class="font-style"><span class="tip-star">*</span>姓名</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.xm"
								@blur="validateField('xm', ApplyObj.xm, [validation.requiredRule])"
								:disabled='joinNotEite'></a-input>
							<span class="nonull-tip" v-if="errors.xm">{{errors.xm}}</span>
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">姓名拼音</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.xmpy"
								:disabled='joinNotEite'></a-input>
						</td>
						<td class="td-div">
							<div class="font-style">英文名</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.ywm"
								:disabled='joinNotEite'></a-input>
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">身份证件类型</div>
						</td>
						<td class="double">
							<a-select style="width:100%" :options="sfzlxList" placeholder="请选择"
								v-model="ApplyObj.sfzjlxm" :disabled='joinNotEite' />
						</td>
						<td class="td-div">
							<div class="font-style"><span class="tip-star">*</span>身份证号</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.sfzh"
								@blur="validateField('sfzh', ApplyObj.sfzh, [validation.requiredRule])"
								v-on:blur="idCheck()" :disabled='joinNotEite'></a-input>
							<span class="nonull-tip" v-if="errors.sfzh">{{errors.sfzh}}</span>
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">曾用名</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.cym" v-on:blur="oldNameBule()"
								:disabled='joinNotEite'>
							</a-input>
						</td>
						<td class="td-div">
							<div class="font-style">性别</div>
						</td>
						<td class="double">
							<a-radio-group v-model="ApplyObj.xbm" :disabled='joinNotEite'>
								<a-radio value="1"> 男 </a-radio>
								<a-radio value="2"> 女 </a-radio>
							</a-radio-group>
						</td>
					</tr>
					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">出生日期</div>
						</td>
						<td class="double">
							<DatePickByCN 
							      v-model="ApplyObj.csrqName"
							      :disabled="joinNotEite"
							      placeholder="请选择日期"
							    />
						</td>
						<td class="td-div">
							<div class="font-style">是否在校</div>
						</td>
						<td class="double">
							<a-radio-group v-model="ApplyObj.sfzx" :disabled='joinNotEite'>
								<a-radio value="1"> 是 </a-radio>
								<a-radio value="0"> 否 </a-radio>
							</a-radio-group>
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">籍贯</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.jg"
								:disabled='joinNotEite'></a-input>
						</td>
						<td class="td-div">
							<div class="font-style">民族</div>
						</td>
						<td class="double">
							<!-- 民族下拉框 -->
							<a-select style="width:100%" :options="mzmList" placeholder="请选择" v-model="ApplyObj.mzm"
								:disabled='joinNotEite' />
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">就读方式</div>
						</td>
						<td class="double">
							<a-radio-group v-model="ApplyObj.jdfs" :disabled='joinNotEite'>
								<a-radio :value="1"> 住校 </a-radio>
								<a-radio :value="0"> 走读 </a-radio>
							</a-radio-group>
						</td>
						<td class="td-div">
							<div class="font-style">政治面貌</div>
						</td>
						<td class="double">
							<!-- 政治面貌下拉框 -->
							 <j-dict-select-tag :disabled='joinNotEite' v-model="ApplyObj.zzmmm" placeholder="请选择" dictCode="ZZMMM"/>
							  <!-- <edu-data :disabled='joinNotEite' v-model="ApplyObj.zzmmm"  stype="select" code="ZZMMM" /> -->
							<!-- <a-select style="width:100%" :options="zzmmmList" placeholder="请选择" v-model="ApplyObj.zzmmm"
								:disabled='joinNotEite' /> -->
						</td>
					</tr>

					<tr class="tr-style">
						<!-- 					<td class="td-div">
						<div class="font-style"> 照片 </div>
					</td>
					<td class="double">
						照片上传
					</td> -->
						<td class="td-div">
							<div class="font-style">困难生</div>
						</td>
						<td class="double">
							<a-radio-group v-model="ApplyObj.sfkns" :disabled='joinNotEite'>
								<a-radio :value="1"> 是 </a-radio>
								<a-radio :value="0"> 否 </a-radio>
							</a-radio-group>
						</td>
						<td class="td-div">
							<div class="font-style">学籍状态</div>
						</td>
						<td class="double">
							<a-radio-group v-model="ApplyObj.ywxj" :disabled='joinNotEite'>
								<a-radio value="1"> 有 </a-radio>
								<a-radio value="0"> 无 </a-radio>
							</a-radio-group>
						</td>
					</tr>

				</table>

				<table class="scanTable" style="text-align: left; margin-top: 20px">
					<tr>
						<td colspan="4" class="tr-color">
							<span class="title-style">学籍信息</span>
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">入学文化程度</div>
						</td>
						<td class="double">
							<a-select style="width:100%" :options="rxwhcd" placeholder="请选择" v-model="ApplyObj.rxwhcd"
								:disabled='joinNotEite' />
						</td>
						<td class="td-div">
							<div class="font-style">入学日期</div>
						</td>
						<td class="double">
							<DatePickByCN
							      v-model="ApplyObj.rxrqName"
							      :disabled="joinNotEite"
							      placeholder="请选择日期"
							      custom-class="date-style-Apply"
							    />
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">学生类别</div>
						</td>
						<td class="double">
							<a-select style="width:100%" :options="xslb" placeholder="请选择" v-model="ApplyObj.xslb"
								:disabled='joinNotEite' />
						</td>
						<td class="td-div">
							<div class="font-style">学习形式</div>
						</td>
						<td class="double">
							<a-select style="width:100%" :options="xxxs" placeholder="请选择" v-model="ApplyObj.xxxs"
								:disabled='joinNotEite' />
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">入学方式</div>
						</td>
						<td class="double">
							<a-select style="width:100%" :options="rxfs" placeholder="请选择" v-model="ApplyObj.rxfs"
								:disabled='joinNotEite' />
						</td>
						<td class="td-div">
							<div class="font-style">港澳台侨外</div>
						</td>
						<td class="double">
							<a-select style="width:100%" :options="gatqwm" placeholder="请选择" v-model="ApplyObj.gatqwm"
								:disabled='joinNotEite' />
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style"><span class="tip-star">*</span>专业部</div>
						</td>
						<td class="double">
							<a-select style="width:100%" :options="addfaculty" placeholder="请选择"
								@change="addfacultyChange" v-model="ApplyObj.falId"
								@blur="validateField('falId', ApplyObj.falId, [validation.requiredRuleByArr])"
								:disabled='joinNotEite' />
							<span class="nonull-tip" v-if="errors.falId">{{errors.falId}}</span>
						</td>
						<td class="td-div">
							<div class="font-style"><span class="tip-star">*</span>专业</div>
						</td>
						<td class="double">
							<a-select style="width:100%" class="input-style-replyTwo" :options="addspecialty"
								@blur="validateField('specId', ApplyObj.specId, [validation.requiredRuleByArr])"
								placeholder="请选择" v-model="ApplyObj.specId" @change="getbjIdList"
								:disabled='joinNotEite' />
							<span class="nonull-tip" v-if="errors.specId">{{errors.specId}}</span>
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style"><span class="tip-star">*</span>班级</div>
						</td>
						<td class="double">
							<!-- 没有接口 -->
							<a-select style="width:100%" :options="bjIdList" placeholder="请选择" v-model="ApplyObj.bjId"
								:disabled='joinNotEite'
								@blur="validateField('bjId', ApplyObj.bjId, [validation.requiredRule])" />
							<span class="nonull-tip" v-if="errors.bjId">{{errors.bjId}}</span>
						</td>
						<td class="td-div">
							<div class="font-style"><span class="tip-star">*</span>学制</div>
						</td>
						<td class="double">
							<a-select style="width:100%" :options="xuzhi" placeholder="请选择学制" v-model="ApplyObj.xz"
								:disabled='joinNotEite' />
							<span class="nonull-tip" v-if="errors.xz">{{errors.xz}}</span>
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">报名方式</div>
						</td>
						<td class="double">
							<!-- 没有接口 -->
							<a-select style="width:100%" :options="bmfsmList" placeholder="请选择" v-model="ApplyObj.bmfsm"
								:disabled='joinNotEite' />
						</td>
						<td class="td-div">
							<div class="font-style">报名号</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model="ApplyObj.bmh" :disabled='joinNotEite'></a-input>
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">入学年月</div>
						</td>
						<td class="double">
							<DatePickByCN
							      v-model="ApplyObj.rxnyName"
							      :disabled="joinNotEite"
							      placeholder="请选择日期"
							      custom-class="date-style-Apply"
							    />
						</td>
						<td class="td-div">
							<div class="font-style">入学成绩</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.rxcj"
								:disabled='joinNotEite'></a-input>
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">毕业学校</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.byxx"
								:disabled='joinNotEite'></a-input>
						</td>
						<td class="td-div">
							<div class="font-style">准考证号</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.zkzh"
								:disabled='joinNotEite'></a-input>
						</td>
					</tr>
					
					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">银行卡号</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.yhkh"
								:disabled='joinNotEite'></a-input>
						</td>
					</tr>

				</table>

				<table class="scanTable" style="text-align: left; margin-top: 20px">
					<tr>
						<td colspan="4" class="tr-color">
							<span class="title-style">联系方式</span>
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style"><span class="tip-star">*</span>户籍所在地</div>
						</td>
						<td colspan="3" class="double">
							<boxCitySelect ref="boxCitySelect" :disabled='joinNotEite'></boxCitySelect>
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style"><span class="tip-star">*</span>籍贯所在地</div>
						</td>
						<td colspan="3" class="double">
							<boxCitySelectJgsz ref="boxCitySelectJgsz" :disabled='joinNotEite'></boxCitySelectJgsz>
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style"><span class="tip-star">*</span>出生地所在地</div>
						</td>
						<td colspan="3" class="double">
							<boxCitySelectCsdsz ref="boxCitySelectCsdsz" :disabled='joinNotEite'></boxCitySelectCsdsz>
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style"><span class="tip-star">*</span>生源所在地</div>
						</td>
						<td colspan="3" class="double">
							<boxCitySelectSheng ref="boxCitySelectSheng" :disabled='joinNotEite'></boxCitySelectSheng>
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">户口性质</div>
						</td>
						<td class="double">
							<a-select style="width:100%" :options="hksz" placeholder="请选择" v-model="ApplyObj.hksz"
								:disabled='joinNotEite' />
						</td>
						<td class="td-div">
							<div class="font-style">户口详细地址</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.hkxxdz"
								:disabled='joinNotEite'></a-input>
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">户籍所属派出所</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.hjsspcs"
								:disabled='joinNotEite'></a-input>
						</td>
						<td class="td-div">
							<div class="font-style">招生对象</div>
						</td>
						<td class="double">
							<a-select style="width:100%" :options="zsdx" placeholder="请选择" v-model="ApplyObj.zsdx"
								:disabled='joinNotEite' />
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">学生来源</div>
						</td>
						<td class="double">
							<a-select style="width:100%" :options="xsly" placeholder="请选择" v-model="ApplyObj.xsly"
								:disabled='joinNotEite' />
						</td>
						<td class="td-div">
							<div class="font-style">是否随迁子女</div>
						</td>
						<td class="double">
							<a-radio-group v-model="ApplyObj.sfsqzn" :disabled='joinNotEite'>
								<a-radio value="1"> 是 </a-radio>
								<a-radio value="0"> 否 </a-radio>
							</a-radio-group>
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">联系人</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.lxr"
								:disabled='joinNotEite'></a-input>
						</td>
						<td class="td-div">
							<div class="font-style">家庭邮政编码</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.yzbm"
								:disabled='joinNotEite'></a-input>
						</td>
					</tr>


					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">学生联系电话</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.xslxdh"
								:disabled='joinNotEite'></a-input>
						</td>
						<td class="td-div">
							<div class="font-style"><span class="tip-star">*</span>家庭联系电话</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.jtlxdh"
								@blur="validateField('jtlxdh', ApplyObj.jtlxdh, [validation.requiredRule,validation.iphoneRule])"
								:disabled='joinNotEite'></a-input>
							<span class="nonull-tip" v-if="errors.jtlxdh">{{errors.jtlxdh}}</span>
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style"><span class="tip-star">*</span>详细家庭地址</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.jtdz" v-on:blur="adressCheck()"
								:disabled='joinNotEite'>
							</a-input>
							<span class="nonull-tip" v-if="errors.jtdz">{{errors.jtdz}}</span>
						</td>
						<td class="td-div">
							<div class="font-style">电子邮箱</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.dzxx" v-on:blur="email()"
								:disabled='joinNotEite'></a-input>
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">乘火车区间</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.chcqj"
								:disabled='joinNotEite'></a-input>
						</td>
						<td class="td-div">
							<div class="font-style">是否建档立卡</div>
						</td>
						<td class="double">
							<a-radio-group v-model="ApplyObj.sfjdlk" :disabled='joinNotEite'>
								<a-radio value="1"> 是 </a-radio>
								<a-radio value="0"> 否 </a-radio>
							</a-radio-group>
						</td>
					</tr>

				</table>

				<table class="scanTable" style="text-align: left; margin-top: 20px;">
					<tr>
						<td colspan="4" class="tr-color">
							<span class="title-style">其他信息</span>
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">国籍/地区</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.gj"
								:disabled='joinNotEite'></a-input>
						</td>
						<td class="td-div">
							<div class="font-style">是否享受国家助学金</div>
						</td>
						<td class="double">
							<a-radio-group v-model="ApplyObj.sfssgjzxj" :disabled='joinNotEite'>
								<a-radio value="1"> 是 </a-radio>
								<a-radio value="0"> 否 </a-radio>
							</a-radio-group>
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">助学金月发放标准</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.zxjffbz"
								:disabled='joinNotEite'></a-input>
						</td>
						<td class="td-div">
							<div class="font-style">宗教信仰</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.zjxy"
								:disabled='joinNotEite'></a-input>
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">健康状况</div>
						</td>
						<td class="double">
							<a-select style="width:50%" :options="jkzkmList" placeholder="请选择" v-model="ApplyObj.jkzkm"
								:disabled='joinNotEite' />
						</td>
						<td class="td-div">
							<div class="font-style">是否流动人口</div>
						</td>
						<td class="double">
							<a-radio-group v-model="ApplyObj.sfsldrk" :disabled='joinNotEite'>
								<a-radio value="1"> 是 </a-radio>
								<a-radio value="0"> 否 </a-radio>
							</a-radio-group>
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">户口类别</div>
						</td>
						<td class="double">
							<a-select style="width:50%" :options="hklbmList" placeholder="请选择" v-model="ApplyObj.hklbm"
								:disabled='joinNotEite' />
						</td>
						<td class="td-div">
							<div class="font-style">是否低保</div>
						</td>
						<td class="double">
							<a-radio-group v-model="ApplyObj.sfdb" :disabled='joinNotEite'>
								<a-radio :value="1"> 是 </a-radio>
								<a-radio :value="0"> 否 </a-radio>
							</a-radio-group>
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">家庭类别</div>
						</td>
						<td class="double">
							<a-select style="width:50%" :options="jtlb" placeholder="请选择" v-model="ApplyObj.jtlb"
								:disabled='joinNotEite' />
						</td>
						<td class="td-div">
							<div class="font-style">血型</div>
						</td>
						<td class="double">
							<a-select style="width:50%" :options="xx" placeholder="请选择" v-model="ApplyObj.xx"
								:disabled='joinNotEite' />
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">特长</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.tc"
								:disabled='joinNotEite'></a-input>
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">备注</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.remark"
								:disabled='joinNotEite'></a-input>
						</td>
					</tr>

				</table>

				<!-- 按钮区 -->
				<div class="content-head">
					<div class="applyBtn-div">
						<a-row>
							<a-col :span="10"> </a-col>
							<a-col :span="8">
								<a-button class="search-button btn-style btn" @click="tip"> 确认</a-button>
								<a-button class="search-button btn-style btn-cancle" @click="cancel"> 取消 </a-button>
							</a-col>
							<a-col :span="6"> </a-col>
						</a-row>
					</div>
				</div>
			</div>
		</div>
	</a-modal>
</template>
<script>
	import {
		axios
	} from '@/utils/request'
	import '@/assets/less/TableExpand.less'
	import {
		mixinDevice
	} from '@/utils/mixin'
	import {
		EduListMixin
	} from '@/mixins/EduListMixin'
	import validationService from '@/utils/validateForm';
	import zhCN from 'ant-design-vue/es/locale/zh_CN';
	import boxCitySelect from '@/components/boxCitySelect'
	import boxCitySelectCsdsz from '@/components/boxCitySelectCsdsz'
	import boxCitySelectJgsz from '@/components/boxCitySelectJgsz'
	import boxCitySelectSheng from '@/components/boxCitySelectSheng'
	export default {
		components: {
			boxCitySelect,
			boxCitySelectCsdsz,
			boxCitySelectJgsz,
			boxCitySelectSheng
		},
		data() {
			return {
				zhCN,
				errors: {},
				validation: validationService,
				ApplyObj: {
					xbm: 1,
					sfdb: 1,
					jdfs: 1,
					zslx: 1,
					sfsldrk:1,
					sfkns:1,
					provinceId: '',
					cityId: '',
					countyId: '',
					specId: '',
					bjId:'',
					yxmc: '',
					zymc: '',
					province: '',
					city: '',
					county: '',
					zzmmm:'',
					mzm:''
				}, //弹窗对象
				//下拉框数据
				addfaculty: [],
				addspecialty: [],
				xuzhi: [],
				zzmmmList: [],
				bjIdList: [],
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
				xx: [],
				gatqwm: [],
				jkzkmList: [{
						value: '1',
						label: '健康',
					},
					{
						value: '2',
						label: '亚健康',
					}, {
						value: '3',
						label: '有疾病,遗传病等',
					},
				],
				mzmList: [],
				hklbmList: [{
						value: '1',
						label: '城市',
					},
					{
						value: '2',
						label: '农村',
					},
				],
				bmfsmList: [{
						value: '1',
						label: '线上',
					},
					{
						value: '2',
						label: '线下',
					},
				],
				num: 0,
				falId: 0,
				specId: 0,
				provinceId: 0,
				cityId: 0,
				countyId: 0,
				joinOrChangeStuType: '',
				joinOrChangeStuShow: false,
				joinNotEite: false
			}
		},
		methods: {
			// 验证单个字段的函数
			validateField(fieldName, fieldValue, rules) {
				let errorMessage = null;

				// 遍历规则数组并应用每个规则
				for (const rule of rules) {
					if (typeof rule === 'function') {
						// 如果规则是一个函数，则调用它并检查返回值
						const result = rule(fieldValue);
						if (result !== true) {
							// 如果规则验证失败，则设置错误消息
							errorMessage = result || '输入无效';
							break;
						}
					} else if (typeof rule === 'object' && rule.test) {
						// 如果规则是一个正则表达式对象，则测试字段值
						if (!rule.test(fieldValue)) {
							errorMessage = rule.message || '输入格式不正确';
							break;
						}
					}
				}
				// 设置或清除错误消息
				this.$set(this.errors, fieldName, errorMessage);
			},
			async judesType(type, id) {
				this.joinOrChangeStuType = type
				this.joinOrChangeStuShow = true
				this.getaddFaculty()
				this.getXuzhi()
				this.clearReplay()
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
				// 判断是否是添加或修改
				if (type !== 'add') {
					// console.log(type,'type')
					// 不是添加流程进入 修改 
					// 根据方法获取id
					// setTimeout(()=>{
					await this.getStuMsg(id)
					// },500)
				} else {
					this.$refs.boxCitySelect.clearArea()
					this.$refs.boxCitySelectCsdsz.clearArea()
					this.$refs.boxCitySelectJgsz.clearArea()
					this.$refs.boxCitySelectSheng.clearArea()
					
					this.ApplyObj = {
					xbm: 1,
					sfdb: 1,
					jdfs: 1,
					zslx: 1,
					sfsldrk:1,
					sfkns:1,
					provinceId: '',
					cityId: '',
					countyId: '',
					specId: '',
					bjId:'',
					yxmc: '',
					zymc: '',
					province: '',
					city: '',
					county: '',
					zzmmm:'',
					mzm:''
				},
					this.num = 0
					this.clearReplay()
					this.joinNotEite = false
				}
				this.joinOrChangeStuType = type
			},
			// 修改操作前,获取到用户信息
			getStuMsg(id) {
				// /common/veBase/getStudentListById?id=20398
				axios({
						url: '/common/veBase/getStudentListById',
						method: 'get',
						params: {
							id: id
						},
					})
					.then((res) => {
						console.log(res)
						if (res.code == 200) {
							var msg = res.result
							msg.zzmmm = msg.zzmmm
							msg.mzm = msg.mzm
							msg.sfsldrk = msg.sfsldrk
							this.ApplyObj = JSON.parse(JSON.stringify(msg))
							this.ApplyObj.specId = this.ApplyObj.spec_id;
							this.ApplyObj.bjId = this.ApplyObj.bj_id;
							this.ApplyObj.falId = this.ApplyObj.fal_id;
							this.ApplyObj.provinceId = this.ApplyObj.province_id;
							this.ApplyObj.cityId = this.ApplyObj.city_id;
							this.ApplyObj.countyId = this.ApplyObj.county_id;
							this.ApplyObj.shengId =this.ApplyObj.sheng_id;
							this.ApplyObj.shiId = this.ApplyObj.shi_id;
							this.ApplyObj.quId = this.ApplyObj.qu_id;
							this.$refs.boxCitySelect.setValue(this.ApplyObj);
							this.$refs.boxCitySelectJgsz.setValue(this.ApplyObj);
							this.$refs.boxCitySelectCsdsz.setValue(this.ApplyObj);
							this.$refs.boxCitySelectSheng.setValue(this.ApplyObj);
							if(this.ApplyObj.falId!=''){
								this.getFacultyByfalId();
							}
							if(this.ApplyObj.specId){
								this.getbjIdListBySpecId();
							}
							if (this.joinOrChangeStuType == 'see') {
								this.joinNotEite = true
							} else {
								this.joinNotEite = false
							}
						}
					})
					.catch((err) => {
						console.log(err,'？？？？？？？？？')
					})
			},
			//添加
			tip() {
				const fields = [{
						name: 'xh',
						rules: [this.validation.requiredRule]
					},
					{
						name: 'xm',
						rules: [this.validation.requiredRule]
					}, {
						name: 'sfzh',
						rules: [this.validation.requiredRule]
					}, {
						name: 'falId',
						rules: [this.validation.requiredRuleByArr]
					},
					{
						name: 'specId',
						rules: [this.validation.requiredRuleByArr]
					}, {
						name: 'bjId',
						rules: [this.validation.requiredRule]
					}, {
						name: 'xz',
						rules: [this.validation.requiredRule]
					},
					{
						name: 'jtdz',
						rules: [this.validation.requiredRule]
					},

					{
						name: 'jtlxdh',
						rules: [this.validation.requiredRule, this.validation.iphoneRule]
					}
					// 更多字段和规则
				];

				// 执行字段验证
				this.errors = this.validation.validateFields(fields, this.ApplyObj);
				console.log(this.errors,'this.errors??????')
				// 检查是否有错误
				if (Object.values(this.errors).every(error => error === null)) {
					if (this.joinNotEite) {
						this.cancel()
						return
					}
					let xz = this.ApplyObj.xz

					this.num = 1
					//获取院校名称
					for (let addfaculty of this.addfaculty) {
						if (addfaculty.value == this.ApplyObj.falId) {
							this.ApplyObj.yxmc = addfaculty.label
						}
					}
					//获取专业名称
					for (let addspecialty of this.addspecialty) {
						if (addspecialty.value == this.ApplyObj.specId) {
							this.ApplyObj.zymc = addspecialty.label
						}
					}
					if (this.ApplyObj.zymc == '') {
						this.$message.warning('请填完专业相关信息')
						return
					}
					


					let xm = this.ApplyObj.xm
					let sfzh = this.ApplyObj.sfzh
					let jtdz = this.ApplyObj.jtdz
					let jtlxdh = this.ApplyObj.jtlxdh

					if (
						xm == '' ||
						xm == undefined ||
						sfzh == '' ||
						sfzh == undefined ||
						xz == '' ||
						jtdz == '' ||
						jtdz == undefined ||
						jtlxdh == undefined ||
						jtlxdh == ''
					) {
						this.$message.warning('请填完必填项')
						return
					} else {
						//出生日期格式修改
						if (!this.ApplyObj.csrqName) {
							this.ApplyObj.csrqName == ''
						} else {
							let d = new Date(this.ApplyObj.csrqName)
							let youWant = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
							this.ApplyObj.csrqName = youWant;
							if(this.ApplyObj.csrqName.includes('1970')){
								this.ApplyObj.csrqName == ''
							}
						}
						//入学年月格式修改
						if (this.ApplyObj.rxnyName == '' || this.ApplyObj.rxnyName == undefined) {
							this.ApplyObj.rxnyName == ''
						} else {
							let d = new Date(this.ApplyObj.rxnyName)
							let youWant = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
							this.ApplyObj.rxnyName = youWant
						}
						
						//入学日期格式修改
						if (this.ApplyObj.rxrqName == '' || this.ApplyObj.rxrqName == undefined) {
							this.ApplyObj.rxrqName == ''
						} else {
							let d = new Date(this.ApplyObj.rxrqName)
							let youWant = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
							this.ApplyObj.rxrqName = youWant
						}
						// console.log(this.ApplyObj)
						if (this.joinOrChangeStuType == 'add') {
							this.$refs.boxCitySelect.getSetValue(this.ApplyObj);
							this.$refs.boxCitySelectJgsz.getSetValue(this.ApplyObj);
							this.$refs.boxCitySelectCsdsz.getSetValue(this.ApplyObj);
							this.$refs.boxCitySelectSheng.getSetValue(this.ApplyObj);
							console.log(this.ApplyObj);
							axios({
									url: '/common/veCommon/addStudent',
									method: 'post',
									data: this.ApplyObj,

								})
								.then((res) => {
									if (res.code == 200) {
										this.$message.success(res.message);
										this.$emit("JoinOrchangeStuSuss", this.joinOrChangeStuType)
										this.cancel();
										return;
									} else {
										this.$message.warning(res.message);
									}
									// this.$message.warning(res.message);


								})
								.catch((err) => {
									this.$message.warning("添加失败！");
								})

						} else {
							this.ApplyObj.sfkns = this.ApplyObj.sfkns == true ? 1 : 0
							this.ApplyObj.updateStatus = this.ApplyObj.updateStatus == true ? 1 : 0
							this.$refs.boxCitySelect.getSetValue(this.ApplyObj);
							this.$refs.boxCitySelectJgsz.getSetValue(this.ApplyObj);
							this.$refs.boxCitySelectCsdsz.getSetValue(this.ApplyObj);
							this.$refs.boxCitySelectSheng.getSetValue(this.ApplyObj);
							console.log(this.ApplyObj);
							axios({
									url: '/common/veBase/editStudent',
									method: 'post',
									data: this.ApplyObj,

								})
								.then((res) => {
									if (res.code == 200) {
										this.$message.success(res.message);
										this.$emit("JoinOrchangeStuSuss", this.joinOrChangeStuType)
										this.cancel();
										return;
									} else {
										this.$message.warning(res.message);
									}
									// this.$message.warning(res.message);


								})
								.catch((err) => {
									this.$message.warning("添加失败！");
								})
						}
					}
				}

			},

			//取消按钮
			cancel() {
				this.ApplyObj = {
					xbm: 1,
					sfdb: 1,
					jdfs: 1,
					zslx: 1,
					countyId: '',
					specId: '',

				}
				this.num = 0
				this.clearReplay()
				this.joinOrChangeStuShow = false
			},
			//数据校验环节
			//校验不为空
			nameBule() {
				let xm = this.ApplyObj.xm;
				if (xm != undefined && xm.length > 0) {} else {
					this.$message.warning('姓名不能为空')
					this.num = 1
				}
				this.oldNameBule()
			},
			//校验地址不为空
			adressCheck() {
				let jtdz = this.ApplyObj.jtdz
				if (jtdz != undefined && jtdz.length > 0) {} else {
					this.$message.warning('详细地址很重要，请详细填写')
					this.num = 1
				}
			},
			//曾用名校验
			oldNameBule() {
				let xm = this.ApplyObj.xm
				let cym = this.ApplyObj.cym

				if (cym != undefined && cym.length > 0 && xm != undefined && xm.length > 0 && xm == cym) {
					this.$message.warning('曾用名不能和姓名一致')
					//清空曾用名
					this.ApplyObj.cym = ''
				}
			},
			// 验证是否是邮箱
			email() {
				let dzxx = this.ApplyObj.dzxx
				let emailRule = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
				if (!emailRule.test(dzxx) && dzxx != undefined) {
					this.$message.warning('请输入正确的邮箱地址')
					//清空邮箱
					this.ApplyObj.dzxx = ''
				}
			},
			// 验证是否是手机号码
			phone() {
				let jtlxdh = this.ApplyObj.jtlxdh
				let jstxh = this.ApplyObj.jstxh
				let xslxdh = this.ApplyObj.xslxdh
				let phoneRule = /^[1][3,4,5,7,8][0-9]{9}$/
				if (!phoneRule.test(jtlxdh) && jtlxdh != undefined) {
					this.$message.warning('请输入正确的手机号码')
					//清空手机号
					this.ApplyObj.jtlxdh = ''
					this.num = 1
				}
				if (!phoneRule.test(jstxh) && jstxh != undefined) {
					this.$message.warning('请输入正确的手机号码')
					//清空手机号
					this.ApplyObj.jstxh = ''
				}
				if (!phoneRule.test(xslxdh) && xslxdh != undefined) {
					this.$message.warning('请输入正确的手机号码')
					//清空手机号
					this.ApplyObj.xslxdh = ''
				}
			},
			// 验证是否是身份证
			idCheck() {
				let sfzh = this.ApplyObj.sfzh
				let idRule = /^(?:\d{15}|\d{17}[\dXx])$/;
				if (!idRule.test(sfzh) && sfzh != undefined) {
					this.$message.warning('请输入正确的身份证号')
					//清空身份证
					this.ApplyObj.sfzh = ''
					this.num = 1
				}
			},
			// 验证邮政编码
			checkCode() {
				let jtyb = this.ApplyObj.jtyb
				let codeRule = /^[1-9][0-9]{5}$/
				if (!codeRule.test(jtyb) && jtyb != undefined) {
					this.$message.warning('请输入正确的邮政编码')
					//清除邮政编码
					this.ApplyObj.jtyb = ''
				}
			},
			// 验证成绩
			numCheck() {
				let kszf = this.ApplyObj.kszf
				let numRule = /^[+-]?(0|([1-9]\d*))(\.\d{1})?$/
				if (!numRule.test(kszf) && kszf != undefined) {
					this.$message.warning('请输入正确的考试分数（仅一位小数）')
					//清除成绩
					this.ApplyObj.kszf = ''
					return
				}
				if (!(kszf > 0 && kszf <= 750)) {
					this.$message.warning('考试分数在0-750之间')
					//清除成绩
					this.ApplyObj.kszf = ''
				}
			},

			//清除专业下拉框
			clearReplay() {
				this.ApplyObj.falId = []
				this.ApplyObj.specId = []
				this.addspecialty = []
			},
			//获取专业部
			getaddFaculty() {
				this.addfaculty = []
				axios({
						url: '/common/veBase/getFacultyPageList?pageNo=1&pageSize=100',
						method: 'get',
						params: {},
					})
					.then((res) => {
						for (let addfaculty of res.result.list) {
							this.addfaculty.push({
								value: addfaculty.id,
								label: addfaculty.yxmc,
							})
							console.log("this.ApplyObj.falId----",this.ApplyObj.falId)
						}
					})
					.catch((err) => {
						
					})
			},
			//获取联动专业
			addfacultyChange(value) {
				if (value.length == 0) {
					return
				}
				this.getFacultyByfalId();
				
			},
			getFacultyByfalId(){
				this.addspecialty = []
				axios({
						url: '/common/veCommon/querySpecialtyListByFalId',
						method: 'get',
						params: {
							falId: this.ApplyObj.falId,
							pageNo: 1,
							pageSize: 100,
							interfaceUserId: '09d5e1e7f9b049008eee645c783a1d66'
						},
					})
					.then((res) => {
						for (let addspecialty of res.result) {
							this.addspecialty.push({
								value: addspecialty.id,
								label: addspecialty.zymc,
							})
						}
					})
					.catch((err) => {
						
					})
			},
			//联动获取班级
			getbjIdList(value) {
				this.bjIdList = []

				if (value.length == 0) {
					return
				}
				this.getbjIdListBySpecId();
				
			},
			getbjIdListBySpecId(){
				axios({
						url: '/common/veCommon/queryBanJiListBySpecId',
						method: 'get',
						params: {
							specId: this.ApplyObj.specId,
							pageNo: 1,
							pageSize: 100,
							interfaceUserId: '09d5e1e7f9b049008eee645c783a1d66'
						},
					})
					.then((res) => {
						this.bjIdList.splice(0, this.bjIdList.length)
						for (let bjIdList of res.result) {
							this.bjIdList.push({
								value: bjIdList.id,
								label: bjIdList.xzbmc,
							})
						}
					})
					.catch((err) => {
				
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
						console.log("身份类型",res.result)
						for (let politic of res.result) {
							
							this.sfzlxList.push({
								value: politic.code,
								label: politic.title,
							})
						}
					})
					.catch((err) => {
						
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
						
					})
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
						
					})
			},
		},
	}
</script>

<style>

</style>