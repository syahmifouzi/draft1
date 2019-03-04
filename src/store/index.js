import { observable, action } from 'mobx'

// How to remove experimental decorator
// https://ihatetomatoes.net/how-to-remove-experimentaldecorators-warning-in-vscode/


class Store {
  @observable title = '首页'

  @action
  updateTitle = title => {
    this.title = title
  }
}

export default new Store()