const AmbItem = ({
  amb,
  newId,
  setNewId,
  formatMoney,
  setToggleWithdrawal,
  setCurrent,
  uploadFile,
}) => {
  return (
    <li key={amb.code} className="Abs">
      <section className="Abs-info-section">
        {/* amb img */}

        <div className="Abs-img-wrapper">
          <img className="Abs-img" src={amb.picture} alt="Ambassador-img" />
          <div className="edit-Abs-img-wrapper">
            <div
              onClick={(e) => {
                setNewId(amb._id);
              }}
              className="edit-Abs-img">
              <label htmlFor="edit-photo">+</label>
            </div>
            <input
              id="edit-photo"
              type="file"
              onChange={(e) => {
                uploadFile(e.target.files[0], newId, "picture");
              }}
              hidden
            />
          </div>
        </div>

        {/* amb details */}

        <div className="Abs-details">
          <p className="Abs-name">{`${amb.firstName} ${amb.lastName}`}</p>
          <p className="Abs-email">
            {Array.from(amb.email).slice(0, 17)}
            {Array.from(amb.email).length > 17 ? "..." : null}
          </p>
          <p>
            <strong>Code: </strong>
            {amb.code}
          </p>
        </div>
      </section>
      {/* Abs stats */}
      <section className="Abs-stat-section">
        {/* top stats */}
        <div className="top-stats">
          <div className="stat-wrapper">
            <button className="stat-tag green-tag">Models</button>
            <p className="stat">{amb.models.length}</p>
          </div>
          <div className="stat-wrapper">
            <button className="stat-tag pink-tag">Active</button>
            <p className="stat">{amb.activeModels}</p>
          </div>
          <div className="stat-wrapper">
            <button className="stat-tag black-tag">Pending</button>
            <p className="stat">{amb.pendingModels}</p>
          </div>
        </div>

        {/* bottom stat */}

        <div className="bottom-stats">
          <div className="stat-wrapper">
            <button className="stat-tag pink-tag">Earning</button>
            <p className="stat">{formatMoney(amb.totalEarning)}</p>
          </div>
          <div className="stat-wrapper">
            <button className="stat-tag black-tag">Balance</button>
            <p className="stat">{formatMoney(amb.availableBal)}</p>
          </div>
          <div className="stat-wrapper  ">
            <button
              onClick={() => {
                setToggleWithdrawal(true);
                setCurrent(amb);
                console.log(amb._id);
              }}
              className="stat-tag green-tag">
              PayOut
            </button>
            <p className="stat">{formatMoney(amb.payout)}</p>
          </div>
        </div>
      </section>
    </li>
  );
};

export default AmbItem;
