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
                <a-form-item label="奖励名称*">
                  <a-input
                    :disabled="disabled"
                    v-decorator="[
                      'rewardName',
                      {rules: [{ required: true, message: '请输入奖励名称' }],
                       initialValue: data.rewardName}
                    ]"
                    placeholder="请输入奖励名称" />
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item label="奖励类型">
                  <a-select
                    :disabled="disabled"
                    v-decorator="[
                      'rewardType',
                      {rules: [{ required: true, message: '请选择奖励类型' }],
                       initialValue: data.rewardType}
                    ]"
                    placeholder="请选择奖励类型">
                    <a-select-option v-for="(item, index) in taskTypeList" :key="index" :label="item" :value="item">{{ item }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item label="奖励数量">
                  <a-input
                    :disabled="disabled"
                    v-decorator="[
                      'rewardNumber',
                      {rules: [{ required: true, message: '请输入奖励数量' }],
                       initialValue: data.rewardNumber}
                    ]"
                    placeholder="请输入奖励数量" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col>
                <a-form-item label="奖励内容">
                  <a-textarea
                    :disabled="disabled"
                    v-decorator="[
                      'rewardContent',{rules: [{ required: true, message: '请输入奖励内容' }],initialValue: data.rewardContent}
                    ]"
                    placeholder="请输入奖励内容"
                    :rows="4" />
                </a-form-item>
              </a-col>
            </a-row>
            <detail-list title="">
            </detail-list>
            <a-row :gutter="48">
              <a-col :span="6">
                <a-form-item label="奖励时间范围">
                  <a-range-picker
                    v-if="data.convertEndTime !== ''"
                    :disabled="disabled"
                    :default-value="[moment(moment(data.convertStartTime).format('YYYY-MM-DD'), dateFormat), moment(moment(data.convertEndTime).format('YYYY-MM-DD'), dateFormat)]"
                    :format="dateFormat"
                    @change="onChange" />
                </a-form-item>
                <!-- <a-form-item
                  label="开始时间">
                  <a-date-picker @change="onChange" />
                  <a-select
                    :disabled="disabled"
                    v-decorator="[
                      'taskStartTime',
                      {rules: [{ required: true, message: '请输入开始时间' }],initialValue: data.taskStartTime}
                    ]"
                    placeholder="请选择开始时间">
                    <a-select-option
                      v-for="(item, index) in levels"
                      :key="index"
                      :label="item.displayValue"
                      :value="item.id"
                    >{{ item.displayValue }}</a-select-option>
                  </a-select>
                </a-form-item> -->
              </a-col>
              <!-- <a-col :span="6">
                <a-form-item
                  label="结束时间">
                  <a-select
                    :disabled="disabled"
                    v-decorator="[
                      'taskEndTime',{rules: [{ required: true, message: '请输入结束时间' }],initialValue: data.taskEndTime}
                    ]"
                    placeholder="请选择结束时间">
                    <a-select-option
                      v-for="(item, index) in natures"
                      :key="index"
                      :label="item.displayValue"
                      :value="item.id"
                    >{{ item.displayValue }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col> -->
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
import rewardApi from '../../../common/api/guild/rewardApi'
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
				taskTypeList: ['微光', '光尘', '银币'],
				options: [],
				data: {
					id: null,
					rewardName: '',
					rewardContent: '',
					rewardType: '',
					rewardNumber: '',
					convertStartTime: '',
					convertEndTime: ''
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
			} else {
					this.data.convertStartTime = moment().format('YYYY-MM-DD')
					this.data.convertEndTime = moment().subtract(-2, 'days').format('YYYY-MM-DD')
			}
		},
		methods: {
			moment,
			handsubmit () {
				// const self = this
				this.form.validateFields(err => {
					if (!err) {
						const data = this.form.getFieldsValue()
						data.convertStartTime = this.data.convertStartTime
						data.convertEndTime = this.data.convertEndTime
						console.log(data)
						// data.district = data.district.join(',')
						this.$ez.fun.formDataFormat(data, ['validityPeriod'])
						if (BaseGlobal.isNotEmpty(this.parameter.id) && this.parameter.id !== 0) {
							rewardApi.rewardUpdate({
								data: data }).then(res => {
									if (res.code === 200) {
										this.$message.success('编辑成功')
										this.$router.go(-1)
										} else {
											this.$message.error('编辑失败，请重试')
										}
								})
						} else {
							rewardApi.rewardAdd({
								data: data }).then(res => {
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
			onChange (date, dateString) {
				this.data.taskStartTime = dateString[0]
				this.data.taskEndTime = dateString[1]
			},
			getData () {
				rewardApi.rewardInfo({
					data: this.parameter
				}).then(res => {
					console.log(res.data)
					this.data.id = res.data.id
					this.data.rewardName = res.data.rewardName
					this.data.rewardType = res.data.rewardType
					this.data.rewardContent = res.data.rewardContent
					this.data.rewardNumber = res.data.rewardNumber
					this.data.convertStartTime = res.data.convertStartTime
					this.data.convertEndTime = res.data.convertEndTime
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
