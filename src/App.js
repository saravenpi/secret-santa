import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [members, setMembers] = useState([]);
  const [relations, setRelations] = useState([]);

  const addMember = (e) => {
    e.preventDefault();

    if (name.length === 0) return;
    var newMemberName = name;

    if (members.includes(newMemberName)) {
      var number = 2;
      var modifiedName = newMemberName + number;

      while (members.includes(modifiedName))
        modifiedName = newMemberName + ++number;
      newMemberName = modifiedName;
    }
    setMembers([...members, newMemberName]);
    setName("");
  };

  const resetMembers = () => {
    setMembers([]);
    setRelations([]);
  };
  const randomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const removeElement = (array, element) => {
    var index = array.indexOf(element);
    if (index > -1) {
      array.splice(index, 1);
    }
    return array;
  };

  const secretSanta = () => {
    var includedMembers = [];
    var relations = [];
    var receivers = [...members];
    var safePlay = false;

    if (members.length < 2) return alert("You need at least 2 members");

    for (let i = 0; i < members.length; i++) {
      safePlay = false;
      if (receivers.includes(members[i])) {
        safePlay = true;
        removeElement(receivers, members[i]);
      }
      var randomPosition = randomNumber(0, receivers.length - 1);
      console.log(`length: ${receivers.length}, random: ${randomPosition}`);
      console.log(`receivers: ${receivers}`);
      var newReceiver = receivers[randomPosition];

      relations.push([members[i], newReceiver]);
      includedMembers.push(receivers[randomPosition]);
      receivers = removeElement(receivers, newReceiver);
      if (safePlay) receivers.push(members[i]);
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
        {members.length > 0 ? (
          <div>
            <button onClick={resetMembers}>
              <i class="fa-solid fa-rotate-right"></i> Refresh List
            </button>
            <br></br>
            <br></br>
          </div>
        ) : (
          ""
        )}
        <button onClick={secretSanta}>🎅 Generate Secret Santa</button>
        <div className="secret-santa">
          <div className="title">Secret Santa list:</div>
          <div className="relations">
            {relations.length === 0 ? (
              <p>List not generated yet</p>
            ) : (
              relations.map((relation, index) => (
                <div className="relation" key={index}>
                  <div className="member">{relation[0]}</div>
                  <div className="relation-text">gives to</div>
                  <div className="member">{relation[1]}</div>
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
