import axios from "axios";

export const instance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export const instance2 = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_LOCAL_URL}`,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export const baseURL = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

//인스턴스 request header
baseURL.interceptors.request.use(
  (config) => {
    if (config.headers === undefined) return;
    const token = localStorage.getItem("access_token");
    // const refresh_token = localStorage.getItem("refresh_token");

    //Authorization: 'Bearer ' + TOKEN, 이거인가 그냥 ${token} ==> 구글링엔 이거 예제git엔 아래
    config.headers["Authorization"] = `Bearer ${token}`;
    // config.headers["Refresh_Token"] = `Bearer ${refresh_token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

baseURL.interceptors.response.use(
  (response) => {
    return response;
  },
  //reject 발생시 (여러 오류가 있겠죠, token만료나 다른 여러가지...)
  async (error) => {
    // alert("토큰이 만료?!?");
    const originalRequest = error.config;
    console.log(error.response.status);

    //401에러 = 인증되지 않은 사용자 && error.config._retry가 앞에서 또 함수를 호출하지 않았는지?
    if (error.response.status === 401 && !originalRequest._retry) {
      console.log("인증되지 않은 사용자");
      originalRequest._retry = true;
      const refresh_token = localStorage.getItem("refresh_token");

      if (refresh_token) {
        try {
          console.log("재발급중...");
          const response = await axios.get(
            //재발급 토큰 api는 어떻게 됩니까?
            `${process.env.REACT_APP_SERVER_URL}/member/token`,
            {
              headers: {
                Refresh_Token: `Bearer ${refresh_token}`,
              },
            }
          );
          console.log("responce : : ", response);
          //back에서 어디서 refreshtoken을 줄꺼니? header에서 줄꺼니 body에서 줄꺼니?
          // const access_token = response.data.access_token;
          const access_token = response.headers.authorization.split(" ")[1];
          console.log("newaccess_token", access_token);
          localStorage.setItem("access_token", access_token);

          // originalRequest에 새로운 access_token 추가하여 다시 요청 보내기
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          console.log("발급완료 코드 재실행");
          console.log("originalRequest", originalRequest);
          return baseURL(originalRequest);
        } catch (error) {
          //refresh_token이 만료
          console.log("refresh 토큰 만료...");
          console.log(error);
          //토큰들 지워
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          window.location.href = "/login";
          return Promise.reject(error);
        }
      } else {
        // refresh_token이 없는 경우
        console.log("Refresh_token이 없답니다.");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        alert("로그인 하세요!");
        window.location.href = "/login"; // 로그인 페이지로 이동
        return Promise.reject(error);
      }
    }
    return Promise.reject("error", error);
  }
);
