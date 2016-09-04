Rails.application.routes.draw do

  root to: 'static_pages#root';

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show, :update]
    resource :session, only: [:create, :destroy]
    resources :groups, only: [:index, :create, :show, :update, :destroy]
    resources :events, only: [:index, :create, :show, :update, :destroy]
  end

end
