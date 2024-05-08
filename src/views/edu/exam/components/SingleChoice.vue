<template>
  <div>
    <a-row :gutter="[16,16]" :visible.sync="visible">
      <a-col :span="24">
        <p>{{no}}.[<span class="green">{{content.veExamQuestion.typeid | typeFilter}}</span>] {{content.veExamQuestion.score}}分</p>
      </a-col>
      <a-col :span="24">{{content.veExamQuestion.question}}</a-col>
      <a-col :span="24" v-if="content.veExamQuestion.typeid == 1 || content.veExamQuestion.typeid == 2">
        <p v-for="item in content.veExamQuestionOptionList" :key="item.id">
          {{item.options}}
          <span v-html="item.content">{{item.content}}</span>
        </p>
      </a-col>
      <a-col :span="24" v-if="content.veExamQuestion.typeid == 3">
        <p>正确</p>
        <p>错误</p>
      </a-col>
      <a-col :span="24" v-if="content.veExamQuestion.typeid == 5">
        <a-textarea></a-textarea>
      </a-col>
      <a-col :span="24" class="gray-backend">
        <span class="orange"><a-icon type="exclamation-circle" /></span>&nbsp;&nbsp;<span class="green">查看答案和解析</span>
      </a-col>
      <a-col :span="24">
        &nbsp;
      </a-col>
      <a-col :span="24" class="gray-backend"><input type="button" class="answer" value="答案"></a-col>
      <a-col :span="24" class="gray-backend">{{answer}}</a-col>
      <a-col :span="24" class="gray-backend"><input type="button" class="answer" value="解析"></a-col>
      <a-col :span="24" class="gray-backend">
        <div v-html="content.veExamQuestionAnswer.analysis"></div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { getExamQuestionById } from '@/api/exam.js'
export default {
  name: 'SingleChoice',
  props: {
    no: {
      type: Number | String
    },
    id: {
      type: Number | String
    }
  },
  created() {
    this.init()
  },
  data() {
    return {
      visible: false,
      content: {
        veExamQuestion:{},
        veExamQuestionAnswer:{},
        veExamQuestionOptionList:[]
      }
    }
  },
  methods: {
    init() {
      getExamQuestionById(this.id, {}).then(res => {
        this.content = res.result
        this.visible = true
      })
    }
  },
  filters: {
    typeFilter(type) {
      const typeMap = {
        1: '单选题',
        2: '多选题',
        3: '判断题',
        4: '填空题',
        5: '简答题'
      }
      return typeMap[type]
    }
  },
  computed:{
    answer:function(){
      if(this.content.veExamQuestion.typeid == 3){
        return this.content.veExamQuestionAnswer.answer == 1? '正确' : '错误'
      }
      else {
        return this.content.veExamQuestion.typeid
      }
    }
  }
}
</script>
<style scoped>
.green{
  color:#00D09E;
}
.orange{
  color:#F4B163;
}
.gray-backend{
  background-color:#EFEFEF;
}
.answer{
  width:50px;border:0px;border-radius:3px;background-color:#00D09E;color:white;
}
</style>