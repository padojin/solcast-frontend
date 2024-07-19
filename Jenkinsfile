pipeline {
   agent any

   environment {
       S3PATH = "${env.JOB_NAME}"
       AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key')
   }
   tools {
      nodejs "NodeJS 20.14.0"
   }

   stages {
      stage('Check Out') {
         steps {
            git branch: 'main', url: 'https://github.com/padojin/solcast-frontend.git'
         }
      }

      // stage('Install dependencies') {
      //     steps {
      //         sh 'npm ci'
      //     }
      // }
      stage('Create Zip Archive') {
          steps {
              sh 'zip -r frontend.zip . -x "node_modules/*" -x ".git/*"'
          }
      }
      stage('Upload S3') {
          steps {
              // echo 'Upload S3'
              withAWS(credentials: 'cf4bc89a-8b0d-4150-a678-f6f5f89f8327') {
                  s3Upload(file: 'frontend.zip', bucket: 'solcast-frontend-bucket', path: "${S3PATH}/frontend.zip")
              }
          }
      }
      stage('Deploy') {
          steps {
              // echo 'deploy'
              step([$class: 'AWSCodeDeployPublisher', 
                    applicationName: 'solcast', 
                    awsAccessKey: 'AKIA5FTZBNGAD22XVD4M', 
                    awsSecretKey: AWS_SECRET_ACCESS_KEY, 
                    credentials: 'awsAccessKey', 
                    deploymentConfig: 'CodeDeployDefault.AllAtOnce', 
                    deploymentGroupAppspec: false, 
                    deploymentGroupName: 'solcast-web-deploy', 
                    excludes: '', 
                    iamRoleArn: '', 
                    includes: '**', 
                    proxyHost: '', 
                    proxyPort: 0, 
                    region: 'ap-northeast-2', 
                    s3bucket: 'solcast-frontend-bucket', 
                    s3prefix: 'solcast-frontend/', 
                    subdirectory: '', 
                    versionFileName: '', 
                    waitForCompletion: false
              ])
          }
      }

   }
   post {
        success {
            echo 'successed'
        }
        failure {
            echo 'failed'
        }
   }
}
