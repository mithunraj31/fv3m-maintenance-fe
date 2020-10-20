<template>
  <div class="app-container">
    <el-row>
      <el-col :span="12">
        <el-form ref="form" :rules="formRules" :model="form" label-width="120px">
          <el-form-item :label="this.$t('general.company')">
            <customer-selector :customer-id="device.customerId" @onCustomerSelected="onCustomerSelected" />
          </el-form-item>
          <el-form-item :label="this.$t('general.images')">
            <el-upload
              :action="apiEndpoint + '/images'"
              list-type="picture-card"
              multiple
              :auto-upload="true"
              :on-success="onUploaded"
              :on-error="onUploadFailed"
              :on-remove="onRemveFile"
              :before-remove="beforRemove"
              name="image"
              accept="image/png,image/jpg,image/jpeg"
              :headers="{ 'Authorization': `Bearer ${token}` }"
              :file-list="fileList"
            >
              <i slot="default" class="el-icon-plus" />
            </el-upload>
          </el-form-item>
          <el-form-item :label="this.$t('device.form.deviceName')" prop="name">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item :label="this.$t('device.form.serialNumber')" prop="serialNumber">
            <el-input v-model="form.serialNumber" />
          </el-form-item>
          <el-form-item :label="this.$t('device.form.registerDate')">
            <el-date-picker
              v-model="form.registerDate"
              type="date"
              :placeholder="this.$t('device.form.registerDate')"
              style="width: 100%"
            />

          </el-form-item>
          <el-form-item :label="this.$t('device.form.isMutated')">
            <el-switch v-model="form.mutated" />
          </el-form-item>
          <el-form-item :label="this.$t('device.form.mutatedDate')">
            <el-date-picker
              v-model="form.mutatedDate"
              type="date"
              :placeholder="this.$t('device.form.mutatedDate')"
              style="width: 100%"
            />

          </el-form-item>
          <el-form-item :label="this.$t('device.form.deviceStatus')">
            <el-radio-group v-model="form.status">
              <el-radio :label="1">{{ this.$t('device.form.status.pending') }}</el-radio>
              <el-radio :label="2">{{ this.$t('device.form.status.maintaining') }}</el-radio>
              <el-radio :label="3">{{ this.$t('device.form.status.broken') }}</el-radio>
              <el-radio :label="0">{{ this.$t('device.form.status.unknown') }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="this.$t('device.form.operatingSystem')">
            <el-radio-group v-model="form.os">
              <el-radio :label="1">{{ this.$t('device.form.android') }}</el-radio>
              <el-radio :label="2">{{ this.$t('device.form.embedded') }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="this.$t('general.description')">
            <el-input v-model="form.description" type="textarea" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">{{ this.$t('general.save') }}</el-button>
            <el-button @click="$router.go(-1)">{{ this.$t('general.cancel') }}</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CustomerSelector from './CustomerSelector'

export default {
  name: 'DeviceForm',
  components: { CustomerSelector },
  props: {
    device: {
      type: Object,
      default: () => {
        return {
          id: 0,
          name: '',
          status: 0,
          serialNumber: '',
          registerDate: '',
          mutated: false,
          os: 0,
          description: '',
          customerId: 0,
          mutatedDate: ''
        }
      }
    }
  },
  data() {
    const validateName = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('message.deviceNameRequired')))
      } else {
        callback()
      }
    }
    const validateSerialNumber = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('message.serialNumberRequired')))
      } else {
        callback()
      }
    }

    return {
      form: {
        id: 0,
        name: '',
        status: 0,
        serialNumber: '',
        registerDate: '',
        mutated: false,
        os: 0,
        description: '',
        customerId: 0,
        mutatedDate: ''
      },
      dialogVisible: false,
      formRules: {
        name: [
          { required: true, trigger: 'blur', validator: validateName }
        ],
        serialNumber: [
          { required: true, trigger: 'blur', validator: validateSerialNumber }
        ]
      },
      fileList: [],
      newFileList: []

    }
  },
  computed: {
    apiEndpoint() {
      return this.$store.getters.apiEndpoint
    },
    token() {
      return this.$store.getters.token
    }
  },
  watch: {
    device: function(newDevice, oldDevice) {
      console.log(newDevice)
      this.form.id = newDevice.id
      this.form.name = newDevice.name
      this.form.status = newDevice.status
      this.form.customerId = newDevice.customerId
      this.fileList = newDevice.fileList
      this.form.mutatedDate = newDevice.mutatedDate
      this.form.serialNumber = newDevice.serialNumber
      this.form.registerDate = newDevice.registerDate
      this.form.os = newDevice.os
      this.form.description = newDevice.description
      this.form.mutated = newDevice.mutated
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        console.log(this.form)
        if (valid) {
          this.$emit('onFormSubmit', {
            ...this.form,
            imageUrls: [...this.fileList, ...this.newFileList]
          })
        }
      })
    },
    onCustomerSelected(selectedCustomerId) {
      this.form.customerId = selectedCustomerId
    },
    onUploaded(response, file, fileList) {
      this.newFileList.push({
        name: file.name,
        url: response.uri
      })
    },
    onRemveFile(file, fileList) {
      this.newFileList = []
      this.fileList = fileList.map(x => {
        return {
          name: x.name,
          url: x.response ? x.response.uri : x.url
        }
      })
    },
    onUploadFailed() {
      this.$message({
        message: this.$t('message.somethingWentWrong'),
        type: 'error'
      })
    },
    beforRemove(file) {
      return this.$confirm(String.format(this.$t('message.confirmDelete'), this.$t('general.image')))
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
