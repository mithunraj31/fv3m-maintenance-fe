<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col class="order-selector" :offset="12" :span="12" :xs="12">
        <el-button class="new-maintenance-btn" type="primary" @click="$router.push(`/devices/${$route.params.id}/maintenance-histories/new`)">{{ $t('device.maintenance.newMaintenance.title') }}</el-button>
        <el-select v-model="listQuery.order" placeholder="Select" @change="getMaintenanceData">
          <el-option
            :label="$t('general.newest')"
            :value="'latest'"
          />
          <el-option
            :label="$t('general.oldest')"
            :value="'oldest'"
          />
        </el-select>
      </el-col>
      <el-col v-loading="deviceLoading" :span="8" :xs="24">
        <device-card :device="device" />
      </el-col>
      <el-col v-loading="maintenanceHistoryLoading" :span="16" :xs="24" :class="{ 'history-section': !histories || histories.length == 0 }">
        <h1 v-if="!histories || histories.length == 0">{{ $t('device.maintenance.card.notfound') }}</h1>
        <el-card v-if="histories && histories.length > 0">
          <history :histories="histories" @onRefreshData="getMaintenanceData" />
        </el-card>
        <pagination
          v-if="histories && histories.length > 0"
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          :page-sizes="[5, 10, 15, 20]"
          @pagination="getMaintenanceData"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import DeviceCard from '../components/DeviceCard'
import History from '../components/History'
import Pagination from '@/components/Pagination'
import { fetchDeviceById, fetchMaintenanceHistoryByDeviceId } from '@/api/device'

export default {
  name: 'MaintenanceHistory',
  components: { Pagination, DeviceCard, History },
  data() {
    return {
      total: 0,
      listQuery: {
        page: 1,
        limit: 2,
        order: 'latest'
      },
      deviceLoading: false,
      maintenanceHistoryLoading: false,
      device: {},
      histories: []
    }
  },
  async mounted() {
    await this.getDevice()
    await this.getMaintenanceData()
  },
  methods: {
    async getDevice(id) {
      this.deviceLoading = true
      try {
        const { data } = await fetchDeviceById(+this.$route.params.id)
        this.device = {
          id: +this.$route.params.id,
          name: data.name,
          status: data.status_id,
          customerId: data.customer_id,
          images: data.images,
          statusId: data.status_id,
          serialNumber: data.serial_number,
          registerDate: data.regist_date,
          mutatedDate: data.mutated_date,
          os: data.os,
          description: data.description,
          statusName: data.status && data.status.name ? data.status.name : ''
        }
      } catch (err) {
        this.$router.push('/404')
      }
      this.deviceLoading = false
    },
    async getMaintenanceData() {
      this.maintenanceHistoryLoading = true
      const { data, meta } = await fetchMaintenanceHistoryByDeviceId(+this.$route.params.id, this.listQuery)
      this.histories = data
      this.total = meta.total
      this.maintenanceHistoryLoading = false
    }
  }
}
</script>

<style lang="scss">
.order-selector {
  text-align: right;
  margin-bottom: 5px;
  .el-select-dropdown__item {
    color: #000;
  }
}
.history-section {
  display: flex;
  justify-content: center;
}

.new-maintenance-btn {
  margin-right: 5px;
}
</style>
