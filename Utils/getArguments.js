function argsFactory(args) {
	return args.reduce((acc, el, idx, arr) => {
		if (el.charAt(0) === "-") {
			const key = el.substring(1);
			const nextEl = arr[idx + 1];
			const notLastItem = idx !== arr.length - 1;
			acc[key] = notLastItem && nextEl.charAt(0) !== "-" ? nextEl : true;
		}
		return acc;
	}, {});
}

export default function getArguments(args) {
	const cleanArgs = args.filter((_, idx) => idx > 1);

	return argsFactory(cleanArgs);
}
