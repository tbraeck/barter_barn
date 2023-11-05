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
    user_free_stuff = current_user.user_free_stuffs.build(free_stuff: free_stuff)
    
    if user_free_stuff.save
      render json: { message: 'Free stuff saved successfully' }
    else
      render json: { error: 'Unable to save free stuff' }, status: :unprocessable_entity
    end
  end

    def claim
    free_stuff = FreeStuff.find(params[:id])
    user_free_stuff = current_user.user_free_stuffs.build(free_stuff: free_stuff, claimant: current_user)
    
    if user_free_stuff.save
      render json: { message: 'Free stuff claimed successfully' }
    else
      render json: { error: 'Unable to claim free stuff' }, status: :unprocessable_entity
    end
  end
end


def return
  free_stuff = FreeStuff.find(params[:id])
  user_free_stuff = current_user.user_free_stuffs.find_by(free_stuff: free_stuff, returned_at: nil)

  if user_free_stuff
    user_free_stuff.update(returned_at: Time.now, claimant: nil) # Mark as returned and remove claimant
    render json: { message: 'Free stuff returned to the forum' }
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
    @free_stuff.destroy
    head :no_content
  end


  def claim_free_stuff
    @free_stuff = FreeStuff.find(params[:id])
  
    if @free_stuff.claimant_id.present?
      render json: { error: 'This item has already been claimed.' }, status: :unprocessable_entity
    else
      if @free_stuff.update(claimant_id: current_user.id)
        render json: { message: 'Item claimed successfully.' }
      else
        render json: { error: 'Failed to claim the item.' }, status: :unprocessable_entity
      end
    end
  

  private
    def find_free_stuff
        FreeStuff.find(params[:id])
    end
    
    def set_free_stuffs
      @free_stuff = FreeStuff.find(params[:id])
    end

    def free_stuffs_params
      params.permit(:body, :user_id, :forum_id, :claimant_id, :main_image) 
    end
    
end


