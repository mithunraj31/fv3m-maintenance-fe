<template>
  <div>
    <div v-for="history in histories" :key="history.id" class="user-activity">
      <div class="post">
        <div class="user-block">
          <img class="img-circle" :src="getUserAvatar(history.user.name)">
          <span class="username text-muted">
            {{ history.user.name }}
            <i class="el-icon-edit-outline" @click="$router.push(`/devices/${$route.params.id}/maintenance-histories/${history.id}/edit`)" />
            <i class="el-icon-delete-solid" @click="onDeleteMaintenanceHistoryClicked(history.id)" />
          </span>

          <span class="description">{{ $t('general.createdAt') }} {{ formatDate(history.created_at) }}</span>
          <span class="description">{{ $t('general.updatedAt') }} {{ formatDate(history.updated_at) }}</span>
        </div>
        <p>{{ history.description }}</p>
        <div v-if="history.images && history.images.length > 0" class="user-images">
          <el-row :gutter="8">
            <el-col v-for="image in history.images" :key="image.id" :span="3">
              <el-image
                :src="image.full_url"
                :preview-src-list="[ image.full_url] "
              />
            </el-col>
          </el-row>
        </div>
        <ul class="list-inline">
          <li @click="openMemoDialog(history.id)">
            <span class="link-black text-sm">
              <i class="el-icon-chat-line-square" />
              {{ $t('device.maintenance.history.viewMemo') }}
            </span>
          </li>
        </ul>
      </div>
      <el-dialog :title="''" :visible.sync="isMemoTimelineVisible" width="80%" :destroy-on-close="true">
        <memo-timeline :maintenance-id="maintenanceId" />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import MemoTimeline from './MemoTimline'
import { getUserAvatar } from '@/utils/user'
import moment from 'moment'
import { deleteMaintenance } from '@/api/maintenance'

export default {
  name: 'History',
  components: { MemoTimeline },
  props: {
    histories: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      isMemoTimelineVisible: false,
      maintenanceId: 0
    }
  },
  watch: {
    histories(newHistories, oldHistories) {
      this.histories = newHistories
    }
  },
  methods: {
    getUserAvatar,
    openMemoDialog(maintenanceId) {
      this.isMemoTimelineVisible = true
      this.maintenanceId = maintenanceId
    },
    formatDate(date) {
      return moment(String(date)).format('YYYY/MM/DD hh:mm')
    },
    onDeleteMaintenanceHistoryClicked(id) {
      let deleteConfirmMessage = this.$t('message.confirmDelete')
      deleteConfirmMessage = String.format(
        deleteConfirmMessage,
        `${this.$t('device.maintenance.title')}: ${id}`
      )

      this.$confirm(deleteConfirmMessage, this.$t('general.warning'), {
        confirmButtonText: this.$t('general.confirm'),
        cancelButtonText: this.$t('general.cancel'),
        type: 'warning'
      }).then(() => {
        this.deleteConfirmed(id)
      })
    },
    deleteConfirmed(id) {
      deleteMaintenance(id)
        .then(() => {
          this.$message({
            message: this.$t('message.maintenanceInfoHasBeenDeleted'),
            type: 'success'
          })
          this.$emit('onRefreshData')
        })
        .catch(() => {
          this.$message({
            message: this.$t('message.somethingWentWrong'),
            type: 'danger'
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.user-activity {
  .user-block {

    .username,
    .description {
      display: block;
      margin-left: 50px;
      padding: 2px 0;
    }

    .username{
      font-size: 16px;
      color: #000;
    }

    :after {
      clear: both;
    }

    .img-circle {
      border-radius: 50%;
      width: 40px;
      height: 40px;
      float: left;
    }

    span {
      font-weight: 500;
      font-size: 12px;
    }
  }

  .post {
    font-size: 14px;
    border-bottom: 1px solid #d2d6de;
    margin-bottom: 15px;
    padding-bottom: 15px;
    color: #666;

    .image {
      width: 100%;
      height: 100%;

    }

    .user-images {
      padding-top: 20px;
      .el-image {

        .image-slot {

          background: #f5f7fa;
          color: #909399;
          width: 100px;
          height: 100px;
        }
      }

    }
  }

  .list-inline {
    padding-left: 0;
    margin-left: -5px;
    list-style: none;

    li {
      display: inline-block;
      padding-right: 5px;
      padding-left: 5px;
      font-size: 13px;
    }

    .link-black {
      cursor: pointer;
      &:hover,
      &:focus {
        color: #999;
      }

    }
  }

}

.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}

.el-icon-edit-outline, .el-icon-delete-solid {
  cursor: pointer;
}

</style>
