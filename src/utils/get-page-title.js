import defaultSettings from '@/settings'
import i18n from '@/lang'
import { stringFormat } from '@/utils'

const title = defaultSettings.title || 'Maintenance System'

export default function getPageTitle(key, param) {
  const hasKey = i18n.te(`route.${key}`)
  if (hasKey) {
    let pageName = i18n.t(`route.${key}`)
    if (param) {
      pageName = stringFormat(pageName, param)
    }
    return `${pageName} - ${title}`
  }
  return `${title}`
}
