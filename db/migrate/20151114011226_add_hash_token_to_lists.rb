class AddHashTokenToLists < ActiveRecord::Migration
  def change
    add_column :lists, :hash_token, :string
  end
end
