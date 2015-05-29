class AddFirstnameToUsers < ActiveRecord::Migration
  def change
    add_column :users, :firstname, :string
    add_column :users, :lastname, :string 
	remove_column :users, :username   
  end
end
