function menuActive () {
    var menuWrapper = document.getElementById ('menu-wrap');
    var menu = document.getElementById ('toggle-button');
    console.log ('menu clicked');
    if ($ ('#toggle-button').hasClass ('button-open')) {
      $ ('.toggle-wrap').fadeOut(250);
      $ ('.overlay').toggleClass ('show');
      $ ('.overlay').fadeOut (500);
      $ ('.toggle-wrap').addClass ('toggle-wrap-relative');
      $ ('.menu-sidebar li > a.test').removeClass ('test');
      $ ('.toggle-wrap').fadeIn(250);
      $('body').css('overflow', 'auto');
      menuWrapper.classList.remove ('menu-show');
      menu.classList.remove ('button-open');

    } else {
      $ ('.toggle-wrap').hide();
      $ ('.overlay').toggleClass ('show');
      $('body').css('overflow', 'hidden');
      $ ('.overlay').fadeIn (250);
      $ ('.menu-sidebar li > a').each (function (index) {
        $ (this).delay (50 * index).queue (function () {
          $ (this).toggleClass ('test').dequeue ();
        });
        menuWrapper.classList.add ('menu-show');
        menu.classList.add ('button-open');
      });
      $ ('.toggle-wrap').removeClass ('toggle-wrap-relative');
      $ ('.toggle-wrap').delay(100).fadeIn(250);
    }
  }
  
  window.onload = function () {
    var menu = document.getElementById ('toggle-button');
    if (menu) {
      menu.addEventListener ('click', menuActive);
    }
  };
  