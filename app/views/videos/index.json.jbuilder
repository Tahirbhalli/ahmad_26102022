json.array!(@videos) do |video| 
  json.title video.title
  json.category video.category
  json.videoUrl url_for(video.file)
  json.thumbUrl video.thumbnails.find_by(size: :big)&.url
end
