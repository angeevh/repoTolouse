import { Component } from "react";
import Link from "next/link";
import App from "../../components/App";
import Header from "../../components/Header";
import Error from "../../components/Error";
import { signUp, redirectIfAuthenticated } from "../../lib/auth";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }
  static getInitialProps(ctx) {
    redirectIfAuthenticated(ctx);

    return {};
  }

  render() {
    const { url } = this.props;
    const { error } = this.state;
    return (
      <App>
        <Header authenticated={false} pathname={url.pathname} />
        {error && <Error message={error} />}
        <form onSubmit={this.handleSubmit}>
          <h1>Register</h1>
          <input type="text" placeholder="Nombres" maxLength="100" name="firstName" />
          <input type="text" placeholder="Apellidos" maxLength="100" name="lastName" />
          <input type="number" placeholder="Identificación" maxLength="20" name="identification" />
          <input type="date" placeholder="Fecha de Nacimiento" name="birth_date" />
          <input type="email" placeholder="Email" name="email" />
          <input type="password" placeholder="Contraseña" name="password" />
          <span>{`Contraseña, mínimo 5 carácteres`}</span>
          <button type="submit">Registrarse</button>
          <style jsx>{`
            form {
              padding-bottom: 20px;
              margin-bottom: 20px;
              text-align: center;
            }
            h1 {
              font-size: 20px;
            }
            span {
              font-size: 10px;
              color: red;
            }
            input,
            button {
              display: block;
              margin: auto;
              margin-top: 5px;
              margin-bottom: 5px;
            }
          `}</style>
        </form>
      </App>
    );
  }

  handleSubmit = async e => {
    e.preventDefault();

    const firstName = e.target.elements.firstName.value;
    const lastName = e.target.elements.lastName.value;
    const identification = e.target.elements.identification.value;
    const birth_date = e.target.elements.birth_date.value;
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    

    const error = await signUp(firstName,lastName, identification, birth_date, email, password);

    if (error) {
      this.setState({
        error
      });
      return false;
    }
  };
}