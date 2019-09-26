node {
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
		}
	}
