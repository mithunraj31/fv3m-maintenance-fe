<template>
  <div v-loading="loading" class="app-container">
    <h3>{{ $t('device.maintenance.editMaintenance.title') }}: {{ $route.params.maintenanceId }}</h3>
    <maintenance-form :maintenance="maintenance" @onFormSubmit="onFormSubmit" />
  </div>
</template>

<script>
import { fetchMaintenanceById, editMaintenance } from '@/api/maintenance'
import MaintenanceForm from '../components/MaintenanceForm'

export default {
  name: 'EditMaintenanceHistory',
  components: { MaintenanceForm },
  data() {
    return {
      loading: false,
      maintenance: {}
    }
  },
  async mounted() {
    this.loading = true
    try {
      const { data } = await fetchMaintenanceById(+this.$route.params.maintenanceId)
      this.maintenance = {
        id: data.id,
        description: data.description,
        lat: data.lat,
        lng: data.lng,
        fileList: data.images && data.images.length > 0 ? data.images.map(x => {
          return { name: x.url, url: x.full_url }
        }) : []
      }
    } catch (err) {
      this.$router.push('/404')
    }
    this.loading = false
  },
  methods: {
    onFormSubmit(form) {
      this.loading = true
      editMaintenance(form)
        .then(() => {
          this.loading = false
          this.$message({
            message: this.$t('message.maintenanceInfoHasBeenEdited'),
            type: 'success'
          })
          this.$router.push(`/devices/${form.deviceId}/maintenance-histories`)
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

<style lang="scss">

</style>
