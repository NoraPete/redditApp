pipeline {
	agent any
		stages {
			stage('Checkout SCM') {
				steps {
					checkout scm
				}
			}
			stage('Build') {
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
