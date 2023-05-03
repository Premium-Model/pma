function MsgItem({ item, setActive }) {
  const { avatar, Name, chat } = item;
  return (
    <li onClick={() => setActive("chat")} className="message">
      <div>
        <img className="msg-avater" src={avatar} alt="" />
      </div>

      <div>
        <h3 className="msg-title">{Name}</h3>
        <p className="msg-text">{chat[chat.length - 1].text}</p>
      </div>
    </li>
  );
}

export default MsgItem;
