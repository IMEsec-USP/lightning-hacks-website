import React, { Component } from 'react'
import Table from './Table'
import LHLoader from './loader'

const LH_API_ENDPOINT = 'https://api.lh.imesec.ime.usp.br/hacks'

class TableFetcher extends Component {
    constructor () {
        super()
        this.state = {
            loaded: false,
            success: false,
            hacks: null,
            nextDay: null,
        }
        this.fetchData()
    }

    fetchData () {
        fetch(LH_API_ENDPOINT, { mode: 'cors' })
        .then(res => res.json())
        .then(res => {
            this.setState({
                loaded: true,
                success: true,
                hacks: res.data.hacks,
                nextDay: res.data.next_day
            })
        })
        .catch(err => {
            this.setState({
                loaded: true,
                success: false,
            })
        })
    }

    render () {
        const { loaded, success, hacks, nextDay } = this.state
        if (!loaded) {
            return (
                <LHLoader />
            )
        }

        if (!success) {
            return (
                <div class="home--next-event-box__error">
                    <p><b>Ops. Parece que houve um erro na conexão.</b></p>
                    <p>Cheque sua conexão com a internet e tente novamente mais tarde.</p>
                </div>
            )
        }

        return (
            <div class="home--next-event-box">
                <div>
                    <h3>Próximo Lightning Hacks</h3>    
                </div>
                <Table hacks={hacks} nextDay={nextDay} />
            </div>
        )
    }
}

export default TableFetcher