import './animateThunder'
import './animateHeader'
import TableFetcher from './tableFetcher'
import React from 'react'
import ReactDOM from 'react-dom'

const nextEventBoxElement = document.getElementById('next-event-box')
if (nextEventBoxElement) {
    ReactDOM.render(<TableFetcher />, nextEventBoxElement)
}
