<template>

  <div class="app-container">
    <el-row class="filter-section">
      <el-col :span="20">
        <customer-selector @onCustomerSelected="onCustomerSelected" />
      </el-col>
      <el-col :span="4" class="new-device-button-section">
        <el-button type="primary" @click="$router.push('/devices/new') ">{{ this.$t('device.new.title') }}</el-button>
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
            :label="this.$t('device.listings.deviceId')"
            width="50"
          />
          <el-table-column
            prop="serialNumber"
            :label="this.$t('device.listings.serialNumber')"
          />
          <el-table-column
            prop="name"
            :label="this.$t('device.listings.deviceName')"
          />
          <el-table-column
            prop="owner"
            :label="this.$t('device.listings.owner')"
          />
          <el-table-column
            prop="updated"
            :label="this.$t('device.listings.lastUpdated')"
          />
          <el-table-column :label="this.$t('general.action')">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="small"
                @click.native.prevent="$router.push(`/devices/${scope.row.id}/edit`)"
              >
                {{ $t('general.edit') }}
              </el-button>
              <el-button
                type="danger"
                size="small"
                @click.native.prevent="$router.push(`/devices/${scope.row.id}/edit`)"
              >
                {{ $t('general.delete') }}
              </el-button>
            </template>
          </el-table-column>
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
import { fetchDevices, fetchDeviceByCustomerId } from '@/api/device'
import Pagination from '@/components/Pagination'
import CustomerSelector from './components/customer-selector'

export default {
  name: 'DeviceListings',
  components: { Pagination, CustomerSelector },
  data() {
    return {
      devices: null,
      total: 0,
      listQuery: {
        page: 1,
        limit: 20
      }
    }
  },
  created() {
    this.onCustomerSelected(0)
  },
  methods: {
    mapDevicesToDataTable(device) {
      return {
        id: device.id,
        name: device.name,
        serialNumber: device.serialNumber,
        updated: device.updated,
        owner: device.updatedUser ? device.updatedUser.name : ''
      }
    },
    async onCustomerSelected(selectedCustomerId) {
      if (selectedCustomerId && selectedCustomerId > 0) {
        const { data } = await fetchDeviceByCustomerId(selectedCustomerId)
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
.new-device-button-section {
  text-align: right;
}
</style>
