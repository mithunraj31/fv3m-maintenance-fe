<template>
  <div class="block">
    <el-row :gutter="20">
      <el-col v-loading="menoLoading" :span="16">
        <div v-if="!timeline || timeline.length == 0" class="memo-notfound" :style="{ backgroundImage: 'url(' + require('@/assets/memo-notfound.jpg') + ')' }">
          <h1>{{ $t('device.maintenance.memo.notfound') }}</h1>
        </div>
        <el-timeline>
          <el-timeline-item v-for="(item,index) of timeline" :key="index" :timestamp="formatDate(item.created_at)" placement="top">
            <el-card>
              <h4>{{ item.user.name }}</h4>
              <p>{{ item.description }}</p>
              <div v-if="item.images && item.images.length > 0">
                <el-carousel indicator-position="outside">
                  <el-carousel-item v-for="img in item.images" :key="img.id">
                    <img :src="img.url" class="image">
                  </el-carousel-item>
                </el-carousel>
              </div>
              <p>{{ timeline.updated_at }}</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-col>
      <el-col :span="8">
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
            <el-button @click="onCancelClicked">{{ this.$t('general.cancel') }}</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { fetechMenoByMaintenaceId, newMemo } from '@/api/device'
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
      menoLoading: false
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
      newMemo(form)
        .then(() => {
          this.form.description = ''
          this.fileList = []
          this.newFileList = []
          this.$message({
            message: this.$t('message.memoHasBeenCreated'),
            type: 'success'
          })
          this.fetchData()
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
      this.menoLoading = true
      fetechMenoByMaintenaceId(this.maintenanceId)
        .then(response => {
          const { data } = response
          this.timeline = data
          this.menoLoading = false
        })
        .catch(() => {
          this.$message({
            message: this.$t('message.somethingWentWrong'),
            type: 'error'
          })
          this.menoLoading = false
        })
    },
    onCancelClicked() {
      this.$emit('cancelClicked')
    },
    formatDate(date) {
      return moment(String(date)).format('YYYY/MM/DD hh:mm')
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
</style>
