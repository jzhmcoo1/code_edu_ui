import db from '@/utils/localStorage'

export default {
  namespaced: true,
  state: {
    accessToken: db.get('ACCESS_TOKEN'),
    refreshToken: db.get('REFRESH_TOKEN'),
    routeToken: db.get('ROUTE_TOKEN', {}),
    expireTime: db.get('EXPIRE_TIME', 0),
    user: db.get('USER'),
    permissions: db.get('PERMISSIONS'),
    routes: db.get('USER_ROUTER') || []
  },
  mutations: {
    setAccessToken(state: any, val: any) {
      db.save('ACCESS_TOKEN', val)
      state.accessToken = val
    },
    setRefreshToken(state: any, val: any) {
      db.save('REFRESH_TOKEN', val)
      state.refreshToken = val
    },
    setExpireTime(state: any, val: any) {
      db.save('EXPIRE_TIME', val)
      state.expireTime = val
    },
    setUser(state: any, val: any) {
      db.save('USER', val)
      state.user = val
    },
    setPermissions(state: any, val: any) {
      db.save('PERMISSIONS', val)
      state.permissions = val
    },
    setRoutes(state: any, val: any) {
      db.save('USER_ROUTER', val)
      state.routes = val
    },
    setRouteToken(state: any, val: any) {
      db.save('ROUTE_TOKEN', val)
      state.routeToken = val
    }
  }
}
