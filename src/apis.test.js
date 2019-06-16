import store from 'store'
import apis from 'apis'
import actions from 'store/actions'
import axios from 'axios'

const USERNAMES = [...Array(3).keys()].map(i => `user${i+1}`)
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
const testLogout = () =>{
  it('logout', done=> {
    apis.logout().then(data =>{
      expect(data.status).toEqual(200)
      done()
    })
  })
}
const testUserRegister = () => {
  it('register', done => {
    apis.register({username: 'test3', password: '1234'}).then(data =>{
      expect(data.status).toEqual(201)
      done()
    })
  })
}

const testRegister = () =>{ 
  testRegister()
  testUserLogin('test3','1234')
  testLogout()
}

const afterLoginTest = (testname, username, password, testfunc) => {
  it(testname, done => {
    store.dispatch(actions.login({username, password}))
        .then(() => testfunc(done))
  })
}

describe('apis.js', () => {
  
  //testRegister()

  testLogin()
  // group
  afterLoginTest('load groups', USERNAMES[0], PASSWORD, done => {
    apis.loadGroups()
    .then(data => {
      expect(data.status).toEqual(200)
      done()
    })
  })

  afterLoginTest('read group', USERNAMES[0], PASSWORD, done => {
    apis.readGroup({ groupId: 1 })
    .then(data => {
      expect(data.status).toEqual(200)
      done()
    })
  })

  afterLoginTest('create group', USERNAMES[0], PASSWORD, done => {
    apis.createGroup({ name: 'testgroup', info: 'test' })
    .then(data => {
      expect(data.status).toEqual(201)
      done()
    })
  })
  
  afterLoginTest('join group', USERNAMES[1], PASSWORD, done => {
    apis.joinGroup({url :'http://127.0.0.1:8000/join_group/?token=2'})
    .then(data => {
      expect(data.status).toEqual(200)
      done()
    })
  })

  afterLoginTest('exit group', USERNAMES[1], PASSWORD, done => {
    apis.deleteGroup({groupId : 2})
    .then(data => {
      expect(data.status).toEqual(204)
      done()
    })
  })
  // meeting 
  afterLoginTest('load meetings', USERNAMES[0], PASSWORD, done => {
    apis.loadMeetings({ groupId: 1 })
    .then(data => {
      expect(data.status).toEqual(200)
      done()
    })
  })
  
  afterLoginTest('create meeting', USERNAMES[0], PASSWORD, done => {
    apis.createMeeting({ groupId: 1, time: '2222-01-01T01:11' , info : 'test'})
    .then(data => {
      expect(data.status).toEqual(201)
      done()
    })
  })
  afterLoginTest('create meeting', USERNAMES[0], PASSWORD, done => {
    apis.createMeeting({ groupId: 1, time: '2222-01-01T01:11' , info : 'test2'})
    .then(data => {
      expect(data.status).toEqual(201)
      done()
    })
  })
  afterLoginTest('read meeting', USERNAMES[0], PASSWORD, done => {
    apis.readMeeting({ meetingId : 1})
    .then(data => {
      expect(data.status).toEqual(200)
      done()
    })
  })
  
  afterLoginTest('delete meeting', USERNAMES[0], PASSWORD, done => {
    apis.deleteMeeting({ meetingId : 2 })
    .then(data => {
      expect(data.status).toEqual(204)
      done()
    })
  })
  // GroupNotice
  afterLoginTest('load group_notices', USERNAMES[0], PASSWORD, done => {
    apis.loadGroupNotices({ groupId : 1 })
    .then(data => {
      expect(data.status).toEqual(200)
      done()
    })
  })

  afterLoginTest('create group_notice', USERNAMES[0], PASSWORD, done => {
    apis.createGroupNotice({ groupId : 1 , title : 'testNotice' , contents : 'testContent'})
    .then(data => {
      expect(data.status).toEqual(201)
      done()
    })
  })
  
  afterLoginTest('read group_notices', USERNAMES[0], PASSWORD, done => {
    apis.readGroupNotice({ groupId : 1 , noticeId : 1 })
    .then(data => {
      expect(data.status).toEqual(200)
      done()
    })
  })

  afterLoginTest('update group_notices', USERNAMES[0], PASSWORD, done => {
    apis.updateGroupNotice({ groupId : 1 , noticeId : 1 , title : 'testNoticeUpdate' , contents : 'testContentUpdate' })
    .then(data => {
      expect(data.status).toEqual(200)
      done()
    })
  })

  afterLoginTest('delete group_notices', USERNAMES[0], PASSWORD, done => {
    apis.deleteGroupNotice({ groupId : 1 , noticeId : 1  })
    .then(data => {
      expect(data.status).toEqual(204)
      done()
    })
  })
  //attendance
  afterLoginTest('attendance', USERNAMES[0], PASSWORD, done => {
    apis.toggleAttendance({ userId : 1, meetingId : 1})
    .then(data => {
      expect(data.status).toEqual(201)
      done()
    })
  })

  testLogout()
})