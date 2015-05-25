class User < ActiveRecord::Base

	has_many :lists, dependent: :destroy
	has_many :words, through: :lists


  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
end
