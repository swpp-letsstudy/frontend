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
  // Auth
  login: payload => axios.post(`${HOST}login/`, payload),
  logout: () => axios.post(`${HOST}logout/`),
  register: payload => axios.post(`${HOST}register/`, payload),
  signout: () => axios.post(`${HOST}signout/`),

  // UserSetting
  updateUserSetting: payload => axios.put(`${HOST}user_setting/`, payload),

  // Group
  loadGroups: () => axios.get(`${HOST}groups/`),
  createGroup: payload => axios.post(`${HOST}groups/`, payload),

  readGroup: payload => axios.get(`${HOST}groups/${payload.groupId}/`),
  deleteGroup: payload => axios.delete(`${HOST}groups/${payload.groupId}/`),
  joinGroup: payload => axios.get(payload.url),
  openCloseGroup: payload => axios.get(`${HOST}openclose_group/?groupId=${payload.groupId}`),
  setAttendanceFine: payload => axios.get(`${HOST}set_attendance_fine/?groupId=${payload.groupId}&amount=${payload.amount}`),
  getAttendanceFine: payload => axios.get(`${HOST}get_attendance_fine/?groupId=${payload.groupId}`),

  // Meeting
  loadMeetings: payload => axios.get(`${HOST}meetings/?groupId=${payload.groupId}`),
  loadFewMeetings: payload => axios.get(`${HOST}meetings_few/?groupId=${payload.groupId}&num=${payload.num}`),
  createMeeting: payload => axios.post(`${HOST}meetings/?groupId=${payload.groupId}`, payload),

  readMeeting: payload => axios.get(`${HOST}meetings/${payload.meetingId}/`),
  deleteMeeting: payload => axios.delete(`${HOST}meetings/${payload.meetingId}/`),

  // GroupNotice
  loadGroupNotices: payload => axios.get(`${HOST}group_notices/?groupId=${payload.groupId}`),
  loadFewGroupNotices: payload => axios.get(`${HOST}group_notices_few/?groupId=${payload.groupId}&num=${payload.num}`),
  createGroupNotice: payload => axios.post(`${HOST}group_notices/?groupId=${payload.groupId}`, payload),

  readGroupNotice: payload => axios.get(`${HOST}group_notices/${payload.groupNoticeId}/?groupId=${payload.groupId}`),
  deleteGroupNotice: payload => axios.delete(`${HOST}group_notices/${payload.groupNoticeId}/?groupId=${payload.groupId}`),

  // MeetingNotice
  loadMeetingNotices: payload => axios.get(`${HOST}meeting_notices/?meetingId=${payload.meetingId}`),
  createMeetingNotice: payload => axios.post(`${HOST}meeting_notices/?meetingId=${payload.meetingId}`, payload),

  readMeetingNotice: payload => axios.get(`${HOST}meeting_notices/${payload.meetingNoticeId}/?meetingId=${payload.meetingId}`),
  deleteMeetingNotice: payload => axios.delete(`${HOST}meeting_notices/${payload.meetingNoticeId}/?meetingId=${payload.meetingId}`),

  // Attendance
  toggleAttendance: payload => axios.post(`${HOST}attendance/`, payload),

  // Policy
  loadPolicies: payload => axios.get(`${HOST}policies/?groupId=${payload.groupId}`),
  createPolicy: payload => axios.post(`${HOST}policies/?groupId=${payload.groupId}`, payload),

  readPolicy: payload => axios.get(`${HOST}policies/${payload.policyId}/?groupId=${payload.groupId}`),
  updatePolicy: payload => axios.put(`${HOST}policies/${payload.policyId}/?groupId=${payload.groupId}`, payload),
  deletePolicy: payload => axios.delete(`${HOST}policies/${payload.policyId}/?groupId=${payload.groupId}`),

  // Fines
  readMyGroupFines: payload => axios.get(`${HOST}my_group_fines/?groupId=${payload.groupId}`),
  readMyMeetingFines: payload => axios.get(`${HOST}my_meeting_fines/?meetingId=${payload.meetingId}`),
  getFineSum: payload => axios.get(`${HOST}get_sum/?groupId=${payload.groupId}`),
  manageFine: payload => axios.get(`${HOST}manage_fine/?userId=${payload.userId}&meetingId=${payload.meetingId}&policyId=${payload.policyId}`),

  // CloudStorage
  loadFileTree: payload => axios.get(`${HOST}cloud_storage/?groupId=${payload.groupId}`),
  deleteFile: payload => axios.post(`${HOST}cloud_storage/delete/`, payload),
  fetchGetUrl: payload => axios.post(`${HOST}cloud_storage/get_url/get/`, payload),
  fetchUploadUrl: payload => axios.post(`${HOST}cloud_storage/get_url/upload/`, payload),
}
 