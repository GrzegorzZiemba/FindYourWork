import React, { useState, useEffect } from "react";
import "./form.css";
const InputField = ({ name, data, setChange, type, input }) => {
	const [count, setCount] = useState("");
	const [val, setVal] = useState(data);
	console.log("THIS IS " + val + "data it is " + data);

	useEffect(() => {
		setVal(data);
	}, []);
	return (
		<div className="form__div">
			{input ? (
				<textarea
					// placeholder={` ${data}`}
					className="form__input"
					onChange={(e) => {
						setCount(e.target.value.length);
						setChange(e.target.value);
						setVal(e.target.value);
					}}
					value={val}
					maxLength="500"
					type={type ? type : "text"}
					style={{ height: 200 }}
					required
				/>
			) : (
				<input
					// placeholder={` ${data}`}
					className="form__input"
					onChange={(e) => {
						setCount(e.target.value.length);
						if (count < input ? 500 : 50) {
							setChange(e.target.value);
							setVal(e.target.value);
						} else {
							alert(`${data} is too long`);
						}
					}}
					maxLength="50"
					value={val}
					type={type ? type : "text"}
					required
				/>
			)}

			<label for="" className="form__label">
				{name}
			</label>
			<p className="form__paragraph">
				{count} / {input ? 500 : 50}
			</p>
		</div>
	);
};

export default InputField;
