import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import PropTypes from 'prop-types'
import MyButton from '../../util/MyButton'
import { Link } from 'react-router-dom'
import { withStyles, Dialog, DialogContent, CircularProgress, Grid, Typography } from '@material-ui/core'

import { Close as CloseIcon, Chat as ChatIcon } from '@material-ui/icons'
import { connect } from 'react-redux'
import { getScream } from '../../redux/actions/dataActions'
import { UnfoldMore } from '@material-ui/icons'
import LikeButton from './LikeButton'
import Comments from './Comments'
import themeObject from '../../util/theme'
import CommentForm from './CommentForm'

const styles = {
    ...themeObject,
    invisibleSeparator: {
        border: 'none',
        margin: 4
    },
    profileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    dialogContent: {
        padding: 20
    },
    closeButton: {
        position: 'absolute',
        left: '90%'
    },
    expandButton: {
        position: 'absolute',
        left: '90%'
    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    }
}

function ScreamDialog(props) {
    const { classes, scream: { screamId, body, createdAt, likeCount, comments, commentCount, userImage, userHandle }, UI: { loading }, getScream } = props

    const [state, setState] = useState({
        open: false,
        oldPath: '',
        newPath: ''
    })

    const handlOpen = () => {
        let oldPath = window.location.pathname
        const { userHandle, screamId } = props
        const newPath = `/users/${userHandle}/scream/${screamId}`


        window.history.pushState(null, null, newPath)

        setState({
            open: true,
            oldPath,
            newPath
        })
        getScream(props.screamId)
    }

    const handlClose = () => {
        window.history.pushState(null, null, state.oldPath)
        setState({
            open: false
        })
    }
    useEffect(() => {
        if (props.openDialog) {
            handlOpen()
        }
    }, [props.openDialog])

    const DialogMarkup = () => loading ? (
        <div className={classes.spinnerDiv}>
            <CircularProgress size={200} thickness={2} />
        </div>
    ) : (<>
        <Grid container spacing={10}>
            <Grid item sm={5}>
                <img src={userImage} alt='Profile' className={classes.profileImage} />
            </Grid>
            <Grid item sm={7}>
                <Typography component={Link} color='primary' variant='h5' to={`/users/${userHandle}`} >
                    @{userHandle}
                </Typography>
                <hr className={classes.invisibleSeparator} />
                <Typography variant='body2' color='textSecondary'>
                    {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                </Typography>
                <hr className={classes.invisibleSeparator} />
                <Typography variant='body1'>
                    {body}
                </Typography>
                <LikeButton screamId={screamId} />
                <span>{likeCount} Likes</span>
                <MyButton tip='comments'>
                    <ChatIcon color='primary' />
                </MyButton>
                <span>{commentCount} comments</span>
            </Grid>
        </Grid>
        <CommentForm screamId={screamId} />
        <Comments comments={comments} />
    </>
        )

    return (
        <>
            <MyButton onClick={handlOpen} tip='Expand Scream' tipClassName={classes.expandButton}>
                <UnfoldMore color='primary' />
            </MyButton>
            <Dialog open={state.open} onClose={handlClose} fullWidth maxWidth='sm'>
                <MyButton tip='Close' onClick={handlClose} tipClassName={classes.closeButton}>
                    <CloseIcon />
                </MyButton>
                <DialogContent className={classes.dialogContent}>
                    <DialogMarkup />
                </DialogContent>
            </Dialog>
        </>
    )
}
ScreamDialog.propTypes = {
    getScream: PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    scream: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStatesToProps = (state) => ({
    scream: state.data.scream,
    UI: state.UI
})

const mapActionsToProps = {
    getScream
}

export default connect(mapStatesToProps, mapActionsToProps)(withStyles(styles)(ScreamDialog))