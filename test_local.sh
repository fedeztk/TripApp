#!/usr/bin/env bash

build-single() {
	eval $(minikube docker-env)
	if [ -z "$1" ]; then
		echo "No service specified"
		exit 1
	fi

	for f in ./infra-local/"$1"*; do
		if [ -f "$f" ]; then
			kubectl delete --wait -f "$f"
		fi
	done

	local d
	if [ "$1" == "ui" ]; then
		d=./tripapp-"$1"
		minikube image rm fedeztk/"$(basename "$d")":latest
	else
		d=./tripapp-app/"$1"
		minikube image rm fedeztk/tripapp-"$(basename "$d")":latest
	fi

	if [ "$1" == "ui" ]; then
		docker build -t fedeztk/tripapp-ui:latest --build-arg GH_ACTIONS_BACKEND_ENDPOINT=http://mastercc.hpc4ai.unito.it."$(minikube ip)".nip.io:80/api/gateway ./tripapp-ui
	else
		if [ -d "$d" ]; then
			docker build -t fedeztk/tripapp-"$(basename "$d")":latest "$d"
		fi
	fi

	for f in ./infra-local/"$1"*; do
		if [ -f "$f" ]; then
			kubectl apply -f "$f"
		fi
	done
	eval $(minikube docker-env -u)
}

stop-cluster() {
	minikube delete
}

start-cluster() {
	stop-cluster

	# This script is used to test the local environment
	minikube start --container-runtime=docker
	minikube addons enable ingress
	eval $(minikube docker-env)

	update-cluster-ip

	build-all-images

	k8s-deploy

	eval $(minikube docker-env -u)
}

build-all-images() {
	# build all images under tripapp-app and load them into minikube in parallel
	for d in ./tripapp-app/*; do
		if [ -d "$d" ]; then
			docker build -t fedeztk/tripapp-"$(basename "$d")":latest "$d" &
		fi
	done
	docker build -t fedeztk/tripapp-ui:latest --build-arg GH_ACTIONS_BACKEND_ENDPOINT=http://mastercc.hpc4ai.unito.it."$(minikube ip)".nip.io:80/api/gateway ./tripapp-ui &

	wait
}

k8s-deploy() {
	# apply all yaml files under triapp-infra
	for f in ./infra-local/*; do
		if [ -f "$f" ]; then
			kubectl apply -f "$f"
		fi
	done
}

update-cluster-ip() {
	local predefined_ip
	predefined_ip="192.168.49.2"

	if ! ping -c 1 "$predefined_ip" &>/dev/null; then
		find ./infra-local/ -type f -exec sed -i "s/$(predefined_ip)/$(minikube ip)/g" {} \;
	fi

}

case "$1" in
-r | --rebuild) shift build-single "$1" ;;
-u | --up) start-cluster ;;
-d | --down) stop-cluster ;;
*) echo "Unrecognized option $1" && exit 1 ;;
esac
