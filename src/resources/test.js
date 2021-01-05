function enumerateObject(obj, retObj) {
	Object.keys(obj).forEach(o => {
		let t = {};
		t[o.valueOf()] = (Array.isArray(obj[o]) ? 'Array' : typeof obj[o]);

		if(obj[o] && typeof obj[o] == 'object' && !Array.isArray(obj[o])) {
			console.log(t);
			t[o.valueOf()] = enumerateObject(obj[o], retObj);
		}
		retObj.push(t);
	})
	return retObj;
}

var k = enumerateObject(j, []);
console.log(k);
