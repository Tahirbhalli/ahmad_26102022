import axios from "axios";

const csrfToken = document.querySelector('[name="csrf-token"]').content;
const baseURL = "http://localhost:3000/"
const client = axios.create({
  baseURL: baseURL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'common': {
      'X-CSRF-Token': csrfToken
    }
  }
});

export default (function () {

  async function getCategories(){
    const resp = await client.get('/videos/get_categories')
    return resp.data
  }

  async function listVideos(){
    const resp = await client.get('/videos')
    return resp.data
  }

  async function uploadVideo(formData){
    return new Promise((resolve, reject) => {
      client.post('/videos', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(response => resolve(response))
        .catch(reject)

    });



    // client({
    //   method: "post",
    //   url: "/videos",
    //   data: formData,
    //   headers: { "Content-Type": "multipart/form-data" },
    // })
    //   .then(function (response) {
    //     return response
    //   })
    //   .catch(function (response) {
    //     console.log(response);
    //   });
  }

  return {
    listVideos,
    getCategories,
    uploadVideo
  };
}());


