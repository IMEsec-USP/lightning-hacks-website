import React from 'react'
import Row from './row'

const anyHack = (hacks) => Boolean(hacks.reduce((acc, hack) => acc || hack.presenter || hack.title, false))

const Table = ({ hacks, nextDay }) => {
    const rows = hacks.map(({presenter, title}) =>
                    <Row presenter={presenter} title={title} />)

    return (
        <>
        <div class="home--next-event-date">
            <p style={{textTransform: 'capitalize'}}>{ nextDay }</p>
        </div>
        <div class="home--table">
            {!anyHack(hacks) &&
                <p style={{textAlign: 'center'}}>Nenhuma apresentação marcada ainda!</p>
            }
            {anyHack(hacks) &&
                <>
                <div class="home--table-row home--table-header">
                    <div class="home--table-cell">Título</div>
                    <div class="home--table-cell">Hacker</div>
                </div>
                {rows}
                </>
            }
        </div>
        </>
    )
}

export default Table