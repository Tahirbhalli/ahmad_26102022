class AddThumbnailsToVideos < ActiveRecord::Migration[6.1]
  def change
    add_reference :thumbnails, :video
  end
end
