<template>
  <div>
    <qrcode-vue :value="value" :size="size" level="H"></qrcode-vue>
  </div>
</template>
<script>
  import QrcodeVue from 'qrcode.vue';

  export default {
    data() {
      return {
        value: '123',
        size: 100
      }
    },
    components: {
      QrcodeVue
    }
  }
</script>
