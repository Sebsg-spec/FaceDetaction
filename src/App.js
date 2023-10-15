import React, {Component} from 'react';
import ParticlesBg from 'particles-bg'
import './App.css';

import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';






class App extends Component {
    constructor(){
      super();
      this.state = {
        input: '',
        imageURL: '',
        box: {},
        route: 'SignIn',
        isSignedIn: false
      } 
    }

    onRouteChange = (route) => {
      if(route === 'signout'){
      this.setState({isSignedIn: false})
      }else if(route === 'home'){
        this.setState({isSignedIn: true})
      }
      this.setState({route: route});

    }

    calculateFaceLocation = (data) =>{
      const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
      const image = document.getElementById('inputImage');
      const width = Number(image.width);
      const height = Number(image.height);
      return{
        leftcol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_Row * height,
        rightCol: width - (clarifaiFace.right_Col * width),
        bottomRow: height - (clarifaiFace.bottom_Row * height)
      }

    }
    displayFaceBox = (box) =>{
      this.setState({box: box});
    }

   clarifaiSetup = (imgURL) =>{
const PAT = 'b6125b8351cb49e99233233dbe732e69';
const USER_ID = 'sebsg';       
const APP_ID = 'Smart_Brain'; 
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
      fetch("https://api.clarifai.com/v2/models/face-detection/outputs", this.clarifaiSetup(this.state.input))
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(error => console.log('error', error));
    }

  render() {
   const {isSignedIn, imageURL, route, box} = this.state;
    return(
     <div className="App">
       <ParticlesBg type= "cobweb" color={["#FFFFFF"]}  bg={true} />
          
    <Navigation isSignedIn={isSignedIn} onRouteChange = {this.onRouteChange}/>
    {this.state.route === 'home'
      ?<div>  
          <Logo />
          <Rank />
          <ImageLinkForm
            onInputChange = {this.onInputChange} 
            onSubmit = {this.onSubmit}
            />
          <FaceRecognition box={box} imageURL={imageURL} /> 
          </div>
         
    : (
      route === 'SignIn'
      ?<SignIn onRouteChange={this.onRouteChange}/>
      :<Register onRouteChange={this.onRouteChange}/>
    )}
    </div>
    );
  }
}

export default App;
