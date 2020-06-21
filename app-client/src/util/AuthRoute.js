import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

function AuthRoute({ component: Component, authenticated, ...rest }) {
    return (
        <Route {...rest} render={(props) => authenticated === true ? <Redirect to='/login' /> : <Component {...props} />} />
    )
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
})

AuthRoute.propTypes = {
    user: PropTypes.object
}

export default connect(mapStateToProps)(AuthRoute)