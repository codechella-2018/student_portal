Rails.application.routes.draw do

  namespace :client do 

    get "/students" => "students#index"
    get "/students" => "students#show"

  end 
  # STEP 1: A ROUTE triggers a controller action
  # verb "/urls" => "namespace/controllers#action"
end
