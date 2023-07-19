import React from "react";
import { ToDo } from "./todo";
//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	return (
		<div className="text-center">
			<ToDo />
		</div>
	);
};

export default Home;
