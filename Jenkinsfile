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
                // script {
                //     // Start the server in the background
                //     bat 'start /B npm run start'

                //     // Optional: Wait for the server to start (5 seconds)
                //     sleep 5

                //     // Check if the server is up by making a simple request
                //     bat """
                //         for /L %%i in (1,1,5) do (
                //             powershell -Command "try { \$response = Invoke-WebRequest http://localhost:8000; if (\$response.StatusCode -eq 200) { exit 0 } } catch { Write-Output 'Server not ready'; Start-Sleep -Seconds 2 }"
                //         )
                //     """
                // }
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
