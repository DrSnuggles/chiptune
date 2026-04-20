export function atob(input) {
	/*
	This code was written by Tyler Akins and has been placed in the
	public domain.  It would be nice if you left this header intact.
	Base64 code from Tyler Akins -- http://rumkin.com
	*/
	const keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
	
	let output = ''
	let chr1, chr2, chr3
	let enc1, enc2, enc3, enc4
	let i = 0
	// remove all characters that are not A-Z, a-z, 0-9, +, /, or =
	input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '')
	do {
		enc1 = keyStr.indexOf(input.charAt(i++))
		enc2 = keyStr.indexOf(input.charAt(i++))
		enc3 = keyStr.indexOf(input.charAt(i++))
		enc4 = keyStr.indexOf(input.charAt(i++))
	
		chr1 = (enc1 << 2) | (enc2 >> 4)
		chr2 = ((enc2 & 15) << 4) | (enc3 >> 2)
		chr3 = ((enc3 & 3) << 6) | enc4
	
		output = output + String.fromCharCode(chr1)
		if (enc3 !== 64) output = output + String.fromCharCode(chr2)
		if (enc4 !== 64) output = output + String.fromCharCode(chr3)
	} while (i < input.length)
	return output
}

export const performance = {
	now() {
		return Date.now()
	}
}

export const crypto = {
	getRandomValues(array) {
		for (let i = 0; i < array.length; i++) {
			array[i] = (Math.random() * 256) | 0
		}
	}
}

export const TextDecoder = {
	// from older libopenmpt version
	decode: (heapOrArray) => {
		let str = ''
		let idx = 0
		const endPtr = heapOrArray.length
		while (idx < endPtr) {
			// For UTF8 byte structure, see:
			// http://en.wikipedia.org/wiki/UTF-8#Description
			// https://www.ietf.org/rfc/rfc2279.txt
			// https://tools.ietf.org/html/rfc3629
			let u0 = heapOrArray[idx++]
			if (!(u0 & 128)) {
				str += String.fromCharCode(u0)
				continue
			}
			const u1 = heapOrArray[idx++] & 63
			if ((u0 & 224) == 192) {
				str += String.fromCharCode(((u0 & 31) << 6) | u1)
				continue
			}
			const u2 = heapOrArray[idx++] & 63
			if ((u0 & 240) == 224) {
				u0 = ((u0 & 15) << 12) | (u1 << 6) | u2
			} else {
				u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | (heapOrArray[idx++] & 63)
			}
			if (u0 < 65536) {
				str += String.fromCharCode(u0)
			} else {
				const ch = u0 - 65536
				str += String.fromCharCode(55296 | (ch >> 10), 56320 | (ch & 1023))
			}
		}
		return str
	}
}