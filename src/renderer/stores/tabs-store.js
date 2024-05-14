import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';

export const useTabStore = defineStore('tabs', {
    state: () => ({
        tabs: [],
        activeTabId: '',
    }),
    actions: {
        addTab() {
            const uniqueId = uuidv4()

            this.tabs.push({ id: uniqueId, title: 'New Tab' })
            this.selectTab(uniqueId)
        },
        updateTabTitle(tabId, title) {
            const tab = this.getTabById(tabId)

            if (!tab) return

            tab.title = title
        },
        closeTab(tabId) {
            this.tabs = this.tabs.filter(item => item.id !== tabId)

            if (this.tabs.length > 0) {
                this.selectTab(this.tabs[this.tabs.length - 1].id)
            }
        },

        selectTab(tabId) {
            this.activeTabId = tabId
        },
    },
    getters: {
        activeTab: (state) => {
            return () => state.tabs.find(item => item.id === state.activeTabId) || null
        },
        getTabById: (state) => {
            return (tabId) => state.tabs.find(item => item.id === tabId) || null
        },
        homeUrl: () => 'https://google.com',
    }
});