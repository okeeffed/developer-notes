---
menu: Ruby On Rails Tutorial
name: 10) Updating, Showing and Deleting Users
---

# Updating, Showing and Deleting Users

We need to add a `admin` column to our `users` table. To do so, we need to create a migration:

```s
rails generate migration add_admin_to_users admin:boolean
```

This will generate a migration, which we will need to update with:

```rb
class AddAdminToUsers < ActiveRecord::Migration[6.0]
  def change
    # column "admin" to "users" which is a boolean with default of false
    add_column :users, :admin, :boolean, default: false
  end
end
```

For us to enable the destroy action, we need to update the `users_controller.rb`:

```rb
class UsersController < ApplicationController
  before_action :logged_in_user, only: [:index, :edit, :update, :destroy]
  before_action :correct_user,   only: [:edit, :update]
  .
  .
  .
  def destroy
    User.find(params[:id]).destroy
    flash[:success] = "User deleted"
    redirect_to users_url
  end

  private
  .
  .
  .
end
```

We also need to ensure we have a `before_action` call added prior to any destroy requests:

```rb

class UsersController < ApplicationController
  before_action :logged_in_user, only: [:index, :edit, :update, :destroy]
  before_action :correct_user,   only: [:edit, :update]
  before_action :admin_user,     only: :destroy
  .
  .
  .
  private
    .
    .
    .
    # Confirms an admin user.
    def admin_user
      redirect_to(root_url) unless current_user.admin?
    end
end
```
