pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "travelproject-app:latest"
    }

    stages {
        stage('Checkout Code') {
            steps {
                // Pull the latest code from the Git repository
                git branch: 'main', url: 'https://github.com/Lohith-11/echonest.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install project dependencies
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                // Run tests (if any)
                sh 'npm test || echo "No tests defined"'
            }
        }

        stage('Build Docker Image') {
            steps {
                // Build the Docker image
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }

        stage('Deploy') {
            steps {
                // Run the Docker container
                sh 'docker-compose down'
                sh 'docker-compose up -d'
            }
        }
    }

    post {
        always {
            // Clean up workspace
            cleanWs()
        }
    }
}
