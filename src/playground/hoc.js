import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info}</p>
    </div>
);

const withAdminWarning = (WrappedContent) => {
    return (props) => (
        <div>
            { props.isAdmin && <p>This info is only intended for administrators.</p>}
            <WrappedContent {...props}/>
        </div>
    )
}

const requireAuthentication = (WrappedContent) => {
    return (props) => (
        <div>
            <p>The following component is only visible if you're authenticated.</p>
            {props.isAuthenticated && <WrappedContent {...props}/>}
        </div>
    )
}

// const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info)


ReactDOM.render(<AuthInfo isAuthenticated={true} info="This is the info" />, document.getElementById('app'));