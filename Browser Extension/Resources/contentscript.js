//console.log("hello from content script");
var arr = [], l = document.links;
for(var i=0; i<l.length; i++) {
  arr.push(l[i].href);
}
browser.runtime.sendMessage({type: "links", links: arr});
