

/*about document object or function in browwer*/
const log = console.log
const d = window.document


/*about func*/
const curry = f =>
    (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);

const go = (...args) => reduce((a, f) => f(a), args);
const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);
const reduce = curry((f, acc, iter) => {
    if (!iter) {
        iter = acc[Symbol.iterator]();
        acc = iter.next().value;
    } else {
        iter = iter[Symbol.iterator]();
    }
    let cur;
    while (!(cur = iter.next()).done) {
        const a = cur.value;
        acc = f(acc, a);
    }
    return acc;
});

const range = l => {
    let i = -1;
    let res = [];
    while (++i < l) {
        res.push(i);
    }
    return res;
}


const take = curry((l, iter) => {
    let res = [];
    iter = iter[Symbol.iterator]();
    let cur;
    while (!(cur = iter.next()).done) {
        const a = cur.value;
        res.push(a);
        if (res.length == l) {
            return res;
        }
    }
    return res;
});

const L = {};
L.range = function* (l) {
    let i = -1;
    while (++i < l) {
        yield i;
    }
}

const takeAll = take(Infinity);

L.map = curry(function* (f, iter) {
    iter = iter[Symbol.iterator]();
    let cur;
    while (!(cur = iter.next()).done) {
        const a = cur.value;
        yield f(a);
    }
});

const map = curry(pipe(L.map, takeAll));

L.filter = curry(function* (f, iter) {
    iter = iter[Symbol.iterator]();
    let cur;
    while (!(cur = iter.next()).done) {
        const a = cur.value;
        if (f(a)) {
            yield a;
        }
    }
});

const filter = curry(pipe(L.filter, takeAll));

const find = curry((f, iter) => go(
    iter,
    L.filter(f),
    take(1),
    ([a]) => a
));



const isIterable = a => a && a[Symbol.iterator];

L.flatten = function* (iter) {
    for (const a of iter) {
        if (isIterable(a)) {
            for (const b of a) yield b;
        } else yield a;
    }
};

const flatten = pipe(L.flatten, takeAll);

L.flatMap = curry(pipe(L.map, L.flatten));
const flatMap = curry(pipe(L.map, flatten));


const add = (a, b) => a + b;
const sum = curry((f, iter) => go(
    iter,
    map(f),
    reduce(add)
));




/*about pagination*/
const pagination = (cp, lp) => {
    let _cp = cp,
        _lp = lp,
        landload = 2,
        left = _cp - landload,
        right = _cp + landload + 1,
        range = [],
        dotRange = [], l;



    //declare paging range.
    //ex) pagination(1,10) range=[1,2,3,10]
    //ex) pagination(2,10) range=[1,2,3,4,10]
    for (let i = 1; i <= _lp; i++) {
        if (i == 1 || i == _lp || i >= left && i < right) {
            range.push(i);
        }
    }

    //declare where '...' should be.
    //ex) pagination(1,10) dotRange=[1,2,3,'...',10]
    //ex) pagination(2,10) dotRange=[1,2,3,4,'...',10]
    for (let i of range) {
        if (l) {
            if (i - l === 2) {
                dotRange.push(l + 1);
            } else if (i - l !== 1) {
                dotRange.push('...');
            }
        }
        dotRange.push(i);
        l = i;
    }
    return dotRange;
}



const pagination_5 = (D, F, L, S) => {
    let res = [];
    let K, PS = 5;
    //log(D, F, L, S);
    if (F == L) {
        for (let i = 0; i < 4; i++) {
            res.push(L - i);
        }
        return res;
    }
    K = F + PS;
    if (F < 7 && F % 10 >= 7) {
        K = L;
    } else {
        K = K - 1;
        //K = K;
        //  log('얘다 '+K);
    }
    if (L > K || F < K) {
        if (L % PS == 0) {
            for (let i = F; i <= L; i++) {
                if (res.length < PS) res.push(i);
                else { return res; }
            }
        }
        for (let i = F; i < L; i++) {
            if (res.length < PS) res.push(i);
            else { return res; }
        }
    } else {
        for (let i = F; i < K; i++) {
            res.push(i);
        }
    }
    return res;
}


const next_page_num = (D, F, L, S) => {
    let res = [];
    let K, PS = 5;
    //log(D, F, L, S);
    let _L = L;

    if (F == _L) {
        res.push(_L);
        //log('F == _L'+res[0]);
        return res[0];
    }

    K = F + PS;
    if (F < 7 && F % 10 >= 7) {
        K = _L;
    } else {
        K = K - 1;
    }

    /*
    if (L % PS == 0) {
        for (let i = F; i <= L; i++) {
            if (res.length < PS) res.push(i);
            else { return res; }
        }
    }
    for (let i = F; i < L; i++) {
        if (res.length < PS) res.push(i);
        else { return res; }
    }
    */
    //log('log(F);'+F+' log(_L);'+_L);
    if (_L > K || F < K) {
        for (let i = F; i <= _L; i++) {
            if (res.length < PS) {
                res.push(i);
                //log('이것이 너의 대답이냐 '+res);
            }
            else {
                //log('res[res.length - 1]' + res[res.length - 1]);
                return res[res.length - 1];
            }
        }
    } else {
        for (let i = F; i < K; i++) {
            res.push(i);
        }
    }
    //log(Math.floor(_L));
    _L = Math.floor(_L);
    //log('L'+_L);
    log('res!!!!!!!!!!!!!!!!!!!' + res);
    if (res[res.length - 1] == _L) {
        L = res[res.length - 1];
        //log('L ' + _L - 1);
        //log('_L - 2' + _L - 2);
        return _L - 5;
    } else if (L < res[res.length - 1]) {
        //log('res[res.length - 1] - 4' + res[res.length - 1] - 4);
        return res[res.length - 1] - 4;
    } else {
        //log('빠방~' + (res[res.length - 1]) + 1);
        //log((res[res.length - 1]) + 1);
        return res[res.length - 1] + 1;
    }
}

/*
const next_page_num = (D, F, L, S) => {
    let res = [];
    let k, PS = 5;
    //log(D, F, L, S);
    let _L = L;

    if (F == _L) {
        res.push(_L);
        return res[0];
    }

    K = F + PS;
    if (F < 7 && F % 10 >= 7) {
        K = _L;
    } else {
        k = k - 1;
    }
    if (_L > K || F < K) {
        for (let i = F; i < _L; i++) {
            if (res.length < PS) res.push(i);
            else { return res[res.length - 1]; }
        }
    } else {
        for (let i = F; i < K; i++) {
            res.push(i);
        }
    }
    log(Math.floor(_L));
    _L = Math.floor(_L);
    log('L' + _L);
    if (res[res.length - 1] == _L) {
        L = res[res.length - 1];
        log('L ' + _L - 1);
        return _L - 2;
    } else {
        log('not L ' + res[res.length - 1]);
        return res[res.length - 1];
    }
}
*/

const getPaginationPage = (P) => {
    let landload = 5;

    // log('L ' + Math.floor(L));
    // log('L/landload' + Math.floor(L % landload));

    switch (Math.floor(P % landload)) {
        case 1:
            return Math.floor(P);
            break;
        case 2:
            return Math.floor(P - 1);
            break;
        case 3:
            return Math.floor(P - 2);
            break;
        case 4:
            return Math.floor(P - 3);
            break;
        case 0:
            return Math.floor(P - 4);
            break;
    }
}

const last_avenue = (L) => {
    let landload = 5;

    // log('L ' + Math.floor(L));
    // log('last_avenue L/landload' + Math.floor(L % landload));

    switch (Math.floor(L % landload)) {
        case 1:
            return Math.floor(L);
            break;
        case 2:
            return Math.floor(L - 1);
            break;
        case 3:
            return Math.floor(L - 2);
            break;
        case 4:
            return Math.floor(L - 3);
            break;
        case 0:
            return Math.floor(L);
            break;
    }
}



const pre_page_num = (D, F, L, S) => {
    let res = [];
    let k, PS = 5;
    //log(D, F, L, S);
    /*
    if (F == L) {
        res.push(L);
        return res[res.length-1];
    }
    */
    K = F + PS;
    if (F < 7 && F % 10 >= 7) {
        K = L;
    } else {
        k = k - 1;
    }
    if (L > K || F < K) {
        for (let i = F; i < L; i++) {
            if (res.length < PS) res.push(i);
            else {
                //            log('res[0] ' + res[0]);
                return res[0] == 1 ? 2 : res[0] - 4;
            }
        }
    } else {
        for (let i = F; i < K; i++) {
            res.push(i);
        }
    }
    // log('the last res[0] ' + res[0]);
    return res[0] - 4;
}


//all list's num 'LC', page num 'PN', post num by one page 'PS', idx num 'ps'.
const totalCounterP = (LC, PN, PS, ps) => {
    let res = [];
    let i, j;
    let r = PS;
    LC = LC - ((PN - 1) * PS);
    for (i = LC, j = 0; j < PS; j++) {
        res.push(i);
        i--;
    }
    return res[(r - 1) - ps];
}

/*print only input text*/
let checkNull = (a) => {
    if (a == null || undefined || '') return '';
    else return a.replace(/(\s*)/g, "");
}


/*functions about cookie*/
const getCookieInfo = (a) => {
    arr = a.split(';');
    arr = flatten(go(arr, map(a => a.split('='))));
    return arr;
}

const cookie = (a) => {
    let arr = [];
    let arr1 = getCookieInfo(a);
    for (let i = 0; i < arr1.length; i++) { if (i % 2) { arr.push(arr1[i]); } else { } }
    return arr;
}

//for main page's list
let just_four = (res) => {
    let returnVal = [];
    for (let i = 0; i < 4; i++) {
        returnVal.push(res[i]);
    }
    return returnVal;
}

/*for hilighting*/
//functions get node compared "data-state" nodeLists state with "data-standard" 
//and get some effects who use this function packages.

/*step01: get data lists*/
const getDataState = (iter, dataAttributeName) => {
    let res = [];
    for (const a of iter) {
        res.push(a);
    }
    return res;
}

/*step02: compare list with standards and return one node matched. */
const compareDataStandardWithDataState = (iter, standardValue, stateName) => {
    let res;
    for (const a of iter) {
        if (a.getAttribute(stateName) == standardValue) {
            res = a;
            return res;
        }
    }

}

/*step03: and put some effects on it.*/
const setStyle = (ele, attr01, attr02, attrVal) => {
    ele[attr01][attr02] = attrVal;
}