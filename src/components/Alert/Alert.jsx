import React from 'react';
import './alert.css';

const Alert =  () => {

  return (
    <div className="alert-dialog">
      <h2 className="alert-dialog__heading">Before we get started</h2>
      <p className="alert-dialog__subheading">This weather app needs to identify your location.</p>
      <p className="alert-dialog__description">Do you agree to send over some annonymous location data so that we can show weather in your area?</p>
      <div className="alert-dialog__actions">
        {/* {<button className="alert-dialog__btn" onClick={ () => {console.log('clicked')} } autoFocus>Disagree</button>} */}
        <button className="alert-dialog__btn" onClick={ () => {console.log('clicked')} } autoFocus>Agree</button>
      </div>
    </div>
  )
};

export default Alert;