import React, { createContext, Component } from "react";

const AuthContext = createContext();

class AuthProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: !!localStorage.getItem("token"),
      userRole: localStorage.getItem("role"),
    };
  }

  login = (token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    this.setState({ isAuthenticated: true, userRole: role });
  };

  logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    this.setState({ isAuthenticated: false, userRole: null });
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          isAuthenticated: this.state.isAuthenticated,
          userRole: this.state.userRole,
          login: this.login,
          logout: this.logout,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export { AuthContext, AuthProvider };
