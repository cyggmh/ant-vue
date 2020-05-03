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
                    'id',
                    { initialValue: data.id}
                  ]"
                  placeholder="请输入内容"
                />
              </a-form-item>
            </detail-list>
            <a-row :gutter="48">
              <a-col :span="6">
                <a-form-item
                  label="头像">
                  <img :src="data.headImage" style="width: 150px;height: 150px;" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="48">
              <a-col :span="6">
                <a-form-item
                  label="名称">
                  <a-input
                    :disabled="disabled"
                    v-decorator="[
                      'name',
                      {rules: [{ required: false, message: '名称' }],
                       initialValue: data.name}
                    ]"
                    placeholder="请输入内容"
                  />
                </a-form-item>`
              </a-col>
              <a-col :span="6">
                <a-form-item
                  label="赛季等级">
                  <a-input
                    :disabled="disabled"
                    v-decorator="[
                      'seasonLevels',
                      {rules: [{ required: false, message: '赛季等级' }],
                       initialValue: data.seasonLevels}
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
                      'hardLight',
                      {rules: [{ required: false, message: '请输入所属区县' }],
                       initialValue: parseInt(data.hardLight)+parseInt(data.artifact)}
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
                      'synopsis',{initialValue: data.synopsis}
                    ]"
                    placeholder="暂无内容"
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
                      'glimmering',
                      {rules: [{ required: false, message: '请输入简称' }],initialValue: data.glimmering}
                    ]"
                    placeholder="请输入内容"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item
                  label="银币">
                  <a-input
                    :disabled="disabled"
                    v-decorator="[
                      'coin',
                      {rules: [{ required: false, message: '请输入简称' }],initialValue: data.coin}
                    ]"
                    placeholder="请输入内容"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item
                  label="光尘">
                  <a-input
                    :disabled="disabled"
                    v-decorator="[
                      'dust',
                      {rules: [{ required: false, message: '请输入简称' }],initialValue: data.dust}
                    ]"
                    placeholder="请输入内容"
                  />
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
                    v-decorator="[
                      'Evil',{rules: [{ required: false, message: '请输入电话' },{validator:phoneCheck.bind(this)}],initialValue: data.Evil}
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
                      'heroic',{rules: [{ required: false, message: '请输入地址' }],initialValue: data.heroic}
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
                      'glory',{rules: [{ required: false, message: '请输入地址' }],initialValue: data.glory}
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
import userApi from '../../../common/api/guild/userApi'
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
        id: '',
        name: '',
        seasonLevels: '',
        hardLight: '',
        artifact: '',
        glimmering: '',
        coin: '',
        dust: '',
        heroic: '',
        glory: '',
        Evil: '',
        synopsis: ''
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
    this.parameter.id = this.$route.query.id
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
    getData () {
      userApi.userInfo({
        data: this.parameter
      }).then(res => {
			console.log(res.data)
          this.data = res.data
          // return res.data
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
