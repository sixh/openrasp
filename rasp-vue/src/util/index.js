import axios from 'axios'
import Cookie from 'js-cookie'

export var attack_types = {
  'sql': 'SQL 注入',
  'command': '命令执行',
  'xxe': 'XXE 外部实体加载',
  'directory': '目录遍历',
  'rename': '文件重命名',
  'readFile': '任意文件下载',
  'include': '任意文件包含',
  'writeFile': '任意文件写入',
  'ssrf': 'SSRF 服务端请求伪造',
  'ognl': 'OGNL 代码执行',
  'webdav': '任意文件上传 (PUT)',
  'fileUpload': '任意文件上传',
  'deserialization': 'Transformer 反序列化',
  'webshell': 'WebShell 后门',
  'xss': 'XSS 跨站脚本攻击',
  'callable': 'WebShell - 变形后门',
  'webshell_eval': 'WebShell - 中国菜刀',
  'webshell_command': 'WebShell - 命令执行',
  'webshell_file_put_contents': 'WebShell - 后门上传'
}

export var status_types = {
  'block': '拦截请求',
  'log': '记录日志',
  'ignore': '忽略放行'
}

export function getDefaultConfig() {
  return {
    'general_config': {},
    'whitelist_config': [],
    'email_alarm_conf': {
      'recv_addr': []
    },
    'ding_alarm_conf': {
      'recv_user': [],
      'recv_party': []
    },
    'http_alarm_conf': {
      'recv_addr': []
    }
  }
}

export function block_status2name(status) {
  if (status_types[status]) {
    return status_types[status]
  }

  return status
}

export function attack_type2name(id) {
  if (attack_types[id]) {
    return attack_types[id]
  }

  return id
}

export function api_request(url, data, cb, err_cb) {
  var prefix = '/'

  // 本地开发
  if (process.env.NODE_ENV !== 'production') {
    prefix = 'http://scloud.baidu.com:8090/'

    axios.defaults.headers['X-OpenRASP-Token'] = '9256a3555fbd4f24f7a2ba915a32261ab4c720fc'
  }

  axios
    .post(prefix + url, data)
    .then(function(response) {
      if (response.status != 200) {
        alert('HTTP 请求出错: 响应码 ' + response.status)
      } else if (response.data.status != 0) {
        if (err_cb) {
          err_cb(response.data.status, response.data.description)
        } else {
          alert('API 接口出错: ' + response.data.status + ' - ' + response.data.description)
        }
      } else {
        console.log(url, response.data.data)
        cb(response.data.data)
      }
    })
    .catch(function(error) {
      console.log('axios 错误: ', url, error)
    })
}

export const request = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/' : 'http://scloud.baidu.com:8090/',
  timeout: 8000
})
request.interceptors.request.use(
  config => {
    if (process.env.NODE_ENV !== 'production') {
      config.headers['X-OpenRASP-Token'] = '9256a3555fbd4f24f7a2ba915a32261ab4c720fc'
    }
    return config
  },
  error => {
    console.error(error)
    Promise.reject(error)
  }
)
request.interceptors.response.use(
  response => {
    const res = response.data
    if (res.status !== 0) {
      if (res.status === 401) {
        Cookie.set('RASP_AUTH_ID', null)
        location.href = '/#/login'
        return
      }
      alert('API 接口出错: ' + res.status + ' - ' + res.description)
      return Promise.reject(res)
    } else {
      return res.data
    }
  },
  error => {
    alert('HTTP 请求出错: 响应码 ' + error.response.status)
    console.error(error)
    return Promise.reject(error)
  }
)
