import { LinkedList } from './datastructure';
import { join } from 'path';
import * as fs from 'fs';


const tempPath = join(__dirname, 'temp.ts');
let filepath = '';
function writeIndexFiles(result){
	const content = result;
	const initArr = content.split('.');
	filepath = join(__dirname, `${initArr.join('-')}.ts`);
	fs.writeFileSync(tempPath, content);
}
function writeIpFiles(result){
	const content = result.toString();
	if(fs.existsSync(filepath)){
		fs.appendFileSync(filepath, content);
	} else {
		fs.writeFileSync(filepath, content);
	}
	// fs.writeFileSync(join(__dirname, 'demo.ts'), `export default ${JSON.stringify(result)}`);
}
function getTargetContent(){
	let fromResult = '', tempResult = '';
	let initArr = [1,1,1,1];
	if(fs.existsSync(tempPath)){
		tempResult = fs.readFileSync(tempPath, 'utf-8');
		initArr = tempResult.split('.').map((value)=>{
			return parseInt(value, 10) as number;
		});
	}
	filepath = join(__dirname, `${initArr.join('-')}.ts`);
	// if(fs.existsSync(filepath)){
	// 	fromResult = fs.readFileSync(filepath, 'utf-8');
	// }
	return {
		fromResult,
		initArr
	}
}
function generateAvalableIp(){
	const level1Ignores = [10, 127, 168, 172, 192, 255];
	const level2Ignores = [16, 17,18, 19,20, 21, 22,23,24,25,26,27,28,29,30,31];
	const startTime = new Date().getTime();
	let count = 0;
	let { fromResult, initArr } = getTargetContent();
	let result = new LinkedList();
	let index1 = initArr[0], index2=initArr[1], index3=initArr[2], index4=initArr[3];
	for(let a1 = index1; a1 < level1Ignores[5]; a1++){
		if(index1 > 1 && a1 === level1Ignores[5] - 1){
			index1 = 1;
		}
		if(a1 === level1Ignores[0] || a1 === level1Ignores[1]){
			continue;
		}
		for(let a2 = index2; a2 < level1Ignores[5]; a2++){
			if(index2 > 1 && a2 === level1Ignores[5] - 1){
				index2 = 1;
			}
			if((a1 === level1Ignores[3] && level2Ignores.includes(a2)) || (a1 === level1Ignores[4] && a2 === level1Ignores[2])){
				continue;
			}
			for(let a3 = index3; a3 < level1Ignores[5]; a3++){
				if(index3 > 1 && a3 === level1Ignores[5] - 1){
					index3 = 1;
				}
				for(let a4 = index4; a4 < level1Ignores[5]; a4++){
					if(index4 > 1 && a4 === level1Ignores[5] - 1){
						index4 = 1;
					}
					const newcontent = {};
					const key = `${a1}.${a2}.${a3}.${a4}`;
					newcontent[key] = {
						"location": "",
						"langShort": "",
					};
					result.append(newcontent);
					count++;
					// console.log('initArr: ', initArr);
					console.log('record count: ', count);
                    console.log('ip: ', key);
                    if(process.argv && process.argv.length){
                        console.log('process index:', process.argv[2])  
                    }
                    
					if(a1 === level1Ignores[5] - 1 &&  a2 === level1Ignores[5] - 1 && a3 === level1Ignores[5] - 1 && a4 === level1Ignores[5] - 1){
						console.log('.........')
						writeIndexFiles(key);
						writeIpFiles(result);
					} else if(count % (5 * 1000 * 1000) === 0){
						console.log(count)
						writeIndexFiles(key);
						writeIpFiles(result);
						result.empty();
					}
					

					// if(!result[key]){
					// 	result[key] = {
					// 		location: '',
					// 		langShort: '',
					// 	};
					// 	count++;
					// 	console.log(result);
					// 	console.log('record count;', count);
					// }
					
				}
			}
		}
	}
	const endTime = new Date().getTime();
	console.log('spend time:', (endTime - startTime)/1000/60);
	// fs.writeFileSync(filepath, result);
}
console.log('start to do........')
generateAvalableIp();