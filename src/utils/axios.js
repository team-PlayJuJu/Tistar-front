import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://4ad6-210-218-52-13.ngrok-free.app/", // 백엔드 API URL
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Success
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 엑세스 토큰 만료 시 (401) && 재시도 중이 아닐 때만
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      //   try {
      //     const refreshToken = localStorage.getItem("refreshToken");
      //     const response = await axiosInstance.post(
      //       "/auth/refresh",
      //       {},
      //       {
      //         headers: {
      //           access: localStorage.getItem("accessToken"),
      //           refresh: localStorage.getItem("refreshToken"),
      //         },
      //       }
      //     );

      //     const { accessToken } = response.data;

      //     localStorage.setItem("accessToken", accessToken);
      //     originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

      //     // 요청 재전송
      //     return api(originalRequest);
      //   } catch (refreshError) {
      //     console.error("리프레시 토큰 만료:", refreshError);
      //     // 리프레시 토큰도 만료되었을 경우 로그아웃 처리 등을 할 수 있습니다.
      //     localStorage.removeItem("accessToken");
      //     localStorage.removeItem("refreshToken");
      //     window.location.href = "/"; // 로그인이 필요한 페이지로 리다이렉트
      //   }
    }

    // 오류가 발생했을 경우 그대로 반환
    return Promise.reject(error);
  }
);
