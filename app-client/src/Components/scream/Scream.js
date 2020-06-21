import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import MyButton from '../../util/MyButton'
import PropTypes from 'prop-types'


import { Chat as ChatIcon } from '@material-ui/icons'
import { connect } from 'react-redux'
import DeleteScream from './DeleteScream'
import ScreamDialog from './ScreamDialog'
import LikeButton from './LikeButton'

import themeObject from '../../util/theme'

const styles = {
    ...themeObject,
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20,
    },
    image: {
        minWidth: 200,
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    },
}

dayjs.extend(relativeTime)

function Scream(props) {
    const { classes, scream: {
        body,
        createdAt,
        userImage,
        userHandle,
        screamId,
        likeCount,
        commentCount
    }, user: {
        likes,
        authenticated,
        credentials: {
            handle
        }
    } } = props


    const deleteButton = authenticated && userHandle === handle ? (
        <DeleteScream screamId={screamId} />
    ) : (
            null
        )

    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.image}
                image={userImage}
                title='Profile image' />
            <CardContent className={classes.content} >
                <Typography variant='h5'
                    component={Link}
                    to={`/users/${userHandle}`}
                    color='primary'>
                    {userHandle}
                </Typography>
                {deleteButton}
                <Typography variant='body2'
                    color='textSecondary'>
                    {dayjs(createdAt).fromNow()}
                </Typography>
                <Typography variant='body1'>
                    {body}
                </Typography>
                <LikeButton screamId={screamId} />
                <span>{likeCount} Likes</span>
                <MyButton tip='comments'>
                    <ChatIcon color='primary' />
                </MyButton>
                <span>{commentCount} comments</span>
            </CardContent>
            <ScreamDialog screamId={screamId} userHandle={userHandle} openDialog={props.openDialog} />
        </Card>
    )
}

Scream.propTypes = {
    user: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool
}

const mapStateToProps = (state) => ({
    user: state.user,
})
console.log(withStyles(styles)(ScreamDialog))

export default connect(mapStateToProps)(withStyles(styles)(Scream))