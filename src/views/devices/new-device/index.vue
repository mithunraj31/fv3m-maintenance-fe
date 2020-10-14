<template>
  <div v-loading="loading" class="app-container">
    <h3>{{ this.$t('device.new.title') }}</h3>
    <device-form @onFormSubmit="onFormSubmit" />
  </div>
</template>

<script>
import DeviceForm from '../components/DeviceForm'
import { newDevice } from '@/api/device'

export default {
  name: 'NewDevice',
  components: { DeviceForm },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    onFormSubmit(form) {
      this.loading = true
      newDevice(form)
        .then(response => {
          this.loading = false
          this.$message({
            message: this.$t('message.deviceHasBeenCreated'),
            type: 'success'
          })
          this.$router.push('/devices')
        })
        .catch(() => {
          this.loading = false
          this.$message({
            message: this.$t('message.somethingWentWrong'),
            type: 'error'
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
