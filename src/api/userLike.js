import request from '@/utils/request'
import qs from 'qs';

export default {
  saveUserLike(newsId, status) {
    return request({
        url: '/userLike/saveUserLike',
        method: 'post',
        header: 'Content-Type:application/json',
        data: qs.stringify({"news.id": newsId, "status": status})
    })
  },
  getNewsLikeCount(newsId) {
    return request({
        url: '/news/getNewsLikeCount'+ '/' + newsId,
        method: 'get'
    })
  },
  isUserLike(newsId) {
    return request({
        url: '/userLike/isUserLike'+ '/' + newsId,
        method: 'get'
    })
  },
}
