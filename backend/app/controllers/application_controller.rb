class ApplicationController < ActionController::API
  before_action :snake_case_params

  def current_user
    @current_user ||= User.find_by(session_token: session[:session_token])# user whose `session_token` == token in `session` cookie
  end
  
  def login!(user)
    # reset `user`'s `session_token` and store in `session` cookie
    session[:session_token] = user.reset_session_token!
  end
  
  def logout!
    # reset the `current_user`'s session cookie, if one exists
    current_user.reset_session_token!
    session[:session_token] = nil
    # clear out token from `session` cookie
    @current_user = nil # so that subsequent calls to `current_user` return nil
  end
  
  def require_logged_in
    unless current_user
      render json: { message: 'Unauthorized' }, status: :unauthorized 
    end
  end
  
  private

  def snake_case_params
    params.deep_transform_keys!(&:underscore)
  end

end
