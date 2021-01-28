cd iac
terraform init
terraform taint docker_registry_image.app || true
terraform apply
cd ..