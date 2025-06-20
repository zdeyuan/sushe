<template>
  <span :style="{ width: width }">
    <template v-if="stype == 'select'">
      <a-select v-model="inputValue" allowClear :disabled="disabled" :style="{ width: width }" placeholder="请选择" @change="onChange">
        <a-select-option v-for="item in options" :key="item[idKey]" :value="item[idKey]">
          {{ item[textKey] }}
        </a-select-option>
      </a-select>
    </template>
    <template v-if="stype == 'radio'">
      <a-radio-group v-model="inputValue" :disabled="disabled">
        <a-radio v-for="item in options" :key="item[idKey]" :border="border" :value="item[idKey]" @change="onChange" @click.native="clickData(item)">
          {{ item[textKey] }}
        </a-radio>
      </a-radio-group>
    </template>
    <template v-if="stype == 'checkbox'">
      <a-checkbox-group v-model="inputValue" :disabled="disabled" @change="onChange">
        <a-checkbox v-for="item in options" :key="item.id" :label="item[idKey]" @click.native="clickData(item)">{{ item[textKey] }}</a-checkbox>
      </a-checkbox-group>
    </template>
    <template v-if="stype == 'custom'">
      <slot :list="options"> </slot>
    </template>
  </span>
</template>

<script>
import dist from '@/utils/kq/dist';
import constant from '@/config/constant';
export default {
  model: {
    // prop即 父组件使用 v-model 绑定的属性,这个名称是自定义的
    prop: 'value',
    // event即 子组件会向父组件触发的事件,父组件的 v-model可以监听到这个事件,并将vlaue赋值给v-model绑定的属性
    event: 'input'
  },
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '100%'
    },
    code: {
      type: String,
      default: ''
    },
    dtype: {
      type: String,
      default: 'constant'
    },
    stype: {
      type: String,
      default: 'select'
    },
    idKey: {
      type: String,
      default: 'id'
    },
    textKey: {
      type: String,
      default: 'value'
    },
    value: {
      type: [String, Array, Object, Number, Boolean],
      default: function() {
        return [];
      }
    },
    datas: {
      type: Array,
      default: null
    },
    check: {
      type: Boolean,
      default: false
    },
	disabled: {
	  type: Boolean,
	  default: false
	},
    border: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const data = {
      options: [],
      // inputValue:this.value,
      optionsTemp: []
    };
    return data;
  },
  computed: {
    inputValue: {
      get: function() {
        if (this.value === null || this.value === '') return undefined;
        return this.value;
      },
      set: function(value) {
        this.$emit('input', value);
      }
    }
  },
  watch: {
    code() {
      if (this.isListenedCode) {
        this.inputValue = '';
        this.init();
      }
    },
    datas() {
      this.inputValue = '';
      this.options = this.datas;
    }
  },

  mounted() {
    this.init();
  },
  methods: {
    init() {
      if (this.dtype == 'dict') {
        this.initDict();
      } else if (this.dtype == 'constant') {
        this.initConstant();
      } else if (this.dtype == 'datas') {
		   console.log("this.datas",this.datas)
        this.options = this.datas;
      }
    },
    getObject(id, idKey) {
      if (!id) {
        return null;
      }
      return this.$utils.getInArr(this.options, idKey, id);
    },
    clickData(tiem) {
      this.$emit('clickData', tiem);
    },
    setVal(val) {
      this.inputValue = val;
    },
    initDict() {
      dist.getList(this.code).then(list => {
		  console.log("获取字典",list)
        for (let i = 0; i < list.length; i++) {
          let element = list[i];
          //如果是数字强转防止选不中
          let idNal = element[this.idKey];
          const n111 = Number(idNal);
          let isNum = false;
          if (!isNaN(n111)) {
            isNum = true;
          }
          if (this.isJgb) {
            continue;
          }
          if (!this.dataNotInt) {
            if (!this.isJgb || this.dataInt || isNum) {
              if (!isNaN(element[this.idKey])) {
                element[this.idKey] = parseInt(element[this.idKey]);
              }
            }
          }
        }

        this.options = list;
        this.$emit('onLoad', list);
      });
    },
    onChange(val) {
      this.$emit('onChange', val);
    },
    getDataByFitter(fitterName, fitterValue) {
      for (let i = 0; i < this.options.length; i++) {
        const element = this.options[i];
        if (element[fitterName] == fitterValue) {
          return element;
        }
      }
    },
    initAjax() {
      const params = this.reqParams;
      const options = null; //this.$db.getObj(this.reqUrl);
      if (options != null) {
        this.options = options;
        this.$emit('onLoad', this.options);
        return;
      }

      this.$http[this.reqMethod](this.reqUrl, params).then(res => {
        if (res.code == 0) {
          if (this.listName) {
            this.options = res.data[this.listName];
          } else {
            this.options = res.data;
          }
          this.$emit('onLoad', this.options);
          //如果没有穿参数 给他做一个缓冲
          this.$db.setObj(this.reqUrl, this.options);
        }
      });
    },
    initConstant() {
      const list = constant[this.code];
      if (list) {
        //   this.idKey="id";
        //    this.textKey="value";
        this.options = list;
      } else {
        console.error('constant.js 未定义 ' + this.code);
      }
    },

    /**
     * 对数据添加过滤
     * @param filterParam
     */
    addFilter(filterParam, filterValue) {
      //如果还没有缓存备份
      if (this.optionsTemp.length == 0) {
        this.optionsTemp = this.options;
      }
      this.options = this.optionsTemp.filter(option => {
        if (option[filterParam] == filterValue) {
          return option;
        }
      });
    },
    /**
     * 取消全选
     */
    unCheckAll() {
      this.inputValue.splice(0, this.inputValue.length);
      this.$emit('onChange', this.inputValue);
    },
    /**
     * 取消全选
     */
    checkAll() {
      this.inputValue.splice(0, this.inputValue.length);
      this.options.forEach(element => {
        this.inputValue.push(element[this.idKey]);
      });
      this.$emit('onChange', this.inputValue);
    }
  }
};
</script>
<style scoped>
/* 单选间距 */
.a-radio {
  margin-right: 10px;
}
</style>
