class List < ActiveRecord::Base
	belongs_to :user
	has_many :words, dependent: :delete_all
  	#validates_uniqueness_of :title, scope: :user_id
 	before_create :generate_hash_token

	def as_json(options = {})
		super(options.merge(include: :words))
	end

	# private method
	private
		# generate random hash token for URL sharing
		def generate_hash_token
			begin
				self.hash_token = (0...5).map { (65 + rand(26)).chr }.join
			end while self.class.exists?(hash_token: hash_token)
		end
end
