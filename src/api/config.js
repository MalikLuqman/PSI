var app_vars = {
  domain: {
    baseURL:
      window.location.host == "localhost:5173"
        ? "http://127.0.0.1:8000"
        : "http://" + window.location.host + ":8000",
    baseApiUrl:
      window.location.host == "localhost:5173"
        ? "http://127.0.0.1:8000"
        : "http://" + window.location.host + ":8000",
    server: "http://127.0.0.1:8000",
  },
};
export default app_vars;
