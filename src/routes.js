export default {
  LOGIN: '/login',
  REGISTER: '/register',

  GROUP_LIST: '/groups',
  GROUP_DETAIL: '/groups/:groupId',
  GROUP_FORM: '/groups/edit',

  MEETING_LIST: '/meetings',
  MEETING_DETAIL: '/meetings/:meetingId',
  MEETING_FORM: '/meetings/edit',

  CHATTING: '/chatting/:groupId',

  CLOUD_STORAGE: '/cloud-storage/:groupId',

  USER_SETTING: '/user_setting',
  GROUP_SETTING: '/group_setting',

  GROUP_NOTICE_LIST: '/group_notices',
  GROUP_NOTICE_DETAIL: '/group_notices/:groupNoticeId',
  GROUP_NOTICE_FORM: '/group_notice/edit',
  
  MEETING_NOTICE_DETAIL: '/meeting_notices/:meetingNoticeId',
  MEETING_NOTICE_FORM: '/meeting_notice/edit',

  MY_POLICY_LIST: '/my_policies',
  POLICY_LIST: '/policies',
  POLICY_DETAIL: '/policies/:policyId',
  POLICY_FORM: '/policies/edit',
  MY_MEETING_FINE_LIST: '/my_policies/:meetingId',
  MEETING_POLICY_MANAGE: '/policy_check',
}
