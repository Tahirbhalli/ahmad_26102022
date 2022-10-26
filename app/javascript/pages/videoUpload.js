import React, {useState, useEffect} from 'react'
import videoApi from '../api/video'
function UploadVideo() {
  const [categories, setCategories] = useState([]);
  const [videoFile, setVideoFile] = useState();
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState()
  const [isInProgress, setIsInProgress] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  useEffect(() => {
    async function init(){
      const data = await videoApi.getCategories()
      setCategories(data.categories)
    }
    init();
  },[setCategories])

  const onFileChange = event => {
    setVideoFile(event.target.files[0])
  }

  const handleTitleChange = event => {
    setTitle(event.target.value)
  }

  const handleCategoryChange = event => {
    setCategory(event.target.value)
  }

  const validateForm = ()=>{
    if(!category || !videoFile || !title){
      return false
    }
    return true
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsInProgress(true)
    if(!validateForm()){
      setAlertMessage("Please Fill all the fields")
      setIsInProgress(false)
      return
    }

    const formData = new FormData();
    formData.append("category", category);
    formData.append("file", videoFile);
    formData.append("title", title);

    const resp = await videoApi.uploadVideo(formData)
    if(resp?.status === 200)
      location.replace("/");

    if(resp?.errors)
      setAlertMessage(resp.errors)

    setIsInProgress(false)
  }
  
  return (
    <>
      {alertMessage && <div className="alert alert-danger">
        {alertMessage}
      </div>}
      <div className="App">
        <div className="container">
          <div className="row d-flex justify-content-between align-items-center ">
            <div className="col-md-4 mt-5 mx-auto">
              <form id="videoform" >
                <select className="browser-default custom-select" aria-label="Default select example" onChange={handleCategoryChange} required>
                  <option defaultValue>select video type</option>
                  {
                    categories.map((category, index) => {
                      return <option value={category} key={index}>{category}</option>
                    })
                  }
                </select>
                <div className="form-group mt-2">
                  <input
                  type="text"
                  className="form-control"
                  id="TitleInput"
                  name="TitleInput"
                  value={title}
                  required
                  placeholder="Enter title"
                  onChange={handleTitleChange}
                  />
                </div>
                <div className="form-group ">
                  <br />
                  <input
                  type="file"
                  className="form"
                  id="file"
                  required=""
                  placeholder="Upload Video"
                  accept='.mp4, .mov'
                  multiple={false}
                  onChange={onFileChange}
                  />
                </div>

                <button type="submit" className="btn btn-primary mt-2 mx-auto" onClick={onSubmit}>
                {!isInProgress && "submit Video"}
                {isInProgress && 
                  <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                }
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  

}
export default UploadVideo;