<template>
  <div class="app-container">
    <el-row class="filter-section">
      <el-col :span="20">
        <el-select v-model="selectedUserId" filterable :placeholder="this.$t('user.listings.selectUser')" @change="onSelectedUser">
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
              <el-button
                type="danger"
                size="small"
                @click.native.prevent="
                  $router.push(`/user/${scope.row.id}/edit`)
                "
              >
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
  fetchUserById
} from '@/api/user'
import Pagination from '@/components/Pagination'

export default {
  name: 'UserListings',
  components: {
    Pagination
  },
  data() {
    return {
      users: null,
      selectedUserId: null,
      total: 0,
      listQuery: {
        page: 1,
        limit: 20
      }
    }
  },
  created() {
    this.intialData()
    this.onSelectedUser()
  },
  methods: {
    async intialData() {
      const {
        data
      } = await fetchUsers()
      this.users = data
    },
    mapUsersToDataTable(user) {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        updated: user.updated
      }
    },
    async onSelectedUser() {
      if (this.selectedUserId && this.selectedUserId > 0) {
        const {
          data
        } = await fetchUserById(this.selectedUserId)
        this.users = data.map(this.mapUsersToDataTable)
      } else {
        const {
          data
        } = await fetchUsers()
        this.users = data.map(this.mapUsersToDataTable)
      }

      this.total = this.users.length
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
