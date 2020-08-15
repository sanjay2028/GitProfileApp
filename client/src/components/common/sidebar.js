import React, {Fragment} from 'react';

const UserCard = ({user}) => {  
  const {avatar_url, name, repos_url, login, bio, registration_date} = user
  return (
    <Fragment>
      <li className="nav-item"> Name :  {name} </li>
      <li className="nav-item"> Github Username :  {login} </li>
      <li className="nav-item"> Member Since :  {registration_date} </li>
      <li className="nav-item"> <a href={repos_url}> Check My Repos on GitHub</a> </li>
      <li className="nav-item"> About {name}:   </li>
      <li>{bio}</li>
      </Fragment>
    )
  
}


const AppSidebar = ({user}) => {    
    
  
  
  let output = !!user ? <UserCard user={user} /> : ""
    return(
        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
          <div className="sidebar-sticky">
            <div className="row mt-5 pl-2">
              <div className="col-sm-12">
                <ul className="nav flex-column">
                  <li className="nav-item">                  
                      <span data-feather="home"></span>
                      User Information 
                  </li>
                  {output}
              </ul>            
              </div> 
            </div>            
          </div>
        </nav>
    )
}

export default AppSidebar;

