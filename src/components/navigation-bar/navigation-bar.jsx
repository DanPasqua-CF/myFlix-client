import { Navbar, Container, Nav, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavigationBar = ({ user, onLoggedOut, searchQuery, setSearchQuery }) => {
  return (
    <Navbar bg="light" expand="lg" className="mb-3">
      <Container>
        <Navbar.Brand as={Link} to="/">
          MyFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto nav-spaced">
            {user && (
              <Nav.Item className="me-4">
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
              </Nav.Item>
            )}

            {user && (
              <Nav.Item className="me-4">
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
              </Nav.Item>
            )}

            {user && (
              <Nav.Item className="me-4">
                <Nav.Link
                  as={Link}
                  to="https://github.com/DanPasqua-CF/myFlix-client"
                >
                  GitHub
                </Nav.Link>
              </Nav.Item>
            )}

            {user && (
              <Nav.Item className="me-4">
                <Nav.Link
                  as={Link}
                  to="https://movie-project-flix-fb8ed415ea47.herokuapp.com/movies"
                >
                  Heroku
                </Nav.Link>
              </Nav.Item>
            )}
          </Nav>
          {user && (
            <Form className="d-flex me-3" style={{ maxWidth: "300px" }}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-3"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Form>
          )}

          {user && (
            <Button variant="outline-danger" onClick={onLoggedOut}>
              Logout
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
