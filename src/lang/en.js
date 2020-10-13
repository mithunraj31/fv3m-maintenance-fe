export default {
  route: {
    dashboard: 'Dashboard',
    documentation: 'Documentation',
    guide: 'Guide',
    permission: 'Permission',
    pagePermission: 'Page Permission',
    rolePermission: 'Role Permission',
    directivePermission: 'Directive Permission',
    icons: 'Icons',
    components: 'Components',
    tinymce: 'Tinymce',
    markdown: 'Markdown',
    jsonEditor: 'JSON Editor',
    dndList: 'Dnd List',
    splitPane: 'SplitPane',
    avatarUpload: 'Avatar Upload',
    dropzone: 'Dropzone',
    sticky: 'Sticky',
    countTo: 'Count To',
    componentMixin: 'Mixin',
    backToTop: 'Back To Top',
    dragDialog: 'Drag Dialog',
    dragSelect: 'Drag Select',
    dragKanban: 'Drag Kanban',
    charts: 'Charts',
    keyboardChart: 'Keyboard Chart',
    lineChart: 'Line Chart',
    mixChart: 'Mix Chart',
    example: 'Example',
    nested: 'Nested Routes',
    menu1: 'Menu 1',
    'menu1-1': 'Menu 1-1',
    'menu1-2': 'Menu 1-2',
    'menu1-2-1': 'Menu 1-2-1',
    'menu1-2-2': 'Menu 1-2-2',
    'menu1-3': 'Menu 1-3',
    menu2: 'Menu 2',
    Table: 'Table',
    dynamicTable: 'Dynamic Table',
    dragTable: 'Drag Table',
    inlineEditTable: 'Inline Edit',
    complexTable: 'Complex Table',
    tab: 'Tab',
    form: 'Form',
    createArticle: 'Create Article',
    editArticle: 'Edit Article',
    articleList: 'Article List',
    errorPages: 'Error Pages',
    page401: '401',
    page404: '404',
    errorLog: 'Error Log',
    excel: 'Excel',
    exportExcel: 'Export Excel',
    selectExcel: 'Export Selected',
    mergeHeader: 'Merge Header',
    uploadExcel: 'Upload Excel',
    zip: 'Zip',
    pdf: 'PDF',
    exportZip: 'Export Zip',
    theme: 'Theme',
    clipboardDemo: 'Clipboard',
    i18n: 'I18n',
    externalLink: 'External Link',
    profile: 'Profile',
    deviceListings: 'Device listings',
    userListings: 'User listings',
    newUser: 'New user',
    editDevice: 'Edit user'
  },
  navbar: {
    dashboard: 'Dashboard',
    github: 'Github',
    logOut: 'Log Out',
    profile: 'Profile',
    theme: 'Theme',
    size: 'Global Size'
  },
  login: {
    title: 'Login',
    logIn: 'Login',
    username: 'Username',
    password: 'Password',
    usernameCorrectlyRequired: 'Please enter the correct user name',
    passwordCorrectlyRequired: 'The password can not be less than 6 digits',
    heroTitle: 'FORKERS V3 maintenance manage management system',
    heroDescription:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non eros feugiat, luctus nulla accumsan, lacinia lacus. Praesent a nisi vehicula, ultricies magna eu, tempus augue. Curabitur sodales massa et maximus rhoncus. Sed venenatis lectus magna, a sodales mi scelerisque id. Vestibulum ac vehicula mi. Maecenas tristique ut augue in auctor. Etiam tincidunt, velit a dignissim semper, mauris lacus elementum magna, ut lobortis nisi arcu vitae nulla. Praesent et elit nunc. Vivamus mattis leo congue elementum sollicitudin. Sed feugiat sagittis fermentum. Vestibulum sed sollicitudin sem. Aenean porta turpis nunc, at pretium elit viverra vel. Vestibulum vitae fermentum purus, vel finibus libero. Donec fermentum est quam, quis accumsan turpis facilisis in. Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br/><br/> Fusce finibus vitae magna non aliquet. Nulla sit amet hendrerit dolor, nec cursus lorem. Vestibulum consectetur ornare euismod. Sed at bibendum ante, in vestibulum nunc. Nunc vestibulum consectetur convallis. Nunc fringilla neque congue tincidunt lobortis. Sed et tempor lorem, sed porttitor elit. Nam sagittis efficitur pharetra. Etiam dui massa, sollicitudin nec imperdiet et, interdum et massa. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aenean aliquam mi massa, non tristique purus placerat eget. Nunc ultrices ut lorem sit amet condimentum. Nam at ultrices ipsum. Sed sed pulvinar velit. Aenean consectetur lorem in aliquam interdum. Mauris accumsan eros sed felis cursus accumsan. ',
    keepSignin: 'Keep sign in'
  },
  documentation: {
    documentation: 'Documentation',
    github: 'Github Repository'
  },
  permission: {
    addRole: 'New Role',
    editPermission: 'Edit',
    roles: 'Your roles',
    switchRoles: 'Switch roles',
    tips:
      'In some cases, using v-permission will have no effect. For example: Element-UI  el-tab or el-table-column and other scenes that dynamically render dom. You can only do this with v-if.',
    delete: 'Delete',
    confirm: 'Confirm',
    cancel: 'Cancel'
  },
  guide: {
    description:
      'The guide page is useful for some people who entered the project for the first time. You can briefly introduce the features of the project. Demo is based on ',
    button: 'Show Guide'
  },
  components: {
    documentation: 'Documentation',
    tinymceTips:
      'Rich text is a core feature of the management backend, but at the same time it is a place with lots of pits. In the process of selecting rich texts, I also took a lot of detours. The common rich texts on the market have been basically used, and I finally chose Tinymce. See the more detailed rich text comparison and introduction.',
    dropzoneTips:
      'Because my business has special needs, and has to upload images to qiniu, so instead of a third party, I chose encapsulate it by myself. It is very simple, you can see the detail code in @/components/Dropzone.',
    stickyTips:
      'when the page is scrolled to the preset position will be sticky on the top.',
    backToTopTips1:
      'When the page is scrolled to the specified position, the Back to Top button appears in the lower right corner',
    backToTopTips2:
      'You can customize the style of the button, show / hide, height of appearance, height of the return. If you need a text prompt, you can use element-ui el-tooltip elements externally',
    imageUploadTips:
      'Since I was using only the vue@1 version, and it is not compatible with mockjs at the moment, I modified it myself, and if you are going to use it, it is better to use official version.'
  },
  table: {
    dynamicTips1: 'Fixed header, sorted by header order',
    dynamicTips2: 'Not fixed header, sorted by click order',
    dragTips1: 'The default order',
    dragTips2: 'The after dragging order',
    title: 'Title',
    importance: 'Imp',
    type: 'Type',
    remark: 'Remark',
    search: 'Search',
    add: 'Add',
    export: 'Export',
    reviewer: 'reviewer',
    id: 'ID',
    date: 'Date',
    author: 'Author',
    readings: 'Readings',
    status: 'Status',
    actions: 'Actions',
    edit: 'Edit',
    publish: 'Publish',
    draft: 'Draft',
    delete: 'Delete',
    cancel: 'Cancel',
    confirm: 'Confirm'
  },
  example: {
    warning:
      'Creating and editing pages cannot be cached by keep-alive because keep-alive include does not currently support caching based on routes, so it is currently cached based on component name. If you want to achieve a similar caching effect, you can use a browser caching scheme such as localStorage. Or do not use keep-alive include to cache all pages directly. See details'
  },
  errorLog: {
    tips: 'Please click the bug icon in the upper right corner',
    description:
      'Now the management system are basically the form of the spa, it enhances the user experience, but it also increases the possibility of page problems, a small negligence may lead to the entire page deadlock. Fortunately Vue provides a way to catch handling exceptions, where you can handle errors or report exceptions.',
    documentation: 'Document introduction'
  },
  excel: {
    export: 'Export',
    selectedExport: 'Export Selected Items',
    placeholder: 'Please enter the file name (default excel-list)'
  },
  zip: {
    export: 'Export',
    placeholder: 'Please enter the file name (default file)'
  },
  pdf: {
    tips:
      'Here we use window.print() to implement the feature of downloading PDF.'
  },
  theme: {
    change: 'Change Theme',
    documentation: 'Theme documentation',
    tips:
      'Tips: It is different from the theme-pick on the navbar is two different skinning methods, each with different application scenarios. Refer to the documentation for details.'
  },
  tagsView: {
    refresh: 'Refresh',
    close: 'Close',
    closeOthers: 'Close Others',
    closeAll: 'Close All'
  },
  settings: {
    title: 'Page style setting',
    theme: 'Theme Color',
    tagsView: 'Open Tags-View',
    fixedHeader: 'Fixed Header',
    sidebarLogo: 'Sidebar Logo'
  },
  message: {
    languageChanged: 'Language has been changed',
    userNameRequired: 'User Name is Required',
    emailRequired: 'Email is Required',
    roleRequired: 'Role is Required'

  },
  error: {
    accountIncorrect: 'Username or password incorrect'
  },
  deviceListings: {
    deviceId: 'ID',
    serialNumber: 'Serial number',
    deviceName: 'name',
    owner: 'Owner',
    lastUpdated: 'Last updated',
    selectCompany: 'Select company'
  },

  user: {
    listings: {
      userId: 'ID',
      userName: 'Name',
      userEmail: 'Email',
      userRole: 'Role',
      userUpdated: 'Last updated',
      selectUser: 'Select user'
    },
    new: {
      title: 'New User'
    },
    edit: {
      title: 'Edit User'
    },
    form: {
      userName: 'User Name',
      userEmail: 'Email',
      userRole: 'Role'
    }
  },
  general: {
    reset: 'Reset',
    save: 'Save',
    images: 'Images',
    description: 'Description',
    edit: 'Edit',
    delete: 'Delete',
    action: 'Action',
    back: 'Return'
  }
}
