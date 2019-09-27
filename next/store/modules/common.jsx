import { observable, action } from 'mobx'

class CommonStore {
  @observable asideIsOpen = true
  @observable isLongScroll = false
  @observable pathname = ''
  @observable globalProgress = false

  @action.bound openAside() {
    this.asideIsOpen = true
  }
  @action.bound closeAside() {
    this.asideIsOpen = false
  }
  @action.bound showHeaderShadow() {
    this.isLongScroll = true
  }
  @action.bound hideHeaderShadow() {
    this.isLongScroll = false
  }
  @action.bound switchMenuItem(pathname) {
    this.pathname = pathname
  }
  @action.bound showProgress() {
    this.globalProgress = true
  }
  @action.bound hideProgress() {
    this.globalProgress = false
  }
}

export default CommonStore
