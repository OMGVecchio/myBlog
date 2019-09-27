import { observable, action, runInAction } from 'mobx'
import xhr, { isFailed } from '_/fetch'

class ArticleStore {
  @observable articleList = []
  @observable articleDetail = {}
  @observable commentMap = {}

  @action.bound
  async fetchArticleList() {
    if (this.articleList.length !== 0) {
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
  async fetchArticleDetail(articleId) {
    if (this.articleDetail[articleId]) {
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
  async fetchArticleComment(articleId) {
    if (this.commentMap[articleId]) {
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
  async removeArticle(articleId) {
    const result = await xhr.get(`/api/auth/article/${articleId}`)
    if (isFailed(result)) {
      return
    }
    runInAction(() => {
      this.articleList = this.articleList.filter(article => article.id !== action.articleId)
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
        if (temp.id === action.articleId) {
          temp.online = action.online
        }
        return temp
      })
    })
  }
}

export default ArticleStore
