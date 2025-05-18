import React,{ useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // «· Õﬁﬁ „‰ ⁄œ„ ÊÃÊœ ‰›” «·≈Ì„Ì· »«·›⁄·
    const check = await fetch(`http://localhost:3001/users?email=${email}`);
    const existing = await check.json();
    if (existing.length > 0) {
      alert("Already Signed!");
      return;
    }

    // ≈‰‘«¡ „” Œœ„ ÃœÌœ
    const newUser = {
      username,
      email,
      password
    };

    await fetch("http://localhost:3001/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser)
    });

    alert("Signed Up Successfully.");
    navigate("/login");
  };

 return (
   <center>
    <form onSubmit={handleRegister}>
      <h2>Sign Up New Account</h2>
      <input
        type="text"
        placeholder="User Name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <br />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
       />

      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <br />

      <button type="submit">Signup</button>
   </form>
    </center>
  );
}
