docker-compose up -d --build --force-recreate
docker rmi $(sudo docker images --filter "dangling=true" -q --no-trunc)
