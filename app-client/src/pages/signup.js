import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

//redux
import { connect } from 'react-redux'
import { signupUser, logoutUser } from '../redux/actions/userActions'

//materialUI
import { withStyles, Grid, Typography, TextField, Button, CircularProgress } from '@material-ui/core'

//custom
import themeObject from '../util/theme'

const styles = {
    ...themeObject,
    form: {
        textAlign: 'center',
    },
    image: {
        margin: '20px auto 20px auto'
    },
    pageTitle: {
        margin: '20px auto 5px auto'
    },
    textField: {
        margin: '20px auto 10px auto'
    },
    button: {
        marginTop: 20
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem',
        marginTop: 10
    }
}

function Signup(props) {
    const { classes, UI: { loading } } = props
    const [input, setInput] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        handle: '',
        errors: {}
    })

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        console.log(input, input.email)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setInput({
            ...input,
            loading: true,
        })
        const newUserData = {
            email: input.email,
            password: input.password,
            confirmPassword: input.confirmPassword,
            handle: input.handle
        }
        props.signupUser(newUserData, props.history)
    }


    return (
        <Grid container className={classes.form}>
            <Grid item sm />
            <Grid item sm>
                <h3>AppImage</h3>
                <Typography variant='h3' className={classes.pageTitle}>
                    Signup
                </Typography>
                <form noValidate onSubmit={handleSubmit}>
                    <TextField className={classes.textField}
                        id='email'
                        name='email'
                        label='Email'
                        type='email'
                        helperText={props.UI.errors && props.UI.errors.email}
                        error={props.UI.errors && props.UI.errors.email ? true : false}
                        value={input.email}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField className={classes.textField}
                        id='password'
                        name='password'
                        label='Password'
                        type='password'
                        helperText={props.UI.errors && props.UI.errors.password}
                        error={props.UI.errors && props.UI.errors.password ? true : false}
                        value={input.password}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField className={classes.textField}
                        id='confirmPassword'
                        name='confirmPassword'
                        type='password'
                        label='Confirm Password'
                        helperText={props.UI.errors && props.UI.errors.confirmPassword}
                        error={props.UI.errors && props.UI.errors.confirmPassword ? true : false}
                        value={input.confirmPassword}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField className={classes.textField}
                        id='handle'
                        name='handle'
                        type='handle'
                        label='Handle'
                        helperText={props.UI.errors && props.UI.errors.handle}
                        error={props.UI.errors && props.UI.errors.handle ? true : false}
                        value={input.handle}
                        onChange={handleChange}
                        fullWidth
                    />
                    {props.UI.errors && props.UI.errors.general &&
                        (
                            <Typography variant='body2' className={classes.customError}>
                                {props.UI.errors.general}
                            </Typography>
                        )}
                    <Button className={classes.button}
                        type='submit'
                        variant='contained'
                        color='primary'
                    >
                        Signup
                        {loading && (
                            <CircularProgress size={30} className={classes.progress} />
                        )}
                    </Button>
                    <br />
                    <small>Already have an account ? Login <Link to='/login'>here</Link></small>
                </form>
            </Grid>
            <Grid item sm />
        </Grid>
    )
}

Signup.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})


export default connect(mapStateToProps, { signupUser })(withStyles(styles)(Signup))