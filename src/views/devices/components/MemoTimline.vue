<template>
  <div class="block">
    <el-row :gutter="20">
      <el-col :span="16">
        <el-timeline>
          <el-timeline-item v-for="(item,index) of timeline" :key="index" :timestamp="item.timestamp" placement="top">
            <el-card>
              <h4>{{ item.title }}</h4>
              <p>{{ item.content }}</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-col>
      <el-col :span="8">
        <el-form ref="form" :model="form">
          <el-form-item>
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
          <el-form-item>
            <el-input
              v-model="form.detail"
              type="textarea"
              :autosize="{ minRows: 6, maxRows: 6}"
              :placeholder="this.$t('device.maintenence.memo.textarea')"
            />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">{{ this.$t('general.save') }}</el-button>
            <el-button>{{ this.$t('general.cancel') }}</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'MemoTimeline',
  data() {
    return {
      form: {
        detail: ''
      },
      timeline: [
        {
          timestamp: '2019/4/20',
          title: 'Update Github template',
          content: 'PanJiaChen committed 2019/4/20 20:46'
        },
        {
          timestamp: '2019/4/21',
          title: 'Update Github template',
          content: 'PanJiaChen committed 2019/4/21 20:46'
        },
        {
          timestamp: '2019/4/22',
          title: 'Build Template',
          content: 'PanJiaChen committed 2019/4/22 20:46'
        },
        {
          timestamp: '2019/4/23',
          title: 'Release New Version',
          content: 'PanJiaChen committed 2019/4/23 20:46'
        }
      ]
    }
  },
  methods: {
    dialogImageUrl() {

    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
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
</style>
