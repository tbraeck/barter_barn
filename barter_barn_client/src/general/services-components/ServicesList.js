import React from 'react';
import { Link } from 'react-router-dom';

const ServicesList = ({ forumServices }) => {
  if (!forumServices) {
    return <div>Loading...</div>;
  }

  const serviceItems = forumServices.map((service) => (
    <div key={service.id} className="goods-card">
      <ul>
        <li>
          <h1>
            <Link to={`/services/${service.id}`}>
              <div className="good-title">{service.title}</div>
              <div className="good-description">{service.description}</div>
            </Link>
          </h1>
        </li>
      </ul>
    </div>
  ));

  return (
    <div className="forum-page ">
      <div className="forumList">
        <div className="forums">
          <h1>SERVICES</h1>
        </div>
        <div className="forumLinks">
          <ul>{serviceItems}</ul>
        </div>
      </div>
    </div>
  );
};

export default ServicesList;
