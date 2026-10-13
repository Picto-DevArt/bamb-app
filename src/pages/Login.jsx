
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import "../styles/login.css";

function Login() {
  const [accountType, setAccountType] = useState("cliente");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const canSubmit =
    email.trim() !== "" && password.length > 0;

  function handleSubmit(event) {
    event.preventDefault();

    if (!canSubmit) return;

    alert(
      `Formulario listo para ingresar como ${accountType}. Próximamente conectaremos la autenticación.`
    );
  }

  return (
    <>
      <Header />

      <main className="login">
        <Link to="/" className="login__back">
          ← Regresar a la Home
        </Link>

        <section className="login__content">
          <h1>INGRESAR</h1>

          <p className="login__description">
            Selecciona tu tipo de cuenta
          </p>

          <div
            className="login__selector"
            role="group"
            aria-label="Tipo de cuenta"
          >
            <button
              type="button"
              className={`login__option ${
                accountType === "cliente"
                  ? "login__option--active"
                  : ""
              }`}
              aria-pressed={accountType === "cliente"}
              onClick={() => setAccountType("cliente")}
            >
              <span className="login__option-icon" aria-hidden="true">
                ♙
              </span>
              Cliente
            </button>

            <button
              type="button"
              className={`login__option ${
                accountType === "empresa"
                  ? "login__option--active"
                  : ""
              }`}
              aria-pressed={accountType === "empresa"}
              onClick={() => setAccountType("empresa")}
            >
              <span className="login__option-icon" aria-hidden="true">
                ▦
              </span>
              Empresa
            </button>
          </div>

          <form className="login__form" onSubmit={handleSubmit}>
            <div className="login__field">
              <label htmlFor="loginEmail">
                Correo electrónico
              </label>
              <input
                id="loginEmail"
                type="email"
                autoComplete="email"
                placeholder="Ingresa tu correo"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className="login__field">
              <label htmlFor="loginPassword">
                Contraseña
              </label>
              <input
                id="loginPassword"
                type="password"
                autoComplete="current-password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                required
              />
            </div>

            <div className="login__forgot">
              <button
                type="button"
                onClick={() =>
                  alert("Próximamente habilitaremos la recuperación de contraseña.")
                }
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <button
              type="submit"
              className="login__submit"
              disabled={!canSubmit}
            >
              INGRESAR COMO {accountType.toUpperCase()}
            </button>
          </form>

          <p className="login__register">
            ¿No tienes cuenta?
          </p>

          <div className="login__register-links">
            <Link to="/registro/cliente">
              Crear cuenta de cliente
            </Link>
            <span aria-hidden="true">·</span>
            <Link to="/registro/empresa">
              Crear cuenta de empresa
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

export default Login;

