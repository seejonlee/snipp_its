// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper
async function fetchClient(url, config) {
	const result = await fetch(url, {
		...config
	});

	if (result.ok) {
		const json = await result.json();
		return json;
	} else {
		const errorMsg = await result.text();
		return Promise.reject(new Error(errorMsg));
	}
};

export default fetchClient;
