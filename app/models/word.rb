class Word < ActiveRecord::Base

  belongs_to :list
  validates :title, uniqueness: {scope: :title}, presence: true

end