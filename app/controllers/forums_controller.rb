class ForumsController < ApplicationController
  skip_before_action :authorize

  def index
    forums = Forum.includes(:posts).all
    render json: forums, status: :ok
  end

  def show
    forum = find_forum
    render json: forum
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
      Forum.find(params[:id])
    end

    def forum_params
      params.require(:forum).permit(:name)
    end
end
