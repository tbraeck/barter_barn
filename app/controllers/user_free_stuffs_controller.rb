class UserItemsController < ApplicationController
    before_action :set_user
    before_action :set_user_item, only: [:index, :show, :create, :update, :destroy]
    skip_before_action :authorize

    # GET /users/:user_id/user_items
    def index
      user_items = @current_user.user_items
      render json: user_items
    end
    
    # GET /users/:user_id/user_items/:id
    def show
      render json: @user_item
    end
    
    # POST /users/:user_id/user_items

    def create
      @user_good = @current_user.user_goods.create!(user_good_params)
      render json: @user_good, status: :created
      
    end
    
    
    # PATCH/PUT /users/:user_id/user_items/:id
    def update
      @user_item = set_user_item
      if @user_item.update(user_item_params)
        render json: @user_item
      else
        render json: { errors: @user_item.errors.full_messages }, status: :unprocessable_entity
      end
    end
    
    # DELETE /users/:user_id/user_items/:id

    def destroy
      @user_item = set_user_item
      if @user_item
        @user_item.destroy
        head :no_content
      else
        render json: { error: 'User item not found' }, status: :not_found
      end
    end
    
    def goods_destroy

    end

def goods_update
  @user_good = set_user_good
  @user_good.update!(user_good_params)
  render json: @user_good, status: :ok
end

def services_update
  @user_service = set_user_service
  @user_service.update!(user_service_params)
  render json: @user_service, status: :ok
end

def free_stuffs_update
 @user_free_stuffs = set_user_free_stuffs
  @user_free_stuffs.update!(user_free_stuffs_params)
  render json: @user_free_stuffs, status: :ok
end

def services_destroy

end

def free_stuffs_update

end

def free_stuffs_destroy

end

    private
    
    def set_user
      @current_user = User.find(params[:user_id])
    end
   
    def set_user_item
      @user_item = @current_user.user_items.find_by(id: params[:id])
    end


    def set_user_good
      @user_good = @current_user.user_items.find_by(id: params[:id])
    end


    def set_user_service
      @user_service = @current_user.user_items.find_by(id: params[:id])
    end


    def set_user_free_stuffs
      @user_free_stuffs = @current_user.user_items.find_by(id: params[:id])
    end
    
    def user_item_params
      params.permit(:title, :body, :description, :image_url, :good_or_service)
    end

    def user_good_params
      params.permit(:title,  :description, :image_url, :good_or_service)
    end

    def user_service_params
      params.permit(:title,  :description, :image_url, :good_or_service)
    end

    def user_free_stuffs_params
      params.permit(:body, :image_url)
    end
  end