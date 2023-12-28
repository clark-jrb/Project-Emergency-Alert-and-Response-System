import React, { useContext } from 'react'
import { Route, Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
    const { currentUser } = useContext(AuthContext)
    // const navigate = useNavigate()

    return (
        <Route
            {...rest}
            render={(props) => 
                !!currentUser ? (
                <RouteComponent {...props} />
                ) : (
                    <Navigate to="/login" /> // Redirect to the login page if not authenticated
                )
            }
        />
    )
}

export default PrivateRoute;
