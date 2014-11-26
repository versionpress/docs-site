/// <reference path="jquery.d.ts" />

$(document).ready(() => {

    var h1Text = $('h1').text();

    var currentMenuItem = $('#sidebar #menu a[title="' + h1Text + '"]');
    currentMenuItem.addClass('current');

});