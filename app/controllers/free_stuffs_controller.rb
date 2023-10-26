class FreeStuffsController < ApplicationController
  skip_before_action :authorize
  attr_accessor :claimed

  # GET /goods
  def index
    free_stuff = FreeStuff.all

    render json: free_stuff
  end

  # GET /goods/1
  def show
    free_stuff = find_free_stuff
    render json: free_stuff
  end

  def claim
    @free_stuff = FreeStuff.find(params[:id])

    if @free_stuff.claimed
      render json: { success: false, message: "Item is already claimed" }
    else
      # Assuming you have a user authentication system, you can set the user_id here.
      @free_stuff.user_id = current_user.id
      @free_stuff.claimed = true

      if @free_stuff.save
        render json: { success: true, message: "Item has been successfully claimed" }
      else
        render json: { success: false, message: "Failed to claim the item" }
      end
    end
  

 
  def create
    user = User.find(params[:user_id]) 
    free_stuff = user.free_stuffs.create!(free_stuffs_params)
    render json: free_stuff, status: :created
  end

  # PATCH/PUT /goods/1
  def update
   free_stuff = find_free_stuff
   free_stuff.update!(free_stuffs_params)
  end

  # DELETE /goods/1
  def destroy
    free_stuff = find_free_stuff
    free_stuff.destroy
    head :no_content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def find_free_stuff
        FreeStuff.find(params[:id])
    end
    def set_free_stuffs
      @free_stuff = FreeStuff.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def free_stuffs_params
      params.permit(:body, :image_url)
    end
end
