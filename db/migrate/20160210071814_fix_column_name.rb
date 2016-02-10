class FixColumnName < ActiveRecord::Migration
  def change
    change_table :words do |t|
      t.rename :pronunciation, :syll
      t.rename :definitions, :dictionary
    end
  end
end
