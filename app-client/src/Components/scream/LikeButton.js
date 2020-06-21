import React from 'react'
import MyButton from '../../util/MyButton'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { FavoriteBorder, Favorite as FavoriteIcon } from '@material-ui/icons'
import { connect } from 'react-redux'
import { likeScream, unlikeScream } from '../../redux/actions/dataActions'
import { withStyles } from '@material-ui/core'

const styles = {

}

const LikeButton = (props) => {
    const { user: { likes, authenticated }, screamId } = props
    const likedScream = () => {
        if (likes && likes.find(like => like.screamId === screamId))
            return true
        else
            return false
    }
    const likeScream = () => {
        props.likeScream(screamId)
    }
    const unlikeScream = () => {
        props.unlikeScream(screamId)
    }

    return (
        !authenticated ? (
            <Link to='/login'>
                <MyButton tip='Like'>
                    <FavoriteBorder color='primary' />
                </MyButton>
            </Link>
        ) : (
                likedScream() ? (
                    <MyButton tip='Undo like' onClick={unlikeScream}>
                        <FavoriteIcon color='primary' />
                    </MyButton>
                ) :
                    (
                        <MyButton tip='Like' onClick={likeScream}>
                            <FavoriteBorder color='primary' />
                        </MyButton>
                    )
            )
    )
}
LikeButton.propTypes = {
    user: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
    likeScream: PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
})

const mapActionsToProps = {
    likeScream,
    unlikeScream
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(LikeButton))