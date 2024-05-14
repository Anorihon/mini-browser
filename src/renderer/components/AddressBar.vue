<template>
  <input v-model="url" @click="selectAllText" @keyup.enter.prevent="submitUrl" />
</template>

<script>
import { ref, watchEffect } from 'vue';

export default {
  name: 'AddressBar',
  props: {
    address: String,
  },
  emits: ['submitUrl'],
  setup(props, { emit }) {
    const url = ref(props.address);

    watchEffect(() => {
      url.value = props.address
    })

    const selectAllText = (event) => {
      event.target.select() // Select all text in the input field on click
    }

    const isValidUrl = (url) => {
      // Logic to validate the URL
      // You can use regular expressions or a library like 'valid-url'
      // For simplicity, let's assume any string starting with "http://" or "https://" is valid
      return /^https?:\/\//.test(url);
    }

    const submitUrl = () => {
      if (!isValidUrl(url.value)) {
        url.value = `https://www.google.com/search?q=${encodeURIComponent(url.value)}`
      }

      emit('submitUrl', url.value)
    };

    return {
      url,
      selectAllText,
      submitUrl
    };
  },
};
</script>
