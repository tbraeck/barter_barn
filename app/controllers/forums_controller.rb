class ForumsController < ApplicationController
  skip_before_action :authorize

  def index
    forums = Forum.includes(:goods, :services, :free_stuffs).all
    render json: forums, status: :ok
  end

  def show
    forum = find_forum

    render json: forum
  end

  def featured
  @featured_forum = Forum.find_by(featured: true)
  render json: @featured_forum, status: :ok
    
  end

  def create
    forum = Forum.create!(forum_params)
    forum.update!(forum_params)
    render json: forum, status: :created
  end

  def update
    forum = find_forum
    forum.update!(forum_params)
    render json: forum, status: :ok
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
