import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/vuex/index'
import { getToken } from '@/utils/auth'


// 创建axios实例
var prod
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api的base_url
  timeout: 15000, // 请求超时时间,
  header: 'Content-Type:application/x-www-form-urlencoded'
})

// request拦截器
service.interceptors.request.use(

  config => {
    // alert(store.state.token) //token可以通过此方式拿到

    if (store.getters.token || store.state.token == '') {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
      console.log('store.state.token:' + store.state.token);
      console.log('X-Token:' + config.headers['X-Token']);
    } else {
      config.headers['Authorization'] = store.state.token // 让每个请求携带自定义token 请根据实际情况自行修改
      console.log('store.state.token:' + store.state.token);
    }
    return config
  }, error => {
    // Do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  })

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非200是抛错 可结合自己业务进行修改
     * 如果非200, 响应在此被拦截, 具体调用代码中无需再判断是否为200
     */
    console.log('responsed');
    const res = response.data
    console.log('responsed2');
    console.log(res.code);


    // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      // to re-login
      MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
        confirmButtonText: 'Re-Login',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      })
      return Promise.reject(new Error(res.message || 'Error'))

    }

    if ((typeof (res.code) != "undefined" && res.code != 200) || (typeof (res.status) != "undefined" && res.status != true)) {

      if (typeof (res.code) != "undefined" && res.code != 403) {
        //开发环境
        // Message({
        //   message: res.code + ' : ' + res.message,
        //   type: 'error',
        //   duration: 5 * 1000
        // })
        console.log('responsed2');
        //生产环境
        Message({
          message: res.message || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      }

      if (typeof (res.status) != "undefined" && res.status != true) {
        Message({
          message: '远程接口错误',
          type: 'error',
          duration: 5 * 1000
        })
      }
      // 403:Token过期 或 权限不足(恶意访问/被封禁) ;
      if (res.code === 403) {
        store.commit('logout');
        MessageBox.confirm('你已被登出, 点击确定返回首页', '状态异常', {
          confirmButtonText: '确 定',
          cancelButtonText: '确 定',
          type: 'warning'
        }).then(() => {
          // window.location.href = '#/'
          router.push({ //路由跳转
            path: '/'
          })
          location.reload()
        }).catch(() => {

          router.push({ //路由跳转
            path: '/'
          })
          location.reload()
        })
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('错误:' + error.message)// for debug
    var message;
    if (error.response.status == 504) {
      message = '连接超时'
    } else {
      message = error.message
    }
    Message({
      message: message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
