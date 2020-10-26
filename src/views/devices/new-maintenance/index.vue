<template>
  <div v-loading="loading" class="app-container">
    <h3>{{ $t('device.maintenance.newMaintenance.title') }}</h3>
    <maintenance-form @onFormSubmit="onFormSubmit" />
  </div>
</template>

<script>
import { newMaintenance } from '@/api/maintenance'
import MaintenanceForm from '../components/MaintenanceForm'
export default {
  name: 'NewMaintenanceHistory',
  components: { MaintenanceForm },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    onFormSubmit(form) {
      this.loading = true
      newMaintenance(form)
        .then(() => {
          this.loading = false
          this.$message({
            message: this.$t('message.maintenanceInfoHasBeenCreated'),
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
