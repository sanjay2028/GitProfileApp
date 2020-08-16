import React from 'react';
import  {AppModal, Flash}  from '../common';
const RepoRow = ({item, onShowModal}) => {  
  let {id, name, commits, _id, language } = item;
  return (
    <tr key={id}><td>{id}</td><td>{name}</td><td>{language}</td><td>{commits.length} Commit(s)</td><td><button onClick={(event) => onShowModal(event) } id={_id} className="btn btn-primary">Show Commits</button></td></tr>
  )
}


const AppBody = (props) => {        
    const {repositories, onShowModal, inTransit} = props;    
    let output;
    
    if(inTransit === true){
      output = <tr><td colSpan="5">{repositories}</td></tr>
    } else {      
      if(repositories.length){
        output = repositories.map((item, index) => {
            return <RepoRow item={item} onShowModal={onShowModal} key={`rep#${index}`} />
        })
      } else {
        output = <tr><td colSpan="5">No repositories found for this user</td></tr>
      }      
    }    

    return(
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
          <div className="row"><div className="col-sm-12"><Flash /></div></div>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
            
            <h1 className="h2">Github Board</h1>            
          </div>

          <h2>Repositories</h2>
          <div className="table-responsive">
            <table className="table table-striped table-sm">
              <thead><tr><th>#</th><th>Name</th><th>Language</th><th>Commits</th><th>Action</th></tr></thead>
              <tbody>{output}</tbody>
            </table>
          </div>
          <AppModal />
        </main>
    )
}

export default AppBody;