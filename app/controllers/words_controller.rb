class WordsController < ApplicationController

  include WordsHelper
  respond_to :json
  before_filter :authenticate_user!, only: [:destroy]

  def create
    list = List.find(params[:list_id])

    if (current_user)
      word = list.words.create(word_params.merge(user_id: current_user.id))
    else
      word = list.words.create(word_params)
    end

    respond_with list, word
  end

  def show
    list = List.find(params[:list_id])
    respond_with list.words.find(params[:id])
  end

  def destroy
    list = List.find(params[:list_id])
    respond_with list.words.find(params[:id]).destroy
  end

  def api
    if (params[:word].include? "(d)")
      respond_with view_context.dictionary(params[:word].sub("(d)", ""))
    elsif (params[:word].include? "(w)")
      respond_with view_context.wikipedia(params[:word].sub("(w)", ""))
    elsif (params[:word].include? "(f)")
      respond_with view_context.footnote(params[:word].sub("(f)", ""))
    else
      respond_with view_context.dictionary(params[:word])
    end
  end

  private
  def word_params
    params.require(:word).permit!
  end

end
