!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(require("../moment")):"function"==typeof define&&define.amd?define(["moment"],t):t(e.moment)}(this,function(e){"use strict";function t(e,t){var _=e.split("_");return t%10===1&&t%100!==11?_[0]:t%10>=2&&4>=t%10&&(10>t%100||t%100>=20)?_[1]:_[2]}function _(e,_,n){var i={mm:"хвилина_хвилини_хвилин",hh:"година_години_годин",dd:"день_дні_днів",MM:"місяць_місяці_місяців",yy:"рік_роки_років"};return"m"===n?_?"хвилина":"хвилину":"h"===n?_?"година":"годину":e+" "+t(i[n],+e)}function n(e,t){var _={nominative:"січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень".split("_"),accusative:"січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня".split("_")},n=/D[oD]? *MMMM?/.test(t)?"accusative":"nominative";return _[n][e.month()]}function i(e,t){var _={nominative:"неділя_понеділок_вівторок_середа_четвер_п’ятниця_субота".split("_"),accusative:"неділю_понеділок_вівторок_середу_четвер_п’ятницю_суботу".split("_"),genitive:"неділі_понеділка_вівторка_середи_четверга_п’ятниці_суботи".split("_")},n=/(\[[ВвУу]\]) ?dddd/.test(t)?"accusative":/\[?(?:минулої|наступної)? ?\] ?dddd/.test(t)?"genitive":"nominative";return _[n][e.day()]}function s(e){return function(){return e+"о"+(11===this.hours()?"б":"")+"] LT"}}var a=e.defineLocale("uk",{months:n,monthsShort:"січ_лют_бер_квіт_трав_черв_лип_серп_вер_жовт_лист_груд".split("_"),weekdays:i,weekdaysShort:"нд_пн_вт_ср_чт_пт_сб".split("_"),weekdaysMin:"нд_пн_вт_ср_чт_пт_сб".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY р.",LLL:"D MMMM YYYY р., HH:mm",LLLL:"dddd, D MMMM YYYY р., HH:mm"},calendar:{sameDay:s("[Сьогодні "),nextDay:s("[Завтра "),lastDay:s("[Вчора "),nextWeek:s("[У] dddd ["),lastWeek:function(){switch(this.day()){case 0:case 3:case 5:case 6:return s("[Минулої] dddd [").call(this);case 1:case 2:case 4:return s("[Минулого] dddd [").call(this)}},sameElse:"L"},relativeTime:{future:"за %s",past:"%s тому",s:"декілька секунд",m:_,mm:_,h:"годину",hh:_,d:"день",dd:_,M:"місяць",MM:_,y:"рік",yy:_},meridiemParse:/ночі|ранку|дня|вечора/,isPM:function(e){return/^(дня|вечора)$/.test(e)},meridiem:function(e,t,_){return 4>e?"ночі":12>e?"ранку":17>e?"дня":"вечора"},ordinalParse:/\d{1,2}-(й|го)/,ordinal:function(e,t){switch(t){case"M":case"d":case"DDD":case"w":case"W":return e+"-й";case"D":return e+"-го";default:return e}},week:{dow:1,doy:7}});return a});