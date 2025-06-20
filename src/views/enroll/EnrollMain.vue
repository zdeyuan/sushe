<template>
	<a-config-provider :locale="locale">
		<div>
			<head-bar class="head"></head-bar>
			<left-bar class="left"></left-bar>
			<div class="right">
				<router-view></router-view>
			</div>
		</div>
	</a-config-provider>
</template>

<script>
	import headBar from '@/views/enroll/menu/headBar.vue'
	import leftBar from '@/views/enroll/menu/leftBar.vue'
	import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'

	export default {
		data() {
			return {
				locale: zhCN,
			}
		},
		components: {
			headBar,
			leftBar,
		},
	}
</script>

<style>
	.head {
		height: 79px;
	}

	.left {
		position: absolute;
		top: 79px;
		left: 0px;
		width: 300px;
	}

	.right {
		position: absolute;
		top: 80px;
		left: 320px;
		/* width: 1620px; */
	}

	.flex-content {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: flex-start;
	}

	.content-title {
		display: inline-block;
		padding: 18px;
		min-width: 150px;
		color: #666666;
		font-size: 20px;
		text-align: center;
		font-weight: bold;
		font-family: "microsoft yahei";
		border-bottom: 2px solid #878787;
		margin-right: 20px;
	}

	.not-title {
		color: #999999 !important;
		border-bottom: none !important;
	}


	.content-head {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: left;
		margin-top: 20px;
		justify-content: space-between;
	}
	
	.content-head-type2 {
		margin: 10px 0;
		
	}
	.content-head-type2 div{
		margin: 10px 0;
	}

	.pageContentBox {
		padding: 0 30px;
		background: white;
	}

	.headTop {
		/* padding: 19px 35px; */
		padding: 20px 20px 18px 20px;
		color: #999999;
		font-size: 20px;
		font-weight: 700;
		font-family: Microsoft YaHei;
	}

	.notTop {
		width: 126px;
		height: 20px;
		font-size: 20px;
		font-family: Microsoft YaHei;
		font-weight: 700;
		color: #666666;
	}

	.right-hr {
		/* width: 1400px; */
		width:76vw;
		height: 2px;
		margin-top: 2px;
		background: #3779ca;
		opacity: 0.4;
	}

	.ant-card-head-title {
		font-size: 20px;
		font-weight: 700;
		color: #a9a9a9;
	}

	.content-button {
		width: 125px;
		height: 34px;
		background: #00bad0;
		border-radius: 5px;
	}

	.clear-button {
		width: 88px;
		height: 34px;
		background: #0098f8;
		border-radius: 5px;
	}

	.search-report-button {
		width: 207px;
		height: 34px;
		background: #00bad0;
		border-radius: 5px;
	}

	.search-button {
		width: 88px;
		height: 34px;
		margin-right: 20px;
		margin-left: 10px;
		background: #028be2;
		border-radius: 5px;
	}

	.empty-button {
		width: 88px;
		height: 34px;
		background: #fc8950;
		border-radius: 5px;
	}

	.delete-button {
		width: 88px;
		height: 34px;
		background: #0098f8;
		border-radius: 5px;
	}

	.refresh-button {
		width: 88px;
		height: 34px;
		background: #66c3fd;
		border-radius: 5px;
	}

	.search-button,
	.search-button:hover,
	.search-button:active,
	.search-button:focus {
		color: white;
		background: #028be2;
	}

	.empty-button,
	.empty-button:hover,
	.empty-button:active,
	.empty-button:focus {
		color: white;
		background: #fc8950;
	}

	.content-button,
	.content-button:hover,
	.content-button:active,
	.content-button:focus,
	.search-report-button,
	.search-report-button:hover,
	.search-report-button:active,
	.search-report-button:focus {
		color: white;
		background-color: #00bad0;
	}

	.refresh-button,
	.refresh-button:hover,
	.refresh-button:active,
	.refresh-button:focus {
		color: white;
		background-color: #66c3fd;
	}

	.clear-button,
	.clear-button:hover,
	.clear-button:active,
	.clear-button:focus,
	.delete-button,
	.delete-button:hover,
	.delete-button:active,
	.delete-button:focus {
		color: white;
		background-color: #0098f8;
	}

	.ant-input {
		width: 140px;
		height: 24px;
	}

	.ant-table-content {
		margin-top: 20px;
	}

	.ant-table-thead tr th {
		background-color: #66c3fd;
	}

	.ant-table-column-title {
		color: white;
		font-size: 18px !important;
		font-family: "MicrosoftYaHei";
		/* font-weight: 700; */
	}

	.ant-input .ant-table-tbody tr td {
		color: #999999;
		font-size: 16px;
		height: 16px;
		font-family: 'Adobe Heiti Std';
		font-weight: 400;
	}

	.ant-card-body {
		min-height: 700px;
	}

	.ant-modal-header {
		background-color: #028be2;
	}

	.ant-modal-title {
		color: white;
		font-weight: 700;
	}

	.ant-pagination-total-text {
		position: absolute;
		left: 20px;
		font-family: 'Adobe Heiti Std R';
		font-size: 14px;
		font-weight: 400;
		color: #999999;
	}

	.button-after {
		margin-left: 10px;
	}

	.condition {
		width: 203px;
		height: 34px;
		margin-right: 20px;
		background: rgba(255, 255, 255, 0);
		border: 1px solid rgba(217, 237, 244);
		border-radius: 3px;
	}

	.condition span,
	.condition input {
		width: 203px;
		height: 34px;
		background: rgba(255, 255, 255, 0);
		border: 1px solid rgba(217, 237, 244, 0.1);
		border-radius: 3px;
	}

	.condition-input {
		width: 176px;
		height: 34px;
		background: rgba(255, 255, 255, 0);
		border: 1px solid rgba(217, 237, 244);
		border-radius: 3px;
	}

	.select {
		width: 91px;
	}

	.before-btn {
		margin-left: 905px;
	}

	.single,
	.double,
	.long {
		border: 1px solid #e5e5e5;
		height: 30px;
		font-size: 12px;
		font-family: '宋体';
	}

	.scanTable {
		margin: 5px auto;
	}

	.scanInput {
		width: 300px;
		border: 1px solid #e5e5e5;
		height: 30px;
	}

	.scanInput input {
		height: 30px;
	}

	.small {
		width: 150px;
		height: 30px;
	}

	.small input {
		height: 30px;
	}

	.single {
		background-color: #f5f5f5;
		width: 130px;
		margin-right: 30px;
		text-align: right;
	}

	.double {
		background-color: white;
		width: 230px;
	}

	.long {
		background-color: white;
		width: 635px;
	}

	.scanInput {
		width: 300px;
	}

	.spanRed {
		color: red;
		margin: 0 5px;
		line-height: 25px;
	}

	.single div {
		width: 100px;
	}

	.none {
		border-left: 0;
		border-right: 0;
	}

	.ant-modal-footer {
		text-align: center;
		/* padding-top: 20px; */
		border-top: 0px solid #e8e8e8;
		padding-top: 0px;
		padding-bottom: 20px;
	}

	.head-span {
		margin-right: 20px;
		height: 18px;
		font-size: 18px;
		font-weight: 400;
		font-family: 'MicrosoftYaHei';
		line-height: 24px;
		text-align: right;
	}

	.ant-table-column-title {
		font-size: 20px;
	}

	/*  .ant-table-pagination {
    position: absolute;
    bottom: 100px;
  } */

	.ant-pagination-item {
		width: 50px;
		height: 36px;
		border: 1px solid #f5f7fe;
		border-radius: 0px;
	}

	.ant-pagination-prev,
	.ant-pagination-item-link,
	.ant-pagination-next {
		width: 50px;
		height: 36px;
		border: 0px !important;
		border-radius: 0px;
	}

	.anticon-left,
	.anticon-right {
		color: #0098f8;
	}

	.ant-pagination-item a {
		font-size: 14px;
	}

	.ant-pagination-item:hover,
	.ant-pagination-item:focus,
	.ant-pagination-item:active {
		background-color: #0098f8;
	}

	.ant-pagination-item:hover a,
	.ant-pagination-item:focus a,
	.ant-pagination-item:active a {
		color: white;
	}

	.button-pink,
	.button-pink:hover,
	.button-pink:active,
	.button-pink:focus {
		color: white;
		background-color: #f56c6c;
	}

	.ant-table-tbody a {
		margin: 0 10px;
	}

	.ant-menu-inline {
		border: 0;
	}

	.ant-message-custom-content {
		font-size: 16px;
	}

	/* 提示弹窗样式 */
	.icon-delete {
		width: 15px;
		height: 17px;
		margin-right: 8px;
		margin-bottom: 3px;
	}

	.icon-position {
		width: 16px;
		height: 16px;
		margin-right: 8px;
		margin-bottom: 3px;
	}

	.icon-divide {
		width: 25px;
		height: 25px;
		margin-left: -8px;
	}

	.delete-modal {
		width: 478px;
		height: 318px;
	}

	.delete-img-bg {
		width: 71px;
		height: 71px;
		background: linear-gradient(180deg, rgba(255, 99, 103, 0.99), rgba(254, 172, 136, 0.99));
		border-radius: 50%;
		margin: 10px auto;
	}

	.delete-img {
		margin-left: 16px;
		margin-top: 16px;
	}

	.delete-text {
		width: 123px;
		height: 19px;
		font-size: 18px;
		font-family: Microsoft YaHei;
		font-weight: 700;
		color: #666666;
		line-height: 24px;
		margin-top: 20px;
		margin-left: 160px;
	}

	.img-bg {
		width: 71px;
		height: 71px;
		background: linear-gradient(180deg, rgba(0, 186, 208, 0.99), rgba(0, 208, 157, 0.99));
		border-radius: 50%;
		margin: 10px auto;
	}

	.qrcode-img-bg {
		width: 71px;
		height: 71px;
		background: linear-gradient(180deg, rgba(0, 152, 248, 0.99), rgba(102, 195, 253, 0.99));
		border-radius: 50%;
		margin: 10px auto;
	}

	.duihao-img {
		width: 39px;
		height: 39px;
		margin-left: 16px;
		margin-top: 16px;
	}

	.report-text {
		width: 153px;
		height: 19px;
		font-size: 18px;
		font-family: Microsoft YaHei;
		font-weight: 700;
		color: #666666;
		line-height: 24px;
		margin-top: 20px;
		margin-left: 142px;
	}

	.report-search-text {
		height: 19px;
		font-size: 18px;
		font-family: Microsoft YaHei;
		font-weight: 700;
		color: #666666;
		line-height: 24px;
		margin-top: 20px;
		margin-left: 52px;
	}

	.divide-text {
		width: 288px;
		height: 19px;
		font-size: 18px;
		font-family: Microsoft YaHei;
		font-weight: 700;
		color: #666666;
		line-height: 24px;
		margin-top: 20px;
		margin-left: 76px;
	}

	.drop-text {
		width: 364px;
		height: 19px;
		font-size: 18px;
		font-family: Microsoft YaHei;
		font-weight: 700;
		color: #666666;
		line-height: 24px;
		margin-top: 20px;
		margin-left: 48px;
	}

	/* 编制学号按钮 */
	.create-button {
		width: 135px;
		height: 34px;
		background: #00bad0;
		border-radius: 5px;
	}

	.create-button,
	.create-button:hover,
	.create-button:active,
	.create-button:focus {
		color: white;
		background-color: #00bad0;
	}

	.search-create-button {
		width: 215px;
		height: 34px;
		background: #00bad0;
		border-radius: 5px;
		margin-right: 20px;
	}

	.search-create-button,
	.search-create-button:hover,
	.search-create-button:active,
	.search-create-button:focus {
		color: white;
		background-color: #00bad0;
	}

	/* 打印预览样式 */
	.print-preview {
		width: 73px;
		height: 20px;
		font-size: 16px;
		font-family: Adobe Heiti Std;
		text-decoration: underline;
		color: #00d09d;
	}

	/* 查看大弹窗 */
	/* 标题样式 */
	.title-style {
		width: 76px;
		height: 19px;
		font-size: 18px;
		font-family: Microsoft YaHei;
		font-weight: 700;
		margin-left: 23px;
		color: #ffffff;
		line-height: 24px;
	}

	/* 字体样式1 */

	/* 表行高样式 */
	.tr-style {
		height: 49px;
		border: 1px solid #dee2e6;
	}

	/* 行颜色 */
	.tr-color {
		height: 40px;
		background: #66c3fd;
	}

	.input-style {
		width: 237px;
		height: 34px;
		width: 100%;
		height: 100%;
		background: #ffffff;
		border: 1px solid #fafafa;
		border-radius: 3px;
		font-size: 18px;
	}

	/* 表列宽度 */
	.td-div {
		width: 259px;
		background: #f8f8f9;
	}


	.btn-cancle {
		width: 100px;
		height: 40px;
		background: #999999;
		border-color: #999999;
		border-radius: 3px;
		font-size: 18px;
		font-family: Microsoft YaHei;
		margin-left: 10px;
		color: #ffffff;
	}

	.input-style-print {
		width: 237px;
		height: 34px;
		width: 100%;
		height: 100%;
		background: #ffffff;
		border: 1px solid #ffffff;
		border-radius: 3px;
		font-size: 18px;
	}

	/* 报名添加、编辑页面的清除按钮 */
	.tableClean-button {
		width: 88px;
		height: 34px;
		margin-right: 0px;
		margin-left: 10px;
		background: #028be2;
		border-radius: 5px;
	}

	.btn,
	.btn:hover,
	.btn:active,
	.btn:focus {
		color: white;
		background: #028be2;
	}

	.tableClean-button,
	.tableClean-button:hover,
	.tableClean-button:active,
	.tableClean-button:focus {
		color: white;
		background: #028be2;
	}

	.btn-cancle,
	.btn-cancle:hover,
	.btn-cancle:active,
	.btn-cancle:focus {
		color: white;
		background: #999999;
		border-color: #999999;
	}

	.text-btn-color1 {
		color: #00bad0;
	}

	.text-btn-color2 {
		color: #00d09d;
	}

	.text-btn-color3 {
		color: #0098f8;
	}

	.text-btn-color4 {
		color: #fc8950;
	}

	.text-btn-color5 {
		color: #fc9d50;
	}
</style>
