class List < ActiveRecord::Base
	has_many :words, dependent: :delete_all

	def as_json(options = {})
		super(options.merge(include: :words))
	end
end
