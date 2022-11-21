import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const baseUrl = "https://ms-discord-upy5mhs63a-rj.a.run.app";

  const [values, setValues] = useState({
    email: "jhoswe.castro@gmail.com",
    discordId: "948254878596202517",
  });

  const [token, setToken] = useState(null);
  const [logged, setLogged] = useState(false);

  const handleChange = (e) => {
    console.log(e);

    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const login = () => {
    axios
      .post(`${baseUrl}/auth/login`, values)
      .then((res) => {
        console.log(res);
        console.log(res.data.token);
        return res.data.token;
      })
      .then((token) => {
        setToken(token);
        setLogged(true);
      });
  };

  const submit = (e) => {
    e.preventDefault();
    login();
  };

  const Form = () => {
    return (
      <form className="form" onSubmit={submit}>
        <label htmlFor="email">Email: </label>
        <input
          type="text"
          name="email"
          value={values.email || ""}
          placeholder="Email"
          onChange={handleChange}
          id="email"
          required
        />

        <label htmlFor="id">DiscordID: </label>
        <input
          type="text"
          name="discordId"
          placeholder="DiscordId"
          value={values.discordId || ""}
          onChange={handleChange}
          id="id"
          required
        />

        <button type="submit">Login</button>
      </form>
    );
  };

  const Welcome = () => {
    const [checked, setChecked] = useState(false);
    const [data, setData] = useState(null);

    async function checkToken() {
      axios
        .get(`${baseUrl}/auth/check`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setData(res.data);
          setChecked(true);
          console.log(res);
        });
    }

    useEffect(() => {
      checkToken();
    }, []);

    return (
      <>
        {checked ? <div>Welcome {data.username}</div> : <div>Loading...</div>}
      </>
    );
  };

  return <div className="App">{logged ? <Welcome /> : <Form />}</div>;
}

export default App;
