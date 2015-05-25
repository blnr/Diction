class Word < ActiveRecord::Base

  	belongs_to :list
  	validates_uniqueness_of :title, scope: :list_id

end