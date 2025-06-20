import { downFile } from '@/api/common/manage'
import { filterObj } from './util'
import { message } from 'ant-design-vue'

/**
 * 
 * @param {*} params
 * @param {string} param.field
 * @param {string} param.selections
 */
function exportXls({
  url,
  fileName,
  params,
  field,
  selectedRowKeys
}) {
  let _params = {}
  let _fileName = fileName || '导出文件'
  // params 参数可传如数组或对象
  if (params instanceof Array) {
    _params = params.reduce((a, b) => Object.assign(a, b), {});
  } else if (typeof params === 'object') {
    _params = {
      ...params
    }
  }


  _params = filterObj(_params) // 过滤空字段

  if (field) {
    _params.field = field
  }

  if (selectedRowKeys && selectedRowKeys.length) {
    _params.selections = selectedRowKeys.join(',')
  }
  console.log("导出参数", _params)


  downFile(url, _params).then((data) => {
    if (!data) {
      message.warning("文件下载失败")
      return
    }
    if (typeof window.navigator.msSaveBlob !== 'undefined') {
      window.navigator.msSaveBlob(new Blob([data], {
        type: 'application/vnd.ms-excel'
      }), _fileName + '.xls')
    } else {
      let url = window.URL.createObjectURL(new Blob([data], {
        type: 'application/vnd.ms-excel'
      }))
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', _fileName + '.xls')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link); //下载完成移除元素
      window.URL.revokeObjectURL(url); //释放掉blob对象
    }
  })
}

export default exportXls