import axios from 'axios'

import { HOST } from 'config'

export const setHeaderAuthorization = token => {
  axios.defaults.headers.common['Authorization'] = `Token ${token}`
}

// Set header token for auto-logged in user
if (localStorage.hasOwnProperty('user')) {
  const token = JSON.parse(localStorage.getItem('user')).token
  setHeaderAuthorization(token)
}

export default {
  loadGroups: payload => axios.get(`${HOST}groups/`),
  readGroup: payload => axios.get(`${HOST}groups/${payload.groupId}/`),
  joinGroup: payload => axios.get(payload.url),
  exitGroup: payload => axios.delete(`${HOST}groups/${payload.groupId}/`),
  loadMeetings: payload => axios.get(`${HOST}meetings/?groupId=${payload.groupId}`),
  login: payload => axios.post(`${HOST}login/`, payload),
  register: payload => axios.post(`${HOST}register/`, payload),
  logout: payload => axios.post(`${HOST}logout/`),
  createGroup: payload => axios.post(`${HOST}groups/`, payload),
  createMeeting: payload => axios.post(`${HOST}meetings/`, payload),
  readMeeting: payload => axios.get(`${HOST}meetings/${payload.meetingId}/`),
  toggleAttendance: payload => axios.post(`${HOST}attendances/`, payload),
}
