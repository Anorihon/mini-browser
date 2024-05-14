<template>
  <div class="tabs">
    <div
        class="tab"
        v-for="tab in tabs"
        :key="tab.id"
        :class="{ active: activeTabId === tab.id }"
        :title="tab.title"
        @click="tabsStore.selectTab(tab.id)"
    >
      <div class="tab-content">{{ tab.title }}</div>
      <span
        class="close-icon"
        v-if="tabs.length > 1"
        @click.stop="closeTab(tab.id)"
      >x</span>
    </div>
    <div class="add-tab" @click.stop="addTab()">+ Add Tab</div>
  </div>
</template>

<script setup>
import { useTabStore } from '@/stores/tabs-store'
import { storeToRefs } from 'pinia'

const tabsStore = useTabStore()
const { tabs, activeTabId } = storeToRefs(tabsStore)

function addTab() {
  tabsStore.addTab()
}

const closeTab = (tabId) => {
  tabsStore.closeTab(tabId)
}
</script>

<style lang="scss">
.tabs {
  display: flex;
  align-items: center;

  background: #2c3e50; /* Updated background color */
  padding: 0 20px;
  height: 50px;
}

.tab {
  cursor: pointer;
  padding: 5px 10px;
  margin-right: 5px;
  border: 1px solid #ccc;
  position: relative; /* Ensures proper positioning of close button */

  width: auto; /* Allow tabs to expand based on content */
  min-width: 84px;
  max-width: 200px; /* Limit tab width to prevent overflow */

  display: flex; /* Ensures close button appears next to tab content */
  align-items: center; /* Vertically center content */
  justify-content: space-between; /* Add space between tab content and close button */

  &.active {
    background: #ffffff;
  }

  .tab-content {
    white-space: nowrap; /* Prevents the text from wrapping */
    overflow: hidden; /* Hides the overflowed text */
    text-overflow: ellipsis; /* Adds an ellipsis when the text overflows */
    flex-grow: 1; /* Allow tab content to grow */
  }
}

.close-icon {
  cursor: pointer;
  color: #ccc;
  font-size: 18px;
  font-weight: bold;
  z-index: 20;

  &:hover {
    color: red;
  }
}

.add-tab {
  cursor: pointer;
  color: #fff;
  padding: 5px 10px;
  margin-right: 5px;
  border: 1px solid transparent;
  background-color: #3498db; /* Button background color */
  transition: background-color 0.3s ease; /* Smooth transition on hover */

  &:hover {
    background-color: #2980b9; /* Updated button background color on hover */
  }
}
</style>
