<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix">
      <span>{{ this.$t('device.maintenance.card.title') }}</span>
    </div>

    <div class="user-profile">
      <el-carousel v-if="device.images && device.images.length > 0" indicator-position="outside">
        <el-carousel-item
          v-for="img in device.images"
          :key="img.id"
          class="device-image"
          :style="{ 'background-image': `url(${img.url})` }"
        />
      </el-carousel>
      <div v-if="!device.images || device.images.length == 0" class="no-image">
        <h2>{{ $t('device.maintenance.card.noImage') }}</h2>
      </div>
    </div>

    <div class="user-bio">
      <div class="user-education user-bio-section">
        <div class="user-bio-section-header">
          <svg-icon icon-class="documentation" />
          <span>{{ this.$t('device.maintenance.card.basicInfo') }}</span>
        </div>
        <div class="user-bio-section-body">
          <el-row class="basic-info-row">
            <el-col :span="6">
              <strong>{{ this.$t('device.form.deviceName') }}</strong>
            </el-col>
            <el-col :span="18">{{ device.name }}</el-col>
          </el-row>
          <el-row class="basic-info-row">
            <el-col :span="6">
              <strong>{{ this.$t('device.form.serialNumber') }}</strong>
            </el-col>
            <el-col :span="18">{{ device.serialNumber }}</el-col>
          </el-row>
          <el-row class="basic-info-row">
            <el-col :span="6">
              <strong>{{ this.$t('device.form.registerDate') }}</strong>
            </el-col>
            <el-col :span="18">{{ device.registerDate }}</el-col>
          </el-row>
          <el-row v-if="device.mutated" class="basic-info-row">
            <el-col :span="6">
              <strong>{{ this.$t('device.form.mutatedDate') }}</strong>
            </el-col>
            <el-col :span="18">{{ device.mutatedDate }}</el-col>
          </el-row>
          <el-row class="basic-info-row">
            <el-col :span="6">
              <strong>{{ this.$t('device.form.deviceStatus') }}</strong>
            </el-col>
            <el-col :span="18">{{ deviceStatus }}</el-col>
          </el-row>
          <el-row class="basic-info-row">
            <el-col :span="6">
              <strong>{{ this.$t('device.form.operatingSystem') }}</strong>
            </el-col>
            <el-col :span="18">{{ deviceOs }}</el-col>
          </el-row>
          <div class="text-muted">{{ device.description }}</div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'DeviceCard',
  props: {
    device: {
      type: Object,
      default: () => {
        return {
          name: '',
          status: 0,
          serialNumber: '',
          registerDate: '',
          os: '',
          description: '',
          images: [],
          statusName: ''
        }
      }
    }
  },
  computed: {
    deviceStatus() {
      if (!this.device.statusName || this.device.status.length === 0) {
        return ''
      }
      return this.$t(`device.form.status.` + this.device.statusName.toLowerCase())
    },
    deviceOs() {
      if (!this.device.os || this.device.os === 0) {
        return ''
      }

      if (this.device.os === 1) {
        return this.$t('device.form.android')
      } else {
        return this.$t('device.form.embedded')
      }
    }
  },
  watch: {
    device: function(newDevice, oldDevice) {
      this.device = newDevice
    }
  }
}
</script>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  margin-top: 10px;
  color: #777;
}

.user-profile {
  .user-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}

.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}

.basic-info-row {
  margin-top: 10px;
}

.device-image {
  background-size: cover;
  background-repeat:  no-repeat;
  background-position: center center;
}

.no-image {
  background: #d3dce6;
  min-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
