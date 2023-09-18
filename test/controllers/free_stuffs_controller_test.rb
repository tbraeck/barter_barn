require "test_helper"

class FreeStuffsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @free_stuff = free_stuffs(:one)
  end

  test "should get index" do
    get free_stuffs_url, as: :json
    assert_response :success
  end

  test "should create free_stuff" do
    assert_difference("FreeStuff.count") do
      post free_stuffs_url, params: { free_stuff: {  } }, as: :json
    end

    assert_response :created
  end

  test "should show free_stuff" do
    get free_stuff_url(@free_stuff), as: :json
    assert_response :success
  end

  test "should update free_stuff" do
    patch free_stuff_url(@free_stuff), params: { free_stuff: {  } }, as: :json
    assert_response :success
  end

  test "should destroy free_stuff" do
    assert_difference("FreeStuff.count", -1) do
      delete free_stuff_url(@free_stuff), as: :json
    end

    assert_response :no_content
  end
end
