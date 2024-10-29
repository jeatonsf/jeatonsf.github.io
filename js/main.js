$(document).ready(function(){
  /* toggle menu */
  $("#menu-toggle").click(toggleSideBar)

  /* smooth scrolling. highlight page location in side bar */
  $('#page-content-wrapper').on("scroll", onScroll);
  $('.sidebar-nav > li > a').on('click', smoothScroll);

  /* type slowly */
  Typed.new('#topnav-text', {
    strings: ["> nǐ hǎo, shìjiè", "> hola mundo", "> hello world"],
    typeSpeed: 30
  });
});

function toggleSideBar(e) {
  e.preventDefault();
  $("#wrapper").toggleClass("toggled");
  $('#nav-icon').toggleClass('open');
}

/*
 *   S M O O T H   S C R O L L I N G
 */
function smoothScroll(e) {
  toggleSideBar(e)
  e.preventDefault();
  $(document).off("scroll");

  var target = this.hash,
      menu = target;
  $target = $(target);

  var tgtDistToParent = $target.offset().top - $target.parent().offset().top - $target.parent().scrollTop();
  wrapperPadding = parseInt($target.parent().parent().css('padding-top'), 10);
  tgtDistToParent += wrapperPadding;

  $('#page-content-wrapper').stop().animate({
    'scrollTop': tgtDistToParent
  }, 500, 'swing', function () {
    $(document).on("scroll", onScroll);
  });
  
  /* set top nav text */
  setTopNavText($(this), {
    'about': ['> ./analyzeJesse', '> found about_me.txt'],
    'library': ['> don\'t read the book', '> learn formulas'],
    'contact-info': ['> hmu']
  });
}

function onScroll(event) {
  linksStr = ".sidebar-nav > li > a"
  var scrollPos = $(this).scrollTop();

  /* only add active to current link */
  $(linksStr).removeClass("active");
  curPageLink = getCurPageLink(linksStr);
  curPageLink.addClass("active");
}

function setTopNavText(curPageLink, txtDict) {
  key = curPageLink.attr("href").substring(1);
  Typed.new('#topnav-text', {
    strings: txtDict[key],
    typeSpeed: 60
  });
}

/* returns the html element that the page is currently scrolled to */
function getCurPageLink(linksStr) {
  pageElem = null;
  pageLink = null;
  $(linksStr).each(function () {
    var curLink = $(this);
    var refElem = $(curLink.attr("href"));
    if (pageElem == null) {
      pageElem = refElem;
      pageLink = curLink;
    } else {
      if (firstIsNegAndCloserToZero(refElem, pageElem)) {
        pageElem = refElem;
        pageLink = curLink;
      }
    }
  });
  return pageLink
}

/* returns the element whose position is negative (above the screen) and closest to zero */
/* now just returns bool */
function firstIsNegAndCloserToZero(elem1, elem2) {
  dist1 = elem1.position().top;
  dist2 = elem2.position().top;
  if (dist1 < 0 && dist2 > 0) {
    return true
  }
  if (dist1 > 0 && dist2 < 0) {
    return false
  }
  if (Math.abs(dist1) < Math.abs(dist2)) { /* elem1 is closer */
    return true
  }
  return false
}
