import ReportHeader from './components/header/ReportHeader.vue'
import UserHeader from './components/header/UserHeader.vue'

import User from './components/user/User.vue';
import UserStart from './components/user/UserStart.vue';
import UserDetail from './components/user/UserDetail.vue';
import UserEdit from './components/user/UserEdit.vue';
import UserAdd from './components/user/UserAdd.vue';

import ProfileDetail from './components/profile/ProfileDetail.vue'
import ProfileEdit from './components/profile/ProfileEdit.vue'

import Report from './components/report/Report.vue';
import ReportStart from './components/report/ReportStart.vue';
import ReportDetail from './components/report/ReportDetail.vue';
import ReportEdit from './components/report/ReportEdit.vue';
import ReportAdd from './components/report/ReportAdd.vue';

export const routes = [
  { path: '/', component: Report },

  { path: '/report', components: {
      default: Report,
      'header-top': ReportHeader
  }, children: [
      { path: '', component: ReportStart },
      { path: '/report-add', component: ReportAdd },
      { path: ':id', component: ReportDetail },
      
      { path: ':id/edit', component: ReportEdit, name: 'reportEdit' }
  ] },

    { path: '/user', components: {
        default: User,
        'header-top': UserHeader
    }, children: [
        { path: '', component: UserStart },
        { path: '/user-add', component: UserAdd, name: 'user-add' },
        { path: ':id', component: UserDetail },
        { path: ':id/edit', component: UserEdit, name: 'userEdit' }
    ] },
    
    { path: '/profile', components: {
        default: ProfileDetail
    }, children: [ 
        { path: ':id', component: ProfileDetail },
        { path: ':id/edit', component: ProfileEdit, name: 'ProfileEdit' }
    ] },

  { path: '*', redirect: '/' }
]