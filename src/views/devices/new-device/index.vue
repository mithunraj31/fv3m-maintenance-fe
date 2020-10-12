<template>
  <div class="app-container">
    <h3>{{ this.$t('device.new.title') }}</h3>
    <device-form @onFormSubmit="onFormSubmit" />
  </div>
</template>

<script>
import DeviceForm from '../components/device-form'

export default {
  name: 'NewDevice',
  components: { DeviceForm },
  methods: {
    onFormSubmit(form) {
      console.log(form)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
