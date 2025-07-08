import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavigationBar = ({ user, onLoggedOut, searchQuery, setSearchQuery }) => {
  const isLoggedIn = !!user;

  return (
    <Navbar bg="light" expand="lg" className="mb-3">
      <Container>
        <Navbar.Brand as={Link} to="/">
          MyFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto nav-spaced">
            {isLoggedIn && (
              <>
                <Nav.Item className="me-4">
                  <Nav.Link as={Link} to="/">
                    Home
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item className="me-4">
                  <Nav.Link as={Link} to={`/users/${user.Username}`}>
                    Profile
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item className="me-4">
                  <Nav.Link
                    as={Link}
                    to="https://github.com/DanPasqua-CF/myFlix-client"
                  >
                    GitHub
                  </Nav.Link>
                </Nav.Item>
              </>
            )}
          </Nav>

          {isLoggedIn && (
            <>
              <Form className="d-flex me-3" style={{ maxWidth: "400px" }}>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-3"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Form>

              <Button variant="danger" onClick={onLoggedOut}>
                Logout
              </Button>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
