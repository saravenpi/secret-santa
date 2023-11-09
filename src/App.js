import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [members, setMembers] = useState([]);
  const [relations, setRelations] = useState([]);

  const addMember = (e) => {
    e.preventDefault();
    if (name.length > 0) {
      setMembers([...members, name]);
      setName("");
    }
  };

  const randomNumber = (min, max) => {
    const random = Math.random() * (max - min) + min;
    return Math.floor(random);
  };
  const secretSanta = () => {
    var receivers = [];
    var relations = [];

    for (let i = 0; i < members.length; i++) {
      var notInList = true;
      while (notInList) {
        var randomPosition = randomNumber(0, members.length);
        var newReceiver = members[randomPosition];
        if (randomPosition !== i && !receivers.includes(newReceiver)) {
          notInList = false;
          relations.push([i, randomPosition]);
          receivers.push(members[randomPosition]);
        }
      }
    }
    setRelations(relations);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="big-title">🎄 Secret Santa Generator 🎁</div>
        <div className="game">
          <form onSubmit={addMember}>
            <input
              type="text"
              value={name}
              placeholder="Member name"
              onChange={(e) => setName(e.target.value)}
            />
            <button type="submit">Add Member</button>
          </form>
        </div>
        <div className="title">Member list:</div>
        <div className="members">
          {members.length === 0 ? (
            <p>Add members to generate the Secret Santa</p>
          ) : (
            members.map((member, index) => (
              <div className="member" key={index}>
                {member}
              </div>
            ))
          )}
        </div>
        <button onClick={secretSanta}>🎅 Generate Secret Santa</button>
        <div className="secret-santa">
          <div className="title">Secret Santa list:</div>
          <div className="relations">
            {relations.length === 0 ? (
              <p>List not generated yet</p>
            ) : (
              relations.map((relation) => (
                <div className="relation">
                  <div className="member" key={relation[0]}>
                    {members[relation[0]]}
                  </div>
                  <div className="relation-text">gives to</div>
                  <div className="member" key={relation[1]}>
                    {members[relation[1]]}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </header>
      <footer>
        Made with 💚 by <a href="https://github.com/saravenpi">saravenpi</a>
      </footer>
    </div>
  );
}

export default App;
