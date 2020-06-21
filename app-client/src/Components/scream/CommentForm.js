import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import themeObject from '../../util/theme'
import { submitComment } from '../../redux/actions/dataActions'
import { withStyles, Grid, TextField, Button } from '@material-ui/core'

const styles = {
    ...themeObject,
    button: {
        marginTop: '0px'
    }
}

function CommentForm(props) {
    const { classes, authenticated } = props

    const [state, setstate] = useState({
        body: '',
        errors: {}
    })

    useEffect(() => {
        if (props.UI.errors) {
            setstate({
                ...state,
                errors: props.UI.errors
            })
        }
    }, [props.UI.errors])

    const handleChange = (e) => {
        setstate({
            ...state,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        props.submitComment(props.screamId, { body: state.body })
        setstate({
            ...state,
            body: '',
            errors: {}
        })
    }

    const commentFormMarkup = authenticated ? (
        <Grid item sm={12} styles={{ textAlign: 'center' }}>
            <form onSubmit={handleSubmit}>
                <TextField name='body'
                    type='text'
                    label='Comment on scream'
                    error={state.errors.comment ? true : false}
                    helperText={state.errors.comment}
                    onChange={handleChange}
                    fullWidth
                    value={state.body}
                    className={classes.textField}
                />
                <Button type='submit' variant='contained' color='primary' className={classes.button}>
                    Submit
            </Button>
                <hr className={classes.invisibleSeparator} />
                <hr className={classes.invisibleSeparator} />
                <hr className={classes.invisibleSeparator} />
                <hr className={classes.invisibleSeparator} />
                <hr className={classes.invisibleSeparator} />
            </form>
        </Grid>
    ) : (
            null
        )

    return (
        commentFormMarkup
    )
}

CommentForm.propTypes = {
    submitComment: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
    authenticated: PropTypes.bool.isRequired
}

const mapStatesToProps = (state) => ({
    UI: state.UI,
    authenticated: state.user.authenticated
})

export default connect(mapStatesToProps, { submitComment })(withStyles(styles)(CommentForm))