<template>
  <div class="tab-container">
    <div class="tab-nav-bar">
      <div class="control-panel row">
        <div
            class="button arrow button__backwards"
            :class="{ disabled: !canGoBack }"
            @click="goBack()"
        >&#11164;</div>
        <div
            class="button arrow button__forward"
            :class="{ disabled: !canGoForward }"
            @click="goForward()"
        >&#11166;</div>
        <div class="button button__reload" @click="reloadPage()">&#x21bb;</div> <!-- Reload button -->
        <div class="button button__home" @click="goHome()">&#8962;</div>
        <AddressBar
            class="address-input"
            ref="addressBar"
            :address="url"
            @submitUrl="submitUrl"
        />
      </div>
    </div>
    <div class="tab-content">
      <webview ref="webviewRef"></webview>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useTabStore } from '@/stores/tabs-store'
import AddressBar from '@/components/AddressBar.vue';

const props = defineProps(['id'])

const tabsStore = useTabStore()
const webviewRef = ref(null)
const addressBar = ref(null)
const url = ref(tabsStore.homeUrl)
const {tabs} = storeToRefs(tabsStore)
const canGoBack = ref(false)
const canGoForward = ref(false)

let webviewIsReady = false


onMounted(() => {
  const webview = webviewRef.value

  webview.src = url.value

  webview.addEventListener('dom-ready', () => {
    tabsStore.updateTabTitle(props.id, webview.getTitle())

    webviewIsReady = true

    refreshHistoryActions()
  })

  webview.addEventListener('did-finish-load', () => {
    tabsStore.updateTabTitle(props.id, webview.getTitle())
    url.value = webview.getURL()

    refreshHistoryActions()
  })
})

function refreshHistoryActions() {
  const webview = webviewRef.value

  canGoBack.value = webview.canGoBack()
  canGoForward.value = webview.canGoForward()
}

function goHome() {
  const webview = webviewRef.value

  webview.loadURL(tabsStore.homeUrl)
}

function goBack() {
  const webview = webviewRef.value

  if (!webview.canGoBack()) return

  webview.goBack()
}

function goForward() {
  const webview = webviewRef.value

  if (!webview.canGoForward()) return

  webview.goForward()
}

function reloadPage() {
  const webview = webviewRef.value

  webview.reload()
  console.log('Reloading...')
}

function submitUrl(submittedUrl) {
  const webview = webviewRef.value

  webview.loadURL(submittedUrl)
}
</script>

<style lang="scss">
.tab-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.tab-nav-bar {
  background: #f0f0f0;
  padding: 0 20px;
  height: 50px;
}

.tab-content {
  display: flex;
  flex-grow: 1;
}

webview {
  flex-grow: 1;
}


.row {
  display: flex;
  width: 100%;
  height: 50px;
  align-items: center;
  padding: 10px;

  > div:not(:first-child) {
    margin-left: 10px;
  }
}

.button {
  $buttonSize: 30px;

  width: $buttonSize;
  height: $buttonSize;

  font-size: 30px;
  line-height: 22px;

  border: 1px solid lightgray;
  border-radius: 100%;

  &:hover {
    border-color: dimgray;
  }

  &.arrow {
    font-size: 22px;
    line-height: 28px;
  }

  &.disabled {
    opacity: 0.5;
  }
}

.address-input {
  flex-grow: 1;
  height: 100%;
  margin-left: 20px;
  padding: 0 20px;
}
</style>
