<template>
  <div class="block">
    <el-row :gutter="20">
      <el-col v-loading="memoLoading" :span="16">
        <div v-if="!timeline || timeline.length == 0" class="memo-notfound" :style="{ backgroundImage: 'url(' + require('@/assets/memo-notfound.jpg') + ')' }">
          <h1>{{ $t('device.maintenance.memo.notfound') }}</h1>
        </div>
        <el-timeline>
          <el-timeline-item v-for="(item, index) of timeline" :key="index" :timestamp="formatDate(item.created_at)" placement="top">
            <el-card>
              <div class="memo-header-section">
                <h4>{{ item.user.name }}</h4>
                <div class="tools-bar">
                  <h3>
                    <i class="el-icon-edit-outline" @click="onEditMemoClicked(item.id)" />
                    <i class="el-icon-delete-solid" @click="onDeleteMemoClicked(item.id)" />
                  </h3>
                </div>
              </div>
              <p>{{ item.description }}</p>
              <div v-if="item.images && item.images.length > 0">
                <el-carousel indicator-position="outside">
                  <el-carousel-item
                    v-for="img in item.images"
                    :key="img.id"
                    class="memo-image"
                    :style="{ 'background-image': `url(${img.full_url})` }"
                  />
                </el-carousel>
              </div>
              <p>{{ timeline.updated_at }}</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-col>
      <el-col :span="8">
        <h3 v-if="memoId == 0">{{ $t('device.maintenance.memo.newMomo') }}</h3>
        <h3 v-if="memoId != 0">{{ $t('device.maintenance.memo.editMemo') }}</h3>
        <el-form ref="form" :model="form">
          <el-form-item>
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
          <el-form-item>
            <el-input
              v-model="form.description"
              type="textarea"
              :autosize="{ minRows: 6, maxRows: 6}"
              :placeholder="this.$t('device.maintenance.memo.textarea')"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">{{ this.$t('general.save') }}</el-button>
            <el-button @click="clear">{{ this.$t('general.cancel') }}</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { deleteMemo, editMemo, fetchMemoById, fetechMemoByMaintenaceId, newMemo } from '@/api/device'
import moment from 'moment'
export default {
  name: 'MemoTimeline',
  props: {
    maintenanceId: {
      type: Number,
      default() {
        return 0
      }
    }
  },
  data() {
    return {
      form: {
        description: ''
      },
      timeline: [],
      fileList: [],
      newFileList: [],
      memoLoading: false,
      memoId: 0
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
    maintenanceId(newId, oldId) {
      this.fetchData()
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    dialogImageUrl() {

    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    onSubmit() {
      const form = {
        maintenanceId: this.maintenanceId,
        description: this.form.description,
        imageUrls: [...this.fileList, ...this.newFileList]
      }

      let subscriber = null
      let successMessage = null
      if (this.memoId && this.memoId > 0) {
        form.id = this.memoId
        subscriber = editMemo(form)
        successMessage = {
          message: this.$t('message.memoHasBeenUpdated'),
          type: 'success'
        }
      } else {
        subscriber = newMemo(form)
        successMessage = {
          message: this.$t('message.memoHasBeenCreated'),
          type: 'success'
        }
      }

      subscriber
        .then(() => {
          this.$message(successMessage)
          this.clear()
        })
        .catch(() => {
          this.$message({
            message: this.$t('message.somethingWentWrong'),
            type: 'error'
          })
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
    },
    fetchData() {
      this.memoLoading = true
      fetechMemoByMaintenaceId(this.maintenanceId)
        .then(response => {
          const { data } = response
          this.timeline = data
          this.memoLoading = false
        })
        .catch(() => {
          this.$message({
            message: this.$t('message.somethingWentWrong'),
            type: 'error'
          })
          this.memoLoading = false
        })
    },
    clear() {
      this.form.description = ''
      this.fileList = []
      this.newFileList = []
      this.memoId = 0
      this.fetchData()
    },
    async onEditMemoClicked(id) {
      this.memoId = id
      const { data } = await fetchMemoById(this.memoId)
      this.form.description = data.description
      this.fileList = data.images.map(x => {
        return {
          name: x.url,
          url: x.full_url
        }
      })
    },
    onDeleteMemoClicked(id) {
      let deleteConfirmMessage = this.$t('message.confirmDelete')
      deleteConfirmMessage = String.format(deleteConfirmMessage, this.$t('device.maintenance.memo.memo'))

      this.$confirm(deleteConfirmMessage, this.$t('general.warning'), {
        confirmButtonText: this.$t('general.confirm'),
        cancelButtonText: this.$t('general.cancel'),
        type: 'warning'
      }).then(() => {
        this.deleteConfirmed(id)
      })
    },
    formatDate(date) {
      return moment(String(date)).format('YYYY/MM/DD hh:mm')
    },
    deleteConfirmed(id) {
      deleteMemo(id)
        .then(() => {
          this.$message({
            message: this.$t('message.userHasBeenDeleted'),
            type: 'success'
          })
          this.clear()
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

<style lang="scss">
  .el-timeline {
    max-height: 500px;
    overflow-y: scroll;
  }

  .el-timeline-item__content {
    max-width: 880px;
  }

  .el-textarea__inner {
    min-height: 120px;
  }

  .memo-notfound {
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    opacity: 0.75;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;

    h1 {
      color: #000;
      font-size: 50px;
    }
  }

  .memo-image {
    background-size: cover;
    background-repeat:  no-repeat;
    background-position: center center;
  }
  .memo-header-section {
    display: flex;
    justify-content: space-between;
    .tools-bar {
      h3 {
        i {
          margin-left: 5px;
          cursor: pointer;
        }
      }
    }
  }

</style>
