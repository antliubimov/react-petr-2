import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Col, Row, Container, Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from "../errorMessage";
import {CharacterPage, BooksPage, HousesPage, BooksItem } from "../pages";

export default class App extends Component {

  state = {
    showRandomChar: true,
    error: false
  }

  componentDidCatch() {
    this.setState({
      error: true
    })
  }

  toggleRandomChar = () => {
    this.setState((state) => {
      return { showRandomChar: !state.showRandomChar }
    })
  }

  render() {
    const char = this.state.showRandomChar ? <RandomChar/> : null;

    if (this.state.error) {
      return <ErrorMessage/>
    }

    return (
        <Router>
          <div className='app'>
            <Container>
              <Header/>
            </Container>
            <Container>
              <Row>
                <Col lg={{size: 5, offset: 0}}>
                  {char}
                  <Button color="primary" style={{marginBottom: 30 + 'px'}} onClick={this.toggleRandomChar}>Toggle Random
                    Character</Button>
                </Col>
              </Row>

              <Route path="/characters" component={CharacterPage}/>
              <Route path="/houses" component={HousesPage}/>
              <Route path="/books" exact component={BooksPage}/>
              <Route path="/books/:id" render={
                ({match}) => {
                  const {id} = match.params;
                  return <BooksItem bookId={id} />
                }
              }/>


            </Container>
          </div>
        </Router>
    );
  }
};
