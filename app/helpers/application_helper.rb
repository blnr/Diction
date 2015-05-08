require 'httparty'

module ApplicationHelper

	# page-title helper
	def full_title(page_title)
		base_title = "Diction Project";
		if page_title.empty?
			base_title		
		else 
			"#{base_title} - #{page_title}"
		end 		
	end

	# Define method gets word data from Google's API
	def define(word)  

		# Requirements
		include HTTParty

		# Local scope varibale
		data = []
		  # Set variables
		  base_url = "https://www.googleapis.com/scribe/v1/research?key=AIzaSyDqVYORLCUXxSv7zneerIgC2UYMnxvPeqQ&dataset=dictionary&dictionaryLanguage=en&query="
		  # Get the payload
		  response = HTTParty.get("#{base_url}" + "#{word}")
		  
		  # Catch response errors
		  if response["data"] == nil
		    error = { error: true, word: word }
		    data.push(error)        
		  else
		    # Push response to data array
		    data.push(response)
		  end
		return data
	end




	
end