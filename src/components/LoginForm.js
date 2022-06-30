import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthServiceProvider";
import Button from "./Button";
import Form from "./Form";
import TextInput from "./TextInput";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [loading, setLoadiing] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoadiing(true);
      await login(email, password);
      navigate(from, { location: true });
    } catch (err) {
      console.log(err);
      setError("Failed to login");
      setLoadiing(false);
    }
  }

  return (
    <Form style={{ height: "330px" }} action="#" onSubmit={handleSubmit}>
      {error && <span className="error">{error}</span>}
      <TextInput
        type="email"
        placeholder="Enter email"
        icon="alternate_email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        required
      />
      <TextInput
        type="password"
        placeholder="Enter password"
        icon="lock"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        required
      />
      <Button disabled={loading} type="submit">
        Submit Now
      </Button>
      <div className="info">
        Don't have an account? <Link to="/signup">Signup</Link> instead.
      </div>
    </Form>
  );
}
