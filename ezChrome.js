chrome.commands.onCommand.addListener(function(command) {
    console.log("Command: ",command);
    switch(command)
    {
        case "create-new-tab":
            createNewTab();
            break;
        case "switch-to-previous-tab":
            switchToPreviousTab();
            break;
        case "reopen-previous-closed-tab":
            reopenPreviousClosedTab();
            break;
        default: //only 0 and 1
            jumpToSpecificTab(parseInt(command.slice(-1)));
    }
});
var previousTabId = -1;
var prePreviousTabId = -1;
function reopenPreviousClosedTab(){
    chrome.tabs.query({}, function(selectedTab){
        chrome.tabs.update(selectedTab[tabIndex].id, {active:true});
    });
}
function createNewTab(){ //create new tab
    chrome.tabs.create({});
}
function switchToPreviousTab(){
    chrome.tabs.update(prePreviousTabId, {active:true});
}
// Events
chrome.tabs.onActivated.addListener(function(currentTabInfo){
    if(previousTabId == -1){
        prePreviousTabId = currentTabInfo.tabId;
        previousTabId = currentTabInfo.tabId;
    }else{
        prePreviousTabId = previousTabId;
        previousTabId = currentTabInfo.tabId;
    }
});
chrome.tabs.onRemoved.addListener(function(closedTabId, removeInfo){
    console.log(closedTabId);
});
