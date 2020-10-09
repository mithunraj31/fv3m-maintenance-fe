
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

module.exports = [
  // user login
  {
    url: '/vue-element-admin/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 401,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/vue-element-admin/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/vue-element-admin/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/vue-element-admin/customers',
    type: 'get',
    response: () => {
      return {
        code: 20000,
        data: [
          {
            id: 0,
            name: '三井物産'
          },
          {
            id: 1,
            name: 'A会社'
          },
          {
            id: 2,
            name: 'B会社'
          }
        ]
      }
    }
  },

  {
    url: '/vue-element-admin/devices',
    type: 'get',
    response: () => {
      return {
        code: 20000,
        data: [
          {
            id: 1,
            serialNumber: 'de54VLSp',
            name: 'MBEL001',
            created: 'Thu Oct 08 2020 14:56:03 GMT+0900',
            updated: 'Thu Oct 08 2020 14:56:03 GMT+0900',
            createdUser: {
              id: 1,
              name: 'pongpeera',
              company: {
                id: 0,
                name: '三井物産'
              }
            },
            updatedUser: {
              id: 1,
              name: 'pongpeera',
              company: {
                id: 0,
                name: '三井物産'
              }
            },
            status: 0,
          },
          {
            id: 2,
            serialNumber: 'BNqqjJfH',
            name: 'MBEL002',
            created: 'Thu Oct 08 2020 14:56:03 GMT+0900',
            updated: 'Thu Oct 08 2020 14:56:03 GMT+0900',
            createdUser: {
              id: 1,
              name: 'pongpeera',
              company: {
                id: 0,
                name: '三井物産'
              }
            },
            updatedUser: {
              id: 1,
              name: 'pongpeera',
              company: {
                id: 0,
                name: '三井物産'
              }
            },
            status: 0,
          },
          {
            id: 3,
            serialNumber: 'Ma5e3YCo',
            name: 'MBEL003',
            created: 'Thu Oct 08 2020 14:56:03 GMT+0900',
            updated: 'Thu Oct 08 2020 14:56:03 GMT+0900',
            createdUser: {
              id: 1,
              name: 'pongpeera',
              company: {
                id: 0,
                name: '三井物産'
              }
            },
            updatedUser: {
              id: 1,
              name: 'pongpeera',
              company: {
                id: 0,
                name: '三井物産'
              }
            },
            status: 0,
          },
          {
            id: 4,
            serialNumber: 'unQKUCt2',
            name: 'MBEL004',
            created: 'Thu Oct 08 2020 14:56:03 GMT+0900',
            updated: 'Thu Oct 08 2020 14:56:03 GMT+0900',
            createdUser: {
              id: 1,
              name: 'pongpeera',
              company: {
                id: 0,
                name: '三井物産'
              }
            },
            updatedUser: {
              id: 1,
              name: 'pongpeera',
              company: {
                id: 0,
                name: '三井物産'
              }
            },
            status: 0,
          },
          {
            id: 5,
            serialNumber: '9w69CuMK',
            name: 'A-CROP001',
            created: 'Thu Oct 08 2020 14:56:03 GMT+0900',
            updated: 'Thu Oct 08 2020 14:56:03 GMT+0900',
            createdUser: {
              id: 2,
              name: 'John',
              company: {
                id: 1,
                name: 'A会社'
              }
            },
            updatedUser: {
              id: 2,
              name: 'John',
              company: {
                id:1,
                name: 'A会社'
              }
            },
            status: 0,
          },
          {
            id: 6,
            serialNumber: 'PM762B3V',
            name: 'A-CROP002',
            created: 'Thu Oct 08 2020 14:56:03 GMT+0900',
            updated: 'Thu Oct 08 2020 14:56:03 GMT+0900',
            createdUser: {
              id: 2,
              name: 'John',
              company: {
                id: 1,
                name: 'A会社'
              }
            },
            updatedUser: {
              id: 2,
              name: 'John',
              company: {
                id:1,
                name: 'A会社'
              }
            },
            status: 0,
          },
          {
            id: 7,
            serialNumber: '7prSHwhH',
            name: 'A-CROP003',
            created: 'Thu Oct 08 2020 14:56:03 GMT+0900',
            updated: 'Thu Oct 08 2020 14:56:03 GMT+0900',
            createdUser: {
              id: 2,
              name: 'John',
              company: {
                id: 1,
                name: 'A会社'
              }
            },
            updatedUser: {
              id: 2,
              name: 'John',
              company: {
                id:1,
                name: 'A会社'
              }
            },
            status: 0,
          },
          {
            id: 8,
            serialNumber: 'zosLrFG9',
            name: 'A-CROP004',
            created: 'Thu Oct 08 2020 14:56:03 GMT+0900',
            updated: 'Thu Oct 08 2020 14:56:03 GMT+0900',
            createdUser: {
              id: 2,
              name: 'John',
              company: {
                id: 1,
                name: 'A会社'
              }
            },
            updatedUser: {
              id: 2,
              name: 'John',
              company: {
                id:1,
                name: 'A会社'
              }
            },
            status: 0,
          },
          {
            id: 9,
            serialNumber: 'QJGTJmn2',
            name: 'B-CROP001',
            created: 'Thu Oct 08 2020 14:56:03 GMT+0900',
            updated: 'Thu Oct 08 2020 14:56:03 GMT+0900',
            createdUser: {
              id: 3,
              name: 'Jane',
              company: {
                id: 2,
                name: 'B会社'
              }
            },
            updatedUser: {
              id: 3,
              name: 'Jane',
              company: {
                id: 2,
                name: 'B会社'
              }
            },
            status: 0,
          },
          {
            id: 10,
            serialNumber: '9ngRuS7U',
            name: 'B-CROP002',
            created: 'Thu Oct 08 2020 14:56:03 GMT+0900',
            updated: 'Thu Oct 08 2020 14:56:03 GMT+0900',
            createdUser: {
              id: 3,
              name: 'Jane',
              company: {
                id: 2,
                name: 'B会社'
              }
            },
            updatedUser: {
              id: 3,
              name: 'Jane',
              company: {
                id: 2,
                name: 'B会社'
              }
            },
            status: 0,
          },
          {
            id: 11,
            serialNumber: 'WxzKQ7oc',
            name: 'B-CROP003',
            created: 'Thu Oct 08 2020 14:56:03 GMT+0900',
            updated: 'Thu Oct 08 2020 14:56:03 GMT+0900',
            createdUser: {
              id: 3,
              name: 'Jane',
              company: {
                id: 2,
                name: 'B会社'
              }
            },
            updatedUser: {
              id: 3,
              name: 'Jane',
              company: {
                id: 2,
                name: 'B会社'
              }
            },
            status: 0,
          },
          {
            id: 12,
            serialNumber: 'S3rZuxVe',
            name: 'B-CROP004',
            created: 'Thu Oct 08 2020 14:56:03 GMT+0900',
            updated: 'Thu Oct 08 2020 14:56:03 GMT+0900',
            createdUser: {
              id: 3,
              name: 'Jane',
              company: {
                id: 2,
                name: 'B会社'
              }
            },
            updatedUser: {
              id: 3,
              name: 'Jane',
              company: {
                id: 2,
                name: 'B会社'
              }
            },
            status: 0,
          },
        ]
      }
    }
  },
]
