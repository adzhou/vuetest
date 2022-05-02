import request from '@/utils/request'
import qs from 'qs';

export default {
  getLinks() {
    return request({
      url: '/data/links.json',
      method: 'get'
    })
  }
}
