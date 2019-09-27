import { useStaticRendering } from 'mobx-react'
import { observable } from 'mobx'
import { isServer } from '_'
import ArticleStore from '#/modules/article'
import CommonStore from '#/modules/common'
import TagStore from '#/modules/tag'
import AlbumStore from '#/modules/album'

useStaticRendering(isServer)

class Store {
  @observable articleStore = new ArticleStore()
  @observable commonStore = new CommonStore()
  @observable tagStore = new TagStore()
  @observable albumStore = new AlbumStore()

  hasHydrate = false
  hydrate = (initialStoreState = {}) => {
    if (this.hasHydrate) {
      return
    }
    Object.keys(initialStoreState).forEach((storeModuleKey) => {
      const storeModule = initialStoreState[storeModuleKey]
      Object.keys(storeModule).forEach((storeItemKey) => {
        this[storeModuleKey][storeItemKey] = storeModule[storeItemKey]
      })
    })
    this.hasHydrate = true
  }
}

const store = new Store()

export default store
