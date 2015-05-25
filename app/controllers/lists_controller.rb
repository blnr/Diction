class ListsController < ApplicationController
  respond_to :json
  before_filter :authenticate_user!

  def index
    respond_with current_user.lists
  end

  def create
    respond_with List.create(list_params.merge(user_id: current_user.id))
  end

  def show
    respond_with List.find(params[:id])
  end

  def destroy
    List.find(params[:id]).destroy
    respond_with List.all
  end

  private
  def list_params
    params.require(:list).permit(:title, :description)
  end


end
