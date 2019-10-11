import axios from "axios";

class HelloWorldService {

    executeHelloWorldService() {

        console.log('executed service')

        //return promise back
        return axios.get('http://localhost:8080/hello-world')
    }

    executeHelloWorldBeanService() {

        console.log('executed service')

        //return promise back
        return axios.get('http://localhost:8080/hello-world-bean')
    }

    executeHelloWorldPathVariableService(name) {

        console.log('executed service')
        //let username = 'in28minutes'
        //let password = 'dummy'

        //let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password)
        //return promise back
        return axios.get(`http://localhost:8080/hello-world/path-variable/${name}`
        // ,
        //     { //adding additional parameter to send authorization header
        //         headers: {
        //             authorization: basicAuthHeader
        //         }
        //     }
         );
    }

}

//if any of the packages import this, they will get an instance of class
export default new HelloWorldService()