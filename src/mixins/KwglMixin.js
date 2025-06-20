/**
 * 新增修改完成调用 modalFormOk方法 编辑弹框组件ref定义为modalForm
 * 高级查询按钮调用 superQuery方法  高级查询组件ref定义为superQueryModal
 * data中url定义 list为查询列表  delete为删除单条记录  deleteBatch为批量删除
 */
import { filterObj } from '@/utils/util'
import {
  deleteAction,
  getAction,
  downFile,
  getActionJyzById,
  putAction,
  getFileAccessHttpUrl,
  getActionGradeById,
  getActionXueqiById,
  getActionZhuanyeById,
  getActionYuanxiById,
  getActionUserById,
  getActionXuezhiById,
  getActionTeacherById,
  getActionBanjiById,
  getActionStudentById,
  getActionCampusById,
  getActionTeacherByUserId,
} from '@/api/common/manage'
import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import store from '@/store'
import { Modal } from 'ant-design-vue'

export const EduListMixin = {
  data() {
    return {
      showItemObj: {
        gradeid: {},
        semid: {},
        specid: {},
        stuid: {},
        userid: {},
        falid: {},
        xzid: {},
        xzbid: {},
        jyzid: {},
        teacherid: {},
        teacheruserid:{},
        campusid: null
      },
      //过滤用名称
      filterConfig: {},
      showDataSource: [],
	  confirmLoading:false,
	  title:'',
      //token header
      tokenHeader: { 'X-Access-Token': Vue.ls.get(ACCESS_TOKEN) },
      /* 查询条件-请不要在queryParam中声明非字符串值的属性 */
      queryParam: {},
      /* 数据源 */
      dataSource: [],
      /* 分页参数 */
      ipagination: {
        current: 1,
        pageSize: 10,
        pageSizeOptions: ['10', '20', '30'],
        showTotal: (total, range) => {
          return range[0] + '-' + range[1] + ' 共' + total + '条'
        },
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0
      },
      /* 排序参数 */
      isorter: {
        column: 'createTime',
        order: 'desc'
      },
      /* 筛选参数 */
      filters: {},
      /* table加载状态 */
      loading: false,
      /* table选中keys*/
      selectedRowKeys: [],
      /* table选中records*/
      selectionRows: [],
      /* 查询折叠 */
      toggleSearchStatus: false,
      /* 高级查询条件生效状态 */
      superQueryFlag: false,
      /* 高级查询条件 */
      superQueryParams: '',
      /** 高级查询拼接方式 */
      superQueryMatchType: 'and'
    }
  },
  created() {
    if (!this.disableMixinCreated) {
      console.log(' -- mixin created -- ')
      this.loadData()
      //初始化字典配置 在自己页面定义
      this.initDictConfig()
    }
  },
  watch: {
    dataSource() {
      console.log('数据变化')
    }
  },
  methods: {
    getDataInfo() {
      console.log('进入getDataInfo')
      for (let i = 0; i < this.dataSource.length; i++) {
        let item = this.dataSource[i]
        if (this.filterConfig['gradeid'] == null) {
          //年级
          item.gradeidName = ''
          if (item.gradeid != null && item.gradeid != '' && this.showItemObj.gradeid[item.gradeid] == null) {
            this.showItemObj.gradeid[item.gradeid] = ''
            try {
              getActionGradeById(item.gradeid).then(res => {
                if (res.success && res.result != null) {
                  this.showItemObj.gradeid[item.gradeid] = res.result.njmc
                  this.changeData()
                }
              })
            } catch (e) {

            }
          }
        }

        if (this.filterConfig['semid'] == null) {
          //学期
          item.semidName = ''

          if (item.semid != null && item.semid != '' && this.showItemObj.semid[item.semid] == null) {
            this.showItemObj.semid[item.semid] = ''
            try {
              getActionXueqiById(item.semid).then(res => {
                if (res.success && res.result != null) {
                  this.showItemObj.semid[item.semid] = res.result.xqmc
                  this.changeData()
                }
              })
            } catch (e) {

            }
          }
        }

        if (this.filterConfig['specid'] == null) {
          //专业
          item.specidName = ''
          if (item.specid != null && item.specid != '' && this.showItemObj.specid[item.specid] == null) {
            this.showItemObj.specid[item.specid] = ''
            try {
              getActionZhuanyeById(item.specid).then(res => {
                if (res.success && res.result != null) {
                  this.showItemObj.specid[item.specid] = res.result.zymc
                  this.changeData()
                }
              })
            } catch (e) {

            }
          }
        }

        if (this.filterConfig['stuid'] == null) {
          //学生
          item.stuidName = ''
          if (item.stuid != null && item.stuid != '' && this.showItemObj.stuid[item.stuid] == null) {
            this.showItemObj.stuid[item.stuid] = ''
            try {
              getActionStudentById(item.stuid).then(res => {
                if (res.success && res.result != null) {
                  this.showItemObj.stuid[item.stuid] = res.result.xm
                  this.changeData()
                }
              })
            } catch (e) {

            }
          }
        }

        //用户
        if (this.filterConfig['userid'] == null) {
          item.useridName = ''
          if (item.userid != null && item.userid != '' && this.showItemObj.userid[item.userid] == null) {
            this.showItemObj.userid[item.userid] = ''
            try {
              getActionUserById(item.userid).then(res => {
                if (res.success && res.result != null) {
                  this.showItemObj.userid[item.userid] = res.result.xm
                  this.changeData()
                }
              })
            } catch (e) {

            }
          }
        }

        if (this.filterConfig['createuserid'] == null) {
          item.createuseridName = ''
          if (item.createuserid != null && item.createuserid != '' && this.showItemObj.userid[item.createuserid] == null) {
            this.showItemObj.userid[item.createuserid] = ''
            try {
              getActionUserById(item.createuserid).then(res => {
                if (res.success && res.result != null) {
                  this.showItemObj.userid[item.createuserid] = res.result.xm
                  this.changeData()
                }
              })
            } catch (e) {

            }
          }
        }

        if (this.filterConfig['xzid'] == null) {
          //学制
          item.xzidName = ''
          if (item.xzid != null && item.xzid != '' && this.showItemObj.xzid[item.xzid] == null) {
            this.showItemObj.xzid[item.xzid] = ''
            try {
              getActionXuezhiById(item.xzid).then(res => {
                if (res.success && res.result != null) {
                  this.showItemObj.xzid[item.xzid] = res.result.xzmc
                  this.changeData()
                }
              })
            } catch (e) {

            }
          }
        }

        if (this.filterConfig['falid'] == null) {
          //院系
          item.falidName = ''
          if (item.falid != null && item.falid != '' && this.showItemObj.falid[item.falid] == null) {
            this.showItemObj.falid[item.falid] = ''
            try {
              getActionYuanxiById(item.falid).then(res => {
                if (res.success && res.result != null) {
                  this.showItemObj.falid[item.falid] = res.result.yxmc
                  this.changeData()
                }
              })
            } catch (e) {

            }
          }
        }

        if (this.filterConfig['xzbid'] == null) {
          //行政班
          item.xzbidName = ''
          if (item.xzbid != null && item.xzbid != '') {
            // if (item.xzbid.indexOf(',') > 0) {
            //   let array = item.xzbid.split(',')
            //   for (let j = 0; j < array.length; j++) {
            //     this.showItemObj.xzbid[array[j]] = ''
            //     try {
            //       getActionBanjiById(array[j]).then(res => {
            //         if (res.success && res.result != null) {
            //           this.showItemObj.xzbid[array[j]] = res.result.xzbmc
            //           this.changeData()
            //         }
            //       })
            //     } catch (e) {
            //
            //     }
            //   }
            // } else
            if (this.showItemObj.xzbid[item.xzbid] == null) {
              this.showItemObj.xzbid[item.xzbid] = ''
              try {
                getActionBanjiById(item.xzbid).then(res => {
                  if (res.success && res.result != null) {
                    this.showItemObj.xzbid[item.xzbid] = res.result.xzbmc
                    this.changeData()
                  }
                })
              } catch (e) {

              }
            }
          }
        }

        if (this.filterConfig['jxbid'] == null) {
          //行政班
          item.jxbidName = ''
          if (item.jxbid != null && item.jxbid != '' && this.showItemObj.xzbid[item.jxbid] == null) {
            this.showItemObj.xzbid[item.jxbid] = ''
            try {
              getActionBanjiById(item.jxbid).then(res => {
                if (res.success && res.result != null) {
                  this.showItemObj.xzbid[item.jxbid] = res.result.xzbmc
                  this.changeData()
                }
              })
            } catch (e) {

            }
          }
        }

        if (this.filterConfig['bjid'] == null) {
          //行政班
          item.bjidName = ''
          if (item.bjid != null && item.bjid != '') {
            // if (item.bjid.indexOf(',') > 0) {
            //   let array = item.bjid.split(',')
            //   for (let j = 0; j < array.length; j++) {
            //     this.showItemObj.xzbid[array[j]] = ''
            //     try {
            //       getActionBanjiById(array[j]).then(res => {
            //         if (res.success && res.result != null) {
            //           this.showItemObj.xzbid[array[j]] = res.result.xzbmc
            //           this.changeData()
            //         }
            //       })
            //     } catch (e) {
            //
            //     }
            //   }
            // } else
             if (this.showItemObj.xzbid[item.bjid] == null) {
              this.showItemObj.xzbid[item.bjid] = ''
              try {
                getActionBanjiById(item.bjid).then(res => {
                  if (res.success && res.result != null) {
                    this.showItemObj.xzbid[item.bjid] = res.result.xzbmc
                    this.changeData()
                  }
                })
              } catch (e) {

              }
            }
          }
        }

        //监考老师
        item.jiankaoName = ''
        if (item.jiankao != null && item.jiankao != '' && item.jiankao != '暂未安排' && this.showItemObj.teacherid[item.jiankao] == null) {
          this.showItemObj.teacherid[item.jiankao] = ''
          try {
            getActionTeacherById(item.jiankao).then(res => {
              if (res.success && res.result != null) {
                this.showItemObj.teacherid[item.jiankao] = res.result.xm
                this.changeData()
              }
            })
          } catch (e) {

          }
        }

        item.teacheruseridName = ''
        if (item.teacheruserid != null && item.teacheruserid != '' && this.showItemObj.teacheruserid[item.teacheruserid] == null) {
          this.showItemObj.teacheruserid[item.teacheruserid] = ''
          try {
            getActionTeacherByUserId(item.teacheruserid).then(res => {
              if (res.success && res.result != null) {
                this.showItemObj.teacheruserid[item.teacheruserid] = res.result.xm
                this.changeData()
              }
            })
          } catch (e) {

          }
        }


        //巡考老师
        item.xunkaoName = ''
        if (item.xunkao != null && item.xunkao != '' && item.xunkao != '暂未安排' && this.showItemObj.teacherid[item.xunkao] == null) {
          this.showItemObj.teacherid[item.xunkao] = ''
          try {
            getActionTeacherById(item.xunkao).then(res => {
              if (res.success && res.result != null) {
                this.showItemObj.teacherid[item.xunkao] = res.result.xm
                this.changeData()
              }
            })
          } catch (e) {

          }
        }

        //巡考老师
        item.teacheridName = ''
        if (item.teacherid != null && item.teacherid != '' && this.showItemObj.teacherid[item.teacherid] == null) {
          this.showItemObj.teacherid[item.teacherid] = ''
          try {
            getActionTeacherById(item.teacherid).then(res => {
              if (res.success && res.result != null) {
                this.showItemObj.teacherid[item.teacherid] = res.result.xm
                this.changeData()
              }
            })
          } catch (e) {

          }
        }

        //校验组
        item.jyzidName = ''
        if (item.jyzid != null && item.jyzid != '' && this.showItemObj.jyzid[item.jyzid] == null) {
          this.showItemObj.jyzid[item.jyzid] = ''
          try {
            getActionJyzById(item.jyzid).then(res => {
              if (res.success && res.result != null) {
                this.showItemObj.jyzid[item.jyzid] = res.result.jyzmc
                this.changeData()
              }
            })
          } catch (e) {

          }
        }

        //校区
        item.campusidName = ''
        if (item.campusid != null && item.campusid != '' && this.showItemObj.campusid == null) {
          this.showItemObj.campusid = {}
          try {
            getActionCampusById().then(res => {
              if (res.success && res.result != null) {
                for (let j = 0; j < res.result.length; j++) {
                  this.showItemObj.campusid[res.result[j].id] = res.result[j].xqmc
                }
                this.changeData()
              }
            })
          } catch (e) {

          }
        }

      }
      // this.showDataSource = this.dataSource;
    },
    changeData() {
      for (let i = 0; i < this.dataSource.length; i++) {
        if (this.dataSource[i].specid != null && this.showItemObj.specid[this.dataSource[i].specid] != null) {
          this.dataSource[i].specidName = this.showItemObj.specid[this.dataSource[i].specid]
        }
        if (this.dataSource[i].gradeid != null && this.showItemObj.gradeid[this.dataSource[i].gradeid] != null) {
          this.dataSource[i].gradeidName = this.showItemObj.gradeid[this.dataSource[i].gradeid]
        }
        if (this.dataSource[i].semid != null && this.showItemObj.semid[this.dataSource[i].semid] != null) {
          this.dataSource[i].semidName = this.showItemObj.semid[this.dataSource[i].semid]
        }
        if (this.dataSource[i].userid != null && this.showItemObj.userid[this.dataSource[i].userid] != null) {
          this.dataSource[i].useridName = this.showItemObj.userid[this.dataSource[i].userid]
        }
        if (this.dataSource[i].createuserid != null && this.showItemObj.userid[this.dataSource[i].createuserid] != null) {
          this.dataSource[i].createuseridName = this.showItemObj.userid[this.dataSource[i].createuserid]
        }

        if (this.dataSource[i].stuid != null && this.showItemObj.stuid[this.dataSource[i].stuid] != null) {
          this.dataSource[i].stuidName = this.showItemObj.stuid[this.dataSource[i].stuid]
        }
        if (this.dataSource[i].falid != null && this.showItemObj.falid[this.dataSource[i].falid] != null) {
          this.dataSource[i].falidName = this.showItemObj.falid[this.dataSource[i].falid]
        }
        if (this.dataSource[i].xzid != null && this.showItemObj.xzid[this.dataSource[i].xzid] != null) {
          this.dataSource[i].xzidName = this.showItemObj.xzid[this.dataSource[i].xzid]
        }
        if (this.dataSource[i].xzbid != null && this.showItemObj.xzbid[this.dataSource[i].xzbid] != null) {
          this.dataSource[i].xzbidName = this.showItemObj.xzbid[this.dataSource[i].xzbid]
        }
        if (this.dataSource[i].teacheruserid != null && this.showItemObj.teacheruserid[this.dataSource[i].teacheruserid] != null) {
          this.dataSource[i].teacheruseridName = this.showItemObj.teacheruserid[this.dataSource[i].teacheruserid]
        }
        if (this.dataSource[i].bjid != null) {
          // if (this.dataSource[i].bjid.indexOf(',') > 0) {
          //   let banjiName = ''
          //   let bjArray = this.dataSource[i].bjid.split(',')
          //   for (let j = 0; i < bjArray.length; j++) {
          //     if (this.showItemObj.xzbid[bjArray[j]] != null) {
          //       banjiName = (banjiName == '' ? '' : ',') + this.showItemObj.xzbid[bjArray[j]]
          //       this.dataSource[i].bjidName = this.showItemObj.xzbid[this.dataSource[i].bjid]
          //     }
          //   }
          //   this.dataSource[i].bjidName = banjiName
          // } else {
            if (this.showItemObj.xzbid[this.dataSource[i].bjid] != null) {
              this.dataSource[i].bjidName = this.showItemObj.xzbid[this.dataSource[i].bjid]
            }
          // }
        }

        if (this.dataSource[i].jiankao != null && this.showItemObj.teacherid[this.dataSource[i].jiankao] != null) {
          this.dataSource[i].jiankaoName = this.showItemObj.teacherid[this.dataSource[i].jiankao]
        }
        if (this.dataSource[i].xunkao != null && this.showItemObj.teacherid[this.dataSource[i].xunkao] != null) {
          this.dataSource[i].xunkaoName = this.showItemObj.teacherid[this.dataSource[i].xunkao]
        }
        if (this.dataSource[i].teacherid != null && this.showItemObj.teacherid[this.dataSource[i].teacherid] != null) {
          this.dataSource[i].teacheridName = this.showItemObj.teacherid[this.dataSource[i].teacherid]
        }
        if (this.dataSource[i].campusid != null && this.showItemObj.campusid[this.dataSource[i].campusid] != null) {
          this.dataSource[i].campusidName = this.showItemObj.campusid[this.dataSource[i].campusid]
        }
        if (this.dataSource[i].jyzid != null && this.showItemObj.jyzid[this.dataSource[i].jyzid] != null) {
          this.dataSource[i].jyzidName = this.showItemObj.jyzid[this.dataSource[i].jyzid]
        }
      }
      this.showDataSource = []
      this.showDataSource = this.dataSource
    },
    loadData(arg) {
      if (!this.url.list) {
        this.$message.error('请设置url.list属性!')
        return
      }
      //加载数据 若传入参数1则加载第一页的内容
      if (arg === 1) {
        this.ipagination.current = 1
      }
      var params = this.getQueryParams()//查询条件
      this.loading = true
	  console.log("this.url.list",this.url.list)
      getAction(this.url.list, params).then((res) => {
        if (res.success) {
          //update-begin---author:zhangyafei    Date:20201118  for：适配不分页的数据列表------------
          this.dataSource = res.result.records || res.result
          this.getDataInfo()
          this.changeData()
          console.log(this.showItemObj)
          if (res.result.total) {
            this.ipagination.total = res.result.total
          }
          //update-end---author:zhangyafei    Date:20201118  for：适配不分页的数据列表------------
        }
        if (res.code === 510) {
          this.$message.warning(res.message)
        }
        this.loading = false
      })
    },
    initDictConfig() {
      console.log('--这是一个假的方法!')
    },
    handleSuperQuery(params, matchType) {
      //高级查询方法
      if (!params) {
        this.superQueryParams = ''
        this.superQueryFlag = false
      } else {
        this.superQueryFlag = true
        this.superQueryParams = JSON.stringify(params)
        this.superQueryMatchType = matchType
      }
      this.loadData(1)
    },
    getQueryParams() {
      //获取查询条件
      let sqp = {}
      if (this.superQueryParams) {
        sqp['superQueryParams'] = encodeURI(this.superQueryParams)
        sqp['superQueryMatchType'] = this.superQueryMatchType
      }
      var param = Object.assign(sqp, this.queryParam, this.isorter, this.filters)
      param.field = this.getQueryField()
      param.pageNo = this.ipagination.current
      param.pageSize = this.ipagination.pageSize
      return filterObj(param)
    },
    downExcel(url) {
      window.open(url)
    },
    getQueryField() {
      //TODO 字段权限控制
      var str = 'id,'
      this.columns.forEach(function(value) {
        str += ',' + value.dataIndex
      })
      return str
    },

    onSelectChange(selectedRowKeys, selectionRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectionRows = selectionRows
    },
    onClearSelected() {
      this.selectedRowKeys = []
      this.selectionRows = []
    },
    searchQuery() {
      this.loadData(1)
    },
    superQuery() {
      this.$refs.superQueryModal.show()
    },
    searchReset() {
      this.queryParam = {}
      this.loadData(1)
    },
    batchState(state) {
      if (!this.url.stateBatch) {
        this.$message.error('请设置url.stateBatch属性!')
        return
      }
      if (this.selectedRowKeys.length > 0) {
        var ids = ''
        for (var a = 0; a < this.selectedRowKeys.length; a++) {
          ids += this.selectedRowKeys[a] + ','
        }
        putAction(this.url.stateBatch, { ids: ids, state: state }).then((res) => {
          if (res.success) {
            this.$message.success(res.message)
            this.loadData()
          }
        })
      } else {
        this.$message.warning('请选择一条数据')
      }
    },
    batchDelConfirm: function() {
      if (!this.url.deleteBatch) {
        this.$message.error('请设置url.deleteBatch属性!')
        return
      }
      if (this.selectedRowKeys.length <= 0) {
        this.$message.warning('请选择一条记录！')
        return
      } else {
        this.batchDelAction();
      }
    },
    batchDelAction: function() {
      if (!this.url.deleteBatch) {
        this.$message.error('请设置url.deleteBatch属性!')
        return
      }
      if (this.selectedRowKeys.length <= 0) {
        this.$message.warning('请选择一条记录！')
        return
      } else {
        var ids = ''
        for (var a = 0; a < this.selectedRowKeys.length; a++) {
          ids += this.selectedRowKeys[a] + ','
        }
        var that = this
        that.loading = true
        deleteAction(that.url.deleteBatch, { ids: ids }).then((res) => {
          if (res.success) {
            that.$message.success(res.message)
            that.loadData()
            that.onClearSelected()
          } else {
            that.$message.warning(res.message)
          }
        }).finally(() => {
          that.loading = false
        })
      }
    },
    batchDel: function() {
      if (!this.url.deleteBatch) {
        this.$message.error('请设置url.deleteBatch属性!')
        return
      }
      if (this.selectedRowKeys.length <= 0) {
        this.$message.warning('请选择一条记录！')
        return
      } else {
        var ids = ''
        for (var a = 0; a < this.selectedRowKeys.length; a++) {
          ids += this.selectedRowKeys[a] + ','
        }
        var that = this
        this.$confirm({
          title: '确认删除',
          content: '是否删除选中数据?',
		  okText: '确认',
		  cancelText:'取消',
          onOk: function() {
            that.loading = true
            deleteAction(that.url.deleteBatch, { ids: ids }).then((res) => {
              if (res.success) {
                that.$message.success(res.message)
                that.loadData()
                that.onClearSelected()
              } else {
                that.$message.warning(res.message)
              }
            }).finally(() => {
              that.loading = false
            })
          }
        })
      }
    },
    handleDelete: function(id,text) {
      if (!this.url.delete) {
        this.$message.error('请设置url.delete属性!')
        return
      }
	  let txt='是否删除这些数据';
	  if(text){
		  txt=text
	  }
      var that = this
	  this.$confirm({
	  	title: '是否删除',
	  	content: txt,
	  	okText: '确认',
	  	cancelText:'取消',
	  	onOk() {
	  		deleteAction(that.url.delete, { id: id }).then((res) => {
	  		  if (res.success) {
	  		    that.$message.success(res.message);
	  		    that.loadData()
	  		  } else {
	  		    that.$message.warning(res.message)
	  		  }
	  		}).catch(err => {
	  		})
	  	},
	  	onCancel() {},
	  });
    },
    handleEdit: function(record) {
      this.$refs.modalForm.edit(record)
      this.$refs.modalForm.title = '编辑'
      this.$refs.modalForm.disableSubmit = false
    },
    handleAdd: function() {
      this.$refs.modalForm.add()
      this.$refs.modalForm.title = '新增'
      this.$refs.modalForm.disableSubmit = false
    },
    handleTableChange(pagination, filters, sorter) {
      //分页、排序、筛选变化时触发
      //TODO 筛选
      if (Object.keys(sorter).length > 0) {
        this.isorter.column = sorter.field
        this.isorter.order = 'ascend' == sorter.order ? 'asc' : 'desc'
      }
      this.ipagination = pagination
      this.loadData()
    },
    handleToggleSearch() {
      this.toggleSearchStatus = !this.toggleSearchStatus
    },
    // 给popup查询使用(查询区域不支持回填多个字段，限制只返回一个字段)
    getPopupField(fields) {
      return fields.split(',')[0]
    },
    modalFormOk() {
      // 新增/修改 成功时，重载列表
      this.loadData()
    },
    handleDetail: function(record) {
      this.$refs.modalForm.edit(record)
      this.$refs.modalForm.title = '详情'
      this.$refs.modalForm.disableSubmit = true
    },
    /* 导出 */
    handleExportXls2() {
      let paramsStr = encodeURI(JSON.stringify(this.getQueryParams()))
      let url = `${window._CONFIG['domianURL']}/${this.url.exportXlsUrl}?paramsStr=${paramsStr}`
      window.location.href = url
    },
    handleExportXls(fileName) {
      if (!fileName || typeof fileName != 'string') {
        fileName = '导出文件'
      }
      let param = this.getQueryParams()
      if (this.selectedRowKeys && this.selectedRowKeys.length > 0) {
        param['selections'] = this.selectedRowKeys.join(',')
      }
      console.log('导出参数', param)
      downFile(this.url.exportXlsUrl, param).then((data) => {
        if (!data) {
          this.$message.warning('文件下载失败')
          return
        }
        if (typeof window.navigator.msSaveBlob !== 'undefined') {
          window.navigator.msSaveBlob(new Blob([data], { type: 'application/vnd.ms-excel' }), fileName + '.xls')
        } else {
          let url = window.URL.createObjectURL(new Blob([data], { type: 'application/vnd.ms-excel' }))
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', fileName + '.xls')
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link) //下载完成移除元素
          window.URL.revokeObjectURL(url) //释放掉blob对象
        }
      })
    },
    /* 导入 */
    handleImportExcel(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        if (info.file.response.success) {
          // this.$message.success(`${info.file.name} 文件上传成功`);
          if (info.file.response.code === 201) {
            let { message, result: { msg, fileUrl, fileName } } = info.file.response
            let href = window._CONFIG['domianURL'] + fileUrl
            this.$warning({
                title: message,
                content: (
                  < div >
                  < span > { msg } < /span><br/ >
                  < span > 具体详情请 < a href = { href } target = '_blank' download = { fileName } > 点击下载 < /a> </span >
              < /div>
            )
          })
          } else {
            this.$message.success(info.file.response.message || `${info.file.name} 文件上传成功`)
          }
          this.loadData()
        } else {
          this.$message.error(`${info.file.name} ${info.file.response.message}.`)
        }
      } else if (info.file.status === 'error') {
        if (info.file.response.status === 500) {
          let data = info.file.response
          const token = Vue.ls.get(ACCESS_TOKEN)
          if (token && data.message.includes('Token失效')) {
            Modal.error({
              title: '登录已过期',
              content: '很抱歉，登录已过期，请重新登录',
              okText: '重新登录',
              mask: false,
              onOk: () => {
                store.dispatch('user/Logout').then(() => {
                  Vue.ls.remove(ACCESS_TOKEN)
                  window.location.reload()
                })
              }
            })
          }
        } else {
          this.$message.error(`文件上传失败: ${info.file.msg} `)
        }
      }
    },
    /* 图片预览 */
    getImgView(text) {
      if (text && text.indexOf(',') > 0) {
        text = text.substring(0, text.indexOf(','))
      }
      return getFileAccessHttpUrl(text)
    },
    /* 文件下载 */
    // update--autor:lvdandan-----date:20200630------for：修改下载文件方法名uploadFile改为downloadFile------
    downloadFile(text) {
      if (!text) {
        this.$message.warning('未知的文件')
        return
      }
      if (text.indexOf(',') > 0) {
        text = text.substring(0, text.indexOf(','))
      }
      let url = getFileAccessHttpUrl(text)
      window.open(url)
    }
  }

}