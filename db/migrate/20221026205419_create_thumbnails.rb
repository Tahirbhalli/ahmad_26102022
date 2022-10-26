class CreateThumbnails < ActiveRecord::Migration[6.1]
  def change
    create_table :thumbnails do |t|
      t.string :url,     null: false
      t.integer :size, null: false

      t.timestamps
    end
  end
end
