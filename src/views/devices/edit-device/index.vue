<template>
  <div class="app-container">
    <h3>{{ this.$t('device.edit.title') }}: {{ $route.params.id }}</h3>
    <device-form :device="device" @onFormSubmit="onFormSubmit" />
  </div>
</template>

<script>
import DeviceForm from '../components/device-form'
import { fetchDevices } from '@/api/device'

export default {
  name: 'EditDevice',
  components: { DeviceForm },
  data() {
    return {
      device: {}
    }
  },
  async created() {
    const { data } = await fetchDevices()
    this.device = data.filter(x => x.id === +this.$route.params.id)[0]
  },
  methods: {
    onFormSubmit(form) {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
