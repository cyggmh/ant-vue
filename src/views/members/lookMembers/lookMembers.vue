<template>
  <page-view :title="title">
    <div slot="action">
      <a-button icon="undo" @click="() => { this.$router.go(-1) }">返回</a-button>
    </div>
    <ez-view>
      <div slot="body">
        <a-card :bordered="false">
          <a-form :form="form" style="width: 100%" >
            <detail-list title="基本信息">
              <a-form-item
                style="display:none;">
                <a-input
                  :disabled="disabled"
                  v-decorator="[
                    'hospId',
                    { initialValue: data.hospId}
                  ]"
                  placeholder="请输入内容"
                />
              </a-form-item>
            </detail-list>
            <a-row :gutter="48">
              <a-col :span="6">
                <a-form-item
                  label="名称">
                  <a-input
                    :disabled="disabled"
                    v-decorator="[
                      'hospCode',
                      {rules: [{ required: true, message: '名称' }],
                       initialValue: data.hospCode}
                    ]"
                    placeholder="请输入内容"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item
                  label="赛季等级">
                  <a-input
                    :disabled="disabled"
                    v-decorator="[
                      'hospName',
                      {rules: [{ required: true, message: '赛季等级' }],
                       initialValue: data.hospName}
                    ]"
                    placeholder="请输入内容"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item label="总光等">
                  <a-input
                    :disabled="disabled"
                    v-decorator="[
                      'districtName',
                      {rules: [{ required: true, message: '请输入所属区县' }],
                       initialValue: data.districtName}
                    ]"
                    placeholder="请输入内容"
                  />
                  <!-- <a-cascader
                    :disabled="disabled"
                    v-decorator="[
                      'districtId',
                      {rules: [{ required: true, message: '请输入所属区县' }],
                       initialValue: data.districtId}
                    ]"
                    :options="options"
                    placeholder="请选择"
                    @change="onChanges"
                    changeOnSelect
                  /> -->
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col>
                <a-form-item
                  label="个人简介">
                  <a-textarea
                    :disabled="disabled"
                    v-decorator="[
                      'directions',{initialValue: data.description}
                    ]"
                    placeholder="请输入内容"
                    :rows="4" />
                </a-form-item>
              </a-col>
            </a-row>
            <detail-list title="基本信息">
            </detail-list>
            <a-row :gutter="48">
              <a-col :span="6">
                <a-form-item
                  label="微光">
                  <a-input
                    :disabled="disabled"
                    v-decorator="[
                      'abridge',
                      {rules: [{ required: true, message: '请输入简称' }],initialValue: data.abridge}
                    ]"
                    placeholder="请输入内容"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item
                  label="银币">
                  <a-select
                    :disabled="disabled"
                    v-decorator="[
                      'levelId',
                      {rules: [{ required: true, message: '请输入级别' }],initialValue: data.levelId}
                    ]"
                    placeholder="请选择">
                    <a-select-option
                      v-for="(item, index) in levels"
                      :key="index"
                      :label="item.displayValue"
                      :value="item.id"
                    >{{ item.displayValue }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item
                  label="光尘">
                  <a-select
                    :disabled="disabled"
                    v-decorator="[
                      'hospNatureId',{initialValue: data.hospNatureId}
                    ]"
                    placeholder="请选择">
                    <a-select-option
                      v-for="(item, index) in natures"
                      :key="index"
                      :label="item.displayValue"
                      :value="item.id"
                    >{{ item.displayValue }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="48">
              <a-col :span="6">
                <a-form-item
                  label="恶行分数">
                  <a-input
                    :disabled="disabled"
                    step="0"
                    :maxLength="11"
                    v-decorator="[
                      'phone',{rules: [{ required: true, message: '请输入电话' },{validator:phoneCheck.bind(this)}],initialValue: data.phone}
                    ]"
                    placeholder="请输入手机号"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item
                  label="英勇分数">
                  <a-input
                    :disabled="disabled"
                    v-decorator="[
                      'address',{rules: [{ required: true, message: '请输入地址' }],initialValue: data.address}
                    ]"
                    placeholder="请输入内容"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item
                  label="荣耀分数">
                  <a-input
                    :disabled="disabled"
                    v-decorator="[
                      'address',{rules: [{ required: true, message: '请输入地址' }],initialValue: data.address}
                    ]"
                    placeholder="请输入内容"
                  />
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
      options: [],
      data: {
        hospId: '',
        hospCode: '',
        hospName: '',
        district: '',
        districtName: '',
        directions: '',
        abridge: '',
        address: '',
        level: '',
        hospNature: '',
        phone: '',
        presentation: '',
        isvalid: '1',
        signStatus: '0',
        community: ''
      },
      parameter: {
        id: ''
      },
      levels: {},
      natures: {},
      signList: '',
      validList: '',
      appAccountStatusList: '',
      genderList: '',
      disabled: true,
      readonly: true,
      subshow: false,
      subm: false,
      form: this.$form.createForm(this)
    }
  },
  mounted () {
    this.getSelregions()
    const self = this
    this.$ez.fun.getDictVByCode(30, res => {
      self.levels = res.data
    })
    this.$ez.fun.getDictVByCode(40, res => {
      self.natures = res.data
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
    handsubmit () {
      // const self = this
      this.form.validateFields(err => {
        if (!err) {
          const data = this.form.getFieldsValue()
          data.district = data.district.join(',')
          this.$ez.fun.formDataFormat(data, ['validityPeriod'])
          // if (BaseGlobal.isNotEmpty(this.parameter.id) && this.parameter.id !== 0) {
          //   HosApi.update({
          //     data: data,
          //     success: res => {
          //       this.$message.success('编辑成功')
          //       self.$router.go(-1)
          //     }
          //   })
          // } else {
          //   HosApi.add({
          //     data: data,
          //     success: res => {
          //       this.$message.success('添加成功')
          //       self.$router.go(-1)
          //     }
          //   })
          // }
        } else {
          this.$message.error('新增医院信息未填写完善，重试！')
        }
      })
    },
    getSelregions () {
      // PresApi.getSelregion({
      //   data: {
      //     level: 2,
      //     id: 31196
      //   }
      // }).then(res => {
      //   console.log(res)
      //   this.options = res.data
      // })
    },
    onChanges (value) {
      console.log(value)
      this.parameter.districtId = value[value.length - 1]
    },
    getData () {
      // HosApi.getInfo({
      //   data: this.parameter,
      //   success: res => {
      //     this.data.hospCode = res.data.hospCode
      //     this.data.hospName = res.data.hospName
      //     this.data.districtName = res.data.districtName
      //     this.data.hospNatureId = res.data.hospNatureId
      //     this.data.levelId = res.data.levelId
      //     this.data.district = res.data.district
      //     this.data.districtId = res.data.districtId
      //     this.data.directions = res.data.directions
      //     this.data.district = res.data.district.split(',')
      //     this.data.abridge = res.data.abridge
      //     this.data.address = res.data.address
      //     this.data.level = res.data.level
      //     this.data.hospNature = res.data.hospNature
      //     this.data.phone = res.data.phone
      //     this.data.presentation = res.data.presentation
      //     this.data.isvalid = res.data.isvalid + ''
      //     this.data.signStatus = res.data.signStatus + ''
      //     this.data.community = res.data.community
      //     this.data.hospId = res.data.hospId
      //   }
      // })
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
