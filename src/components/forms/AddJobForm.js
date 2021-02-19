import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { db, fbase } from "../../firebase/firebase";
import { useHistory } from "react-router-dom";
import InputField from "../InputField";
import styles from "../Form.module.css";
const auth = fbase.auth();
let tillDate = new Date();
tillDate.setDate(tillDate.getDate() + 30);

const AddJobForm = () => {
	const [work, setWork] = useState("");
	const [position, setPosition] = useState("");
	const [salary, setSalary] = useState("");
	const [image, setImage] = useState("");
	const [description, setDescription] = useState("");
	const [city, setCity] = useState("");
	const history = useHistory();
	const { uid } = auth.currentUser == null ? "" : auth.currentUser;

	const handleSubmit = (e) => {
		e.preventDefault();
		const id = uuidv4();

		db.collection("workplaces").doc(id).set({
			work: work,
			position: position,
			salary: salary,
			image: image,
			id: id,
			uid: uid,
			description: description,
			city: city,
			activeTill: tillDate,
		});
		history.push("/");
	};

	return (
		<>
			{uid ? (
				<div className={styles.container}>
					<Form className={styles.form} onSubmit={handleSubmit}>
						<InputField name={"Company Name"} data={work} setChange={setWork} />
						<InputField
							name={"Position"}
							data={position}
							setChange={setPosition}
						/>
						<InputField
							name={"Monthy salary"}
							data={salary}
							setChange={setSalary}
							type={"number"}
						/>
						<InputField
							name={"Image (pass it via url)"}
							data={image}
							setChange={setImage}
						/>
						<InputField name={"Location"} data={city} setChange={setCity} />
						<InputField
							name={"Description of the job"}
							data={description}
							setChange={setDescription}
							input="textarea"
						/>
						<input type="submit" class="form__button" value="Add Offer" />
					</Form>
				</div>
			) : (
				""
			)}
		</>
	);
};

export default AddJobForm;
