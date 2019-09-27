import { observable, action, runInAction } from 'mobx'
import xhr, { isFailed } from '_/fetch'

class AlbumStore {
  @observable albumCategoryList = []

  @action.bound
  async fetchAlbumCategoryList() {
    if (this.albumCategoryList.length !== 0) {
      return
    }
    const result = await xhr.get('/api/album/category/query')
    if (isFailed(result)) {
      return
    }
    runInAction(() => {
      this.albumCategoryList = result.data
    })
  }
}

export default AlbumStore
