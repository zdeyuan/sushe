<template>
	<div class="edit_form">
		<!-- 编辑页
               <a-row>
              <a-col :span="12"> </a-col>
              <a-col :span="12"> </a-col>
            </a-row>-->
		<edu-form :title="'设置' + checkItem.name + '项目指标'" @ok="createData()" @cancel="handelCancel">
			 <a-transfer
			 :list-style="{
			   width: '45%',
			   height: '300px',
			 }"
			        :data-source="dataSource"
			        :target-keys="targetKeys"
			        :render="item => item.title"
			        @change="handleChange"
			    />
		</edu-form>
	</div>
</template>

<script>
	import veStuCheckItemNormApi from '../../../api/veStuCheckItemNormApi';
	import veStuCheckNormApi from '../../../api/veStuCheckNormApi';

	export default {
		components: {},
		data() {
			const data = {
				veStuCheckItemNormVo: this.resetveStuCheckItemNormVo(),
				textMap: {
					update: '编辑-项目指标表',
					create: '新增-项目指标表'
				},
				dialogStatus: 'create',
				treeList: [],
				defalutSetting: {
					check: {
						enable: true,
						chkStyle: 'checkbox',
						chkboxType: {
							Y: '',
							N: ''
						}
					}
				},
				// 树结构数据
				treeData: [],
				// 数据源
				dataSource: [],
				// 已选中的 key
				targetKeys: [],
				tempSelectedKeys:[],
				veStuCheckItemNormRules: {},
				checkItem: {}
			};
			return data;
		},
		mounted() {
			 this.initData();
		},
		methods: {
			// 将树结构数据扁平化
			    flattenTree(treeData) {
			      const result = [];
			      const flatten = (nodes) => {
			        nodes.forEach(node => {
			          result.push({
			            key: node.key,
			            title: node.title,
			          });
			          if (node.children) {
			            flatten(node.children);
			          }
			        });
			      };
			      flatten(treeData);
			      return result;
			    },
			    // 处理 Transfer 组件的 change 事件
			    handleChange(targetKeys, direction, moveKeys) {
			      this.targetKeys = targetKeys;
				  this.saveSelectedItems(targetKeys)
			    },
				saveSelectedItems(selectedKeys) {
					// 将选中的key转换为normId数组
					const normIds = selectedKeys.map(key => parseInt(key));
					this.tempSelectedKeys=normIds;
				},
				initData() {
					veStuCheckNormApi.all({}).then(res => {
						// this.treeList = res.result;
						// this.dataSource = this.flattenTree(this.treeList);
						this.dataSource = res.result.map(item => ({
								key: item.id.toString(),
								title: item.name,
								description: item.description
							}));
					});
				},
			/**
			 * @msg: 重置数据
			 */
			resetveStuCheckItemNormVo() {
				return {
					itemId: '', // 项目Id
					normId: '', // 指标Id
					listSort: '', // 排序
					status: '' // 是否禁用 0为否 1为是
				};
			},
			/**
			 * @msg: 初始化新增
			 */
			doCreate(row) {
				this.checkItem = row;
				this.dialogStatus = 'create';
				this.veStuCheckItemNormVo = this.resetveStuCheckItemNormVo();
				const sub =  {
					itemId: row.id
				}
				veStuCheckItemNormApi.all(sub).then(res => {
					const datas = res.result;
					this.targetKeys = datas.map(item => item.id.toString());
					this.tempSelectedKeys = [...this.targetKeys];
				});
			},
			/**
			 * @msg: 编辑页取消
			 */
			handelCancel() {
				this.$emit('onCancel');
			},
			/**
			 * @msg: 获取提交的数据 新增和 修改复用
			 */
			getSubData(isUpdate) {
				if (this.tempSelectedKeys.length == 0) {
					return null;
				}

				const tempData = {
					itemId: this.checkItem.id,
					ids: this.tempSelectedKeys
				};
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
				veStuCheckItemNormApi.add(subData).then(res => {
					this.$notification.success({
						message: '数据新增成功',
						description: '新增了一条数据'
					});
					this.$emit('onOk');
				});
			}
		}
	};
</script>
<style lang="less" scoped></style>