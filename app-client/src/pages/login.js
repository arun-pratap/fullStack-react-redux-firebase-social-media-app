import React, { useState, useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { Grid, Typography, TextField, Button, CircularProgress } from '@material-ui/core'
import Axios from 'axios'
import { Link } from 'react-router-dom'

//redux
import { loginUser } from '../redux/actions/userActions'
import { connect } from 'react-redux'

const styles = {
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

function Login(props) {
    const [input, setInput] = useState({
        email: '',
        password: '',
        errors: {}
    })


    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
        console.log(input, input.email)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setInput({
            ...input,
        })
        const userData = {
            email: input.email,
            password: input.password,
        }
        props.loginUser(userData, props.history)
    }

    const { classes, UI: { loading } } = props

    return (
        <Grid container className={classes.form}>
            <Grid item sm />
            <Grid item sm>
                <h3>AppImage</h3>
                <Typography variant='h4' className={classes.pageTitle}>
                    Login
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
                        Login
                        {loading && (
                            <CircularProgress size={30} className={classes.progress} />
                        )}
                    </Button>
                    <br />
                    <small>dont have an account ? Signup <Link to='/signup'>here</Link></small>
                </form>
            </Grid>
            <Grid item sm />
        </Grid>
    )
}
Login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

const mapActionsToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Login))