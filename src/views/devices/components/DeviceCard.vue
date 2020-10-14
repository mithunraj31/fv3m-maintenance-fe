<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix">
      <span>{{ this.$t('device.maintenance.card.title') }}</span>
    </div>

    <div class="user-profile">
      <div class="box-center">
        <pan-thumb :image="''" :height="'100px'" :width="'100px'" :hoverable="false" />
      </div>
    </div>

    <div class="user-bio">
      <div class="user-education user-bio-section">
        <div class="user-bio-section-header">
          <svg-icon icon-class="documentation" />
          <span>{{ this.$t('device.maintenance.card.basic.Info') }}</span>
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
          <el-row class="basic-info-row">
            <el-col :span="6">
              <strong>{{ this.$t('device.form.isMutated') }}</strong>
            </el-col>
            <el-col :span="18">
              <i v-if="device.mutated" class="el-icon-success" />
              <i v-if="!device.mutated" class="el-icon-error" />
            </el-col>
          </el-row>
          <el-row v-if="device.mutated" class="basic-info-row">
            <el-col :span="6">
              <strong>{{ this.$t('device.form.mutatedDate') }}</strong>
            </el-col>
            <el-col :span="18" />
          </el-row>
          <el-row class="basic-info-row">
            <el-col :span="6">
              <strong>{{ this.$t('device.form.mutatedDate') }}</strong>
            </el-col>
            <el-col :span="18" />
          </el-row>
          <el-row class="basic-info-row">
            <el-col :span="6">
              <strong>{{ this.$t('device.form.operatingSystem') }}</strong>
            </el-col>
            <el-col :span="18" />
          </el-row>
          <div class="text-muted">{{ device.description }}</div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import PanThumb from '@/components/PanThumb'

export default {
  name: 'DeviceCard',
  components: { PanThumb },
  props: {
    device: {
      type: Object,
      default: () => {
        return {
          name: '',
          status: [],
          serialNumber: '',
          registerDate: '',
          mutated: false,
          os: '',
          description: ''
        }
      }
    }
  },
  computed: {

  }
}
</script>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
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
</style>
