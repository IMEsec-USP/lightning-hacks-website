import React from 'react'
import Row from './row'

const Table = ({ hacks, nextDay }) => {
    const rows = hacks.map(({presenter, title}) =>
                    <Row presenter={presenter} title={title} />)

    return (
        <>
        <div class="home--next-event-date">
            <p style={{textTransform: 'capitalize'}}>{ nextDay }</p>
        </div>
        <div class="home--table">
            <div class="home--table-row home--table-header">
                <div class="home--table-cell">Título</div>
                <div class="home--table-cell">Hacker</div>
            </div>
            {rows}
        </div>
        </>
    )
}

export default Table