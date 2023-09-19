import React from 'react'

const ServicesList = ({allServices}) => {
  console.log(allServices)

  const serviceItems = allServices.map((service) => (
    <div key={service.id}>
        <h1>
            <Link to={`/services/${service.id}`}>
                {service.title}
            </Link>
        </h1>
    </div>
  return (
    <div className='forum-page'>
    <div className='forumList'>
        <div className='forums'>
        <h1>SERVICES </h1>
        </div>
        <div className='forumLinks'>
        {serviceItems}
        </div>
    </div>
</div>
  )
}

export default ServicesList
