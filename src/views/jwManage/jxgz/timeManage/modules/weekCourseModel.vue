<template>
  <table>
    <thead>
    <tr>
      <th>周</th>
      <th>节次/星期</th>
      <th v-for="(weekNum, weekIndex) in courseList.length" :key="weekIndex"> {{'星期' + digital2Chinese(weekIndex, 'week')}}</th>
    </tr>
    </thead>
    <!-- 上午课程 -->
    <tbody>
    <tr>
      <td rowspan="11">第{{weekNum}}周</td>
    </tr>
    <tr v-for="(lesson, lessonIndex) in classTableData.lessonsUp" :key="lessonIndex">
      <td>
        <p>{{'第' + digital2Chinese(lessonIndex) + "节"}}</p>
        <p class="period">{{ lesson }}</p>
      </td>

      <td  class="courseStyle" v-for="(course, courseIndex) in courseList" :key="courseIndex">
        <!--<div @click="setParam(weekNum,courseList[courseIndex][lessonIndex])">-->
          <div @click="setParam(weekNum,courseList[courseIndex][lessonIndex],courseIndex,lessonIndex)">
          <div class="courseStyle" v-if="courseList[courseIndex][lessonIndex] && courseList[courseIndex][lessonIndex].kcmc">
            <div><span>{{courseList[courseIndex][lessonIndex].kcmc}}</span></div>
            <div><span class="jsmc">{{courseList[courseIndex][lessonIndex].jsmc}}</span></div>
            <div>
              <span>{{courseList[courseIndex][lessonIndex].jsxm}}</span>
              <div class="workStatus" v-if="editable == '1'">
                <a-select class="expanderRow" :default-value="courseList[courseIndex][lessonIndex ].xzbids" @change="add">
                  <a-select-option value="0"><span>正常</span></a-select-option>
                  <a-select-option value="1"><span class="matter">事假</span></a-select-option>
                  <a-select-option value="2"><span class="sick">病假</span></a-select-option>
                  <a-select-option value="3"><span class="late">迟到</span></a-select-option>
                  <a-select-option value="4"><span class="early">早退</span></a-select-option>
                </a-select>
              </div>
              <div class="workStatus" v-else>
                <span v-if="courseList[courseIndex][lessonIndex ].xzbids == '0'">正常</span>
                <span v-else-if="courseList[courseIndex][lessonIndex ].xzbids == '1'" class="matter">事假</span>
                <span v-else-if="courseList[courseIndex][lessonIndex ].xzbids == '2'" class="sick">病假</span>
                <span v-else-if="courseList[courseIndex][lessonIndex ].xzbids == '3'" class="late">迟到</span>
                <span v-else-if="courseList[courseIndex][lessonIndex ].xzbids == '4'" class="early">早退</span>
              </div>
            </div>
          </div>
        </div>

      </td>
    </tr>
    <tr style="background-color: #66C3FD"><th colspan="8"><font color="#FFFFFF">午休</font></th></tr>
    <!-- 下午课程 -->
    <tr v-for="(lesson, lessonIndex) in classTableData.lessonsDown" :key="lessonIndex">
      <td>
        <p>{{'第' + digital2ChineseS(lessonIndex) + "节"}}</p>
        <p class="period">{{ lesson }}</p>
      </td>
      <td v-for="(course, courseIndex) in courseList" :key="courseIndex">
        <div @click="setParam(weekNum,courseList[courseIndex][lessonIndex + classTableData.lessonsUp.length],courseIndex,lessonIndex + classTableData.lessonsUp.length)">
          <div v-if="courseList[courseIndex][lessonIndex + classTableData.lessonsUp.length] && courseList[courseIndex][lessonIndex + classTableData.lessonsUp.length].kcmc">
            <div class="courseStyle"><span class="kcmc">{{courseList[courseIndex][lessonIndex + classTableData.lessonsUp.length].kcmc}}</span></div>
            <div class="courseStyle"><span class="jsmc">{{courseList[courseIndex][lessonIndex + classTableData.lessonsUp.length].jsmc}}</span></div>
            <div class="courseStyle">
              <span class="jsxm">{{courseList[courseIndex][lessonIndex + classTableData.lessonsUp.length].jsxm}}</span>
              <div class="workStatus" v-if="editable == '1'">
                <a-select class="expanderRow" :default-value="courseList[courseIndex][lessonIndex + classTableData.lessonsUp.length].xzbids" @change="add">
                  <a-select-option value="0"><span>正常</span></a-select-option>
                  <a-select-option value="1"><span class="matter">事假</span></a-select-option>
                  <a-select-option value="2"><span class="sick">病假</span></a-select-option>
                  <a-select-option value="3"><span class="late">迟到</span></a-select-option>
                  <a-select-option value="4"><span class="early">早退</span></a-select-option>
                </a-select>
              </div>
              <div class="workStatus" v-else>
                <span v-if="courseList[courseIndex][lessonIndex + classTableData.lessonsUp.length].xzbids == '0'">正常</span>
                <span v-else-if="courseList[courseIndex][lessonIndex + classTableData.lessonsUp.length].xzbids == '1'" class="matter">事假</span>
                <span v-else-if="courseList[courseIndex][lessonIndex + classTableData.lessonsUp.length].xzbids == '2'" class="sick">病假</span>
                <span v-else-if="courseList[courseIndex][lessonIndex + classTableData.lessonsUp.length].xzbids == '3'" class="late">迟到</span>
                <span v-else-if="courseList[courseIndex][lessonIndex + classTableData.lessonsUp.length].xzbids == '4'" class="early">早退</span>
              </div>
            </div>
          </div>
        </div>
        <p style="color: #FC620E"></p>
      </td>
    </tr>
    </tbody>
  </table>
</template>
<script>
  import { EduListMixin } from '@/mixins/EduListMixin'
  import { postAction, getAction ,deleteAction, putAction} from '@/api/common/manage'
  import { IconFont } from '@/cas/ico'
  import { semester,majorS,major,classSchedule,classGrade,detail,classScheduleAdd,nodeSet,dellClass } from '@/api/kw/scheduling'
  export default {
    name: "weekCourseModel",
    data() {
      return {
        state:'3',
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        tempCourseInfo:{},
        url:{
          add: '/scheduleJxgz/veJwTjJskq/add',
          delete: '/scheduleJxgz/veJwTjJskq/delete',
          edit: '/scheduleJxgz/veJwTjJskq/edit',
          detail:'/scheduleJxgz/veJwTjJskq/detail',
        },
        classTableData: {
          lessonsUp: [
            '08:00-08:45',
            '09:00-09:45',
            '10:00-10:45',
            '11:00-11:45',
          ],
          lessonsDown: [
            '14:00-14:45',
            '15:00-15:45',
            '16:00-16:45',
            '17:00-17:45',
            '19:00-19:45',
          ],
          coursesUp: [
            // 上午课程
            [{}, {}, {}, {}], // 单个上午课程
            [{}, {}, {}, {}],
            [{}, {}, {}, {}],
            [{}, {}, {}, {}],
            [{}, {}, {}, {}],
            [{}, {}, {}, {}],
            [{}, {}, {}, {}],
          ],
        }
      }
    },

    props:{
      courseList:{
        type: Array, //填写类型
        required: true
      },
      weekNum:{
        required: true
      },
      semId:{
        required: true
      },
      editable:{
        required: true
      },
    },
    created() {
    },
    components: {
      IconFont,
    },
    computed: {},
    methods: {
      setParam(weekNum,courseInfo,courseIndex,lessonIndex) {
        this.tempCourseInfo.weekNum = weekNum
        this.tempCourseInfo.courseInfo = courseInfo
        this.tempCourseInfo.courseIndex = courseIndex
        this.tempCourseInfo.lessonIndex = lessonIndex
      },
      add(value){
        let courseInfo = this.tempCourseInfo.courseInfo
        courseInfo.wknum = this.tempCourseInfo.weekNum
        courseInfo.kqztid = value
        if (value == 0){
          deleteAction(this.url.delete, courseInfo).then((res) => {
            if (res.success) {
              this.$message.success(res.message)
              this.loadData()
              this.onClearSelected()
              return
            } else {
              this.$message.warning(res.message)
            }
          }).finally(() => {
            this.loading = false
          })
        } else if (value == 1 || value == 2) {
          courseInfo.isfinish = 0
        } else {
          courseInfo.isfinish = 1
        }
        if (courseInfo.id) {
          putAction(this.url.edit, courseInfo).then((res) => {
            if (res.success) {
              this.$message.success(res.message)
              this.loadData()
              this.onClearSelected()
              return
            } else {
              this.$message.warning(res.message)
            }
          }).finally(() => {
            this.loading = false
          })
        } else {
          postAction(this.url.add, courseInfo).then((res) => {
            if (res.success) {
              this.$message.success(res.message)
              console.log(res.result)
              this.courseList[this.tempCourseInfo.courseIndex][this.tempCourseInfo.lessonIndex].id = res.result.id
              this.loadData()
              this.onClearSelected()
            } else {
              this.$message.warning(res.message)
            }
          }).finally(() => {
            this.loading = false
          })
        }

      },
      digital2Chinese(num, identifier) {
        const character = ['一','二', '三', '四', '五', '六','日'];
        return identifier === 'week' && (num === 0 || num === 7) ? '一' : character[num];
      },
      digital2ChineseS(num, identifier) {
        const character = ['五', '六', '七', '八', '九'];
        return identifier === 'week' && (num === 0 || num === 7) ? '一' : character[num];
      },
    }
  }
</script>
<style scoped>
  :global(.ant-select-selection) {
    border: 0;
  }
  span, .select {
    font-size: 7px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #666666;
    line-height: 12px;
  }
  .courseStyle {
    text-align: left;
    margin-left: 8px;
  }
  .jsmc {
    color: #FC620E;
  }
  .workStatus {
    float: right;
    margin-right: 15px;
    border: 0px;
    outline: none;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }
  /**早退*/
  .early {
    color: #FCB918;
  }
  /*迟到*/
  .late {
    color: #FC9918;
  }
  /*病假*/
  .sick {
    color: #FC4D18;
  }
  /*事假*/
  .matter {
    color: #FCF918;
  }
  .selectStyle {

  }
</style>