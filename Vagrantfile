VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = 'pomf-raring'
  config.vm.box_url = 'http://cloud-images.ubuntu.com/vagrant/raring/current/raring-server-cloudimg-amd64-vagrant-disk1.box'

  config.vm.network :forwarded_port, guest: 8010, host: 8110
  config.vm.network :private_network, ip: "192.168.121.100"


  #######
  # Global Setup
  ####
  # Install Node.js
  config.vm.provision :shell, :inline => <<-NODEJS
    add-apt-repository -y ppa:chris-lea/node.js 2>&1 >/dev/null &&\
    apt-get -qq -y update &&\
    apt-get -qq -y install nodejs &&\
    npm --loglevel error install -g grunt-cli >/dev/null
  NODEJS

  # Install Docker
  config.vm.provision :shell, :inline => <<-DOCKER
    apt-get -qq -y install linux-image-extra-`uname -r` &&\
    apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 36A1D7869245C8950F966E92D8576A8BA88D21E9 2>&1 >/dev/null &&\
    echo deb http://get.docker.io/ubuntu docker main > /etc/apt/sources.list.d/docker.list &&\
    apt-get -qq -y update && apt-get -qq -y install lxc-docker
  DOCKER

  # Set up directories
  config.vm.provision :shell, :inline => <<-DIRS
    mkdir -p /var/www/files
  DIRS


  #######
  # Local Setup
  ####
  # Install NPM dependencies
  config.vm.provision :shell, :inline => "cd /vagrant && npm --loglevel error install"
  # Run grunt
  config.vm.provision :shell, :inline => "cd /vagrant && grunt >/dev/null"
  # Link the dist dir into the nginx directory
  config.vm.provision :shell, :inline => "ln -s /vagrant/dist /var/www/uploader"
end
