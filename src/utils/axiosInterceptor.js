import axios from "axios";

const axiosInterceptor = () => {
  axios.interceptors.request.use(
    (config) => {
      const token = JSON.parse(localStorage.getItem("token"));
      if (token) {
        config.headers.token = `${token}`;
      }
      axios.defaults.baseURL = 'https://c503-119-82-87-26.ngrok-free.app';
      axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:3000';
      config.headers["ngrok-skip-browser-warning"] = "69420";
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location = "/";
      } else return Promise.reject(error);
    }
  );
};

export default axiosInterceptor;