<template>
  <div v-loading="loading" class="app-container">
    <h3>{{ this.$t("customer.edit.title") }}: {{ $route.params.id }}</h3>
    <customer-form :customer="customer" @onFormSubmit="onFormSubmit" />
  </div>
</template>

<script>
import CustomerForm from '../components/CustomerForm'
import {
  fetchCustomerById,
  editCustomer
} from '@/api/customer'

export default {
  name: 'EditCustomer',
  components: {
    CustomerForm
  },
  data() {
    return {
      customer: {},
      loading: false
    }
  },
  async mounted() {
    this.loading = true
    const {
      data
    } = await fetchCustomerById(+this.$route.params.id)
    this.customer = {
      id: +this.$route.params.id,
      name: data.name,
      description: data.description,
      furigana: data.furigana
    }
    this.loading = false
  },
  methods: {
    onFormSubmit(form) {
      this.loading = true
      editCustomer(form)
        .then(() => {
          this.loading = false
          this.$message({
            message: this.$t('message.customerHasBeenEdited'),
            type: 'success'
          })
          this.$router.push('/customers')
        })
        .catch(() => {
          this.loading = false
          this.$message({
            message: this.$t('message.somethingWentWrong'),
            type: 'error'
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped></style>
