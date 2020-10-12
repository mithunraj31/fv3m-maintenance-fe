<template>
  <div class="app-container">
    <el-row class="filter-section">
      <el-col :span="24">
        <el-select v-model="selectedUserId" filterable :placeholder="this.$t('userListings.selectUser')" @change="onSelectedUser">
          <el-option v-for="user in users_" :key="user.name" :label="user.name" :value="user.id" />
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="users" border style="width: 100%">
          <el-table-column prop="id" :label="this.$t('userListings.userId')" width="50" />
          <el-table-column prop="name" :label="this.$t('userListings.userName')" />
          <el-table-column prop="email" :label="this.$t('userListings.userEmail')" />
          <el-table-column prop="role" :label="this.$t('userListings.userRole')" />
          <el-table-column prop="updated" :label="this.$t('userListings.userUpdated')" />
        </el-table>
        <pagination :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  fetchUsers
} from '@/api/user'
import Pagination from '@/components/Pagination'

export default {
  name: 'UserListings',
  components: {
    Pagination
  },
  data() {
    return {
      users_: null,
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
      this.users_ = data
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
      this.users = this.users_
      if (this.selectedUserId && this.selectedUserId > 0) {
        const data = this.users.filter(x => x.id === this.selectedUserId)
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
</style>
