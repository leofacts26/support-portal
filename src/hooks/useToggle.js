import React, { useState } from 'react'

const useToggle = () => {

    const [toggleStatus, setToggleStatus] = useState(0)

    const onHandleToggleStatus = () => {
        setToggleStatus((prevState) => (prevState === 0 ? 1 : 0))
    }

    return { onHandleToggleStatus, toggleStatus }
}

export default useToggle