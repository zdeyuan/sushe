<template>
	<a-config-provider :locale="zh_CN">
		<a-date-picker v-if="mode === 'date'" :showTime="showTimeConfig" :format="computedDisplayFormat"
			:value-format="computedDisplayFormat" :placeholder="placeholder" v-model="innerValue" v-bind="$attrs" />

		<a-date-picker v-else ref="picker" :mode="internalMode" :format="computedDisplayFormat"
			:value-format="computedDisplayFormat" :placeholder="placeholder" :value="innerMomentValue" v-bind="$attrs"
			:open="pickerOpen" @panelChange="handlePanelChange" @openChange="handleOpenChange" />
	</a-config-provider>
</template>

<script>
	import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
	import moment from 'moment';

	export default {
		name: 'DateTimePicker',
		props: {
			value: {
				type: [String, Date, Object],
				default: null
			},
			placeholder: {
				type: String,
				default: '请选择时间'
			},
			displayFormat: {
				type: String,
				default: 'YYYY-MM-DD',
				validator: (value) => ['YYYY-MM-DD', 'YYYY-MM-DD HH:mm:ss'].includes(value)
			},
			showTime: {
				type: [Boolean, Object],
				default: null
			},
			mode: {
				type: String,
				default: 'date',
				validator: (value) => ['date', 'month', 'year'].includes(value)
			}
		},
		data() {
			return {
				zh_CN,
				internalMode: this.mode,
				pickerOpen: false,
				tempValue: null
			}
		},
		computed: {
			computedDisplayFormat() {
				switch (this.mode) {
					case 'month':
						return 'YYYY-MM'
					case 'year':
						return 'YYYY'
					default:
						return this.displayFormat
				}
			},
			showTimeConfig() {
				if (this.showTime !== null) return this.showTime
				return this.mode === 'date' && this.displayFormat === 'YYYY-MM-DD HH:mm:ss' ?
					{
						format: 'HH:mm:ss'
					} :
					false
			},
			innerValue: {
				get() {
					return this.value
				},
				set(val) {
					this.$emit('input', val)
					this.$emit('change', val)
				}
			},
			innerMomentValue() {
				if (!this.value) return null;
				return moment(this.value, this.computedDisplayFormat);
			}
		},
		methods: {
			handlePanelChange(value, mode) {
				this.tempValue = value;

				// For year/month mode, close immediately after selection
				if (this.mode !== 'date') {
					this.pickerOpen = false;
					this.$nextTick(() => {
						this.innerValue = this.tempValue.format(this.computedDisplayFormat);
					});
					return;
				}

				// Only for date mode, update the internal mode
				this.internalMode = mode;
			},
			handleOpenChange(open) {
				this.pickerOpen = open;
				if (!open) {
					this.internalMode = this.mode;
				}
			}
		},
		watch: {
			mode(newVal) {
				this.internalMode = newVal;
			}
		}
	}
</script>