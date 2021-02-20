import React, { useState } from "react";
import styles from "./Form.module.css";
const InputField = ({ name, data, setChange = () => {}, type, input }) => {
	const [count, setCount] = useState("");

	return (
		<div className={styles.div}>
			{input ? (
				<textarea
					className={styles.input}
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
					className={styles.input}
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

			<label for="" className={styles.label}>
				{name}
			</label>
			<p className={styles.paragraph}>
				{count} / {input ? 500 : 70}
			</p>
		</div>
	);
};

export default InputField;
