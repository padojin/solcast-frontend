pipeline {
    agent any

    environment {
       S3PATH = "${env.JOB_NAME}"
   }
   tools {
      nodejs "NodeJS 20.14.0"
   }

    stages {
          stage('Install zip') {
            steps {
                sh 'sudo apt-get update && sudo apt-get install -y zip'
            }
        }
        stage('Checkout') {
            steps {
                git 'https://github.com/padojin/solcast-frontend.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Deploy to AWS CodeDeploy') {
            steps {
                withAWS(region: 'ap-northeast-2', credentials: 'cicd-user') {
                    sh '''
                    zip -r frontend.zip build/
                    aws s3 cp frontend.zip s3://pado-cicd-test-bucket/jenkins/frontend.zip
                    '''
                    step([$class: 'AWSCodeDeployPublisher',
                        applicationName: 'solcast-deploy',
                        deploymentGroupName: 'frontend-deploy',
                        s3bucket: 'pado-cicd-test-bucket',
                        s3prefix: 'jenkins/frontend.zip',
                        deploymentConfig: 'CodeDeployDefault.OneAtATime',
                        fileExistsBehavior: 'OVERWRITE'])
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}

