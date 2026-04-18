#!/bin/bash

# Retrieve IP
echo "Insert IP"
read IP

cd /home/ubuntu
# "Installing packages ########################################################################"
echo "Installing packages ########################################################################"
sudo apt-get update
sudo apt-get upgrade -y
sudo apt-get install -y python3-venv python3-dev default-libmysqlclient-dev build-essential nginx supervisor pkg-config gunicorn python3-pip

# "Activating python enviroment ########################################################################"
echo "Activating python enviroment ########################################################################"
python3 -m venv env
source env/bin/activate

# "Installing python packages ########################################################################"
echo "Installing python packages ########################################################################"
pip3 install django gunicorn djangorestframework djoser Pillow tk django-environ django-cors-headers py-algorand-sdk==1.20.2 mysqlclient

# "Location ########################################################################"
echo "Location ########################################################################"
cd /home/ubuntu/gramo_dashboard

# "Testing NGINX ########################################################################"
echo "Testing NGINX ########################################################################"
nginx

# "Binding Gunicorn ########################################################################"
echo "Binding Gunicorn ########################################################################"
gunicorn --bind 0.0.0.0:8000 dashboard_gramo_project.wsgi:application &
    
# "Writing gunicorn.conf file ########################################################################"
echo "Writing gunicorn.conf file ########################################################################"
sudo mkdir /var/log/gunicorn
cd /etc/supervisor/conf.d/
touch gunicorn.conf

cat <<EOF > /etc/supervisor/conf.d/gunicorn.conf
[program:gunicorn]
directory=/home/ubuntu/gramo_dashboard
command=/home/ubuntu/env/bin/gunicorn --workers 3 --bind unix:/home/ubuntu/gramo_dashboard/app.sock dashboard_gramo_project.wsgi:application
autostart=true
autorestart=true
stderr_logfile=/var/log/gunicorn/gunicorn.err.log
stdout_logfile=/var/log/gunicorn/gunicorn.out.log

[group:guni]
programs:gunicorn
EOF

# "Restarting  supervisorctl ########################################################################"
echo "Restarting  supervisorctl ########################################################################"
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl status

# "Setup NGINX ########################################################################"
echo "Setup NGINX ########################################################################"
cd /etc/nginx/sites-available
sudo touch django.conf

cat <<EOF > /etc/nginx/sites-available/django.conf
server {
  listen 80;
  server_name $IP;
  
  location / {
    include proxy_params;
    proxy_pass http://unix:/home/ubuntu/gramo_dashboard/app.sock;
  } 	
}
EOF

# "Restarting services ########################################################################"
echo "Restarting services ########################################################################"
sudo nginx -t
sudo ln django.conf /etc/nginx/sites-enabled/
sudo service nginx restart
sudo supervisorctl reload
sudo systemctl reload nginx