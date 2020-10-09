<template>

  <div class="app-container">
    <el-row class="filter-section">
      <el-col :span="24">
        <el-select
          v-model="selectedCustomerId"
          filterable
          :placeholder="this.$t('deviceListings.selectCompany')"
          @change="onSelectedCustomer"
        >
          <el-option
            v-for="customer in customers"
            :key="customer.name"
            :label="customer.name"
            :value="customer.id"
          />
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table
          :data="devices"
          border
          style="width: 100%"
        >
          <el-table-column
            prop="id"
            :label="this.$t('deviceListings.deviceId')"
            width="50"
          />
          <el-table-column
            prop="serialNumber"
            :label="this.$t('deviceListings.serialNumber')"
          />
          <el-table-column
            prop="name"
            :label="this.$t('deviceListings.deviceName')"
          />
          <el-table-column
            prop="owner"
            :label="this.$t('deviceListings.owner')"
          />
          <el-table-column
            prop="updated"
            :label="this.$t('deviceListings.lastUpdated')"
          />
        </el-table>
        <pagination
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
        />
      </el-col>
    </el-row>
  </div>

</template>

<script>
import { fetchCustomers } from '@/api/customer'
import { fetchDevices, fetchDeviceByCustomerId } from '@/api/device'
import Pagination from '@/components/Pagination'

export default {
  name: 'DeviceListings',
  components: { Pagination },
  data() {
    return {
      devices: null,
      customers: null,
      selectedCustomerId: null,
      total: 0,
      listQuery: {
        page: 1,
        limit: 20
      }
    }
  },
  created() {
    this.intialData()
    this.onSelectedCustomer()
  },
  methods: {
    async intialData() {
      const { data } = await fetchCustomers()
      this.customers = data
    },
    mapDevicesToDataTable(device) {
      return {
        id: device.id,
        name: device.name,
        serialNumber: device.serialNumber,
        updated: device.updated,
        owner: device.updatedUser.name
      }
    },
    async onSelectedCustomer() {
      if (this.selectedCustomerId && this.selectedCustomerId > 0) {
        const { data } = await fetchDeviceByCustomerId(this.selectedCustomerId)
        this.devices = data.map(this.mapDevicesToDataTable)
      } else {
        const { data } = await fetchDevices()
        this.devices = data.map(this.mapDevicesToDataTable)
      }

      this.total = this.devices.length
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-section {
  margin-bottom: 15px;
}
</style>
