import store from 'store'
import apis from 'apis'
import actions from 'store/actions'
import axios from 'axios'

const USERNAMES = [...Array(3).keys()].map(i => `user${i}`)
const PASSWORD = '1234'

const testUserLogin = (username, password) => {
  it('login', done => {
    apis.login({ username: username, password: password }).then(data => {
      expect(data.data).toMatchObject({ username: username })
      done()
    })
  })
}

const testLogin = () => {
  USERNAMES.map(username => testUserLogin(username, PASSWORD))
}

const afterLoginTest = (testname, username, password, testfunc) => {
  it(testname, done => {
    store.dispatch(actions.login({username, password}))
        .then(() => testfunc(done))
  })
}

describe('apis.js', () => {

  testLogin()

  afterLoginTest('load groups', USERNAMES[0], PASSWORD, done => {
    apis.loadGroups()
    .then(data => {
      expect(data.status).toEqual(200)
      done()
    })
  })

  afterLoginTest('read group', USERNAMES[0], PASSWORD, done => {
    apis.readGroup({ groupId: 2 })
    .then(data => {
      expect(data.status).toEqual(200)
      done()
    })
  })
  
  afterLoginTest('join group', USERNAMES[0], PASSWORD, done => {
    apis.joinGroup({url :'http://127.0.0.1:8000/join_study_group/1/'})
    .then(data => {
      expect(data.status).toEqual(200)
      done()
    })
  })

  afterLoginTest('exit group', USERNAMES[0], PASSWORD, done => {
    apis.exitGroup({groupId : 1})
    .then(data => {
      expect(data.status).toEqual(200)
      done()
    })
  })

  afterLoginTest('join group', USERNAMES[0], PASSWORD, done => {
    apis.joinGroup({url :'http://127.0.0.1:8000/join_study_group/2/'})
    .then(data => {
      expect(data.status).toEqual(200)
      done()
    })
  })
  
  afterLoginTest('load meetings', USERNAMES[0], PASSWORD, done => {
        apis.loadMeetings({ groupId: 2 })
        .then(data => {
          expect(data.status).toEqual(200)
          done()
        })
  })
})