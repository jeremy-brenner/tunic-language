
const dicts = {
  phoneme: {},
  word: {}
};

const locks = {
  phoneme: {},
  word: {}
}

const promises = {
  phoneme: {},
  word: {}
}

const wordCleanReg = new RegExp(`(\\([1-9]\\))?$`);


function getDict(type,letter) {
  if(locks[type][letter]) {
    return new Promise((res) => {
      promises[type][letter].push(res);
    });
  }
  if(dicts[type][letter]) {
    return Promise.resolve(dicts[type][letter]);
  }else{
    locks[type][letter] = true;
    promises[type][letter] = [];
  }

  return fetch(`dicts/dict_${type}_${letter}.json`)
    .then((response) => response.json())
    .catch( () => {
        return [];
    })
    .then( dict => { 
        dicts[type][letter] = dict.map(entry => {
          const phoneme = (entry.phoneme || "").replaceAll('ˈ','').replaceAll('ˌ','');
          const word = entry.word.replace(wordCleanReg,'');
          return {phoneme, word}
        });
        locks[type][letter] = false;
        promises[type][letter].forEach( res => res(dicts[type][letter] ));
        return dicts[type][letter]; 
    });
}


module.exports = {
  getDict
}