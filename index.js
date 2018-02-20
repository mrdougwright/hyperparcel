// index.js
console.log('hello parcel')

import { h, app } from 'hyperapp'

const view = () =>
  <div>
    hello hyperapp
  </div>

app({}, {}, view, document.body)
// app(state, actions, view, DOM el to attach to)
