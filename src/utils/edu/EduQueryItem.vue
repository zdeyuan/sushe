<template>
	<span class="query-box"
		:class="[hide ? 'heigh-query-box' : 'common-query-box', width == '100%' ? 'autoW' : 'contomW']">
		<span v-if="title" class="query-title">{{ title }}:</span>
		<!-- 输入框 -->
		<span v-if="stype === 'input'" class="query-content input">
			<a-input v-model="queryValue" :placeholder="placeholder ? placeholder : '请输入'" :pname="pname" :pop="pop"
				style="height:38px" :style="'width:' + width" @keyup.enter.native="onChange" @input="onInput"></a-input>
		</span>
		<!-- 下拉选择的 -->
		<span v-else-if="stype === 'select'" class="query-content select">
			<edu-data v-model="queryValue" :datas="datas" :stype="stype" :dtype="dtype" :id-key="idKey"
				:req-url="reqUrl" :req-params="reqParams" :req-method="reqMethod" :fitter-value="fitterValue"
				:fitter-name="fitterName" :text-key="textKey" :code="code" :class-fn="classFn" :pname="pname"
				:check="check" :disabled="disabled" :pop="pop" :width="width" @onChange="onChange">
			</edu-data>
		</span>
		<!-- radio -->
		<span v-else-if="stype === 'radio'" class="query-content radio" :class="extClass">
			<a-radio-group v-if="datas" v-model="queryValue" @change="onChange">
				<a-radio v-for="item in datas" :key="item.id" v-model="inputValue" :label="item[idKey]">
					{{ item[textKey] }}
				</a-radio>
			</a-radio-group>
			<edu-data v-else v-model="queryValue" :stype="stype" :dtype="dtype" :id-key="idKey" :code="code"
				:pname="pname" :pop="pop" :width="width" @onChange="onChange">
			</edu-data>
		</span>
		<!-- checkbox -->
		<span v-else-if="stype === 'checkbox'" class="query-content checkbox">
			<a-checkbox-group v-if="datas" v-model="queryValue" @change="onChange">
				<a-checkbox v-for="item in datas" :key="item.id" :label="item[idKey]"
					@click.native="clickData(item)">{{ item[textKey] }}</a-checkbox>
			</a-checkbox-group>
			<edu-data v-else v-model="queryValue" :stype="stype" :dtype="dtype" :id-key="idKey" :code="code"
				:pname="pname" :pop="pop" :width="width" @onChange="onChange">
			</edu-data>
		</span>
		<!-- date -->
		<span v-else-if="stype === 'date'" class="query-content date">
			<a-config-provider :locale="zh_CN">
				<a-date-picker v-model="queryValue" valueFormat="YYYY-MM-DD" />
			</a-config-provider>
		</span>
		<span v-else-if="stype === 'datetime'" class="query-content date">
			<a-config-provider :locale="zh_CN">
				<a-date-picker v-model="queryValue" type="datetime" :placeholder="placeholder ? placeholder : '选择日期'"
					:append-to-body="false">
				</a-date-picker>
			</a-config-provider>
		</span>
		<!-- date -->
		<span v-else-if="stype === 'datePicker'" class="query-content date-picker">
			<a-config-provider :locale="zh_CN">
				<a-date-picker v-model="queryValue" type="daterange" range-separator="至" start-placeholder="开始日期"
					end-placeholder="结束日期" :append-to-body="false" @change="onChange">
				</a-date-picker>
			</a-config-provider>
		</span>
		<!-- date -->
		<span v-else-if="stype === 'dateTimePicker'">
			<a-config-provider :locale="zh_CN">
				<a-date-picker v-model="queryValue" type="datetimerange" :picker-options="pickerOptions"
					range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" :append-to-body="false">
				</a-date-picker>
			</a-config-provider>
		</span>
		<!-- date -->
		<span v-else-if="stype === 'monthPicker'">
			<a-config-provider :locale="zh_CN">
				<a-date-picker v-model="queryValue" type="monthrange" range-separator="至" start-placeholder="开始月份"
					end-placeholder="结束月份" :append-to-body="false">
				</a-date-picker>
			</a-config-provider>
		</span>
		<!-- date -->
		<span v-else-if="stype === 'costom'" class="query-content costom">
			<slot></slot>
		</span>
	</span>
</template>

<script>
	import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
	export default {
		props: {
			hide: {
				type: Boolean,
				default: false
			},
			popperClass: {
				type: String,
				default: ''
			},
			placeholder: {
				type: String,
				default: ''
			},
			extClass: {
				type: String,
				default: ''
			},
			datas: {
				type: Array,
				default: null
			},
			title: {
				type: String,
				default: ''
			},
			pname: {
				type: String,
				default: null
			},
			pop: {
				type: String,
				default: null
			},
			/* 获取数据的方法 */
			valueMethod: {
				type: String,
				default: 'getValue'
			},
			width: {
				type: String,
				default: '100%'
			},
			fitterValue: {
				type: String,
				default: ''
			},
			fitterName: {
				type: String,
				default: ''
			},
			code: {
				type: String,
				default: ''
			},
			dtype: {
				type: String,
				default: 'constant'
			},
			stype: {
				type: String,
				default: 'costom'
			},
			classFn: {
				type: Function,
				default: null
			},
			idKey: {
				type: String,
				default: 'id'
			},
			disabled: {
				type: Boolean,
				default: false
			},
			textKey: {
				type: String,
				default: 'value'
			},
			check: {
				type: Boolean,
				default: false
			},
			reqUrl: {
				type: String,
				default: ''
			},
			reqParams: {
				type: Object,
				default: function() {
					return {};
				}
			},
			pickerOptions: {
				type: Object,
				default: null
			},
			reqMethod: {
				type: String,
				default: 'get'
			},
			defaultFn: {
				type: Function,
				default: null
			}
		},
		data() {
			const data = {
				zh_CN,
				queryValue: null
			};

			if (this.defaultFn) {
				data.queryValue = this.defaultFn();
			}
			return data;
		},

		computed: {},
		methods: {
			onInput(val) {
				this.$emit('onInput', val);
			},
			onChange(val) {
				this.$emit('onChange', val);
				setTimeout(() => {
					this.$parent.itemChange();
				}, 0);
			},
			getValue() {
				if (this.stype == 'datetime') {
					if (this.queryValue) {
						return this.$date.formatData(this.queryValue, 'YYYY-MM-DD HH:mm:ss');
					} else {
						return null;
					}
				}
				if (this.stype == 'date') {
					if (this.queryValue) {
						return this.queryValue;
					} else {
						return null;
					}
				}
				if (this.stype == 'datePicker') {
					if (this.queryValue && this.queryValue.length == 2) {
						return [this.$date.formatData(this.queryValue[0], 'YYYY-MM-DD'), this.$date.formatData(this
							.queryValue[1], 'YYYY-MM-DD')];
					} else {
						return null;
					}
				}
				if (this.stype == 'dateTimePicker') {
					if (this.queryValue && this.queryValue.length == 2) {
						return [this.$date.formatData(this.queryValue[0], 'YYYY-MM-DD HH:mm:ss'), this.$date.formatData(
							this.queryValue[1], 'YYYY-MM-DD HH:mm:ss')];
					} else {
						return null;
					}
				}
				if (this.stype == 'monthPicker') {
					if (this.queryValue && this.queryValue.length == 2) {
						return [this.$date.formatData(this.queryValue[0], 'YYYY-MM'), this.$date.formatData(this
							.queryValue[1], 'YYYY-MM')];
					} else {
						return null;
					}
				}
				if (this.queryValue instanceof Array) {
					if (this.queryValue.length == 0) {
						return null;
					}
					if (this.pop == 'in') {
						return this.queryValue.join(',');
					}
				}
				return this.queryValue;
			},
			restValue() {
				if (this.queryValue instanceof Array) {
					this.queryValue = [];
				} else {
					this.queryValue = null;
				}
			},
			setValue(val) {
				this.queryValue = val;
			}
		}
	};
</script>
<style lang="less" scoped>
	/deep/.a-input {
		.a-input__inner {
			height: 2.25rem !important;
		}
	}

	.query-box {
		display: inline-block;
		margin-bottom: 10px;
	}

	.query-content {
		display: inline-block;
		width: 150px;
	}

	.query-title {
		min-width: 70px;
		display: inline-block;
		padding-left: 5px;
		box-sizing: border-box;

	}
</style>