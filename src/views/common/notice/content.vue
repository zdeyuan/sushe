<template>
	<a-card>
	<div class="noticeInfo">
		<a-button type="primary" icon="arrow-left" @click="$router.go(-1);" style="margin-right:10px;">
			返回
		</a-button>
		<div class="header">
			<div class="title">
				<span class="text">{{noiceInfo.titile}}</span></div>
			<div class="info">
				<!-- <div >发布部门：阳光学院</div> -->
				<div >发布人：{{noiceInfo.sender}}</div>
				<div >发布时间：{{noiceInfo.sendTime}}</div>
				<div v-if="noiceInfo.endTime">有效期至：{{noiceInfo.sendTime}}至{{noiceInfo.endTime}}</div>
			</div>
		</div>
		<div class="content">
			<div class="text ql-editor" v-html="noiceInfo.msgContent">
			</div><!---->
		</div>
	</div>
	</a-card>
</template>
<script>
	import {
		axios
	} from '@/utils/request'
	import { annountCement,getCount }  from '@/api/index/index';
	import ueditor from '@/components/ueditor';
	export default {
		components: {
			ueditor
		},
		data() {
			return {
				lbUser: [{
						value: "01",
						label: "管理员"
					},
					{
						value: "11",
						label: "老师"
					},
					{
						value: "21",
						label: "学生"
					},
					{
						value: "31",
						label: "企业管理员"
					},
					{
						value: "41",
						label: "企业教师"
					},
				],
				ztUser: [{
						value: "1",
						label: "通知公告"
					},
					{
						value: "2",
						label: "系统消息"
					},
				],
				xbUser: [{
						value: "L",
						label: "低"
					},
					{
						value: "M",
						label: "中"
					},
					{
						value: "H",
						label: "高"
					},
				],
				jsUser: [{
						value: "L",
						label: "低"
					},
					{
						value: "M",
						label: "中"
					},
					{
						value: "H",
						label: "高"
					},
				],
				fzrUser: [],
				ApplyObj: {
					userPassword: '123456',
					status: 0
				}, //弹窗对象
				joinOrChangeStuShow: false,
				joinNotEite: false,
				joinOrChangeStuType: '',
				noiceInfo:{}
			}
		},
		created() {
			this.noiceInfo.id=this.$route.query.id;
			this.getInfo();
			this.setRead();
		},
		methods: {
			async setRead(){
				let res=await getCementById({id:this.$route.query.id});
			},
			getInfo(){
				this.$http.get('/sys/annountCement/queryById', {
					id:this.noiceInfo.id
				})
					.then(res => {
						if (res.code == 0) {
							this.noiceInfo=res.result;
						}
					})
					.catch(err => {
						this.$message.warning("获取学生管理信息失败");
					})
			}
		}
	}
</script>

<style scoped lang="less">
	.noticeInfo {
	  .header {
	    border-bottom: 1px dashed #b9b9b9;
	    padding-bottom: 10px;
	
	    .title {
	      text-align: center;
	      padding: 10px 0;
	      display: flex;
	      align-items: center;
	      justify-content: center;
	    }
	
	    .text {
	      font-size: 22px;
	      color: rgba(18, 28, 37, 0.85);
	      letter-spacing: 0.34px;
	    }
	
	    .info {
	      display: flex;
	      flex-direction: row;
		  justify-content: center;
	      div {
	        font-size: 14px;
			margin-right:20px;
	        color: rgba(18, 28, 37, 0.65);
	        letter-spacing: 0;
	      }
	    }
	  }
	
	  .content {
	    font-size: 16px;
	    color: rgba(18, 28, 37, 0.85);
	    letter-spacing: 0.28px;
	    line-height: 32px;
	    padding: 23px 0 48px 0;
	    height: calc(100% - 159px);
	    overflow-y: auto;
	
	    .downloadFile {
	      padding-bottom: 70px;
	
	      .title {
	        padding-bottom: 5px;
	        font-size: 14px;
	        color: rgba(18, 28, 37, 0.65);
	      }
	
	      .file {
	        font-size: 14px;
	        color: rgba(18, 28, 37, 0.85);
	        letter-spacing: 0.25px;
	        padding: 6px;
	
	        .fileName {
	          display: inline-block;
	          width: 300px;
	        }
	
	        .operate {
	          padding-left: 100px;
	        }
	      }
	    }
	  }
	}
	
	.ql-editor {
	  box-sizing: border-box;
	  line-height: 1.42;
	  height: 100%;
	  outline: none;
	  overflow-y: auto;
	  padding: 12px 15px;
	  tab-size: 4;
	  text-align: left;
	  white-space: pre-wrap;
	  word-wrap: break-word;
	}
</style>