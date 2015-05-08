class ListsController < ApplicationController
  respond_to :json

  def index
    respond_with List.all
  end

  def create
    respond_with List.create(list_params)
  end

  def show
    respond_with List.find(params[:id])
  end

  private
  def list_params
    params.require(:list).permit(:title, :description)
  end


end
