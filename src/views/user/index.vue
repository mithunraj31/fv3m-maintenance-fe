<template>
  <div class="app-container">
    <el-row class="filter-section">
      <el-col :span="20">
        <el-select v-model="selectedUserId" filterable :placeholder="this.$t('user.listings.selectUser')" @change="fetchListings">
          <el-option v-for="user in users" :key="user.name" :label="user.name" :value="user.id" />
        </el-select>
      </el-col>
      <el-col :span="4" class="new-user-button-section">
        <el-button type="primary" @click="$router.push('/user/new')">{{
          this.$t("user.new.title")
        }}</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="users" border style="width: 100%">
          <el-table-column prop="id" :label="this.$t('user.listings.userId')" width="50" />
          <el-table-column prop="name" :label="this.$t('user.listings.userName')" />
          <el-table-column prop="email" :label="this.$t('user.listings.userEmail')" />
          <el-table-column prop="role" :label="this.$t('user.listings.userRole')" />
          <el-table-column prop="updated" :label="this.$t('user.listings.userUpdated')" />
          <el-table-column :label="this.$t('general.action')">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="small"
                @click.native.prevent="
                  $router.push(`/user/${scope.row.id}/edit`)
                "
              >
                {{ $t("general.edit") }}
              </el-button>
              <el-button type="danger" size="small" @click="onDeleteUserClicked(scope.row.id)">
                {{ $t("general.delete") }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  fetchUsers,
  fetchUserById,
  deleteUser
} from '@/api/user'
import Pagination from '@/components/Pagination'
import moment from 'moment'
import permission from '@/directive/permission/index.js'

export default {
  name: 'UserListings',
  components: {
    Pagination
  },
  directives: {
    permission
  },
  props: {
    userId: {
      type: Number,
      default() {
        return 0
      }
    }
  },
  data() {
    return {
      users: null,
      selectedUserId: null,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      loading: false
    }
  },
  watch: {
    userId(newVal, oldVal) {
      this.selectedUserId = newVal
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
    mapUsersToDataTable(user) {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        updated: moment(String(user.updated_at)).format('YYYY/MM/DD hh:mm')
      }
    },
    async fetchListings(selectedUserId) {
      let response = null
      this.loading = true
      if (this.selectedUserId && this.selectedUserId > 0) {
        response = await fetchUserById(selectedUserId, this.listQuery)
        console.log()
      } else {
        response = await fetchUsers(this.listQuery)
      }
      const {
        data,
        total
      } = response
      this.users = data.map(this.mapUsersToDataTable)
      this.total = total
      this.loading = false
      this.$router.push({
        query: this.listQuery
      })
    },
    onDeleteUserClicked(id) {
      let deleteConfirmMessage = this.$t('message.confirmDelete')
      deleteConfirmMessage = String.format(
        deleteConfirmMessage,
        `${this.$t('user.listings.userId')}: ${id}`
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
      deleteUser(id)
        .then(() => {
          this.$message({
            message: this.$t('message.userHasBeenDeleted'),
            type: 'success'
          })
          this.fetchListings(0)
        })
        .catch(() => {
          this.$message({
            message: this.$t('message.somethingWentWrong'),
            type: 'danger'
          })
        })
    },
    async onPaged() {
      await this.fetchListings(0)
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-section {
    margin-bottom: 15px;
}

.new-user-button-section {
    text-align: right;
}
</style>
