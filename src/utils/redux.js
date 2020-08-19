/**
 * 适当封装 Redux，简化调用
 */
/* eslint-disable import/prefer-default-export */

// 📒 所有的 api 请求均在 dispatch -> action(createAction 生成) 中发出
// 📒 这个 createAction 在 dispatch 前做了 fetch

import fetch from './request'

export function createAction(options) {
  const { url, payload, method, fetchOptions, cb, type } = options
  return (dispatch) => {
    return fetch({ url, payload, method, ...fetchOptions }).then((res) => {
      dispatch({ type, payload: cb ? cb(res) : res })
      return res
    })
  }
}
