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
                bat 'npm install'
            }
        }
        stage('Start Server') {
            steps {
                script {
                   bat 'start /B npm run start-dev'
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
