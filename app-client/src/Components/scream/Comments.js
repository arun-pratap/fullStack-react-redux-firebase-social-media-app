import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles, Grid, Typography } from '@material-ui/core'
import { connect } from 'react-redux'
import dayjs from 'dayjs'
import themeObject from '../../util/theme'


const styles = {
    ...themeObject,
    invisibleSeparator: {
        border: 'none',
        margin: 4
    },
    commentImage: {
        maxWidth: '100%',
        height: 100,
        objectFit: 'cover',
        borderRadius: '50%'
    },
    commentData: {
        marginLeft: 20
    }
}

function Comments(props) {
    const { comments, classes } = props
    return (
        <Grid container>
            {comments.map((comment, index) => {
                const { body, createdAt, userImage, userHandle } = comment
                return (
                    <React.Fragment key={createdAt}>
                        <Grid item sm={12}>
                            <Grid container>
                                <Grid item sm={2}>
                                    <img src={userImage} alt='comment' className={classes.commentImage} />
                                </Grid>
                                <Grid item sm={9}>
                                    <div className={classes.commentData}>
                                        <Typography variant='h5'
                                            component={Link}
                                            to={`/users/${userHandle}`}
                                            color='primary'>
                                            {userHandle}
                                        </Typography>
                                        <Typography variant='body2' color='textSecondary'>
                                            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                                        </Typography>
                                        <hr className={classes.invisibleSeparator} />
                                        <Typography variant='body1'>{body}</Typography>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                        {
                            index !== comments.length - 1 && (
                                <hr className={classes.visibleSeparator} />
                            )
                        }
                    </React.Fragment>
                )
            })}
        </Grid>
    )
}


export default withStyles(styles)(Comments)