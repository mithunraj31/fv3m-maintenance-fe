<template>
  <div class="app-container">
    <el-row>
      <el-col :span="12">
        <el-form ref="form" :rules="formRules" :model="form" label-width="120px">
          <el-form-item :label="this.$t('customer.form.name')" prop="name">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item :label="this.$t('customer.form.description')" prop="description">
            <el-input v-model="form.description" type="textarea" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="this.onSubmit">{{
              this.$t("general.save")
            }}</el-button>
            <el-button @click="$router.go(-1)">{{
              this.$t("general.cancel")
            }}</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'CustomerForm',
  props: {
    customer: {
      type: Object,
      default: () => {
        return {
          id: 0,
          name: '',
          description: ''
        }
      }
    }
  },
  data() {
    const validateName = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('message.customerNameRequired')))
      } else {
        callback()
      }
    }

    return {
      form: {
        id: 0,
        name: '',
        description: ''
      },
      dialogVisible: false,
      formRules: {
        name: [{
          required: true,
          trigger: 'blur',
          validator: validateName
        }],
        description: [{
          required: false,
          trigger: 'blur'
        }]
      }
    }
  },
  watch: {
    customer: function(newCustomer, oldCustomer) {
      this.form.id = newCustomer.id
      this.form.name = newCustomer.name
      this.form.description = newCustomer.description
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('onFormSubmit', {
            ...this.form
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
