<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <div>
        <a-form layout="inline">
          <a-row :gutter="24">
            <a-col :md="7" :sm="24">
              <a-form-item label="学期">
                <a-select defaultValue="1">
                  <a-select-option value="1"> 2020-2021上学期 </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :xl="7" :lg="7" :md="8" :sm="24">
              <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
                <a-button @click="searchQuery" type="primary" icon="search"
                	style="margin-right: 10px;">搜索</a-button>
                <a-button @click="searchReset" type="danger" icon="delete"
                	style="margin-right: 10px;">清除</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </div>
    <div >
      <span style="text-algin: center">【计算机学院 】</span>
      <Pie :dataSource="dataSource" :height="420" />
    </div>
    <!-- <div class="man-lift">
      <span>【机械工程学院 】</span>
      <Pie :dataSource="dataSource" :height="420" />
    </div>
    <div class="man-lift">
      <span>【电子信息学院 】</span>
      <Pie :dataSource="dataSource" :height="420" />
    </div> -->
  </a-card>
</template>

<script>
import { EduListMixin } from '@/mixins/EduListMixin'
import Pie from '@/components/chart/Pie.vue'

export default {
  name: 'VeJwZyks',
  mixins: [EduListMixin],
  components: {
    Pie,
  },
  data() {
    return {
      disableMixinCreated: true,
      dataSource: [
        { item: '400分以下', count: 25 },
        { item: '400-450分', count: 21 },
        { item: '450-500分', count: 17 },
        { item: '500-550分', count: 15 },
        { item: '550-600分', count: 7 },
        { item: '600-650分', count: 6 },
        { item: '650-700分', count: 6 },
        { item: '700-750分', count: 3 },
      ],
    }
  },
}
</script>

<style>
.man-lift {
  width: 30%;
  height: 650px;
  background: #ffffff;
  box-shadow: 0px 1px 8px 0px #e9edf6;
  border-radius: 2px;
  padding: 15px 10px;
  display: inline-block;
  vertical-align: bottom;
  margin-right: 20px;
}
</style>
