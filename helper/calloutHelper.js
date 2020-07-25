export const makeStreetAddress = (address) => {
	var tokens = address.split(", ");
	var result = tokens[0] + ", " + tokens[1]
	return result;
}

export const makeFullAddress = (address) => {
	var tokens = address.split(", ");
	tokens.pop()
	var result = tokens[0] + "\n" + tokens[1] + "\n" + tokens[2]
	return result;
}