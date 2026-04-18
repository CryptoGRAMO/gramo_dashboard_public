# Gramo

## Requirements

Ubuntu 20.04 LTS

## Instructions

Enter in the instance using git bash, cmd etc..:

```shell
ssh -i ./[SSH-key-downloaded-from-the-instance].pem ubuntu@[the-ip]
```

Once in the instance execute the following:

```shell
sudo -i
cd /home/ubuntu
git clone https://<userName>:<PAT>@github.com/<userNameOrOrganization>/<repoName>.git
cd gramo_dashboard/infra/scripts
chmod 770 script_deploy_gramo.sh
./script_deploy_gramo.sh
```

This will ask for the IP that will be use in the NGINX configuration.
