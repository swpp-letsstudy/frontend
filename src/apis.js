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
  loadUserSetting: () => axios.get(`${HOST}user_setting/`),
  updateUserSetting: payload => axios.put(`${HOST}user_setting/`, payload),

  // Group
  loadGroups: () => axios.get(`${HOST}groups/`),
  createGroup: payload => axios.post(`${HOST}groups/`, payload),

  readGroup: payload => axios.get(`${HOST}groups/${payload.groupId}/`),
  updateGroup: payload => axios.put(`${HOST}groups/${payload.groupId}/`, payload),
  deleteGroup: payload => axios.delete(`${HOST}groups/${payload.groupId}/`),
  joinGroup: payload => axios.get(payload.url),

  // GroupNotice
  loadGroupNotices: payload => axios.get(`${HOST}group_notices/?groupId=${payload.groupId}`),
  createGroupNotice: payload => axios.post(`${HOST}group_notices/?groupId=${payload.groupId}`, payload),

  readGroupNotice: payload => axios.get(`${HOST}group_notices/${payload.noticeId}/?groupId=${payload.groupId}`),
  updateGroupNotice: payload => axios.put(`${HOST}group_notices/${payload.noticeId}/?groupId=${payload.groupId}`, payload),
  deleteGroupNotice: payload => axios.delete(`${HOST}group_notices/${payload.noticeId}/?groupId=${payload.groupId}`),

  // Meeting
  loadMeetings: payload => axios.get(`${HOST}meetings/?groupId=${payload.groupId}`),
  createMeeting: payload => axios.post(`${HOST}meetings/?groupId=${payload.groupId}`, payload),

  readMeeting: payload => axios.get(`${HOST}meetings/${payload.meetingId}/`),
  updateMeeting: payload => axios.put(`${HOST}meetings/${payload.meetingId}/`, payload),
  deleteMeeting: payload => axios.delete(`${HOST}meetings/${payload.meetingId}/`),

  // MeetingNotice
  loadMeetingNotices: payload => axios.get(`${HOST}meeting_notices/?meetingId=${payload.meetingId}`),
  createMeetingNotice: payload => axios.post(`${HOST}meeting_notices/?meetingId=${payload.meetingId}`, payload),

  readMeetingNotice: payload => axios.get(`${HOST}meeting_notices/${payload.noticeId}/?meetingId=${payload.meetingId}`),
  updateMeetingNotice: payload => axios.put(`${HOST}meeting_notices/${payload.noticeId}/?meetingId=${payload.meetingId}`, payload),
  deleteMeetingNotice: payload => axios.delete(`${HOST}meeting_notices/${payload.noticeId}/?meetingId=${payload.meetingId}`),

  // Attendance
  toggleAttendance: payload => axios.post(`${HOST}attendance/`, payload),

  // Policy
  loadPolicies: payload => axios.get(`${HOST}policies/?groupId=${payload.groupId}`),
  createPolicy: payload => axios.post(`${HOST}policies/?groupId=${payload.groupId}`, payload),

  readPolicy: payload => axios.get(`${HOST}policies/${payload.policyId}/?groupId=${payload.groupId}`),
  updatePolicy: payload => axios.put(`${HOST}policies/${payload.policyId}/?groupId=${payload.groupId}`, payload),
  deletePolicy: payload => axios.delete(`${HOST}policies/${payload.policyId}/?groupId=${payload.groupId}`),

  // MeetingFine
  loadMeeteingFines: payload => axios.get(`${HOST}meeting_fines/?meetingId=${payload.meetingId}`),
  createMeetingFine: payload => axios.post(`${HOST}meeting_fines/?meetingId=${payload.meetingId}`, payload),

  readMeetingFine: payload => axios.get(`${HOST}meeting_fines/${payload.meetingFineId}/?meetingId=${payload.meetingId}`),
  updateMeetingFine: payload => axios.put(`${HOST}meeting_fines/${payload.meetingFineId}/?meetingId=${payload.meetingId}`, payload),
  deleteMeetingFine: payload => axios.delete(`${HOST}meeting_fines/${payload.meetingFineId}/?meetingId=${payload.meetingId}`),

  // CloudStorage
  loadFileTree: payload => axios.get(`${HOST}cloud_storage/?groupId=${payload.groupId}`),
  deleteFile: payload => axios.post(`${HOST}cloud_storage/delete/`, payload),
  fetchGetUrl: payload => axios.post(`${HOST}cloud_storage/get_url/get/`, payload),
  fetchUploadUrl: payload => axios.post(`${HOST}cloud_storage/get_url/upload/`, payload),
}
