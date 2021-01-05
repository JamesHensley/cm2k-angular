function enumerateObject(obj, retObj) {
	Object.keys(obj).forEach(o => {
		let jStr = JSON.parse('{ "' + o.valueOf() + '": "' + (Array.isArray(obj[o]) ? 'Array' : typeof obj[o]) + '" }');
		retObj.push(jStr);

		if(obj[o] && typeof obj[o] == 'object' && !Array.isArray(obj[o])) {
			let enumeration = enumerateObject(obj[o], retObj);
			[].concat(enumeration);
		}
	})
	return retObj;
}

var k = enumerateObject(j, []);
console.log(k);
