Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  if  Rails.env.development?
    default_url_options :host => "localhost:3000" 
  end

  defaults format: :json do
    resources :videos, only: [:index, :create] do
      collection do
        get :get_categories
      end
    end
  end
  root 'home#index'
end
