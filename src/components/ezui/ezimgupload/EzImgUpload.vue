<template>
  <div class="ez-img-upload">
    <div class="clearfix">
      <a-upload
        :action="serverUrl + '/sys/upload/img'"
        listType="picture-card"
        :fileList="fileList"
        @preview="handlePreview"
        @change="handleChange"
      >
        <div v-if="fileList.length < imgConut">
          <a-icon type="plus" />
          <div class="ant-upload-text">Upload</div>
        </div>
      </a-upload>
      <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
        <img alt="example" style="width: 100%" :src="previewImage" />
      </a-modal>
    </div>
  </div>
</template>

<script>
import DefParam from '../../../config/defParam'
export default {
  name: 'EzPage',
  props: {
    imgConut: {
      type: Number,
      default: 3
    },
    imgs: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      serverUrl: DefParam.serveUrl,
      previewVisible: false,
      previewImage: '',
      oldImgs: [],
      fileList: this.getOldImgs()
    }
  },
  methods: {
    getOldImgs () {
      const imgs = []
      if (this.imgs) {
        let i = -1
        for (const item of this.imgs) {
          imgs.push({
            url: this.$ez.fun.getImg(item),
            type: 'old',
            uid: (i + ''),
            name: 'xxx.png',
            status: 'done',
            imgUrl: item,
            success: true
          })
          i--
        }
      }
      return imgs
    },
    handleCancel () {
      this.previewVisible = false
    },
    handlePreview (file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    handleChange ({ fileList }) {
      this.fileList = fileList
    },
    getData () {
      const reuslt = {
        result: 'success',
        msg: '图片全部上传成功！',
        eIndex: -1
      }
      const data = []
      var i = 0
      let newData = {}
      for (const item of this.fileList) {
        i++
        if (item.type === 'old') {
          newData = {
            id: i,
            success: true,
            url: item.imgUrl
          }
        } else {
          if (item.status === 'error') {
            reuslt.result = 'error'
            reuslt.msg = '第' + i + '张图片上传失败!请将其删除或重新上传！'
            reuslt.eIndex = (i - 1)
          }
          if (item.status === 'uploading') {
            reuslt.result = 'uploading'
            reuslt.msg = '第' + i + '张图片正在上传!请将其删除或等待上传结果后再试！'
            reuslt.eIndex = (i - 1)
          }
          newData = {
            id: i,
            success: false
          }
          if (item.status === 'done') {
            if (item.response.code === 0) {
              newData.success = true
              newData.url = item.response.data
            } else {
              reuslt.result = 'error'
              reuslt.msg = '第' + i + '张图片上传失败!请将其删除或重新上传！'
              reuslt.eIndex = (i - 1)
            }
          }
        }
        data.push(newData)
      }
      reuslt.data = data
      return reuslt
    },
    getResult () {
      const result = this.getData()
      if (result.result !== 'success') {
        this.$message.error(result.msg)
      }
      return result
    }
  }
}
</script>

<style scoped>
</style>
