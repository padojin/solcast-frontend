pipeline {
    agent any

    environment {
        NODEJS_HOME = tool name: 'NodeJS 20.14.0', type: 'NodeJSInstallation'
        PATH = "${NODEJS_HOME}/bin:${env.PATH}"
    }

    stages {
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

