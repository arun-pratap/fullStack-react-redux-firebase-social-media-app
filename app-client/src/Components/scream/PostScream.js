import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Add as AddIcon, Close as CloseIcon } from '@material-ui/icons'

import MyButton from '../../util/MyButton'
import { postScream } from '../../redux/actions/dataActions'
import { withStyles, Dialog, DialogTitle, DialogContent, TextField, Button, CircularProgress } from '@material-ui/core'
import themeObject from '../../util/theme'

const styles = {
    ...themeObject,
    submitButton: {
        position: 'relative'
    },
    progressSpinner: {
        position: 'absolute'
    },
    closeButton: {
        position: 'absolute',
        left: '90%',
        top: '10%'
    }
}

function PostScream(props) {
    const [state, setState] = useState({
        open: false,
        body: '',
        errors: {}
    })
    const { classes, UI: { errors, loading }, postScream } = props

    const handleOpen = () => {
        setState({
            ...state,
            open: true
        })
    }

    const handleClose = () => {
        setState({
            ...state,
            open: false,
            errors: {}
        })
    }

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        postScream({ body: state.body })
    }

    useEffect(() => {
        if (errors !== null)
            setState({
                ...state,
                errors: errors
            })
        if (!errors && !loading) {
            setState({
                ...state,
                body: ''
            })
            handleClose()
        }
    }, [errors, loading])

    return (
        <>
            <MyButton onClick={handleOpen} tip='Post a Scream'>
                <AddIcon />
            </MyButton>
            <Dialog open={state.open} onClose={handleClose} fullWidth maxWidth='sm'>
                <MyButton tip='close' onClick={handleClose} tipClassName={classes.closeButton}>
                    <CloseIcon />
                </MyButton>
                <DialogTitle >Post a new scream</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField name='body'
                            type='text'
                            label='Scream'
                            multiline
                            rows='3'
                            placeholder='Scream here'
                            error={state.errors.body ? true : false}
                            helperText={state.errors.body}
                            className={classes.textField}
                            onChange={handleChange}
                            fullWidth />
                        <hr className={classes.invisibleSeparator} />
                        <hr className={classes.invisibleSeparator} />
                        <Button type='submit' variant='contained' color='primary' disabled={loading}
                            className={classes.submitButton}>
                            Submit
            {loading && (
                                <CircularProgress size={30} className={classes.progressSpinner} />
                            )}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}
PostScream.propTypes = {
    postScream: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
}
const mapStatesToProps = (state) => ({
    UI: state.UI
})

export default connect(mapStatesToProps, { postScream })(withStyles(styles)(PostScream))