import "./Ambassador.css";

const Ambassador = () => {
  const absData = [
    {
      id: "#0000001",
      img: "/images/model (12).jpg",
      fName: "emmanuel",
      lName: "abazu",
      email: "abazu99@gmail.com",
      models: "204",
      active: "154",
      pending: "52",
      earning: "45,600",
      balance: "45,600",
      payOut: "0.00",
    },
    {
      id: "#0000002",
      img: "/images/model (14).jpg",
      fName: " African",
      lName: "Models",
      email: " African99@gmail.com",
      models: "204",
      active: "154",
      pending: "52",
      earning: "45,600",
      balance: "45,600",
      payOut: "0.00",
    },
    {
      id: "#0000007",
      img: "/images/model (4).jpg",
      fName: "Olukokun",
      lName: "Abee",
      email: "olukokun99@gmail.com",
      models: "204",
      active: "154",
      pending: "52",
      earning: "45,600",
      balance: "45,600",
      payOut: "0.00",
    },
    {
      id: "#0000003",
      img: "/images/model (5).jpg",
      fName: "Emmanuel",
      lName: "Abazu",
      email: "abazu99@gmail.com",
      models: "204",
      active: "154",
      pending: "52",
      earning: "45,600",
      balance: "45,600",
      payOut: "0.00",
    },
    {
      id: "#0000004",
      img: "/images/model (20).jpg",
      fName: "Emmanuel",
      lName: "Abazu",
      email: "abazu99@gmail.com",
      models: "204",
      active: "154",
      pending: "52",
      earning: "45,600",
      balance: "45,600",
      payOut: "0.00",
    },
    {
      id: "#0000006",
      img: "/images/model (2).jpg",
      fName: "Olukokun",
      lName: "Abee",
      email: "olukokun99@gmail.com",
      models: "204",
      active: "154",
      pending: "52",
      earning: "45,600",
      balance: "45,600",
      payOut: "0.00",
    },
    {
      id: "#0000005",
      img: "/images/model (23).jpg",
      fName: " African",
      lName: "Models",
      email: " african99@gmail.com",
      models: "204",
      active: "154",
      pending: "52",
      earning: "45,600",
      balance: "45,600",
      payOut: "0.00",
    },
  ];

  return (
    <section className="Ambassador-section">
      <h1 className="Abs-title">Ambassadors</h1>
      <ul className="Abs-list">
        {absData.length !== 0 ? (
          absData.map((abs) => (
            <li key={abs.id} className="Abs">
              <section className="Abs-info-section">
                {/* abs img */}

                <div className="Abs-img-wrapper">
                  <img className="Abs-img" src={abs.img} alt="Ambassador-img" />
                </div>

                {/* abs details */}

                <div className="Abs-details">
                  <p className="Abs-name">{`${abs.fName} ${abs.lName}`}</p>
                  <em className="Abs-email">
                    {Array.from(abs.email).slice(0, 17)}
                    {Array.from(abs.email).length > 17 ? "..." : null}
                  </em>
                  <p>
                    <strong>Id: </strong>
                    {abs.id}
                  </p>
                </div>
              </section>

              {/* Abs stats */}

              <section className="Abs-stat-section">
                {/* top stats */}
                <div className="top-stats">
                  <div className="stat-wrapper">
                    <button className="stat-tag green-tag">Models</button>
                    <p className="stat">{abs.models}</p>
                  </div>
                  <div className="stat-wrapper">
                    <button className="stat-tag pink-tag">Active</button>
                    <p className="stat">{abs.active}</p>
                  </div>
                  <div className="stat-wrapper">
                    <button className="stat-tag black-tag">Pending</button>
                    <p className="stat">{abs.pending}</p>
                  </div>
                </div>

                {/* bottom stat */}

                <div className="bottom-stats">
                  <div className="stat-wrapper">
                    <button className="stat-tag pink-tag">Earning</button>
                    <p className="stat">{abs.earning}</p>
                  </div>
                  <div className="stat-wrapper">
                    <button className="stat-tag black-tag">Balance</button>
                    <p className="stat">{abs.balance}</p>
                  </div>
                  <div className="stat-wrapper  ">
                    <button className="stat-tag green-tag">PayOut</button>
                    <p className="stat">{abs.payOut}</p>
                  </div>
                </div>
              </section>
            </li>
          ))
        ) : (
          <div className="Abs-not-found">Ambassadors Not Found!</div>
        )}
      </ul>
    </section>
  );
};

export default Ambassador;
