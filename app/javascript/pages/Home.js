import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import videoApi from '../api/video'

function Home() {
  const [videos, setVideos] = useState([])
  useEffect(()=>{
    async function init(){
      let videos = await videoApi.listVideos()
      setVideos(videos)
    }
    init();
  },[setVideos])
  return (
    <>
      <button className="btn btn-primary mt-2 mb-2"><Link to={"upload-video"} className="text-white text-decoration-none">Upload a Video</Link></button>
      <ul className="list-group">
        <li className="list-group-item d-flex justify-content-between align-items-center">
          <h3 className="badge-pill">Thumbnail</h3>
          <h3 className="badge-pill">Title</h3>
          <h3 className="badge-pill">Content</h3>
        </li>
        {
          videos.map((video, key)=>{
            return  <div key={key}>
                      <div className="modal" id={`myModal${key}`}>
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h4 className="modal-title">watch Video</h4>
                              <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                            <video height="240" controls>
                              <source src={video.videoUrl} />
                            </video>
                            </div>
                          </div>
                        </div>
                      </div>
                      <li className="list-group-item d-flex justify-content-between align-items-center" key={key}>
                        <img className="mr-3 mt-3 rounded-circle" data-toggle="modal" data-target={`#myModal${key}`} src={video.thumbUrl} width="64" height="64" title={video.title} style={{cursor: 'pointer'}}/>
                        <span className="badge-pill">{video?.title}</span>
                        <span className="badge-pill">{video?.category}</span>
                      </li>
                    </div>
          })
        }
      </ul>
    </>
  );
}
export default Home;
