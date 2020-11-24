import React from "react";
import "./hexa.css";

const ImageHexa = ({ image }) => {
	return (
		<>
			<div className="hexagon hexagon1">
				<div className="hexagon-in1">
					<div
						className="hexagon-in2"
						style={{
							backgroundImage: `url(${image})`,
						}}
					></div>
				</div>
			</div>
		</>
	);
};

export default ImageHexa;
