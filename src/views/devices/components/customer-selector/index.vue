<template>
  <div>
    <el-select
      v-model="selectedCustomerId"
      filterable
      :placeholder="this.$t('device.listings.selectCompany')"
      @change="onCustomerSelected"
    >
      <el-option
        v-for="customer in customers"
        :key="customer.name"
        :label="customer.name"
        :value="customer.id"
      />
    </el-select>
  </div>
</template>

<script>
import { fetchCustomers } from '@/api/customer'

export default {
  name: 'CustomerSelector',
  data() {
    return {
      customers: null,
      selectedCustomerId: null
    }
  },
  async created() {
    const { data } = await fetchCustomers()
    this.customers = data
  },
  methods: {
    onCustomerSelected() {
      this.$emit('onCustomerSelected', this.selectedCustomerId)
    }
  }
}
</script>
