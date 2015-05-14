class WordsController < ApplicationController
  respond_to :json

  def create
    list = List.find(params[:list_id])
    word = list.words.create(word_params)
    respond_with list, word
  end

  def show
    list = List.find(params[:list_id])
    respond_with list.words.find(params[:id])
  end

  def destroy
    list = List.find(params[:list_id])
    list.words.find(params[:id]).destroy
  end

  private
  def word_params
    params.require(:word).permit!
  end

end
