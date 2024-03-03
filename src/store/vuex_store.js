import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

const state = {
  user: null,
  role: null,
  auth: false,
  systemUser: false,
  profile_photo_url: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
  firstName: null,
  lastName: null
}

const store = createStore({
  plugins: [createPersistedState()],
  state,
  getters: {
    user: (state) => {
      return state.user;
    },
    role: (state) => {
      return state.role;
    },
    auth: (state) => {
      return state.auth;
    },
    systemUser: (state) => {
      return state.systemUser;
    },
    profile_photo_url: (state) => {
      return state.profile_photo_url;
    },
    firstName: (state) => {
      return state.firstName;
    },
    lastName: (state) => {
      return state.lastName;
    }

  },
  actions: {
    user(context, user) {
      context.commit('user', user)
    },
    role(context, role) {
      context.commit('role', role)
    },
    auth(context, auth) {
      context.commit('auth', auth)
    },
    systemUser(context, systemUser) {
      context.commit('systemUser', systemUser);
    },
    profile_photo_url(context, profile_photo_url) {
      context.commit('profile_photo_url',profile_photo_url);
    },
    firstName(context, firstName) {
      context.commit('firstName', firstName);
    },
    lastName(context, lastName) {
      context.commit('lastName', lastName);
    }
  },
  mutations: {
    user(state, user) {
      state.user = user
    },
    role(state, role) {
      state.role = role;
    },
    auth(state, auth) {
      state.auth = auth;
    },
    systemUser(state, systemUser) {
      state.systemUser = systemUser;
    },
    profile_photo_url(state, profile_photo_url) {
      state.profile_photo_url = profile_photo_url;
    },
    firstName(state, firstName) {
      state.firstName = firstName;
    },
    lastName(state, lastName) {
      state.lastName = lastName;
    }
  },
})

export default store;
