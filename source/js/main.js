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
        checkFixedProfile();
        checkShowToTop();

        $(document).on('scroll', function () {
            checkFixedProfile();
            checkShowToTop();
        }).on('click', '#toTop', function () {
            $('body, html').animate({ scrollTop: 0 }, 600);
        });
    }

    function checkFixedProfile() {
        var scrollTop = $(document).scrollTop();
        var profileElem = $('#profile');
        var profileInnerElem = $('#profile .profile-inner');
        var needFixedProfile = scrollTop >= profileElem.offset().top + profileElem.outerHeight(true);
        var isProfileFixed = profileInnerElem.is('.profile-fixed');

        if (!needFixedProfile) {
            // 不固定
            if (!isProfileFixed) return;

            profileInnerElem.removeClass('profile-fixed');
            profileInnerElem.css('position', '')
                .css('width', '')
                .css('top', '');

            profileInnerElem.css('animation', 'none');
        } else {
            // 需固定
            if (isProfileFixed) return;

            profileInnerElem.addClass('profile-fixed');
            profileInnerElem.css('position', 'fixed')
                .css('width', profileElem.innerWidth() + 'px')
                .css('top', '0');

            profileInnerElem.css('animation', '');
            profileInnerElem.addClass('anim-fade-in');
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
