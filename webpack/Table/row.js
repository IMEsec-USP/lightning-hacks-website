import React from 'react'

const Row = ({ presenter, title }) => {
    if (!presenter && !title) {
        return null
    }
    return (
        <div class="home--table-row">
            <div class="home--table-cell">{ title }</div>
            <div class="home--table-cell">{ presenter }</div>
        </div>
    )
}

export default Row