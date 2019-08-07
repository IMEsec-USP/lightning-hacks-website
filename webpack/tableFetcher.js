import React, { Component } from 'react'
import Table from './Table'

const LH_API_ENDPOINT = 'https://api.lh.imesec.ime.usp.br/hacks'

class TableFetcher extends Component {
    constructor () {
        super()
        this.state = {
            loaded: false,
            success: false,
            hacks: null,
        }
        this.fetchData()
    }

    fetchData () {
        fetch(LH_API_ENDPOINT, { mode: 'cors' })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            this.setState({
                loaded: true,
                success: true,
                hacks: res.data.hacks,
            })
        })
        .catch(err => {
            console.log(err)
            this.setState({
                loaded: true,
                success: false,
            })
        })
    }

    render () {
        const { loaded, success, hacks } = this.state
        console.log({state: this.state})
        return (
            <div class="home--next-event-box">
                {loaded &&
                    <>
                    <div>
                        <h3>Próximo Lightning Hacks</h3>    
                    </div>
                    <Table hacks={hacks} />
                    </>
                }
            </div>
        )
    }
}

export default TableFetcher