import './animateThunder'
import './animateTime'
import './animateHeader'
import TableFetcher from './tableFetcher'
import React from 'react'
import ReactDOM from 'react-dom'
import AOS from 'aos'

const nextEventBoxElement = document.getElementById('next-event-box')
if (nextEventBoxElement) {
    ReactDOM.render(<TableFetcher />, nextEventBoxElement)
}

AOS.init();