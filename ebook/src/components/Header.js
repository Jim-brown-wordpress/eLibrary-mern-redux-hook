
import * as React from 'react';
import {Navbar , Container , Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {logoutUser} from '../redux/actions/userAction';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';

const Header = ({user , logoutUser}) => {
  const history = useHistory();
    return (
        <header className="App-header">
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand>
                <Link to = '/'  className="nav-link">
                  Home
                </Link>
              </Navbar.Brand>
              {!user.isAuthenticated?
                <Nav className="justify-content-end">
                  <Nav>
                    <Link to={'/signin'} className="nav-link">
                      SignIn
                    </Link>
                  </Nav>

                  <Nav>
                    <Link to={'/register'} className="nav-link">
                      Register
                    </Link>
                  </Nav>
                </Nav>
                :
                <Nav className="justify-content-end">
                  <Nav>
                    <Link to={'/signin'} className="nav-link" onClick={() =>logoutUser(history)}>
                      Logout
                    </Link>

                    <Link to={'/profile'} className="nav-link">
                      Profile
                    </Link>
                  </Nav>
                  {user.user.roll == 'admin'?
                    <Nav>
                      <Link to={'/register'} className="nav-link">
                        Register
                      </Link>
                      <Link to={'/manage'} className="nav-link">
                        Manage
                      </Link>
                    </Nav>:
                    ""
                  }
                </Nav>
              }
            </Container>
          </Navbar>
        </header>
    );
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps , {logoutUser})(Header);
