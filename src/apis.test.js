import apis from 'apis'

const testUserLogin = (username, password) => {
  it('login', done => {
    apis.login({ username: username, password: password }).then(data => {
      expect(data.data).toMatchObject({ username: username })
      done()
    })
  })
}

const testLogin = () => {
  [...Array(3).keys()].map(i => testUserLogin(`user${i}`, '1234'))
}

describe('apis.js', () => {
  testLogin()
})