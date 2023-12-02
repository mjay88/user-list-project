import React, { useState, useEffect } from "react";
import User from "./User";

function App() {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	console.log(users);
	//useEffect to get data
	useEffect(() => {
		setError(null);
		const controller = new AbortController();

		const fetchUsers = async () => {
			try {
				setLoading(true);
				const res = await fetch(`https://jsonplaceholder.typicode.com/users`, {
					signal: controller.signal,
				});
				if (res.status !== 200) {
					throw new Error(`res.status was bad, res.status = ${res.status}`);
				}
				const data = await res.json();
				console.log("firing");
				setUsers(data);
			} catch (e) {
				if (e?.name === "AbortError") return;
				setError(e.message);
			}
			setLoading(false);
		};
		fetchUsers();

		return () => {
			controller.abort();
		};
	}, []);

	return (
		<>
			<h1>User List</h1>
			<ul>
				{loading === true ? (
					<h1>Loading...</h1>
				) : (
					<React.Fragment>
						{users.map((user) => {
							return <User key={user.id} name={user.name} />;
						})}
					</React.Fragment>
				)}
			</ul>
		</>
	);
}

export default App;
