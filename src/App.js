import React, { Component } from 'react';
import './App.css';
import Dag from "./component/dag";
import data from "./data";
import StatView from "./component/StatView";

const SNAP_CONSTANT = 5;

class App extends Component {
	state = {
		blocks: [],
		groupedBlocks: []
	};

	componentDidMount = () => {
		data.forEach((item, i) => {
			setTimeout(() => this.setState({ blocks: [...this.state.blocks, item]}), 500  * (i+1));
		})
	};

	componentDidUpdate = (prevProps, prevState) => {
		const { blocks, groupedBlocks } = prevState;
		if (blocks !== undefined && blocks.length - groupedBlocks.length === SNAP_CONSTANT) {
			// Remove values in range of SNAP_CONSTANT from the array, and move them to state.groupedBlocks, add a reference
			// to blocks.
			const newGroup = blocks.splice(blocks.length - SNAP_CONSTANT, blocks.length);
			const start = newGroup[0];
			const end = newGroup[newGroup.length - 1];
			const newBlock = {
				"grouped": true,
				"time": `${start.time}-${end.time}`,
				"slot": `${start.slot}-${end.slot}`,
				"blockHeadRoot": end.blockHeadRoot,
				"headStateRoot": end.headStateRoot,
				"headParentRoot": start.headParentRoot
			};
			this.setState({
				blocks: [...blocks, newBlock],
				groupedBlocks: [...groupedBlocks, newGroup]
			})
		}
	};

	render(){
		console.log(this.state.blocks)
		return (
			<div className="App">
				<Dag
					blocks={this.state.blocks}
					groupedBlocks={this.state.groupedBlocks}
				/>
				<StatView></StatView>
			</div>
    )
	}
}

export default App;
