import {
  userInfo,
  getCards,
  getCoupons
} from '../service/getData'
import {
  GET_USERINFO,
  SET_ISLOGIN,
  GET_CARDS,
  SET_SESSION_ID,
  SET_MEMBER_ID,
  GET_COUPONS
} from './mutation-types.js'

export default {
  async getUserInfo ({
    commit,
    state
  }, params) {
    let resp = await userInfo()
    if (resp.return_code === '0000') {
      commit(GET_USERINFO, resp.data.userinfo)
      if (resp.data.userinfo.length !== 0) {
        commit(SET_ISLOGIN, true)
      } else {
        commit(SET_ISLOGIN, false)
      }
    }
  },
  async getCards ({
    commit,
    state
  }, params) {
    let resp = await getCards(params)
    if (resp.return_code === '0000') { commit(GET_CARDS, resp.data) }
  },
  setSessionId ({
    commit,
    state
  }, params) {
    commit(SET_SESSION_ID, params.session_id)
  },
  setMemberId ({
    commit,
    state
  }, params) {
    commit(SET_MEMBER_ID, params.member_id)
  },
  async getCoupons ({
    commit,
    state
  }, params) {
    let resp = await getCoupons(params)
    if (resp.return_code === '0000') { commit(GET_COUPONS, resp.data.list) }
  }
}
