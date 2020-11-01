import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebase";

const EditJobForm = () => {
	let { jobId } = useParams();
	const [work, setWork] = useState("");
	const [position, setPosition] = useState("");
	const [salary, setSalary] = useState("");

	const editItem = () => {
		db.collection("workplaces").doc(jobId).update({
			work: work,
			position: position,
			salary: salary,
		});
		console.log(work);
	};
	return (
		<div>
			<input
				placeholder={jobId}
				value={work}
				onChange={(e) => setWork(e.target.value)}
			/>
			<input
				placeholder={jobId}
				value={position}
				onChange={(e) => setPosition(e.target.value)}
			/>
			<input
				placeholder={jobId}
				value={salary}
				onChange={(e) => setSalary(e.target.value)}
			/>
			Wpisz cos
			<button onClick={editItem}>Kliknij by zmienic</button>
		</div>
	);
};

export default EditJobForm;
