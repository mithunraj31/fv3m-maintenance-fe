<template>
  <div class="app-container">
    <el-row>
      <el-col :span="12">
        <el-form ref="form" :rules="formRules" :model="form" label-width="120px">
          <el-form-item :label="this.$t('user.form.userName')" prop="name">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item :label="this.$t('user.form.userEmail')" prop="email">
            <el-input v-model="form.email" />
          </el-form-item>
          <el-form-item :label="this.$t('user.form.userPassword')" prop="password">
            <el-input v-model="form.password" />
          </el-form-item>
          <el-form-item :label="this.$t('user.form.userConfirmPassword')" prop="confirmPassword">
            <el-input v-model="form.confirmPassword" />
          </el-form-item>
          <el-form-item :label="this.$t('user.form.userRole')" prop="role">
            <el-select v-model="form.role" :rules="formRules" filterable :placeholder="this.$t('user.form.userRole')">
              <el-option label="Admin" value="1" />
              <el-option label="User" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="this.onSubmit">{{
              this.$t("general.save")
            }}</el-button>
            <el-button>{{ this.$t("general.reset") }}</el-button>
            <el-button type="primary" @click.native.prevent="$router.push(`/user`)">
              {{ $t("general.back") }}
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'UserForm',
  props: {
    user: Object
  },
  data() {
    const validateName = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('message.userNameRequired')))
      } else {
        callback()
      }
    }
    const validateEmail = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('message.emailRequired')))
      } else {
        callback()
      }
    }
    const validateRole = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('message.roleRequired')))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('message.passwordRequired')))
      } else {
        callback()
      }
    }
    const validateconfirmPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('message.confirmPasswordRequired')))
      } else if (value !== this.form.password) {
        callback(new Error(this.$t('message.passwordMismatch')))
      } else {
        callback()
      }
    }

    return {
      form: {
        name: '',
        email: '',
        role: '',
        password: '',
        confirmPassword: ''
      },
      dialogVisible: false,
      formRules: {
        name: [{
          required: true,
          trigger: 'blur',
          validator: validateName
        }],
        email: [{
          required: true,
          trigger: 'blur',
          validator: validateEmail
        }],
        role: [{
          required: true,
          trigger: 'change',
          validator: validateRole
        }],
        password: [{
          required: true,
          trigger: 'blur',
          validator: validatePassword
        }],
        confirmPassword: [{
          required: true,
          trigger: 'blur',
          validator: validateconfirmPassword
        }]
      }
    }
  },
  watch: {
    user: function(newDevice, oldDevice) {
      this.form.name = newDevice.name
      this.form.email = newDevice.email
      this.form.role = newDevice.role
      this.form.password = newDevice.password
      this.form.confirmPassword = newDevice.password
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        console.log(this.form.name, valid)
        if (valid) {
          this.$emit('onFormSubmit', this.form)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
