#!groovy



import groovy.json.JsonSlurperClassic
node {

    def BUILD_NUMBER=env.BUILD_NUMBER
    def RUN_ARTIFACT_DIR="tests/${BUILD_NUMBER}"
    def SFDC_USERNAME

    def HUB_ORG=env.HUB_ORG_DH
    def SFDC_HOST = env.SFDC_HOST_DH
    def JWT_KEY_CRED_ID = env.JWT_CRED_ID_DH
    def CONNECTED_APP_CONSUMER_KEY=env.CONNECTED_APP_CONSUMER_KEY_DH

    println 'KEY IS' 
    println JWT_KEY_CRED_ID
    println HUB_ORG
    println SFDC_HOST
    println CONNECTED_APP_CONSUMER_KEY
    //def toolbelt = tool 'toolbelt'

    stage('checkout source') {
        // when running in multi-branch job, one must issue this command
        checkout scm
    }

    withCredentials([file(credentialsId: JWT_KEY_CRED_ID, variable: 'jwt_key_file')]) {
        stage('Deploye Code') {
              		if (isUnix()) {
				rc = sh returnStatus: true, script: "sfdx force:auth:logout --targetusername ${HUB_ORG} -p & sfdx force:auth:jwt:grant --clientid ${CONNECTED_APP_CONSUMER_KEY} --instanceurl ${SFDC_HOST} --username ${HUB_ORG} --jwtkeyfile ${jwt_key_file}"
			}else{
				rc = bat returnStdout: true, script: "sfdx force:auth:jwt:grant --clientid ${CONNECTED_APP_CONSUMER_KEY} --instanceurl ${SFDC_HOST} --username ${HUB_ORG} --jwtkeyfile ${jwt_key_file}"
			}
              		if (rc != 0) { error 'hub org authorization failed' }
			// println rc
			
			// need to pull out assigned username
			if (isUnix()) {
				//rmsg = sh returnStdout: true, script: "sfdx force:alias:list"
				//printf rmsg
				rmsg = sh returnStdout: true, script: "sfdx force:auth:jwt:grant --clientid ${CONNECTED_APP_CONSUMER_KEY} --instanceurl ${SFDC_HOST} --username ${HUB_ORG} --jwtkeyfile ${jwt_key_file} & sfdx force:source:deploy --sourcepath force-app --targetusername ${HUB_ORG}"
			}else{
			        rmsg = bat returnStdout: true, script: "sfdx force:source:deploy --sourcepath force-app --targetusername ${HUB_ORG}"
			}
			  
            printf rmsg
            println('Hello from a Job DSL script!')
            println(rmsg)
        }
    }
}
