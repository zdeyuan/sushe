<template>
  <div style="background:#ECECEC; padding:30px">
    <a-card :title="paper.name" :bordered="false" style="width: 100%">
      <a>试卷总分{{paper.scores}}</a> <a-divider type="vertical" />
      <a>{{bigQuestionCount}}大题</a> <a-divider type="vertical" />
      <a>{{questionCount}}小题</a> <a-divider type="vertical" />
      <a-divider dashed />
      <div>
        <div v-for="(bigPart,index) in bigParts" :key="index+1">
        <span style="font-size: 22px;">{{bigPart.listsort}}.{{bigPart.title}}</span>
<!--        <span v-for="(questionId,index) in bigPart.questionArr">{{questionId}}<br/></span>-->
        <SingleChoice v-for="(questionId,index) in bigPart.questionArr" :no="index+1" :id="questionId" :key="questionId"></SingleChoice>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
  import {getExamPaperQuestionCount,getPaperDetail} from '@/api/exam.js'
  import SingleChoice from '../components/SingleChoice'

export default {
  components: {
    SingleChoice
  },
  data() {
    return {
      text: `答案1`,
      text2: `答案2`,
      activeKey: ['1'],
      paper: {
        scores: 0,
      },
      bigParts: [],
      bigQuestionCount: 0,
      questionCount: 0
    };
  },
  mounted() {
  },
  methods: {
    initPaper(record) {
      this.paper = record
      let params = {
        id: this.paper.id
      }
      getExamPaperQuestionCount(params).then((res)=>{
        let resultData = res.result
        this.bigQuestionCount = resultData.bigQuestionCount
        this.questionCount = resultData.questionCount
      })

      getPaperDetail(params).then((res)=>{
        let resultData = res.result
        this.paper = resultData.paperInfo
        this.bigParts = resultData.bigParts
        for (let i = 0;i< this.bigParts.length;i++){
          let questionArr = this.bigParts[i].questionsIds.split(",");
          this.bigParts[i].questionArr = questionArr
        }

      })

    }
  },
  watch: {
    activeKey(key) {
      console.log(key);
    },
  },
};
</script>
