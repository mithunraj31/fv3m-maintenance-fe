<template>
  <div class="app-container">
    <el-row>
      <el-col :span="12">
        <el-form ref="form" :rules="formRules" :model="form" label-width="120px">
          <el-form-item :label="this.$t('general.images')">
            <el-upload
              :action="apiEndpoint + '/images'"
              list-type="picture-card"
              multiple
              :auto-upload="true"
              :on-success="onUploaded"
              :on-error="onUploadFailed"
              :on-preview="onPreviewImage"
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
          <el-form-item :label="this.$t('general.description')" prop="description" required>
            <el-input v-model="form.description" type="textarea" />
          </el-form-item>
          <el-form-item :label="this.$t('general.latitude')" prop="lat">
            <el-input v-model="form.lat" />
          </el-form-item>
          <el-form-item :label="this.$t('general.longitude')" prop="lng">
            <el-input v-model="form.lng" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">{{ this.$t('general.save') }}</el-button>
            <el-button @click="$router.go(-1)">{{ this.$t('general.cancel') }}</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <template v-if="hasPreviewImage">
      <image-viewer v-if="hasPreviewImage" :z-index="2000" :initial-index="0" :on-close="closePreviewImage" :url-list="previewImageSource" />
    </template>
  </div>
</template>

<script>
import ImageViewer from 'element-ui/packages/image/src/image-viewer'

let prevOverflow = ''

export default {
  name: 'MaintenanceForm',
  components: { ImageViewer },
  props: {
    previewUrl: {
      type: Object,
      default: () => {
        return {
          source: ''
        }
      }
    },
    maintenance: {
      type: Object,
      default: () => {
        return {
          id: 0,
          name: '',
          description: '',
          lat: '',
          lng: '',
          deviceId: 0,
          images: []
        }
      }
    }
  },
  data() {
    const validateDescription = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('message.descriptionRequired')))
      } else {
        callback()
      }
    }
    return {
      form: {
        lat: '',
        lng: '',
        description: '',
        name: '',
        deviceId: 0
      },
      fileList: [],
      newFileList: [],
      formRules: {
        description: [
          { required: true, trigger: 'blur', validator: validateDescription }
        ]
      }
    }
  },
  computed: {
    apiEndpoint() {
      return this.$store.getters.apiEndpoint
    },
    token() {
      return this.$store.getters.token
    },
    previewImageSource() {
      return [this.previewUrl.source]
    },
    hasPreviewImage() {
      return this.previewUrl.source && this.previewUrl.source.length > 0
    }
  },
  watch: {
    maintenance: function(newMaintenance, editMaintenance) {
      this.form.id = newMaintenance.id
      this.fileList = newMaintenance.fileList
      this.form.lat = newMaintenance.lat
      this.form.lng = newMaintenance.lng
      this.form.description = newMaintenance.description
      this.form.deviceId = this.$route.params.id
    }
  },
  mounted() {
    this.form.deviceId = this.$route.params.id
  },
  methods: {
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
    onSubmit() {
      this.$emit('onFormSubmit', {
        ...this.form,
        imageUrls: [...this.fileList || [], ...this.newFileList || []]
      })
    },
    onPreviewImage(file) {
      // prevent body scroll
      prevOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      this.previewUrl.source = file.url
    },
    closePreviewImage() {
      document.body.style.overflow = prevOverflow
      this.previewUrl.source = ''
    }
  }
}
</script>
