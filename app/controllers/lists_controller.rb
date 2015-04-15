class ListsController < ApplicationController
  respond_to :js, :json, :html

  # GET /lists
  def index
    if current_user
      # display first list
      @lists = current_user.lists[0].words
    end
  end

  # GET /lists/1
  def show
    @list = List.find(params[:id])
  end

  # GET /lists/new
  def new
    @list = List.new
    respond_with do |format|
      format.html { render :layout => ! request.xhr? }
    end
  end

  # GET /lists/1/edit
  def edit
    @list = List.find(params[:id])
  end

  # POST /lists
  def create
 
  end

  # PUT /lists/1
  def update
    @list = list.find(params[:id])
    respond_with do |format|
      format.html{ redirect_to @list }
    end
  end

  # DELETE /lists/1
  def destroy
    @list = List.destroy(params[:id])
  end


    private

      def list_params
        # It's mandatory to specify the nested attributes that should be whitelisted.
        # If you use `permit` with just the key that points to the nested attributes hash,
        # it will return an empty hash.
        params.require(:list).permit(:list)
      end

end
