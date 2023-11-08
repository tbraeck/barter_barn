class FreeStuffsController < ApplicationController
  before_action :authorize

  def index
    free_stuffs = FreeStuff.where(claimant_id: params[:claimant_id])
    render json: free_stuffs
  end

  def show
     free_stuff = find_free_stuff
    render json: free_stuff
  end
  
  def create
    @free_stuff = FreeStuff.new(free_stuffs_params)
    
    if @free_stuff.save
      render json: @free_stuff, status: :created
    else
      render json: { errors: @free_stuff.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def save
    free_stuff = FreeStuff.find(params[:id])
    user_free_stuff = current_user.free_stuffs.build(free_stuff: free_stuff)
    
    if user_free_stuff.save
      render json: { message: 'Free stuff saved successfully' }
    else
      render json: { error: 'Unable to save free stuff' }, status: :unprocessable_entity
    end
  end

  def return
    free_stuff = FreeStuff.find(params[:id])
  
    if  free_stuff.claimant_id
      free_stuff.update(claimant_id: nil)  
      render json: free_stuff, status: :created
    else

     
      render json: { error: 'Unable to return free stuff' }, status: :unprocessable_entity
    end
  end

  def update
    if @free_stuff.update(free_stuffs_params)
      render json: @free_stuff
    else
      render json: @free_stuff.errors, status: :unprocessable_entity
    end
  end

  def destroy
    free_stuff = find_free_stuff
    free_stuff.destroy
    head :no_content
  end
  
  private
    
  def find_free_stuff
    FreeStuff.find(params[:id])
  end
    
  def free_stuffs_params
    params.permit(:user_id, :forum_id, :body, :claimant_id, :main_image)
  end
end
    



