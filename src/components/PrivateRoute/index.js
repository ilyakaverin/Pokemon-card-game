import { Route, Redirect } from 'react-router-dom';
const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route
        {...rest}
        render={ props => 
            localStorage.getItem('idToken') ?
                <Component /> :
                <Redirect to='/' />
            }
         />
    )
}
export default PrivateRoute;