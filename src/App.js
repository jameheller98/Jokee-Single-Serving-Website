import logo from "./logo.svg";
import logoUser from "./logoUser.png";
import "./App.css";
import { jokes } from "./dataJoke";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["jokes"]);
  const [prensentJoke, setPrensentJoke] = useState(null);

  useEffect(() => {
    //Init cookie
    setCookie("jokes", jokes);
    //Init prensent joke
    setPrensentJoke({ joke: jokes[0], index: 0 });

    return () => {
      //remove cookie
      removeCookie("jokes");
      //unmount state prensentJoke
      setPrensentJoke(null);
    };
  }, [setCookie, removeCookie, setPrensentJoke]);

  //Function to add vote to database
  function addVoteJoke(vote, index) {
    //Index of joke need handle
    const jokeIndex = prensentJoke.index;
    //Create new object of that joke
    const newJokeVote = { ...cookies["jokes"][jokeIndex], vote };
    //Create new array contain joke changed
    const newJokes = [
      ...cookies["jokes"].slice(0, jokeIndex),
      newJokeVote,
      ...cookies["jokes"].slice(jokeIndex + 1),
    ];

    //Set data changed
    setCookie("jokes", newJokes);
    //Set next prensent joke to show for user
    setPrensentJoke({
      joke: { ...cookies["jokes"][index + 1] },
      index: index + 1,
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="react" width="100" height="100" />
        <div className="App-user">
          <span className="App-user__name">
            <small className="App-user__name--small">Designed by</small>
            <br />
            NHATuan
          </span>
          <img
            src={logoUser}
            className="App-user__logo"
            alt="react"
            width="60"
            height="60"
          />
        </div>
      </header>
      <main className="App-body">
        <section className="App-banner">
          <div className="App-banner--group">
            <h1 className="App-banner--title">
              A joke a day keeps the doctor away
            </h1>
            <small>If joke wrong way, your teeth have to pay. (Serious)</small>
          </div>
        </section>
        {
          //Check if state prensentJoke have property joke that it's not contains any properties inside
          prensentJoke?.joke && Object.keys(prensentJoke?.joke).length !== 0 ? (
            <>
              <section className="App-main">
                <span className="App-content">
                  {prensentJoke?.joke.content}
                </span>
              </section>
              <section className="App-button-group">
                <button
                  className="App-button App-button-left"
                  onClick={() => addVoteJoke(true, prensentJoke.index)}
                >
                  This is funny!
                </button>
                <button
                  className="App-button App-button-right"
                  onClick={() => addVoteJoke(false, prensentJoke.index)}
                >
                  This is not funny.
                </button>
              </section>
            </>
          ) : (
            <section className="App-main">
              `&quot;`That`&apos;`s all the jokes for today! Come back another
              day!`&quot;`
            </section>
          )
        }
      </main>
      <hr className="App-horizontal" />
      <footer className="App-footer">
        Copyright @ {new Date().getFullYear(Date.now())}
      </footer>
    </div>
  );
}

export default App;
