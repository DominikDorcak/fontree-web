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




function App() {
    return (
        <div className="App">
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Fontree</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/experiment">Experiment</Nav.Link>
                        <Nav.Link href="/about">O projekte</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <BrowserRouter>
                <Routes>
                    <Route index element={<HomeComponent/>}/>
                    <Route path="/experiment" element={<ExperimentComponent/>}/>
                    <Route path="/thankyou" element={<ThankComponent/>}/>
                    <Route path="/about" element={<AboutComponent/>}/>
                    <Route path="*" element={<NotFoundComponent/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
