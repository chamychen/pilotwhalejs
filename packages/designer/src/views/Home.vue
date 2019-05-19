<template>
  <div :class="fullscreenClass">
    <v-app-bar id="appBar" color="primary" :dark="dark" :app='!fullscreen' dense fixed clipped-left clipped-right>
      <v-toolbar-title>Toolbar</v-toolbar-title>
    </v-app-bar>
    <v-content v-resize="setContentHeight" ref='designerContent'>
      <v-navigation-drawer app fixed left clipped ref='fieldListContext' id='fieldListContext'>
        <field-list v-model="currentField" :dataList='fieldList' key='fieldListPage'></field-list>
      </v-navigation-drawer>
      <v-navigation-drawer app fixed right clipped id='field-setter-context' ref='fieldSetterContext'>
        <field-setter v-model="currentField" key='fieldSetterPage' @saveField='saveField'></field-setter>
      </v-navigation-drawer>
      <v-container fluid fill-height id='designerContainer'>
        <v-layout justify-center>
          <v-flex xs12>
            <c-tab :items="[{name:'预览',key:'preview'},{name:'语言配置',key:'language'}]" :app="fullscreen" :backgroundColor="this.fullscreen?'primary':null" :dark="fullscreen" :sliderColor="this.fullscreen?'white':null" contextMarginTop="0px" id="designerContentTab" ref='designerContentTab'>
              <template slot='btn'>
                <div style="width:200px">
                  <v-select v-model="viewType" prependIcon='computer' :items="viewTypes" itemText="name" itemValue="value" hideDetails></v-select>
                </div>
                <v-btn class="mx-2" fab dark small color="warning" :title="this.fullscreen?'退出全屏':'全屏'" @click="setFullscreen">
                  <v-icon>{{this.fullscreen?'mdi-fullscreen-exit':'mdi-fullscreen'}}</v-icon>
                </v-btn>
              </template>
              <template slot='preview'>
                <div :style="contentStyle">
                  <!-- <div ref='previewIframe' :style="previewIframeStyle">
                    <v-fade-transition mode="out-in">
                      <router-view />
                    </v-fade-transition>
                  </div> -->
                  <iframe id='previewIframe' name='previewIframe' ref='previewIframe' src="/#/preview" :style="previewIframeStyle"></iframe>
                </div>
              </template>
              <template slot='language'>
                <iframe src="https://www.sina.com"></iframe>
              </template>
            </c-tab>
            <!-- <v-dialog v-model="dialog" fullscreen max-width="290">
              <v-card>
                <v-card-title class="headline">Use Google's location service?</v-card-title>
                <v-card-text>
                  Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text>
                    Disagree
                  </v-btn>
                  <v-btn color="green darken-1" text>
                    Agree
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog> -->
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import DecoratorCompiler from '@core/element/decorator/DecoratorCompiler'
import ElementFactory from '@core/element/types/ElementFactory'
import ElementTypes from '@core/element/types'
export default {
  data: () => {
    let fieldList = new DecoratorCompiler(ElementFactory.createElement(ElementTypes.select)).getInitElements()
    localStorage.setItem('currentDesignData', JSON.stringify(fieldList))
    return {
      contentHeight: 0,
      fullscreen: false,
      dark: true,
      fieldList: fieldList,
      currentField_: fieldList ? fieldList[0] : null,
      viewTypes: [
        { value: { x: 320, y: 568 }, name: 'iphone5/SE' },
        { value: { x: 375, y: 667 }, name: 'iphone6/7/8' },
        { value: { x: 414, y: 736 }, name: 'iphone6/7/8 plus' },
        { value: { x: 375, y: 812 }, name: 'iphone6/7/8 plus' },
        { value: { x: 768, y: 1024 }, name: 'ipad' },
        { value: { x: 1024, y: 1366 }, name: 'ipad pro' },
        { value: { x: 1024, y: 768 }, name: '1024*768(PC)' },
        { value: { x: 1360, y: 768 }, name: '1360*768(PC)' },
        { value: { x: 1366, y: 768 }, name: '1366*768(PC)' },
        { value: { x: 1400, y: 1050 }, name: '1400*1050(PC)' },
        { value: { x: 1440, y: 900 }, name: '1440*900(PC)' },
        { value: { x: 1600, y: 900 }, name: '1600*900(PC)' },
        { value: { x: 1680, y: 1050 }, name: '1680*1050(PC)' },
        { value: { x: 1920, y: 1080 }, name: '1920*1080(PC)' }
      ],
      viewType: { x: 1024, y: 1366 }
    }
  },
  computed: {
    currentField: {
      get() {
        return this.currentField_
      },
      set(newVal) {
        this.$set(this, 'currentField_', newVal)
      }
    },
    fullscreenClass() {
      return this.fullscreen ? "d-fullscreen" : null
    },
    contentStyle() {
      return `width:100%;overflow-x:auto;overflow-y:auto;height:${this.contentHeight}px;text-align:center;padding: 10px 10px;background: rgb(117, 117, 117);border-radius: 10px;`
    },
    previewIframeStyle() {
      return `width:${this.viewType.x}px;height:${this.viewType.y}px;border:1px solid white;`
    }
  },
  methods: {
    setContentHeight() {
      let bodyHeight = window.innerHeight
      let appBarHeight = document.getElementById("appBar").children[0].clientHeight
      let designerContentTabHeight = document.getElementById('designerContentTab').children[0].clientHeight
      let height = bodyHeight - appBarHeight - designerContentTabHeight - 20 - 2
      this.$set(this, 'contentHeight', height)
    },
    setFullscreen() {
      this.fullscreen = !this.fullscreen
      setTimeout(() => {
        //使用setTimeout是因为dom渲染有延迟
        this.setContentHeight()
      }, 200)
    },
    saveField(newVal) {
      let fieldList = this.fieldList
      let rowIndex = fieldList.indexOf(this.currentField_)
      fieldList[rowIndex] = newVal
      this.$set(this, 'fieldList', fieldList)
      localStorage.setItem('currentDesignData', JSON.stringify(fieldList))
      this.$set(this, 'currentField', newVal)
      document.previewIframe.location.reload()
    }
  },
  mounted() {
    this.setContentHeight()
  }
}
</script>

<style lang="stylus">
.container {
  padding: 0px;
}

#designerContainer {
  background: rgba(240, 240, 240, 0.65);
}

#designerContainer .v-window {
  padding: 20px 15px 0px 15px;
}

.d-fullscreen #appBar, .d-fullscreen #fieldListContext {
  display: none;
}

.d-fullscreen .v-content {
  padding-left: 0px !important;
}

.d-fullscreen #designerContentTab .v-sheet {
  left: 0px !important;
}
</style>

