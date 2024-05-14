<template>
  <div id="wrapper">
    <Tabs />
    <TabContent
        v-for="tab in tabsRef"
        :id="tab.id"
        :url="tab.url"
        :key="tab.id"
        v-show="tab.id === activeTabId"
    ></TabContent>
  </div>
</template>

<script setup>
import { computed, ref, watch, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import { useTabStore } from '@/stores/tabs-store';
import TabContent from '@/components/TabContent.vue';
import Tabs from '@/components/Tabs.vue';


const tabsStore = useTabStore()
const {tabs, activeTabId, activeTab} = storeToRefs(tabsStore)
const tabsRef = ref([])

watchEffect(() => {
  tabsRef.value = tabsStore.tabs
  // tabsRef.value = tabsStore.tabs
})

function addNewTab() {
  tabsStore.addTab()
}

addNewTab()
</script>


<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Source Sans Pro', sans-serif;
}

#wrapper {
  background: radial-gradient(
          ellipse at top left,
          rgba(255, 255, 255, 1) 40%,
          rgba(229, 229, 229, .9) 100%
  );
  height: 100vh;
  //padding: 60px 80px;
  width: 100vw;

  display: flex;
  flex-direction: column;
}

.top-bar {
  height: 100px;
  background: #f0f0f0;
  padding: 0 20px;

  > .row {
    display: flex;
    width: 100%;
    height: 50px;
    align-items: center;
    padding: 10px;

    > div:not(:first-child) {
      margin-left: 10px;
    }
  }
}

.tab-content {
  flex-grow: 1;
}

.button {
  display: block;

  padding: 0;
  margin: 0;

  font-size: 24px;
  font-weight: bold;
  text-align: center;
  line-height: 28px;

  cursor: pointer;
}

.button__add-tab {
  $buttonSize: 28px;

  width: $buttonSize;
  height: $buttonSize;

  background: lightgray;
  border-radius: 100%;
  border: none;
}
</style>
