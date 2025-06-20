<!-- 
	This is the main page of the application, the layout component is used here,
	and the router-view is passed to it.
	Layout component is dynamically declared based on the layout for each route,
	specified in routes list router/index.js .
 -->

<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>

</script>
 
<style>
	#app {
		height: 100%;
	}

	.content-head {
		margin-bottom: 10px;
	}

	.constbox {
		padding: 15px;
	}

	.icon-divide {
		position: relative;
		left: -10px;
		width: 30px;
	}
	.ant-select-selection--single {
		width: 150px;
	}
	.table-operator {
		margin: 10px 0;
	}

	.ant-table-thead>tr>th {
		background: #66c3fd !important;
		color: #fff !important;
		font-size: 14px !important;
	}
	
	.nonull-tip {
		height: 19px;
		display:inline-block;
		/* font-weight: 700; */
		color: #ff0000;
		font-size: 12px !important;
		line-height: 24px;
	}
	
	.condition{
		margin-right: 10px;
	}
	.condition-input{
		margin-right: 10px;
	}
</style>