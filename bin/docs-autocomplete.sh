
  #!/bin/bash
  _docs_options()
  {
      local cur prev
      
      cur=${COMP_WORDS[COMP_CWORD]}
      prev=${COMP_WORDS[COMP_CWORD-1]}
      
      case ${COMP_CWORD} in
          1)
              COMPREPLY=($(compgen -W "AWS Accessibility Airtable Algebra Algorithms Amplify Android Angular Architectural-Principles Art Auth Bash Big-Data Books Bots Braintree Business COMP3306-AI COMP3520-OS CSS Chef Chrome Communication Computer-Science Conda Consulting Containers Contentful Conventional-Commits Cooking Cpp Data-Engineering Data-Science Data-Structures Databases Debugging Design Design-Patterns Design-Systems DevOps Digital-Marketing Distributed-File-Systems Docker Dotnet Drupal Electron Elixir Elk Elm Emitter Etcd Ethereum Event-Tracking Expo Express Finger-Drumming Flask French Functional-Programming Git Go Google-Cloud-Platform Google-Play GraphQL Haskell Hygen Images Interactive-Shells Istio JIRA Java JavaScript Jest Kafka Kotlin Kubernetes Language-Learning Laravel Lean-Product Lerna Linguistics LinkedIn Linux Machine-Learning Machine-Learning-Algos Mathematics Mental-Models Momentjs Music MySQL Networking Next Nginx Nodejs OSI-Model PHP POSIX Personal PostgresSQL Principles Product-Discovery Productivity Programming-Languages Protocols Puppeteer Python R Raspberry-Pi React React-Native React-Notes ReasonML Redis Redux Roadmaps Rspec Ruby Ruby-On-Rails Rust SEO SQL Scala Security Segment Server-Side-React Shape-Up Site-Reliability-Engineering Sketch Smartling Storybook Stripe Style Styled-Components Swift System-Design Tableau Tensorflow Terminal Terraform Testing Timber Tooling Treat Twig TypeScript Unity Unix VSCode Vagrant Vim Virtual-File-Systems Web Web-Servers Webpack WordPress Writing Yarn Zeit-Now assets d3 iOS npm" -- ${cur}))
          ;;
          2)
              case ${prev} in
                  
AWS)
    COMPREPLY=($(compgen -W "AWS-Certified-Big-Data AWS-Certified-Solutions-Architect AWS-Certified-SysOps-Administrator AWS-CloudFormation-MasterClass AWS-Fargate-With-ECS AWS-Guide AWS-IoT AWS-Lex AWS-NodeSDK AWS-Transit-Gateway AWS-VPN AWS-Wordpress-Blog Advanced-Networking App-Mesh Cloudfront-S3-Lets-Encrypt EC2-Container-Service Javascript-AWS Namecheap-Route-53 S3-Buckets S3-Lambda-Subdirectories SysOps-Solutions-Architect VPC-Setup" -- ${cur}))
;;

Accessibility)
    COMPREPLY=($(compgen -W "A11y-in-JavaScript" -- ${cur}))
;;

Airtable)
    COMPREPLY=($(compgen -W "" -- ${cur}))
;;

Algebra)
    COMPREPLY=($(compgen -W "Intro Properties Shortcuts Solving-Linear-Equations" -- ${cur}))
;;

Algorithms)
    COMPREPLY=($(compgen -W "ABCheck ANZ-Algo Alphabet-Soup An-Introduction Arith-Geo Array-Addition Array-Manipulation Binary-Converter Bracket-Matcher Caesar-Cipher Case-Swap Check-Nums Consecutive Convert-Time Dash-Insert-Two Division ExOh Fibonnaci-Checker Find-Intersection-Of-Strings First-Factorial First-Reverse LRU-Caches Letter-Capitalize Letter-Changes Letter-Count Longest-Word Minimum-Swaps Number-Search Palindrome-Two Palindrome Polynomial-Expression Prime-Mover Prime-Time Question-Marks Reduction Run-Length Simple-Counting Simple-Mode Simple-Symbols String-Scramble ThreeFiveMultiples Tree-Constructor Triple-Double Vowel-Count Word-Count" -- ${cur}))
;;

Amplify)
    COMPREPLY=($(compgen -W "Adding-Storage Facebook-Login Graphql-Setup" -- ${cur}))
;;

Android)
    COMPREPLY=($(compgen -W "Lists-And-Adapters" -- ${cur}))
;;

Angular)
    COMPREPLY=($(compgen -W "Angular-Basics Angular2-Basics" -- ${cur}))
;;

Architectural-Principles)
    COMPREPLY=($(compgen -W "Policy-And-Level" -- ${cur}))
;;

Art)
    COMPREPLY=($(compgen -W "Drawing" -- ${cur}))
;;

Auth)
    COMPREPLY=($(compgen -W "React-Auth" -- ${cur}))
;;

Bash)
    COMPREPLY=($(compgen -W "Autocompletion" -- ${cur}))
;;

Big-Data)
    COMPREPLY=($(compgen -W "Big-Data-Essentials Tools-And-Technologies" -- ${cur}))
;;

Books)
    COMPREPLY=($(compgen -W "Conversation-Casanova High-Performance-Habits Intercom-On-Product-Management Loonshots Mans-Search-For-Meaning Mastering-Logical-Fallacies Never-Split-The-Difference Strategize The-48-Laws-Of-Power The-Subtle-Art" -- ${cur}))
;;

Bots)
    COMPREPLY=($(compgen -W "API-AI-Bot" -- ${cur}))
;;

Braintree)
    COMPREPLY=($(compgen -W "Sandbox" -- ${cur}))
;;

Business)
    COMPREPLY=($(compgen -W "Personal-MBA" -- ${cur}))
;;

COMP3306-AI)
    COMPREPLY=($(compgen -W "2-Problem-Solving-And-Search 3-A*-Algorithm" -- ${cur}))
;;

COMP3520-OS)
    COMPREPLY=($(compgen -W "2-Process-Description-And-Control 3-Threads Pthread" -- ${cur}))
;;

CSS)
    COMPREPLY=($(compgen -W "CSS-Specificity CSS-Style-Guide Flexbox-Help-Sheet RSCSS-Code-Guide css-cheat-sheet css-gradients-cheat-sheet css-transitions-transforms-cheat-sheet" -- ${cur}))
;;

Chef)
    COMPREPLY=($(compgen -W "Chef-General Chef-Learning-Dev-Ops-Deployment Chef-Udemy chef-cheat-sheet" -- ${cur}))
;;

Chrome)
    COMPREPLY=($(compgen -W "Mastering-Chrome-Dev-Tools-v2" -- ${cur}))
;;

Communication)
    COMPREPLY=($(compgen -W "Introduction" -- ${cur}))
;;

Computer-Science)
    COMPREPLY=($(compgen -W "Communicating-Sequential-Processess Composition Single-Instruction-Multi-Data Space-Complexity Type-Theory" -- ${cur}))
;;

Conda)
    COMPREPLY=($(compgen -W "Troubleshootingx" -- ${cur}))
;;

Consulting)
    COMPREPLY=($(compgen -W "Questions-To-Ask" -- ${cur}))
;;

Containers)
    COMPREPLY=($(compgen -W "Containers-vs-VMs" -- ${cur}))
;;

Contentful)
    COMPREPLY=($(compgen -W "Contentful-JS-API" -- ${cur}))
;;

Conventional-Commits)
    COMPREPLY=($(compgen -W "Automating-Versioning" -- ${cur}))
;;

Cooking)
    COMPREPLY=($(compgen -W "Kitchen-Essentials" -- ${cur}))
;;

Cpp)
    COMPREPLY=($(compgen -W "Cpp-Udemy" -- ${cur}))
;;

Data-Engineering)
    COMPREPLY=($(compgen -W "Intro-To-Data-Engineering" -- ${cur}))
;;

Data-Science)
    COMPREPLY=($(compgen -W "Intermediat-DS-Python" -- ${cur}))
;;

Data-Structures)
    COMPREPLY=($(compgen -W "Count-Vowels Go JavaScript Python Understanding-Big-O-Notation Understanding-Search-Algorithms Understanding-Sorting-Algorithms" -- ${cur}))
;;

Databases)
    COMPREPLY=($(compgen -W "Data-Warehouses ETL Intro-And-Overview Normalisation" -- ${cur}))
;;

Debugging)
    COMPREPLY=($(compgen -W "Resources" -- ${cur}))
;;

Design)
    COMPREPLY=($(compgen -W "Design-fundamentals-7-tricks-graphic-designers-dont-want-you-to-know" -- ${cur}))
;;

Design-Patterns)
    COMPREPLY=($(compgen -W "Abstract-Factory-Pattern Adapter-Pattern Bridge-Pattern Builder-Pattern Chain-Of-Responsibility Command Composite-Pattern Decorator-Pattern Delegation Design-Patterns Facade-Pattern Factory-Pattern Flyweight-Pattern Interpreter Iterator Mediator Memento Observer Prototype-Pattern Proxy-Pattern Singleton State Strategy Template-Method Visitor" -- ${cur}))
;;

Design-Systems)
    COMPREPLY=($(compgen -W "Comparing-Design-Systems Design-Systems Design-Tokens" -- ${cur}))
;;

DevOps)
    COMPREPLY=($(compgen -W "Caching Config-Management-vs-Provisioning Dev-Ops DevOps-Essentials Observability-Definitions Proxies" -- ${cur}))
;;

Digital-Marketing)
    COMPREPLY=($(compgen -W "Digital-Marketing-Course" -- ${cur}))
;;

Distributed-File-Systems)
    COMPREPLY=($(compgen -W "Intro" -- ${cur}))
;;

Docker)
    COMPREPLY=($(compgen -W "Docker-And-Elastic-Beanstalk Docker-Deep-Dive Docker-EC2 Docker-Networking Docker-Quick-Start Docker-Saving-Current-State Docker-TLDR MySQL-Development Restart-And-Expose-Port docker-cheat-sheet docker-code-sheet" -- ${cur}))
;;

Dotnet)
    COMPREPLY=($(compgen -W "Adding-Models Getting-Started Package-Management" -- ${cur}))
;;

Drupal)
    COMPREPLY=($(compgen -W "Drupal-8-Modules Drupal-8-Theming Drupal-8" -- ${cur}))
;;

Electron)
    COMPREPLY=($(compgen -W "Electron-Udemy" -- ${cur}))
;;

Elixir)
    COMPREPLY=($(compgen -W "Elixir-Conditionals Elixir-Course-REPL Elixir-Course-Testing Elixir-Debugging Elixir-Iteration Elixir-Maps-And-Structs Elixir-SQL Elixir-School Phoenix-Routing" -- ${cur}))
;;

Elk)
    COMPREPLY=($(compgen -W "Docker-Elk-Stack" -- ${cur}))
;;

Elm)
    COMPREPLY=($(compgen -W "Advanced-Elm Collections Elm-Architecture Elm-Guide Elm-Types Kevin-Yank-Talk Rendering-Examples User-Focused-Elm Webmasters-Elm" -- ${cur}))
;;

Emitter)
    COMPREPLY=($(compgen -W "README" -- ${cur}))
;;

Etcd)
    COMPREPLY=($(compgen -W "What-Is-Etcd" -- ${cur}))
;;

Ethereum)
    COMPREPLY=($(compgen -W "Intro" -- ${cur}))
;;

Event-Tracking)
    COMPREPLY=($(compgen -W "Naming-Conventions" -- ${cur}))
;;

Expo)
    COMPREPLY=($(compgen -W "Working-With-Detox" -- ${cur}))
;;

Express)
    COMPREPLY=($(compgen -W "Rate-Limiting" -- ${cur}))
;;

Finger-Drumming)
    COMPREPLY=($(compgen -W "Introduction" -- ${cur}))
;;

Flask)
    COMPREPLY=($(compgen -W "Hello-World" -- ${cur}))
;;

French)
    COMPREPLY=($(compgen -W "Auxiliary-Verbs Causative-Construction Demonstrative-Adjectives Glossary Infinitive-Verbs Regular-Verb-Conjugations Transitive-Intransitive-Verbs" -- ${cur}))
;;

Functional-Programming)
    COMPREPLY=($(compgen -W "Functional-Architecture-Patterns Functors-And-Monads Hardcore-FP-In-JavaScript-v2 Hardcore-FP-In-JavaScript Hardcore-JS-Patterns Intro" -- ${cur}))
;;

Git)
    COMPREPLY=($(compgen -W "Git-Complete Git-In-Depth Intermediate-Git Setup-Github-SSH Squashing-Commits" -- ${cur}))
;;

Go)
    COMPREPLY=($(compgen -W "Cheat-Sheet Go-Basic-Slices Go-Basic-Strings Go-Dev-Guide Go-Fizz-Buzz Go-For-JS-Devs Go-Interfaces Go-Lang-Overview Go-Methods-And-Pointers Go-Study-5-Middleware Go-Study-Group Go-Style-Guide Go-Tour-Channels Go-Tour-Go-Routines Go-Tour-Mutexes Go-Useful-Links Wtf-Go" -- ${cur}))
;;

Google-Cloud-Platform)
    COMPREPLY=($(compgen -W "Cloud-Vision-Nodejs" -- ${cur}))
;;

Google-Play)
    COMPREPLY=($(compgen -W "Google-Play" -- ${cur}))
;;

GraphQL)
    COMPREPLY=($(compgen -W "Advanced-GraphQL-v2 Clientside-GraphQL-In-React GraphQL Setting-Up-Heuristic-Matchers" -- ${cur}))
;;

Haskell)
    COMPREPLY=($(compgen -W "HackerRank-Notes Haskell-From-First-Principles Learn-You-A-Haskell Syntax-In-Functions Types-And-Typeclasses" -- ${cur}))
;;

Hygen)
    COMPREPLY=($(compgen -W "intro" -- ${cur}))
;;

Images)
    COMPREPLY=($(compgen -W "Image-Compression" -- ${cur}))
;;

Interactive-Shells)
    COMPREPLY=($(compgen -W "Accessing" -- ${cur}))
;;

Istio)
    COMPREPLY=($(compgen -W "EKS-Istio" -- ${cur}))
;;

JIRA)
    COMPREPLY=($(compgen -W "Usage" -- ${cur}))
;;

Java)
    COMPREPLY=($(compgen -W "Basic-Imports Cheat-Sheet Dependency-Management-With-Gradle Gradle-Intro Java-Basic-Tree Java-Fizz-Buzz Java-Initialising-Arrays Java-Iteration Java-Lambda-Funcs Java-Packages Maps-In-Java" -- ${cur}))
;;

JavaScript)
    COMPREPLY=($(compgen -W "ES6-Guide ES6-fiddle Enzyme-Testing Express-Basics FP-Composing-Software FP-JS-Libraries Functional-Light-JavaScript-v3 Gulp-Basics-TH JS-D3-Udemy JS-Express JS-Interview-Essentials JS-RxJS JS-Unit-Testing-Mocha-Chai JS-Unit-Testing-TH JavaScript-Performance MEAN-Stack-TH MEAN-Stack Mongo-DB-Code-Guide Nightmare O-Auth-With-Passport Resources Sinon-JS Testing-Cheat-Sheet The-Hard-Parts-v2 The-New-Hard-Parts Understanding-This User-Auth-TH Yeoman-Generator jQuery-Code-Guide js-cheat-sheet js-grid-alignment-cheat-sheet" -- ${cur}))
;;

Jest)
    COMPREPLY=($(compgen -W "Extending-Jest JS-Testing-Practices-And-Principles" -- ${cur}))
;;

Kafka)
    COMPREPLY=($(compgen -W "Clients Hello-Kafka Kafka-Admin Kafka-Advanced-Admin Kafka-At-A-Glance Kafka-Basic-Terms Kafka-Internals" -- ${cur}))
;;

Kotlin)
    COMPREPLY=($(compgen -W "Kotlin-Arrays-And-Lists Kotlin-Basics Kotlin-Building-Types Kotlin-Examples Kotlin-From-CLI Kotlin-Lambdas Kotlin-Study-Group" -- ${cur}))
;;

Kubernetes)
    COMPREPLY=($(compgen -W "AWS-EKS-Starter Advanced-Topics EKS-Ctl EKS-Deploy-Stateful-EBS-App EKS-Deploy-Stateful-EFS-App EKS-Deploy-Stateless-App EKS-Docker-Setup EKS-In-Depth EKS-Kubernetes-Dashboard Helm-Redis Helm KOPS-Getting-Started Kubectl-Overview Kubeless Kubernetes-Admin Kubernetes-Basics Kubernetes-Clusters Kubernetes-Course Kubernetes-Udacity Microservices Pulling-From-Docker-Hub" -- ${cur}))
;;

Language-Learning)
    COMPREPLY=($(compgen -W "Approach-To-Learning-Software-Languages Golang" -- ${cur}))
;;

Laravel)
    COMPREPLY=($(compgen -W "Laravel-5.4 Laravel-Artisan Laravel-Basics-TH" -- ${cur}))
;;

Lean-Product)
    COMPREPLY=($(compgen -W "Design-System-Considerations Product-Considerations" -- ${cur}))
;;

Lerna)
    COMPREPLY=($(compgen -W "Getting-Started" -- ${cur}))
;;

Linguistics)
    COMPREPLY=($(compgen -W "Conjugations Elements-Of-Style Regular-And-Irregular-Verbs The-Art-Of-Language-Invention" -- ${cur}))
;;

LinkedIn)
    COMPREPLY=($(compgen -W "linkedin-api-cheat-sheet" -- ${cur}))
;;

Linux)
    COMPREPLY=($(compgen -W "Linux-Essentials SSH-Intro Writing-Bash-Scripts managing-ubuntu-help-sheet" -- ${cur}))
;;

Machine-Learning)
    COMPREPLY=($(compgen -W "CL-Classification-Intro CL-Logistic-Regression ML-Decision-Trees ML-Random-Forest-Regression ML-Regression-Model-Performance ML-Udemy Machine-Learning-Intro Machine-Learning-Stanford Practical-Deep-Learning" -- ${cur}))
;;

Machine-Learning-Algos)
    COMPREPLY=($(compgen -W "K-Nearest-Neighbours" -- ${cur}))
;;

Mathematics)
    COMPREPLY=($(compgen -W "Mathematics-Introduction Polynomials" -- ${cur}))
;;

Mental-Models)
    COMPREPLY=($(compgen -W "Intro-To-Mental-Models" -- ${cur}))
;;

Momentjs)
    COMPREPLY=($(compgen -W "Handling-Diff-In-Days" -- ${cur}))
;;

Music)
    COMPREPLY=($(compgen -W "Equipment" -- ${cur}))
;;

MySQL)
    COMPREPLY=($(compgen -W "MySql" -- ${cur}))
;;

Networking)
    COMPREPLY=($(compgen -W "Firewall Network-Address-Translation Network-Protocol-Fundamentals Routing-Fundamentals Secure-Sockets-Layer Subnetting-Fundamentals" -- ${cur}))
;;

Next)
    COMPREPLY=($(compgen -W "Hello-Next" -- ${cur}))
;;

Nginx)
    COMPREPLY=($(compgen -W "Nginx-Nodejs-Docker" -- ${cur}))
;;

Nodejs)
    COMPREPLY=($(compgen -W "Async-Hooks Digging-Into-Nodejs Enhancing-Node-Performance Hard-Parts-of-Nodejs Node-Internals Nodebots SocketIOx" -- ${cur}))
;;

OSI-Model)
    COMPREPLY=($(compgen -W "What-Is-OSI" -- ${cur}))
;;

PHP)
    COMPREPLY=($(compgen -W "PHP-Anon-Funcs PHP-Arrays PHP-Basics PHP-Constructors PHP-Unit-Tests pdo-cheat-sheet php-cheat-sheet" -- ${cur}))
;;

POSIX)
    COMPREPLY=($(compgen -W "POSIX-Intro" -- ${cur}))
;;

Personal)
    COMPREPLY=($(compgen -W "Job-Preparation-Examples" -- ${cur}))
;;

PostgresSQL)
    COMPREPLY=($(compgen -W "PSQL-Tips" -- ${cur}))
;;

Principles)
    COMPREPLY=($(compgen -W "Communications Components Copy Events FilesLayout Motion Naming Patterns Principles Resources Software-First-Principles Structures Styling Typography Web-Checklist copy-examples.js" -- ${cur}))
;;

Product-Discovery)
    COMPREPLY=($(compgen -W "Best-Continous-Discovery-Mindsets Intro-To-Modern-Product-Discovery Keystone-Habit Lean-Canvas Opportunity-Solution-Tree Product-Discovery-Case-Study Product-Discovery-Principles Story-Mapping" -- ${cur}))
;;

Productivity)
    COMPREPLY=($(compgen -W "Productivity" -- ${cur}))
;;

Programming-Languages)
    COMPREPLY=($(compgen -W "Code-Transformation-and-Linting-with-ASTs Creating-Your-Own-Language" -- ${cur}))
;;

Protocols)
    COMPREPLY=($(compgen -W "Address-Resolution-Protocol Border-Gateway-Protocol File-Transfer-Protocol Hypertext-Transfer-Protocol Path-Vector-Protocol Secure-Shell Simple-Mail-Transfer-Protocol" -- ${cur}))
;;

Puppeteer)
    COMPREPLY=($(compgen -W "Dev-Tool-Assertions Recorder" -- ${cur}))
;;

Python)
    COMPREPLY=($(compgen -W "Examples Mutex-Locks Python-Collections Python-Data-Structures Python-Exceptions Python-Intermediate-Data-Science Python-Intro-To-Data-Science Python-Object-Orientated Python-Slack-Bot Thread-Pool-Usage Writing-CSV-Files Wtf-Python" -- ${cur}))
;;

R)
    COMPREPLY=($(compgen -W "R-Intermediate R-Intro" -- ${cur}))
;;

Raspberry-Pi)
    COMPREPLY=($(compgen -W "Setting-Up-Wifi" -- ${cur}))
;;

React)
    COMPREPLY=($(compgen -W "Advanced-React-Patterns Context-API Data-Vis-For-React-Developers Intro Lead-Debouncing-With-Hooks React-Testing-Library State-Management-In-Pure-React Testing-React-Applications dynamic-imports guidelines structure" -- ${cur}))
;;

React-Native)
    COMPREPLY=($(compgen -W "React-Native-Cheat-Sheet React-Native-Code-Guide React-Native-For-iOS-Devs React-Native-Redux React-Native-With-SCSS React-Native-iBeacon Setting-Up-Expo-Redux-Saga" -- ${cur}))
;;

React-Notes)
    COMPREPLY=($(compgen -W "Advanced-React-Redux Flux-Basics React-Animations React-Context React-Hooks React-Portals React-Redux-Middleware React-Router React-Testing-Enzyme React-With-Redux TH-React-Basics react-style-guide" -- ${cur}))
;;

ReasonML)
    COMPREPLY=($(compgen -W "Reason-Hello-World" -- ${cur}))
;;

Redis)
    COMPREPLY=($(compgen -W "Redis-Kue-Nodejs Redis-Nodejs Redis" -- ${cur}))
;;

Redux)
    COMPREPLY=($(compgen -W "Intro-To-Reselect ReduxPersist" -- ${cur}))
;;

Roadmaps)
    COMPREPLY=($(compgen -W "Roadmaps-Intro" -- ${cur}))
;;

Rspec)
    COMPREPLY=($(compgen -W "Rspec-Intro" -- ${cur}))
;;

Ruby)
    COMPREPLY=($(compgen -W "CocoaPods-Workshop How-Does-The-Ruby-Interpreter-Work Intro Metaprogramming-Ruby-2 Rails-Useful-Tidbits Ruby-Arrays Ruby-Blocks-Procs-Lambdas Ruby-Cheat-Sheet Ruby-Code-Guide Ruby-Constructors Ruby-Currying Ruby-Debugging Ruby-Double-Pipe-Operator Ruby-Error-Handling Ruby-Lambda-Funcs Ruby-Modules Ruby-Nil Ruby-On-Rails Ruby-Symbols Ruby-Version-Manager" -- ${cur}))
;;

Ruby-On-Rails)
    COMPREPLY=($(compgen -W "Introduction" -- ${cur}))
;;

Rust)
    COMPREPLY=($(compgen -W "Building-Rust-CLIs Learning-Rust Rust-Lang-Org-Book Rust-Useful-Tidbits" -- ${cur}))
;;

SEO)
    COMPREPLY=($(compgen -W "SEO-For-Beginners" -- ${cur}))
;;

SQL)
    COMPREPLY=($(compgen -W "Indexing-Example SQL-Tuning SQL-Window-Functions" -- ${cur}))
;;

Scala)
    COMPREPLY=($(compgen -W "Intro-To-Scala Scala-Expressions Scala-Values-Variables-Types" -- ${cur}))
;;

Security)
    COMPREPLY=($(compgen -W "OWASP-Top-Ten Security-Intro" -- ${cur}))
;;

Segment)
    COMPREPLY=($(compgen -W "Intro" -- ${cur}))
;;

Server-Side-React)
    COMPREPLY=($(compgen -W "Create-React-App-Server-Side Server-Side-Rendering-With-React-And-Redux" -- ${cur}))
;;

Shape-Up)
    COMPREPLY=($(compgen -W "Hill-Charts" -- ${cur}))
;;

Site-Reliability-Engineering)
    COMPREPLY=($(compgen -W "Glossary Service-Level-Objectives Toil" -- ${cur}))
;;

Sketch)
    COMPREPLY=($(compgen -W "Principles" -- ${cur}))
;;

Smartling)
    COMPREPLY=($(compgen -W "Smartling-CLI Working-With-Smartling" -- ${cur}))
;;

Storybook)
    COMPREPLY=($(compgen -W "adding-docs adding-knobs integrating-redux intro storybook-sass webpack-sass" -- ${cur}))
;;

Stripe)
    COMPREPLY=($(compgen -W "Charges-Vs-Payment-Intent Dotnet-Stripe-Configuration Flask-Stripe-Configuration Gin-Stripe-Configuration Node-SaaS-With-Stripe Rails-Stripe-Configuration React-Stripe-Elements Slim-Stripe-Configuration Spring-Stripe-Configuration Stripe-API-Integrations Stripe-CLI Stripe-Node-Deprecated Stripe-Node-React Stripe-Product-Line Stripe-Samples" -- ${cur}))
;;

Style)
    COMPREPLY=($(compgen -W "base-animations base-mixins base style" -- ${cur}))
;;

Styled-Components)
    COMPREPLY=($(compgen -W "Intro-With-Styled-Systems" -- ${cur}))
;;

Swift)
    COMPREPLY=($(compgen -W "Swift-3-API-Design-Guidelines Swift-3-Extensions Swift-3-Methods Swift-3-OOP Swift-3-Protocols Swift-Package-Manager" -- ${cur}))
;;

System-Design)
    COMPREPLY=($(compgen -W "Data-Systems Distributed-Data Glossary Interviews" -- ${cur}))
;;

Tableau)
    COMPREPLY=($(compgen -W "Tableau-Live-Talk" -- ${cur}))
;;

Tensorflow)
    COMPREPLY=($(compgen -W "Tensorflow-JS" -- ${cur}))
;;

Terminal)
    COMPREPLY=($(compgen -W "Tips-and-Tricks" -- ${cur}))
;;

Terraform)
    COMPREPLY=($(compgen -W "Terraform" -- ${cur}))
;;

Testing)
    COMPREPLY=($(compgen -W "Intro Regression-Testing UI-Testing-Web enzyme mocha-and-chai puppeteer" -- ${cur}))
;;

Timber)
    COMPREPLY=($(compgen -W "Timber-Cheat-Sheet" -- ${cur}))
;;

Tooling)
    COMPREPLY=($(compgen -W "Awesome-CLI-Tools" -- ${cur}))
;;

Treat)
    COMPREPLY=($(compgen -W "Index Playroom-With-Treat Storybook-With-Treat" -- ${cur}))
;;

Twig)
    COMPREPLY=($(compgen -W "Twig-Cheat-Sheet" -- ${cur}))
;;

TypeScript)
    COMPREPLY=($(compgen -W "Developers-Guide Getting-Started TS-Fundamentals-v2" -- ${cur}))
;;

Unity)
    COMPREPLY=($(compgen -W "How-To-Make-A-Video-Game Unity-Basics" -- ${cur}))
;;

Unix)
    COMPREPLY=($(compgen -W "Appending-Files Unix-Command-Line" -- ${cur}))
;;

VSCode)
    COMPREPLY=($(compgen -W "VSCode-Can-Do-That" -- ${cur}))
;;

Vagrant)
    COMPREPLY=($(compgen -W "Vagrant-Overview" -- ${cur}))
;;

Vim)
    COMPREPLY=($(compgen -W "Intermediate-Vim Neovim Vim" -- ${cur}))
;;

Virtual-File-Systems)
    COMPREPLY=($(compgen -W "Intro" -- ${cur}))
;;

Web)
    COMPREPLY=($(compgen -W "Accessibility-Course Aria-Tags Exploring-Service-Workers Web-APIs Web-Concepts" -- ${cur}))
;;

Web-Servers)
    COMPREPLY=($(compgen -W "Resources" -- ${cur}))
;;

Webpack)
    COMPREPLY=($(compgen -W "Building-A-Webpack-Plugin Webpack-2 Webpack-4-Fundamentals Webpack-5-Federation Webpack-Optimisation Webpack-Performance Webpack-Plugins Webpack" -- ${cur}))
;;

WordPress)
    COMPREPLY=($(compgen -W "WP-PC-Cheat-Sheet WP-PC-Setup-Cheat-Sheet WordPress-Cheat-Sheet" -- ${cur}))
;;

Writing)
    COMPREPLY=($(compgen -W "Writing-With-Flair" -- ${cur}))
;;

Yarn)
    COMPREPLY=($(compgen -W "Workspaces-In-Yarn" -- ${cur}))
;;

Zeit-Now)
    COMPREPLY=($(compgen -W "Typescript-Github-Example" -- ${cur}))
;;

assets)
    COMPREPLY=($(compgen -W "example-layout.png" -- ${cur}))
;;

d3)
    COMPREPLY=($(compgen -W "D3" -- ${cur}))
;;

iOS)
    COMPREPLY=($(compgen -W "Apple-Watch PassKit iOS-Delegation iOS-Gaming-Intro ios-objc-cheat-sheet" -- ${cur}))
;;

npm)
    COMPREPLY=($(compgen -W "NPM-as-a-Task-Runner Npm-Create-Package npm-cheat-sheet" -- ${cur}))
;;

              esac
          ;;
          *)
              COMPREPLY=()
          ;;
      esac
  }
  
  complete -F _docs_options docs
  