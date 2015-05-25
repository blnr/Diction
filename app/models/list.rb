class List < ActiveRecord::Base
	belongs_to :user
	has_many :words, dependent: :delete_all
  	validates_uniqueness_of :title, scope: :user_id

	def as_json(options = {})
		super(options.merge(include: :words))
	end
end
