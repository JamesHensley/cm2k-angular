function enumerateObject(obj, retObj) {
	return Object.keys(obj).map(o => {
		let objField = obj[o];

		let tObj = {};
		tObj[o.valueOf()] = typeof objField;

		if(objField && typeof objField == 'object' && !Array.isArray(objField)) {
console.log(o, objField);
			tObj.children = enumerateObject(objField, retObj);
		}
		else {
			if(Array.isArray(objField)) { tObj[o.valueOf()] = 'array'; }
			tObj.children = [];
		}
		return tObj;
	})
}

var k = enumerateObject(j, []);
console.log(k);
