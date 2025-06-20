<template>
  <div  class='constbox'>

    <!-- 页面主体部分 -->
    <div class="pageContentBox">
      <div class="content-head">
        <!-- 第一行操作栏 -->
        <div>
          <span class="head-span">招生季：</span>
          <a-cascader class="condition" :options="quarter" placeholder="默认当前招生季" v-model="quarterId" />

          <span class="head-span">专业部：</span>
          <a-cascader
            class="condition"
            :options="faculty"
            placeholder="请选择"
            @change="facultyChange"
            v-model="facultyId"
          />

          <span class="head-span">专业：</span>
          <a-cascader class="condition" :options="specialty" placeholder="请选择" v-model="specialtyId" />
        </div>
      </div>

        <!-- 第二行操作栏 -->
      <div class="content-head">
        <div>
       
          <a-cascader class="condition select" style="width: 100px;" :options="keys" placeholder="姓名" v-model="keysVal" />
		     <a-input class="condition-input" style="width: 200px;"  placeholder="请输入" v-model="keyword" />
          <span class="head-span">是否录取：</span>
          <a-cascader class="condition select" style="width: 150px;" :options="isAdmition" placeholder="全部" v-model="isAdmitionVal" />

          <a-button  type="primary" icon="search" style="margin-left: 10px;" @click="search">
           
            搜索
          </a-button>

          <a-button  type="danger" style="margin-left: 10px;" @click="empty">
            
            清空
          </a-button>
        </div>
      </div>

        <!-- 第三行操作栏 -->
      <div class="content-head">
        <div>
          <a-button  type="primary" icon="plus" style="margin-right:10px;" @click="showAdd()">
            添加
          </a-button>
          <a-button  type="primary" icon="plus" style="margin-right:10px;" @click="showModalAdmit">
            
            批量录取
          </a-button>

          <a-modal v-model="visibleReport" title="提示" @ok="handleOkReport" :width="478"> 	
           <template slot="footer">		
           <a-button key="back"  @click="handleOkReport" class="btn"> 确定 </a-button>
           <a-button key="submit" type="primary"  @click="closePop"  class="btn-cancle"> 取消 </a-button>
           </template>	
      		<div class="report-text">确认要批量录取吗?</div>						
    			</a-modal>

         <!-- <a-button  type="primary" style="margin-right:10px;" @click="showModalAdmitBySearch">
            按搜索条件批量录取
          </a-button> -->
		  
          <!-- <a-button  type="primary" style="margin-right:10px;" @click="showUpload">
            
            导入
          </a-button> -->
          <!-- 导入 弹窗 -->
          <a-modal v-model="upload" title="导入" @ok="uploadCancel" @cancel="uploadCancel" :width="1073">
            <table class="import-tr">
              <tr>
                <td class="left-td">
                  文件要求
                </td>
                <td class="right-td">
                  <div class="pad-style">导入excel文件一定要严格按照规定的格式，注意有选择的数据内容 允许类型：<br> "xls和xlsx"(文件总大小不能超过20MB)</div>
                </td>
              </tr>
              <!-- style="margin-left: 10px; margin-top: 5px; margin-buttom: 5px;" -->
              <tr>
                <td class="left-td">选择导入文件</td>
                <td class="right-td">
                  <a-upload                  
                    class="pad-style"
                    name="file"
					:scroll="{ x: 1500, y: 300 }"
                    :showUploadList="false"
                    :multiple="false"
                    :headers="tokenHeader"
                    :action="importExcelUrl"
                    @change="handleImportExcel"
                  >
                    <a-button type="primary">
                      选择文件
                    </a-button>
                  </a-upload>
                </td>
              </tr>
              <tr>
                <td class="left-td">导入模版</td>
                <td class="right-td">
                  <font class="orange-font pad-style">导入文件请务必使用导入时专有数据模版</font>
                  <a class = "text-btn-color1" style="font-size: 18px; margin-left: 5px" @click="exportModel()">点击下载</a>
                </td>
              </tr>
              
            </table><br>

            <div class="pointout-apply-div">
            <br />
              <div class="font-apply-div">
                温馨提示：<br />            
                ①姓名和身份证号必须唯一，身份证号如果已经存在则更新，不存在则新增; <br/>
                ②导入时默认录取状态字段值为未录取，已报到的不能更新; <br/>
                ③*专业部名称、专业名称、学制、层次、户口所在省市和县区，必须参照系统中的设置，否则将直接导致导入失败; <br/>
                ④层次、户口类别、健康状况、政治面貌必须参照数据字典数据，否则导入无效。<br/>
                <br>
              </div>
            </div>

          </a-modal>

         <!-- <a-button
		  style="margin-right:10px;"
            type="primary"
            @click="exportMessage"
          >
						导出
          </a-button> -->
          
          <a-modal v-model="visibleReportBySearch" title="提示" @ok="handleOkReportBySearch" :width="478">
            <template slot="footer">		
            <a-button key="back"  @click="handleOkReportBySearch" class="btn">确定</a-button>
            <a-button key="submit" type="primary"  @click="closePop"  class="btn-cancle">取消</a-button>
             </template>	
      			<div class="report-search-text">共{{this.reportCount}}条数据，确认要按条件批量录取吗?</div>					
    			</a-modal>

          <a-button  type="danger"  icon="delete" style="margin-right:10px;" @click="showModalDelete">
            
            删除
          </a-button>
          	<a-modal v-model="visibleDelete" title="提示" @ok="handleOkDelete" :width="478"> 
              <template slot="footer">		
              <a-button key="back"  @click="handleOkDelete" class="btn"> 确定</a-button>
              <a-button key="submit" type="primary"  @click="closePop"  class="btn-cancle">取消</a-button>
              </template>	
      			<div class="delete-text">确认执行删除?</div>
    				</a-modal>

          <a-button  type="primary"  icon="reload" style="margin-right:10px;" @click="refresh">
            刷新
          </a-button>
        </div>
      </div>

      <!-- 表格区域 -->
      <div>
        <a-table
          :columns="columns"
          :data-source="data"
		   :scroll="{ x: 1500 }"
          :row-selection="rowSelection"
          :defaultCurrent="6"
          :pagination="pagination"
          @change="tableChange">
          <span slot="operator" slot-scope="text, record">
			   <a class = "text-btn-color2"  @click="showMsg(record)">查看</a>
			   <a-divider type="vertical" />
            <a class = "text-btn-color3"  @click="showEdit(record)">编辑</a>
           
          </span>
        </a-table>
      </div>
    </div>

    <!-- start  查看-弹窗 -->
    <a-modal v-model="visible" title="查看招生信息" on-ok="handleClose" :width="1073">
      <template slot="footer">
        <a-button key="back" v-print="'#printContent'" class="btn"> 打印 </a-button>
        <a-button key="submit" type="primary"  @click="handleClose" class="btn-cancle"> 关闭 </a-button>
      </template>
      <div ref="print" id="printContent">
        <table class="scanTable" style="text-align: left">
          <tr>
            <td colspan="4" class="tr-color">
              <span class="title-style">基本信息</span>
            </td>
          </tr>

          <tr class="tr-style">
            <td class="td-div">
              <div class="font-style">姓名</div>
            </td>
            <td class="double">
              <a-input read-only class="input-style" v-model="entityObj.xm"></a-input>
            </td>
            <td class="td-div">
              <div class="font-style">身份证号</div>
            </td>
            <td class="double">
              <a-input read-only class="input-style" v-model="entityObj.sfzh"></a-input>
            </td>
          </tr>

          <tr class="tr-style">
            <td class="td-div">
              <div class="font-style">曾用名</div>
            </td>
            <td class="double">
              <a-input read-only class="input-style" v-model="entityObj.cym"></a-input>
            </td>
            <td class="td-div">
              <div class="font-style">性别</div>
            </td>
            <td class="double">
              <a-input read-only class="input-style" v-model="entityObjTwo.XBM"></a-input>
            </td>
          </tr>
          <tr class="tr-style">
            <td class="td-div">
              <div class="font-style">出生日期</div>
            </td>
            <td class="double">
              <a-input read-only class="input-style" v-model="entityObj.csrq"></a-input>
            </td>
            <td class="td-div">
              <div class="font-style">政治面貌</div>
            </td>
            <td class="double">
              <a-input read-only class="input-style" v-model="entityObj.zzmmm"></a-input>
            </td>
          </tr>

          <tr class="tr-style">
            <td class="td-div">
              <div class="font-style">籍贯</div>
            </td>
            <td class="double">
              <a-input read-only class="input-style" v-model="entityObj.jg"></a-input>
            </td>
            <td class="td-div">
              <div class="font-style">民族</div>
            </td>
            <td class="double">
              <a-input read-only class="input-style" v-model="entityObj.mzm"></a-input>
            </td>
          </tr>

          <tr class="tr-style">
            <td class="td-div">
              <div class="font-style">健康状况</div>
            </td>
            <td class="double">
              <a-input read-only class="input-style" v-model="entityObj.jkzkm"></a-input>
            </td>
            <td class="td-div">
              <div class="font-style">毕业学校</div>
            </td>
            <td class="double">
              <a-input read-only class="input-style" v-model="entityObj.byxx"></a-input>
            </td>
          </tr>

          <tr class="tr-style">
            <td class="td-div">
              <div class="font-style">户口类别</div>
            </td>
            <td class="double">
              <a-input read-only class="input-style" v-model="entityObj.hklbm"></a-input>
            </td>
            <td class="td-div">
              <div class="font-style">是否低保</div>
            </td>
            <td class="double">
              <a-input read-only class="input-style" v-model="entityObj.sfdb"></a-input>
            </td>
          </tr>

          <tr class="tr-style">
            <td class="td-div">
              <div class="font-style">招生类型</div>
            </td>
            <td class="double">
              <a-input read-only class="input-style" v-model="entityObj.zslx"></a-input>
            </td>
            <td class="td-div">
              <div class="font-style">准考证号</div>
            </td>
            <td class="double">
              <a-input read-only class="input-style" v-model="entityObj.zkzh"></a-input>
            </td>
          </tr>

          <tr class="tr-style">
            <td class="td-div">
              <div class="font-style">考生号</div>
            </td>
            <td class="double">
              <a-input read-only class="input-style" v-model="entityObj.ksh"></a-input>
            </td>
            <td class="td-div">
              <div class="font-style">考试总分</div>
            </td>
            <td class="double">
              <a-input read-only class="input-style" v-model="entityObj.kszf"></a-input>
            </td>
          </tr>
        </table>

        <table class="scanTable" style="text-align: left; margin-top: 20px">
          <tr>
            <td colspan="4" class="tr-color">
              <span class="title-style">报名信息</span>
            </td>
          </tr>

          <tr class="tr-style">
            <td class="td-div">
              <div class="font-style">专业部</div>
            </td>
            <td class="double">
              <a-input read-only class="input-style" v-model="entityObjTwo.YXMC"></a-input>
            </td>
            <td class="td-div">
              <div class="font-style">专业</div>
            </td>
            <td class="double">
              <a-input read-only class="input-style" v-model="entityObjTwo.ZYMC"></a-input>
            </td>
          </tr>

          <tr class="tr-style">
            <td class="td-div">
              <div class="font-style">学制</div>
            </td>
            <td class="double">
              <a-input read-only class="input-style" v-model="entityObjTwo.XZ"></a-input>
            </td>
            <td class="td-div">
              <div class="font-style">入学年月</div>
            </td>
            <td class="double">
              <a-input read-only class="input-style" v-model="entityObj.rxny"></a-input>
            </td>
          </tr>
          <tr class="tr-style">
            <td class="td-div">
              <div class="font-style">层次</div>
            </td>
            <td class="double">
              <a-input read-only class="input-style" v-model="entityObj.ccm"></a-input>
            </td>
            <td class="td-div">
              <div class="font-style">就读方式</div>
            </td>
            <td class="double">
              <a-input read-only class="input-style" v-model="entityObj.jdfs"></a-input>
            </td>
          </tr>
        </table>

        <table class="scanTable" style="text-align: left; margin-top: 20px">
          <tr>
            <td colspan="4" class="tr-color">
              <span class="title-style">联系方式</span>
            </td>
          </tr>

          <tr class="tr-style">
            <td class="td-div">
              <div class="font-style">详细家庭地址</div>
            </td>
            <td colspan="3" class="double">
              <a-input read-only class="input-style" v-model="entityObj.jtdz"></a-input>
            </td>
          </tr>

          <tr class="tr-style">
            <td class="td-div">
              <div class="font-style">家庭邮编</div>
            </td>
            <td class="double">
              <a-input read-only class="input-style" v-model="entityObj.jtyb"></a-input>
            </td>
            <td class="td-div">
              <div class="font-style">家庭联系电话</div>
            </td>
            <td class="double">
              <a-input read-only class="input-style" v-model="entityObj.jtlxdh"></a-input>
            </td>
          </tr>
          <tr class="tr-style">
            <td class="td-div">
              <div class="font-style">户籍所在地</div>
            </td>
            <td class="double">
              <a-input read-only class="input-style" v-model="entityObj.county"></a-input>
            </td>
            <td class="td-div">
              <div class="font-style">学生联系电话</div>
            </td>
            <td class="double">
              <a-input read-only class="input-style" v-model="entityObj.xslxdh"></a-input>
            </td>
          </tr>

          <tr class="tr-style">
            <td class="td-div">
              <div class="font-style">电子邮箱</div>
            </td>
            <td class="double">
              <a-input read-only class="input-style" v-model="entityObj.dzxx"></a-input>
            </td>
            <td class="td-div">
              <div class="font-style">即时通讯号</div>
            </td>
            <td class="double">
              <a-input read-only class="input-style" v-model="entityObj.jstxh"></a-input>
            </td>
          </tr>

          <tr>
            <td colspan="4" class="tr-color">
              <span class="title-style">其他信息</span>
            </td>
          </tr>

          <tr class="tr-style">
            <td class="td-div">
              <div class="font-style">特长</div>
            </td>
            <td colspan="3" class="double">
              <a-input read-only class="input-style" v-model="entityObj.tc"></a-input>
            </td>
          </tr>
        </table>
      </div>
    </a-modal>
    <!-- end -->

      <!-- start 添加-弹窗 -->
      <!--   -->
    <a-modal v-model="visibleAdd" title="代报名入口" on-close="cancel" :width="1073">
<template>
   <!-- 底部按钮 -->
   <template slot="footer">
        <a-button key="back"  @click="tip"  class="btn"> 确定 </a-button>
        <a-button key="submit" type="primary"  @click="cancel" class="btn-cancle"> 取消 </a-button>
      </template>
      <!-- 窗口主体 -->
      <table class="scanTable top-div" style="text-align: left">
        <tr>
          <td colspan="4" class="tr-color">
            <span class="title-style">基本信息</span>
          </td>
        </tr>

        <tr class="tr-style">
          <td class="td-div">
            <div class="font-style">姓名
               <span class="notNull-tip" >*</span>
            </div>
          </td>
          <td class="double">
            <a-input  v-model.trim="ApplyObj.xm" v-on:blur="nameBule()"></a-input>
          </td>
          <td class="td-div">
            <div class="font-style">身份证号
               <span class="notNull-tip" >*</span>
            </div>
          </td>
          <td class="double">
            <a-input  v-model.trim="ApplyObj.sfzh" v-on:blur="idCheck()"></a-input>
          </td>
        </tr>

        <tr class="tr-style">
          <td class="td-div">
            <div class="font-style">曾用名</div>
          </td>
          <td class="double">
            <a-input  v-model.trim="ApplyObj.cym" v-on:blur="oldNameBule()"></a-input>
          </td>
          <td class="td-div">
            <div class="font-style">性别</div>
          </td>
          <td class="double">
            <a-radio-group v-model="ApplyObj.xbm" @change="onChangeSex" >
              <a-radio :value="1"> 男 </a-radio>
              <a-radio :value="2"> 女 </a-radio>
            </a-radio-group>
          </td>
        </tr>
        <tr class="tr-style">
          <td class="td-div">
            <div class="font-style">出生日期</div>
          </td>
          <td class="double">
			  <DatePickByCN
			        v-model="ApplyObj.csrq"
			        placeholder="请选择出生日期"
			      />
          </td>
          <td class="td-div">
            <div class="font-style">政治面貌</div>
          </td>
          <td class="double">
            <!-- 政治面貌下拉框 -->
            <a-select  :options="politic" placeholder="请选择" v-model="ApplyObj.zzmmm" />
          </td>
        </tr>

        <tr class="tr-style">
          <td class="td-div">
            <div class="font-style">籍贯</div>
          </td>
          <td class="double">
            <a-input  v-model.trim="ApplyObj.jg"></a-input>
          </td>
          <td class="td-div">
            <div class="font-style">民族</div>
          </td>
          <td class="double">
            <!-- 民族下拉框 -->
            <a-select  :options="nation" placeholder="请选择" v-model="ApplyObj.mzm" />
          </td>
        </tr>

        <tr class="tr-style">
          <td class="td-div">
            <div class="font-style">健康状况</div>
          </td>
          <td class="double">
            <!-- 健康状况下拉框 -->
            <a-select  :options="healthy" placeholder="请选择" v-model="ApplyObj.jkzkm" />
          </td>
          <td class="td-div">
            <div class="font-style">毕业学校</div>
          </td>
          <td class="double">
            <a-input  v-model.trim="ApplyObj.byxx"></a-input>
          </td>
        </tr>

        <tr class="tr-style">
          <td class="td-div">
            <div class="font-style">户口类别</div>
          </td>
          <td class="double">
            <!-- 户口类别下拉框 -->
            <a-select  :options="residence" placeholder="请选择" v-model="ApplyObj.hklbm" />
          </td>
          <td class="td-div">
            <div class="font-style">是否低保</div>
          </td>
          <td class="double">
            <a-radio-group v-model="ApplyObj.sfdb" @change="onChangezslx" >
              <a-radio :value="1"> 是 </a-radio>
              <a-radio :value="0"> 否 </a-radio>
            </a-radio-group>
          </td>
        </tr>

        <tr class="tr-style">
          <td class="td-div">
            <div class="font-style">招生类型</div>
          </td>
          <td class="double">
            <a-radio-group v-model="ApplyObj.zslx" @change="onChangezslx" >
              <a-radio :value="1"> 统一招生 </a-radio>
              <a-radio :value="2"> 自主招生 </a-radio>
            </a-radio-group>
          </td>
          <td class="td-div">
            <div class="font-style">准考证号</div>
          </td>
          <td class="double">
            <a-input  v-model.trim="ApplyObj.zkzh"></a-input>
          </td>
        </tr>

        <tr class="tr-style">
          <td class="td-div">
            <div class="font-style">考生号</div>
          </td>
          <td class="double">
            <a-input  v-model.trim="ApplyObj.ksh"></a-input>
          </td>
          <td class="td-div">
            <div class="font-style">考试总分</div>
          </td>
          <td class="double">
            <a-input  v-model.trim="ApplyObj.kszf" v-on:blur="numCheck()"></a-input>
          </td>
        </tr>
      </table>

      <table class="scanTable" style="text-align: left; margin-top: 20px">
        <tr>
          <td colspan="4" class="tr-color">
            <span class="title-style">报名信息</span>
          </td>
        </tr>

        <tr class="tr-style">
          <td class="td-div">
            <div class="font-style">专业部<span class="notNull-tip" >*</span></div>
          </td>
          <td class="double">
            <a-select
              
              :options="addfaculty"
              placeholder="请选择"
              @change="addfacultyChange"
              v-model="ApplyObj.falId"
            />
          </td>
          <td class="td-div">
            <div class="font-style">专业<span class="notNull-tip" >*</span></div>
          </td>
          <td class="double">
            <a-select class="input-style-replyTwo" :options="addspecialty" placeholder="请选择" v-model="ApplyObj.specId" />
            <a-button type="danger" style="margin-left: 10px;" @click="clearReplay">
              
              清除
            </a-button>
          </td>
        </tr>

        <tr class="tr-style">
          <td class="td-div">
            <div class="font-style">学制
             <span class="notNull-tip" >*</span>
            </div>
          </td>
          <td class="double">
            <a-select  :options="xuzhi" placeholder="请选择学制" v-model="ApplyObj.xz" />
          </td>
          <td class="td-div">
            <div class="font-style">就读方式</div>
          </td>
          <td class="double">
            <a-radio-group v-model="ApplyObj.jdfs" @change="onChangejdfs" >
              <a-radio :value="1"> 住校 </a-radio>
              <a-radio :value="2"> 走读 </a-radio>
            </a-radio-group>
          </td>
        </tr>
      </table>

      <table class="scanTable" style="text-align: left; margin-top: 20px">
        <tr>
          <td colspan="4" class="tr-color">
            <span class="title-style">联系方式</span>
          </td>
        </tr>

        <tr class="tr-style">
          <td class="td-div">
            <div class="font-style">户籍所在地<span class="notNull-tip" >*</span></div>
          </td>
          <td colspan="3" class="double">
            <!-- 省份下拉框 -->
            <a-select
              class="input-style-replyTwo"
              :options="province"
              placeholder="请选择省份"
              @change="cityChange"
              v-model="ApplyObj.provinceId"
            />

            <!-- 市级下拉框 -->
            <a-select
              class="input-style-replyTwo"
              :options="city"
              placeholder="请选择市区"
              @change="countyChange"
              v-model="ApplyObj.cityId"
            />

            <!-- 县级下拉框 -->
            <a-select class="input-style-replyTwo" :options="county" placeholder="请选择县区" v-model="ApplyObj.countyId" />

            <a-button type="danger" style="margin-left: 10px;" @click="clearArea">
              
              清除
            </a-button>
          </td>
        </tr>

        <tr class="tr-style">
          <td class="td-div">
            <div class="font-style">家庭邮编</div>
          </td>
          <td class="double">
            <a-input  v-model.trim="ApplyObj.jtyb" v-on:blur="checkCode()"></a-input>
          </td>
          <td class="td-div">
            <div class="font-style font-style">家庭联系电话
              <span class="notNull-tip" >*</span>
            </div>
          </td>
          <td class="double">
            <a-input  v-model.trim="ApplyObj.jtlxdh" v-on:blur="phone()"></a-input> 
          </td>
        </tr>
        <tr class="tr-style">
          <td class="td-div">
            <div class="font-style font-style">详细家庭地址
                <span class="notNull-tip" >*</span>
            </div>
          </td>
          <td class="double">
            <a-input  v-model.trim="ApplyObj.jtdz" v-on:blur="adressCheck()"></a-input> 
          </td>
          <td class="td-div">
            <div class="font-style">学生联系电话</div>
          </td>
          <td class="double">
            <a-input  v-model.trim="ApplyObj.xslxdh" v-on:blur="phone()"></a-input>
          </td>
        </tr>

        <tr class="tr-style">
          <td class="td-div">
            <div class="font-style">电子邮箱</div>
          </td>
          <td class="double">
            <a-input  v-model.trim="ApplyObj.dzxx" v-on:blur="email()"></a-input>
          </td>
          <td class="td-div">
            <div class="font-style">即时通讯号</div>
          </td>
          <td class="double">
            <a-input  v-model.trim="ApplyObj.jstxh" v-on:blur="phone()"></a-input>
          </td>
        </tr>

        <tr>
          <td colspan="4" class="tr-color">
            <span class="title-style">其他信息</span>
          </td>
        </tr>

        <tr class="tr-style">
          <td class="td-div">
            <div class="font-style">特长</div>
          </td>
          <td colspan="3" class="double">
            <a-input  v-model="ApplyObj.tc"></a-input>
          </td>
        </tr>
      </table>
</template>
    </a-modal>
    <!-- end -->

  
      <!-- start 编辑-弹窗 -->
      <!--   -->
    <a-modal v-model="visibleEdit" title="编辑招生信息" :width="1070">
<template>
   <!-- 底部按钮 -->
   <template slot="footer">
        <a-button key="back"  @click="edit"  class="btn"> 确定 </a-button>
        <a-button key="submit" type="primary"  @click="cancel" class="btn-cancle"> 取消 </a-button>
      </template>
      <!-- 窗口主体 -->
      <table class="scanTable top-div" style="text-align: left">
        <tr>
          <td colspan="4" class="tr-color">
            <span class="title-style">基本信息</span>
          </td>
        </tr>

        <tr class="tr-style">
          <td class="td-div">
            <div class="font-style">姓名
               <span class="notNull-tip" >*</span>
            </div>
          </td>
          <td class="double">
            <a-input  v-model.trim="ApplyObj.xm" v-on:blur="nameBule()"></a-input>
          </td>
          <td class="td-div">
            <div class="font-style">身份证号
               <span class="notNull-tip" >*</span>
            </div>
          </td>
          <td class="double">
            <a-input  v-model.trim="ApplyObj.sfzh" v-on:blur="idCheck()"></a-input>
          </td>
        </tr>

        <tr class="tr-style">
          <td class="td-div">
            <div class="font-style">曾用名</div>
          </td>
          <td class="double">
            <a-input  v-model.trim="ApplyObj.cym" v-on:blur="oldNameBule()"></a-input>
          </td>
          <td class="td-div">
            <div class="font-style">性别</div>
          </td>
          <td class="double">
            <a-radio-group v-model="ApplyObj.xbm" @change="onChangeSex" >
              <a-radio :value="1"> 男 </a-radio>
              <a-radio :value="2"> 女 </a-radio>
            </a-radio-group>
          </td>
        </tr>
        <tr class="tr-style">
          <td class="td-div">
            <div class="font-style">出生日期</div>
          </td>
          <td class="double">
			  <DatePickByCN
			        v-model="ApplyObj.csrq"
			        placeholder="请选择出生日期"
			      />
          </td>
          <td class="td-div">
            <div class="font-style">政治面貌</div>
          </td>
          <td class="double">
            <!-- 政治面貌下拉框 -->
            <a-select  :options="politic" placeholder="请选择" v-model="ApplyObj.zzmmm" />
          </td>
        </tr>

        <tr class="tr-style">
          <td class="td-div">
            <div class="font-style">籍贯</div>
          </td>
          <td class="double">
            <a-input  v-model.trim="ApplyObj.jg"></a-input>
          </td>
          <td class="td-div">
            <div class="font-style">民族</div>
          </td>
          <td class="double">
            <!-- 民族下拉框 -->
            <a-select  :options="nation" placeholder="请选择" v-model="ApplyObj.mzm" />
          </td>
        </tr>

        <tr class="tr-style">
          <td class="td-div">
            <div class="font-style">健康状况</div>
          </td>
          <td class="double">
            <!-- 健康状况下拉框 -->
            <a-select  :options="healthy" placeholder="请选择" v-model="ApplyObj.jkzkm" />
          </td>
          <td class="td-div">
            <div class="font-style">毕业学校</div>
          </td>
          <td class="double">
            <a-input  v-model.trim="ApplyObj.byxx"></a-input>
          </td>
        </tr>

        <tr class="tr-style">
          <td class="td-div">
            <div class="font-style">户口类别</div>
          </td>
          <td class="double">
            <!-- 户口类别下拉框 -->
            <a-select  :options="residence" placeholder="请选择" v-model="ApplyObj.hklbm" />
          </td>
          <td class="td-div">
            <div class="font-style">是否低保</div>
          </td>
          <td class="double">
            <a-radio-group v-model="ApplyObj.sfdb" @change="onChangezslx" >
              <a-radio :value="1"> 是 </a-radio>
              <a-radio :value="0"> 否 </a-radio>
            </a-radio-group>
          </td>
        </tr>

        <tr class="tr-style">
          <td class="td-div">
            <div class="font-style">招生类型</div>
          </td>
          <td class="double">
            <a-radio-group v-model="ApplyObj.zslx" @change="onChangezslx" >
              <a-radio :value="1"> 统一招生 </a-radio>
              <a-radio :value="2"> 自主招生 </a-radio>
            </a-radio-group>
          </td>
          <td class="td-div">
            <div class="font-style">准考证号</div>
          </td>
          <td class="double">
            <a-input  v-model.trim="ApplyObj.zkzh"></a-input>
          </td>
        </tr>

        <tr class="tr-style">
          <td class="td-div">
            <div class="font-style">考生号</div>
          </td>
          <td class="double">
            <a-input  v-model.trim="ApplyObj.ksh"></a-input>
          </td>
          <td class="td-div">
            <div class="font-style">考试总分</div>
          </td>
          <td class="double">
            <a-input  v-model.trim="ApplyObj.kszf" v-on:blur="numCheck()"></a-input>
          </td>
        </tr>
      </table>

      <table class="scanTable" style="text-align: left; margin-top: 20px">
        <tr>
          <td colspan="4" class="tr-color">
            <span class="title-style">报名信息</span>
          </td>
        </tr>

        <tr class="tr-style">
          <td class="td-div">
            <div class="font-style">专业部</div>
          </td>
          <td class="double">
            <a-select
              
              :options="addfaculty"
              placeholder="请选择"
              @change="addfacultyChange"
              v-model="ApplyObj.falId"
            />
          </td>
          <td class="td-div">
            <div class="font-style">专业</div>
          </td>
          <td class="double">
            <a-select class="input-style-replyTwo" :options="addspecialty" placeholder="请选择" v-model="ApplyObj.specId" />
            <a-button type="danger" style="margin-left: 10px;" @click="clearReplay">
              
              清除
            </a-button>
          </td>
        </tr>

        <tr class="tr-style">
          <td class="td-div">
            <div class="font-style">学制
             <span class="notNull-tip" >*</span>
            </div>
          </td>
          <td class="double">
            <a-select  :options="xuzhi" placeholder="请选择学制" v-model="ApplyObj.xz" />
          </td>
          <td class="td-div">
            <div class="font-style">就读方式</div>
          </td>
          <td class="double">
            <a-radio-group v-model="ApplyObj.jdfs" @change="onChangejdfs" >
              <a-radio :value="1"> 住校 </a-radio>
              <a-radio :value="2"> 走读 </a-radio>
            </a-radio-group>
          </td>
        </tr>
      </table>

      <table class="scanTable" style="text-align: left; margin-top: 20px">
        <tr>
          <td colspan="4" class="tr-color">
            <span class="title-style">联系方式</span>
          </td>
        </tr>

        <tr class="tr-style">
          <td class="td-div">
            <div class="font-style">户籍所在地</div>
          </td>
          <td colspan="3" class="double">
            <!-- 省份下拉框 -->
            <a-select
              class="input-style-replyTwo"
              :options="province"
              placeholder="请选择省份"
              @change="cityChange"
              v-model="ApplyObj.provinceId"
            />

            <!-- 市级下拉框 -->
            <a-select
              class="input-style-replyTwo"
              :options="city"
              placeholder="请选择市区"
              @change="countyChange"
              v-model="ApplyObj.cityId"
            />

            <!-- 县级下拉框 -->
            <a-select class="input-style-replyTwo" :options="county" placeholder="请选择县区" v-model="ApplyObj.countyId" />

            <a-button type="danger" style="margin-left: 10px;" @click="clearArea">
              
              清除
            </a-button>
          </td>
        </tr>

        <tr class="tr-style">
          <td class="td-div">
            <div class="font-style">家庭邮编</div>
          </td>
          <td class="double">
            <a-input  v-model.trim="ApplyObj.jtyb" v-on:blur="checkCode()"></a-input>
          </td>
          <td class="td-div">
            <div class="font-style font-style">家庭联系电话
              <span class="notNull-tip" >*</span>
            </div>
          </td>
          <td class="double">
            <a-input  v-model.trim="ApplyObj.jtlxdh" v-on:blur="phone()"></a-input> 
          </td>
        </tr>
        <tr class="tr-style">
          <td class="td-div">
            <div class="font-style font-style">详细家庭地址
                <span class="notNull-tip" >*</span>
            </div>
          </td>
          <td class="double">
            <a-input  v-model.trim="ApplyObj.jtdz" v-on:blur="adressCheck()"></a-input> 
          </td>
          <td class="td-div">
            <div class="font-style">学生联系电话</div>
          </td>
          <td class="double">
            <a-input  v-model.trim="ApplyObj.xslxdh" v-on:blur="phone()"></a-input>
          </td>
        </tr>

        <tr class="tr-style">
          <td class="td-div">
            <div class="font-style">电子邮箱</div>
          </td>
          <td class="double">
            <a-input  v-model.trim="ApplyObj.dzxx" v-on:blur="email()"></a-input>
          </td>
          <td class="td-div">
            <div class="font-style">即时通讯号</div>
          </td>
          <td class="double">
            <a-input  v-model.trim="ApplyObj.jstxh" v-on:blur="phone()"></a-input>
          </td>
        </tr>

        <tr>
          <td colspan="4" class="tr-color">
            <span class="title-style">其他信息</span>
          </td>
        </tr>

        <tr class="tr-style">
          <td class="td-div">
            <div class="font-style">特长</div>
          </td>
          <td colspan="3" class="double">
            <a-input  v-model="ApplyObj.tc"></a-input>
          </td>
        </tr>
      </table>
</template>
    </a-modal>
    <!-- end -->

  </div>
</template>


<script>
import { EduListMixin } from '@/mixins/EduListMixin'
import { Icon } from 'ant-design-vue'
//引入axios
import { axios } from '@/utils/request'

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2390461_f6v2cx4wmzq.js',
})

const columns = [
  {
    title: '姓名',
    dataIndex: 'XM',
    key: 'XM',
	fixed: 'left',
	width: 150,
  },
  {
    title: '身份证号',
    dataIndex: 'SFZH',
    key: 'SFZH',
	fixed: 'left',
	width: 250,
  },
  {
    title: '所属专业部',
    dataIndex: 'YXMC',
    key: 'YXMC',
	width: 150,
  },
  {
    title: '所属专业',
    dataIndex: 'ZYMC',
    key: 'ZYMC',
	width: 150,
  },
  {
    title: '考试总分',
    dataIndex: 'KSZF',
    key: 'KSZF',
	width: 150,
  },
  {
    title: '是否录取',
    dataIndex: 'isAdmit',
    key: 'isAdmit',
	width: 150,
  },
  {
    title: '性别',
    dataIndex: 'XBM',
    key: 'XBM',
	width: 150,
  },
  {
    title: '入学年份',
    dataIndex: 'RXNF',
    key: 'RXNF',
	width: 150,
  },
  {
    title: '招生季',
    dataIndex: 'ZSJ',
    key: 'ZSJ',
	width: 150,
  },
  {
    title: '学制',
    dataIndex: 'XZ',
    key: 'XZ',
	width: 150,
  },
  {
    title: '操作',
    dataIndex: 'operator',
    fixed: 'right',
    width: 200,
    key: 'operator',
    scopedSlots: {
      customRender: 'operator',
    },
  },
]

let data = []
//let selectId = [];

export default {
  mixins: [EduListMixin], // 引入模块
  data() {
    return {
      pagination: {
        current: 0,
        pageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['6', '10', '20'],
        showTotal: (total, range) => {
          return '显示' + range[0] + '到' + range[1] + '条, 共' + total + '条记录'
        },
        showQuickJumper: true,
        total: 0,
      },
      url: {
        list: 'enroll/ApplyMsgMng/exportModel',
        exportXlsUrl: 'enroll/ApplyMsgMng/exportTable',
        importExcelUrl: 'enroll/ApplyMsgMng/importExmlByFile',
      },
      //选中放入的数组
      selectedRowKeys: [],
      /* 页码 */
      currentPage: 1,
      pageSize: 10,
      /* 表格数据 */
      data,
      columns,
      /* 按钮大小 */
      size: 'small',
      /* 下拉框数据 */
      quarter: [],
      quarterId: [],
      faculty: [],
      facultyId: [],
      specialty: [],
      specialtyId: [],
      keys: [],
      keysVal: [],
      //是否被录取
      isAdmition: [],
      isAdmitionVal: [],
      /* 按条件搜索报到的数量 */
      reportCount: 0,
      /* 添加-弹出框数据 */
      visibleReport: false,
      visibleReportBySearch: false,
      visibleDelete: false,
      visible: false,
      visibleAdd: false,
      visibleEdit:false,
     
      upload: false,
      entityObj: {}, //弹窗对象
      entityObjTwo: {}, //弹窗对象二
      //搜索条件
      curQuarter: 0,
      curFaculty: 0,
      curSpecialty: 0,
      condit: '',
      isAdmit: 2,
      /* 关键词 */
      keyword: '',
      //添加弹窗的对象属性
        ApplyObj: {
        xbm: 1,
        sfdb: 1,
        jdfs: 1,
        zslx: 1,
        provinceId: '',
        cityId: '',
        countyId: '',
        specId: '',
        yxmc: '',
        zymc: '',
        province: '',
        city: '',
        county: '',
      }, //弹窗对象
      //下拉框数据
      addfaculty: [],
      addspecialty: [],
      province: [],
      city: [],
      county: [],
      xuzhi: [],
      politic: [],
      healthy: [],
      nation: [],
      residence: [], 
      falId: 0,
      specId: 0,
      provinceId: 0,
      cityId: 0,
      countyId: 0,
      //传参专业ID及名称
      tempSpecId: 0,
      tempzymc:null,
      //传参市区和县区以及ID
      tempcityId: 0,
      tempcity:null,
      tempcountyId: 0,
      tempcounty:null,
      //传参性别
      tempSex:null,
    }
  },
  mounted() {
    this.getStuList()
    this.getQuarter()
    this.getFaculty()
    this.addCondit()
    this.isAdmitQuery()
    //添加弹窗 启动方法
    this.getaddFaculty()
    this.getProvince()
    this.getXuzhi()
    this.getPolitic()
    this.getHealthy()
    this.getNation()
    this.getResidence()
    this.clearArea()
    this.clearReplay()
  },
  //关于全选与批量
  computed: {
    // 拼接导入
    importExcelUrl: function () {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    },
    rowSelection() {
      const selectedRowKeys = this.selectedRowKeys //常量
      return {
        selectedRowKeys,
        onChange: this.onSelectChange,
      }
    },
  },
  components: {
    IconFont,
  },
  methods: {
    //导出模板
    exportModel(){
      this.url.exportXlsUrl = 'enroll/ApplyMsgMng/exportModel';
      this.handleExportXls('报名信息导入模板');
      this.url.exportXlsUrl = 'enroll/ApplyMsgMng/exportTable';
    },

    //显示添加弹窗
    showAdd(){
      this.cancel();
       this.visibleAdd = true;
    },
    //start
    showMsg(a) {
      axios({
        url: 'enroll/reportMng/getInfoByID',
        method: 'post',
        params: {
          id: a.key,
        },
      })
        .then((res) => {
          this.entityObj = res.result
          this.entityObjTwo = a
          //数据加工处理
          let zslx = res.result.zslx == 1 ? '统一招生' : '自主招生'
          let jdfs = res.result.jdfs == 1 ? '住校' : '走读'
          let sfdb = res.result.sfdb == 1 ? '是' : '否'
    

          this.entityObj.zslx = zslx
          this.entityObj.jdfs = jdfs
          this.entityObj.sfdb = sfdb
     

        })
        .catch((err) => {
          this.$message.warning('获取招生信息失败')
        })
      this.visible = true
    },
     //start
     //展示编辑弹窗
    showEdit(a) {
      //先清空内容
      this.cancel();
      axios({
        url: 'enroll/ApplyMsgMng/getInfoByID',
        method: 'post',
        params: {
          id: a.key,
        },
      })
        .then((res) => {

        this.ApplyObj = res.result;
        this.tempSex=this.ApplyObj.xbm;
  
		console.log(this.ApplyObj.xbm)
		console.log(this.ApplyObj)

        //获取下拉框的值
       //回显专业部
       this.addfaculty.value= res.result.falId;
       this.addfaculty.label= res.result.yxmc;    
       this.tempcityId=res.result.cityId;
       this.tempcity=res.result.city;
       this.tempcountyId=res.result.countyId;
       this.tempcounty=res.result.county;  
 
      //联动获取专业（填充下拉框）赋值参数
       this.tempSpecId=res.result.specId;
       this.tempzymc=res.result.zymc;
       this.editfacultyChange(this.addfaculty.value);//填充再回显p
       //回显省份
       if(res.result.provinceId!=0){
          this.province.value= res.result.provinceId;
          this.province.label= res.result.province;      
       //联动获取市区
       //填充市区/县区并回显
       this.editcityChange(this.province.value);
       this.ApplyObj.xbm=Number(this.tempSex);
       this.visibleEdit = true

       }else{
            this.clearArea();
       }


        })
        .catch((err) => {
          this.$message.warning('获取招生信息失败')
        })
    },
    handleClose(e) {
      setTimeout(() => {
        this.visible = false;
        this.visibleAdd=false;
        this.visibleEdit=false;
      })
    },
    handlePrint(e) {
      this.visible = false
    },
    // end
    //显示导入弹窗
    showUpload() {
      this.upload = true
    },
    //关闭导入弹窗
    uploadCancel() {
      this.upload = false
    },
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    //清除
    clear() {
     
    },
    //清空
    empty() {
	  this.quarterId = []
	  this.facultyId = []
	  this.specialty = []
	  this.specialtyId = []
      this.keyword = ''
      this.keysVal = []
      this.isAdmitionVal = []
      this.clear()
    },
    //删除学生
    deleteStu() {
      let ids = ''

      for (let i = 0; i < this.selectedRowKeys.length; i++) {
        ids += this.selectedRowKeys[i]
        if (i != this.selectedRowKeys.length - 1) {
          ids += ','
        }
      }

      axios({
        url: 'enroll/reportMng/deleteStu',
        method: 'post',
        params: {
          ids: ids,
        },
      })
        .then((res) => {
          this.$message.success(res.result)
          this.refresh()
        })
        .catch((err) => {
          this.$message.warning('批量删除失败')
        })
    },
    //批量录取
    batchReport() {
      let ids = ''

      for (let i = 0; i < this.selectedRowKeys.length; i++) {
        ids += this.selectedRowKeys[i]
        if (i != this.selectedRowKeys.length - 1) {
          ids += ','
        }
      }

      axios({
        url: 'enroll/ApplyMsgMng/batchAdmit',
        method: 'post',
        params: {
          ids: ids,
        },
      })
        .then((res) => {

          this.$message.success(res.result)
          //清空勾选项
          this.selectedRowKeys = []
          this.getStuList()
        })
        .catch((err) => {
          this.$message.warning('批量录取失败')
        })
    },
    //根据条件批量录取
    batchReportBySearch() {
      let quarId = this.quarterId.length == 0 ? 0 : this.quarterId[0]
      let facuId = this.facultyId.length == 0 ? 0 : this.facultyId[0]
      let specId = this.specialtyId.length == 0 ? 0 : this.specialtyId[0]


      axios({
        url: 'enroll/ApplyMsgMng/batchAdmitBySearch',
        method: 'post',
        params: {
          quarterId: quarId,
          facultyId: facuId,
          specialtyId: specId,
        },
      })
        .then((res) => {
       
					this.$message.success(res.result);			
					this.getStuList();
        })
        .catch((err) => {
          this.$message.warning('按条件批量录取失败')
        })
    },
    search() {
      this.currentPage = 1
      this.curQuarter = this.quarterId.length == 0 ? 0 : this.quarterId[0]
      this.curFaculty = this.facultyId.length == 0 ? 0 : this.facultyId[0]
      this.curSpecialty = this.specialtyId.length == 0 ? 0 : this.specialtyId[0]
      this.condit = this.keysVal[0] == undefined ? 'XM' : this.keysVal[0]
      this.isAdmit = this.isAdmitionVal[0] == undefined ? 2 : this.isAdmitionVal[0]
			
      this.getStuList()
    },
     exportMessage(){
				this.curQuarter = this.quarterId.length == 0 ? 0 : this.quarterId[0]
      this.curFaculty = this.facultyId.length == 0 ? 0 : this.facultyId[0]
      this.curSpecialty = this.specialtyId.length == 0 ? 0 : this.specialtyId[0]
      this.condit = this.keysVal[0] == undefined ? 'XM' : this.keysVal[0]
      this.isAdmit = this.isAdmitionVal[0] == undefined ? 2 : this.isAdmitionVal[0]
				var conditions = {
						quarterId: this.curQuarter,
          facultyId: this.curFaculty,
          specialtyId: this.curSpecialty,
          keyword: this.keyword,
          condit: this.condit,
          isAdmit: this.isAdmit,
						 };
				var conditStr = JSON.stringify(conditions)
				
				this.handleExportXls("报名信息管理表",conditStr)
			},
    refresh() {
      this.selectedRowKeys = [];
      this.getStuList();
    },
    showModalAdmit() {
      if (this.selectedRowKeys.length == 0) {
        this.$message.warning('请选择要录取的学生！')
        return
      }

      this.visibleReport = true
    },
    handleOkReport() {
      this.batchReport()
      this.visibleReport = false
    },
    //关闭批量录取/按条件批量录取/删除窗口
    closePop(){
      this.visibleReport = false
      this.visibleReportBySearch = false
      this.visibleDelete = false
    },
    showModalAdmitBySearch() {
  

      let quarId = this.quarterId.length == 0 ? 0 : this.quarterId[0]
      let facuId = this.facultyId.length == 0 ? 0 : this.facultyId[0]
      let specId = this.specialtyId.length == 0 ? 0 : this.specialtyId[0]

	  if(quarId == 0){
		this.$message.warning("请选择条件！");
		return;
	  }
      axios({
        url: 'enroll/ApplyMsgMng/getCountBySearch',
        method: 'post',
        params: {
          quarterId: quarId,
          facultyId: facuId,
          specialtyId: specId,
        },
      })
        .then((res) => {
          this.reportCount = res.result;
					
					if(quarId == 0){
						this.pointOut = '（招生季不选则默认当前招生季）';
					}

					if(this.reportCount == 0){
						this.$message.warning("该条件没有可报到的学生！");
						return;
					}

					this.visibleReportBySearch = true;
        })
        .catch((err) => {
          this.$message.warning('搜索条件批量录取数量失败')
        })
      
    },
    handleOkReportBySearch() {
      this.batchReportBySearch()
      this.visibleReportBySearch = false
    },
    showModalDelete() {
      if (this.selectedRowKeys.length == 0) {
        this.$message.warning('请选择要删除的学生！')
        return
      }

      this.visibleDelete = true
    },
    handleOkDelete() {
      this.deleteStu()
      this.visibleDelete = false
    },
    //关于页码翻页
    tableChange(pagination) {
      /* , filters, sorter */
      this.pagination.current = pagination.current
      this.pagination.pageSize = pagination.pageSize
      this.currentPage = pagination.current
      this.pageSize = pagination.pageSize

      this.getStuList()
    },
    getStuList() {
      let currentPage = this.currentPage
      let pageSize = this.pageSize

      axios({
        url: 'enroll/ApplyMsgMng/applyMsgList',
        method: 'post',
        params: {
          quarterId: this.curQuarter,
          facultyId: this.curFaculty,
          specialtyId: this.curSpecialty,
          keyword: this.keyword,
          condit: this.condit,
          currentPage: currentPage,
          pageSize: pageSize,
          isAdmit: this.isAdmit,
        },
      })
        .then((res) => {
          data.splice(0, data.length)
          if(res.code==500){
            this.$message.warning(res.message)
            return;
          }
          for (let stu of res.result.list) {
            let sex = stu.xbm == 1 ? '男' : '女'
            let isAdmit = stu.isAdmit == 1 ? '已录取' : '未录取'
            data.push({
              key: stu.id,
              XM: stu.xm,
              SFZH: stu.sfzh,
              YXMC: stu.yxmc,
              ZYMC: stu.zymc,
              KSZF: stu.kszf,
              isAdmit: isAdmit,
              XBM: sex,
              RXNF: stu.rxnf,
              ZSJ: stu.zsj,
              XZ: stu.xz,
            })
          }
          this.pagination.current = currentPage
          this.pagination.total = res.result.count
        })
        .catch((err) => {
          this.$message.warning('获取学生列表失败')
        })
    },
    isAdmitQuery() {
      for (let k of [
        { value: 2, label: '全部' },
        { value: 1, label: '已录取' },
        { value: 0, label: '未录取' },
      ]) {
        this.isAdmition.push({
          value: k.value,
          label: k.label,
        })
      }
    },
    addCondit() {
      for (let k of [
        { value: 'XM', label: '姓名' },
        { value: 'SFZH', label: '身份证号' },
      ]) {
        this.keys.push({
          value: k.value,
          label: k.label,
        })
      }
    },

    getQuarter() {
      axios({
        url: 'enroll/reportMng/getQuarter',
        method: 'post',
        params: {},
      })
        .then((res) => {
          for (let quarter of res.result) {
            this.quarter.push({
              value: quarter.id,
              label: quarter.name,
            })
          }
        })
        .catch((err) => {
          this.$message.warning('获取招生季失败')
        })
    },
    getFaculty() {
      axios({
        url: 'enroll/reportMng/getFaculty',
        method: 'post',
        params: {},
      })
        .then((res) => {
          for (let faculty of res.result) {
            this.faculty.push({
              value: faculty.id,
              label: faculty.yxmc,
            })
          }
        })
        .catch((err) => {
          this.$message.warning('获取专业部失败')
        })
    },
    facultyChange(value) {

      this.specialty = []
      this.specialtyId = []

      if (value.length == 0) {
        return
      }

      axios({
        url: 'enroll/reportMng/getSpecialty',
        method: 'post',
        params: {
          facultyId: this.facultyId[0],
        },
      })
        .then((res) => {
          this.specialty.splice(0, this.specialty.length)
          for (let specialty of res.result) {
            this.specialty.push({
              value: specialty.id,
              label: specialty.zymc,
            })
          }
        })
        .catch((err) => {
          this.$message.warning('获取专业失败')
        })
    },

    //添加弹窗用到的方法（start）
     //添加窗口 确定按钮
    tip() {
      let xz = this.ApplyObj.xz 
      //获取院校名称
      for (let addfaculty of this.addfaculty) {
        if (addfaculty.value == this.ApplyObj.falId) {
          this.ApplyObj.yxmc = addfaculty.label
        }
      }
      //获取专业名称
      for (let addspecialty of this.addspecialty) {
        if (addspecialty.value == this.ApplyObj.specId) {
          this.ApplyObj.zymc = addspecialty.label
        }
      }
      if (this.ApplyObj.zymc == '') {
        this.$message.warning('请填完专业相关信息')
        return
      }
      //获取省
      for (let p of this.province) {
        if (p.value == this.ApplyObj.provinceId) {
          this.ApplyObj.province = p.label
        }
      }
      //获取市
      for (let c of this.city) {
        if (c.value == this.ApplyObj.cityId) {
          this.ApplyObj.city = c.label
        }
      }
      //获取县
      for (let c of this.county) {
        if (c.value == this.ApplyObj.countyId) {
          this.ApplyObj.county = c.label
        }
      }
      if (this.ApplyObj.county == '') {
        this.$message.warning('请填完户籍所在地信息')
        return
      }


      let xm = this.ApplyObj.xm
      let sfzh = this.ApplyObj.sfzh
      let jtdz = this.ApplyObj.jtdz
      let jtlxdh = this.ApplyObj.jtlxdh
	  let countyId = this.ApplyObj.countyId
	  let specId = this.ApplyObj.specId
      if (
        xm == '' ||
        xm == undefined ||
        sfzh == '' ||
        sfzh == undefined ||
        xz == '' ||
		countyId == '' ||
		specId == '' ||
        jtdz == '' ||
        jtdz == undefined ||
        jtlxdh == undefined ||
        jtlxdh == ''
      ) {
        this.$message.warning('请填完*号必填项')
        return
      } else {
        //出生日期格式修改
        if (this.ApplyObj.csrq == '' || this.ApplyObj.csrq == undefined) {
          this.ApplyObj.csrq == ''
        } else {
          let d = new Date(this.ApplyObj.csrq)
          let youWant = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
          this.ApplyObj.csrq = youWant
        }
        axios({
          url: 'enroll/ReplaceApply/addApply',
          method: 'post',
          params:this.ApplyObj,

        })
          .then((res) => {
            if(res.code==200){
                 this.$message.success(res.message);
                 this.getStuList();
                 this.cancel();
                 this.closePop();
                 return;
            }
                 this.$message.warning(res.message);

            
          })
          .catch((err) => {
            this.$message.warning("添加失败！");
          })
      }
    },

     //编辑弹窗用到的方法（start）
     //编辑窗口 确定按钮
    edit() {
      let xz = this.ApplyObj.xz 
      //获取院校名称
      for (let addfaculty of this.addfaculty) {
        if (addfaculty.value == this.ApplyObj.falId) {
          this.ApplyObj.yxmc = addfaculty.label
        }
      }
      //获取专业名称
      for (let addspecialty of this.addspecialty) {
        if (addspecialty.value == this.ApplyObj.specId) {
          this.ApplyObj.zymc = addspecialty.label
        }
      }
      if (this.ApplyObj.zymc == '') {
        this.$message.warning('请填完专业相关信息')
        return
      }
      //获取省
      for (let p of this.province) {
        if (p.value == this.ApplyObj.provinceId) {
          this.ApplyObj.province = p.label
        }
      }
      //获取市
      for (let c of this.city) {
        if (c.value == this.ApplyObj.cityId) {
          this.ApplyObj.city = c.label
        }
      }
      //获取县
      for (let c of this.county) {
        if (c.value == this.ApplyObj.countyId) {
          this.ApplyObj.county = c.label
        }
      }
      if (this.ApplyObj.county == '') {
        this.$message.warning('请填完户籍所在地信息')
        return
      }

      let xm = this.ApplyObj.xm
      let sfzh = this.ApplyObj.sfzh
      let jtdz = this.ApplyObj.jtdz
      let jtlxdh = this.ApplyObj.jtlxdh

      if (
        xm == '' ||
        xm == undefined ||
        sfzh == '' ||
        sfzh == undefined ||
        xz == '' ||
        jtdz == '' ||
        jtdz == undefined ||
        jtlxdh == undefined ||
        jtlxdh == ''
      ) {
        this.$message.warning('请填完*号必填项')
        return
      } else {
        //出生日期格式修改
        if (this.ApplyObj.csrq == '' || this.ApplyObj.csrq == undefined) {
          this.ApplyObj.csrq == ''
        } else {
          let d = new Date(this.ApplyObj.csrq)
          let youWant = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
          this.ApplyObj.csrq = youWant
        }
        axios({
          url: 'enroll/ReplaceApply/editApply',
          method: 'post',
          params:this.ApplyObj,

        })
          .then((res) => {
            if(res.code==200){
                 this.$message.success(res.message);
                 this.getStuList();
                 this.cancel();
                 this.closePop();
                 return;
            }
                 this.$message.warning(res.message);

            
          })
          .catch((err) => {
            this.$message.warning("编辑失败！");
          })
      }
   
      
    },

    //添加窗口 取消按钮
    cancel() {
      this.ApplyObj = {
        xbm: 1,
        sfdb: 1,
        jdfs: 1,
        zslx: 1,
        countyId: '',
        specId: '',

      }
      this.clearArea()
      this.clearReplay()
      this.visibleAdd=false;
      this.visibleEdit=false;
    },
    //数据校验环节
    //校验不为空
    nameBule() {
      let xm = this.ApplyObj.xm;
      if (xm != undefined && xm.length > 0) {
      } else {
        this.$message.warning('姓名不能为空');
      }
      this.oldNameBule()
    },
    //校验地址不为空
    adressCheck() {
      let jtdz = this.ApplyObj.jtdz
      if (jtdz != undefined && jtdz.length > 0) {
      } else {
        this.$message.warning('详细地址很重要，请详细填写')
      }
    },
    //曾用名校验
    oldNameBule() {
      let xm = this.ApplyObj.xm
      let cym = this.ApplyObj.cym

      if (cym != undefined && cym.length > 0 && xm != undefined && xm.length > 0 && xm == cym) {
        this.$message.warning('曾用名不能和姓名一致')
        //清空曾用名
        this.ApplyObj.cym = ''
      }
    },
    // 验证是否是邮箱
    email() {
      let dzxx = this.ApplyObj.dzxx
      let emailRule = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
      if (!emailRule.test(dzxx) && dzxx != undefined) {
        this.$message.warning('请输入正确的邮箱地址')
        //清空邮箱
        this.ApplyObj.dzxx = ''
      }
    },
    // 验证是否是手机号码
    phone() {
      let jtlxdh = this.ApplyObj.jtlxdh
      let jstxh = this.ApplyObj.jstxh
      let xslxdh = this.ApplyObj.xslxdh
      let phoneRule = /^[1][3,4,5,7,8][0-9]{9}$/
      if (!phoneRule.test(jtlxdh) && jtlxdh != undefined) {
        this.$message.warning('请输入正确的手机号码')
        //清空手机号
        this.ApplyObj.jtlxdh = '';
      }
      if (!phoneRule.test(jstxh) && jstxh != undefined) {
        this.$message.warning('请输入正确的手机号码')
        //清空手机号
        this.ApplyObj.jstxh = ''
      }
      if (!phoneRule.test(xslxdh) && xslxdh != undefined) {
        this.$message.warning('请输入正确的手机号码')
        //清空手机号
        this.ApplyObj.xslxdh = ''
      }
    },
    // 验证是否是身份证
    idCheck() {
      let sfzh = this.ApplyObj.sfzh
      let idRule = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[X])$)$/
      if (!idRule.test(sfzh) && sfzh != undefined) {
        this.$message.warning('请输入正确的身份证号')
        //清空身份证
        this.ApplyObj.sfzh = '';
      }
    },
    // 日期选择器
    onChangeDate(date, dateString) {
    },

    // 验证邮政编码
    checkCode() {
      let jtyb = this.ApplyObj.jtyb
      let codeRule = /^[1-9][0-9]{5}$/
      if (!codeRule.test(jtyb) && jtyb != undefined) {
        this.$message.warning('请输入正确的邮政编码')
        //清除邮政编码
        this.ApplyObj.jtyb = ''
      }
    },
    // 验证成绩
    numCheck() {
      let kszf = this.ApplyObj.kszf
      let numRule = /^[+-]?(0|([1-9]\d*))(\.\d{1})?$/
      if (!numRule.test(kszf) && kszf != undefined) {
        this.$message.warning('请输入正确的考试分数（仅一位小数）')
        //清除成绩
        this.ApplyObj.kszf = ''
        return
      }
      if (!(kszf > 0 && kszf <= 750)) {
        this.$message.warning('考试分数在0-750之间')
        //清除成绩
        this.ApplyObj.kszf = ''
      }
    },

    //选择性别
    onChangeSex() {
    },
    //选择是否低保
    onChangedb() {
    },
    //选择就读方式
    onChangejdfs() {
    },
    //选择招生类型
    onChangezslx() {
    },
    //清除专业下拉框
    clearReplay() {
      this.ApplyObj.falId = []
      this.ApplyObj.specId = []
      this.addspecialty = []
    },
    //清除户口下拉框
    clearArea() {
      this.ApplyObj.cityId = []
      this.ApplyObj.countyId = []
      this.ApplyObj.provinceId = []
      this.city = []
      this.county = []
    },
    //获取专业部
    getaddFaculty() {
      axios({
        url: 'enroll/reportMng/getFaculty',
        method: 'post',
        params: {},
      })
        .then((res) => {
          for (let addfaculty of res.result) {
            this.addfaculty.push({
              value: addfaculty.id,
              label: addfaculty.yxmc,
            })
          }
        })
        .catch((err) => {
          this.$message.warning('获取专业部失败')
        })
    },
    //获取联动专业
    async addfacultyChange(value) {
      this.addspecialty = []
      this.ApplyObj.specId = "";

      if (value.length == 0) {
        return
      }

      await axios({
        url: 'enroll/reportMng/getSpecialty',
        method: 'post',
        params: {
          facultyId: this.ApplyObj.falId,
        },
      })
        .then((res) => {
          this.addspecialty.splice(0, this.addspecialty.length)
          for (let addspecialty of res.result) {
            this.addspecialty.push({
              value: addspecialty.id,
              label: addspecialty.zymc,
            })
          }
        })
        .catch((err) => {
          this.$message.warning('获取专业失败')
        })
    },
  
    //获取政治面貌列表
    getPolitic() {
      axios({
        url: 'enroll/ApplyMsgMng/getSysDict',
        method: 'post',
        params: {
          dictCode: 'politic',
        },
      })
        .then((res) => {
          for (let politic of res.result) {
            this.politic.push({
              value: politic.id,
              label: politic.itemText,
            })
          }
        })
        .catch((err) => {
          this.$message.warning('获取政治面貌列表失败')
        })
    },
    //获取民族列表
    getNation() {
      axios({
        url: 'enroll/ApplyMsgMng/getSysDict',
        method: 'post',
        params: {
          dictCode: 'nation',
        },
      })
        .then((res) => {
          for (let nation of res.result) {
            this.nation.push({
              value: nation.id,
              label: nation.itemText,
            })
          }
        })
        .catch((err) => {
          this.$message.warning('获取民族列表失败')
        })
    },
    //获取户口类别列表
    getResidence() {
      axios({
        url: 'enroll/ApplyMsgMng/getSysDict',
        method: 'post',
        params: {
          dictCode: 'residence',
        },
      })
        .then((res) => {
          for (let residence of res.result) {
            this.residence.push({
              value: residence.id,
              label: residence.itemText,
            })
          }
        })
        .catch((err) => {
          this.$message.warning('获取户口类别列表失败')
        })
    },
    //获取健康状态列表
    getHealthy() {
      axios({
        url: 'enroll/ApplyMsgMng/getSysDict',
        method: 'post',
        params: {
          dictCode: 'healthy',
        },
      })
        .then((res) => {
          for (let healthy of res.result) {
            this.healthy.push({
              value: healthy.id,
              label: healthy.itemText,
            })
          }
        })
        .catch((err) => {
          this.$message.warning('获取健康状态列表失败')
        })
    },
    //获取省份列表
    getProvince() {
      axios({
        url: 'enroll/ApplyMsgMng/getProvince',
        method: 'post',
        params: {},
      })
        .then((res) => {
          for (let province of res.result) {
            this.province.push({
              value: province.id,
              label: province.name,
            })
          }
        })
        .catch((err) => {
          this.$message.warning('获取省份列表失败')
        })
    },
    //获取市区列表
    cityChange(value) {
      this.city = []
      this.county = []
      this.ApplyObj.cityId = []
      this.ApplyObj.countyId = []

      if (value.length == 0) {
        return
      }

      axios({
        url: 'enroll/ApplyMsgMng/getCity',
        method: 'post',
        params: {
          id: this.ApplyObj.provinceId,
        },
      })
        .then((res) => {
          this.city.splice(0, this.addspecialty.length)
          for (let city of res.result) {
            this.city.push({
              value: city.id,
              label: city.name,
            })
          }
        })
        .catch((err) => {
          this.$message.warning('获取市区失败')
        })
    },
    //获取县区
    countyChange(value) {
      this.county = []
      this.ApplyObj.countyId = []

      if (value.length == 0) {
        return
      }

      axios({
        url: 'enroll/ApplyMsgMng/getCity',
        method: 'post',
        params: {
          id: this.ApplyObj.cityId,
        },
      })
        .then((res) => {
          this.county.splice(0, this.addspecialty.length)
          for (let county of res.result) {
            this.county.push({
              value: county.id,
              label: county.name,
            })
          }
        })
        .catch((err) => {
          this.$message.warning('获取县区失败')
        })
    },
    //---------------编辑区域回显方法
    //编辑页面获取联动专业
    editfacultyChange(value) {
      this.addspecialty = []
      this.ApplyObj.specId = "";
      if (value.length == 0) {
        return
      }

     axios({
        url: 'enroll/reportMng/getSpecialty',
        method: 'post',
        params: {
          facultyId: this.ApplyObj.falId,
        },
      })
        .then((res) => {
          this.addspecialty.splice(0, this.addspecialty.length)
          for (let addspecialty of res.result) {
            this.addspecialty.push({
              value: addspecialty.id,
              label: addspecialty.zymc,
            })
          }
          //数据回显
          this.ApplyObj.specId=this.tempSpecId;
          this.addspecialty.label=this.tempzymc;
          
        })
        .catch((err) => {
          this.$message.warning('获取专业失败')
        })
    },
     //编辑区域获取市区列表
    editcityChange(value) {
      this.city = []
      this.county = []
      this.ApplyObj.cityId = ""
      this.ApplyObj.countyId = ""

      if (value.length == 0) {
        return
      }

      axios({
        url: 'enroll/ApplyMsgMng/getCity',
        method: 'post',
        params: {
          id: this.ApplyObj.provinceId,
        },
      })
        .then((res) => {
          this.city.splice(0, this.addspecialty.length)
          for (let city of res.result) {
            this.city.push({
              value: city.id,
              label: city.name,
            })
          }
          //回显工作
          this.ApplyObj.cityId=this.tempcityId;
          this.city.label=this.tempcity;
          //获取县区
           this.county.value=  this.ApplyObj.cityId;
  
       this.editcountyChange(this.county.value);//填充再回显
        })
        .catch((err) => {
          this.$message.warning('获取市区失败')
        })
    },
    //编辑获取获取县区
    editcountyChange(value) {
      this.county = []
      this.ApplyObj.countyId = ""

      if (value.length == 0) {
        return
      }

      axios({
        url: 'enroll/ApplyMsgMng/getCity',
        method: 'post',
        params: {
          id: value,
        },
      })
        .then((res) => {
          this.county.splice(0, this.addspecialty.length)
          for (let county of res.result) {
            this.county.push({
              value: county.id,
              label: county.name,
            })
          }
          //回显工作
          this.ApplyObj.countyId=this.tempcountyId;

          this.county.label=this.tempcounty;
        })
        .catch((err) => {
          this.$message.warning('获取县区失败')
        })
    },
    //--------------------------------------------------
    //获取学制
    getXuzhi() {
      axios({
        url: 'enroll/ApplyMsgMng/getXuezi',
        method: 'post',
        params: {},
      })
        .then((res) => {
          for (let xuzhi of res.result) {
            this.xuzhi.push({
              value: xuzhi.id,
              label: xuzhi.xzmc,
            })
          }
        })
        .catch((err) => {
          this.$message.warning('获取学制列表失败')
        })
    },
    //(end)

    //导出的方法
    myExport(){
      // this.sign=1;
    }
  },
}
</script>
<style scoped>

.import-tr{
  width: 1030px;
}

.left-td{
  background-color: #f5f5f5;
  width: 100px;
  height: 50px;
  border: 1px solid #e5e5e5;
font-size: 18px;
font-family: Microsoft YaHei;
font-weight: 700;
color: #666666;
line-height: 24px;
}

.right-td{
  border: 1px solid #e5e5e5;
font-size: 18px;
font-family: Microsoft YaHei;
font-weight: 700;
color: #666666;
line-height: 24px;
  width: 230px;
  height: 50px;
}

.pad-style{
  margin-left: 10px; 
  margin-top: 5px; 
  margin-bottom: 5px;
}

.orange-font{
  height: 20px;
font-size: 18px;
font-family: Microsoft YaHei;
font-weight: 700;
color: #FC8950;
line-height: 28px;
}

.pointout-apply-div {
  width: 1030px;
  height: 185px;
  background-color: #dee2e6;
}

.font-apply-div {
  width: 1030px;
  height: 29px;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 700;
  color: #3581a6;
  line-height: 28px;
  margin-left: 15px;
}

.choose-file-btn{
  width: 124px;
height: 34px;
color: white;
  background: #00BAD0;
border-radius: 5px;
}

.choose-file-btn,
.choose-file-btn:hover,
.choose-file-btn:active,
.choose-file-btn:focus {
  color: white;
  background-color: #00bad0;
}

.tb {
  text-align: left;
}

/* 标题样式 */
.title-style {
  width: 76px;
  height: 19px;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 700;
  margin-left: 23px;
  color: #ffffff;
  line-height: 24px;
}
/* 字体样式1 */
/* .font-style {
  margin-left: 21px;
  width: 123px;
  height: 18px;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 700;
  color: #666666;
  line-height: 24px;


} */
/* 
.input-style-reply {
  font-size: 18px;
  color: #666666;
  width: 300px;
  background-color: #ffffff;
  border: 0;
  margin-left: 5px;
}
.input-style-replyTwo {
  font-size: 18px;
  color: #666666;
  width: 200px;
  background-color: #ffffff;
  border: 0;
  margin-left: 5px;
} */
/* 
.td-div {
  width: 259px;
} */

/* .btn {
  width: 100px;
  height: 40px;
  background: #0098f8;
  border-radius: 5px;
  font-size: 18px;
  font-family: Microsoft YaHei;
  color: #ffffff;
} */

/* .btn-div {
  width: 100%;
} */

.btn-style {
  width: 100px;
  height: 40px;
  margin-bottom: 33px;
  margin-top: 30px;
}

.top-div {
  margin-top: 22px;
}

/* .ant-input {
  width: 300px;
  height: 40px;
} */

.r-style {
  font-size: 18px;
}

.icon-img {
  margin-bottom: 5px;
  margin-right: 1px;
}

.notNull-tip {
  height: 19px;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 700;
  color: #a83939;
  line-height: 24px;
}

  .applyexport-button{
	width: 88px;
	height: 34px;
	background: #00D09D;
	border-radius: 5px;
	margin-left: 10px;
}

.applyexport-button,
.applyexport-button:hover,
.applyexport-button:active,
.applyexport-button:focus {
    color: white;
    background-color: #00D09D;
}

.applyMngAdd-button {
  width: 88px;
  height: 34px;
  background: #00bad0;
  border-radius: 5px;
}

.applyMngAdd-button,
.applyMngAdd-button:hover,
.applyMngAdd-button:active,
.applyMngAdd-button:focus {
    color: white;
    background-color: #00bad0;
}
</style>

