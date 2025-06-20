<template>
  <button :class="getClassByType()" @click="$emit('click')">
    <a-icon v-if="!rightIcon && icon!=null" :type="icon" style="margin-right: 4px"/>
    {{title}}
    <a-icon v-if="rightIcon && icon!=null" :type="icon" style="margin-left: 4px"/>
    <a-modal
      :visible="visible"
      :closable="false"
      width="478px"
      @cancel="visible=true"
      :dialog-style="{ top: '30%' }"
      :footer="null"
    >
      <p style="position: absolute;height: 60px;background-color: rgb(54,139,219);width: 478px;margin-left: -24px;margin-top: -24px;
      font-size: 24px;font-family: Microsoft YaHei;font-weight: 400;
      border-top-right-radius: 3px;border-top-left-radius: 3px;color:white;line-height: 60px;padding:0 10px 0 20px;">
        提示
        <img style="float: right;width: 30px;margin-top: 22px;cursor:pointer;" @click="visible=false" src="@/assets/icon/icon_del.png" />
      </p>
      <div style="height: 90px;width: 100%;text-align: center;margin-top: 60px;">
        <div style="width: 71px;height: 71px;display: inline-block;background: linear-gradient(180deg, rgba(255, 99, 103, 0.99), rgba(254, 172, 136, 0.99));border-radius: 50%;">
          <img src="@/assets/icon/del.png" style="width: 39px;height: 39px;margin-top: 16px"/>
        </div>
      </div>
      <p style="text-align: center;font-size: 18px;font-family: Microsoft YaHei;font-weight: bold;;color: #666666">确定执行删除？</p>
      <div style="text-align: center;border: 0px">
        <!--        -->
        <edu-caozuo-button type="11" @click="visible=false;$emit('del')" title="确定" ></edu-caozuo-button>
        <edu-caozuo-button type="15" @click="visible=false" title="取消" ></edu-caozuo-button>
      </div>
    </a-modal>
  </button>
</template>

<script>
  export default {
    name: 'EduButtonDelete',
    props: {
      type: String,
      title: '',
      aIcon:null,
      icon:"",
      rightIcon:false,
    },
    data() {
      return {
        visible: false
      }
    },
    methods: {
      showConfirm(){
        this.visible = true;
      },
      getClassByType() {
        let value = "";
        if(this.type == 'primary'){
          value += "color_3";
        }else if (this.type != null && this.type != '') {
          return "button_default color_" + this.type;
        }
        return 'button_default ' + value;
      }
    }
  }
</script>

<style scoped>
  .button_default{
    font-family: Microsoft YaHei;
    font-size: 16px;
    color: #ffffff;
    font-weight: bold;
    text-align: center;
    height: 34px;
    padding: 0 16px;
    border:0px;
    min-width: 88px;
    border-radius:5px;
    cursor:pointer;
    margin:0 5px 16px 5px;
  }

  .button_default:focus,.button_default:active:focus,.button_default.active:focus,.button_default.focus,.button_default:active.focus,.button_default.active.focus {
    outline: none;
    border-color: transparent;
    box-shadow:none;
  }

  .button_default:hover{
    opacity: 0.7;
  }

  .color_1{
    background-color: #66c3fd;
  }
  

  .color_10{
    /*background-color: #ffffff;*/
    /*color:#999999;*/
    /*border: 2px solid #cccccc;*/

    background-color: #0098f8;
  }

  /*.color_10:hover{*/
  /*  opacity: 0.9;*/
  /*  color:#028be2;*/
  /*  border: 2px solid #028be2;*/
  /*}*/

  /*.color_10:focus,.color_10:active:focus,.color_10.active:focus,.color_10.focus,.color_10:active.focus,.color_10.active.focus {*/
  /*  outline: none;*/
  /*  color:#028be2;*/
  /*  border: 2px solid #028be2;*/
  /*  box-shadow:none;*/
  /*}*/

</style>