// We love anonymous functions
(function(){

    "use strict";

    // Get library
    var jsCalendar = window.jsCalendar;

    // If jsCalendar is not loaded
    if (typeof jsCalendar === "undefined") {
        // If there is no language to load array
        if (typeof window.jsCalendar_language2load === "undefined") {
            window.jsCalendar_language2load = [];
        }
        // Wrapper to add language to load list
        jsCalendar = {
            addLanguage : function (language) {
                // Add language to load list
                window.jsCalendar_language2load.push(language);
            }
        };
    }

    // Add a new language
    jsCalendar.addLanguage({
        // Language code
        code : "ru",
        // Months of the year
        months : [
            "январь",
            "февраль",
            "март",
            "апрель",
            "май",
            "июнь",
            "июль",
            "август",
            "сентябрь",
            "октябрь",
            "ноябрь",
            "декабрь"
        ],
        // Days of the week
        days : [
            "воскресенье",
            "понедельник",
            "вторник",
            "среда",
            "четверг",
            "пятница",
            "суббота"
        ]
    });

})();

var jsCalendar=function(){function c(){0!==arguments.length&&this._construct(arguments)}c.version="v1.4.2";c.prototype._construct=function(a){a=this._parseArguments(a);this._init(a.options);this._setTarget(a.target);this._initTarget();this._setDate(a.date);this._create();this._update()};c.prototype.languages={en:{months:"January February March April May June July August September October November December".split(" "),days:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" ")}};c.prototype._init=
    function(a){this._elements={};this._events={};this._events.date=[];this._events.month=[];this._date=this._now=null;this._selected=[];this.language={};this._parseOptions(a)};c.prototype._parseArguments=function(a){var b={target:null,date:new Date,options:{}};if(0===a.length)throw Error("jsCalendar: No parameters were given.");if(1===a.length)if(("object"===typeof HTMLElement?a[0]instanceof HTMLElement:a[0])&&"object"===typeof a[0]&&null!==a[0]&&1===a[0].nodeType&&"string"===typeof a[0].nodeName||"string"===
    typeof a[0])b.target=a[0];else{b.options=a[0];if("undefined"!==typeof a[0].target)b.target=a[0].target;else throw Error("jsCalendar: Not target was given.");"undefined"!==typeof a[0].date&&(b.date=a[0].date)}else b.target=a[0],2<=a.length&&(b.date=a[1]),3<=a.length&&(b.options=a[2]);return b};c.prototype._parseOptions=function(a){this._options={language:"en",zeroFill:!1,monthFormat:"month",dayFormat:"D",firstDayOfTheWeek:1,navigator:!0,navigatorPosition:"both",min:!1,max:!1};"undefined"!==typeof a.zeroFill&&
(this._options.zeroFill="false"!==a.zeroFill&&a.zeroFill?!0:!1);"undefined"!==typeof a.monthFormat&&(this._options.monthFormat=a.monthFormat);"undefined"!==typeof a.dayFormat&&(this._options.dayFormat=a.dayFormat);"undefined"!==typeof a.navigator&&(this._options.navigator="false"!==a.navigator&&a.navigator?!0:!1);"undefined"!==typeof a.navigatorPosition&&(this._options.navigatorPosition=a.navigatorPosition);"string"===typeof a.language&&"undefined"!==typeof this.languages[a.language]&&(this._options.language=
    a.language);this.setLanguage(this._options.language);"undefined"!==typeof a.fdotw&&(a.firstDayOfTheWeek=a.fdotw);if("undefined"!==typeof a.firstDayOfTheWeek&&("number"===typeof a.firstDayOfTheWeek&&1<=a.firstDayOfTheWeek&&7>=a.firstDayOfTheWeek&&(this._options.firstDayOfTheWeek=a.firstDayOfTheWeek),"string"===typeof a.firstDayOfTheWeek))if(a.firstDayOfTheWeek.match(/^[1-7]$/))this._options.firstDayOfTheWeek=parseInt(a.firstDayOfTheWeek,10);else if(this._options.firstDayOfTheWeek=this.language.days.indexOf(a.firstDayOfTheWeek)+
    1,1>this._options.firstDayOfTheWeek||7<this._options.firstDayOfTheWeek)this._options.firstDayOfTheWeek=1;"undefined"!==typeof a.min&&"false"!==a.min&&!1!==a.min&&(this._options.min=this._parseDate(a.min));"undefined"!==typeof a.max&&"false"!==a.max&&!1!==a.max&&(this._options.max=this._parseDate(a.max))};c.prototype._setTarget=function(a){if(a=this._getElement(a))this._target=a;else throw Error("jsCalendar: Target was not found.");};c.prototype._getElement=function(a){if(!a)return null;if("string"===
    typeof a){if("#"===a[0])return document.getElementById(a.substring(1));if("."===a[0])return document.getElementsByClassName(a.substring(1))[0]}else if(a.tagName&&a.nodeName&&a.ownerDocument&&a.removeAttribute)return a;return null};c.prototype._initTarget=function(){0<this._target.className.length&&(this._target.className+=" ");this._target.className+="jsCalendar";this._elements.table=document.createElement("table");this._elements.head=document.createElement("thead");this._elements.table.appendChild(this._elements.head);
    this._elements.body=document.createElement("tbody");this._elements.table.appendChild(this._elements.body);this._target.appendChild(this._elements.table)};c.prototype._isDateInRange=function(a){if(!1===this._options.min&&!1===this._options.max)return!0;a=this._parseDate(a);return!1!==this._options.min&&this._options.min.getTime()>a.getTime()||!1!==this._options.max&&this._options.max.getTime()<a.getTime()?!1:!0};c.prototype._setDate=function(a){this._isDateInRange(a)&&(this._now=this._parseDate(a),
    this._date=new Date(this._now.getFullYear(),this._now.getMonth(),1))};c.prototype._parseDate=function(a){if("undefined"===typeof a||null===a||"now"===a)a=new Date;else if("string"===typeof a)if(a=a.replace(/-/g,"/").match(/^(\d{1,2})\/(\d{1,2})\/(\d{4,4})$/i),null!==a){var b=parseInt(a[2],10)-1;a=new Date(a[3],b,a[1]);if(!a||a.getMonth()!==b)throw Error("jsCalendar: Date does not exist.");}else throw Error("jsCalendar: Failed to parse date.");else if("number"===typeof a)a=new Date(a);else if(!(a instanceof
    Date))throw Error("jsCalendar: Invalid date.");return new Date(a.getTime())};c.prototype._parseToDateString=function(a,b){var d=this.language;return b.replace(/(MONTH|month|MMM|mmm|mm|m|MM|M|DAY|day|DDD|ddd|dd|d|DD|D|YYYY|yyyy)/g,function(b){switch(b){case "MONTH":case "month":return d.months[a.getMonth()];case "MMM":case "mmm":return d.months[a.getMonth()].substring(0,3);case "mm":return d.months[a.getMonth()].substring(0,2);case "m":return d.months[a.getMonth()].substring(0,1);case "MM":return(9>
a.getMonth()?"0":"")+(a.getMonth()+1);case "M":return a.getMonth()+1;case "DAY":case "day":return d.days[a.getDay()];case "DDD":case "ddd":return d.days[a.getDay()].substring(0,3);case "dd":return d.days[a.getDay()].substring(0,2);case "d":return d.days[a.getDay()].substring(0,1);case "DD":return(9>=a.getDate()?"0":"")+a.getDate();case "D":return a.getDate();case "YYYY":case "yyyy":return a.getYear()+1900}})};c.prototype._getVisibleMonth=function(a){a="undefined"===typeof a?this._date:this._parseDate(a);
    var b=new Date(a.getTime());b.setDate(1);var d=b.getDay()-(this._options.firstDayOfTheWeek-1);0>d&&(d+=7);var c=this.language,g=this._options.monthFormat.replace(/(MONTH|month|MMM|mmm|##|#|YYYY|yyyy)/g,function(a){switch(a){case "MONTH":case "month":return c.months[b.getMonth()];case "MMM":case "mmm":return c.months[b.getMonth()].substring(0,3);case "##":return(9>b.getMonth()?"0":"")+(b.getMonth()+1);case "#":return b.getMonth()+1;case "YYYY":case "yyyy":return b.getYear()+1900}});a=this._getVisibleDates(a);
    var h=(new Date(b.getYear()+1900,b.getMonth()+1,0)).getDate(),f=-1;b.getYear()===this._now.getYear()&&b.getMonth()===this._now.getMonth()&&(f=d+this._now.getDate()-1);return{name:g,days:a,start:d+1,current:f,end:d+h}};c.prototype._getVisibleDates=function(a){a="undefined"===typeof a?this._date:this._parseDate(a);var b=[],d=new Date(a.getTime());d.setDate(1);var c=d.getDay()-(this._options.firstDayOfTheWeek-1);0>c&&(c+=7);for(a=new Date(d.getTime());0<c;)a.setDate(a.getDate()-1),b.unshift(new Date(a.getTime())),
    c--;a=new Date(d.getTime());do b.push(new Date(a.getTime())),a.setDate(a.getDate()+1);while(1!==a.getDate());for(d=42-b.length;0<d;)b.push(new Date(a.getTime())),a.setDate(a.getDate()+1),d--;return b};c.prototype._create=function(){var a=this;this._elements.created=!0;this._elements.headRows=[];for(var b=0;2>b;b++)this._elements.headRows.push(document.createElement("tr")),this._elements.head.appendChild(this._elements.headRows[b]);b=document.createElement("th");b.setAttribute("colspan",7);this._elements.headRows[0].className=
    "jsCalendar-title-row";this._elements.headRows[0].appendChild(b);this._elements.headLeft=document.createElement("div");this._elements.headLeft.className="jsCalendar-title-left";b.appendChild(this._elements.headLeft);this._elements.month=document.createElement("div");this._elements.month.className="jsCalendar-title-name";b.appendChild(this._elements.month);this._elements.headRight=document.createElement("div");this._elements.headRight.className="jsCalendar-title-right";b.appendChild(this._elements.headRight);
    this._options.navigator&&(this._elements.navLeft=document.createElement("div"),this._elements.navLeft.className="jsCalendar-nav-left",this._elements.navRight=document.createElement("div"),this._elements.navRight.className="jsCalendar-nav-right","left"===this._options.navigatorPosition?(this._elements.headLeft.appendChild(this._elements.navLeft),this._elements.headLeft.appendChild(this._elements.navRight)):("right"===this._options.navigatorPosition?this._elements.headRight.appendChild(this._elements.navLeft):
        this._elements.headLeft.appendChild(this._elements.navLeft),this._elements.headRight.appendChild(this._elements.navRight)),this._elements.navLeft.addEventListener("click",function(b){a.previous();a._eventFire_monthChange(b,a._date)},!1),this._elements.navRight.addEventListener("click",function(b){a.next();a._eventFire_monthChange(b,a._date)},!1));this._elements.headRows[1].className="jsCalendar-week-days";b.className="jsCalendar-title";this._elements.days=[];for(b=0;7>b;b++){this._elements.days.push(document.createElement("th"));
        this._elements.headRows[1].appendChild(this._elements.days[this._elements.days.length-1]);var d=this.language.days[(b+this._options.firstDayOfTheWeek-1)%7];var c=this._options.dayFormat.replace(/(DAY|day|DDD|ddd|DD|dd|D)/g,function(a){switch(a){case "DAY":case "day":return d;case "DDD":case "ddd":return d.substring(0,3);case "DD":case "dd":return d.substring(0,2);case "D":return d.substring(0,1)}});this._elements.days[this._elements.days.length-1].textContent=c}this._elements.bodyRows=[];this._elements.bodyCols=
        [];for(b=0;6>b;b++)for(this._elements.bodyRows.push(document.createElement("tr")),this._elements.body.appendChild(this._elements.bodyRows[b]),c=0;7>c;c++)this._elements.bodyCols.push(document.createElement("td")),this._elements.bodyRows[b].appendChild(this._elements.bodyCols[7*b+c]),this._elements.bodyCols[7*b+c].addEventListener("click",function(b){return function(c){a._eventFire_dateClick(c,a._active[b])}}(7*b+c),!1)};c.prototype._selectDates=function(a){a=a.slice();for(var b=0;b<a.length;b++)a[b]=
    this._parseDate(a[b]),a[b].setHours(0,0,0,0),a[b]=a[b].getTime();for(b=a.length-1;0<=b;b--)0>this._selected.indexOf(a[b])&&this._selected.push(a[b])};c.prototype._unselectDates=function(a){a=a.slice();for(var b=0;b<a.length;b++)a[b]=this._parseDate(a[b]),a[b].setHours(0,0,0,0),a[b]=a[b].getTime();for(b=a.length-1;0<=b;b--){var c=this._selected.indexOf(a[b]);0<=c&&this._selected.splice(c,1)}};c.prototype._unselectAllDates=function(){for(;this._selected.length;)this._selected.pop()};c.prototype._update=
    function(){var a=this._getVisibleMonth(this._date);this._active=a.days.slice();this._elements.month.textContent=a.name;var b="";this._options.zeroFill&&(b="0");for(var c,e=a.days.length-1;0<=e;e--)c=a.days[e].getDate(),this._elements.bodyCols[e].textContent=10>c?b+c:c,0<=this._selected.indexOf(a.days[e].getTime())?this._elements.bodyCols[e].className="jsCalendar-selected":this._elements.bodyCols[e].removeAttribute("class");for(e=0;e<a.start-1;e++)this._elements.bodyCols[e].className="jsCalendar-previous";
        0<=a.current&&(this._elements.bodyCols[a.current].className=0<this._elements.bodyCols[a.current].className.length?this._elements.bodyCols[a.current].className+" jsCalendar-current":"jsCalendar-current");for(e=a.end;e<a.days.length;e++)this._elements.bodyCols[e].className="jsCalendar-next"};c.prototype._eventFire_dateClick=function(a,b){for(var c=0;c<this._events.date.length;c++)(function(c){setTimeout(function(){c(a,new Date(b.getTime()))},0)})(this._events.date[c])};c.prototype._eventFire_monthChange=
    function(a,b){var c=new Date(b.getTime());c.setDate(1);for(var e=0;e<this._events.month.length;e++)(function(b){setTimeout(function(){b(a,new Date(c.getTime()))},0)})(this._events.month[e])};c.prototype.onDateClick=function(a){if("function"===typeof a)this._events.date.push(a);else throw Error("jsCalendar: Invalid callback function.");return this};c.prototype.onMonthChange=function(a){if("function"===typeof a)this._events.month.push(a);else throw Error("jsCalendar: Invalid callback function.");return this};
    c.prototype.set=function(a){this._setDate(a);this.refresh();return this};c.prototype.min=function(a){this._options.min=a?this._parseDate(a):!1;this.refresh();return this};c.prototype.max=function(a){this._options.max=a?this._parseDate(a):!1;this.refresh();return this};c.prototype.refresh=function(a){"undefined"!==typeof a&&this._isDateInRange(a)&&(this._date=this._parseDate(a));!0===this._elements.created&&this._update();return this};c.prototype.next=function(a){"number"!==typeof a&&(a=1);a=new Date(this._date.getFullYear(),
        this._date.getMonth()+a,1);if(!this._isDateInRange(a))return this;this._date=a;this.refresh();return this};c.prototype.previous=function(a){"number"!==typeof a&&(a=1);a=new Date(this._date.getFullYear(),this._date.getMonth()-a,1);if(!this._isDateInRange(a))return this;this._date=a;this.refresh();return this};c.prototype["goto"]=function(a){this.refresh(a);return this};c.prototype.reset=function(){this.refresh(this._now);return this};c.prototype.select=function(a){if("undefined"===typeof a)return this;
        a instanceof Array||(a=[a]);this._selectDates(a);this.refresh();return this};c.prototype.unselect=function(a){if("undefined"===typeof a)return this;a instanceof Array||(a=[a]);this._unselectDates(a);this.refresh();return this};c.prototype.clearselect=function(){this._unselectAllDates();this.refresh();return this};c.prototype.clearSelected=c.prototype.clearselect;c.prototype.getSelected=function(a){"object"!==typeof a&&(a={});var b=this._selected.slice();a.sort&&(!0===a.sort?b.sort():"string"===typeof a.sort&&
        ("asc"===a.sort.toLowerCase()?b.sort():"desc"===a.sort.toLowerCase()&&(b.sort(),b.reverse())));if(a.type&&"string"===typeof a.type){var c;if("date"===a.type.toLowerCase())for(c=b.length-1;0<=c;c--)b[c]=new Date(b[c]);else if("timestamp"!==a.type.toLowerCase())for(c=b.length-1;0<=c;c--)b[c]=this._parseToDateString(new Date(b[c]),a.type)}return b};c.prototype.isSelected=function(a){if("undefined"===typeof a||null===a)return!1;a=this._parseDate(a);a.setHours(0,0,0,0);a=a.getTime();return 0<=this._selected.indexOf(a)?
        !0:!1};c.prototype.isVisible=function(a){if("undefined"===typeof a||null===a)return!1;a=this._parseDate(a);a.setHours(0,0,0,0);a=a.getTime();var b=this._getVisibleDates();return b[0].getTime()<=a&&b[b.length-1].getTime()>=a?!0:!1};c.prototype.isInMonth=function(a){if("undefined"===typeof a||null===a)return!1;a=this._parseDate(a);a.setHours(0,0,0,0);a.setDate(1);var b=this._parseDate(this._date);b.setHours(0,0,0,0);b.setDate(1);return a.getTime()===b.getTime()?!0:!1};c.prototype.setLanguage=function(a){if("string"!==
        typeof a)throw Error("jsCalendar: Invalid language code.");if("undefined"===typeof this.languages[a])throw Error("jsCalendar: Language not found.");this._options.language=a;this.language.months=this.languages[this._options.language].months;this.language.days=this.languages[this._options.language].days;this.refresh();return this};c.autoFind=function(){for(var a=document.getElementsByClassName("auto-jsCalendar"),b,c=0;c<a.length;c++)if("true"!==a[c].getAttribute("jsCalendar-loaded")){a[c].setAttribute("jsCalendar-loaded",
        "true");b={};for(var e in a[c].dataset)b[e]=a[c].dataset[e];b.target=a[c];new jsCalendar(b)}};c.tools={};c.tools.parseDate=function(){return c.prototype._parseDate.apply({},arguments)};c.tools.stringToDate=c.tools.parseDate;c.tools.dateToString=function(a,b,d){var e=c.prototype.languages;d&&e.hasOwnProperty(d)||(d="en");return c.prototype._parseToDateString.apply({language:e[d]},[a,b])};c["new"]=function(){var a=new c;a._construct(arguments);return a};c.addLanguage=function(a){if("undefined"===typeof a)throw Error("jsCalendar: No language object was given.");
        if("string"!==typeof a.code)throw Error("jsCalendar: Invalid language code.");if(!(a.months instanceof Array))throw Error("jsCalendar: Invalid language months.");if(12!==a.months.length)throw Error("jsCalendar: Invalid language months length.");if(!(a.days instanceof Array))throw Error("jsCalendar: Invalid language days.");if(7!==a.days.length)throw Error("jsCalendar: Invalid language days length.");c.prototype.languages[a.code]={months:a.months.slice(),days:a.days.slice()}};(function(){if("undefined"!==
        typeof window.jsCalendar_language2load){for(;window.jsCalendar_language2load.length;)setTimeout(function(a){return function(){c.addLanguage(a)}}(window.jsCalendar_language2load.pop()),0);delete window.jsCalendar_language2load}})();return c}();(function(){window.addEventListener("load",function(){jsCalendar.autoFind()},!1)})();

const InfiniteScroll = require('infinite-scroll');
const jQueryBridget = require('jquery-bridget');
jQueryBridget( 'infiniteScroll', InfiniteScroll, $ );
const Blazy = require('blazy');

require('../dev/libs/helloweek/helloweek.min.js');
require('../dev/libs/owl-carousel/owl.carousel.min.js');
require('../dev/libs/simplebar/dist/simplebar.min.js');
// require('../dev/libs/share2/share2.js');

$(document).ready(function () {
    'use strict';

    document.querySelectorAll('.infinite-scroll')
        .forEach(item => {
            let IFcontainer = new InfiniteScroll(item, {
                path: () => {
                    return $('#inf-load-next a').attr('href');
                },
                append: item.dataset.itemselector,
                history: false,
                // responseType: 'text',
                // append: false
            });

            /*IFcontainer.on('load', function( response, path ) {
                $(IFcontainer).append(response);
                blazy.revalidate();
            });*/

            IFcontainer.on('append', (response, path, items) => {
                items.forEach(item => {
                    item.querySelectorAll('use').forEach(u => u.replaceWith(u.cloneNode()));
                });
                blazy.revalidate();
            });

            IFcontainer.on('load', function( response, path ) {
                let $response = $(response),
                    nextPath = '#inf-load-next a';

                if ($response.find(nextPath).length) {
                    $(nextPath).attr('href', $response.find(nextPath).attr('href'));
                } else {
                    IFcontainer.destroy();
                }
            });

            /*Из-за того что мы получаем ответ как документ, то спрайты не отрисовуються, если
            есть спрайты, используй load event, если нету, то append event и убери responseType text И append false */
        });

    let blazy = new Blazy({
        loadInvisible: true,
        successClass: 'lazy--loaded',
        success: element => {
            if (element.tagName === 'IMG') element.parentNode.classList.add('lazy-container--loaded');
        }
    });

    function checkScrollbar() {
        var el = $('<div style="width:100px;height:100px;overflow:scroll;position:absolute;top:-9999px;"/>'),
            elDom = el.get(0);

        el.appendTo('body');

        if (elDom.offsetWidth !== elDom.clientWidth) {
            $('.page__wrapper').addClass('page__wrapper--has-scrollbar');
        }

        el.remove();
    }

    checkScrollbar();

    let body = $('body');

    function freezePage() {
        $('html, body').addClass('freezed');
    }

    function unfreezePage() {
        $('html, body').removeClass('freezed');
    }

    function toggleFreezePage() {
        $('html, body').toggleClass('freezed');
    }

    let heroSlider = $('.slider').owlCarousel({
        items: 1,
        lazyLoad: true,
        dots: false,
        nav: true,
        autoplay: true,
        smartSpeed: 400,
        autoplayHoverPause: true,
        navText: [
            '<svg class="svg-icon" role="img" title="Previous slide"><use xlink:href="/bundles/frontend/img/icons/svg/sprite.symbol.svg#arrow-thin-left"></use></svg>',
            '<svg class="svg-icon" role="img" title="Next slide"><use xlink:href="/bundles/frontend/img/icons/svg/sprite.symbol.svg#arrow-thin-right"></use></svg>']
    });
    heroSlider.trigger('refresh.owl.carousel');

    $('body').on('click', '.hero-slider .hero', function() { $(this).attr('data-href') && (location = $(this).attr('data-href')) });

    $('.js-nav-open').click(() => {
        $('.page-header__nav').addClass('page-header__nav--visible');
        $('#mnu-overlay').addClass('mnu-overlay--show');
        freezePage();
    });

    $('.js-nav-close').click(() => {
        $('.page-header__nav').removeClass('page-header__nav--visible');
        $('#mnu-overlay').removeClass('mnu-overlay--show');
        unfreezePage();
    });

    $('#mnu-overlay').click(() => {
        $('.page-header__nav').removeClass('page-header__nav--visible');
        $('#mnu-overlay').removeClass('mnu-overlay--show');
        unfreezePage();
    });

    let selectedQuiz = window.localStorage.getItem('selected-quiz'),
        selectedForm = $('form[data-id="' + window.localStorage.getItem('form-quiz') + '"]');

    if (selectedForm.length === 0) {
        localStorage.removeItem('prev-quiz');
        localStorage.removeItem('selected-quiz');
        localStorage.removeItem('form-quiz');
        localStorage.removeItem('shipped-quiz');
        $('.quiz__submit').removeAttr('disabled');
        $('.quiz__form').removeClass('quiz__form--disabled');
    } else {
        if (selectedQuiz) {
            selectedForm.find(' .quiz__input#' + selectedQuiz + '')
                .prop('checked', 'checked');
            $('.quiz__stats').removeClass('quiz__stats--disabled');
        } else {
            $('.quiz__form').removeClass('quiz__form--disabled');
        }
    }

    let quizOptions = $('label.quiz__container'),
        quizInAjax = false;

    $.each(quizOptions, function () {
        $(this).on('click', function (e) {
            if (quizInAjax) {
                e.preventDefault();
                return;
            }

            localStorage.setItem('selected-quiz', $(this).find('input').attr('id'));
            localStorage.setItem('form-quiz', $(this).parent('form').data('id'));

            if ( !(localStorage.getItem('shipped-quiz') === $(this).find('input').attr('id')) ) {
                validateQuizSubmit();
            }

            $.each(quizOptions, function () {
                $(this).find('input').prop('checked', false);
            });

            $(this).find('input').prop('checked', true);
        });
    });

    $('#quiz__form').on('submit', function(e) {
        if ($(this).attr('disabled'))
            return;
        e.preventDefault();
        var $form = $(this);

        quizInAjax = true;
        $('.quiz__submit').attr('disabled', 'disabled');
        $.ajax({
            url: $form.attr('action'),
            data: {
                // increment: $('label.quiz__container input:checked').attr('id'),
                // decrement: localStorage.getItem('shipped-quiz')
                quiz_option_id: $('label.quiz__container input:checked').val()
            },
            method: 'POST',
            error: function (err, e, i) {
                alert('Не удалось отправить ваш голос, попробуйте позже');
            },
            complete: function (res) {
                quizInAjax = false;

                validateQuizSubmit();
            },
            success: function (res) {
                if (typeof res === "string") res = JSON.parse(res);
                $('.quiz').html($(res.results).html());
                $.each($('.quiz__progress'), function() { $(this).css('width', $(this).attr('data-prc')) });
            }
        });
    });

    function validateQuizSubmit() {
        if (localStorage.getItem('selected-quiz') !==
            localStorage.getItem('shipped-quiz')) {
            $('.quiz__submit').removeAttr('disabled');
        } else {
            $('.quiz__submit').attr('disabled', 'disabled');
        }
    }

    $.each($('.quiz__progress'), function() { $(this).css('width', $(this).attr('data-prc')) });

    // var element = document.getElementById("calendar");
    // jsCalendar.new(element, "30/01/2017", {
    // 	language : "ru"
    // });

    $('.hide-show__toggle').click(function () {
        let content = $(this).siblings('.hide-show__content')
            .get(0);

        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + 'px';
        }
    });

    let headerSearchTimeout = null;

    $('.search__btn').on('click', function () {
        let search = $(this).closest('.search');

        search.find('.search__input')
            .toggleClass('search__input--active');

        if ($(this).hasClass('search__btn--active')) {
            search.removeClass('search--results-visible');

            search.find('.search__input')
                .blur();
        }


        $(this).toggleClass('search__btn--active');
    });

    $('.page-header__search-form').on('click', '.search__btn', function () {
        let pageHeader = $('.page-header');

        clearTimeout(headerSearchTimeout);

        if ($(this).hasClass('search__btn--active')) {
            pageHeader.addClass('page-header--search-opened');
        } else {
            headerSearchTimeout = setTimeout(function () {
                pageHeader.removeClass('page-header--search-opened')
            }, 800);
        }
    })

    if(document.querySelector(".instagram-media")) {
        console.log('instagram loaded');
        var tag = document.createElement('script');
        tag.src = "//www.instagram.com/embed.js";
        tag.defer = true;
        tag.async = true;
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    let searchForm = (() => {
        let container = $('.search'),
            itemsContainer = container.find('.search__items'),
            timeout;

        let init = () => {
            container.on('keyup', () => {
                clearTimeout(timeout);

                timeout = setTimeout(sendAjax, 500);
            });
        };

        function sendAjax(data) {
            $.ajax({
                url: container.data('url'),
                type: 'POST',
                dataType: 'html',
                data: container.serialize(),
                success: items => {
                    container.addClass('search--results-visible');
                    itemsContainer.html('')
                        .html(items);
                }
            });
        }

        return {
            init: init
        }
    })();
    searchForm.init();

    // let shareEl = document.getElementById('single-news__share');

    // Ya.share2(shareEl, {
    //     content: {
    //         url: document.getElementById('share-url')
    //             .getAttribute('value'),
    //         title: document.getElementById('share-title')
    //             .getAttribute('value'),
    //         description: document.getElementById('share-descr')
    //             .getAttribute('value'),
    //         image: document.getElementById('share-image')
    //             .getAttribute('value')
    //     },
    //     theme: {services: 'facebook,vkontakte,odnoklassniki'}
    // });
});

function findVideos() {
  const videos = document.querySelectorAll(".video[data-lazy='true']");

  for (let video of videos) {
    setupVideo(video);
  }
}

function setupVideo(video) {
  const inner = video.querySelector(".video__inner");
  const link = video.querySelector(".video__link");
  const media = video.querySelector(".video__media");
  const button = video.querySelector(".video__button");
  const id = parseMediaURL(media);

  video.addEventListener("click", () => {
    let iframe = createIframe(id);

    if (!isDesktop()) {
      iframe.onload = () =>
        (video.querySelector(".video__hint").innerHTML = video.dataset.hint);
    }

    link.remove();
    button.remove();
    inner.appendChild(iframe);
  });

  link.removeAttribute("href");
  video.classList.add("video--enabled");
}

function parseMediaURL(media) {
  let regexp = /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/hqdefault\.jpg/i;
  let url = media.src;
  let match = url.match(regexp);

  return match[1];
}

function createIframe(id) {
  let iframe = document.createElement("iframe");

  iframe.setAttribute("allowfullscreen", "");
  iframe.setAttribute("allow", "autoplay");
  iframe.setAttribute("src", generateURL(id));
  iframe.classList.add("video__media");

  return iframe;
}

function generateURL(id) {
  let query = "?rel=0&showinfo=0&autoplay=1";

  return "https://www.youtube.com/embed/" + id + query;
}

function isDesktop() {
  return window.matchMedia("(min-width: 992px)").matches;
}

findVideos();