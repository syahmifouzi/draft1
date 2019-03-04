import { observable, action, decorate } from 'mobx'

// How to remove experimental decorator
// https://ihatetomatoes.net/how-to-remove-experimentaldecorators-warning-in-vscode/

// from https://mobx.js.org/refguide/action.html
// @action boundClassMethod = (args) => { body }
// https://medium.com/dailyjs/mobx-react-best-practices-17e01cec4140
// more details mobx
// https://www.spectory.com/blog/MobX%20with%20React%20Introduction

class Store {
  title = '首页'

  updateTitle = title => {
    this.title = title
  }
}

decorate(Store, {
  title: observable,
  updateTitle: action,
})

export default new Store()