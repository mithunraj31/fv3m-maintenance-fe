<template>
  <div class="app-container">
    <el-row class="filter-section" :gutter="2">
      <el-col :span="3">
        <customer-selector @onCustomerSelected="fetchListings" />

      </el-col>
      <el-col :span="3">
        <el-input v-model="listQuery.freeTextSearch" :placeholder="$t('device.listings.freeTextSearchPlaceholder')" @input="onInputFreeTextSearch" />
      </el-col>
      <el-col :span="3" class="new-device-button-section" :offset="15">
        <el-button type="primary" @click="$router.push('/devices/new')">{{
          this.$t("device.new.title")
        }}</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table
          v-loading="loading"
          :data="devices"
          border
          style="width: 100%"
        >
          <el-table-column
            prop="id"
            :label="this.$t('general.id')"
            width="50"
          />
          <!-- <el-table-column
            prop="serialNumber"
            :label="this.$t('device.listings.serialNumber')"
          /> -->
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
                v-permission="['admin']"
                size="small"
                @click.native.prevent="
                  $router.push(`/devices/${scope.row.id}/maintenance-histories`)
                "
              >{{ $t("general.history") }}</el-button>
              <el-button
                type="primary"
                size="small"
                @click.native.prevent="
                  $router.push(`/devices/${scope.row.id}/edit`)
                "
              >
                {{ $t("general.edit") }}
              </el-button>
              <el-button
                type="danger"
                size="small"
                @click="onDeleteDeviceClicked(scope.row.id)"
              >
                {{ $t("general.delete") }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          @pagination="onPaged"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  fetchDevices,
  fetchDeviceByCustomerId,
  deleteDevice
} from '@/api/device'
import Pagination from '@/components/Pagination'
import CustomerSelector from './components/CustomerSelector'
import moment from 'moment'
import permission from '@/directive/permission/index.js'
import debounce from 'lodash/debounce'
import axios from 'axios'

export default {
  name: 'DeviceListings',
  components: { Pagination, CustomerSelector },
  directives: { permission },
  data() {
    return {
      devices: null,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        freeTextSearch: ''
      },
      loading: false,
      cancelSource: null
    }
  },
  async created() {
    this.listQuery = {
      page: +(this.$route.query.page || this.listQuery.page),
      limit: +(this.$route.query.limit || this.listQuery.limit)
    }
    this.$router.push({
      query: this.listQuery
    })
    await this.fetchListings(0)
  },
  methods: {
    mapDevicesToDataTable(device) {
      return {
        id: device.id,
        name: device.name,
        serialNumber: device.serialNumber,
        updated: moment(String(device.updated_at)).format('YYYY/MM/DD hh:mm'),
        owner: device.user ? device.user.name : ''
      }
    },
    async fetchListings(selectedCustomerId) {
      this.selectedCustomerId = selectedCustomerId
      let response = null
      this.loading = true

      if (this.cancelSource) {
        this.cancelSource.cancel('CANCELLED_REQUEST_TOKEN')
      }
      this.cancelSource = axios.CancelToken.source()
      const cancelToken = this.cancelSource.token

      if (this.selectedCustomerId && this.selectedCustomerId > 0) {
        response = await fetchDeviceByCustomerId(
          this.selectedCustomerId,
          this.listQuery,
          cancelToken
        )
      } else {
        response = await fetchDevices(this.listQuery, cancelToken)
      }
      const { data, meta } = response
      this.devices = data.map(this.mapDevicesToDataTable)
      this.total = meta.total
      this.loading = false
      this.$router.push({
        query: this.listQuery
      })
      this.cancelSource = null
    },
    onDeleteDeviceClicked(id) {
      let deleteConfirmMessage = this.$t('message.confirmDelete')
      deleteConfirmMessage = String.format(
        deleteConfirmMessage,
        `${this.$t('device.listings.deviceId')}: ${id}`
      )

      this.$confirm(deleteConfirmMessage, this.$t('general.warning'), {
        confirmButtonText: this.$t('general.confirm'),
        cancelButtonText: this.$t('general.cancel'),
        type: 'warning'
      }).then(() => {
        this.deleteConfirmed(id)
      })
    },
    deleteConfirmed(id) {
      deleteDevice(id)
        .then(() => {
          this.$message({
            message: this.$t('message.deviceHasBeenDeleted'),
            type: 'success'
          })
          this.fetchListings(this.selectedCustomerId)
        })
        .catch(() => {
          this.$message({
            message: this.$t('message.somethingWentWrong'),
            type: 'danger'
          })
        })
    },
    async onPaged() {
      await this.fetchListings(this.selectedCustomerId)
    },
    // used normal function instead arrow function because the lexical scope
    onInputFreeTextSearch: debounce(async function(value) {
      await this.fetchListings(this.selectedCustomerId)
    }, 500)
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
