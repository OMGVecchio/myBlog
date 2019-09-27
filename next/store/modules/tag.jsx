import { observable, action, runInAction } from 'mobx'
import xhr, { isFailed } from '_/fetch'

class TagStore {
  @observable tagList = []

  @action.bound
  async fetchTagList() {
    if (this.tagList.length !== 0) {
      return
    }
    const result = await xhr.get('/api/tags')
    if (isFailed(result)) {
      return
    }
    runInAction(() => {
      this.tagList = result.data
    })
  }
}

export default TagStore
