class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :title, null: false
      t.text :description, null: false
      t.integer :group_id, null: false, index: true
      t.integer :host_user_id, null: false, index: true
      t.string :location
      t.string :img
      t.boolean :is_attendees_finalized, default: false
      t.datetime :start_time
      t.datetime :end_time
      t.timestamps null: false
    end
  end
end