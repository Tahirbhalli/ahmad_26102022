class VideosController < ApplicationController
  # skip_before_action :verify_authenticity_token, only: [:create]

  def index
    @videos = Video.includes(:thumbnails).all
  end

  def create
    @video = Video.new(create_params)
    if @video.save
      @video.thumbnails.create(size: :small, url: generate_thumbnail_url("64x64"))
      @video.thumbnails.create(size: :medium, url: generate_thumbnail_url("128x128"))
      @video.thumbnails.create(size: :big, url: generate_thumbnail_url("256x256"))
      head 200 and return 
    end
    render json: {errors: @video.errors.messages}, status: 422
  end

  def get_categories
    @categories = Video.categories.map{|category, key| category}
  end

  private
  def create_params
    params.permit(:category, :title, :file)
  end
  def generate_thumbnail_url(size)
    Rails.application.routes.url_helpers.url_for(@video.file.preview(resize: size).processed)
  end
end