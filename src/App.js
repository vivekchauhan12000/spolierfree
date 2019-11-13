import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

var imgUrl = 'http://image.tmdb.org/t/p/w185//';
class App extends Component {
	constructor() {
		super();

		this.state = {
			movies: []
		};

		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit(event) {
		event.preventDefault();
		var query = this.input.value;
		console.log(query);
		this.componentDidMount(query);
	}
	componentDidMount(query) {
		var api = 'https://api.themoviedb.org/3/search/movie?api_key=f1a31b68d21a662e9e01c90c4751c3e0&query=';
		axios.get(api + query).then((response) => {
			this.setState({
				movies: response.data.results
			});
			console.log(response.data);
		});
	}
	render() {
		const { movies } = this.state;
		var movieList = movies.map((movie) => (
			<div className="col-4 movie">
				<img src={imgUrl + movie.poster_path} className="movieImg" />
				<p className="overview">{movie.overview.slice(0, 150)}</p>
				<h3 key={movie.id} className="text-center movieTitle">
					{movie.title}
				</h3>
			</div>
		));
		return (
			<div className="App">
				<div className="jumbotron">
					<div className="container">
						<div className="row">
							<h1>Spoilerfree</h1>
							<h4 className="col-12 text-center">Search for a Movie</h4>
							<form onSubmit={this.onSubmit} className="col-12">
								<input
									className="col-12 form-control"
									placeholder="Search Movies..."
									ref={(input) => (this.input = input)}
								/>
							</form>
							<div>
								<ul className="col-12 row">{movieList}</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
