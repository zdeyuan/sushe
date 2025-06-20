<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-03-05 21:30:00
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-07-20 23:06:15
-->
<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div class="div-box">
        <div class="xueqi">
          <div class="detail_title" style="margin-bottom:0">学期选择</div>
          <div class="zhou">
            <a-select v-model="selectTermId" style="width:100%" placeholder="请选择" @change="getWeek">
              <a-select-option v-for="item in termList" :key="item.id" :value="item.id">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </div>
          <div class="detail_title" style="margin-bottom:0">周选择</div>
          <div class="week_list">
            <div
              class="week_box"
              v-for="(item, index) in weekList"
              @click="changeWeek(index)"
              :class="{ selected: selectWeek == index }"
              :key="item.id"
              >{{ item.name }}</div
            >
          </div>
        </div>
        <div class="item-box">
          <div class="alert alert-info">
            <strong>操作步骤说明：</strong><br />
            <div>1.先学期再选择周，显示要检查的项目，并打分。</div>
            <div>2.点击确定，保存数据。</div>
          </div>
          <div v-if="selectWeek >= 0">
            <table class="auto-table">
              <tr>
                <th colspan="6" style="border-bottom: 1px solid #fff;">反馈表</th>
              </tr>
              <tr>
                <th style="border-right: 1px solid #fff;">项目</th>
                <th style="border-right: 1px solid #fff;">周一</th>
                <th style="border-right: 1px solid #fff;">周二</th>
                <th style="border-right: 1px solid #fff;">周三</th>
                <th style="border-right: 1px solid #fff;">周四</th>
                <th>周五</th>
              </tr>
              <tbody>
                <template v-if="edit">
                  <template v-for="item in itemList">
                    <tr v-if="item.isDel == 0" :key="item.id">
                      <td width="200px">
                        {{ item.name }}
                      </td>
                      <td>
                        <a-switch v-model="item.z1" @click="changeSwitch">
                          <a-icon slot="checkedChildren" type="check" />
                          <a-icon slot="unCheckedChildren" type="close" />
                        </a-switch>
                      </td>
                      <td>
                        <a-switch v-model="item.z2" @click="changeSwitch">
                          <a-icon slot="checkedChildren" type="check" />
                          <a-icon slot="unCheckedChildren" type="close" />
                        </a-switch>
                      </td>
                      <td>
                        <a-switch v-model="item.z3" @click="changeSwitch">
                          <a-icon slot="checkedChildren" type="check" />
                          <a-icon slot="unCheckedChildren" type="close" />
                        </a-switch>
                      </td>
                      <td>
                        <a-switch v-model="item.z4" @click="changeSwitch">
                          <a-icon slot="checkedChildren" type="check" />
                          <a-icon slot="unCheckedChildren" type="close" />
                        </a-switch>
                      </td>
                      <td>
                        <a-switch v-model="item.z5" @click="changeSwitch">
                          <a-icon slot="checkedChildren" type="check" />
                          <a-icon slot="unCheckedChildren" type="close" />
                        </a-switch>
                      </td>
                    </tr>
                  </template>
                </template>
                <template v-if="!edit">
                  <template v-for="(item, index) in itemList">
                    <tr v-if="item.isHas" class="show_tr" :key="index">
                      <td width="200px">
                        {{ item.name }}
                      </td>
                      <td>
                        <a-icon v-if="item.z1" slot="checkedChildren" type="check" />
                        <a-icon v-else slot="unCheckedChildren" type="close" />
                      </td>
                      <td>
                        <a-icon v-if="item.z2" slot="checkedChildren" type="check" />
                        <a-icon v-else slot="unCheckedChildren" type="close" />
                      </td>
                      <td>
                        <a-icon v-if="item.z3" slot="checkedChildren" type="check" />
                        <a-icon v-else slot="unCheckedChildren" type="close" />
                      </td>
                      <td>
                        <a-icon v-if="item.z4" slot="checkedChildren" type="check" />
                        <a-icon v-else slot="unCheckedChildren" type="close" />
                      </td>
                      <td>
                        <a-icon v-if="item.z5" slot="checkedChildren" type="check" />
                        <a-icon v-else slot="unCheckedChildren" type="close" />
                      </td>
                    </tr>
                  </template>
                </template>
                <tr>
                  <td width="200px">
                    问题综述
                  </td>
                  <td colspan="5">
                    <a-textarea v-if="edit" v-model="veHqCheckVo.msg" :maxLength="500" placeholder="请输入问题综述" :rows="4" />
                    <div v-else v-text="veHqCheckVo.msg" class="detail"></div>
                  </td>
                </tr>
                <tr>
                  <td width="200px">
                    改进措施
                  </td>
                  <td colspan="5">
                    <a-textarea v-if="edit" v-model="veHqCheckVo.suggest" :maxLength="500" placeholder="请输入改进措施" :rows="4" />
                    <div v-else v-text="veHqCheckVo.suggest" class="detail"></div>
                  </td>
                </tr>
              </tbody>
            </table>

            <div class="form-footer" v-if="edit" style="padding:15px 0" align="center">
              <a-button style="padding: 0 25px;margin-right:15px" type="primary" @click="createData">
                确定
              </a-button>
              <a-button style="padding: 0 25px;" @click="rest">
                重置
              </a-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </edu-layout>
</template>

<script>
import veHqCheckApi from '@/views/logistics/ct/api/veHqCheckApi';
import veHqItemApi from '@/views/logistics/ct/api/veHqItemApi';

export default {
  components: {},
  data() {
    const data = {
      veHqCheckVo: this.resetveHqCheckVo(),
      itemList: []
    };
    data.termList = [];
    data.weekList = [];
    data.selectTermId = null;
    data.selectWeek = null;
    data.detailList = [];
    data.edit = false;
    return data;
  },
  mounted() {
    this.initItem();
  },
  methods: {
    changeSwitch() {
      this.$forceUpdate();
    },
    initItem() {
      this.$http.get(this.$http.service.base + 'veCommon/querySemesterList?interfaceUserId=' + this.$constant.commonApi, {}).then(res => {
        res.result.forEach(item => {
          item.name = item.xqmc;
          item.z1 = true;
          item.z2 = true;
          item.z3 = true;
          item.z4 = true;
          item.z5 = true;
        });
        this.termList = res.result;
        this.selectTermId = this.termList[0].id;
        this.getTerm();
      });

      const sub = {
        size: 10000,
        current: 1,
        sorts: [{ column: 'list_sort', asc: true }]
      };
      veHqItemApi.page(sub).then(res => {
        this.itemList = res.result.records;
        this.itemList.forEach(item => {
          item.z1 = true;
          item.z2 = true;
          item.z3 = true;
          item.z4 = true;
          item.z5 = true;
        });
      });
    },
    /**
     * @msg: 重置数据
     */
    resetveHqCheckVo() {
      return {
        semId: '', // 学期
        weekId: '', // 周
        msg: '', // 问题综述
        suggest: '' // 改进措施
      };
    },
    getTerm() {
      /*  this.termList = [
        { id: 1, name: '2021-2022上学期' },
        { id: 2, name: '2020-2021下学期' },
        { id: 3, name: '2020-2021上学期' },
        { id: 4, name: '2019-2020下学期' },
        { id: 5, name: '2019-2020上学期' }
      ]; */
      if (this.termList && this.termList.length > 0) {
        this.getWeek(this.termList[0].id);
      }
    },
    getWeek(termId) {
      this.selectTermId = termId;
      this.selectWeek = -1;
      const termPo = this.$utils.getInArr(this.termList, 'id', termId);
      if (termPo == null) return;
      let end = termPo.xqjsrq * 1000;
      let start = termPo.xqksrq * 1000;
      let now = this.$date.getDate(start);
      let endDate = this.$date.getDate(end);
      let add7 = now.add(1, 'weeks');
      const weekList = [];
      for (let i = 0; i < endDate.diff(add7) > 0; i++) {
        weekList.push({
          id: 10000 + termId * 100 + i,
          name: `第${i + 1}周（${now.format('YYYY-MM-DD')}~${now.add(6, 'days').format('YYYY-MM-DD')}）`
        });
        now = add7;
        add7 = now.add(1, 'weeks');
      }
      this.weekList = weekList;
    },
    changeWeek(index) {
      const week = this.weekList[index];
      const sub = {
        size: 1,
        current: 1,
        conditions: [
          { operator: 'eq', column: 'sem_id', value: this.selectTermId },
          { operator: 'eq', column: 'week_id', value: week.id }
        ]
      };
      veHqCheckApi.page(sub).then(res => {
        const datas = res.result.records;
        if (datas && datas.length > 0) {
          veHqCheckApi.get(datas[0].id).then(re2 => {
            this.veHqCheckVo = re2.result;
            this.itemList.forEach(element => {
              element.isHas = false;
            });
            re2.result.items.forEach(element => {
              const tIndex = this.$utils.inArrIndex(this.itemList, 'id', element.itemId);
              if (tIndex > -1) {
                this.itemList[tIndex].isHas = true;
                this.itemList[tIndex].z1 = element.week1 == 1;
                this.itemList[tIndex].z2 = element.week2 == 1;
                this.itemList[tIndex].z3 = element.week3 == 1;
                this.itemList[tIndex].z4 = element.week4 == 1;
                this.itemList[tIndex].z5 = element.week5 == 1;
              }
            });
            this.selectWeek = index;
            this.edit = false;
          });
        } else {
          this.rest();
          this.selectWeek = index;
          this.edit = true;
        }
      });
    },
    /**
     * @msg: 获取提交的数据 新增和 修改复用
     */
    getSubData(isUpdate) {
      const tempData = Object.assign({}, this.veHqCheckVo);
      tempData.semId = this.selectTermId;
      tempData.weekId = this.weekList[this.selectWeek].id;
      const items = [];
      this.itemList.forEach(item => {
        if (item.isDel != 0) {
          return;
        }
        const newItem = {};
        newItem.itemId = item.id;
        newItem.week1 = item.z1 ? 1 : 0;
        newItem.week2 = item.z2 ? 1 : 0;
        newItem.week3 = item.z3 ? 1 : 0;
        newItem.week4 = item.z4 ? 1 : 0;
        newItem.week5 = item.z5 ? 1 : 0;
        items.push(newItem);
      });
      tempData.items = items;
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      const subData = this.getSubData(false);
      if (subData == null) {
        return;
      }
      veHqCheckApi.add(subData).then(res => {
        this.$notification.success({
          message: '数据新增成功',
          description: '新增了一条数据'
        });
        this.edit = false;
      });
    },
    rest() {
      this.veHqCheckVo = this.resetveHqCheckVo();
      this.itemList.forEach(item => {
        item.z1 = true;
        item.z2 = true;
        item.z3 = true;
        item.z4 = true;
        item.z5 = true;
      });
    }
  }
};
</script>
<style lang="less" scoped>
.div-box {
  display: flex;
  .xueqi {
    width: 300px;
    padding: 15px;
  }
  .item-box {
    padding: 15px;
    flex: 1;
  }
}
.alert-info {
  color: #3a87ad;
  background-color: #e9f3ff;
  border-color: #bcd9ff;
  font-size: 14px;
  padding: 9px 35px 9px 14px;
  margin-bottom: 11px;
  height: auto;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
}

.zhou {
  padding: 15px;
}
.week_box {
  padding: 15px;
  margin: 0 8px;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
  &.selected {
    // background: #5fcbff;
    // color: #fff;

    border: 0.00521rem dashed #4e89f8;
    color: #4e89f8;
  }
}

.show_tr {
  /deep/.anticon-check {
    color: #039471;
    font-size: 16px;
  }
  /deep/.anticon-close {
    color: rgb(212, 117, 117);
    font-size: 16px;
  }
}
.detail {
  font-size: 14px;
  text-align: left;
}
</style>
