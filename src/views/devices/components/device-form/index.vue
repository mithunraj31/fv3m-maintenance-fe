<template>
  <div class="app-container">
    <el-row>
      <el-col :span="12">
        <el-form ref="form" :rules="formRules" :model="form" label-width="120px">
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
          <!-- <el-form-item label="Activity zone">
            <el-select v-model="form.region" placeholder="please select your zone">
              <el-option label="Zone one" value="shanghai"></el-option>
              <el-option label="Zone two" value="beijing"></el-option>
            </el-select>
          </el-form-item> -->
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
            <el-checkbox-group v-model="form.status">
              <el-checkbox :label="this.$t('device.form.status.pending')" />
              <el-checkbox :label="this.$t('device.form.status.maintaining')" />
              <el-checkbox :label="this.$t('device.form.status.broken')" />
              <el-checkbox :label="this.$t('device.form.status.unknown')" />
            </el-checkbox-group>
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
            <el-button type="primary" @click="this.onSubmit">{{ this.$t('general.save') }}</el-button>
            <el-button>{{ this.$t('general.reset') }}</el-button>
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

export default {
  name: 'DeviceForm',
  props: {
    device: Object
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
        name: '',
        status: [],
        serialNumber: '',
        registerDate: '',
        mutated: false,
        os: '',
        description: ''
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
      this.form.name = newDevice.name
      this.form.serialNumber = newDevice.serialNumber
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
    },
    dialogImageUrl() {

    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
