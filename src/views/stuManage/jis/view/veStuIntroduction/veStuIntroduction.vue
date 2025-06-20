<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-04-21 22:59:32
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-05-02 10:08:24
-->
<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div class="mytable">
        <a-form-model-item label="自我介绍" prop="introduction">
          <a-textarea v-model="veStuIntroductionVo.introduction" :maxLength="300" placeholder="请输入自我介绍" :rows="6" />
        </a-form-model-item>
        <div class="form-footer">
          <a-button style="padding: 0 25px;margin-right: 15px;" type="primary" @click="updateData">
            保存
          </a-button>
        </div>
      </div>
      <!-- 编辑页 -->
    </div>
  </edu-layout>
</template>

<script>
export default {
  components: {},
  data() {
    const data = {
      veStuIntroductionVo: {
		  introduction:''
	  },
      showType: 'table',
	  type:''
    };
    return data;
  },
  mounted() {
	  this.getmsg()
  },
  methods: {
	getmsg(){
		this.$http.get('/stu/veStuIntroduction/getMyIntroduction').then((res)=>{
			console.log(res,'res???????')
			if(res.result == '查无自我介绍'){
				this.type = 'add'
			}else{
				this.type = 'change'
				console.log(res.result.introduction,'res.result.introduction?????')
				this.veStuIntroductionVo.introduction = res.result.introduction
				// this.$set(this.veStuIntroductionVo,'',res.result.introduction)
			}
		})
	},
    updateData() {
	 var data = {
		 
	 }	
     this.$http.post(this.type=='add'?'/stu/veStuIntroduction/add':'/stu/veStuIntroduction/edit',this.veStuIntroductionVo).then((res)=>{
		 console.log(res,'res????')
		 this.getmsg()
	 })
    }
  }
};
</script>
<style lang="less" scoped>
.form-footer {
  padding: 15px;
  text-align: center;
}
.mytable {
  padding: 15px 15%;
}
</style>
