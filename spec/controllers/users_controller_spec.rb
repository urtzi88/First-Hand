require 'rails_helper'

RSpec.describe UsersController, type: :controller do

  describe "anonymous user" do
    before :each do
      login_with nil
    end

    it "gets redirected to sign in when trying to update a user's rating" do
      get :search
      expect( response ).to redirect_to( new_user_session_path )
    end

    it "gets redirected to sign in when trying to retrieve the providers list" do
      get :provider_list
      expect( response ).to redirect_to( new_user_session_path )
    end

    it "gets redirected to sign in when trying to update a user's rating" do
      patch :update_user_rating
      expect( response ).to redirect_to( new_user_session_path )
    end

    it "gets redirected to the landing page when trying to see a profile" do
      get :profile
      expect( response ).to render_template( :landing )
    end
  end

  describe "client user" do
    before :each do
      login_with create( :client_with_transactions )
    end

    it "gets redirected to it's profile" do
      get :profile
      expect( response ).to render_template( :client_profile )
    end

    it "gets a json response when requests the provider_list" do
      get :provider_list
      expect( response.header['Content-Type'] ).to include('application/json')
    end

    it "gets a json response when requests the providers_filtered" do
      service = create(:service)
      get :providers_filtered, service_id: service.id
      expect( response.header['Content-Type'] ).to include('application/json')
    end

    it "gets a json response when update the rating on user" do
      user = create(:provider)
      get :update_user_rating, provider: user.id, rating:{client_rating: 2}
      expect( response.header['Content-Type'] ).to include('application/json')
    end

    it "gets a json response when update the rating on user with the average rating" do
      user = create(:provider)
      get :update_user_rating, provider: user.id, rating:{client_rating: 2}
      expect( JSON.parse(response.body)["average_rating"] ).not_to be_nil
    end
  end

  describe "provider user" do
    before :each do
      login_with create( :provider_with_transactions )
    end

    it "gets redirected to it's profile" do
      get :profile
      expect( response ).to render_template( :provider )
    end

    it "gets a json response when update the rating on user" do
      user = create(:client)
      get :update_user_rating, client: user.id, rating:{provider_rating: 2}
      expect( response.header['Content-Type'] ).to include('application/json')
    end
  end

end
