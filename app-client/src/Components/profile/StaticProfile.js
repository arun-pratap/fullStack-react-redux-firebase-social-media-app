import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'

//materialUI
import { LocationOn, Link as LinkIcon, CalendarToday } from '@material-ui/icons'
import MuiLink from '@material-ui/core/Link'
import { withStyles, Paper, Typography } from '@material-ui/core'

//custom
import themeObject from '../../util/theme'


const styles = (theme) => ({
    ...themeObject,
    paper: {
        padding: 20,
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
        },
        '& .profile-image': {
            width: 200,
            height: 200,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%'
        },
        '& .profile-details': {
            textAlign: 'center',
            '& span, svg': {
                verticalAlign: 'middle'
            },
            '& a': {
                color: theme.palette.primary.main
            }
        },
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
        }
    }
})

function StaticProfile(props) {
    const { classes, profile: { handle, createdAt, imageUrl, bio, website, location } } = props
    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className='image-wrapper'>
                    <img src={imageUrl} alt='profile' className='profile-image' />
                </div>
                <hr />
                <div className='profile-details'>
                    <MuiLink component={Link} to={`/users/${handle}`} color='primary' variant='h5'>
                        @{handle}
                    </MuiLink>
                    <hr />
                    {bio && <Typography variant='body2'>{bio}</Typography>}
                    <hr />
                    {location && (
                        <>
                            <LocationOn color='primary' /> <span>{location}</span>
                            <hr />
                        </>
                    )}
                    {website && (
                        <>
                            <LinkIcon color='primary' />
                            <a href={website} target='_blank' rel='noopener noreferrer'>
                                {''}{website}
                            </a>
                            <hr />
                        </>
                    )}
                    <CalendarToday color='primary' />{' '}
                    <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                </div>
            </div>
        </Paper>
    )
}

StaticProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default (withStyles(styles)(StaticProfile))