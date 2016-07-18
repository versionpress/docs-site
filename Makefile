.PHONY: all check-env build push run bash

IMAGE_TAG := quay.io/versionpress/docs-site
IMAGE_VERSION := 2

all: build

check-env:
ifndef DOCS_REPO_PATH
    $(error DOCS_REPO_PATH is undefined)
endif

build:
	docker build -t $(IMAGE_TAG):$(IMAGE_VERSION) .

push:
	docker push $(IMAGE_TAG):$(IMAGE_VERSION)

run: check-env
	docker run --rm \
	-p 3000:3000 \
	-v ${DOCS_REPO_PATH}:/opt/docs \
	$(IMAGE_TAG):$(IMAGE_VERSION)

bash: check-env
	docker run --rm -ti \
	-p 3000:3000 \
	-v ${DOCS_REPO_PATH}:/opt/docs \
	$(IMAGE_TAG):$(IMAGE_VERSION) \
	/bin/sh
