const wordcount = str => {
  let inword = false;
  let nw = 0;
  for(var i = 0; i < str.length; i++) {
    if ((str[i] === ' ') || (str[i] === '\t') || (str[i] === '.')) {
      inword = false;
    } else if (!inword) {
      inword = true;
      nw += 1;
    }
  }
  
  return nw;
}

const repeatChar = (char, counter, acc='') => {
  if (counter === 0) {
    return acc;
  } else {
    acc += char;
    return repeatChar(char, --counter, acc);
  }
};
  
const detab = (str, tabC=4) => {
  let output = '';
  
  for(var i = 0; i < str.length; i++) {
    if (str[i] === '\t') {
      output += repeatChar(' ', tabC); // 1 tab = 4 spaces
    } else {
      output += str[i];
    }
  }
  return output;
}

const entab = (str, tab=4) => {
  let output = '';
  let tabCount = 0;
  
  for(var i = 0; i < str.length; i++) {
    if (str[i] === ' ') {
      tabCount++;
      if (tabCount === tab) {
        output = output.slice(0, output.length - tab + 1);
        output += '\t';
        tabCount = 0;
      } else {
        output += str[i];
      }
    } else {
      tabCount = 0;
      output += str[i];
    }
  }
  return output;
}
const numToA = num => String.fromCharCode((num - 1) + 'A'.charCodeAt());
const ATonum = a => (a.charCodeAt() - 'A'.charCodeAt()) + 1;

const compress = (str, threshold = 4) => {
  let output = '';
  let lastChar = '';
  let charCount = 1;
  let encodedStr = '';
  
  const encode = (input, repeatedChar, count) => {
    input = input.slice(0, input.length - 1);
    encodedStr = `~${numToA(count)}${repeatedChar}`;
    input += encodedStr;
    return input;
  }
  
  for(var i = 0; i < str.length; i++) {
//  console.log({ lastChar, curr: str[i], charCount })
    if (str[i] === lastChar) {
      charCount++;
    } else if (charCount > 1) {
      output = encode(output, lastChar, charCount);
      charCount = 1;
      encodedStr = '';
      output += str[i];
    } else {
      output += str[i];
    }
    lastChar = str[i];
  }
  return (charCount > 1) ? encode(output, lastChar, charCount) : output ;
};

compress("hello lljjj ");

const decompress = str => {
  let lastChar = '';
  let output = '';
  for(var i = 0; i < str.length; i++) {
    if (str[i] === '~') {
      const count = ATonum(str[++i]);
      const reC = str[++i];
//       console.log({ count, reC, output })
      output += repeatChar(reC, count);
    } else {
      lastChar = str[i];
      output += str[i];
    }
  }
  return output;
};

decompress('hello ~Gn~Cj');
decompress(compress("hello lljjj "));

const makeSet = range => {
  let outputSet = [];
  let lastChar = '';
  
  for(var i = 0; i < range.length; i++) {
    if (range[i] === '-') {
      const from = lastChar;
      const to = range[++i];
      for(var j = from.charCodeAt(); j < to.charCodeAt(); j++) {
        outputSet.push(String.fromCharCode(j));
      }
    } else {
      if (lastChar != '') outputSet.push(lastChar);
    }
    lastChar = range[i];
  }
  if (lastChar && (lastChar != '')) outputSet.push(lastChar);
  return outputSet;
}

makeSet('kje')
makeSet('a-zA-Z')
makeSet('h-za-gC-ZAB')

const translit = ({ str, from, to }) => {
  const fromset = makeSet(from);
  const toset = makeSet(to);
  let output = '';
  
  if (fromset.length != toset.length) return;
  
  const map = new Map();
  for(var i = 0; i < fromset.length; i++) {
    map.set(fromset[i], toset[i]);
  }
  
  for(var i = 0; i < str.length; i++) {
    output += map.get(str[i]) ? map.get(str[i]) : str[i];
  }
  
  return output;
};

const ccp = translit({ str: "Hello World", from: "a-zA-Z", to: "h-za-gC-ZAB"})
ccp
translit({ str: ccp, to: "a-zA-Z", from: "h-za-gC-ZAB"})