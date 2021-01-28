import React, { useState } from "react";
import "./form.css";
const InputField = ({ name, data, setChange, type, input }) => {
	const [count, setCount] = useState("");

	return (
		<div className="form__div">
			{input ? (
				<textarea
					className="form__input"
					onChange={(e) => {
						setCount(e.target.value.length);
						setChange(e.target.value);
					}}
					value={data}
					maxLength="500"
					type={type ? type : "text"}
					style={{ height: 200 }}
					required
				/>
			) : (
				<input
					className="form__input"
					onChange={(e) => {
						setCount(e.target.value.length);
						if (count < input ? 500 : 70) {
							setChange(e.target.value);
						} else {
							alert(`${data} is too long`);
						}
					}}
					maxLength="70"
					value={data}
					type={type ? type : "text"}
					required
				/>
			)}

			<label for="" className="form__label">
				{name}
			</label>
			<p className="form__paragraph">
				{count} / {input ? 500 : 70}
			</p>
		</div>
	);
};

export default InputField;
