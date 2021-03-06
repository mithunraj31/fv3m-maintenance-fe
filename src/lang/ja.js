export default {
  route: {
    dashboard: 'トップ',
    documentation: 'ドキュメント',
    guide: 'ガイド',
    permission: '権限',
    rolePermission: '権限ロール',
    pagePermission: 'ページ権限',
    directivePermission: 'ディレクティブ権限',
    icons: 'アイコン',
    components: 'コンポーネント',
    tinymce: 'TinyMCE',
    markdown: 'Markdown',
    jsonEditor: 'JSON Editor',
    dndList: 'Drag-And-Drop',
    splitPane: 'パネル',
    avatarUpload: 'アバターアップロード',
    dropzone: 'Dropzone',
    sticky: 'Sticky',
    countTo: 'Count To',
    componentMixin: 'コンポーネントMixin',
    backToTop: 'BackToTop',
    dragDialog: 'Drag Dialog',
    dragSelect: 'Drag Select',
    dragKanban: 'Drag 看板',
    charts: 'チャート',
    keyboardChart: 'Keyboardチャート',
    lineChart: 'Lineチャート',
    mixChart: 'Mixチャート',
    example: 'Example',
    nested: 'Nested Routes',
    menu1: 'メニュー１',
    'menu1-1': 'メニュー 1-1',
    'menu1-2': 'メニュー 1-2',
    'menu1-2-1': 'メニュー 1-2-1',
    'menu1-2-2': 'メニュー 1-2-2',
    'menu1-3': 'メニュー 1-3',
    menu2: 'メニュー 2',
    Table: 'Table',
    dynamicTable: '可変 Table',
    dragTable: 'Drag Table',
    inlineEditTable: 'Inline Edit Table',
    complexTable: 'Complex Table',
    tab: 'Tab',
    form: 'フォーム',
    createArticle: '投稿作成',
    editArticle: '投稿編集',
    articleList: '投稿リスト',
    errorPages: 'エラーページ',
    page401: '401',
    page404: '404',
    errorLog: 'エラーログ',
    excel: 'Excel',
    exportExcel: '一括エクスポート',
    selectExcel: '複数選択エクスポート',
    mergeHeader: 'ヘッダーマージ',
    uploadExcel: 'アップロード',
    zip: 'Zip',
    pdf: 'PDF',
    exportZip: 'Export Zip',
    theme: 'テーマ変更',
    clipboardDemo: 'Clipboard',
    i18n: '多言語',
    externalLink: '外部リンク',
    profile: 'プロフィール',
    deviceListings: 'デバイス',
    userListings: 'ユーザー',
    newUser: 'ユーザーを追加',
    editUser: 'ユーザーID:{0}を編集',
    editUserBreadcrumbTitle: 'ユーザーを編集',
    customerListings: '顧客',
    newCustomer: '顧客を追加',
    editCustomer: '顧客ID:{0}を編集',
    editCustomerBreadcrumbTitle: '顧客を編集',
    newDevice: 'デバイスを追加',
    editDevice: 'デバイスID:{0}を編集',
    editDeviceBreadcrumbTitle: 'デバイスを編集',
    maintenanceHistoryBreadcrumbTitle: 'メンテナンス履歴',
    maintenanceHistory: 'デバイスID「{0}」のメンテナンス履歴',
    newMaintenanceHistory: 'メンテナンスを追加',
    editMaintenanceHistory: 'メンテナンス履歴ID「{0}」を編集',
    editMaintenanceHistoryBreadcrumbTitle: 'メンテナンス履歴を編集'

  },
  navbar: {
    dashboard: 'トップ',
    github: 'GitHub',
    logOut: 'ログアウト',
    profile: 'プロフィール',
    theme: 'テーマ変更',
    size: '画面サイズ'
  },
  login: {
    title: 'ユーザログイン',
    logIn: 'ログイン',
    username: 'ユーザ名',
    password: 'パスワード',
    usernameCorrectlyRequired: 'ユーザー名を正しく入力してください。',
    passwordCorrectlyRequired: 'パスワードを正しく入力してください。',
    heroTitle: 'FORKERS V3のメンテナンスする管理システム',
    heroDescription:
      '',
    keepSignin: 'サインインを維持'
  },
  documentation: {
    documentation: 'ドキュメント',
    github: 'Github Link'
  },
  permission: {
    addRole: 'ロール追加',
    editPermission: 'ロール変更',
    roles: 'ロール',
    switchRoles: 'ロール切替',
    tips:
      'v-permissionは使えない時があります。例えば: Element-UI の el-tab、 el-table-column 及び他の dom。v-ifを使う必要があります。',
    delete: '削除',
    confirm: '確認',
    cancel: 'キャンセル'
  },
  guide: {
    description: 'ガイドは各機能の説明です。',
    button: 'ガイドを見る'
  },
  components: {
    documentation: 'ドキュメント',
    tinymceTips:
      'tinymceは管理画面に重要な機能ですが、その同時に落とし穴がありあす。tinymceを使う道のりが大変でした。Tinymceを使う時に各自のプロジェクト状況で判断が必要です。ドキュメントはこちら',
    dropzoneTips:
      'Third partyのパッケージを使わず、独自の実装しています。詳細は @/components/Dropzone',
    stickyTips: 'ページの指定位置へスクロールした場合、表示されます。',
    backToTopTips1: 'トップへスクロールが表示されます。',
    backToTopTips2:
      'ボタンのスタイルはカスタマイズできます。例えば、show/hide、height、position。 またはElementのel-tooltipを使って、ツールチップを実装できます。',
    imageUploadTips:
      'mockjsは使えないため、カスタマイズしています。公式の最新バージョンを使ってください。'
  },
  table: {
    dynamicTips1: '先頭は固定、最後に追加',
    dynamicTips2: '戦後に追加せず、指定列に追加',
    dragTips1: 'デフォルト順番',
    dragTips2: 'Drag後の順番',
    title: 'タイトル',
    importance: '重要',
    type: 'タイプ',
    remark: '評価',
    search: '検索',
    add: '追加',
    export: 'エクスポート',
    reviewer: 'レビュアー',
    id: '番号',
    date: '日時',
    author: '作成者',
    readings: '閲覧数',
    status: 'ステータス',
    actions: '操作',
    edit: '編集',
    publish: '公開',
    draft: '下書き',
    delete: 'キャンセル',
    cancel: 'キャンセル',
    confirm: '確認'
  },
  example: {
    warning:
      '新規作成と編集画面は keep-alive を使えないです。keep-alive の include はrouteのキャッシュは使えないです。そのため、component name を使ってキャッシュさせるようにします。このようなキャッシュ機能を作りたい場合，localStorageを使う手があります。もしくは keep-alive の includeを使って、全ページキャッシュする方法はあります。'
  },
  errorLog: {
    tips: '右上のbugアイコンをクリックしてください。',
    description:
      '管理画面はspaを使う場合が多い、ユーザ体現向上はできますが、想定外エラーが発生する場合があります。Vueはそのエラーハンドリング機能を提供し、エラーレポートができます。',
    documentation: 'ドキュメント'
  },
  excel: {
    export: 'エクスポート',
    selectedExport: 'エクスポート対象を選択してください。',
    placeholder: 'ファイル名を入力してください。'
  },
  zip: {
    export: 'エクスポート',
    placeholder: 'ファイル名を入力してください。'
  },
  pdf: {
    tips: 'window.print() を使ってPDFダウンロードしています。'
  },
  theme: {
    change: 'テーマ切替',
    documentation: 'ドキュメント',
    tips:
      'Tips: テーマの切り替え方法はnavbarのtheme-pickと異なります、使い方はドキュメントを確認してください。'
  },
  tagsView: {
    refresh: '更新',
    close: '閉じる',
    closeOthers: 'その他閉じる',
    closeAll: 'すべて閉じる'
  },
  settings: {
    title: 'システムテーマ',
    theme: 'テーマ色',
    tagsView: 'Tags-View 開く',
    fixedHeader: 'Fixed Header',
    sidebarLogo: 'Sidebar Logo'
  },
  message: {
    languageChanged: '言語が変更されました',
    userNameRequired: 'ユーザー名が必要があります',
    emailRequired: 'メールが必要があります',
    roleRequired: '役割が必要があります',
    passwordRequired: 'パスワードが必要があります',
    confirmPasswordRequired: 'パスワードが必要であることを確認',
    passwordMismatch: 'パスワードの確認はパスワードと同じである必要があります',
    invalidLength: 'パスワードは6文字以上である必要があります。',
    emailNotValid: '有効なメールアドレスを入力してください',
    emailAlreadyRegistered: 'すでに登録されたメール',
    customerNameRequired: '顧客名が必要',
    customerDescriptionRequired: '顧客説明必須',
    deviceNameRequired: 'デバイス名は必要があります',
    serialNumberRequired: '通し番号は必要があります',
    deviceHasBeenCreated: 'デバイスが作成されました',
    somethingWentWrong: '何かがうまくいきませんでした',
    confirmDelete: '「{0}」を削除してもよろしいでしょうか',
    deviceHasBeenDeleted: 'デバイスが削除されました',
    deviceHasBeenEdited: 'デバイスが編集されました',
    memoHasBeenCreated: 'メモが作成されました',
    memoHasBeenUpdated: 'メモが編集されました',
    memoHasBeenDeleted: 'メモが削除されました',
    userHasBeenCreated: 'ユーザーが作成されました',
    userHasBeenDeleted: 'ユーザーが削除されました',
    userHasBeenEdited: 'ユーザーが編集されました',
    customerHasBeenCreated: '顧客が作成されました',
    customerHasBeenDeleted: '顧客が削除されました',
    customerHasBeenEdited: '顧客が編集されました',
    maintenanceInfoHasBeenCreated: 'メンテナンス履歴が作成されました',
    maintenanceInfoHasBeenDeleted: 'メンテナンス履歴が削除されました',
    maintenanceInfoHasBeenEdited: 'メンテナンス履歴が編集されました',
    descriptionRequired: '説明は必要があります'
  },
  error: {
    accountIncorrect: 'ユーザー名又はパスワードが間違っています'
  },
  deviceListings: {
    deviceId: '番号',
    serialNumber: '通し番号',
    deviceName: '名',
    owner: '主人',
    lastUpdated: '最終更新時刻',
    selectCompany: '会社を選択'
  },

  userListings: {
    userId: '番号',
    userName: '名',
    userEmail: 'Eメール',
    userRole: '役割',
    userUpdated: '最終更新時刻',
    selectUser: 'ユーザーを選択'
  },

  user: {
    listings: {
      userId: '番号',
      userName: '名',
      userEmail: 'Eメール',
      userRole: '役割',
      userUpdated: '最終更新時刻',
      selectUser: 'ユーザーを選択'
    },
    new: {
      title: 'ユーザーを追加'
    },
    edit: {
      title: 'ユーザーの編集'
    },
    form: {
      userName: '名',
      userEmail: 'Eメール',
      userRole: '役割',
      userPassword: 'パスワード',
      userConfirmPassword: '確認',
      changePassword: 'パスワードを変更'
    }
  },

  device: {
    listings: {
      deviceId: 'デバイス番号',
      serialNumber: '通し番号',
      deviceName: '名',
      owner: '主人',
      lastUpdated: '最終更新時刻',
      selectCompany: '会社を選択',
      newDevice: 'デバイスを追加',
      freeTextSearchPlaceholder: 'デバイス名を入力'
    },
    new: {
      title: 'デバイスを追加'
    },
    edit: {
      title: 'デバイスを編集'
    },
    form: {
      deviceName: 'デバイス名',
      serialNumber: '通し番号',
      registerDate: '登録日',
      mutatedDate: '変更された日付',
      deviceStatus: 'デバイス状態',
      status: {
        pending: '保留中',
        maintaining: '維持中',
        broken: '壊れた',
        unknown: '不詳'
      },
      operatingSystem: 'OS',
      android: 'アンドロイド',
      embedded: '埋め込み'
    },
    maintenance: {
      title: 'メンテナンス',
      card: {
        title: 'デバイス情報',
        basicInfo: '基本情報',
        notfound: '履歴が見つかりません',
        noImage: '写真がなし'
      },
      history: {
        viewMemo: 'メモを見る'
      },
      memo: {
        textarea: 'メモを入力',
        notfound: 'メモが見つかりません',
        newMomo: 'メモを追加',
        editMemo: 'メモを編集',
        memo: 'メモ'
      },
      newMaintenance: {
        title: 'メンテナンス情報を追加'
      },
      editMaintenance: {
        title: 'メンテナンス情報を編集'
      }
    }
  },
  customer: {
    listings: {
      id: '番号',
      name: '顧客名',
      description: '説明',
      updated: '最終更新時刻'
    },
    new: {
      title: '顧客を追加'
    },
    edit: {
      title: '顧客の編集'
    },
    form: {
      name: '顧客名',
      furigana: 'ふりがな',
      description: '説明'
    }
  },
  general: {
    reset: 'リセット',
    save: '保存',
    images: '写真',
    description: '説明',
    edit: '編集',
    delete: '削除',
    action: '活動',
    back: '戻る',
    cancel: 'キャンセル',
    confirm: '確認',
    warning: '注意',
    id: '番号',
    history: '履歴',
    company: '会社',
    image: '写真',
    createdAt: '作成日',
    updatedAt: '編集日',
    newest: '最新',
    oldest: '最古',
    admin: '管理者',
    user: '一般のユーザー',
    readOnly: '読み取り専用のユーザー',
    all: 'すべて',
    latitude: '緯度 (Lat)',
    longitude: '経度 (Lng)',
    clear: '入力をクリア'
  },
  notfound: {
    oops: 'おっと',
    largeText: 'こちらのページがありませんが、',
    smallText: '入力したURLが正しいことを確認するか、下のボタンをクリックしてトップページページに戻ってください',
    backToTopPage: 'トップページへ'
  }
}

