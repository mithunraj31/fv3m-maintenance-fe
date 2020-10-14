<template>
  <div class="app-container">
    <el-row>
      <el-col :span="12">
        <el-form ref="form" :rules="formRules" :model="form" label-width="120px">
          <el-form-item :label="this.$t('general.company')">
            <customer-selector :customer-id="device.customerId" @onCustomerSelected="onCustomerSelected" />
          </el-form-item>
          <el-form-item :label="this.$t('general.images')">
            <el-upload action="#" list-type="picture-card" :auto-upload="false">
              <i slot="default" class="el-icon-plus" />
              <div slot="file" slot-scope="{file}">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                <span class="el-upload-list__item-actions">
                  <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                    <i class="el-icon-zoom-in" />
                  </span>
                  <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                    <i class="el-icon-delete" />
                  </span>
                </span>
              </div>
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
              <el-radio :label="this.$t('device.form.android')" />
              <el-radio :label="this.$t('device.form.embedded')" />
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="this.$t('general.description')">
            <el-input v-model="form.desc" type="textarea" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">{{ this.$t('general.save') }}</el-button>
            <el-button @click="$router.go(-1)">{{ this.$t('general.cancel') }}</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
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
          os: '',
          description: '',
          customerId: 0
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
        os: '',
        description: '',
        customerId: 0
      },
      dialogVisible: false,
      formRules: {
        name: [
          { required: true, trigger: 'blur', validator: validateName }
        ],
        serialNumber: [
          { required: true, trigger: 'blur', validator: validateSerialNumber }
        ]
      }
    }
  },
  watch: {
    device: function(newDevice, oldDevice) {
      this.form.id = newDevice.id
      this.form.name = newDevice.name
      this.form.status = newDevice.status
      this.form.customerId = newDevice.customerId
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('onFormSubmit', this.form)
        }
      })
    },
    dialogImageUrl() {

    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    onCustomerSelected(selectedCustomerId) {
      this.form.customerId = selectedCustomerId
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
