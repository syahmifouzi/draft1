// Must make mobx stateless components
// because cant use decorators
// https://github.com/mobxjs/mobx-react

import React, { Fragment } from "react"
import { observer, inject } from "mobx-react"

const Counter = inject(`store`)(
  observer(({ store }) => (
    <Fragment>
      <div>Counted to: {store.title}</div>
    </Fragment>
  ))
)

export default Counter
