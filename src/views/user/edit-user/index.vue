<template>
  <div class="app-container">
    <h3>{{ this.$t("user.edit.title") }}: {{ $route.params.id }}</h3>
    <user-form :user="user" @onFormSubmit="onFormSubmit" />
  </div>
</template>

<script>
import UserForm from '../components/user-form'
import {
  fetchUsers
} from '@/api/user'

export default {
  name: 'EditUser',
  components: {
    UserForm
  },
  data() {
    return {
      user: {}
    }
  },
  async created() {
    const {
      data
    } = await fetchUsers()
    this.user = data.filter(x => x.id === +this.$route.params.id)[0]
  },
  methods: {
    onFormSubmit(form) {}
  }
}
</script>

<style lang="scss" scoped></style>
