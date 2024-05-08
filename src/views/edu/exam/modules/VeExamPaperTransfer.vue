<template>
      <a-transfer
        :data-source="questionData"
        show-search
        :list-style="{
          width: '250px',
          height: '300px',
        }"
        :operations="['选中题目', '取消选中']"
        :target-keys="targetKeys"
        :render="item => `【${item.score}】分-${item.question}`"
        @change="handleChange"
      >
        <span slot="notFoundContent">
          没数据
        </span>
      </a-transfer>
</template>
<script>
import {getExamQuestionListByType,saveExamPaperQuestion} from '@/api/exam.js'
export default {
  props: {
    // 问题类型id
    typeid: {
      type: Number,
      default: 1,
      required: false
    },
    // 问题类型id
    paperid: {
      type: String,
      default: '0',
      required: false
    }
  },
  data() {
    return {
      questionData: [],
      targetKeys: [],
      model: {},
    };
  },
  mounted() {
    this.getQuestionList();
  },
  methods: {
    getQuestionList() {
      const targetKeys = [];
      const questionData = [];
      const params = {
        typeid: this.typeid
      };
      getExamQuestionListByType(params).then((res)=>{
          const resultData = res.result
          for (let i = 0; i < resultData.length; i++){
              const item = resultData[i]
              const data = {
              key: item.id,
              question: item.question,
              score: item.score,
              chosen: false,
            };
            if (data.chosen) {
              targetKeys.push(data.key);
            }
            questionData.push(data);
           }
        })
      this.questionData = questionData;
      this.targetKeys = targetKeys;
    },
    handleChange(targetKeys, direction, moveKeys) {
      this.targetKeys = targetKeys;
    },
    submitForm(){
      const that = this;
      let questionIds = ``
      for (let i = 0; i < this.targetKeys.length; i++){
        questionIds += `${this.targetKeys[i]},`
      }
      const params = {
        paperid: this.paperid,
        questionIds: questionIds,
        listSort: this.typeid
      };
      saveExamPaperQuestion(params).then((res)=>{
        if(res.success){
          that.$message.success(res.message);
          that.$emit('ok');
        }else{
          that.$message.warning(res.message);
        }
      })
    }
  },
};
</script>
