import * as $ from 'jquery';
require('../public/less/style-docs.less');

window['jQuery'] = $;
window['$'] = $;

require('../public/js/libs/toc.min.js');
require('../public/js/libs/jquery.equalheights.min.js');
require('../public/js/libs/stickyfill.min.js');

$(document).ready(() => {

  // ---------------------------------------------------------
  // Highlight the current node in the sidebar navigation
  // ---------------------------------------------------------

  var h1Text = $('h1').text();

  var currentMenuItem = $('#sidebar #menu a[title="' + h1Text + '"]');
  currentMenuItem.addClass('current');

  // ---------------------------------------------------------
  // Page Table of Contents
  // ---------------------------------------------------------

  // Generate ToC, see http://projects.jga.me/toc/

  $('#page-toc').toc({
    'selectors': 'h2,h3,h4,h5,h6',
    'container': '.main-content',
    'highlightOffset': 0
  });

  if (typeof getUrlVars()['q'] !== 'undefined') {
    $('#search-box').val(decodeURIComponent(getUrlVars()['q'].replace(/\+/, '%20')));
  }

  // Add anchors to headings
  $('h2,h3,h4').each((index, el) => {
    let h = $(el);
    let icon = '<svg aria-hidden="true" class="octicon octicon-link" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path d="M4 9h1v1h-1c-1.5 0-3-1.69-3-3.5s1.55-3.5 3-3.5h4c1.45 0 3 1.69 3 3.5 0 1.41-0.91 2.72-2 3.25v-1.16c0.58-0.45 1-1.27 1-2.09 0-1.28-1.02-2.5-2-2.5H4c-0.98 0-2 1.22-2 2.5s1 2.5 2 2.5z m9-3h-1v1h1c1 0 2 1.22 2 2.5s-1.02 2.5-2 2.5H9c-0.98 0-2-1.22-2-2.5 0-0.83 0.42-1.64 1-2.09v-1.16c-1.09 0.53-2 1.84-2 3.25 0 1.81 1.55 3.5 3 3.5h4c1.45 0 3-1.69 3-3.5s-1.5-3.5-3-3.5z"></path></svg>';
    h.prepend('<a href="#' + h.attr('id') + '" class="anchor">' +
      icon +
      '</a>');
  });

  if ($('#page-toc li').length === 0) {

    $('#page-navigation').hide();

  } else {

    // Make sidebar as high as the main content area for position:sticky to work
    // See https://github.com/mattbanks/jQuery.equalHeights

    function makeColsEqualHeight() {
      var cols = $('.main-content, #sidebar');
      cols.height('auto');
      cols.equalHeights();
    }

    setTimeout(makeColsEqualHeight, 200);
    $(window).resize(function () {
      makeColsEqualHeight();
    });

    // And also use sticky polyfill, see https://github.com/wilddeer/stickyfill
    $('#page-navigation').Stickyfill();


  }

  function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
  }

  console.log('Docs site scripts loaded');

});
