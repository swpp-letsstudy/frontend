import axios from 'axios'

import { HOST } from 'config'

export default {
  loadGroups: payload => axios.get(`${HOST}study_groups/`),
  readGroup: paylod => axios.get(`${HOST}study_groups/${paylod.groupId}/`),
  loadMeetings: payload => axios.get(`${HOST}study_meetings?groupId=${payload.groupId}`),
  login: payload => axios.post(`${HOST}login/`, payload),
  logout: payload => axios.post(`${HOST}logout/`),
  createGroup: payload => axios.post(`${HOST}study_groups/`, payload),
  createMeeting: payload => axios.post(`${HOST}study_meetings/`, payload),
}
