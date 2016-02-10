class AddLinkToWords < ActiveRecord::Migration
  def change
    add_column :words, :link, :string
  end
end
