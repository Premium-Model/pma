import { useState, useEffect } from "react";
import { ambassadorsRequest } from "../../../../redux/requestMethod";
import axios from "axios";
const AmbItem = ({
  amb,
  formatMoney,
  setToggleWithdrawal,
  setCurrent,
  setMessage,
  setToggleMsg,
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
  };

  const fullName = `${amb.firstName.trim()} ${amb.lastName.trim()}`;
  const imageUrl = ambassadorImages[fullName] || amb.picture;
  const [ambassadors, setAmbassadors] = useState([]);

  // // Delete Ambassador Function
  // const deleteAmbassador = async () => {
  //   try {
  //     if (!amb._id) {
  //       console.error("Ambassador ID is missing!");
  //       return;
  //     }

  //     await ambassadorsRequest.delete(`/admin/amb-delete/${amb._id}`);
  //     setMessage("Ambassador deleted successfully!");
  //   } catch (err) {
  //     console.error("Error deleting ambassador:", err);
  //     setMessage("Failed to delete ambassador!");
  //   } finally {
  //     setToggleMsg(true);
  //   }
  // };
  const Tokens =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOWRjNzc2YWFmY2QzOGQ2N2IxZTJmNyIsImFhaSI6InBtYS8yMC0yMi9hZG1pbiIsImlhdCI6MTc0Mjk4MTExMywiZXhwIjoxNzQzMDAyNzEzfQ.qTbOKcyGord29r9-8O5ZakoHeLZ7SGohPp7jXGPA8JY";
  const API_URL = "http://localhost:8501/api/v2/admin";

  // Function delete ambas with local host api
  const deleteAmbassador = async (ambassadorId, Tokens) => {
    try {
      const res = await axios.delete(`${API_URL}/amb-delete/${ambassadorId}`, {
        headers: {
          token: `Bearer ${Tokens}`,
          "Content-Type": "application/json",
        },
      });
      alert("Ambassador deleted successfully!");
      return res.data;
    } catch (error) {
      console.error(
        "Error deleting ambassador:",
        error.response?.data || error
      );
      alert("Failed to delete ambassador!");
    }
  };

  // Fetch all ambassadors
  useEffect(() => {
    const fetchAmbassadors = async () => {
      try {
        const res = await axios.get(`${API_URL}/ambassadors/all`, {
          headers: { token: `Bearer ${Tokens}` },
        });
        setAmbassadors(res.data.models);
      } catch (error) {
        console.error("Error fetching ambassadors:", error);
      }
    };
    fetchAmbassadors();
  }, [Tokens]);

  // Handle Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this ambassador?")) {
      await deleteAmbassador(id, Tokens);
      setAmbassadors((prevAmbassadors) =>
        prevAmbassadors.filter((amb) => amb._id !== id)
      );
    }
  };
  return (
    <li key={amb.code} className="Abs">
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

          <button onClick={deleteAmbassador} className="delete-btn">
            Delete Ambassador
          </button>
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
              }}
              className="stat-tag green-tag"
            >
              PayOut
            </button>
            <p className="stat">{formatMoney(amb.payout)}</p>
          </div>
        </div>
      </section>

      {ambassadors.length > 0 ? (
        <ul>
          {ambassadors.map((amb) => (
            <li key={amb._id}>
              <p>
                {amb.firstName} {amb.lastName} - {amb.email}
              </p>
              <button onClick={() => handleDelete(amb._id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No ambassadors found.</p>
      )}
    </li>
  );
};

export default AmbItem;
