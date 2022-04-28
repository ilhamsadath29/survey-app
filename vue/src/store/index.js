import { createStore } from "vuex";
import axiosClient from "../axios.js";

const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem('TOKEN')
    },
    dashboard: {
      loading: false,
      data: {}
    },
    currentSurvey: {
      loading: false,
      data: {}
    },
    surveys: {
      loading: false,
      paginationLinks: [],
      data: []
    },
    questionTypes: ["text", "select", "radio", "checkbox", "textarea"],
    notification: {
      show: false,
      type: null,
      message: null
    },
  },
  getters: {},
  actions: {
    register({ commit }, user) {
      return axiosClient.post('/register', user).then(({ data }) => {
        commit('setUser', data);
        return data;
      })
    },
    login({ commit }, user) {
      return axiosClient.post('/login', user).then(({ data }) => {
        commit('setUser', data);
        return data;
      })
    },
    logout({ commit }) {
      return axiosClient.post('/logout').then((response) => {
        commit('logout');
        return response;
      })
    },
    getDashboardData({ commit }) {
      commit('setDashboardLoading', true);
      return axiosClient.get('/dashboard').then((response) => {
        commit('setDashboardData', response.data);
        commit('setDashboardLoading', false);
        return response;
      }).catch(error => {
        commit('setDashboardLoading', false);
        return error;
      });
    },
    saveSurvey({ commit }, survey) {
      delete survey.image_url;
      let response;
      if (survey.id) {
        response = axiosClient.put(`/survey/${survey.id}`, survey).then(
          (res) => {
            commit("setCurrentSurvey", res.data);
            return res;
          }
        );
      } else {
        response = axiosClient.post(`/survey`, survey).then(
          (res) => {
            commit("setCurrentSurvey", res.data);
            return res;
          }
        );
      }
      return response;
    },
    getSurvey({ commit }, id) {
      commit("setCurrentSurveyLoading", true);
      axiosClient.get(`/survey/${id}`).then(
        (res) => {
          commit("setCurrentSurvey", res.data);
          commit("setCurrentSurveyLoading", false);
          return res;
        }
      ).catch(
        (err) => {
          commit("setCurrentSurveyLoading", false);
          throw err;
        }
      );
    },
    getSurveys({ commit }, {url = null} = {}) {
      url = url || '/survey'
      commit("setSurveyLoading", true);
      axiosClient.get(url).then((res) => {
        commit("setSurveyLoading", false);
        commit("setSurveys", res.data);
        return res;
      });
    },
    deleteSurvey({ }, id) {
      axiosClient.delete(`/survey/${id}`);
    },
    getSurveyBySlug({ commit }, slug) {
      commit("setCurrentSurveyLoading", true);
      return axiosClient.get(
        `/survey-by-slug/${slug}`
        ).then((res) => {
          commit("setCurrentSurvey", res.data)
          commit("setCurrentSurveyLoading", false);
          return res;
        }).catch((err) => {
          commit("setCurrentSurveyLoading", false);
          throw err;
        });
    },
    saveSurveyAnswer({ commit }, {surveyId, answers}) {
      return axiosClient.post(`/survey/${surveyId}/answer`, {answers});
    },
  },
  mutations: {
    logout: (state) => {
      state.user.data = {};
      state.user.token = null;
    },
    setUser: (state, userData) => {
      state.user.token = userData.token;
      state.user.data = userData.user;
      sessionStorage.setItem('TOKEN', userData.token);
    },
    setDashboardData: (state, data) => {
      state.dashboard.data = data;
    },
    setDashboardLoading: (state, loading) => {
      state.dashboard.loading = loading;
    },
    setCurrentSurveyLoading: (state, loading) => {
      state.currentSurvey.loading = loading;
    },
    setCurrentSurvey: (state, survey) => {
      state.currentSurvey.data = survey.data;
    },
    setSurveyLoading: (state, loading) => {
      state.surveys.loading = loading;
    },
    setSurveys: (state, surveys) => {
      state.surveys.paginationLinks = surveys.meta.links;
      state.surveys.data = surveys.data;
    },
    notify: (state, {message, type}) => {
      state.notification.show = true;
      state.notification.type = type;
      state.notification.message = message;

      setTimeout(() => {
        state.notification.show = false;
        state.notification.type = null;
        state.notification.message = null;
      }, 3000);
    }
  },
  modules: {}
})

export default store;