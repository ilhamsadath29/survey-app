import { createStore } from "vuex";
import axiosClient from "../axios.js";

const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem('TOKEN')
    },
    currentSurrey: {
      loading: false,
      data: {}
    },
    surveys: {
      loading: false,
      data: []
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
    getSurveys({ commit }) {
      commit("setSurveyLoading", true);
      axiosClient.get(`/survey`).then((res) => {
        commit("setSurveyLoading", false);
        commit("setSurveys", res.data);
        return res;
      });
    },
    deleteSurvey({ }, id) {
      axiosClient.delete(`/survey/${id}`);
    }
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
    setCurrentSurveyLoading: (state, loading) => {
      state.currentSurrey.loading = loading;
    },
    setCurrentSurvey: (state, survey) => {
      state.currentSurrey.data = survey.data;
    },
    setSurveyLoading: (state, loading) => {
      state.surveys.loading = loading;
    },
    setSurveys: (state, surveys) => {
      state.surveys.data = surveys.data;
    },
  },
  modules: {}
})

export default store;