/**
 * 适当封装 Redux，简化调用
 */
/* eslint-disable import/prefer-default-export */

// 📒 所有的 api 请求均在 dispatch -> action(createAction 生成) 中发出
// 📒 这个 createAction 在 dispatch 前做了 fetch
// 📒 也就是说组件渲染所需的业务数据们都是通过 dispatch 获取到 store 的，组件自己只负责维护自己的一些 loading 之类的状态变量

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
