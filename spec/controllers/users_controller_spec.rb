require 'rails_helper'

RSpec.describe UsersController, type: :controller do

  describe "anonymous user" do
    before :each do
      login_with nil
    end

    pending "gets redirected to sign in when trying to update a user's rating" do
      params = {client_id: 1}
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
  end

  describe "provider user" do
    before :each do
      login_with create( :provider_with_transactions )
    end

    it "gets redirected to it's profile" do
      get :profile
      expect( response ).to render_template( :provider )
    end
  end

end
