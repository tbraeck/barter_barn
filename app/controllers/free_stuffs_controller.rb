class FreeStuffsController < ApplicationController
  skip_before_action :authorize

  # GET /goods
  def index
    @free_stuff = FreeStuff.all

    render json: @free_stuff
  end

  # GET /goods/1
  def show
    # free_stuff = find_free_stuff
    render json: @free_stuff
  end


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
  

 
  # def create
  #   user = User.find(params[:user_id]) 
  #   free_stuff = user.free_stuffs.create!(free_stuffs_params)
    
  #   render json: free_stuff, status: :created
  # end
  def create
    @free_stuff = FreeStuff.new(free_stuffs_params)

    if @free_stuff.save
      render json: @free_stuff, status: :created, location: @free_stuff
    else
      render json: @free_stuff.errors, status: :unprocessable_entity
    end
  end
  # PATCH/PUT /goods/1
  # def update
  #  free_stuff = find_free_stuff
  #  free_stuff.update!(free_stuffs_params)
  # end

  def update
    if @free_stuff.update(free_stuffs_params)
      render json: @free_stuff
    else
      render json: @free_stuff.errors, status: :unprocessable_entity
    end
  end

  # DELETE /goods/1
  def destroy
    # free_stuff = find_free_stuff
    @free_stuff.destroy
    head :no_content
  end


  def claim_free_stuff
    @free_stuff = FreeStuff.find(params[:id])
  
    if @free_stuff.claimant_id.present?
      # Handle the case where the good has already been claimed by another user
      render json: { error: 'This item has already been claimed.' }, status: :unprocessable_entity
    else
      # Attempt to claim the good
      if @free_stuff.update(claimant_id: current_user.id)
        # Handle successful claim
        render json: { message: 'Item claimed successfully.' }
      else
        # Handle claim error
        render json: { error: 'Failed to claim the item.' }, status: :unprocessable_entity
      end
    end
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
      params.require(:free_stuff).permit(:body, :main_image, :user_id, :forum_id)
    end
end
