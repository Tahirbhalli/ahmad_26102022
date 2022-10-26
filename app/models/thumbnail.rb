class Thumbnail < ApplicationRecord
  belongs_to :video
  enum size: [:small, :medium, :big], _suffix: true
end
