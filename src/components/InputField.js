import React from "react";
import "./form.css";
const InputField = ({ name, data, setChange, type, input }) => {
	return (
		<div class="form__div">
			{input ? (
				<textarea
					type="text"
					placeholder={` ${data}`}
					class="form__input"
					onChange={(e) => setChange(e.target.value)}
					value={data}
					type={type ? type : "text"}
				/>
			) : (
				<input
					type="text"
					placeholder={` ${data}`}
					class="form__input"
					onChange={(e) => setChange(e.target.value)}
					value={data}
					type={type ? type : "text"}
				/>
			)}

			<label for="" class="form__label">
				{name}
			</label>
		</div>
	);
};

export default InputField;
