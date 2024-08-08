pipeline {
    agent any
    environment {
        PORT = '8000'  
    }
    tools {nodejs "node"}
    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/JEEVAABI15/Ecommerce', branch: 'main'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Start Server') {
            steps {
                script {
                    sh 'nohup npm run > server.log 2>&1 &'
                }
            }
        }
    }
    post {
        success {
            echo 'completed successfully!'
        }
        failure {
            echo 'Deployment failed.'
        }
    }
}