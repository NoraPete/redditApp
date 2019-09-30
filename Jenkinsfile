pipeline {
	agent any
		stages {
			stage('Checkout SCM') {
				steps {
					checkout scm
				}
			}
			stage('Build-app') {
				steps {
					sh 'npm install'
					sh 'npm start'
				}
			}
			stage('Build-image') {
				steps {
					sh 'docker build -t np4519/reddit .'
				}
			}
			stage('Test') {
				steps {
					sh 'node test.js'
				}
			}
		}
	}
