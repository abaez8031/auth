# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  has_secure_password
  before_validation :ensure_session_token
  
  validates :username, 
    uniqueness: true, 
    length: { in: 3..30 }, 
    format: { without: URI::MailTo::EMAIL_REGEXP, message:  "can't be an email" }
  validates :email, 
    uniqueness: true, 
    length: { in: 3..255 }, 
    format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :session_token, presence: true, uniqueness: true
  validates :password, length: { in: 6..255 }, allow_nil: true

  def self.find_by_credentials(credential, password)
    # determine the field you need to query: 
  #   * `email` if `credential` matches `URI::MailTo::EMAIL_REGEXP`
  #   * `username` if not
  # find the user whose email/username is equal to `credential`

  # if no such user exists, return a falsey value

  # if a matching user exists, use `authenticate` to check the provided password
  # return the user if the password is correct, otherwise return a falsey value
    if credential.match?(URI::MailTo::EMAIL_REGEXP)
      user = User.find_by(email: credential)
    else
      user = User.find_by(username: credential)
    end
    if user && user.authenticate(password)
      user
    else
      nil
    end

  end

  def reset_session_token!
    # `update!` the user's session token to a new, random token
    # return the new session token, for convenience
    self.session_token = self.generate_unique_session_token
    self.save!
    self.session_token
  end



  private

  def generate_unique_session_token
    # in a loop:
      # use SecureRandom.base64 to generate a random token
      # use `User.exists?` to check if this `session_token` is already in use
      # if already in use, continue the loop, generating a new token
      # if not in use, return the token
    token = SecureRandom.urlsafe_base64
    while User.exists?(session_token: token)
      token = SecureRandom.urlsafe_base64
    end
    token
  end
  
  def ensure_session_token
    # if `self.session_token` is already present, leave it be
    # if `self.session_token` is nil, set it to `generate_unique_session_token`
    self.session_token ||= generate_unique_session_token
  end

end
