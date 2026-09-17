import { useState } from 'react';

import './assets/styles/variables.css';

const App = () => {
	return (
		<>
			<p className="">Click on the Vite and React logos to learn more</p>
		</>
	);
};

export default App;

/**
 * @deprecated just an example, remove once there are other tests to inspire from
 */
const Counter = () => {
	const [count, setCount] = useState(0);

	return (
		<div>
			<button onClick={() => setCount((count) => count + 1)}>
				count is {count}
			</button>
		</div>
	);
};

export { Counter };
