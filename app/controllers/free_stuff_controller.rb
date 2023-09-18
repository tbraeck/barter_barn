class FreeStuffController < ApplicationController
  before_action :set_free_stuff, only: %i[ show update destroy ]


  # GET /free_stuffs
  def index
    @free_stuffs = FreeStuff.all

    render json: @free_stuffs
  end

  
  # GET /comments/1
  def show
    render json: @free_stuff
  end

  # POST /comments
  def create
    @free_stuff = FreeStuff.new(freeStuff_params)

    if @free_stuff.save
      render json: @free_stuff, status: :created, location: @free_stuff
    else
      render json: @free_stuff.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /comments/1
  def update
    if @free_stuff.update(free_stuff_params)
      render json: @free_stuff
    else
      render json: @free_stuff.errors, status: :unprocessable_entity
    end
  end

  # DELETE /comments/1
  def destroy
    @free_stuff.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_free_stuff
      @free_stuff = FreeStuff.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def free_stuff_params
      params.require(:free_stuff).permit(:body, :image_url, :user_id, :forum_id)

    end
end
