import store from 'store'
import apis from 'apis'
import actions from 'store/actions'
import axios from 'axios'

const USERNAMES = [...Array(3).keys()].map(i => `user${i+1}`)
const PASSWORD = '1234'

const testUserLogin = (username, password) => {
  it('login', done => {
    apis.login({ username: username, password: password }).then(data => {
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

  afterLoginTest('openclose group', USERNAMES[0], PASSWORD, done => {
    apis.openCloseGroup({ groupId : 1 })
    .then(data => {
      expect(data.status).toEqual(200)
      done()
    })
  })

  afterLoginTest('set attendance fine', USERNAMES[0], PASSWORD, done => {
    apis.setAttendanceFine({ groupId : 1 ,  amount : 1000})
    .then(data => {
      expect(data.status).toEqual(200)
      done()
    })
  })

  afterLoginTest('get attendance fine', USERNAMES[0], PASSWORD, done => {
    apis.getAttendanceFine({ groupId : 1 })
    .then(data => {
      expect(data.status).toEqual(200)
      done()
    })
  })

  afterLoginTest('get success rate', USERNAMES[0], PASSWORD, done => {
    apis.getSuccessRate({ groupId : 1 })
    .then(data => {
      expect(data.status).toEqual(200)
      done()
    })
  })
  
  afterLoginTest('join group', USERNAMES[1], PASSWORD, done => {
    apis.joinGroup({url :'http://127.0.0.1:8000/join_group/?token=1'})
    .then(data => {
      expect(data.status).toEqual(200)
      done()
    })
  })

  afterLoginTest('exit group', USERNAMES[1], PASSWORD, done => {
    apis.deleteGroup({groupId : 1})
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

  afterLoginTest('load few meetings', USERNAMES[0], PASSWORD, done => {
    apis.loadFewMeetings({ groupId: 1 , num :0})
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

  afterLoginTest('load few group_notices', USERNAMES[0], PASSWORD, done => {
    apis.loadFewGroupNotices({ groupId : 1 , num :0 })
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
    apis.readGroupNotice({ groupId : 1 , groupNoticeId : 1 })
    .then(data => {
      expect(data.status).toEqual(200)
      done()
    })
  })

  afterLoginTest('delete group_notices', USERNAMES[0], PASSWORD, done => {
    apis.deleteGroupNotice({ groupId : 1 , groupNoticeId : 1  })
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
  // MeetingNotice
  afterLoginTest('load meeting_notices', USERNAMES[0], PASSWORD, done => {
    apis.loadMeetingNotices({ meetingId : 1 })
    .then(data => {
      expect(data.status).toEqual(200)
      done()
    })
  })

  afterLoginTest('create meeting_notice', USERNAMES[0], PASSWORD, done => {
    apis.createMeetingNotice({ meetingId : 1 , title : 'testNotice' , contents : 'testContent'})
    .then(data => {
      expect(data.status).toEqual(201)
      done()
    })
  })
  
  afterLoginTest('read meeting_notices', USERNAMES[0], PASSWORD, done => {
    apis.readMeetingNotice({ meetingId : 1 , meetingNoticeId : 1 })
    .then(data => {
      expect(data.status).toEqual(200)
      done()
    })
  })

  afterLoginTest('delete meeting_notices', USERNAMES[0], PASSWORD, done => {
    apis.deleteMeetingNotice({ meetingId : 1 , meetingNoticeId : 1  })
    .then(data => {
      expect(data.status).toEqual(204)
      done()
    })
  })
  //Policy
  afterLoginTest('load policies', USERNAMES[0], PASSWORD, done => {
    apis.loadPolicies({ groupId : 1 })
    .then(data => {
      expect(data.status).toEqual(200)
      done()
    })
  })

  afterLoginTest('create policy', USERNAMES[0], PASSWORD, done => {
    apis.createPolicy({ groupId : 1 , name : 'testname' , info : 'testinfo', amount : '1000'})
    .then(data => {
      expect(data.status).toEqual(201)
      done()
    })
  })
  
  afterLoginTest('read policy', USERNAMES[0], PASSWORD, done => {
    apis.readPolicy({ groupId : 1 , policyId : 1 })
    .then(data => {
      expect(data.status).toEqual(200)
      done()
    })
  })

  afterLoginTest('update policy', USERNAMES[0], PASSWORD, done => {
    apis.updatePolicy({ groupId : 1 , policyId : 1 , name : 'testname2' , info : 'testinfo2', amount : '10002'})
    .then(data => {
      expect(data.status).toEqual(200)
      done()
    })
  })

  // fines
  afterLoginTest('read my group fines', USERNAMES[0], PASSWORD, done => {
    apis.readMyGroupFines({ groupId : 1 })
    .then(data => {
      expect(data.status).toEqual(200)
      done()
    })
  })

  afterLoginTest('read my neeting fines', USERNAMES[0], PASSWORD, done => {
    apis.readMyMeetingFines({ meetingId : 1 })
    .then(data => {
      expect(data.status).toEqual(200)
      done()
    })
  })

  afterLoginTest('get fine sum', USERNAMES[0], PASSWORD, done => {
    apis.getFineSum({ groupId : 1 })
    .then(data => {
      expect(data.status).toEqual(200)
      done()
    })
  })

  afterLoginTest('read meeting fines', USERNAMES[0], PASSWORD, done => {
    apis.readMeetingFines({ meetingId : 1 })
    .then(data => {
      expect(data.status).toEqual(200)
      done()
    })
  })

  afterLoginTest('manage Fine', USERNAMES[0], PASSWORD, done => {
    apis.manageFine({ userId : 1,  meetingId : 1, policyId : 1 })
    .then(data => {
      expect(data.status).toEqual(200)
      done()
    })
  })

  afterLoginTest('delete policy', USERNAMES[0], PASSWORD, done => {
    apis.deletePolicy({ groupId : 1 , policyId : 1  })
    .then(data => {
      expect(data.status).toEqual(204)
      done()
    })
  })
  // cloudStroage
  afterLoginTest('load file tree', USERNAMES[0], PASSWORD, done => {
    apis.loadFileTree({ groupId : 1 })
    .then(data => {
      expect(data.status).toEqual(200)
      done()
    })
  })

  afterLoginTest('fetch upload url', USERNAMES[0], PASSWORD, done => {
    apis.fetchUploadUrl({ groupId : 1 , filepath :''})
    .then(data => {
      expect(data.status).toEqual(200)
      done()
    })
  })

  afterLoginTest('fetch get url', USERNAMES[0], PASSWORD, done => {
    apis.fetchGetUrl({ groupId : 1 , filepath :''})
    .then(data => {
      expect(data.status).toEqual(200)
      done()
    })
  })

  afterLoginTest('delete file', USERNAMES[0], PASSWORD, done => {
    apis.deleteFile({ groupId : 1,  filepath:''})
    .then(data => {
      expect(data.status).toEqual(200)
      done()
    })
  })

  testLogout()
})