class FreeStuffsController < ApplicationController
        skip_before_action :authorize
      
        # GET /goods
        def index
          @free_stuffs = FreeStuff.all
          render json: @free_stuffs
        end
      
        # GET /goods/1
        def show
          render json: @free_stuff
        end
      
        # POST /goods
        def create
          @free_stuff = FreeStuff.create!(free_stuff_params)
      
          if @free_stuff.save
            render json: @free_stuff, status: :created, location: @free_stuff
          else
            render json: @free_stuff.errors, status: :unprocessable_entity
          end
        end
      
        # PATCH/PUT /goods/1
        def update
          if @free_stuff.update!(free_stuff_params)
            render json: @free_stuff
          else
            render json: @free_stuff.errors, status: :unprocessable_entity
          end
        end
      
        # DELETE /goods/1
        def destroy
          @free_stuff.destroy
          head :no_content
        end
      
        private
          # Use callbacks to share common setup or constraints between actions.
          def set_free_stuff
            @free_stuff = FreeStuff.find(params[:id])
          end
      
          # Only allow a list of trusted parameters through.
          def free_stuff_params
            params.require(:free_stuff).permit(:title, :description, :image_url, :good_or_service)
          end
      end
      

