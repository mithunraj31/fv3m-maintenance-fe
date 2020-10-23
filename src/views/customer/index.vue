<template>
  <div class="app-container">
    <el-row class="filter-section">
      <el-col :span="24" class="new-customer-button-section">
        <el-button type="primary" @click="$router.push('/customers/new')">{{
          this.$t("customer.new.title")
        }}</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table v-loading="loading" :data="customers" border style="width: 100%">
          <el-table-column prop="id" :label="this.$t('customer.listings.id')" width="50" />
          <el-table-column prop="name" :label="this.$t('customer.listings.name')" />
          <el-table-column prop="description" :label="this.$t('customer.listings.description')" />
          <el-table-column prop="updated" :label="this.$t('customer.listings.updated')" />
          <el-table-column :label="this.$t('general.action')">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="small"
                @click.native.prevent="
                  $router.push(`/customers/${scope.row.id}/edit`)
                "
              >
                {{ $t("general.edit") }}
              </el-button>
              <el-button v-if="scope.row.role !== 'admin'" type="danger" size="small" @click="onDeleteCustomerClicked(scope.row.id)">
                {{ $t("general.delete") }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="onPaged" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  fetchCustomers,
  deleteCustomer
} from '@/api/customer'
import Pagination from '@/components/Pagination'
import moment from 'moment'
import permission from '@/directive/permission/index.js'

export default {
  name: 'CustomerListings',
  components: {
    Pagination
  },
  directives: {
    permission
  },
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
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      loading: false
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
    await this.fetchListings()
  },
  methods: {
    mapCustomersToDataTable(customer) {
      return {
        id: customer.id,
        name: customer.name,
        description: customer.description,
        updated: moment(String(customer.updated_at)).format('YYYY/MM/DD hh:mm')
      }
    },
    async fetchListings() {
      let response = null
      this.loading = true
      response = await fetchCustomers(this.listQuery)
      const {
        data,
        meta
      } = response
      this.customers = data.map(this.mapCustomersToDataTable)
      this.total = meta.total
      this.loading = false
      this.$router.push({
        query: this.listQuery
      })
    },
    onDeleteCustomerClicked(id) {
      let deleteConfirmMessage = this.$t('message.confirmDelete')
      deleteConfirmMessage = String.format(
        deleteConfirmMessage,
        `${this.$t('customer.listings.id')}: ${id}`
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
      deleteCustomer(id)
        .then(() => {
          this.$message({
            message: this.$t('message.customerHasBeenDeleted'),
            type: 'success'
          })
          this.fetchListings()
        })
        .catch(() => {
          this.$message({
            message: this.$t('message.somethingWentWrong'),
            type: 'danger'
          })
        })
    },
    async onPaged() {
      await this.fetchListings()
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-section {
    margin-bottom: 15px;
}

.new-customer-button-section {
    text-align: right;
}
</style>
