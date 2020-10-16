<template>
  <div class="app-container">
    <h3>{{ this.$t("user.new.title") }}</h3>
    <user-form @onFormSubmit="onFormSubmit" />
  </div>
</template>

<script>
import UserForm from '../components/UserForm'

export default {
  name: 'NewUser',
  components: {
    UserForm
  },
  methods: {
    onFormSubmit(form) {
      console.log(form)
    }
  }
}
</script>

<style lang="scss" scoped></style>
