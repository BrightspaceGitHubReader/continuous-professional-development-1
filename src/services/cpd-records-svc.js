import { d2lfetch } from 'd2l-fetch/src/index';
import fetchAuthFramed from 'd2l-fetch-auth/es6/d2lfetch-auth-framed';

d2lfetch.use({
	name: 'auth',
	fn: fetchAuthFramed,
	options: {
		enableTokenCache: true
	}
});

export class CpdRecordsService {

	static _encodeChar(char) {
		return `\\u${  (`0000${  char.charCodeAt(0).toString(16)}`).slice(-4)}`;
	}

	static async _multipartSerialized(object, files) {
		const boundary = '1575048195935';

		let jsonString = `--${boundary}\r\n`;
		jsonString += 'Content-Type: application/json\r\n';
		jsonString += '\r\n';
		jsonString += `${JSON.stringify(object).replace(/[\u007F-\uFFFF]/g, this._encodeChar)  }\r\n`;
		jsonString += `--${  boundary  }\r\n`;

		console.log(`before: ${jsonString.length}`);

		for (const file of files) {
			const data = await this._readFile(file);
			console.log(`c: ${data.length}`);
			jsonString += `Content-Disposition: file; name:""; filename="${  file.name  }"\r\n`;
			jsonString += `Content-Type: ${  file.type  }\r\n\r\n`;
			jsonString += data;
			jsonString += '\r\n';
			jsonString += `--${  boundary  }--`;
		}

		console.log(`after: ${jsonString.length}`);
		return {data: jsonString, size: jsonString.length};
	}

	static _readFile(file) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = (function() {
				return function() {
					return resolve(reader.result);
				};
			})(file);
			reader.onerror = (e => {
				return reject(e);
			});
			reader.readAsBinaryString(file);
		});
	}

	static createRecord(record, files) {
		const url = window.data.fraSettings.valenceHost;
		const base_path = '/d2l/api/customization/cpd/1.0/record';

		if (files === null || files.length === 0)
		{
			return this.postJsonRequest(url, base_path, record);
		}
		return this.postWithFilesRequest(url, base_path, record, files);
	}

	static getMethods() {
		const url = window.data.fraSettings.valenceHost;
		const base_path = '/d2l/api/customization/cpd/1.0/method';
		return this.getRequest(url, base_path);
	}

	static getQuestions() {
		return ['Why is Ben moving?'];
	}

	static getRecordSummary(page) {
		const url = window.data.fraSettings.valenceHost;
		const base_path = `/d2l/api/customization/cpd/1.0/record?pagenumber=${page}`;
		return this.getRequest(url, base_path);
	}

	static getRequest(url, base_path) {
		const getRequest = new Request(`${url}${base_path}`, {
			method: 'GET',
			headers: {
				'Content-Type' : 'application/json'
			}
		});

		return d2lfetch.fetch(getRequest).then(r => r.json());
	}

	static getSubjects() {
		const url = window.data.fraSettings.valenceHost;
		const base_path = '/d2l/api/customization/cpd/1.0/subject';
		return this.getRequest(url, base_path);
	}

	static getTypes() {
		return ['Structured', 'Unstructured'];
	}

	static postJsonRequest(url, base_path, object) {
		const postRequest = new Request(`${url}${base_path}`, {
			method: 'POST',
			headers: {
				'Content-Type' : 'application/json'
			},
			body: JSON.stringify(object)
		});
		return d2lfetch.fetch(postRequest);
	}

	static postWithFilesRequest(url, base_path, object, files) {
		this._multipartSerialized(object, files)
			.then((data) => {
				const postRequest = new Request(`${url}${base_path}`, {
					method: 'POST',
					headers: {
						'Content-Type' : 'multipart/mixed; boundary=1575048195935',
						'Content-Length': data.size
					},
					body: data.data
				});
				return d2lfetch.fetch(postRequest);
			});
	}

}
