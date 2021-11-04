import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";

export const Cards = props => {
	const [found, setFound] = useState(false);
	const { store, actions } = useContext(Context);

	useEffect(() => {
		let position = store.favorites.find(item => item.name == props.coinObj.name);
		if (position) {
			setFound(true);
		} else {
			setFound(false);
		}
	});

	const handleFavorite = favorite => {
		actions.addFavorite(favorite);
	};

	return (
		<Card className="col-12 col-md-4 col-lg-3 m-3 p-0 bg-white">
			<Card.Body>
				<Card.Title>{props.coinObj.name}</Card.Title>
				<Card.Text>Symbol: {props.coinObj.symbol}</Card.Text>
				<Card.Text>Price: ${props.coinObj.price_usd}</Card.Text>
				<Card.Text>Rank: {props.coinObj.rank}</Card.Text>
			</Card.Body>
			<Card.Footer className="border-0 bg-white">
				<Link to={`/coin/${props.coinObj.id}`}>
					<Button variant="outline-primary" className="float-left">
						Learn More!
					</Button>
				</Link>
				<Button variant="outline-warning" className="float-right" onClick={() => handleFavorite(props.coinObj)}>
					{found ? <i className="fas fa-heart" /> : <i className="far fa-heart" />}
				</Button>
			</Card.Footer>
		</Card>
	);
};

Cards.propTypes = {
	coinObj: PropTypes.object
};
