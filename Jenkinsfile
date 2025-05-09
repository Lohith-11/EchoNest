pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "travelproject-app:latest"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/Lohith-11/echonest.git'
            }
        }

        stage('Install Dependencies') {
            agent {
                docker {
                    image 'node:18'
                }
            }
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            agent {
                docker {
                    image 'node:18'
                }
            }
            steps {
                sh 'npm test || echo "No tests defined"'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker-compose down || true'
                sh 'docker-compose up -d'
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
