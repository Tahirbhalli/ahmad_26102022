class CreateVideos < ActiveRecord::Migration[6.1]
  def change
    create_table :videos do |t|
      t.string :title, null: false
      t.integer :category, null: false
      
      t.timestamps
    end
  end
end
