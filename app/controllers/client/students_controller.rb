class Client::StudentsController < ApplicationController

  def show
    render "student.json"
  end
end
