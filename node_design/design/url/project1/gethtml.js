const axios=require("axios");


// Optionally the request above could also be done as
axios.get('https://www.jianshu.com/p/7a9fbcbb1114', {
    params: {
        ID: 12345
    }
    })
    .then(function (response) {
    console.log(response);
    })
    .catch(function (error) {
    console.log(error);
    });