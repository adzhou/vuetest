import request from '@/utils/request'
import qs from 'qs';

export default {
  getNewsHome(page, showCount) {
    return request({
      url: '/news/home/' + page + '/' + showCount,
      method: 'get'
    })
  },
  getNewsById(id, isClick) {
    return request({
      url: '/news/' + id + '/' + isClick,
      method: 'get'
    })
  },
  getMyNews(page, showCount) {
    return request({
      url: '/news/mynews/' + page + '/' + showCount,
      method: 'get'
    })
  },
  sendNews(newsTitle, newsBody, tagId) {  //发布文章
    // alert(qs.stringify({'newsTitle': newsTitle, 'newsBody': newsBody,'tagId':tagId}))
    return request({
      url: '/news',
      method: 'post',
      data: qs.stringify({'newsTitle': newsTitle, 'newsBody': newsBody, 'tagId': tagId})
    })
  },
  uploadImg(formdata) {
    return request({
      url: '/news/uploadImg',
      method: 'post',
      data: formdata,
      headers: {'Content-Type': 'multipart/form-data'},
    })
  },
  editNews(newsId, newsTitle, newsBody, tagId) {  //发布文章
    return request({
      url: '/news/' + newsId,
      method: 'put',
      data: qs.stringify({'newsTitle': newsTitle, 'newsBody': newsBody, 'tagId': tagId})
    })
  },
  adminDeleteNews(newsId) { //管理员删除文章
    return request({
      url: '/news/admin/' + newsId,
      method: 'delete'
    })
  },
  userDeleteNews(newsId) { //普通用户删除文章
    return request({
      url: '/news/' + newsId,
      method: 'delete'
    })
  },
  adminGetNews(page, showCount) {
    return request({
      url: '/news/AllNews/' + page + '/' + showCount,
      method: 'get'
    })
  },
  adminSearchNews(searchTxt, page, showCount) {
    return request({
      url: '/news/searchAllNews/' + page + '/' + showCount + '?search=' + searchTxt,
      method: 'get'
    })
  },
  userSearchNews(searchTxt, page, showCount) {
    return request({
      url: '/news/searchNews/' + page + '/' + showCount + '?search=' + searchTxt,
      method: 'get'
    })
  }
}
