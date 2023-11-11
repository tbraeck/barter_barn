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

  

  # user_free_stuff = @current_user.saved_free_stuffs.find_by!(id: params[:id])
  # @current_user.saved_free_stuffs.delete(user_free_stuff)    
  # render json: @current_user.saved_free_stuffs
def return
  @free_stuff = FreeStuff.find(params[:id])

  if @free_stuff.update(claimant_id: nil)
    render json: @free_stuff
  else
    render json: @free_stuff.errors, status: :unprocessable_entity
  end
end

  # def return
  #   @free_stuff = find_free_stuff

  #   # Assuming you want to update the claimant_id to nil when returning
  #   if @free_stuff.update(claimant_id: nil)
  #     render json: @free_stuff
  #   else
  #     render json: @free_stuff.errors, status: :unprocessable_entity
  #   end
  # end


  def update
    @free_stuff = find_free_stuff
    if @free_stuff.update(claimant_id: @current_user.id)
      render json: @free_stuff
    else
      render json: @free_stuff.errors, status: :unprocessable_entity
    end
  end

  def destroy
    user_free_stuff = @current_user.saved_free_stuffs.find_by!(id: params[:id])
    @current_user.saved_free_stuffs.delete(user_free_stuff)    
    render json: @current_user.saved_free_stuffs
  end
  
  private
    
  def find_free_stuff
    FreeStuff.find(params[:id])
  end
    
  def free_stuffs_params
    params.permit(:id, :user_id, :forum_id, :body, :claimant_id, :main_image)
  end
end
    



