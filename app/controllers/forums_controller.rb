class ForumsController < ApplicationController
  skip_before_action :authorize

  def index
    
    forums = Forum.includes(:goods, :services, :free_stuffs).all
    render json: forums, status: :ok
  end

  def show
    byebug
    forum = find_forum
    render json: forum
  end

  def featured
  @featured_forum = Forum.find_by(featured: true)
  render json: @featured_forum, status: :ok
    
  end

  def create
    forum = Forum.new(forum_params)
  
    if forum.save
      render json: forum, status: :created
    else
      render json: { errors: forum.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  def update
    forum = find_forum
  
    if forum.update(forum_params)
      render json: forum, status: :ok
    else
      render json: { errors: forum.errors.full_messages }, status: :unprocessable_entity
    end
  end
  

  # # DELETE /forums/1
  # def destroy
  #   @forum.destroy
  # end

  private
    def find_forum
      Forum.find_by(id: params[:id])
    end

    def forum_params
      params.require(:forum).permit(:title)
    end
end
