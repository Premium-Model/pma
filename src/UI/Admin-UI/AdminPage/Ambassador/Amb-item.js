const AmbItem = ({
  amb,
  formatMoney,
  setToggleWithdrawal,
  setCurrent,
  deleteAmbassador,
}) => {
  const ambassadorImages = {
    "Safiya Idris":
      "https://firebasestorage.googleapis.com/v0/b/pmapp-dynamic.appspot.com/o/Ambassador%2FWhatsApp%20Image%202025-03-18%20at%2009.45.31_4f1f6358.jpg?alt=media&token=382e1b96-965c-4ee6-a710-084814b42501",
    "Nchang Ngoh":
      "https://firebasestorage.googleapis.com/v0/b/pmapp-dynamic.appspot.com/o/Ambassador%2FIMG-20250318-WA0008.jpg?alt=media&token=7b4af62a-d863-44ce-bf14-e51692f43f07",
    "Helen Abiodun":
      "https://firebasestorage.googleapis.com/v0/b/pmapp-dynamic.appspot.com/o/Ambassador%2FIMG-20250318-WA0011.jpg?alt=media&token=822188da-3e64-4331-ba2a-a1ca4ebb3a22",
    "Adjara Wango":
      "https://firebasestorage.googleapis.com/v0/b/pmapp-dynamic.appspot.com/o/Ambassador%2FIMG-20250318-WA0007.jpg?alt=media&token=09d7b04b-3849-4cb8-a9a7-3dfcfd9115ec2",
    "Cynthia Maduekwe":
      "https://firebasestorage.googleapis.com/v0/b/pmapp-dynamic.appspot.com/o/Ambassador%2FIMG-20250318-WA0010.jpg?alt=media&token=ad47f2e2-7967-4b93-aa26-cc31d89cd05d",
    "Chioma Williams":
      "https://firebasestorage.googleapis.com/v0/b/pmapp-dynamic.appspot.com/o/Ambassador%2FIMG-20250318-WA0009.jpg?alt=media&token=9129bb8d-4640-4d91-9818-98591dd95173",

    "Rachael Okafor":
      "https://firebasestorage.googleapis.com/v0/b/pmapp-dynamic.appspot.com/o/Ambassador%2FWhatsApp%20Image%202025-03-27%20at%2015.11.27_b15b013e.jpg?alt=media&token=ef0cc9c6-bc32-4c19-b96d-d79cd13767c7",

    "Vhee James":
      "https://firebasestorage.googleapis.com/v0/b/pmapp-dynamic.appspot.com/o/Ambassador%2FWhatsApp%20Image%202025-03-27%20at%2015.11.28_9bf0c097.jpg?alt=media&token=774c56d1-ead0-499a-b788-ee616d90a3e9",

    "Nnamdi Onoh":
      "https://firebasestorage.googleapis.com/v0/b/pmapp-dynamic.appspot.com/o/Ambassador%2FWhatsApp%20Image%202025-03-27%20at%2015.11.28_c7e30173.jpg?alt=media&token=b0853f20-a16d-47a4-bd7e-c04ca61a3284",
  };

  const fullName = `${amb.firstName.trim()} ${amb.lastName.trim()}`;
  const imageUrl = ambassadorImages[fullName] || amb.picture;

  return (
    <li className="Abs">
      <section className="Abs-info-section">
        {/* amb img */}
        <div className="Abs-img-wrapper">
          <img className="Abs-img" src={imageUrl} alt="Ambassador-img" />
        </div>

        {/* amb details */}
        <div className="Abs-details">
          <p className="Abs-name">{`${amb.firstName} ${amb.lastName}`}</p>
          <em className="Abs-email">
            {Array.from(amb.email).slice(0, 17)}
            {Array.from(amb.email).length > 17 ? "..." : null}
          </em>
          <p>
            <strong>Id: </strong>
            {amb.code}
          </p>

          <button onClick={deleteAmbassador} className="btn-shadow amb-delete">
            Delete Ambassador
          </button>
        </div>
      </section>

      {/* Abs stats */}
      <section className="Abs-stat-section">
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

        <div className="bottom-stats">
          <div className="stat-wrapper">
            <button className="stat-tag pink-tag">Earning</button>
            <p className="stat">{formatMoney(amb.totalEarning)}</p>
          </div>
          <div className="stat-wrapper">
            <button className="stat-tag black-tag">Balance</button>
            <p className="stat">{formatMoney(amb.availableBal)}</p>
          </div>
          <div className="stat-wrapper">
            <button
              onClick={() => {
                setToggleWithdrawal(true);
                setCurrent(amb);
              }}
              className="stat-tag green-tag"
            >
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
