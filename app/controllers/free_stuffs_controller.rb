class FreeStuffsController < ApplicationController
  skip_before_action :authorize

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

<<<<<<< HEAD
  def claim
    # Retrieve the FreeStuff item by ID
    @free_stuff = FreeStuff.find(params[:id])
  
    # Handle the claiming process here, set the claimed flag, and update the database
    if @free_stuff.update(claimed: true)
      # You can return a success response or any necessary data
      render json: { message: "Item has been successfully claimed." }
    else
      # Handle the case where claiming fails
      render json: { error: "Failed to claim the item." }, status: :unprocessable_entity
    end
  end
  
=======
  # POST /goods
  # def create
  #   @good = Good.new(good_params)

  #   if @good.save
  #     render json: @good, status: :created, location: @good
  #   else
  #     render json: @good.errors, status: :unprocessable_entity
  #   end
  # end

>>>>>>> parent of 92af9d4 (THursday day)

 
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
