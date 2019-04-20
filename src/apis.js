import axios from 'axios'

export const loadGroups = payload => axios.get(`http://localhost:8000/study_groups/`)
export const readGroup = paylod => axios.get(`http://localhost:8000/study_groups/${paylod.groupId}/`)
export const loadMeetings = payload => axios.get(`http://localhost:8000/study_meetings?groupId=${payload.groupId}`)
export const login = payload => axios.post('http://localhost:8000/login/', payload)
export const logout = payload => axios.post('http://localhost:8000/logout/')
export const createGroup = payload => axios.post('http://localhost:8000/study_groups/', payload)
export const createMeeting = payload => axios.post('http://localhost:8000/study_meetings/', payload)
