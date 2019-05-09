<template>
  <v-content v-resize="setContentHeight" ref='designerContent'>
    <v-navigation-drawer app fixed left clipped ref='fieldListContext' id='fieldListContext'>
      <field-list v-model="currentField" key='fieldListPage'></field-list>
    </v-navigation-drawer>
    <v-navigation-drawer app fixed right clipped id='field-setter-context' ref='fieldSetterContext'>
      <field-setter v-model="currentField" key='fieldSetterPage'></field-setter>
    </v-navigation-drawer>
    <v-container fluid fill-height id='designerContainer'>
      <v-layout justify-center>
        <v-flex xs12>
          <c-tab :items="[{name:'预览',key:'preview'},{name:'语言配置',key:'language'}]" :app="false" id="designerContentTab" ref='designerContentTab'>
            <template slot='btn'>
              <div style="width:200px">
                <v-select v-model="viewType" prependIcon='computer' :items="viewTypes" itemText="name" itemValue="value" hideDetails></v-select>
              </div>
            </template>
            <template slot='preview'>
              <div :style="contentStyle">
                <div ref='previewIframe' :style="previewIframeStyle">
                  <v-fade-transition mode="out-in">
                    <router-view />
                  </v-fade-transition>
                </div>
                <!-- <iframe ref='previewIframe' src="http://www.baidu.com" :style="previewIframeStyle"></iframe> -->
              </div>
            </template>
            <template slot='language'>
              <iframe src="https://www.sina.com"></iframe>
            </template>
          </c-tab>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  data: () => (
    {
      currentField: null,
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
      contentHeight: 0,
      viewType: { x: 1024, y: 1366 }
    }),
  computed: {
    contentStyle() {
      return `width:100%;overflow:auto;height:${this.contentHeight}px`
    },
    previewIframeStyle() {
      return `width:${this.viewType.x}px;border:1px solid white;margin: 0 auto;`
    }
  },
  methods: {
    setContentHeight() {
      let bodyHeight = window.innerHeight
      let appBarHeight = document.getElementById("appBar").children[0].clientHeight
      let designerContentTabHeight = document.getElementById('designerContentTab').children[0].clientHeight
      this.$set(this, 'contentHeight', bodyHeight - appBarHeight - designerContentTabHeight - 20 - 2)
      console.log('bodyHeight:' + bodyHeight)
      console.log('appBarHeight:' + appBarHeight)
      console.log('designerContentTabHeight:' + designerContentTabHeight)
      console.log(bodyHeight - appBarHeight - designerContentTabHeight - 20 - 2)
    }
  },
  mounted() {
    this.setContentHeight()
    this.$router.push('preview')
  }
}
</script>

<style lang="stylus">
.container {
  padding: 0px;
}

// #field-setter-context {
// overflow: hidden;
// }
#field-setter-context .v-navigation-drawer__border {
  display: none;
}

iframe {
  height: 100%;
  border: none;
  background: white;
}

#designerContainer {
  background: rgba(240, 240, 240, 0.65);
}

#designerContainer .v-window {
  padding: 20px 15px 0px 15px;
}
</style>

