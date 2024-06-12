class ApplicationController < ActionController::API
  before_action :snake_case_params

  def current_user
    #returns the current user
    @current_user ||= User.find_by(session_token: session[:session_token])
  end
  
  def login!(user)
    #logs the current user in, sets session_token key in session to be the users session_token
    session[:session_token] = user.reset_session_token!
  end
  
  def logout!
    # resets the current_user's session token
    # deletes the session_token key from cookies
    # sets current user to nil
    current_user.reset_session_token!
    session[:session_token] = nil
    @current_user = nil
  end
  
  def require_logged_in
    # to restrict access to routes that require the user to be logged in
    unless current_user
      render json: { message: 'Unauthorized' }, status: :unauthorized 
    end
  end
  
  private

  def snake_case_params
    params.deep_transform_keys!(&:underscore)
  end

end
