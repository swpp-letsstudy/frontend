import actions from './actions'
import store from './index'
import { initialUserState, initialGroupState} from "./reducers";
import axios from 'axios'

describe('store', () => {

  it('initial state', () => {
    expect(store.getState()).toEqual(expect.objectContaining({
      userReducer: initialUserState,
      groupReducer: initialGroupState,
    }))
  })

  it('before login', () => {
    expect(axios.defaults.headers.common['Authorization']).toEqual(undefined)
  })

  const USERNAME = 'user1'
  const PASSWORD = '1234'

  it('after login', done => {
    store.dispatch(actions.login({ username: USERNAME, password: PASSWORD }))
        .then(() => {

          // Partial matching. test whether B is part of A. ( expect(A).toMatchingObject(B) )
          expect(store.getState().userReducer).toMatchObject({
            isLoggedIn: true
          })

          

          // Opposite test
          expect(store.getState().userReducer.user.token).not.toEqual(undefined)

          // String match test
          expect(axios.defaults.headers.common['Authorization']).toMatch('Token')

          // Async test is ended after done() is executed
          done()
        })
  })
})