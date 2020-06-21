import React, { useState, useEffect } from 'react'

//redux
import { connect } from 'react-redux'
import { editUserDetails } from '../../redux/actions/userActions'

//materialUI
import { withStyles, Tooltip, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'

//custom
import themeObject from '../../util/theme'


const styles = {
    ...themeObject,
    button: {
        float: 'right'
    }
}

function EditDetails(props) {
    const { classes } = props
    const [details, setDetails] = useState({
        bio: '',
        website: '',
        location: '',
        open: false
    })
    const mapCredentialsToState = (credentials) => {
        setDetails({
            ...details,
            bio: credentials.bio ? credentials.bio : '',
            website: credentials.website ? credentials.website : '',
            location: credentials.location ? credentials.location : ''
        })
    }

    const handleOpen = () => {
        setDetails({
            ...details,
            bio: props.credentials.bio ? props.credentials.bio : '',
            website: props.credentials.website ? props.credentials.website : '',
            location: props.credentials.location ? props.credentials.location : '',
            open: true
        })
    }

    const handleClose = () => {
        setDetails({
            ...details,
            open: false
        })
    }

    useEffect(() => {
        mapCredentialsToState(props.credentials)
    }, [props.credentials])

    const handleChange = (e) => {
        setDetails({
            ...details,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = () => {
        const userDetails = {
            bio: details.bio,
            website: details.website,
            location: details.location,
        }
        props.editUserDetails(userDetails)
        handleClose()
    }
    console.log(details)
    return (
        <>
            <Tooltip title='Edit Details' placement='bottom'>
                <IconButton onClick={() => handleOpen()} className={''}>
                    <EditIcon color='primary' />
                </IconButton>
            </Tooltip>
            <Dialog open={details.open} fullWidth maxWidth='sm'>
                <DialogTitle>Edit your details</DialogTitle>
                <DialogContent>
                    <form>
                        <TextField name='bio'
                            type='text'
                            label='Bio'
                            multiline
                            rows='3'
                            placeholder='A Short Bio'
                            value={details.bio}
                            onChange={handleChange}
                            fullWidth />

                        <TextField name='website'
                            type='text'
                            label='Website'
                            placeholder='Your website url'
                            value={details.website}
                            onChange={handleChange}
                            fullWidth />

                        <TextField name='location'
                            type='text'
                            label='Location'
                            placeholder='Where you live'
                            value={details.location}
                            onChange={handleChange}
                            fullWidth />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='primary'>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color='primary'>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}


const mapStatesToProps = (state) => ({
    credentials: state.user.credentials
})
export default connect(mapStatesToProps, { editUserDetails })(withStyles(styles)(EditDetails))
