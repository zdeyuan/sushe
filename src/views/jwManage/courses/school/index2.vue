<template>
  <a-card :bordered="false">
    <table>
      <thead>
      <tr>
        <th v-for="(list,index) in listData">{{list.week}}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(sj,index) in sjData" v-if="index!=0&&index<7">
        <td>{{sj.id}}</td>
        <td>
          <input type="checkbox" :checked="sj.stae" @change="onChange(index)">
        </td>
        <td>
          <input type="checkbox" @change="onChange(index)">
        </td>
        <td>
          <input type="checkbox" @change="onChange(index)">
        </td>
        <td>
          <input type="checkbox" @change="onChange(index)">
        </td>
        <td>
          <input type="checkbox" @change="onChange(index)">
        </td>
        <td>
          <input type="checkbox" @change="onChange(index)">
        </td>
        <td>
          <input type="checkbox" @change="onChange(index)">
        </td>
      </tr>
      </tbody>
    </table>

  </a-card>
</template>
<script>
export default {
  data() {
    return {
      listData: [
        { id: 0, week: '' },
        { id: 1, week: '周一' },
        { id: 2,week: '周二' },
        { id: 3, week: '周三' },
        { id: 4, week: '周四' },
        { id: 5, week: '周五' },
        { id: 6, week: '周六' },
        { id: 7, week: '周日' }
      ],
      sjData: [{
        id: 0
      },
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4, stae: false },
        { id: 5, stae: true },
        { id: 6, stae: true },
        { id: 7 },
        { id: 8, stae: false },
        { id: 9, stae: true },
        { id: 10 },
        { id: 11, stae: true },
        { id: 12, stae: true },
        { id: 13, stae: true }
      ]
    }
  },
  methods: {
    onChange(index) {
      console.log(index)
    }
  }
}
</script>
<style scoped>
th {
  background-color: #66C3FD;
  border: 1px solid #CCCCCC;
  width: 120px;
  text-align: center;
  height: 50px;
  color: #FFFFFF;
}
hr {
  border: 1px solid #CCCCCC;

}
td {
  height: 50px;
  border: 1px solid #CCCCCC;
  text-align: center;
}
</style>
