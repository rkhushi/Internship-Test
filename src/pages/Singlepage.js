import React, { useEffect, useContext, useState } from "react";
// Context
import ShowsContext from "../context/shows/showsContext";

// Components

const Singlepage = ({ match }) => {
  const { getSingleShow, singleShow } = useContext(ShowsContext);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getSingleShow(match.params.id);

    // eslint-disable-next-line
  }, []);

  const removeTags = (text) => {
    if (text === null || text === "") {
      return false;
    } else {
      text = text.toString();
    }
    return text.replace(/(<([^>]+)>)/gi, "");
  };

  const handleBookTicket = () => {
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.elements.name.value;
    const age = e.target.elements.age.value;
    const email = e.target.elements.email.value;

    localStorage.setItem("userName", name);
    localStorage.setItem("age", age);
    localStorage.setItem("userEmail", email);

    window.alert(`Ticket booked successfully!\n\nMovie: ${singleShow.name}\nName: ${name}\nEmail: ${email}`);
  };

  return (
    <>
      <div className="singleshow">
        <img
          src={
            singleShow.image
              ? singleShow.image.medium
              : "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"
          }
          alt={singleShow.name}
        />
        <div className="singleshow__info">
          <h1>{singleShow.name}</h1>
          {singleShow.genres &&
            singleShow.genres.map((genre) => (
              <span key={genre} className="singleshow__genre">
                {genre}
              </span>
            ))}
          <button className="btn book-tckt" onClick={handleBookTicket}>
            Book Ticket
          </button>
          <p>
            <strong>Status:</strong> {singleShow.status && singleShow.status}
          </p>
          <p>
            <strong>Rating:</strong>{" "}
            {singleShow.rating ? singleShow.rating.average : "No rating"}
          </p>
          <p>
            <strong>Official Site:</strong>{" "}
            {singleShow.officialSite ? (
              <a
                href={singleShow.officialSite}
                target="_blank"
                rel="noreferrer"
              >
                {singleShow.officialSite}
              </a>
            ) : (
              "No official site"
            )}
          </p>
          <p>{singleShow.summary && removeTags(singleShow.summary)}</p>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit}>
          <h2>Book Ticket</h2>
          <p>Movie: {singleShow.name}</p>
          <input type="text" placeholder="Name" name="name" required/>
          <input type="text" placeholder="Age" name="age" required/>
          <input type="email" placeholder="Email" name="email" required />
          <button type="submit">Submit</button>
        </form>
      )}
    </>
  );
};

export default Singlepage;
