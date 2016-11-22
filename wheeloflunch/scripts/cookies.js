var OHA_COOKIES = {}

OHA_COOKIES.customGoalsToken = "lunch_wheel_goals";
OHA_COOKIES.updateCookie = function(token, obj){
  //save cookies
  console.dir(obj)
  localStorage.setItem(token, JSON.stringify(obj));
};
OHA_COOKIES.getCookie = function(token, obj){
  //if cookie not found, return obj
  var t = localStorage.getItem(token);
  if(t){
    return $.parseJSON(t);
  }
  else {
    localStorage.setItem(token, JSON.stringify(obj));
  }
  return obj;
}
OHA_COOKIES.resetCookies = function(){
  localStorage.removeItem(OHA_COOKIES.customGoalsToken);
}
