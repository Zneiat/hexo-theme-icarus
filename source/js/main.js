(function($){
    // Caption
    $('.article-entry').each(function(i) {
        $(this).find('img').filter(function (element) {
            return $(this).hasClass('');
        }).each(function() {
            // add image caption
            if (this.alt && !(!!$.prototype.justifiedGallery && $(this).parent('.justified-gallery').length)) {
                $(this).after('<span class="caption">' + this.alt + '</span>');
            }

            if ($(this).parent().prop("tagName") !== 'A') {
                $(this).wrap('<a href="' + ($(this).attr("data-imgbig") ? $(this).attr("data-imgbig") : this.src) + '" title="' + this.alt + '" class="gallery-item"></a>');
            }
        });
    });
    if (typeof lightGallery != 'undefined') {
        var options = {
            selector: '.gallery-item'
        };
        $('.article-entry').each(function(i, entry) {
            lightGallery(entry, options);
        });
        lightGallery($('.article-gallery')[0], options);
    }
    if (!!$.prototype.justifiedGallery) {  // if justifiedGallery method is defined
        var options = {
            rowHeight: 140,
            margins: 4,
            lastRow: 'justify'
        };
        $('.justified-gallery').justifiedGallery(options);
    }

    // Article content index
    (function () {
        var indexElem = $('#article-content-index');
        var contentElem = $('.article-entry');

        if (!indexElem.length || !contentElem.length)
            return;

        var indexListElem = indexElem.find('.index-list');
        indexListElem.css("max-height", ($(window).height() - $('#profile')[0].offsetTop - $('#profile').height() - 200) + "px");
        var titles = contentElem.find('h2, h3, h4, h5, h6');
        if (!titles.length)
            return;
        titles.each(function (i, elem) {
            var titleHref = $(elem).find('a').attr('href');
            var titleText = $(elem).text();
            var tagNum = Number($(elem)[0].tagName.substr(1));
            var itemElem = $('<div class="item type-'+tagNum+'" data-key="'+i+'"><a href="'+titleHref+'">'+titleText+'</a></div>');
            itemElem.appendTo(indexListElem);
        });

        indexElem.show();

        var selectedKey = null;
        var checkAndSelect = function () {
            titles.each(function (i, elem) {
                var isCanSee = elem.offsetTop >= $(window).scrollTop() && elem.offsetTop < ($(window).scrollTop() + $(window).height());
                if (isCanSee) {
                    if (i !== selectedKey) {
                        selectedKey = i;
                        indexListElem.find('.active').removeClass('active');
                        var itemElem = indexListElem.find('.item[data-key="'+i+'"]');
                        itemElem.addClass('active');
                        indexListElem.scrollTop(itemElem[0].offsetTop - itemElem.height() * 2);
                    }
                    return false;
                }
                return true;
            });
        };

        checkAndSelect();
        $(document).on('scroll', function () {
            checkAndSelect();
        });
    })();

    // Profile card
    $(document).on('click', function () {
        $('#profile').removeClass('card');
    }).on('click', '#profile-anchor', function (e) {
        e.stopPropagation();
        $('#profile').toggleClass('card');
    }).on('click', '.profile-inner', function (e) {
        e.stopPropagation();
    });

    /**
     * To Top & Fixed Profile
     */
    if ($('#sidebar').length) {
        checkSidebarLeftFixed();
        checkShowToTop();

        $(document).on('scroll', function () {
            checkSidebarLeftFixed();
            checkShowToTop();
        });
        
        $('#toTop').click(function () {
            $('body, html').animate({ scrollTop: 0 }, 600);
        });
    }

    function checkSidebarLeftFixed() {
        var scrollTop = $(document).scrollTop();
        var fixedElem = $('#sidebar-left .sidebar-fixed');
        var InnerElem = $('#sidebar-left .sidebar-fixed .sidebar-fixed-inner');
        var needFixedElem = scrollTop >= fixedElem.offset().top + fixedElem.outerHeight(true);
        var isFixed = InnerElem.is('.has-fixed');

        if (!needFixedElem) {
            // 不固定
            if (!isFixed) return;

            InnerElem.removeClass('has-fixed');
            InnerElem.css('position', '')
                .css('width', '')
                .css('top', '');

                InnerElem.css('animation', 'none');
        } else {
            // 需固定
            if (isFixed) return;

            InnerElem.addClass('has-fixed');
            InnerElem.css('position', 'fixed')
                .css('width', fixedElem.innerWidth() + 'px')
                .css('top', '0');

            InnerElem.css('animation', '');
            InnerElem.addClass('anim-fade-in');
        }
    }

    var isShowToTop = false;

    function checkShowToTop() {
        var scrollTop = $(document).scrollTop();
        var toTopElem = $('#toTop');
        var whereShow = $(window).height();
        var isNeedShow = (scrollTop > 0) && (scrollTop > whereShow);

        if ($(document).width() >= 800) {
            if (isNeedShow) {
                if (isShowToTop) return;
                toTopElem.css('left', $('#sidebar').offset().left);
                toTopElem.css('animation', '');
                toTopElem.addClass('anim-fade-in');
                toTopElem.show();
                isShowToTop = true;
            } else {
                if (!isShowToTop) return;
                toTopElem.hide();
                toTopElem.css('animation', 'none');
                isShowToTop = false;
            }
        } else {
            toTopElem.show();
            toTopElem.css('right', 20);
        }
    }

})(jQuery);
