import { observable, action, runInAction } from 'mobx'
import xhr, { isFailed } from '_/fetch'

class ArticleStore {
  @observable articleList = []
  @observable articleDetail = {}
  @observable commentMap = {}

  @action.bound
  async fetchArticleList(force) {
    if (this.articleList.length !== 0 && !force) {
      return
    }
    const result = await xhr.get('/api/article')
    if (isFailed(result)) {
      return
    }
    runInAction(() => {
      this.articleList = result.data
    })
  }
  @action.bound
  async fetchArticleDetail(articleId, force) {
    if (this.articleDetail[articleId] && !force) {
      return
    }
    const result = await xhr.get(`/api/article/${articleId}`)
    if (isFailed(result)) {
      return
    }
    runInAction(() => {
      this.articleDetail[articleId] = result.data
    })
  }
  @action.bound
  async fetchArticleComment(articleId, force) {
    if (this.commentMap[articleId] && !force) {
      return
    }
    const result = await xhr.get(`/api/comment/${articleId}`)
    if (isFailed(result)) {
      return
    }
    runInAction(() => {
      this.commentMap[articleId] = result.data
    })
  }
  @action.bound
  async addArticleComment(articleId, param) {
    const result = await xhr.post(`/api/comment/${articleId}`, param)
    if (isFailed(result)) {
      return
    }
    runInAction(() => {
      this.fetchArticleComment(articleId, true)
    })
  }
  @action.bound
  async removeArticle(articleId) {
    const result = await xhr.del(`/api/auth/article/${articleId}`)
    if (isFailed(result)) {
      return
    }
    runInAction(() => {
      this.articleList = this.articleList.filter(article => article.id !== articleId)
    })
  }
  @action.bound
  async swicthArticleStatus(articleId, isOnline) {
    const result = await xhr.put(`/api/auth/article/${articleId}`, { online: isOnline })
    if (isFailed(result)) {
      return
    }
    runInAction(() => {
      this.articleList = this.articleList.map((article) => {
        const temp = article
        if (temp.id === articleId) {
          temp.online = isOnline
        }
        return temp
      })
    })
  }
}

export default ArticleStore
