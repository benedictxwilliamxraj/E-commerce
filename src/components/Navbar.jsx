import { Container, Nav, Navbar } from 'react-bootstrap';
import { BsCartFill } from 'react-icons/bs';

function HNavbar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">TeerexStore</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav>
            <Nav.Link href="#deets">Products</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              <BsCartFill size={25}/>
            </Nav.Link>
          </Nav>
      </Container>
    </Navbar>
  );
}

export default HNavbar;