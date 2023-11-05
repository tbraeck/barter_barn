require "test_helper"

class UserFreeStuffsControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get free_stuffs_create_url
    assert_response :success
  end

  test "should get update" do
    get free_stuffs_update_url
    assert_response :success
  end

  test "should get destroy" do
    get free_stuffs_destroy_url
    assert_response :success
  end
end
