import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

//redux
import { connect } from 'react-redux'

//materialUI
import MyButton from '../../util/MyButton'
import { AppBar, Toolbar, Button } from '@material-ui/core'
import { Home as HomeIcon, Notifications } from '@material-ui/icons'

//custom
import PostScream from '../scream/PostScream'

function Navbar(props) {
    const { authenticated } = props
    return (
        <div>
            <AppBar position='fixed'>
                <Toolbar className='nav-container'>
                    {authenticated ? (<>
                        <PostScream />
                        <Link to='/'>
                            <MyButton tip='Home'>
                                <HomeIcon />
                            </MyButton>
                        </Link>
                        <MyButton tip='Notifications is not working'>
                            <Notifications />
                        </MyButton>
                    </>
                    ) : (
                            <>
                                <Button color='inherit' component={Link} to='/login'>Login</Button>
                                <Button color='inherit' component={Link} to='/'>Home</Button>
                                <Button color='inherit' component={Link} to='/signup'>Signup</Button>
                            </>
                        )}
                </Toolbar>
            </AppBar>
        </div>
    )
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
}

const mapStatesToProp = (state) => ({
    authenticated: state.user.authenticated
})

export default connect(mapStatesToProp)(Navbar)
