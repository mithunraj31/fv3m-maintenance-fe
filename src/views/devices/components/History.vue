<template>
  <div>
    <div v-for="history in histories" :key="history.id" class="user-activity">
      <div class="post">
        <div class="user-block">
          <img class="img-circle" :src="getUserAvatar(history.user.name)">
          <span class="username text-muted">{{ history.user.name }}</span>
          <span class="description">{{ $t('general.createdAt') }} {{ formatDate(history.created_at) }}</span>
          <span class="description">{{ $t('general.updatedAt') }} {{ formatDate(history.updated_at) }}</span>
        </div>
        <p>{{ history.description }}</p>
        <div v-if="history.images && history.images.length > 0" class="user-images">
          <el-carousel :interval="6000" type="card" height="220px">
            <el-carousel-item v-for="image in history.images" :key="image.id">
              <img :src="image.url" class="image">
            </el-carousel-item>
          </el-carousel>
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
</style>
