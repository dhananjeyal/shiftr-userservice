pipeline {

  environment {
    registry = "572862620375.dkr.ecr.ca-central-1.amazonaws.com/shiftr_user"
    dockerImage = ""
  }
      agent {
    kubernetes {
      defaultContainer 'jnlp'
      yaml """
apiVersion: v1
kind: Pod
metadata:
  labels:
    app: pipeline
spec:
  containers:
  - name: docker
    image: docker
    command:
    - cat
    args:
    - /bin/sh
    - -c
    - chmod -R 777 /var/run/docker.sock
    tty: true
    volumeMounts:
       - name: dockersock
         mountPath: /var/run/docker.sock
  - command:
    - "cat"
    image: "lachlanevenson/k8s-kubectl:latest"
    name: "kube"
    tty: true
  volumes:
  - name: dockersock
    hostPath:
      path: /var/vcap/sys/run/docker/docker.sock

 
"""
    }
  }

  stages {

        stage('SCM checkout') {
          steps {
            checkout scm
      }
    }

    stage('Build image') {
      steps {
         container('docker'){
             sh "docker build -t ${registry}:prod${BUILD_NUMBER} ."
        }
      }
    }

    stage('Deployment'){
      steps{
        container('kube'){
          sh ("sed -i 's/prod0/prod${BUILD_NUMBER}/g' ./user-deployment.yml" )
          sh 'cat ./user-deployment.yml'
          sh 'kubectl get pods -n jenkins'
          sh 'kubectl apply -f user-deployment.yml -n jenkins'
        }
      }
    }
  }
}