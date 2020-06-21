import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'

import Scream from '../Components/scream/Scream'
import Profile from '../Components/profile/Profile'

import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { getScreams } from '../redux/actions/dataActions'
import ScreamSkeleton from '../util/ScreamSkeleton'


function Home(props) {
    // const fetchScreams = () => {
    //     Axios.get('https://us-central1-spaceit-af177.cloudfunctions.net/api/screams')
    //         .then((res) => {
    //             console.log(res.data)
    //             setScreams(res.data)
    //         })
    //         .catch((err) => {
    //             console.log(err.response)
    //         })
    // }

    useEffect(() => {
        props.getScreams()
    }, [props.getScreams])

    const { screams, loading } = props.data
    const recentScreamsMarkup =
        !loading ? screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
            : (<ScreamSkeleton />)

    return (
        <div>
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
                    {recentScreamsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile />
                </Grid>
            </Grid>
        </div>
    )
}
Home.propTypes = {
    getScreams: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStatesToProps = (state) => ({
    data: state.data
})

export default connect(mapStatesToProps, { getScreams })(Home)