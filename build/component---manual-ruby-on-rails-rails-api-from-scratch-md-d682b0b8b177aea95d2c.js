(window.webpackJsonp=window.webpackJsonp||[]).push([[579],{qTXh:function(e,t,n){"use strict";n.r(t),n.d(t,"_frontmatter",(function(){return l})),n.d(t,"default",(function(){return s}));n("1c7q"),n("abGl"),n("gZHo"),n("Fdmb"),n("Ir+3"),n("2mQt"),n("mXGw");var o=n("/FXl"),a=n("TjRS");n("aD51");function r(){return(r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var l={};void 0!==l&&l&&l===Object(l)&&Object.isExtensible(l)&&!l.hasOwnProperty("__filemeta")&&Object.defineProperty(l,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"manual/Ruby-On-Rails/Rails-API-From-Scratch.md"}});var i={_frontmatter:l},c=a.a;function s(e){var t=e.components,n=function(e,t){if(null==e)return{};var n,o,a={},r=Object.keys(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,["components"]);return Object(o.b)(c,r({},i,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("h1",{id:"rails-api-from-scratch"},"Rails API From Scratch"),Object(o.b)("h2",{id:"new-api-from-the-cli"},"New API from the CLI"),Object(o.b)("p",null,"In this particular case, we will be creating a UI in React."),Object(o.b)("p",null,"Creating a new API:"),Object(o.b)("pre",null,Object(o.b)("code",r({parentName:"pre"},{className:"language-s"}),"rails new <api-name> --api\n")),Object(o.b)("h2",{id:"setting-up-the-gems"},"Setting up the gems"),Object(o.b)("p",null,"Afterwards, you will want to add some CORS control for Rack and some other gems to prep for Heroku:"),Object(o.b)("pre",null,Object(o.b)("code",r({parentName:"pre"},{className:"language-rb"}),"gem 'rack-cors', :require => 'rack/cors'\n\ngroup :development, :test do\n  # Moe sqlite3 to here\n  gem 'sqlite3'\nend\ngroup :production do\n  gem 'pg'\nend\n")),Object(o.b)("h2",{id:"creating-your-models"},"Creating your models"),Object(o.b)("p",null,"The following code is an example of creating some Todos."),Object(o.b)("pre",null,Object(o.b)("code",r({parentName:"pre"},{className:"language-s"}),"# rails g model <EntitySingular> [...attribute:type]\nrails generate model Todo title:string done:boolean\n# rails g controller <EntityPlural> [...crud methods]\nrails generate controller Todos index create update destroy\nrails db:migrate\n")),Object(o.b)("h2",{id:"setting-up-your-controller"},"Setting up your controller"),Object(o.b)("p",null,"Update the controller values:"),Object(o.b)("pre",null,Object(o.b)("code",r({parentName:"pre"},{className:"language-rb"}),'class TodosController < ApplicationController\n  def index\n    todos = Todo.order("created_at DESC")\n    render json: todos\n  end\n\n  def create\n    todo = Todo.create(todo_param)\n    render json: todo\n  end\n\n  def update\n    todo = Todo.find(params[:id])\n    todo.update(todo_param)\n    render json: todo\n  end\n\n  def destroy\n    todo = Todo.find(params[:id])\n    todo.destroy\n    head :no_content, status: :ok\n  end\n\n  private\n\n  def todo_param\n    params.require(:todo).permit(:title, :done)\n  end\nend\n')),Object(o.b)("h2",{id:"rescopeing-the-routes"},"Rescopeing the routes"),Object(o.b)("p",null,"We want to change our resources to be available from"),Object(o.b)("pre",null,Object(o.b)("code",r({parentName:"pre"},{className:"language-rb"}),"Rails.application.routes.draw do\n  # get 'todos/index'\n  # get 'todos/create'\n  # get 'todos/update'\n  # get 'todos/destroy'\n  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html\n  scope \"/api/v1\" do\n    resources :todos\n  end\nend\n")),Object(o.b)("h2",{id:"ui-with-create-react-app"},"UI with Create React App"),Object(o.b)("pre",null,Object(o.b)("code",r({parentName:"pre"},{className:"language-s"}),"npm install create-react-app\ncreate-react-app <app-name> --template=typescript\n")),Object(o.b)("p",null,"Set a proxy value in ",Object(o.b)("inlineCode",{parentName:"p"},"package.json")," so that we know where the localhost calls will go to:"),Object(o.b)("pre",null,Object(o.b)("code",r({parentName:"pre"},{className:"language-json"}),'"proxy": "http://localhost:3000"\n')),Object(o.b)("h2",{id:"running-locally"},"Running locally"),Object(o.b)("p",null,"You can use ",Object(o.b)("inlineCode",{parentName:"p"},"heroku local -f Procfile.dev")," with the ",Object(o.b)("inlineCode",{parentName:"p"},"Procfile.dev")," looking like the following:"),Object(o.b)("pre",null,Object(o.b)("code",r({parentName:"pre"},{className:"language-js"}),"web: cd todo-ui && PORT=4000 npm start\napi: cd todo-api && PORT=3000 bin/rails s\n")),Object(o.b)("p",null,"Run and begin calling the routes like so ",Object(o.b)("inlineCode",{parentName:"p"},"/api/v1/todos")," and you will start getting some results! Hooray!"))}s&&s===Object(s)&&Object.isExtensible(s)&&!s.hasOwnProperty("__filemeta")&&Object.defineProperty(s,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"manual/Ruby-On-Rails/Rails-API-From-Scratch.md"}}),s.isMDXComponent=!0}}]);
//# sourceMappingURL=component---manual-ruby-on-rails-rails-api-from-scratch-md-d682b0b8b177aea95d2c.js.map