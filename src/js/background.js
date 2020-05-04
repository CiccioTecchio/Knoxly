let c=0
let listOfTxt = []
chrome.storage.sync.set({"listOfTxt": ""}, function(){})//inizializzo lo storage
chrome.runtime.onMessage.addListener(function(req){
    if(req.type === 'additem'){
        listOfTxt.push(req.opt)     
        chrome.storage.sync.set({"listOfTxt": listOfTxt}, function(){})//setto lo storage
        setBadgeText(++c)
    }
    if(req.type === 'rmvitem'){
        listOfTxt.splice(req.opt.toRemove,1) 
        if(listOfTxt.length == 0) chrome.storage.sync.set({"listOfTxt": ""}, function(){})
        else  chrome.storage.sync.set({"listOfTxt": listOfTxt}, function(){})
        console.log(listOfTxt)
        setBadgeText(--c)
    }
    return true
})

function setBadgeText(c){
    if(c>999) chrome.browserAction.setBadgeText({"text": "999+"}); 
    else if(c==0) chrome.browserAction.setBadgeText({"text":""});
    else chrome.browserAction.setBadgeText({"text": c+""})
}