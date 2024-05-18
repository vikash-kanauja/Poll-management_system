import axios from "axios";

const axiosInterceptor = () => {
  axios.interceptors.request.use(
    (config) => {
      const token = JSON.parse(localStorage.getItem("token"));
      if (token) {
        config.headers.token = `${token}`;
      }
      axios.defaults.baseURL = `${process.env.REACT_APP_BASE_URL}`;
      axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
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
       return Promise.reject(error);
    }
  );
};

export default axiosInterceptor;