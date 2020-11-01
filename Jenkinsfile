pipeline {
  agent {
    kubernetes {
      //cloud 'kubernetes'
      yaml """
kind: Pod
metadata:
  name: img
spec:
  containers:
  - name: img
    image: jessfraz/img
    imagePullPolicy: Always
    command:
    - cat
    tty: true
    image: "lachlanevenson/k8s-kubectl:latest"
    name: "kube"
    tty: true
    command:
    - cat
    volumeMounts:
      - name: docker-config
        mountPath: /home/user/.docker
  volumes:
    - name: docker-config
      configMap:
        name: docker-config
"""
    }
  }
  stages {
    stage('Build with Img') {
      environment {
        PATH = "/home/user/bin:$PATH"
      }
      steps {
        container(name: 'img') {
            sh 'wget https://amazon-ecr-credential-helper-releases.s3.us-east-2.amazonaws.com/0.3.1/linux-amd64/docker-credential-ecr-login'
            sh 'chmod +x docker-credential-ecr-login'
            sh 'mkdir ~/bin'
            sh 'mv docker-credential-ecr-login ~/bin/docker-credential-ecr-login'
            sh '''
            img build . -t 572862620375.dkr.ecr.ca-central-1.amazonaws.com/shiftr_user:prod$BUILD_NUMBER
            '''
            sh ' img push 572862620375.dkr.ecr.ca-central-1.amazonaws.com/shiftr_user:prod$BUILD_NUMBER'
        }
      }
    }
  stage('deploy') {
            steps{
              container(name: 'kube') {
                sh script: '''
                #!/bin/bash
                cd $WORKSPACE/
                cat ./user-deployment.yml | sed s/prod0/prod${BUILD_NUMBER}/g
                kubectl apply -f ./user-deployment.yml
                '''
           }
        }
     }
  }
}  