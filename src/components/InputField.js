import React, { useState } from "react";
import "./form.css";
const InputField = ({ name, data, setChange, type, input }) => {
	const [count, setCount] = useState("");
	return (
		<div className="form__div">
			{input ? (
				<textarea
					type="text"
					placeholder={` ${data}`}
					className="form__input"
					onChange={(e) => {
						setCount(e.target.value.length);
						setChange(e.target.value);
					}}
					value={data}
					type={type ? type : "text"}
				/>
			) : (
				<input
					type="text"
					placeholder={` ${data}`}
					className="form__input"
					onChange={(e) => {
						setCount(e.target.value.length);
						if (count < input ? 500 : 50) {
							setChange(e.target.value);
						} else {
							alert(`${data} is too long`);
						}
					}}
					value={data}
					type={type ? type : "text"}
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
