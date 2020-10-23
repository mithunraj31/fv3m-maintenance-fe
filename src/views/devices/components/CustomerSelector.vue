<template>
  <div>
    <el-select v-model="selectedCustomerId" filterable :placeholder="this.$t('device.listings.selectCompany')" @change="onCustomerSelected">
      <el-option :label="$t('general.all')" :value="0" />
      <el-option v-for="customer in customers" :key="customer.name" :label="customer.name" :value="customer.id" />
    </el-select>
  </div>
</template>

<script>
import {
  fetchCustomers
} from '@/api/customer'

export default {
  name: 'CustomerSelector',
  props: {
    customerId: {
      type: Number,
      default() {
        return 0
      }
    }
  },
  data() {
    return {
      customers: null,
      selectedCustomerId: null
    }
  },
  watch: {
    customerId(newVal, oldVal) {
      this.selectedCustomerId = newVal
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    onCustomerSelected() {
      this.$emit('onCustomerSelected', this.selectedCustomerId)
    },
    async fetchData() {
      const {
        data
      } = await fetchCustomers({
        limit: 1000,
        page: 1
      })
      this.customers = data
    }
  }
}
</script>
