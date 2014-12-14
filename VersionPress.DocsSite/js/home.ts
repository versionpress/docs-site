/// <reference path="libs/jquery.d.ts" />
/// <reference path="libs/jquery.toc.d.ts" />
/// <reference path="libs/jquery.equalheights.d.ts" />
/// <reference path="libs/stickyfill.d.ts" />

$(document).ready(() => {


    //---------------------------------------------------------
    // Highlight the current node in the sidebar navigation
    //---------------------------------------------------------

    var h1Text = $('h1').text();

    var currentMenuItem = $('#sidebar #menu a[title="' + h1Text + '"]');
    currentMenuItem.addClass('current');


    //---------------------------------------------------------
    // Page Table of Contents
    //---------------------------------------------------------

    // generate ToC, see http://projects.jga.me/toc/

    $('#page-toc').toc({
        'selectors': 'h2,h3,h4,h5,h6',
        'container': '.main-content',
        'highlightOffset': 0
    });

    if ($('#page-toc li').length == 0) {

        $('#page-navigation').hide();

    } else {

        // make sidebar as high as the main content area for position:sticky to work
        // see https://github.com/mattbanks/jQuery.equalHeights

        function makeColsEqualHeight() {
            var cols = $('.main-content, #sidebar');
            cols.height('auto');
            cols.equalHeights();
        }

        setTimeout(makeColsEqualHeight, 200);
        $(window).resize(function () {
            makeColsEqualHeight();
        });

        // and also use sticky polyfill, see https://github.com/wilddeer/stickyfill
        $('#page-navigation').Stickyfill();

    }


    


});