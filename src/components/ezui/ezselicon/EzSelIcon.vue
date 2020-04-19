<template>
  <div style="" class="ez-selicon">
    <div>
      <a-button @click="visible = true" :icon="icon ? icon : 'reload'" type="primary" style="line-height: 32px;color: white">
        {{ title ? title : '选择图标' }}
      </a-button>
    </div>
    <a-modal
      title="选择ICON"
      width="50%"
      v-model="visible">
      <template slot="footer">
        <a-row :gutter="24">
          <a-col :span="12">
            <div style="display: flex;line-height: 30px" v-if="selIcon">
              您选择了图标：
              <div class="icon-sel">
                <a-icon style="font-size: 16px" :type="selIcon"/>
              </div>
              {{ selIcon }}
            </div>
            <div style="text-align: left" v-else>
              您暂未选择图标
            </div>
          </a-col>
          <a-col :span="12">
            <a-button @click="visible = false">取消</a-button>
            <a-button style="color: white" @click="onEnter" type="primary">
              确认
            </a-button>
          </a-col>
        </a-row>
      </template>
      <div style="max-height: 500px;overflow-y: auto">
        <div v-for="(item,key) in iconList" :key="key">
          <h3 style="margin-top: 30px">{{ item.title }}</h3>
          <div class="icon-view">
            <div
              @click="selIcon = iconx"
              :class="['icon-item', selIcon === iconx ? 'icon-item-on': '']"
              v-for="(iconx,key2) in item.icons"
              :key="key2">
              <a-icon :type="iconx" style="font-size: 20px;"/>
            </div>
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import icons from './icons'
import ARow from 'ant-design-vue/es/grid/Row'
import ACol from 'ant-design-vue/es/grid/Col'
export default {
  props: {
    icon: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    defIcon: {
      type: String,
      default: null
    }
  },
  name: 'EzSelIcon',
  components: { ACol, ARow },
  data () {
    return {
      visible: false,
      iconList: icons,
      selIcon: (this.defIcon ? this.defIcon : 'appstore')
    }
  },
  methods: {
    onEnter () {
      this.$emit('onChange', this.selIcon)
      this.visible = false
    },
    openIcon (defIcon) {
      if (defIcon) {
        this.selIcon = defIcon
      }
      this.visible = true
    }
  }
}
</script>

<style scoped lang="less">
  @import "../../antpro/index.less";
  .icon-view{
    display: flex;flex-flow:row wrap;margin-top: 15px
  }
  .icon-item{
    margin: 2px;
    height: 40px;width: 40px;line-height: 44px;text-align: center;
    border-radius: 5px;
  }
  .icon-item-on{
    color: white;
    background: @primary-color;
  }
  .icon-item:hover{
    color: white;
    background: @primary-color;
  }
  .icon-sel{
    height: 30px;width: 30px;color: white;
    color: white;
    text-align: center;
    border-radius: 5px;
    line-height: 30px;
    background: @primary-color;
    margin-left: 10px;
    margin-right: 10px;
  }
</style>
