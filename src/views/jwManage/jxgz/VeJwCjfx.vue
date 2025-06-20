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
    <BarMultid title="全校成绩分析" :dataSource="dataSource" :height="420" :fields="fields" />
  </a-card>
</template>

<script>
import Bar from '@/components/chart/Bar'
import { EduListMixin } from '@/mixins/EduListMixin'
import BarMultid from '@/components/chart/BarMultid'

export default {
  name: 'VeJwCjfx',
  mixins: [EduListMixin],
  components: {
    Bar,
    BarMultid,
  },
  data() {
    return {
      disableMixinCreated: true,
      fields: ['计算机学院', '机械工程学院', '电子信息学院', '旅游与服务学院', '经济管理学院', '商务职业学院'],
      dataSource: [
        {
          type: '优秀', // 列名
          计算机学院: 44,
          机械工程学院: 31,
          电子信息学院: 17,
          旅游与服务学院: 36,
          经济管理学院: 34,
          商务职业学院: 38,
        },
        {
          type: '良好', // 列名
          计算机学院: 69,
          机械工程学院: 78,
          电子信息学院: 65,
          旅游与服务学院: 7,
          经济管理学院: 21,
          商务职业学院: 65,
        },
        {
          type: '中等', // 列名
          计算机学院: 72,
          机械工程学院: 94,
          电子信息学院: 60,
          旅游与服务学院: 61,
          经济管理学院: 58,
          商务职业学院: 59,
        },
        {
          type: '及格', // 列名
          计算机学院: 72,
          机械工程学院: 83,
          电子信息学院: 38,
          旅游与服务学院: 10,
          经济管理学院: 79,
          商务职业学院: 25,
        },
        {
          type: '不及格', // 列名
          计算机学院: 17,
          机械工程学院: 9,
          电子信息学院: 10,
          旅游与服务学院: 12,
          经济管理学院: 18,
          商务职业学院: 11,
        },
      ],
    }
  },
}
</script>

<style></style>
