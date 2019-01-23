---
name: Vagrant Overview
menu: Vagrant
---

# Vagrant Overview

| Action         | Command                         |
| -------------- | ------------------------------- |
| vagrant reload | Vagrant `halt` followed by `up` |
| vagrant up     | Start a Vagrant box             |
| vagrant ssh    | Secret shell into a Vagrant box |

## Vagrant Port Forwarding

To forward 80 => 8080 from Vagrant Box to host.

```ruby
Vagrant.configure("2") do |config|
  # Other config
  config.vm.network "forwarded_port", guest: 80, guest_ip: "0.0.0.0", host: 8080, host_ip: "127.0.0.1"
end
```

```ruby
config.vm.provider 'virtualbox' do |vb|
  vb.customize ['modifyvm', :id, '--cableconnected1', 'on']
end
```