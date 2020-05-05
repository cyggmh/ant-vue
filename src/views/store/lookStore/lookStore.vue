<template>
  <page-view :title="title">
    <div slot="action">
      <a-button icon="undo" @click="() => { this.$router.go(-1) }">返回</a-button>
    </div>
    <ez-view>
      <div slot="body">
        <a-card :bordered="false">
          <a-form :form="form" style="width: 100%">
            <detail-list title="基本信息">
              <a-form-item style="display:none;">
                <a-input
                  :disabled="disabled"
                  v-decorator="[
                    'id',
                    { initialValue: data.id}
                  ]"
                  placeholder="请输入内容" />
              </a-form-item>
            </detail-list>
            <a-row :gutter="48">
              <a-col :span="6">
                <a-form-item label="商品名称*">
                  <a-input
                    :disabled="disabled"
                    v-decorator="[
                      'goodsName',
                      {rules: [{ required: true, message: '请输入商品名称' }],
                       initialValue: data.goodsName}
                    ]"
                    placeholder="请输入商品名称" />
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item label="支付类型">
                  <a-select
                    :disabled="disabled"
                    v-decorator="[
                      'goodsPayType',
                      {rules: [{ required: true, message: '请选择支付类型' }],
                       initialValue: data.goodsPayType}
                    ]"
                    placeholder="请选择支付类型">
                    <a-select-option v-for="(item, index) in goodsPayTypeList" :key="index" :label="item" :value="item">{{ item }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item label="商品库存">
                  <a-input
                    :disabled="disabled"
                    v-decorator="[
                      'goodsStock',
                      {rules: [{ required: true, message: '请输入商品库存' }],
                       initialValue: data.goodsStock}
                    ]"
                    placeholder="请输入商品库存" />
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item label="商品价格">
                  <a-input
                    :disabled="disabled"
                    v-decorator="[
                      'goodsPrice',
                      {rules: [{ required: true, message: '请输入商品价格' }],
                       initialValue: data.goodsPrice}
                    ]"
                    placeholder="请输入商品价格" />
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item label="商品图片" style="height: 300px;">
                  <a-select
                    :disabled="disabled"
                    dropdownStyle="height: 200px;border: none;"
					style="border: none;"
                    v-decorator="[
                      'goodsImage',
                      {rules: [{ required: true, message: '请选择商品图片' }],
                       initialValue: data.goodsImage}
                    ]"
                    placeholder="请选择商品图片">
                    <a-select-option
                      v-for="(item, index) in imagesList"
                      :key="index"
                      :label="item.url"
                      :value="item.url"
                      style="height: 200px;"
                      dropdownStyle="height: 200px;">
                      <img :src="item.url" style="height: 200px;" />
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item label="状态">
                  <a-select
                    :disabled="disabled"
                    v-decorator="[
                      'goodsState',
                      {rules: [{ required: true, message: '请选择商品状态' }],
                       initialValue: data.goodsState}
                    ]"
                    placeholder="请选择商品状态">
                    <a-select-option  label="启用" value="1">启用</a-select-option>
                    <a-select-option  label="未启用" value="0">未启用</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col>
                <a-form-item label="商品简介">
                  <a-textarea
                    :disabled="disabled"
                    v-decorator="[
                      'goodsSynopsis',{rules: [{ required: true, message: '请输入商品简介' }],initialValue: data.goodsSynopsis}
                    ]"
                    placeholder="请输入商品简介"
                    :rows="4" />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
          <detail-list style="display: flex;flex-direction: row;justify-content: center;">
            <a-button @click="() => { this.$router.go(-1) }" v-show="disabled" style="margin: 0 10px;">返回</a-button>
            <a-button @click="() => { this.$router.go(-1) }" v-show="!disabled" style="margin: 0 10px;">取消</a-button>
            <a-button type="primary" style="margin: 0 10px;" v-show="!disabled" @click="handsubmit">提交</a-button>
          </detail-list>
        </a-card>
      </div>
    </ez-view>
  </page-view>
</template>

<script>
	import moment from 'moment'
	import {
		PageView
	} from '@/layouts'
	import {
		STable
	} from '@/components/antpro'
	import DetailList from '@/components/antpro/tools/DetailList'
	import * as BaseGlobal from '@/global/BaseGlobal'
	// import HosApi from '../../../../../common/api/mps/hospital/hosApi'
	// import PresApi from '../../../../../common/api/mps/prescription/presApi'
	import goodsApi from '../../../common/api/guild/goodsApi'
	import imagesApi from '../../../common/api/guild/imagesApi'
	const DetailListItem = DetailList.Item

	export default {
		components: {
			PageView,
			DetailList,
			DetailListItem,
			STable
		},
		data () {
			return {
				dateFormat: 'YYYY-MM-DD',
				goodsPayTypeList: ['微光', '光尘', '银币'],
				imagesList: [],
				options: [],
				data: {
					id: null,
					goodsName: '',
					goodsPayType: '',
					goodsStock: '',
					goodsPrice: '',
					goodsImage: '',
					goodsSynopsis: '',
					goodsState: ''
				},
				parameter: {
					id: ''
				},
				natures: {},
				disabled: true,
				readonly: true,
				subshow: false,
				subm: false,
				form: this.$form.createForm(this)
			}
		},
		mounted () {
			imagesApi.imagesGoods({
				data: ''
			}).then(res => {
				this.imagesList = res.data
			})
			this.parameter.id = this.$route.query.id
			this.validList = BaseGlobal.validList
			this.signList = BaseGlobal.signList
			this.appAccountStatusList = BaseGlobal.appAccountStatusList
			this.genderList = BaseGlobal.genderList
			const look = this.$route.query.state
			this.disabled = look === 'look'
			this.readonly = look === 'look'
			if (look === 'look') {
				this.subshow = true
				this.subm = false
			} else {
				this.subm = true
			}
			if (BaseGlobal.isNotEmpty(this.parameter.id) && this.parameter.id !== 0) {
				this.getData()
			}
		},
		methods: {
			moment,
			handsubmit () {
				// const self = this
				this.form.validateFields(err => {
					if (!err) {
						const data = this.form.getFieldsValue()
						console.log(data)
						// data.district = data.district.join(',')
						this.$ez.fun.formDataFormat(data, ['validityPeriod'])
						if (BaseGlobal.isNotEmpty(this.parameter.id) && this.parameter.id !== 0) {
							goodsApi.goodsUpdate({
								data: data
							}).then(res => {
								if (res.code === 200) {
									this.$message.success('编辑成功')
									this.$router.go(-1)
								} else {
									this.$message.error('编辑失败，请重试')
								}
							})
						} else {
							goodsApi.goodsAdd({
								data: data
							}).then(res => {
								if (res.code === 200) {
									this.$message.success('添加成功')
									this.$router.go(-1)
								} else {
									this.$message.error('添加失败，请重试')
								}
							})
						}
					} else {
						this.$message.error('新增任务信息未填写完善，重试！')
					}
				})
			},
			getData () {
				goodsApi.goodsInfo({
					data: this.parameter
				}).then(res => {
					console.log(res.data)
					this.data.id = res.data.id
					this.data.goodsName = res.data.goodsName
					this.data.goodsPayType = res.data.goodsPayType
					this.data.goodsStock = res.data.goodsStock
					this.data.goodsPrice = res.data.goodsPrice
					this.data.goodsImage = res.data.goodsImage
					this.data.goodsSynopsis = res.data.goodsSynopsis
					this.data.goodsState = res.data.goodsState
				})
			},
			phoneCheck (rule, value, callbackFn) {
				const reg = /^[0-9]*$/
				if (!reg.test(value)) {
					callbackFn('电话号码格式不正确')
					return
				}
				callbackFn()
			}
		},
		filters: {
			statusFilter (status) {
				const statusMap = {
					'processing': '进行中',
					'success': '完成',
					'failed': '失败'
				}
				return statusMap[status]
			}
		},
		computed: {
			title () {
				return this.$route.meta.title
			}
		}

	}
</script>

<style lang="less" scoped>
	.title {
		color: rgba(0, 0, 0, .85);
		font-size: 16px;
		font-weight: 500;
		margin-bottom: 16px;
	}
</style>
