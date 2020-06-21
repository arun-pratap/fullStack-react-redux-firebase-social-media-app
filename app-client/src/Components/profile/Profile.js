import React from 'react'
import PropTypes from 'prop-types'
import { Link, Redirect, Route } from 'react-router-dom'
import dayjs from 'dayjs'

//redux
import { connect } from 'react-redux'
import { logoutUser, uploadImage } from '../../redux/actions/userActions'
import themeObject from '../../util/theme'
import ProfileSkeleton from '../../util/ProfileSkeleton'

//materialUI
import { withStyles, Paper, Typography, Button, IconButton, Tooltip } from '@material-ui/core'
import MuiLink from '@material-ui/core/Link'
import { LocationOn, Link as LinkIcon, Edit as EditIcon, CalendarToday, KeyboardReturn } from '@material-ui/icons'

//custom
import EditDetails from './EditDetails'
import login from '../../pages/login'


const styles = (theme) => ({
    ...themeObject,
    paper: {
        padding: 20,
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
            '& button': {
                position: 'absolute',
                top: '80%',
                left: '70%'
            }
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
        },
        '& svg.button': {
            '&:hover': {
                cursor: 'pointer'
            }
        }
    },
    buttons: {
        textAlign: 'center',
        '& a': {
            margin: '20px 10px'
        }
    }
})


function Profile(props) {

    const handleImageChange = (e) => {
        const image = e.target.files[0]
        const formData = new FormData()
        formData.append('image', image, image.name)
        props.uploadImage(formData)
    }
    const handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput')
        fileInput.click()
    }
    const handleLogout = () => {
        const newPath = `/login`
        window.location.pathname = newPath
        props.logoutUser()
    }
    const { classes, user: {
        credentials: { handle, createdAt, imageUrl, bio, website, location },
        loading,
        authenticated }
    } = props

    const profileMarkUp = !loading ?
        (authenticated ? (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className='image-wrapper'>
                        <img src={imageUrl} alt='profile' className='profile-image' />
                        <input type='file' id='imageInput' hidden='hidden' onChange={handleImageChange} />
                        <Tooltip title='Edit Profile Picture' placement='bottom'>
                            <IconButton onClick={handleEditPicture} className='button'>
                                <EditIcon color='primary' />
                            </IconButton>
                        </Tooltip>
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
                        <hr />
                        <Tooltip title='Logout' placement='bottom'>
                            <IconButton onClick={handleLogout}>
                                <KeyboardReturn color='primary' />
                            </IconButton>
                        </Tooltip>
                        <EditDetails />
                    </div>
                </div>
            </Paper>
        ) : (
                <Paper className={classes.paper}>
                    <Typography variant='body2' align='center'>
                        No profile found, please login again
                    </Typography>
                    <div className={classes.buttons}>
                        <Button variant='contained' color='primary' component={Link} to='/login'>
                            Login
                        </Button>
                        <Button variant='contained' color='secondary' component={Link} to='/signup'>
                            Signup
                        </Button>
                    </div>

                </Paper>
            ))
        : (<ProfileSkeleton />)

    return profileMarkUp
}

const mapStateToProps = (state) => ({
    user: state.user,
    credentials: state.user.credentials
})
Profile.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}
const mapActionsToProps = {
    logoutUser,
    uploadImage
}
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile))