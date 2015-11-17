"use strict";!function(e,t){"function"==typeof define&&define.amd?define(["jquery","moment"],t):"object"==typeof exports?module.exports=t(require("jquery"),require("moment")):e.Calendar=t(jQuery,moment)}(this,function(e,t){function a(a){var s=this;this.calIsOpen=!1,this.presetIsOpen=!1,this.sameDayRange=a.same_day_range||!1,this.element=a.element||e(".daterange"),this.selected=null,this.type=this.element.hasClass("daterange--single")?"single":"double",this.preset_left=a.preset_left||!1,this.format=a.format||{},this.format.input=a.format&&a.format.input||"MMMM D, YYYY",this.format.preset=a.format&&a.format.preset||"ll",this.format.jump_month=a.format&&a.format.jump_month||"MMMM",this.format.jump_year=a.format&&a.format.jump_year||"YYYY",this.days_array=a.days_array&&7==a.days_array.length?a.days_array:["S","M","T","W","T","F","S"],this.earliest_date=a.earliest_date?t(new Date(a.earliest_date)).startOf("day"):t(new Date("January 1, 1900")).startOf("day"),this.latest_date=a.latest_date?t(new Date(a.latest_date)).endOf("day"):t(new Date("December 31, 2900")).endOf("day"),this.end_date=a.end_date?new Date(a.end_date):"double"==this.type?new Date:null,this.start_date=a.start_date?new Date(a.start_date):"double"==this.type?new Date(t(this.end_date).subtract(1,"month")):null,this.current_date=a.current_date?new Date(a.current_date):"single"==this.type?new Date:null,this.callback=a.callback||this.calendarSetDates,this.callback_form=a.callback_form||this.element.find("form"),this.loading_indicator=a.loading_indicator||e(".loading-indicator"),this.calendarHTML(this.type),e(".dr-presets",this.element).click(function(){s.presetToggle()}),e(".dr-list-item",this.element).click(function(){var t=e(".dr-item-aside",this).data("start"),a=e(".dr-item-aside",this).data("end");s.start_date=s.calendarCheckDate(t),s.end_date=s.calendarCheckDate(a),s.calendarSetDates(),s.presetToggle(),s.calendarSaveDates()}),e(".dr-date",this.element).on({click:function(){s.calendarOpen(this)},keyup:function(e){9!=e.keyCode||s.calIsOpen||s.start_date||s.end_date||s.calendarOpen(this)},keydown:function(a){switch(a.keyCode){case 9:e(s.selected).hasClass("dr-date-start")?(a.preventDefault(),s.calendarCheckDates(),s.calendarSetDates(),e(".dr-date-end",s.element).trigger("click")):(s.calendarCheckDates(),s.calendarSetDates(),s.calendarSaveDates(),s.calendarClose("force"));break;case 13:a.preventDefault(),s.calendarCheckDates(),s.calendarSetDates(),s.calendarSaveDates(),s.calendarClose("force");break;case 27:s.calendarSetDates(),s.calendarClose("force");break;case 38:a.preventDefault();var r="day";a.shiftKey&&(r="week"),a.metaKey&&(r="month");var d=t(s.current_date).subtract(1,r);e(this).html(d.format(s.format.input)),s.current_date=d._d;break;case 40:a.preventDefault();var r="day";a.shiftKey&&(r="week"),a.metaKey&&(r="month");var i=t(s.current_date).add(1,r);e(this).html(i.format(s.format.input)),s.current_date=i._d}}}),e(".dr-month-switcher i",this.element).click(function(){var a=e(".dr-month-switcher span",s.element).data("month"),r=e(".dr-year-switcher span",s.element).data("year"),d=t([r,a,1]),i=d.clone().subtract(1,"month"),n=d.clone().add(1,"month").startOf("day");e(this).hasClass("dr-left")?s.calendarOpen(s.selected,i):e(this).hasClass("dr-right")&&s.calendarOpen(s.selected,n)}),e(".dr-year-switcher i",this.element).click(function(){var a=e(".dr-month-switcher span",s.element).data("month"),r=e(".dr-year-switcher span",s.element).data("year"),d=t([r,a,1]),i=d.clone().subtract(1,"year"),n=d.clone().add(1,"year").startOf("day");e(this).hasClass("dr-left")?s.calendarOpen(s.selected,i):e(this).hasClass("dr-right")&&s.calendarOpen(s.selected,n)}),e(".dr-dates-dash",this.element).click(function(){e(".dr-date-start",s.element).trigger("click")}),e(this.element).click(function(t){e("html").one("click",function(){s.presetIsOpen&&s.presetToggle(),s.calIsOpen&&(e(s.selected).hasClass("dr-date-end")&&s.calendarSaveDates(),s.calendarSetDates(),s.calendarClose("force"))}),t.stopPropagation()}),e(this.element).add(".dr-date",this.element).focus(function(t){e(window).one("click",function(){s.calIsOpen&&(s.calendarSetDates(),s.calendarClose("force"))}),t.stopPropagation()})}return a.prototype.presetToggle=function(){0==this.presetIsOpen?(this.presetIsOpen=!0,this.presetCreate()):this.presetIsOpen&&(this.presetIsOpen=!1),1==this.calIsOpen&&this.calendarClose(),e(".dr-preset-list",this.element).slideToggle(200),e(".dr-input",this.element).toggleClass("dr-active"),e(".dr-presets",this.element).toggleClass("dr-active")},a.prototype.presetCreate=function(){var a,s=this,r=this.latest_date,d=t(r).endOf("month"),i=d.isSame(r);e(".dr-list-item",this.element).each(function(){var n=e(this).data("months");return i||(d=t(r).subtract(1,"month").endOf("month").startOf("day")),"number"==typeof n?(a=t(r).subtract(i?n-1:n,"month").startOf("month"),12==n&&(a=t(r).subtract(i?11:12,"month").startOf("month").startOf("day"))):"all"==n?(a=t(s.earliest_date),d=t(s.latest_date)):"7days"==n?(a=t(s.latest_date).subtract(7,"day"),d=t(s.latest_date)):"30days"==n&&(a=t(s.latest_date).subtract(29,"day"),d=t(s.latest_date)),a.isBefore(s.earliest_date)?e(this).remove():void e(".dr-item-aside",this).data("start",a.toISOString()).data("end",d.toISOString()).html(a.format(s.format.preset)+" &ndash; "+d.format(s.format.preset))})},a.prototype.calendarSetDates=function(){if(e(".dr-date-start",this.element).html(t(this.start_date).format(this.format.input)),e(".dr-date-end",this.element).html(t(this.end_date).format(this.format.input)),!this.start_date&&!this.end_date){var a=e(".dr-date",this.element).html(),s=t(this.current_date).format(this.format.input);a!=s&&e(".dr-date",this.element).html(s)}},a.prototype.calendarSaveDates=function(){return this.callback()},a.prototype.calendarCheckDate=function(a){var s=/(?!<=\d)(st|nd|rd|th)/,r=a?a.replace(s,"").split(" "):[];if(("today"==a||"now"==a)&&(a=t().isAfter(this.latest_date)?this.latest_date:t()),"earliest"==a&&(a=this.earliest_date),"latest"==a&&(a=this.latest_date),!a||-1==a.toString().indexOf("ago")&&-1==a.toString().indexOf("ahead")||(a=this.stringToDate(a)),2==r.length&&(r.push(t().format(this.display_year_format)),a=r.join(" ")),a&&"string"==e.type(a)){var d=t(a,this.format.input);d.isValid()&&(a=d)}return new Date(a)},a.prototype.calendarCheckDates=function(){var a=e(".dr-date-start",this.element).html(),s=e(".dr-date-end",this.element).html(),r=e(this.selected).html();return"ytd"==a||"ytd"==s?(a=t().startOf("year"),s=t().isAfter(this.latest_date)?this.latest_date:t()):(a=this.calendarCheckDate(a),s=this.calendarCheckDate(s)),r=this.calendarCheckDate(r),t(r).isSame(a)&&t(a).isAfter(s)&&(s=t(a).add(6,"day")),t(r).isSame(s)&&t(s).isBefore(a)&&(a=t(s).subtract(6,"day")),(t(s).isBefore(this.earliest_date)||t(a).isBefore(this.earliest_date))&&(a=t(this.earliest_date),s=t(this.earliest_date).add(6,"day")),(t(s).isAfter(this.latest_date)||t(a).isAfter(this.latest_date))&&(a=t(this.latest_date).subtract(6,"day"),s=t(this.latest_date)),t(a).isSame(s)&&!this.sameDayRange?this.calendarSetDates():(this.start_date="Invalid Date"==a?this.start_date:a,this.end_date="Invalid Date"==s?this.end_date:s,void(this.current_date="Invalid Date"==r?this.current_date:r))},a.prototype.stringToDate=function(e){var a=e.split(" ");return"ago"==a[2]?t(this.current_date).subtract(a[0],a[1]):"ahead"==a[2]?t(this.current_date).add(a[0],a[1]):this.current_date},a.prototype.calendarOpen=function(a,s){var r,d=this,i=e(".dr-dates",this.element).innerWidth()-8;this.selected=a||this.selected,1==this.presetIsOpen&&this.presetToggle(),1==this.calIsOpen&&this.calendarClose(s?"switcher":void 0),this.calendarCheckDates(),this.calendarCreate(s),this.calendarSetDates();var n=t(s||this.current_date).add(1,"month").startOf("month").startOf("day"),l=t(s||this.current_date).subtract(1,"month").endOf("month"),c=t(s||this.current_date).add(1,"year").startOf("month").startOf("day"),h=t(s||this.current_date).subtract(1,"year").endOf("month"),o=t(s||this.current_date);e(".dr-month-switcher span",this.element).data("month",o.month()).html(o.format(this.format.jump_month)),e(".dr-year-switcher span",this.element).data("year",o.year()).html(o.format(this.format.jump_year)),e(".dr-switcher i",this.element).removeClass("dr-disabled"),n.isAfter(this.latest_date)&&e(".dr-month-switcher .dr-right",this.element).addClass("dr-disabled"),l.isBefore(this.earliest_date)&&e(".dr-month-switcher .dr-left",this.element).addClass("dr-disabled"),c.isAfter(this.latest_date)&&e(".dr-year-switcher .dr-right",this.element).addClass("dr-disabled"),h.isBefore(this.earliest_date)&&e(".dr-year-switcher .dr-left",this.element).addClass("dr-disabled"),e(".dr-day",this.element).on({mouseenter:function(){function a(a){r=void 0,d.range(42).forEach(function(i){var n=s.next().data("date"),l=s.prev().data("date"),c=s.data("date");if(!c)return!1;if(l||(l=c),n||(n=c),"start"==a){if(t(n).isSame(d.end_date)||d.sameDayRange&&t(c).isSame(d.end_date))return!1;if(t(c).isAfter(d.end_date)&&(r=r||t(c).add(6,"day").startOf("day"),i>5||(n?t(n).isAfter(d.latest_date):!1)))return e(s).addClass("dr-end"),r=t(c),!1;s=s.next().addClass("dr-maybe")}else if("end"==a){if(t(l).isSame(d.start_date)||d.sameDayRange&&t(c).isSame(d.start_date))return!1;if(t(c).isBefore(d.start_date)&&(r=r||t(c).subtract(6,"day"),i>5||(l?t(l).isBefore(d.earliest_date):!1)))return e(s).addClass("dr-start"),r=t(c),!1;s=s.prev().addClass("dr-maybe")}})}var s=e(this);t(d.start_date),t(d.end_date),t(d.current_date);e(d.selected).hasClass("dr-date-start")&&(s.addClass("dr-hover dr-hover-before"),e(".dr-start",d.element).css({border:"none","padding-left":"0.3125rem"}),a("start")),e(d.selected).hasClass("dr-date-end")&&(s.addClass("dr-hover dr-hover-after"),e(".dr-end",d.element).css({border:"none","padding-right":"0.3125rem"}),a("end")),d.start_date||d.end_date||s.addClass("dr-maybe"),e(".dr-selected",d.element).css("background-color","transparent")},mouseleave:function(){e(this).hasClass("dr-hover-before dr-end")&&e(this).removeClass("dr-end"),e(this).hasClass("dr-hover-after dr-start")&&e(this).removeClass("dr-start"),e(this).removeClass("dr-hover dr-hover-before dr-hover-after"),e(".dr-start, .dr-end",d.element).css({border:"",padding:""}),e(".dr-maybe:not(.dr-current)",d.element).removeClass("dr-start dr-end"),e(".dr-day",d.element).removeClass("dr-maybe"),e(".dr-selected",d.element).css("background-color","")},mousedown:function(){var a=e(this).data("date"),s=t(a).format(d.format.input);r&&e(".dr-date",d.element).not(d.selected).html(r.format(d.format.input)),e(d.selected).html(s),d.calendarOpen(d.selected),e(d.selected).hasClass("dr-date-start")?e(".dr-date-end",d.element).trigger("click"):(d.calendarSaveDates(),d.calendarClose("force"))}}),e(".dr-calendar",this.element).css("width",i).slideDown(200),e(".dr-input",this.element).addClass("dr-active"),e(a).addClass("dr-active").focus(),e(this.element).addClass("dr-active"),this.calIsOpen=!0},a.prototype.calendarClose=function(t){var a=this;return!this.calIsOpen||this.presetIsOpen||"force"==t?e(".dr-calendar",this.element).slideUp(200,function(){e(".dr-day",a.element).remove()}):e(".dr-day",this.element).remove(),"switcher"==t?!1:(e(".dr-input, .dr-date",this.element).removeClass("dr-active"),e(this.element).removeClass("dr-active"),void(this.calIsOpen=!1))},a.prototype.calendarCreate=function(t){var a=this,s=this.calendarArray(this.start_date,this.end_date,this.current_date,t);s.forEach(function(t,s){var r="dr-day";t.fade&&(r+=" dr-fade"),t.start&&(r+=" dr-start"),t.end&&(r+=" dr-end"),t.current&&(r+=" dr-current"),t.selected&&(r+=" dr-selected"),t.outside&&(r+=" dr-outside"),e(".dr-day-list",a.element).append('<li class="'+r+'" data-date="'+t.date+'">'+t.str+"</li>")})},a.prototype.calendarArray=function(e,a,s,r){var d=this;s=s||e||a;var i=t(r||s).startOf("month"),n=t(r||s).endOf("month"),l={start:{day:+i.format("d"),str:+i.format("D")},end:{day:+n.format("d"),str:+n.format("D")}},c=void 0,h=this.range(l.start.day).map(function(){return void 0==c&&(c=t(i)),c=c.subtract(1,"day"),{str:+c.format("D"),start:c.isSame(e),end:c.isSame(a),current:c.isSame(s),selected:c.isBetween(e,a),date:c.toISOString(),outside:c.isBefore(d.earliest_date),fade:!0}}).reverse(),o=42-(l.end.str+h.length);c=void 0;var m=this.range(o).map(function(){return void 0==c&&(c=t(n)),c=c.add(1,"day").startOf("day"),{str:+c.format("D"),start:c.isSame(e),end:c.isSame(a),current:c.isSame(s),selected:c.isBetween(e,a),date:c.toISOString(),outside:c.isAfter(d.latest_date),fade:!0}});c=void 0;var f=this.range(l.end.str).map(function(){return c=void 0==c?t(i):c.add(1,"day").startOf("day"),{str:+c.format("D"),start:c.isSame(e),end:c.isSame(a),current:c.isSame(s),selected:c.isBetween(e,a),date:c.toISOString(),outside:c.isBefore(d.earliest_date)||c.isAfter(d.latest_date),fade:!1}});return h.concat(f,m)},a.prototype.calendarHTML=function(a){var s=e('<ul class="dr-days-of-week-list"></ul>');if(e.each(this.days_array||t.weekdaysMin(),function(e,t){s.append('<li class="dr-day-of-week">'+t+"</li>")}),"double"==a){var r,d='<div class="dr-presets"><span class="dr-preset-bar"></span><span class="dr-preset-bar"></span><span class="dr-preset-bar"></span></div>',i='<div class="dr-dates"><div class="dr-date dr-date-start" contenteditable>'+t(this.start_date).format(this.format.input)+'</div><span class="dr-dates-dash">&ndash;</span><div class="dr-date dr-date-end" contenteditable>'+t(this.end_date).format(this.format.input)+"</div></div>";return r=this.preset_left?'<div class="dr-input">'+d+i+"</div>":'<div class="dr-input">'+i+d+"</div>",this.element.append(r+'<div class="dr-selections"><div class="dr-calendar" style="display: none;"><div class="dr-range-switcher"><div class="dr-switcher dr-month-switcher"><i class="dr-left"></i><span>April</span><i class="dr-right"></i></div><div class="dr-switcher dr-year-switcher"><i class="dr-left"></i><span>2015</span><i class="dr-right"></i></div></div>'+s[0].outerHTML+'<ul class="dr-day-list"></ul></div><ul class="dr-preset-list" style="display: none;"><li class="dr-list-item" data-months="7days">Last 7 days <span class="dr-item-aside"></span></li><li class="dr-list-item" data-months="30days">Last 30 days <span class="dr-item-aside"></span></li><li class="dr-list-item" data-months="3">Last 3 months <span class="dr-item-aside"></span></li><li class="dr-list-item" data-months="6">Last 6 months <span class="dr-item-aside"></span></li><li class="dr-list-item" data-months="12">Last year <span class="dr-item-aside"></span></li><li class="dr-list-item" data-months="all">All time <span class="dr-item-aside"></span></li></ul></div>')}return this.element.append('<div class="dr-input"><div class="dr-dates"><div class="dr-date" contenteditable>'+t(this.current_date).format(this.format.input)+'</div></div></div><div class="dr-selections"><div class="dr-calendar" style="display: none;"><div class="dr-range-switcher"><div class="dr-switcher dr-month-switcher"><i class="dr-left"></i><span></span><i class="dr-right"></i></div><div class="dr-switcher dr-year-switcher"><i class="dr-left"></i><span></span><i class="dr-right"></i></div></div>'+s[0].outerHTML+'<ul class="dr-day-list"></ul></div></div>')},a.prototype.range=function(e){for(var t=new Array(e),a=0;e>a;a++)t[a]=a;return t},a});