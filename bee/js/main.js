$( document ).ready(function() {
  matches = $("#c")
  var h = matches.height();
  var w = matches.width();
  var c = $("#c")[0];
  c.height = h
  c.width = w
  var ctx = c.getContext("2d");
  
  draw_color_grad(ctx, h, w);
  var v = get_years_and_days_since();
  set_number_of_years(v[0]);
  set_number_of_days(v[1]);
});

function draw_color_grad(ctx, h, w) {
  var my_gradient = ctx.createLinearGradient(0,0,0,h*2/3);
  my_gradient.addColorStop(0, "#ff2d88");
  my_gradient.addColorStop(1, "#fcfa71");
  ctx.fillStyle = my_gradient;
  ctx.fillRect(0, 0, w, h);
}

function set_number_of_years(n_years) {
  s = n_years.toString() + " Year"
  if (n_years != 1) {
    s += "s"
  }
  document.getElementById("years-of-dating").innerHTML = s;
}

function set_number_of_days(n_days) {
  s = n_days.toString() + " day"
  if (n_days != 1) {
    s += "s"
  }
  document.getElementById("days-of-dating").innerHTML = s;
}

function get_years_and_days_since() {
  var dateB = new Date();
  var yearB = dateB.getFullYear();
  var dayB = dateB.getDate();

  var dateA = new Date('10/21/2016'); // We think 10/21 is first date and 10/15 is first sighting
  var yearA = dateA.getFullYear();
  var dayA = dateA.getDate();

  var dsnyA = get_days_since_new_year(dateA);
  var dsnyB = get_days_since_new_year(dateB)+1;

  var numYears = yearB - yearA
  if (dsnyB < dsnyA) {
    numYears -= 1
  }
  var numDays = Math.abs(dsnyB - dsnyA);
  if (dsnyB < dsnyA) {
    numDays = 365 - numDays
  }

  return [numYears, numDays]
}

function get_days_since_new_year(now) {
  var start = new Date(now.getFullYear(), 0, 0);
  var diff = now - start;
  var oneDay = 1000 * 60 * 60 * 24;
  var day = Math.floor(diff / oneDay);
  return day
}

// var dt = new Date();  

// // Display the month, day, and year. getMonth() returns a 0-based number.  
// var month = dt.getMonth()+1;  
// var day = dt.getDate();  
// var year = dt.getFullYear();  
// document.write(month + '-' + day + '-' + year);
// var dt = new Date('8/24/2009');

function print(s) {
  console.log(s)
}
