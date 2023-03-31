import { useState, useEffect, useRef } from "react";
import { UserProps } from "./types/User";
import axios from "axios";
import "./App.css";

function App() {
  const [user, setUser] = useState<UserProps>();
  const [backgroundColor, setBackgroundColor] = useState("#000000");

  const handleChangeBackground = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    setBackgroundColor(randomColor);
  };

  const getUser = async () => {
    try {
      const response = await axios.get(
        "https://api.github.com/users/gustavoresendes"
      );
      const data = response.data;
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="App">
      <div className="bg-card" style={{ backgroundColor }}>
        <div className="card">
          <header>
            <div>
              <img src="#" alt="" />
            </div>
            <h3>{user?.login}</h3>
          </header>

          <div className="photo">
            <img src={user?.avatar_url} alt="" />
          </div>

          <ul className="infos">
            <li>
              <img src="./src/assets/followers.svg" />
              {user?.followers} Seguidores
            </li>
            <li>
              <img src="./src/assets/following.svg" />
              {user?.following} Seguindo
            </li>
            <li>
              <img src="./src/assets/repository.svg" />
              {user?.repos_url.length} Repositórios
            </li>
            <li>
              <img src="./src/assets/company.svg" />
              {user?.company ?? "Não encontrado"}
            </li>
            <li>
              <img src="./src/assets/location.svg" />
              {user?.location}
            </li>
          </ul>

          <footer>
            <img src="./src/assets/logo.svg" alt="" /> <span>ROCKETCARD</span>
          </footer>
        </div>
      </div>

      <div className="customization">
        <h4>Customizar Rocketcard</h4>
        <button onClick={handleChangeBackground}>Gerar background</button>
        <div className="copy">
          <button>Copiar</button>
        </div>
      </div>
    </div>
  );
}

export default App;
