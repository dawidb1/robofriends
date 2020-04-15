import React from 'react'
import CardList from '../components/CardList'
import SearchBox from '../components/SearchBox'
import Scroll from '../components/Scroll'
import './App.css'

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(users => users.json())
            .then(robots => this.setState({ robots }));
    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value });
    }

    render() {
        const filteredRobots = this.state.robots.filter(robot =>
            robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase()));

        if (this.state.robots.length === 0) {
            return <h1 className="title tc">Loading</h1>
        } else {
            return (
                <div className="tc">
                    <h1 className="title">Robofriends</h1>
                    <SearchBox searchChange={this.onSearchChange}></SearchBox>
                    <Scroll>
                        <CardList robots={filteredRobots}></CardList>
                    </Scroll>
                </div>
            )
        }
    }
}

export default App;