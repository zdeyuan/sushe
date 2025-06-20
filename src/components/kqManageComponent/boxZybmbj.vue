<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-03-05 14:28:25
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-07-20 23:06:35
-->
<template>
	<span :class="line ? 'line-box' : ''">
		<template v-if="showZybAndnj">
			<template v-if="nianji">
				<span :class="cls2 ? 'titleq' : 'title'">年级:</span>
				<a-select :disabled="disabled" v-model="njId" :style="{ width: width }" placeholder="请选择年级"
					@change="onNianji">
					<a-select-option v-for="item in nainjiList" :key="item.id" :value="item.id">
						{{ item.njmc }}
					</a-select-option>
				</a-select>
				<div v-if="line" class="line"></div>
				<span class="noh" v-if="!njbj" :class="cls2 ? 'titleq' : 'title'">专业部:</span>
			</template>
			<span v-if="showZybTitle" :class="cls2 ? 'titleq' : 'title'">专业部:</span>
			<template v-if="!njbj">
				<a-select :disabled="disabled" ref="zybSelect" v-model="falId" :style="{ width: width }"
					placeholder="请选择院系" @change="onYx">
					<a-select-option v-for="item in yuanxiList" :key="item.id" :value="item.id">
						{{ item.yxmc }}
					</a-select-option>
				</a-select>
				<div v-if="line" class="line"></div>
				<span style="display: inline-block;">
					<span class="noh" :class="cls2 ? 'titleq' : 'title'">专业:</span>
					<span style="display: inline-block;">
						<edu-tree-select ref="eduTree" ab :width="width" :check="false" :nodes="zyList"
							@onChange="changeZy"></edu-tree-select>
					</span>
				</span>
			</template>
			<div v-if="line" class="line"></div>
		</template>
		<template v-if="banji">
			<span style="display: inline-block;">
				<span class="noh" :class="cls2 ? 'titleq' : 'title'">班级:</span>
				<a-select :disabled="disabled" v-model="bjId" :style="{ width: width }" @change="changeBj"
					placeholder="请选择班级">
					<a-select-option v-for="item in banjiList" :key="item.id" :value="item.id">
						{{ item.xzbmc }}
					</a-select-option>
				</a-select>
			</span>
		</template>
	</span>
</template>

<script>
	export default {
		props: {
			width: {
				type: String,
				default: '150px'
			},
			ofalId: {
				type: String,
				default: ''
			},
			ospecId: {
				type: String,
				default: ''
			},
			disabled: {
				type: Boolean,
				default: false
			},
			line: {
				type: Boolean,
				default: false
			},
			cls2: {
				type: Boolean,
				default: false
			},
			banji: {
				// 是否显示年级
				type: Boolean,
				default: true
			},
			nianji: {
				// 是否显示年级
				type: Boolean,
				default: false
			},
			nianjiToBj: {
				//年级和 班级级联查询
				type: Boolean,
				default: false
			},
			showZybAndnj: {
				//年级、专业部、专业是否显示
				type: Boolean,
				default: true
			},
			showZybTitle: {
				//年级和 班级级联查询
				type: Boolean,
				default: false
			},
			njbj: {
				//只显示年级和班级
				type: Boolean,
				default: false
			}
		},
		data() {
			const data = {
				yuanxiList: [],
				nainjiList: [],
				zyList: [],
				banjiList: [],
				njId: null,
				falId: null,
				bjId: null
			};

			return data;
		},

		mounted() {
			if (this.nianji) {
				this.initNj();
			}
			this.initYx();
		},
		methods: {
			getCheck() {
				const arr = [];
				if (this.nianji) {
					if (!this.njId) {
						arr.push('年级');
					}
				}
				if (this.$refs.zybSelect) {
					if (!this.falId) {
						arr.push('专业部');
					}
				}
				if (this.$refs.eduTree) {
					const zyList = this.$refs.eduTree.getValue();
					if (!zyList || zyList.length == 0) {
						arr.push('专业');
					}
				}
				if (!this.bjId) {
					arr.push('班级');
				}
				if (arr.length > 0) {
					return `请选择 ${arr.join('、')}`;
				}
				return '';
			},
			restValue() {
				if(this.showZybAndnj){
					this.$refs.eduTree.setValue([]);
					this.falId = '';
					this.specId = '';
					this.njId = '';
				}
				this.bjId = '';
				
			},

			setValue(data) {
					this.falId = data.falId;
					this.initZy(this.falId, () => {
						setTimeout(() => {
							this.$refs.eduTree.setValue([data.specId]);
						}, 500);
						this.initClas(data.specId, () => {
							this.bjId = data.bjId;
						});
					});
			},
			getSetValue(data, callback, config) {
				if(this.showZybAndnj){
					if (this.nianji) {
						data.njId = this.njId;
					}
					if (!config) {
						config = {
							fal: true,
							zy: true
						};
					}
					if (config.fal) {
						data.falId = this.falId;
						if(this.yuanxiList&&this.yuanxiList.length>0){
							this.yuanxiList.forEach(element => {
								if (element.id == this.falId) data.falText = element.yxmc;
							});
						}
						
					}
					
					if (config.zy) {
						const zyList = this.$refs.eduTree.getValueData();
						if (zyList && zyList.length > 0) {
							data.specId = zyList[0].id;
							data.specText = zyList[0].value;
						}
					}
					for (let i = 0; i < this.banjiList.length; i++) {
						const element = this.banjiList[i];
						if (element.id == this.bjId) {
							data.bjText = element.xzbmc;
							data.gradeId = element.gradeId;
							data.gradeText = element.njmc;
							if (callback) callback();
							/*     this.$http.get(this.$http.service.base + 'hqBaseGrade/queryById?id=' + data.gradeId, {}).then(res => {
							  data.gradeText = res.result.njmc;
							  if (callback) callback();
							}); */
						}
					}
				}
				
				data.bjId = this.bjId;

				
			},
			onNianji() {
				if (!this.nianjiToBj) {
					return;
				}
				this.bjId = '';
				setTimeout(() => {
					if (this.ospecId) {
						this.initClas(this.ospecId);
						return;
					}
					const data = this.$refs.eduTree.getValue();
					if (data && data.length > 0) {
						this.initClas(data[0]);
					}
				}, 100);
			},
			onYx() {
				this.bjId = '';
				setTimeout(() => {
					this.initZy(this.falId);
				}, 100);
			},
			changeBj() {
				this.$emit('changeBj');
			},
			changeZy() {
				const data = this.$refs.eduTree.getValue();
				if (data && data.length > 0) {
					this.initClas(data[0]);
				}
			},
			initClas(specid, callback) {
				this.bjId = '';
				const sub = {
					specId: specid
					/*      conditions: [
					  { operator: 'eq', column: 'status', value: 1 },
					  { operator: 'eq', column: 'specid', value: specid }
					] */
				};
				if (this.nianjiToBj && this.njId) {
					//  sub.conditions.push({ operator: 'eq', column: 'gradeid', value: this.njId });
				}
				this.$http.get(this.$http.service.base + 'veCommon/queryBanJiListBySpecId?interfaceUserId=' + this
					.$constant.commonApi, sub).then(res => {
					this.banjiList = res.result;
					if (callback) {
						setTimeout(() => {
							callback();
						}, 100);
					}
				});
			},
			initNj() {
				const sub = {
					conditions: [
						/* { operator: 'eq', column: 'status', value: 1 } */
					]
				};
				this.$http.get(this.$http.service.base + 'veCommon/queryGradeList?interfaceUserId=' + this.$constant
					.commonApi, sub).then(res => {
					this.nainjiList = res.result;
				});
			},
			initYx() {
				if(this.showZybAndnj){
					const sub = {
						//    conditions: [{ operator: 'eq', column: 'status', value: 1 }]
					};
					this.$http.get(this.$http.service.base + 'veCommon/queryFacultyList?interfaceUserId=' + this.$constant
						.commonApi, sub).then(res => {
						this.yuanxiList = res.result;
					});
				}else{
					this.$http.get('/stu/veBaseTeacher/teacherAllbanjin').then(res => {
						this.banjiList = res.result;
					});
				}
				
			},
			initZy(falId, callback) {
				const sub = {
					falId: falId
					/*   conditions: [
					  { operator: 'eq', column: 'status', value: 1 },
					  { operator: 'eq', column: 'falId', value: falId }
					] */
				};
				this.$http.get(this.$http.service.base + 'veCommon/querySpecialtyListByFalId?interfaceUserId=' + this
					.$constant.commonApi, sub).then(res => {
					res.result.forEach(element => {
						element.name = element.zymc;
					});
					this.zyList = res.result;
					if (callback) {
						setTimeout(() => {
							callback();
						}, 100);
					}
				});
			}
		}
	};
</script>
<style scoped>
	/* 单选间距 */
	.a-radio {
		margin-right: 10px;
	}

	.titleq {
		padding-right: 8px;
		display: inline-block;
		font-size: 14px;
		text-align: right;
		color: #666;
	}

	.titleq.noh {
		padding-left: 15px;
	}

	.title {
		display: inline-block;
		text-align: right;
		padding-right: 5px;
		min-width: 60px;
	}

	.line-box .titleq {
		min-width: 100px;
	}

	.line {
		height: 5px;
	}
</style>