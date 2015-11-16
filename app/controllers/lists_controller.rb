class ListsController < ApplicationController
  respond_to :json
  before_filter :authenticate_user!, only: [:create, :index, :show, :destroy]

  def index
    respond_with current_user.lists
  end

  def create
    respond_with List.create(list_params.merge(user_id: current_user.id))
  end

  def update
    respond_with List.find(params[:id]).update(list_params.merge(user_id: current_user.id))
  end

  def show
    respond_with List.find(params[:id])
  end

  def destroy
    List.find(params[:id]).destroy
    respond_with List.all
  end

  def public_list
    respond_with List.find_by_hash_token(params[:hash_token])
    #@list = List.find_by_hash_token(params[:hash_token])
    #render layout: nil, template: "public_list"
  end

  private
  def list_params
    params.require(:list).permit(:title, :description)
  end


end
