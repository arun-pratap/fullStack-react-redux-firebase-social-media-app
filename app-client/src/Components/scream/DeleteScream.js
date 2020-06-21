import React, { useState } from 'react'

import { withStyles, Button, Dialog, DialogTitle, DialogActions } from '@material-ui/core'

import PropTypes from 'prop-types'
import MyButton from '../../util/MyButton'
import { DeleteOutline } from '@material-ui/icons'
import { connect } from 'react-redux'

import { deleteScream } from '../../redux/actions/dataActions'

const styles = {
    deleteButton: {
        position: 'absolute',
        left: '80%'
    }
}

function DeleteScream(props) {
    const { classes, screamId } = props
    const [open, setOpen] = useState({
        open: false
    })

    const handleOpen = () => {
        setOpen({
            open: true
        })
    }

    const handleClose = () => {
        setOpen({
            open: false
        })
    }
    const deleteScream = () => {
        props.deleteScream(screamId)
        setOpen({
            open: false
        })
    }

    return (
        <>
            <MyButton tip='Delete Scream' onClick={handleOpen} btnClassName={classes.deleteButton}>
                <DeleteOutline color='secondary' />
            </MyButton>
            <Dialog open={open.open} onClose={handleClose} fullWidth maxWidth='sm'>
                <DialogTitle>
                    Are you sure you want to delete this scream ?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} color='primary'>Cancel</Button>
                    <Button onClick={deleteScream} color='secondary'>Delete</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
DeleteScream.propTypes = {
    deleteScream: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired
}

export default connect(null, { deleteScream })(withStyles(styles)(DeleteScream))
