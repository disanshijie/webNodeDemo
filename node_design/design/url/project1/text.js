const Axios = require("axios").default;

Axios.request({
    method: "get",
    url: "https://manhua.dmzj.com/xinbadademaoxian/59115.shtml#@page=1",
    maxRedirects: 0,
    withCredentials: true,
    validateStatus: function(status) {
        return status >= 200 && status < 303;
    },
}).then(res => {
    console.log(res.headers["set-cookie"]);
});