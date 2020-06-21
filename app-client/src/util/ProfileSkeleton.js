import React from 'react'
import NoImg from '../images/no-img.png'
import PropTypes from 'prop-types'
import { withStyles, Paper } from '@material-ui/core'
import { LocationOn, Link as LinkIcon, CalendarToday } from '@material-ui/icons'
import themeObject from './theme'

const styles = {
    ...themeObject,
    handle: {
        height: 20,
        backgroundColor: '#00bcd4',
        width: 60,
        margin: '7px auto'
    },
    fullLine: {
        height: 15,
        backgroundColor: 'rgb(0,0,0,0.6)',
        width: '100%',
        marginBottom: 10
    },
    halfLine: {
        height: 15,
        backgroundColor: 'rgb(0,0,0,0.6)',
        width: '50%',
        margin: 'auto',
        marginBottom: 10
    }
}

function ProfileSkeleton(props) {
    const { classes } = props
    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className='image-wrapper'>
                    <img src={NoImg} alt='profile' className='profile-image' />
                </div>
                <hr />
                <div className='profile-details'>
                    <div className={classes.handle} />
                    <hr />
                    <div className={classes.fullLine} />
                    <div className={classes.halfLine} />
                    <hr />
                    <LocationOn color='primary' /><span> Location</span>
                    <hr />
                    <LinkIcon color='primary' /><span> Website url</span>
                    <hr />
                    <CalendarToday color='primary' /><span> Joined date</span>
                </div>
            </div>
        </Paper>
    )
}

ProfileSkeleton.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ProfileSkeleton)
