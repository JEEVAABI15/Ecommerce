pipeline {
    agent any
    environment {
        PORT = '8000'
    }
    tools {nodejs "node"}
    stages {
        stage('Checkout') {
            steps {
                dir('C:\\Users\\jeeva\\Documents\\toHost') {
                    git url: 'https://github.com/JEEVAABI15/Ecommerce', branch: 'main'
                }
            }
        }
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
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
