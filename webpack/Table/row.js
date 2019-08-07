import React from 'react'

const Row = ({ presenter, title }) => (
    <div class="home--table-row">
        <div class="home--table-cell">{ presenter }</div>
        <div class="home--table-cell">{ title }</div>
    </div>
)

export default Row