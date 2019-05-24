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
  login: payload => axios.post(`${HOST}login/`, payload),
  register: payload => axios.post(`${HOST}register/`, payload),
  logout: payload => axios.post(`${HOST}logout/`),

  // Group
  loadGroups: payload => axios.get(`${HOST}groups/`),
  createGroup: payload => axios.post(`${HOST}groups/`, payload),

  readGroup: payload => axios.get(`${HOST}groups/${payload.groupId}/`),
  joinGroup: payload => axios.get(payload.url),
  exitGroup: payload => axios.delete(`${HOST}groups/${payload.groupId}/`),

  // GroupNotice
  loadGroupNotices: payload => axios.get(`${HOST}group_notices/?groupId=${payload.groupId}`),
  createGroupNotice: payload => axios.post(`${HOST}group_notices/?groupId=${payload.groupId}`, payload),

  readGroupNotice: payload => axios.get(`${HOST}group_notices/${payload.noticeId}/?groupId=${payload.groupId}`),
  updateGroupNotice: payload => axios.put(`${HOST}group_notices/${payload.noticeId}/?groupId=${payload.groupId}`, payload),
  deleteGroupNotice: payload => axios.delete(`${HOST}group_notices/${payload.noticeId}/?groupId=${payload.groupId}`),

  // Meeting
  loadMeetings: payload => axios.get(`${HOST}meetings/?groupId=${payload.groupId}`),
  createMeeting: payload => axios.post(`${HOST}meetings/`, payload),

  readMeeting: payload => axios.get(`${HOST}meetings/${payload.meetingId}/`),
  deleteMeeting: payload => axios.delete(`${HOST}meetings/${payload.meetingId}/`),

  // Attendance
  toggleAttendance: payload => axios.post(`${HOST}attendances/`, payload),
}
