function enumerateObject(obj, retObj) {
console.log(obj);
	Object.keys(obj).forEach(o=> {
		let jStr = JSON.parse('{ "' + o.valueOf() + '": "' + (Array.isArray(obj[o]) ? 'Array' : typeof obj[o]) + '" }');

		if(obj[o] && typeof obj[o] == 'object' && !Array.isArray(obj[o])) {
			let enumeration = enumerateObject(obj[o], retObj);
			return retObj.push(enumeration);
		} else {
			retObj.push(jStr);
		}
	})
	return retObj;
}

var k = enumerateObject(j, []);
