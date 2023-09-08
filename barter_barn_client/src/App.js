
import React from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container, Row, Col} from 'react-bootstrap';
import puppies from './data'
import './App.css';
import FullPageContainer from './FullPageContainer';
import Header from './components/Header';
import Footer from './Footer';
import Confirmation from './components/Confirmation';
import PuppyCard from './components/PuppyCard';

function App() {
  return (
    <div>
      <FullPageContainer>
      <p>App is Here</p>
        <Header/>
        <Container>
          <Row>
            <p>Hello There</p>
          </Row>
        </Container>
      </FullPageContainer>
    </div>
    
  );
}

export default App;
