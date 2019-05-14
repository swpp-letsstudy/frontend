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
  // used in UserReducer
  login: payload => axios.post(`${HOST}login/`, payload),
  logout: payload => axios.post(`${HOST}logout/`),
  
  // used in GroupReducer
  loadGroups: payload => axios.get(`${HOST}study_groups/`),

  // not used in reducer
  register: payload => axios.post(`${HOST}register/`, payload),
  joinGroup: payload => axios.get(payload.url),
  exitGroup: payload => axios.delete(`${HOST}study_groups/${payload.groupId}/`),

  createGroup: payload => axios.post(`${HOST}study_groups/`, payload),
  readGroup: payload => axios.get(`${HOST}study_groups/${payload.groupId}/`),

  createMeeting: payload => axios.post(`${HOST}study_meetings/`, payload),
  readMeeting: payload => axios.get(`${HOST}study_meetings/${payload.meetingId}/`),
  loadMeetings: payload => axios.get(`${HOST}study_meetings?groupId=${payload.groupId}`),
  toggleAttendance: payload => axios.post(`${HOST}attendances/`, payload),
}
