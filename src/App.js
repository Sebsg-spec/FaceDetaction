import React, {Component} from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import ParticlesBg from 'particles-bg'
import './App.css';





class App extends Component {
    constructor(){
      super();
      this.state = {
        input: '',
        imageURL: ''
      } 
    }
   clarifaiSetup = (imgURL) =>{
const PAT = '7812b426133243fc976dc1bbbb4be9d6';
const USER_ID = 'sebsg';       
const APP_ID = 'Smart_Brain';
// const MODEL_ID = 'face-detection';
// const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';    
const IMAGE_URL = imgURL;

const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": IMAGE_URL
                }
            }
        }
    ]
});

const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
    },
    body: raw
};

return requestOptions;

    }

    onInputChange = (event) =>{
        this.setState({input: event.target.value});
    }
    onSubmit = () =>{ 
      fetch("https://api.clarifai.com/v2/models/face-detection/outputs", this.clarifaiSetup)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    }

  render() {
    return(
     <div className="App">
       <ParticlesBg type= "cobweb" color={["#FFFFFF"]}  bg={true} />
          
    <Navigation />
    <Logo />
    <Rank />
    <ImageLinkForm
     onInputChange = {this.onInputChange} 
     onSubmit = {this.onSubmit}
      />
    <FaceRecognition imageURL={this.state.input} /> 
    </div>
    );
  }
}

export default App;
