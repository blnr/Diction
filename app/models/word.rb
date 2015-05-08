class Word < ActiveRecord::Base

  belongs_to :list
  validates :title, uniqueness: {scope: :title}, presence: true

  # Used for creating multiple words on landing page
  def self.create_words(word)
    split = split_words(word)

    split.each do |w|
      Word.create :word => w
      #puts w
    end
  end

  # Split Words method splits words seperated by a comma or space
  def self.split_words(word)
    word = word.split

    word.each do |w|
      w = w.gsub!(",", "")
    end
  end

end