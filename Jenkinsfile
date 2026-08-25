pipeline {
    agent any

    environment {
        DOCKER_HOST = 'unix:///var/run/docker.sock'
    }

    stages {
        stage('Checkout Source') {
            steps {
                echo 'Pulling source code from Git...'
                checkout scm
            }
        }

        stage('Deploy Services') {
            steps {
                echo 'Stopping existing containers and launching updated stack...'
                sh 'docker compose down || true'
                sh 'docker compose up -d --build'
            }
        }

        stage('Verify Health') {
            steps {
                echo 'Checking status of active containers...'
                sh 'docker compose ps'
            }
        }
    }

    post {
        success {
            echo 'Application successfully deployed and running!'
        }
        failure {
            echo 'Pipeline failed during deployment. Check the logs above.'
        }
    }
}