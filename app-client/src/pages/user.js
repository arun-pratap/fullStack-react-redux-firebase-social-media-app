import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Axios from 'axios'

//redux
import { connect } from 'react-redux'
import { getUser } from '../redux/actions/dataActions'

//materialUI
import { withStyles, Grid } from '@material-ui/core'


//custom
import themeObject from '../util/theme'
import StaticProfile from '../Components/profile/StaticProfile'
import ScreamSkeleton from '../util/ScreamSkeleton'
import ProfileSkeleton from '../util/ProfileSkeleton'
import Scream from '../Components/scream/Scream'

const styles = {
    ...themeObject,
}

function User(props) {
    const [state, setstate] = useState({
        profile: null,
        screamIdParam: null,
    })

    const handle = props.match.params.handle
    const screamId = props.match.params.screamId
    const getUser = props.getUser

    useEffect(() => {
        if (screamId) {
            setstate({
                ...state,
                screamIdParam: screamId
            })
        }
        getUser(handle)
        Axios.get(`https://us-central1-spaceit-af177.cloudfunctions.net/api/user/${handle}`)
            .then((res) => {
                setstate({
                    ...state,
                    profile: res.data.user
                })
            })
            .catch((err) => console.log(err))
    }, [screamId, handle])
    const { screams, loading } = props.data
    const ScreamsMarkup = loading ? (<ScreamSkeleton />
    ) : (screams === null) ? (
        <p>No Screams from this user</p>
    ) : !state.screamIdParam ? (
        screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
    ) : (
                    screams.map((scream) => {
                        if (scream.screamId !== state.screamIdParam)
                            return <Scream key={scream.screamId} scream={scream} />
                        else return <Scream key={scream.screamId} scream={scream} openDialog />
                    })
                )

    console.log(screams)
    return (
        <Grid container spacing={10}>
            <Grid item sm={8} xs={12}>
                {ScreamsMarkup}
            </Grid>
            <Grid item sm={4} xs={12}>
                {
                    state.profile === null ? (
                        <ProfileSkeleton />
                    ) : (
                            <StaticProfile profile={state.profile} />
                        )
                }

            </Grid>
        </Grid>
    )
}

User.propTypes = {
    getUser: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStatesToProps = (state) => ({
    data: state.data
})

export default connect(mapStatesToProps, { getUser })(withStyles(styles)(User))