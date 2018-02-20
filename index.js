import { h, app } from 'hyperapp'
import debounce from 'debounce-promise'
import './styles/main.sass'

const state = {
  username: '',
  userData: null,
}

// redux-like actions
const actions = {
  updateUserName: (username) => (state, actions) => {
    getUserData(username).then(actions.setUserData)
    return { username }
  },
  setUserData: userData => state => ({ userData })
}


// api call
const getUserDataFn = username => {
  return fetch(`https://api.github.com/users/${username}`)
           .then(res => res.json())
}
const getUserData = debounce(getUserDataFn, 700)


// view
const view = (state, actions) =>
  <main>
    <div>Search github users:</div>
    <input
      type='text'
      className='searchInput'
      value={state.username}
      oninput={e => actions.updateUserName(e.target.value)}
    />
    <br />
    <div className='userCard'>
      {state.userData ? (
        <div>
          <img class='userCard__img' src={state.userData.avatar_url} />
          <div class='userCard__name'>{state.userData.name}</div>
          <div class='userCard__location'>{state.userData.location}</div>
        </div>
      ) : (
        <div>👆 search 'em</div>
      )}
    </div>
  </main>


// app(state, actions, view, DOM el to attach to)
app(state, actions, view, document.body)
