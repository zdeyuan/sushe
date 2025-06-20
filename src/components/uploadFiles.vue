<template>
  <div>
    <a-upload
      ref="fileUploader"
      :name="name"
      :headers="headers"
      :showUploadList="false"
      :customRequest="httpRequest"
      :beforeUpload="beforeUpload"
      v-if="!edit"
    >
      <span class="tip-msg-title" v-if="showMsg">上传附件</span>
      <a-button :class="uploadBtnClass" :type="one ? 'primary' : 'defalut'">
        <i v-if="one" class="basefont icondaoru "></i>
        <a-icon v-else type="upload" />
        {{ uploadBtnName }}
      </a-button>
      <span class="a-upload__tip" v-html="tipMsg" v-if="showMsg"> </span>
    </a-upload>
    <div v-show="fileList.length > 0 && showFiles" class="file-table">
      <div class="detail_title" v-if="edit && editTitle">附件</div>
      <a-table rowKey="id" :data-source="fileList" :pagination="false" bordered style="width: 100%">
        <a-table-column title="序号" width="70px" align="center">
          <template slot-scope="text, record, index">
            {{ index + 1 }}
          </template>
        </a-table-column>
        <a-table-column dataIndex="name" v-if="!isImg" title="文件名称"> </a-table-column>
        <slot></slot>
        <a-table-column title="操作" width="150px" align="center" dataIndex="id">
          <template slot-scope="id, record, index">
            <span style="color: #028be2;" class="file-btn down-btn" @click="downFile(id, record.name)">下载</span>
            <span style="color: #f56c6c;" class="file-btn" v-if="!edit" @click="removeFile(index)">删除</span>
          </template>
        </a-table-column>
      </a-table>
    </div>
	 <a-spin v-if="isShow"/>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth';
import http from '@/utils/kq/http';
export default {
  props: {
    url: {
      type: String,
      default:
         http.service.stu + 'veStuFile/upload'
    },
    name: {
      type: String, //默认的后台名称
      default: 'file'
    },
    serviceType: {
      type: String, //业务类型 必填 切唯一
      required: true
    },
    uploadBtnName: {
      type: String, //默认的后台名称
      default: '浏览'
    },
    uploadBtnClass: {
      type: String, //默认的后台名称
      default: ''
    },
    fileType: {
      //all image json world
      type: String,
      default: 'all'
    },
	type: {
	  //all image json world
	  type: String,
	  default: ''
	},
    extArr: {
      //允许的扩展名列表
      type: Array,
      default: function() {
        return [];
      }
    },
    getParams: {
      //允许的扩展名列表
      type: Function,
      default: null
    },
    maxSize: {
      //最大的文件大小(M) 默认5M
      type: Number,
      default: 5
    },
    limit: {
      //最大允许上传个数
      type: Number,
      default: 5
    },
    edit: {
      type: Boolean,
      default: false
    },
    editTitle: {
      type: Boolean,
      default: true
    },
    isImg: {
      type: Boolean,
      default: false
    },
    showFiles: {
      type: Boolean,
      default: true
    },
    showMsg: {
      type: Boolean,
      default: true
    },
    one: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const data = {
      fileList: [],
      fileUrl: http.baseServer + this.$http.service.file
    };
    data.ulimit = this.limit;
    /* 如果没有显示文件 这个limit 的限制就要去了 */
    if (!this.showFileList && !this.showTable) {
      data.ulimit = null;
    }
    data.reqHeaders = {
      responseType: this.responseType
    };
    data.reqUrl = this.$http.baseServer + '/' + this.url;
    data.headers = {
      'X-Access-Token': getToken()
    };
    data.fileNoMsg = '';

    data.tipMsg = '文件最大 <span class="file-size">' + this.maxSize + '</span>M';
    if (this.limit > 0) {
      data.tipMsg += '，最多不能超过<span class="file-size">' + this.limit + '</span>个';
    }
    data.fileArr = [];
    if (this.fileType == 'image') {
      data.fileArr = ['jpg', 'gif', 'png'];
    } else if (this.fileType == 'json') {
      data.fileArr = ['json'];
    } else if (this.fileType == 'world') {
      data.fileArr = ['doc', 'docx'];
    } else if (this.extArr.length > 0) {
      data.fileArr = this.extArr;
    }
    if (data.fileArr.length > 0) {
      data.fileNoMsg = '，可选类型（*.' + data.fileArr.join(', *.') + '）';
      data.tipMsg += data.fileNoMsg;
    }
    data.restFileList = [];
	data.isShow=false;
    data.urlController = 'veStuFile';
    return data;
  },
  computed: {
    tableFiles() {
      return this.restFileList;
    }
  },
  // mounted() {
  //   this.displayFileList(this.busiId,this.busiType);
  // },
  watch: {
    url(val) {
      this.reqUrl = this.$http.baseServer + val;
    }
  },
  methods: {
    httpRequest(option) {
	  this.isShow=true;
      let formData = new FormData();
      formData.set(this.name, option.file);
      formData.set('serviceType', this.serviceType);
      if (this.getParams) {
        const params = this.getParams();
        if (params) {
          Object.keys(params).forEach(key => {
            formData.set(key, params[key]);
          });
        }
      }
      const config = {
        onUploadProgress: e => {
          if (e.total > 0) {
            e.percent = (e.loaded / e.total) * 100;
          }
          option.onProgress(e);
        }
      };
      this.$http
        .upload(this.url, formData, config, this.responseType)
        .then(res => {
          if (res.code == 200) {
            this.fileList.push(res.result);
            this.$emit('upload', res);
          }
		  this.isShow=false;
          option.onSuccess(res);
        })
        .catch(error => {
		  this.isShow=false;
          option.onError(error);
        });
    },
    downFile(id, fileName) {
      this.$http.downLoad('/stu/veStuFile/download?id=' + id, fileName);
    },
    removeFile(index) {
      this.fileList.splice(index, 1);
    },
    getValue() {
      const ids = this.fileList.map(item => item.id);
      return ids;
    },
    /**
     * 上传前面的校验
     */
    beforeUpload(file) {
      if (this.fileList.length >= this.limit) {
        this.$message.warning('最多上传' + this.limit + '个文件');
        return false;
      }
      /* 校验一下文件格式对不对 */
      let ext = '';
      if (file && file.name) {
        const index = file.name.lastIndexOf('.');
        ext = file.name.substring(index + 1);
      } else {
        this.$message.warning('不可上传该文件' + this.fileNoMsg);
        return false;
      }
      if (this.fileArr.length > 0) {
        if (!this.fileArr.includes(ext)) {
          this.$message.warning('不可上传该文件' + this.fileNoMsg);
          return false;
        }
      }

      /* 校验一下大小对不对 */
      const isLt2M = file.size / 1024 / 1024;
      if (isLt2M > this.maxSize) {
        this.$message.warning('上传配置文件大小不能超过 ' + this.maxSize + 'MB!');
        return false;
      }
      return true;
    },
    //回显附件
    setValue(busiId, id) {
      let url = '';
   //    if (this.type == '教科研管理系统') {
   //      url = http.service.jkl;
   //    } else if (process.env.VUE_APP_SYSTEM_NAME == '设备资产管理系统') {
   //      url = http.service.sbzc;
   //    } else if (process.env.VUE_APP_SYSTEM_NAME == '学生管理系统') {
   //      url = http.service.stu;
   //    } 
	  // else {
   //      url = http.service.hq;
   //    }
      url = http.service.stu;
      url += `/${this.urlController}/list?serviceId=${busiId}&serviceType=${this.serviceType}&id=${id || ''}`;

      http.get(url).then(res => {
        this.fileList = res.result;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.basefont {
  margin-right: 5px;
  &.mini {
    font-size: 10px;
    position: relative;
    top: -1px;
  }
}
.down-btn {
  margin-right: 15px;
  display: inline-block;
}
.inline {
  display: inline-block;
}
.tip-msg-title {
  font-size: 14px;
  color: #000a26;
  display: inline-block;
  margin-right: 3px;
}
.a-upload__tip {
  color: #575d6c;
  font-size: 14px;
  display: inline-block;
  margin-left: 3px;
}
/deep/.a-button--primary {
  background: none;
  height: 32px;
  line-height: 32px;
  font-size: 14px;
  border: 1px solid #166fdc;

  &:hover {
    cursor: pointer;
  }
  span {
    i {
      font-size: 14px;
    }
  }
}
/deep/.file-size {
  color: #166fdc;
}
.upload-demo .a-button:hover {
  background: #e8f1fc;
}
.file-table {
  margin-top: 5px;
  .file-btn {
    cursor: pointer;
  }
}
</style>
