<template>
	<div style="background:#E9EDF6; padding:30px">
		<div class="content-title">
			考勤设置
		</div>
		<div class="pageContentBox">
			<div class="headTop">住宿考勤 > <span class="notTop">考勤设置</span></div>
			<div class="content-head">
			</div>
			<div style="margin-left: 30px;">
				<span class="content-span"><span class="redSpan">*</span>晚归时间设置</span>
				<a-time-picker format="HH:mm:ss" v-model="stime" placeholder="起始时间" class="time-picker" />
				<span class="redSpan">(注:超过此时间后, 才可以将学生的考勤状态设置为晚归)</span>
			</div>
			<div style="margin-top: 20px;">
				<span class="content-span"><span class="redSpan">*</span>夜不归宿时间设置</span>
				<a-time-picker format="HH:mm:ss" v-model="etime" placeholder="起始时间" class="time-picker" />
				<span class="redSpan">(注:超过此时间后, 才可以将学生的考勤状态设置为夜不归宿)</span>
			</div>
			<a-button type="primary"  class="confirm" @click="setTime">提交</a-button>
		</div>
	</div>


</template>

<script>
	import moment from 'moment';
	import {
		axios
	} from '@/utils/request';
	export default {
		data() {
			return {
				stime: moment('11:30:00', 'HH:mm:ss'),
				etime: moment('12:30:00', 'HH:mm:ss'),
				sId: '',
				eId: '',
			};
		},
		mounted() {
			this.getDefaultTime();
		},
		methods: {
			formatTime(moment) {
				return moment.hour() + ':' + moment.minute() + ':' + moment.second();
			},
			getDefaultTime() {
				axios({
					url: 'dorm/checkRule/selectAllCheckType',
					method: 'post',
					params: {}
				}).then(res => {
					for (let type of res.result) {
						if (type.name == '晚归') {
							this.stime = moment(type.limitTime, 'HH:mm:ss');
							this.sId = type.id;
						} else if (type.name == '夜不归宿') {
							this.etime = moment(type.limitTime, 'HH:mm:ss');
							this.eId = type.id;
						}
					}
				}).catch(err => {
					this.$message.warning("获取晚归/夜不归宿时间失败");
				})
			},
			setTime() {
				axios({
					url: 'dorm/checkRule/setCheckTime',
					method: 'post',
					params: {
						wgID: this.sId,
						wgLimitTime: this.formatTime(this.stime),
						ybgsID: this.eId,
						ybgsLimitTime: this.formatTime(this.etime)
					}
				}).then(res => {
					this.$message.success(res.message);
					this.getDefaultTime();
				}).catch(err => {
					this.$message.warning("设置时间失败");
				})
			}
		},
	};
</script>

<style>
	.time-picker {
		margin: 0 5px;
	}

	.redSpan {
		margin: 0 5px;
		color: red;
		line-height: 16px;
	}

	.content-span {
		font-size: 16px;
	}

	.confirm {
		width: 140px;
		height:46px;
		margin-top: 20px;
		margin-left: 150px;
		background-color:#028be2;
		color:#ffffff;
		font-weight:bold;
		font-size: 22px;
	}
</style>
