import { getAction } from '@/api/common/manage';
import { postAction } from '@/api/common/manage';

export const EduUtils={
    data() {
        return {
            eduurl: '',
            id:'09d5e1e7f9b049008eee645c783a1d67',
          url: {
            getBuildingList: '/jxzy/jwJianzhu/list',
            getClassroomList: '/jxzy/jwJiaoshi/list'
          },

          jzs: [],
          jss: [],
        }
    },
    methods: {

        //获取专业部门信息
        getDepartment() {
            console.log(this.eduurl + '/common/veCommon/queryFacultyList')
            var getDeparementUrl = this.eduurl + '/common/veCommon/queryFacultyList'
            getAction(getDeparementUrl,{id: this.id,interfaceUserId:this.id})
              .then((res) => {
                if (res.success) {
                  this.deps = res.result
                  console.log('------------------------')
                  console.log(this.deps)
                } else {
                  this.$message.warning(res.message)
                }
              })
              .finally(() => {
                this.loading = false
              })
          },
          //专业部门选择后-获取专业信息
          depSelect(value) {
            console.log(value)
            var getSpecUrl = this.eduurl + '/common/veCommon/querySpecialtyListByFalId'
            getAction(getSpecUrl, { falId: value,id:this.id,interfaceUserId:this.id })
              .then((res) => {
                if (res.success) {
                  this.specs = res.result
                  console.log(this.specs)
                } else {
                  this.$message.warning(res.message)
                }
              })
              .finally(() => {
                this.loading = false
              })
          },
          //获取年级信息
          getGrades() {
            var getGrades = this.eduurl + '/common/veCommon/queryGradeList'
            getAction(getGrades,{id: this.id,interfaceUserId:this.id})
              .then((res) => {
                if (res.success) {
                  this.grades = res.result
                  console.log(this.grades)
                } else {
                  this.$message.warning(res.message)
                }
              })
              .finally(() => {
                this.loading = false
              })
          },
          //获取学期信息
          getSemesters(){
            var getSemesters = this.eduurl + '/common/veCommon/querySemesterList'
            getAction(getSemesters,{id: this.id,interfaceUserId:this.id})
            .then((res) => {
              if (res.success) {
                this.semesters = res.result
                console.log(this.semesters)
              } else {
                this.$message.warning(res.message)
              }
            })
            .finally(() => {
              this.loading = false
            })

          },
          //获取学制信息
          getEduTypes(){
            var getEduTypes = this.eduurl + '/common/veCommon/queryXueZhiList'
            getAction(getEduTypes,{id: this.id,interfaceUserId:this.id})
            .then((res) => {
              if (res.success) {
                this.etypes = res.result
                console.log(this.etypes)
              } else {
                this.$message.warning(res.message)
              }
            })
            .finally(() => {
              this.loading = false
            })

          },

          //获取班级信息
          getClass(){
            console.log("获取班级信息")
            postAction(this.url.bjlist,{id: this.id,interfaceUserId:this.id}).then((res) => {
              if (res.success) {
                this.classes = res.result.records
                console.log(this.classes)
              }else {
                this.$message.warning(res.message)
              }
            })
            .finally(() => {
              this.loading = false
            })
          },

          //获取校区信息
          getCampus() {
            var getDeparementUrl = this.eduurl + '/common/veCommon/queryCampusList'
            getAction(getDeparementUrl,{id: this.id,interfaceUserId:this.id})
              .then((res) => {
                if (res.success) {
                  this.campus = res.result
                  console.log('------------------------')
                  console.log(this.campus)
                } else {
                  this.$message.warning(res.message)
                }
              })
              .finally(() => {
                this.loading = false
              })
          },

      campusSelect(value) {
        console.log(value)
        this.jzs = [];
        this.jss = []
        if (value == null || value == '') {
          return
        }
        getAction(this.url.getBuildingList, { campusId: value,pageSize:9999,interfaceUserId:this.id})
          .then((res) => {
            console.log(this.jzs)
            if (res.success) {
              this.jzs = res.result.records
            } else {
              this.$message.warning(res.message)
            }
          })
          .finally(() => {
            this.loading = false
          })
      },
      buildingSelect(value) {
        console.log(value)
        this.jss = []
        if (value == null || value == '') {
          return
        }
        getAction(this.url.getClassroomList, { jzid: value,pageSize:9999,interfaceUserId:this.id})
          .then((res) => {
            if (res.success) {
              this.jss = res.result.records
            } else {
              this.$message.warning(res.message)
            }
          })
          .finally(() => {
            this.loading = false
          })
      },
    },
}