class ApplicationController < ActionController::Base

	protect_from_forgery with: :exception

	def index
		render layout: "application", template: "index"
	end

	def angular
		render 'layouts/application'
	end

	include SessionsHelper

end


















