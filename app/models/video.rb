class Video < ApplicationRecord
  enum category: [:Exercise, :Education, :Recipe]
  has_one_attached :file, dependent: :destroy
  validates :file, attached: true, content_type: [:mp4, :mov],
                  size: { less_than: 2000.megabytes, message: 'Size must be less then 2000MB' }
  has_many :thumbnails, dependent: :destroy


end
