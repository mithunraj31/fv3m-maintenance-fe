<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="8" :xs="24">
        <device-card />
      </el-col>
      <el-col :span="16" :xs="24">
        <el-card>
          <history />
        </el-card>
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
import DeviceCard from '../components/device-card'
import History from '../components/history'
import Pagination from '@/components/Pagination'

export default {
  name: 'MaintenanceHistory',
  components: { Pagination, DeviceCard, History },
  data() {
    return {
      total: 0,
      listQuery: {
        page: 1,
        limit: 20
      }
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style lang="sass">

</style>
