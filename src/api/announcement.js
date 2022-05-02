import request from '@/utils/request'
import qs from 'qs'

export default {
  getAnnouncement(page, showCount) {
    return request({
      url: '/news/' + page + '/' + showCount,
      method: 'get'
    })
  },
  sendAnnouncement(title, body) {
    return request({
      url: '/news',
      method: 'post',
      data: qs.stringify({'title': title, 'body': body})
    })
  },
  // top(announcementId, isTop) {
  //   return request({
  //     url: '/announcement/top/' + announcementId + '/' + isTop,
  //     method: 'put'
  //   })
  // },
  deleteAnnouncement(id) {
    return request({
      url: '/news/' + id,
      method: 'delete'
    })
  }
}
