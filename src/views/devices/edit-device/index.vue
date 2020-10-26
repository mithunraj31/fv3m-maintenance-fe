<template>
  <div v-loading="loading" class="app-container">
    <h3>{{ this.$t('device.edit.title') }}: {{ $route.params.id }}</h3>
    <device-form :device="device" @onFormSubmit="onFormSubmit" />
  </div>
</template>

<script>
import DeviceForm from '../components/DeviceForm'
import { editDevice, fetchDeviceById } from '@/api/device'

export default {
  name: 'EditDevice',
  components: { DeviceForm },
  data() {
    return {
      device: {},
      loading: false
    }
  },
  async mounted() {
    this.loading = true
    try {
      const { data } = await fetchDeviceById(+this.$route.params.id)
      this.device = {
        id: +this.$route.params.id,
        name: data.name,
        status: data.status_id,
        customerId: data.customer_id,
        fileList: data.images && data.images.length > 0 ? data.images.map(x => {
          return { name: x.url, url: x.full_url }
        }) : [],
        statusId: data.status_id,
        serialNumber: data.serial_number,
        registerDate: data.regist_date,
        mutatedDate: data.mutated_date,
        os: data.os,
        description: data.description

      }
    } catch (err) {
      this.$router.push('/404')
    }

    this.loading = false
  },
  methods: {
    onFormSubmit(form) {
      this.loading = true
      editDevice(form)
        .then(() => {
          this.loading = false
          this.$message({
            message: this.$t('message.deviceHasBeenEdited'),
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
