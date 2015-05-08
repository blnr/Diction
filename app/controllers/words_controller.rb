class WordsController < ApplicationController
  respond_to :json

  def create
    list = List.find(params[:list_id])
    word = list.words.create(word_params)
    respond_with list, word
  end

  private
  def word_params
    params.require(:word).permit(:title)
  end

end
