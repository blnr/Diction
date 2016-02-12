require 'nokogiri'
require 'httparty'
require 'open-uri'
require 'json'

# WordsHelper performs API data functions for retriving data
module WordsHelper

  # include HTTParty
  include HTTParty

  # dictionary function
  # scrapes dictionary data from Oxford Dictionary
  def dictionary(search)

    # Create new hash object to hold data
    word_object = Hash.new

    # Load the document page, find data
  	doc = Nokogiri::HTML(open("http://www.oxforddictionaries.com/us/definition/american_english/#{search}")) rescue false

      # Add data if response from Nokogiri
      if doc != false
        # set meta data
        word_object["word"] = search
        word_object["syll"] = doc.at_xpath("//*[@id='firstClickFreeAllowed']/div[1]/div/div[1]/div/div/div/header/span/span").text
        word_object["speech"] = doc.at_xpath("//*[@id='firstClickFreeAllowed']/div[1]/div/div[1]/div[1]/div/div/div[1]/div/section[1]/h2/span").text
        word_object["data"] = []

        # set dictionary data
        3.times do |i|
          # Create new definition_data object
          definition_data = Hash.new

          if (word_object["speech"] == "noun")
            if (doc.at_xpath("//*[@id='firstClickFreeAllowed']/div[1]/div/div[1]/div[1]/div/div/div[1]/div/section[1]/div[1]/div[1]/div/span[2]").text rescue false == true)
              definition_data["definition"] = doc.at_xpath("//*[@id='firstClickFreeAllowed']/div[1]/div/div[1]/div[1]/div/div/div[1]/div/section[1]/div[1]/div[#{i + 1}]/div/span[2]").text rescue false
              definition_data["example"]    = doc.at_xpath("//*[@id='firstClickFreeAllowed']/div[1]/div/div[1]/div[1]/div/div/div[1]/div/section[1]/div[1]/div[#{i + 1}]/div/span[3]/em").text rescue false
            else
              definition_data["definition"] = doc.at_xpath("//*[@id='firstClickFreeAllowed']/div[1]/div/div[1]/div/div/div/div[1]/div/section/div[#{i + 1}]/div/span[2]").text rescue false
              definition_data["example"]    = doc.at_xpath("//*[@id='firstClickFreeAllowed']/div[1]/div/div[1]/div/div/div/div[1]/div/section/div[#{i + 1}]/div/span[3]/em").text rescue false
            end
          elsif (word_object["speech"] == "adjective")
            definition_data["definition"] = doc.at_xpath("//*[@id='firstClickFreeAllowed']/div[1]/div/div[1]/div/div/div/div[1]/div/section/div[#{i + 1}]/div/span[2]").text rescue false
            definition_data["example"]    = doc.at_xpath("//*[@id='firstClickFreeAllowed']/div[1]/div/div[1]/div/div/div/div[1]/div/section/div[#{i + 1}]/div/span[3]/em").text rescue false
          elsif (word_object["speech"] == "verb")
            definition_data["definition"] = doc.at_xpath("//*[@id='firstClickFreeAllowed']/div[1]/div/div[1]/div/div/div/div[1]/div/section[#{i + 1}]/div/div/span[1]").text rescue false
            definition_data["example"]    = doc.at_xpath("//*[@id='firstClickFreeAllowed']/div[1]/div/div[1]/div/div/div/div[1]/div/section[#{i + 1}]/div/div/span[2]").text rescue false
          end
          # add if data exists
          if (definition_data["definition"] != false)
            word_object["data"][i] = definition_data
          end
        end
        return word_object.to_json
      else
        wikipedia(search)
      end
  end

  # wikipedia function
  # gets wikipedia data from API
  def wikipedia(search)
    # Create new hash object to hold data
    word_object     = Hash.new
    definition_data = Hash.new

    # get response
    response = HTTParty.get("https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=#{search.sub(' ', '%20')}")

      # get unique page ID key to access nested data in response
      key = response['query']['pages'].keys

      # set meta data
      word_object["word"] = search
      word_object["data"] = []

      if (response['query']['pages'][key[0]]['extract'] rescue false != false)
        word_object["speech"] = "[ wikipedia ]"
        word_object["link"] = "https://en.wikipedia.org/wiki/#{search.sub(' ', '_')}"
        definition_data['definition'] = truncate(response['query']['pages'][key[0]]['extract'], :length => 350)
      else
        word_object["speech"] = "[ note ]"
        definition_data['definition'] = "Enter footnote information..."
      end

      word_object["data"][0]  = definition_data
    return word_object.to_json
  end

  # footnote function
  # creates custom footnote, no API
  def footnote(search)
    # Create new hash object to hold data
    word_object     = Hash.new
    definition_data = Hash.new

    # set meta data
    word_object["word"] = search
    word_object["speech"] = "[ note ]"
    word_object["data"] = []
    definition_data['definition'] = "Enter footnote information..."
    word_object["data"][0]  = definition_data

    return word_object.to_json
  end

end
