import React from 'react'
import { Tooltip, IconButton } from '@material-ui/core'

const MyButton = ({ children, onClick, tip, btnClassName, tipClassName }) => (
    <>
        <Tooltip title={tip} className={tipClassName}>
            <IconButton onClick={onClick} className={btnClassName}>
                {children}
            </IconButton>
        </Tooltip>
    </>
)

export default MyButton