# Kubernetes

### Table of Contents (目錄)

* Architecture (架構)
* [Install (安裝)](#install-安裝)
* [Getting Started (起手式)](#getting-started-起手式)

***

### Install (安裝)

#### Install VirtualBox (安裝 VirtualBox)

Go to the official website to download and install VirtualBox (至官網下載安裝 VirtualBox)

https://www.virtualbox.org/wiki/Downloads

#### Install Kubectl (安裝 Kubectl)

Install Kubernetes CLI via Homebrew (透過 Homebrew 安裝 Kubernetes CLI)

```bash
$ brew install kubectl
```

#### Install Minikube (安裝 Minikube)

下載 Minikube

```bash
$ curl -Lo minikube https://storage.googleapis.com/minikube/releases/latest/minikube-darwin-amd64
```

新增執行權限

```bash
$ chmod +x ./minikube
```

移至可執行位置

```bash
$ sudo mv ./minikube /usr/local/bin/minikube
```

查看 Minikube 版本

```bash
$ minikube version
# minikube version: v0.24.1
```

### Getting Started (起手式)

啟動 Kubernetes 叢集

```bash
$ minikube start
```

查看 Kubernetes 版本

```bash
$ kubectl version
# Client Version: version.Info{Major:"1", Minor:"9", GitVersion:"v1.9.2", GitCommit:"5fa2db2bd46ac79e5e00a4e6ed24191080aa463b", GitTreeState:"clean", BuildDate:"2018-01-18T21:11:08Z", GoVersion:"go1.9.2", Compiler:"gc", Platform:"darwin/amd64"}
# Server Version: version.Info{Major:"1", Minor:"8", GitVersion:"v1.8.0", GitCommit:"0b9efaeb34a2fc51ff8e4d34ad9bc6375459c4a4", GitTreeState:"clean", BuildDate:"2017-11-29T22:43:34Z", GoVersion:"go1.9.1", Compiler:"gc", Platform:"linux/amd64"}
```

查看 Minikube 狀態

```bash
$ minikube status
# minikube: Running
# cluster: Running
# kubectl: Correctly Configured: pointing to minikube-vm at 192.168.99.100
```

透過 SSH 進行連線

```bash
$ minikube ssh
```

連線後，查看 Docker 版本

```bash
$ docker version
```

離開 SSH 連線

```bash
$ exit
```

開啟 Dashboard

```bash
$ minikube dashboard
```

刪除 Kubernetes 叢集

```bash
$ minikube delete
# Deleting local Kubernetes cluster...
# Machine deleted.
```

停止 Kubernetes 叢集

```bash
$ minikube stop
# Stopping local Kubernetes cluster...
# Machine stopped.
```
