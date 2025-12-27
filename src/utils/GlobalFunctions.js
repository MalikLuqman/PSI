import app_vars from "../api/config";

const base_url = app_vars.domain.baseURL;

const imageUrlGenerator = (e) => {
  return base_url + "/" + e;
};

var functions = {
  imageUrlGenerator,
};

export default functions;
