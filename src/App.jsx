import { useEffect, useRef, useState } from 'react';
import './App.css';
import MainComponent from './components/MainComponent';
import SideNav from './components/SideNav';
import TopNav from './components/TopNav';
import html2canvas from 'html2canvas';

function App() {

  const initialInputs = () => {
    const data = localStorage.getItem('userInput')
    return data ? JSON.parse(data) : {
      name: 'Abhishek',
      userName: 'abhishekmanhar',
      profilePic: 'https://media.licdn.com/dms/image/D4D35AQHObL72CVgT-A/profile-framedphoto-shrink_200_200/0/1651159241584?e=1690887600&v=beta&t=exIu-XwSQKGgd5JBV_2fSvGu9uWRvdHyJi318ZcKp1s',
      socialPlatform: 1,
      content: `Got a love that can't be contained? Say it with a Nalgene Custom Bottle! 😍 Upload photos and graphics, or choose from our sweet stash to create one-of-a-kind gifts they'll cherish. Use code LUVYA for 20% off when you order two or more: http://bit.ly/NalgeneCustomTW`,
      selectBg: 1,
      rounded: 10
    }
  }
  const [userDetails, setUserDetails] = useState(initialInputs())
  useEffect(() => {
    localStorage.setItem('userInput', JSON.stringify(userDetails))
  }, [userDetails])

  const divRef = useRef(null);

  const downloadImage = () => {
    if (divRef.current) {
      html2canvas(divRef.current)
        .then((canvas) => {
          const dataURL = canvas.toDataURL('image/png');
          const link = document.createElement('a');
          link.download = '@frontendedy.png';
          link.href = dataURL;
          link.click();
        })
        .catch((error) => {
          console.error('Error converting div to image:', error);
        });
    }
  };

  return (
    <div className="App">
      <TopNav downloadImage={downloadImage} />
      <SideNav setUserDetails={setUserDetails} userDetails={userDetails} />
      <MainComponent userDetails={userDetails} divRef={divRef} />
    </div>
  );
}

export default App;
