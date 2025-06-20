<template>
  <a-radio-group v-if="tagType=='radio'" @change="handleInput" :value="getValueSting" :disabled="disabled">
    <a-radio v-for="(item, key) in dictOptions" :key="key" :value="item.value">{{ item.text }}</a-radio>
  </a-radio-group>

  <a-radio-group v-else-if="tagType=='radioButton'"  buttonStyle="solid" @change="handleInput" :value="getValueSting" :disabled="disabled">
    <a-radio-button v-for="(item, key) in dictOptions" :key="key" :value="item.value">{{ item.text }}</a-radio-button>
  </a-radio-group>
  <a-select :style="{width:width}" v-else-if="tagType=='select'" :getPopupContainer = "getPopupContainer" :placeholder="placeholder" :disabled="disabled" :value="getValueSting" @change="handleInput">
    <a-select-option :value="undefined">请选择</a-select-option>
    <a-select-option v-for="(item, key) in dictOptions" :key="key" :value="item.value">
      <span style="display: inline-block;width: 100%" :title=" item.text || item.label ">
        {{ item.text || item.label }}
      </span>
    </a-select-option>
  </a-select>
</template>

<script>
  import {getActionForBase} from '@/api/common/manage'

  export default {
    name: "JSelectXueqi",
    props: {
      dictCode: String,
      placeholder: String,
      triggerChange: Boolean,
      disabled: Boolean,
      value: [String, Number],
      type: String,
	  isCurrent:{//默认选中当前学期
		  type:Boolean,
		  default:false
	  },
	  width:{
		type:String,
		default:"100%"
	  },
      getPopupContainer:{
        type: Function,
        default: (node) => node.parentNode
      }
    },
    data() {
      return {
        dictOptions: [],
        tagType:"",
		dicArr:[]
      }
    },
    watch:{
    },
    created() {
      // console.log(this.dictCode);
      if(!this.type || this.type==="list"){
        this.tagType = "select"
      }else{
        this.tagType = this.type
      }
      //获取字典数据
      this.initDictData();
    },
    computed: {
      getValueSting(){
        // update-begin author:wangshuai date:20200601 for: 不显示placeholder的文字 ------
        // 当有null或“” placeholder不显示
		if(this.value==null){
			if(this.isCurrent){
				const foundElement = this.dicArr.find(e => e.iscurrent == 0);
				if (foundElement) {
					this.$emit('input', foundElement.id + '');
					return foundElement.id + '';
				}
				return undefined; 
			}else{
				return undefined;
			}
		}else{
			return this.value.toString()
		}
        // update-end author:wangshuai date:20200601 for: 不显示placeholder的文字 ------
      },
    },
    methods: {
      initDictData() {
        //根据字典Code, 初始化字典数组
        getActionForBase('/common/veCommon/querySemesterList',{},'id').then((res) => {
          if (res.success) {
            let array =res.result;
			this.dicArr=Object.assign(res.result);
			if(this.isCurrent){
				const foundElement = this.dicArr.find(e => e.iscurrent == 0);
				if (foundElement) {
					this.$emit('input', foundElement.id + '');
				}
			}
            let target = []
            for(let i=0;i<array.length;i++){
              target.push({value:array[i].id.toString(),text:array[i].xqmc})
            }
            this.dictOptions = target;
          }
        })
      },
      handleInput(e) {
        let val;
        if(this.tagType=="radio"){
          val = e.target.value
        }else{
          val = e
        }
        console.log(val);
        if(this.triggerChange){
          this.$emit('change', val);
        }else{
          this.$emit('input', val);
        }
      },
      setCurrentDictOptions(dictOptions){
        this.dictOptions = dictOptions
      },
      getCurrentDictOptions(){
        return this.dictOptions
      }
    }
  }
</script>

<style scoped>
</style>