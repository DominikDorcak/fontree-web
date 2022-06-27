import React from 'react';
import './App.css';
import ExperimentComponent from "./components/ExperimentComponent";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Nav, Navbar} from "react-bootstrap";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomeComponent from "./components/HomeComponent";
import ThankComponent from "./components/ThankComponent";
import NotFoundComponent from "./components/NotFoundComponent";
import AboutComponent from "./components/AboutComponent";
import FontQuestions from "./components/FontQuestions";
import ExperimentGuide from "./components/ExperimentGuide";
import ImageLoader from "./components/ImageLoader";
import Footer from './components/Footer';




function App() {
    return (
        <div className="App">
            <Navbar bg="dark" variant="dark">
                <Container className={"navbar__container"}>
                    <Navbar.Brand href="/">
                        <ImageLoader path={'logo-white-green.svg'} alt={'logo'} class={"brand-logo"}/>
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Domov</Nav.Link>
                        <Nav.Link href="/experiment">Experiment</Nav.Link>
                        <Nav.Link href="/about">O projekte</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <BrowserRouter>
                <Routes>
                    <Route index element={<HomeComponent/>}/>
                    <Route path="/experiment" element={<ExperimentGuide/>}/>
                    <Route path="/experiment-entry" element={<ExperimentComponent/>}/>
                    <Route path="/thankyou" element={<ThankComponent/>}/>
                    <Route path="/about" element={<AboutComponent/>}/>
                    {/*ostranene na live(bolo potrebne na naplnanie datasetu)*/}
                    <Route path="/font-questions">
                        <Route path=":id" element={<FontQuestions />}></Route>
                    </Route>
                    <Route path="*" element={<NotFoundComponent/>}/>
                </Routes>
            </BrowserRouter>
            <Footer></Footer>
        </div>
    );
}

export default App;
