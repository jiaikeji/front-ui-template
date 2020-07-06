import {
  constantRouterMap
} from '@/router/routers'
import Layout from '@/layout/index'
import {
  getDicts
} from '@/api/system/dict'
import _ from 'lodash'

function generateDicts(dicts) {
  // 获取字典数据
  getDicts().then(res => {
    if (res && _.isArray(res) && res.length > 0) {
      res.forEach(dict => {
        dicts[dict.name] = dict.dictDetails.map(item => {
          return {
            label: item.label,
            value: item.value
          }
        })
      })
    }
  })
  return dicts
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    dicts: {}
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
    SET_DICTS: (state, dicts) => {
      state.dicts = dicts
    }
  },
  actions: {
    GenerateRoutes({
      commit
    }, asyncRouter) {
      commit('SET_ROUTERS', asyncRouter)
      commit('SET_DICTS', generateDicts({}))
    },
    SetDicts({
      commit
    }, dicts) {
      commit('SET_DICTS', generateDicts(dicts))
    }
  }
}

export const filterAsyncRouter = (routers) => { // 遍历后台传来的路由字符串，转换为组件对象
  return routers.filter(router => {
    if (router.component) {
      if (router.component === 'Layout') { // Layout组件特殊处理
        router.component = Layout
      } else {
        const component = router.component
        router.component = loadView(component)
      }
    }
    if (router.children && router.children.length) {
      router.children = filterAsyncRouter(router.children)
    }
    return true
  })
}

export const loadView = (view) => {
  return (resolve) => require([`@/views/${view}`], resolve)
}

export default permission
